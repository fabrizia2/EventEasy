// Make a POST request to the API endpoint
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signin').addEventListener('click', async function(e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Get form input values
        var email = document.getElementById('email').value; // Ensure this ID matches your HTML
        var password = document.getElementById('password').value; // Ensure this ID matches your HTML

        // Create an object with the form data
        var formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            // Make a POST request to the API endpoint to get the token
            const response = await fetch(`${config.API_URL}/auth/token/login/`, {
                method: 'POST',
                body: formData, // No need to set Content-Type when using FormData
                headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
                }),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Read the error response
                throw new Error(`Failed to get token: ${errorText}`); // Include error response in the error message
            }

            const data = await response.json(); // Convert response to JSON if status is OK
            const token = data.auth_token; // Extract token from response
            console.log('Auth Token:', token);

            // Save the token to localStorage
            localStorage.setItem('auth_token', token);

            // Fetch user data with the obtained token
            const userResponse = await fetch(`${config.API_URL}/auth/users/me/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`, // Authorization header
                    "ngrok-skip-browser-warning": "69420",
                }
            });

            if (!userResponse.ok) {
                const errorText = await userResponse.text(); // Read the error response
                throw new Error(`Failed to fetch user data: ${errorText}`); // Include error response in the error message
            }

            const user = await userResponse.json(); // Assuming the response is in JSON format
            console.log('User Details:', user); // Log user details

            // Save user details to localStorage
            localStorage.setItem('userId', user.id); // Save the user ID to localStorage
            localStorage.setItem('userRole', user.role); // Save the user role to localStorage
            localStorage.setItem('firstName', user.first_name); // Save the first name to localStorage
            localStorage.setItem('lastName', user.last_name); // Save the last name to localStorage
            localStorage.setItem('email', user.email); // Save the email to localStorage

            // Display user's name under "My Dashboard"
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.textContent = `${user.first_name} ${user.last_name}`;
            } else {
                console.error("User name element not found.");
            }

            // Fill in profile form with user details
            const nameElement = document.getElementById('name');
            if (nameElement) {
                nameElement.value = `${user.first_name} ${user.last_name}`;
            } else {
                console.error("Name element not found.");
            }

            const emailElement = document.getElementById('email');
            if (emailElement) {
                emailElement.value = user.email; // Since email is disabled, it won’t be editable
            } else {
                console.error("Email element not found.");
            }

            const locationElement = document.getElementById('location');
            if (locationElement) {
                locationElement.value = user.location || ''; // Assuming the user object has a location field
            } else {
                console.error("Location element not found.");
            }

            // Check the user role and redirect accordingly
            if (user.role.toLowerCase() === 'client') {
                window.location.href = '../../templates/clients_dash.html'; // Redirect to client dashboard
            } else if (user.role.toLowerCase() === 'service_provider') {
                window.location.href = '../../templates/sp_dashboard.html'; // Redirect to service provider dashboard
            } else {
                alert('Unknown user role.');
            }
        } catch (error) {
            console.error('Error:', error);
            const resultElement = document.getElementById('result');
            if (resultElement) {
                resultElement.textContent = 'An error occurred: ' + error.message; // Display error message
            } else {
                console.error("Result element not found.");
            }
        }
    });
});


