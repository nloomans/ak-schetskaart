var el = {};

var markers = [];

var icons = {};

var currentIndex = 0;

function addMarker (position, icon) {
  markers.push(new google.maps.Marker({
    position: position,
    map: map,
    icon: icon
  }));
}

var thingsToDo = [
  function () {
    el.header.text('Hoi,');
    el.text.text('laten we begginen, druk op spatie.');
  },
  function () {
    el.header.text('Het probleem');
    el.text.html('Europa maakt gemiddeld <b>25%</b> hernieuwbare energie en <b>24%</b> '+
    'Aardgas, maar nederland heeft <b>11%</b> Hernieuwbaar en <b>63%</b> aardgas. Dit kan beter.');
    addMarker({lat: 53, lng: 6}, icons.gas);
  },
  function () {
    el.header.text('Overheid');
    el.text.text('De overheid probeerd het beter te maken door hier windmolens te plaatsen,'+
                'maar wij denken dat het beter kan.');
    addMarker({lat: 53, lng: 6}, icons.gas);
    addMarker({lat: 52.75, lng: 5}, icons.windmill);
    addMarker({lat: 52.4, lng: 5.5}, icons.windmill);
    addMarker({lat: 51.96, lng: 4.2}, icons.windmill);
    addMarker({lat: 53.26, lng: 6.85}, icons.windmill);
  },
  function () {
    el.header.text('Oplossing')
    el.text.text('Zo zijn er heel veel plantages in nederland. De overheid kan wat van'
                 +'dit land kopen om dat een heel groot veld gevult met zonnen panelen'
                 +'plaatsen')
    map.setCenter({lat: 52.1356625, lng: 4.8959632});
    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    map.setZoom(15);
  }
];

function goToCurrent() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  map.setCenter({lat: 52, lng: 5});
  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
  map.setZoom(7);
  thingsToDo[currentIndex]();
}

function next() {
  if (currentIndex < thingsToDo.length - 1) currentIndex++;
  goToCurrent();
}

function back() {
  if (currentIndex > 0) currentIndex--;
  goToCurrent();
}

function initMap() {
  window.map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: 52.30916308066622, lng: 4.946269362500093},
    center: {lat: 52, lng: 5},
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  icons.gas = {
    url:'/img/gas.png',
    scaledSize: new google.maps.Size(50, 50)
  }
  icons.windmill = {
    url: '/img/windmill.png',
    scaledSize: new google.maps.Size(50,50)
  }

  goToCurrent();
}

$(document).keydown(function (evt) {
  switch (evt.keyCode) {
    case 32: // spacebar
    case 39: // right
      next();
      break;
    case 37: // right
      back();
      break;
  }
});

$(document).ready(function () {
  el.header = $('header');
  el.text = $('p');
});
