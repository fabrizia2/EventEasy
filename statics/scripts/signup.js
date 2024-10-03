document.getElementById('sign_up').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Get form input values
    var email = document.getElementById('email1').value;
    var password = document.getElementById('password1').value;
    var name = document.getElementById('name1').value;
    var gender = document.getElementById('gender1').value;
    var role = document.getElementById('role1').value;
    // Create an object with the form data
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("role", role);

    // Make a POST request to the API endpoint
    fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      if (response.ok) {
        // Successful login, redirect to home page
        window.location.href = "/";
      } else {
        // Failed login, display error message
        alert('Sign Up failed. Please check your credentials.');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('An error occurred during Sign Up.');
    });
  });

  $(document).ready(function() {
    $('#signup-form').submit(function(event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();
        const role = $('#role1').val();

        // Example data for login
        const loginDetails = {
            email: email,
            password: password,
            role: role
        };

        // Send login details to backend (example URL)
        $.ajax({
            url: 'https://example.com/api/login',
            method: 'POST',
            data: JSON.stringify(loginDetails),
            contentType: 'application/json',
            success: function(response) {
                if (response.success) {
                    // Check the user's role and redirect accordingly
                    if (response.role === 'client') {
                        window.location.href = '../../templates/dashboard.html';
                    } else if (response.role === 'service-provider') {
                        window.location.href = '../../templates/service-provider-dashboard.html';
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