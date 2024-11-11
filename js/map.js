// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru, 
  const position = { lat: 9.595973444653955, lng: 76.52323985736338 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center: position,
    mapId: "Stylin-salon-kottayam",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Stylin Ladies Salon , Kottayam",
  });
}

initMap();