document.addEventListener('DOMContentLoaded', function() {
    // Retrieve user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log('Loaded user details:', userDetails); // Debugging log

    if (userDetails) {
        // Populate the display section
        document.getElementById('display-name').textContent = userDetails.name || 'N/A';
        document.getElementById('display-email').textContent = userDetails.email || 'N/A';
        document.getElementById('display-location').textContent = userDetails.location || 'N/A';
        document.getElementById('display-contact').textContent = userDetails.contact || 'N/A';

        if (userDetails.profilePic) {
            const displayProfilePic = document.getElementById('display-profile-pic');
            displayProfilePic.src = userDetails.profilePic;
            displayProfilePic.style.display = 'block';
        }

        // Populate the logo section with user name and profile picture
        document.getElementById('user-name').textContent = userDetails.name || 'N/A';
        document.getElementById('user-name').style.display = 'inline'; // Ensure it's visible

        const profileImg = document.getElementById('profile-img');
        if (userDetails.profilePic) {
            profileImg.src = userDetails.profilePic;
            profileImg.style.display = 'inline'; // Ensure it's visible
        }
    } else {
        alert('User details not found. Please log in.');
    }

    // Edit Profile button click event
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
        if (userDetails) {
            // Populate the edit form with user details
            document.getElementById('name').value = userDetails.name || '';
            document.getElementById('email').value = userDetails.email || '';
            document.getElementById('location').value = userDetails.location || '';
            document.getElementById('contact').value = userDetails.contact || '';

            if (userDetails.profilePic) {
                const profilePicPreview = document.getElementById('profile-pic-preview');
                profilePicPreview.src = userDetails.profilePic;
                profilePicPreview.style.display = 'block';
            }
        }

        // Show the edit form and hide the display section
        document.getElementById('profile-display').style.display = 'none';
        document.getElementById('profile-form').style.display = 'block';
    });

    // Cancel button click event
    document.getElementById('cancel-edit-btn').addEventListener('click', function() {
        // Hide the edit form and show the display section
        document.getElementById('profile-form').style.display = 'none';
        document.getElementById('profile-display').style.display = 'block';
    });

    // Handle profile form submission
    document.getElementById('profile-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the new values from the form inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const contact = document.getElementById('contact').value;

        console.log('New values:', { name, email, location, contact }); // Debugging log

        // Read the existing profile picture from localStorage
        let profilePic = userDetails ? userDetails.profilePic : '';
        const profilePicInput = document.getElementById('profile-pic');

        // Check if a new profile picture has been selected
        if (profilePicInput.files && profilePicInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic = e.target.result; // Get the new profile picture data URL

                // Update user details in localStorage
                const updatedUserDetails = { name, email, location, contact, profilePic };
                localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
                console.log('Updated user details (with new profile pic):', updatedUserDetails); // Debugging log

                // Reload the profile display section with new details
                updateProfileDisplay(updatedUserDetails);

                // Hide the edit form and show the display section
                document.getElementById('profile-form').style.display = 'none';
                document.getElementById('profile-display').style.display = 'block';

                alert('Profile updated successfully!');
            };
            reader.readAsDataURL(profilePicInput.files[0]); // Read the new profile picture file
        } else {
            // If no new profile picture is selected, just update the other fields
            const updatedUserDetails = { name, email, location, contact, profilePic };
            localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
            console.log('Updated user details (without new profile pic):', updatedUserDetails); // Debugging log

            // Reload the profile display section with new details
            updateProfileDisplay(updatedUserDetails);

            // Hide the edit form and show the display section
            document.getElementById('profile-form').style.display = 'none';
            document.getElementById('profile-display').style.display = 'block';

            alert('Profile updated successfully!');
        }
    });

    // Function to update the profile display section
    function updateProfileDisplay(userDetails) {
        document.getElementById('display-name').textContent = userDetails.name;
        document.getElementById('display-email').textContent = userDetails.email;
        document.getElementById('display-location').textContent = userDetails.location;
        document.getElementById('display-contact').textContent = userDetails.contact;

        const displayProfilePic = document.getElementById('display-profile-pic');
        if (userDetails.profilePic) {
            displayProfilePic.src = userDetails.profilePic;
            displayProfilePic.style.display = 'block'; // Ensure the profile picture is visible
        } else {
            displayProfilePic.style.display = 'none'; // Hide if no profile picture
        }

        // Update the logo section
        document.getElementById('user-name').textContent = userDetails.name;
        document.getElementById('user-name').style.display = 'inline'; // Ensure it's visible

        const profileImg = document.getElementById('profile-img');
        if (userDetails.profilePic) {
            profileImg.src = userDetails.profilePic;
            profileImg.style.display = 'inline'; // Ensure it's visible
        } else {
            profileImg.style.display = 'none'; // Hide if no profile picture
        }
    }

    // Profile picture input change event
    document.getElementById('profile-pic').addEventListener('change', function() {
        const profilePicInput = this;
        if (profilePicInput.files && profilePicInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profilePicPreview = document.getElementById('profile-pic-preview');
                profilePicPreview.src = e.target.result;
                profilePicPreview.style.display = 'block';
            };
            reader.readAsDataURL(profilePicInput.files[0]);
        }
    });

    // Logout functionality
    document.querySelector('.logout').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        // Show a confirmation modal before logout
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('userDetails'); // Remove user details from localStorage
            window.location.href = '../../templates/index.html'; // Redirect to login page
        }
    });
});
