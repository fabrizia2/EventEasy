document.getElementById('sign_up').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Get form input values
  var email = document.getElementById('signup-email').value;
  var password = document.getElementById('signup-password').value;
  var re_password = document.getElementById('re-password').value;
  var first_name = document.getElementById('first-name').value;
  var last_name = document.getElementById('last-name').value;
  //var role = document.getElementById('role').value;

  // Create an object with the form data
  var formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("re_password", re_password);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  //formData.append("role", role);

  // Make a POST request to the API endpoint
  fetch(`${config.API_URL}/auth/users/`, {
      method: 'POST',
      body: formData
  })
  .then(function(response) {
      if (response.ok) {
        window.location.href = '../../templates/clients_dash.html'; // Parse the JSON response
      } else {
          alert('Sign Up failed. Please check your details.');
          throw new Error('Sign Up failed'); // Ensure the promise chain breaks here
      }
  })
  /*.then(function(data) {
    console.log('Response data:', data);
      // Successful sign up, check the user's role and redirect accordingly
      if (data.role === 'client') {
          window.location.href = '../../templates/clients_dash.html';
      } else if (data.role === 'service-provider') {
          window.location.href = '../../templates/sp-dashboard.html';
      } else {
          alert('Role not recognized.');
      }
  })*/
  .catch(function(error) {
      console.error('Error:', error);
      alert('An error occurred during Sign Up.');
  });
});

  /*
  $(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault();

        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        const role = $('#role').val();

        // Example data for login
        const loginDetails = {
            email: email,
            password: password,
            role: role
        };

        // Send login details to backend (example URL)
        $.ajax({
            url: `${config.API_URL}/auth/users/`,
            method: 'POST',
            data: JSON.stringify(loginDetails),
            contentType: 'application/json',
            success: function(response) {
                if (response.success) {
                    // Check the user's role and redirect accordingly
                    if (response.role === 'client') {
                        window.location.href = '../../templates/clients_dash.html';
                    } else if (response.role === 'service-provider') {
                        window.location.href = '../../templates/sp-dashboard.html';
                    }
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            },
            error: function() {
                alert('Login failed. Please try again.');
            }
        });
    });
  });
  
});*/