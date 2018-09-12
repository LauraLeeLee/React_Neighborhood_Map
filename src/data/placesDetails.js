
// function to populate the infowindow when marker is clicked.
function populateInfoWindow(marker, infowindow) {
	//check to see if infowindow is already open
	if (infowindow.marker != marker) {
		//clear the infowindow content allowing streetview to load
		infowindow.setContent('');
		infowindow.marker = marker;
		getPlacesDetails(marker, infowindow);
		//see if the marker property is cleared if infowindow is closed
		infowindow.addListener('closeclick', function() {
			// vm.showMe(true);
			// vm.showFS(true);
			infowindow.marker = null;
			// marker.setIcon(defaultIcon);
			// vm.fourSqFinds([]);
		});
		//open the infowindow on the proper marker
		infowindow.open(map, marker);
		marker.setAnimation(window.google.maps.Animation.BOUNCE);
		setTimeout(function() {
			marker.setAnimation(null);
		}, 5000);
	}
}

//gets place details from place_id via PlacesService
function getPlacesDetails(marker, infowindow) {
	var service = new window.google.maps.places.PlacesService(map);
	service.getDetails({
		placeId: marker.id
	}, function(place, status) {
		if (status === window.google.maps.places.PlacesServiceStatus.OK) {
			// Set the marker property on this infowindow so it isn't created again.
			infowindow.marker = marker;
			var innerHTML = '<div id = "places-details">';
			innerHTML += ' <div id = "place-name">';
			if (place.name) {
				innerHTML += '<strong>' + place.name + '</strong>';
			}
			innerHTML += '</div>';
			if (place.formatted_address) {
				innerHTML += '<br>' + place.formatted_address;
			}
			if (place.formatted_phone_number) {
				innerHTML += '<br>' + place.formatted_phone_number;
			}
			if (place.opening_hours) {
				innerHTML += '<br><br><strong>Hours:</strong><br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + place.opening_hours.weekday_text[3] + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6];
			}
			if (place.website) {
				innerHTML += '<br><br><a id = "website" href=' + place.website + '>' + place.website + '</a>';
			}
			if (place.photos) {
				innerHTML += '<br><br><img src="' + place.photos[0].getUrl({
					maxHeight: 100,
					maxWidth: 200
				}) + '">';
			}
			//creates #pano element for streetViewService to use
			innerHTML += ' <div id = "pano"></div>';
			innerHTML += '<div class="iw-bottom-gradient"></div>';
			innerHTML += '</div>';
			infowindow.setContent(innerHTML);
			infowindow.open(map, marker);
			// Make sure the marker property is cleared if the infowindow is closed.
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
		}
	});
}

export default placesDetails;
