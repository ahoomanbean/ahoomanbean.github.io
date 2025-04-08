document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeBtn');
  const modal = document.getElementById('modal');
  const form = document.getElementById('payment-form');

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Mock payment submitted!');
    modal.style.display = 'none';
    form.reset();
  });

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
