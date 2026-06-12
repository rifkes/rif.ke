import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useEffect, useState } from 'react';

const GoogleAnalyticsAndCookies = ({ globalData, }) => {
	const [cookiesAreAccepted, setCookiesAreAccepted] = useState(false);
	const [cookiesAreDenied, setCookiesAreDenied] = useState(false);
	const [ hasCheckedStorage, setHasCheckedStorage ] = useState(false);
	
	useEffect(() => {
		const cookieConsent = localStorage.getItem('cookieConsent');
		if (cookieConsent) {
			setCookiesAreAccepted(true);
			setShowBanner(false);
		}

		// 1. Initialize the default "Denied" state for Consent Mode v2 right away
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }

      if (cookieConsent === 'true') {
        setCookiesAreAccepted(true);
        // If already accepted in a past session, ensure Google knows it
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      } else {
        // Strict GDPR default: everything is denied by default until they click accept
        gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      }
    }
		setHasCheckedStorage(true);
	}, []);

	// 2. When accepted, update Google Consent Mode dynamically instead of just mounting the script
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setCookiesAreAccepted(true);
		setCookiesAreDenied(false);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  if (!globalData?.settings?.gaMeasurementId || !hasCheckedStorage) {
    return null;
  }

	if (globalData?.settings?.gaMeasurementId?.length > 0) {
		return (
			<>
				<GoogleAnalytics trackPageViews gaMeasurementId={globalData?.settings?.gaMeasurementId} />
				<AnimatePresence>
					{
						hasCheckedStorage &&
						!cookiesAreAccepted &&
						!cookiesAreDenied &&
						<motion.div
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{ duration: 0.3 }}
							className='fixed bottom-0 left-0 p-2 max-w-lg z-[99999]'
						>
							<div className='max-w-lg z-[99999] border border-black bg-white p-4'>
								<p className='text-pretty'>{globalData?.settings?.cookieConsentText?.length > 0 ? globalData?.settings?.cookieConsentText : 'I use cookies so I can see when people visit my site mostly as a boost to my own ego. Please click accept to allow me to continue this important work <3'}</p>
								<button className='mt-4 border border-black px-1 hover:bg-black hover:text-white cursor-pointer mr-2' onClick={handleAccept}>Accept</button>
								<button className='mt-4 border border-black px-1 hover:bg-black hover:text-white cursor-pointer' onClick={() => setCookiesAreDenied(true)}>Reject</button>
								{
									globalData?.settings?.privacyPolicyLink?.length > 0 &&
									<Link href={globalData?.settings?.privacyPolicyLink}>Privacy Policy</Link>
								}
								</div>
						</motion.div>
					}
				</AnimatePresence>
			</>
		)
	}
}

export default GoogleAnalyticsAndCookies;