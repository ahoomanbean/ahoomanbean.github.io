function openModal() {
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('user-agent').textContent = navigator.userAgent;

  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      document.getElementById('ip').textContent = data.ip;
      document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
      document.getElementById('org').textContent = data.org || 'Unavailable';

      const map = L.map('map').setView([data.latitude, data.longitude], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([data.latitude, data.longitude]).addTo(map)
        .bindPopup(`${data.city}, ${data.region}`)
        .openPopup();
    })
    .catch(err => {
      document.getElementById('ip').textContent = 'Error';
      document.getElementById('location').textContent = 'Unavailable';
      document.getElementById('org').textContent = 'Unavailable';
    });
});
