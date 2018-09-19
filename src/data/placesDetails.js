//create content and fallback

export const gatherContent = (marker, data) => {
	const locale = data.venue;

	const {canonicalUrl, description, location, name, bestPhoto, contact, categories} = locale;

	marker.url = canonicalUrl ? canonicalUrl : "No web address found";
	marker.description = description ? description : "No description found";
	marker.name = name ? name : "No name found";
	marker.location = location.formattedAddress ? location.formattedAddress : "No address found";
	marker.categories = categories.length > 0 ? categories[0].name : "No categories found";
	marker.phone = contact.phone ? contact.phone : "No phone number found";
	marker.photo = bestPhoto ? `${bestPhoto.prefix}200x200${bestPhoto.suffix}` : "No images found";

	return marker;
}

export const createInfowindow = (marker) => {
	marker.content = `<div id = "places-details">
											<h3 class="place-name">${marker.name}</h3>
											<p class="place-address">${marker.location}</p>
											<p class="place-phone">${marker.phone}</p>
											<div class="place-hours">
											</div>
											<a id="website" href=${marker.url}  target="_blank">${marker.url}</a>
											<img class= "place-img" src=${marker.photo}>
									 </div>`

}




// function to populate the infowindow when marker is clicked.
export const populateInfoWindow = (marker, infowindow, map) => {
	//check to see if infowindow is already open
	if (infowindow.marker != marker) {
		//clear the infowindow content allowing streetview to load
		infowindow.setContent('');
		infowindow.marker = marker;
		getPlacesDetails(marker, infowindow, map);
		//see if the marker property is cleared if infowindow is closed
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
			// marker.setIcon(defaultIcon);
			// vm.fourSqFinds([]);
		});
		//open the infowindow on the proper marker
		// infowindow.open(map, marker);
		// marker.setAnimation(window.google.maps.Animation.BOUNCE);
		// setTimeout(function() {
		// 	marker.setAnimation(null);
		// }, 5000);
	}
}

//gets place details from place_id via PlacesService
export const getPlacesDetails = (marker, infowindow, map) => {
	let service = new window.google.maps.places.PlacesService(map);

	service.getDetails({
		placeId: marker.id
	}, function(place, status) {
		if (status === window.google.maps.places.PlacesServiceStatus.OK) {
			// Set the marker property on this infowindow so it isn't created again.
			infowindow.marker = marker;
			marker.content = `<div id = "places-details">
													<h3 class="place-name">${place.name}</h3>
				 									<p class="place-address">${place.formatted_address}</p>
													<p class="place-phone">${place.formatted_phone_number}</p>
													<div class="place-hours">
														${place.opening_hours.weekday_text[0]}
														${place.opening_hours.weekday_text[1]}
														${place.opening_hours.weekday_text[2]}
														${place.opening_hours.weekday_text[3]}
														${place.opening_hours.weekday_text[4]}
														${place.opening_hours.weekday_text[5]}
														${place.opening_hours.weekday_text[6]}
													</div>
													<a id = "website" href=${place.website}>${place.website}</a>
													<img class= "place-img" src=${place.photos[0]}>
											 </div>`
			//creates #pano element for streetViewService to use
			// innerHTML += ' <div id = "pano"></div>';
			// innerHTML += '<div class="iw-bottom-gradient"></div>';
			// innerHTML += '</div>';
			// infowindow.setContent(innerHTML);
			// infowindow.open(map, marker);
			// // Make sure the marker property is cleared if the infowindow is closed.
			// infowindow.addListener('closeclick', function() {
			// 	infowindow.marker = null;
			// });
		}
	});
}
