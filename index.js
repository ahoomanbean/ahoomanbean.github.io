document.addEventListener('DOMContentLoaded', () => {
  const ua = document.getElementById('user-agent');
  if (ua) ua.textContent = navigator.userAgent;

  fetch('https://ipinfo.io/json?token=274e26df0d968c')
    .then(response => response.json())
    .then(data => {
      const [lat, lon] = data.loc.split(',').map(Number);
      document.getElementById('ip').textContent = data.ip;
      document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country}`;
      document.getElementById('org').textContent = data.org || 'Unavailable';

      const map = L.map('map').setView([lat, lon], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([lat, lon]).addTo(map)
        .bindPopup(`${data.city}, ${data.region}`)
        .openPopup();
    })
    .catch(err => {
      document.getElementById('ip').textContent = 'Error';
      document.getElementById('location').textContent = 'Unavailable';
      document.getElementById('org').textContent = 'Unavailable';
    });
});


// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkModeToggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.querySelector('.info-card').classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
});
