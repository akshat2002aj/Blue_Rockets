
   let positions = [];
   
   let getLocation = () =>
     //position[i][0] -- latitude & position[i][1] -- longitude
     fetch("https://thenose-samuel.github.io/Json/points.json")
       .then((response) => response.json())
       .then((json) => {
         let customers = json.data.customer_details;
         for (const key in customers) {
           let LatLng = customers[key].customer_address.lat_long;
           positions.push([LatLng.latitude, LatLng.longitude]);
		 
         }
       })
       .catch((e) => console.log("error"));
   getLocation();
   console.log(positions);


function initMap() {
 // The location of Uluru
 const uluru = { 'lat': 12.93149600, 'lng':77.67884500};
 // The map, centered at Uluru
 const map = new google.maps.Map(document.getElementById("map"), {
   zoom: 18,
   center: uluru,
 });
 // The marker, positioned at Uluru
 addMarkers(map);
}

function addMarkers(map) {
 for (let i = 0; i < positions.length; i++) {
	 
   let marker = new google.maps.Marker({
     position: { 'lat': parseFloat(positions[i][0]), 'lng': parseFloat(positions[i][1]) },
     map: map,
     icon: "delivered.svg",
   });
   let infowindow = new google.maps.InfoWindow({
     content: "<p>Marker Location:" + marker.getPosition() + "</p>",
   });
   google.maps.event.addListener(marker, "click", () => {
     infowindow.open(map, marker);
   });
 }
}

