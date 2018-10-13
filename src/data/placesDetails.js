//create content and fallback

export const gatherContent = (marker, data) => {
	const locale = data.venue;

	const {canonicalUrl, description, location, name, bestPhoto, contact, categories} = locale;

	marker.url = canonicalUrl ? canonicalUrl : "No web address found";
	marker.description = description ? description : "";
	marker.name = name ? name : "No name found";
	marker.location = location.formattedAddress ? location.formattedAddress : "No address found";
	marker.categories = categories.length > 0 ? categories[0].name : "No categories found";
	marker.phone = contact.phone ? contact.phone : "";
	marker.photo = bestPhoto ? `${bestPhoto.prefix}125x125${bestPhoto.suffix}` : "No images found";

	return marker;
}

export const createInfowindow = (marker) => {
	marker.content = `<div class="infowindow">
											<img class= "place-img" src=${marker.photo} alt="image of ${marker.name}">
											<div class="places-details">
												<h3 class="place-name">${marker.name}</h3>
												<p class="place-address">${marker.location}</p>
												<a class="place-phone" href="tel:${marker.phone}">Call ${marker.phone}</a>
												<p class="place-description">${marker.description}</p>
												<a id="website" href=${marker.url}  target="_blank">${marker.url}</a>
									 		</div>
										</div>`
}

export const createInfowindowError = (marker) => {
	marker.content = `<div class="fsDetails-error">
										<h2>Foursquare Venue Details search failed</h2>
										<p>Please try again later</p>
										</div>`
}
