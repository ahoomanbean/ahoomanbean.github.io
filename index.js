document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ua').textContent = navigator.userAgent;

  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      const lat = parseFloat(data.latitude);
      const lon = parseFloat(data.longitude);

      document.getElementById('ip').textContent = data.ip;
      document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
      document.getElementById('org').textContent = data.org || 'Unavailable';

      const map = L.map('map').setView([lat, lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup(`${data.city}, ${data.region}`)
        .openPopup();
    })
    .catch(err => {
      console.error(err);
      document.getElementById('ip').textContent = 'Unavailable';
      document.getElementById('location').textContent = 'Unavailable';
      document.getElementById('org').textContent = 'Unavailable';
    });
});
