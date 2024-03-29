let map = L.map("bs-store-locator-map").setView([37.09024, -95.712891], 3);

// Add a tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

bsstorelocations.forEach(function (location) {
  let marker = L.marker([location.latitude, location.longitude]).addTo(map);
  if (location.othersInfo) {
    marker.bindPopup(
      `<div>
  ${location.othersInfo}
  <br />
</div>`
    );
  }
});
