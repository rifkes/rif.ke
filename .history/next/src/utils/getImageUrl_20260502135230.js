import client from '@/hooks/useSanityQuery';
import { createImageUrlBuilder } from '@sanity/image-url';

const getImageUrl = ({ src, width = 2048, height, aspectRatio, quality = 80, }) => {

	// if height and aspect ratio are included, additional calculation is done to ensure the image is not pixelated. This is important for image-cover images that might be cropped narrowly (fullscreen on mobile etc)

	if (!src) return '';
	
	const builder = createImageUrlBuilder(client);

	const widths = [3000, 2560, 2048, 1920, 1600, 1280, 1024, 512, 256, 128,];
	
	let closestWidth = widths[0];
	let difference = Infinity;

	let requiredWidth = width;

	if (height && aspectRatio) {
		const viewAspectRatio = width / height;
		if (viewAspectRatio < aspectRatio) {
			// if the viewing box is more portrait, let's use the height to calculate the required width
			requiredWidth = height * aspectRatio;
		}
	}

	for (const w of widths) {
		if (requiredWidth < w) {
			const diff = Math.abs(w - requiredWidth);
			if (diff < difference) {
				difference = diff;
				closestWidth = w;
			}
		}
	}

	let w = closestWidth;

	if (width < widths[widths.length - 1]) {
		closestWidth = width;
	}

	const urlFor = (source) => {
		return builder.image(source);
	}
	const url = urlFor(src).format('webp').quality(quality ?? 80).width(w).url();

	return url;
}

export default getImageUrl;