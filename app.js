// app.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bookingForm");
    const confirmation = document.getElementById("confirmation");
    const guestNameElement = document.getElementById("guestName");
    const confirmCheckinElement = document.getElementById("confirmCheckin");
    const confirmCheckoutElement = document.getElementById("confirmCheckout");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get values from the form
        const checkin = document.getElementById("checkin").value;
        const checkout = document.getElementById("checkout").value;
        const name = document.getElementById("name").value;

        // Store the reservation details in localStorage (optional)
        const reservation = {
            name: name,
            checkin: checkin,
            checkout: checkout
        };
        localStorage.setItem("reservation", JSON.stringify(reservation));

        // Show confirmation message
        guestNameElement.textContent = name;
        confirmCheckinElement.textContent = checkin;
        confirmCheckoutElement.textContent = checkout;
        confirmation.style.display = "block";
        
        // Clear the form
        form.reset();
    });
});
