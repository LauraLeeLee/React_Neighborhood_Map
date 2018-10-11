import {clientId, clientSecret } from '../data/clientInfo.js'

//create categories array
const categories = [
  {key: "food", value: "4d4b7105d754a06374d81259"},
  {key: "museum", value: "4bf58dd8d48988d181941735"},
  {key: "publicArt", value: "507c8c4091d498d9fc8c67a9"},
  {key: "bar", value: "4bf58dd8d48988d116941735"},
  {key: "plaza", value: "4bf58dd8d48988d164941735"},
  {key: "church", value: "4bf58dd8d48988d132941735"},
  {key: "hotel", value: "4bf58dd8d48988d1fa931735"},
];

const poiCategories = [
  {key: "Museum", value: "4bf58dd8d48988d181941735" },
  // {key: "Public Art", value: "507c8c4091d498d9fc8c67a9"},
  {key: "Historic Site", value: "4deefb944765f83613cdba6e"},
  {key: "Scenic Outlook", value: "4bf58dd8d48988d165941735"},
  // {key: "Art Museum", value: "4bf58dd8d48988d18f941735"},
  {key: "Church", value: "4bf58dd8d48988d132941735"},
  {key: "Plaza", value: "4bf58dd8d48988d164941735"},
  {key: "History Museum", value: "4bf58dd8d48988d190941735"},
]

export const poiNames = poiCategories.map(key => key.key);
console.log(poiNames);
const poiIds = poiCategories.map(value => value.value);
console.log(poiIds);

//create id array
const categoryId=categories.map(value => value.value);
// console.log(categoryId);
//create category key array
export const categoryName=categories.map(key => key.key);

const fourSqUrl = "https://api.foursquare.com/v2/venues/";
const versDate = 20180916;

export const getFSvenues = (centerMap) => {
  const urlRequest = `${fourSqUrl}search?ll=${centerMap.lat},
    ${centerMap.lng}&client_id=${clientId}&client_secret=${clientSecret}&v=${versDate}&categoryId=${poiIds}&radius=1609&limit=50`;
  return fetch(urlRequest)
    .then(response => {
      if(!response.ok ){
        console.log("error when retrieving venues");
      } else {
        return response.json();
      }
    })
    .then(data => {

      const venues = data.response.venues;
      const realVenues = venues.filter(venue =>
          venue.location.address && venue.location.city
        );
      console.log(realVenues);
      return realVenues;
    });
};

export const getFSdetails = (fsid) => {
  const fourSqId = fsid;
  const detailsUrl = `${fourSqUrl}${fourSqId}?client_id=${clientId}&client_secret=${clientSecret}&v=${versDate}`

  return fetch(detailsUrl)
    .then(response => {
      if(!response.ok ){
        console.log("error when retrieving venues");
      }else {
          return response.json();
      }
  })
  .then(data => {
    console.log(data.response);
    return data.response;
  });
};
