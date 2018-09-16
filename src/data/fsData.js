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
const categoryName=categories.map(key => key.key);

export const getFSvenues = (centerMap) => {
  const urlRequest = `https://api.foursquare.com/v2/venues/search?ll=${centerMap.lat},
    ${centerMap.lng}&client_id=${clientId}&client_secret=${clientSecret}&v=20180916&categoryId=${categoryId}&radius=1609&limit=50`;
  return fetch(getFSvenues)
    // .then(response => {
    //   response.json();
    // })
    .then(res => res.text())          // convert to plain text
    .then(text => console.log(text));
    // .then(data => {
    //   const venues = data.response.venues;
    //   console.log(venues);
    // });

}
