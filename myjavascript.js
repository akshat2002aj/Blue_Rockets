let positions = [],
  building = [],
  flat = [],
  name = [],
  phone = [],
  address = [],
  pin = [];

let getLocation = () =>
  //position[i][0] -- latitude & position[i][1] -- longitude
  fetch("https://thenose-samuel.github.io/Json/points.json")
    .then((response) => response.json())
    .then((json) => {
      let customers = json.data.customer_details;
      for (const key in customers) {
        name.push(customers[key].customer_name);
        let LatLng = customers[key].customer_address.lat_long;
        positions.push([LatLng.latitude, LatLng.longitude]);
        building.push(customers[key].customer_address.building);
        flat.push(customers[key].customer_address.flat);
        phone.push(customers[key].customer_address.phone_no);
        pin.push(customers[key].customer_address.address_id);
        address.push(
          customers[key].customer_address.area +
            ", " +
            customers[key].customer_address.city
        );
      }
    })
    .catch((e) => console.log("error"));
getLocation();
console.log(positions);

function initMap() {
  // The location of Uluru
  const uluru = { lat: 12.931496, lng: 77.678845 };
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
      position: {
        lat: parseFloat(positions[i][0]),
        lng: parseFloat(positions[i][1]),
      },
      map: map,
      icon: "delivered.svg",
      title: "Customer Info",
    });
    let content =
      "<div class='content'>" +
      "<p>" +
      "<b>Name: </b>" +
      `${name[i].toUpperCase()}` +
      "</p>" +
      "<p>" +
      "<b>Phone:</b> +91" +
      `${phone[i]}` +
      "</p>" +
      "<p>" +
      "<b>Flat No. :</b> " +
      `${flat[i]}` +
      "</p>" +
      "<p>" +
      `<b>Building: </b> ${building[i]}` +
      "</p>" +
      "<p>" +
      `<b>Address: </b>: ${address[i]}` +
      "</p>" +
      "<p>" +
      `<b>Pincode: </b>: ${pin[i]}` +
      "</p>" +
      "</div>";

    let infowindow = new google.maps.InfoWindow({
      content: content, //
    });
    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });
  }
}
