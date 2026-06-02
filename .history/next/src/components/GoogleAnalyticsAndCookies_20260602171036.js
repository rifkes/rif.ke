import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useEffect, useState } from 'react';

const GoogleAnalyticsAndCookies = ({ globalData, }) => {
	const [cookiesAreAccepted, setCookiesAreAccepted] = useState(false);
	
	useEffect(() => {
		const cookieConsent = localStorage.getItem('cookieConsent');
		if (cookieConsent) {
			setCookiesAreAccepted(true);
		}
	}, []);

	if (globalData?.settings?.gaMeasurementId?.length > 0) {
		return (
			<>
				<GoogleAnalytics trackPageViews gaMeasurementId={globalData?.settings?.gaMeasurementId} />
				<AnimatePresence>
					{
						!cookiesAreAccepted &&
						<motion.div
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{ duration: 0.3 }}
							className='fixed bottom-0 left-0 p-4 max-w-lg z-[99999]'
						>
							<div className='max-w-lg z-[99999] bg-black text-white p-4'>
								<p className='text-pretty'>{globalData?.settings?.cookieConsentText?.length > 0 ? globalData?.settings?.cookieConsentText : 'I use cookies so I can see when people visit my site mostly as a boost to my own ego. Please click accept <3!'}</p>
								<button className='font-subheading mt-4' onClick={() => setCookiesAreAccepted(true)}>Accept</button>
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
	return null;
}

export default GoogleAnalyticsAndCookies;