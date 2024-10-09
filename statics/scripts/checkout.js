document.addEventListener('DOMContentLoaded', function() {
    const serviceList = document.getElementById('service-list');
    const totalPriceElement = document.getElementById('total-price');
    const stripeButton = document.getElementById('stripe-button');
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    const paybillButton = document.getElementById('paybill-button');
    const tillNumberButton = document.getElementById('till-number-button');

    // Example services booked (In a real scenario, this data should come from the backend or local storage)
    const bookedServices = [
        { id: 1, name: "Service 1", price: 100.00 },
        { id: 2, name: "Service 2", price: 150.00 }
    ];

    function renderServices(services) {
        serviceList.innerHTML = '';
        let total = 0;
        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service');
            serviceElement.innerHTML = `
                <span>${service.name}</span>
                <span>$${service.price.toFixed(2)}</span>
            `;
            serviceList.appendChild(serviceElement);
            total += service.price;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Stripe payment processing
    const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe publishable key

    async function processStripePayment() {
        const response = await fetch('/create-checkout-session', { // Replace with your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: bookedServices })
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
            alert(result.error.message);
        }
    }

    // PayPal payment processing
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalPriceElement.textContent
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');

    // Paybill payment processing
    async function processPaybillPayment() {
        // Custom payment processing logic for Paybill
        alert('Processing Paybill payment...');
    }

    // Till Number payment processing
    async function processTillNumberPayment() {
        // Custom payment processing logic for Till Number
        alert('Processing Till Number payment...');
    }

    // Event listeners for payment buttons
    stripeButton.addEventListener('click', processStripePayment);
    paybillButton.addEventListener('click', processPaybillPayment);
    tillNumberButton.addEventListener('click', processTillNumberPayment);

    // Render booked services on page load
    renderServices(bookedServices);
});
