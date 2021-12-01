/*********
 * API:
 * Web Speech API
 * Geolocation API
 * Place API
 * 
 * AI:
 * Classification
 *********/
var map;
var infowindow;

//Provide feedback based on user decision
function checkDecision() {
    var time = document.getElementById("decisionForm").elements.namedItem("time").value;
    var seafood = document.getElementById("decisionForm").elements.namedItem("seafood").value;

    if (time == "TRUE") {
        if (seafood == "TRUE") {
            getMyLocation()
                .then(
                    (position) => showJapaneseRestaurant(position)
                );
        } else if (seafood == "FALSE") {    
            getMyLocation()
                .then(
                    (position) => showChineseRestaurant(position)
                );
        }
    } else if (time == "FALSE") {
        getMyLocation()
            .then(
                (position) => showFastFoodRestaurant(position)
            );
    }
    $("#form").hide();
}

// Location functions
async function getMyLocation() {
    if (navigator.geolocation) {
        return await new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//Get current position
async function showMyPosition(position) {
    var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapProp = {
        center: myCenter,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
        position: myCenter
    });
    marker.setMap(map);
    $("#googleMap").show()
    showAndsay("This is your current location.");
}

//Get nearby Chinese restaurants
async function showChineseRestaurant(position) {
    var city = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: city,
        zoom: 14
    });
    var request = {
        location: city,
        radius: 1000,
        types: ['restaurant'],
        keyword: 'chinese'
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    $("#googleMap").show()
    showAndsay("Here are the Chinese restaurants near you.");
}

//Get nearby Japanese restaurants
async function showJapaneseRestaurant(position) {
    var city = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: city,
        zoom: 14
    });
    var request = {
        location: city,
        radius: 1000,
        types: ['restaurant'],
        keyword: 'japanese'
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    showAndsay("Here are the Japanese restaurants near you.");
    $("#googleMap").show()
}

//Get nearby fast food restaurants
async function showFastFoodRestaurant(position) {
    var city = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: city,
        zoom: 14
    });
    var request = {
        location: city,
        radius: 1000,
        types: ['restaurant'],
        keyword: 'fastfood'
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    showAndsay("Here are the fast food restaurants near you.");
    $("#googleMap").show()
}

//Get all nearby restaurants
async function showAllRestaurant(position) {
    var city = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: city,
        zoom: 14
    });
    var request = {
        location: city,
        radius: 1000,
        types: ['restaurant']
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    showAndsay("Here are all nearest restaurants near you.");
    $("#googleMap").show()
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
google.maps.event.addDomListener(window, 'load', initialize);