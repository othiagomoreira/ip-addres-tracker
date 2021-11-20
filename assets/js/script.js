const ipAddress = document.querySelector('.ip-value');
const ipLocation = document.querySelector('.location-value');
const ipTimezone = document.querySelector('.timezone-value');
const ipIsp = document.querySelector('.isp-value');
const form = document.querySelector('#form');
const searchIp = document.querySelector('#searchIp');

const APIURL = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_19jAIJH7y0CJCPGOlKErilobs3rJd&ipAddress=`;
const token = 'pk.eyJ1IjoicG9sZW1pY28iLCJhIjoiY2t2dmZ6ODRyMGd3YzJ2bXJ1Nm1qd3V3MSJ9.EvefQ2QfiRmyddc6Z8tE-w'

let lat = 0;
let lng = 0;

getUserIp('');
async function getUserIp(ip) {
    const resp = await fetch(APIURL + ip);
    const ipData = await resp.json();

    lat = ipData.location.lat;
    lng = ipData.location.lng;

    showIpInfo(ipData);
}


// Exibi as informações contidas no IP no card
function showIpInfo(userIp) {
    ipAddress.innerText = userIp.ip;
    ipLocation.innerText = `${userIp.location.city}, ${userIp.location.country} ${userIp.location.postalCode}`;
    ipTimezone.innerText = `UTC ${userIp.location.timezone}`;
    ipIsp.innerText = userIp.isp;
}

// Quando enviado retornara as informações do IP digitado
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ip = searchIp.value;
    
    if(ip) {
        getUserIp(ip); 
        searchIp.value = '';
    } 
});

// Responsavel por gerar o mapa 
let mymap = L.map('map').setView([lat, lng], 13);
let marker = L.marker([-22.41139, -47.56139]).addTo(mymap);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap)