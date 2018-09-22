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

//create id array
const categoryId=categories.map(value => value.value);
// console.log(categoryId);
//create category key array
export const categoryName=categories.map(key => key.key);

const fourSqUrl = "https://api.foursquare.com/v2/venues/";
const versDate = 20180916;

export const getFSvenues = (centerMap) => {
  const urlRequest = `${fourSqUrl}search?ll=${centerMap.lat},
    ${centerMap.lng}&client_id=${clientId}&client_secret=${clientSecret}&v=${versDate}&categoryId=${categoryId}&radius=1609&limit=50`;
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

// export const getAllCats = (fsid) => {
//   const fourSqId = fsid;
//   const catsUrl = `https://api.foursquare.com/v2/venues/categories?${fourSqId}client_id=${clientId}&client_secret=${clientSecret}&v=${versDate}`
//
//   return fetch(catsUrl)
//     .then(response => {
//       if(!response.ok) {
//         console.log("error retrieving categories");
//       } else {
//         return response.json();
//       }
//     })
//     .then(data => {
//       console.log(data);
//       // const categories = data.response.categories;
//       // const catName = categories.map(cat => cat.name)[0];
//       // console.log(catName);
//     });
// }
