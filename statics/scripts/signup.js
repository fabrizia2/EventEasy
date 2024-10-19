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
        // Parse the JSON response
        return response.json(); // Ensure you return the JSON data for the next then
    } else {
        alert('Sign Up failed. Please check your details.');
        throw new Error('Sign Up failed'); // Ensure the promise chain breaks here
    }
})

  .then(function(data) {
    console.log('Response data:', data);

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(data)); // Store the user data

    // Redirect to the clients dashboard
    window.location.href = '../../templates/clients_dash.html';
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