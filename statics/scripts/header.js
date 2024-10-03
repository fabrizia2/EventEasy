class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- header.html -->
        <header>
            <div class="logo">
                <img id="logo" src="../statics/images/EVENTEASY_Logo_Design_2-removebg.png" alt="Eventeasy Logo">
            </div>
            <nav>
                <ul class="nav-links">
                    <li><a href="landing.html">Home</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="../../templates/login_signup.html" id="loginBt" class="btn login">Log In</a></li>
                    <li><a href="../../templates/login_signup.html" id="signupBt" class="btn signup">Sign Up</a></li>
                </ul>
                <div class="menu-toggle" id="menu-toggle">
                    <i class="fas fa-bars"></i>
                </div>
            </nav>
        </header>

        <!-- Modal for Log In/Sign Up -->
        <div id="authModal" class="modal">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <div id="authOptions">
                    <button id="loginModalBtn" class="btn">Log In</button>
                    <button id="signupModalBtn" class="btn">Sign Up</button>
                </div>
                <div id="loginForm" class="form-container" style="display: none;">
                    <h2>Log In</h2>
                    <form id="loginFormContent">
                        <label for="loginEmail">Email:</label>
                        <input type="email" id="loginEmail" name="email" required>
                        <label for="loginPassword">Password:</label>
                        <input type="password" id="loginPassword" name="password" required>
                        <button type="submit" class="btn">Log In</button>
                        <p><a href="#" id="forgotPassword">Forgot Password?</a></p>
                    </form>
                </div>
                <div id="signupForm" class="form-container" style="display: none;">
                    <h2>Sign Up</h2>
                    <form id="signupFormContent">
                        <label for="signupName">Name:</label>
                        <input type="text" id="signupName" name="name" required>
                        <label for="signupEmail">Email:</label>
                        <input type="email" id="signupEmail" name="email" required>
                        <label for="signupPassword">Password:</label>
                        <input type="password" id="signupPassword" name="password" required>
                        <label for="signupConfirmPassword">Confirm Password:</label>
                        <input type="password" id="signupConfirmPassword" name="confirmPassword" required>
                        <label for="signupPhone">Phone Number:</label>
                        <input type="tel" id="signupPhone" name="phone" required>
                        <label for="gender">Gender:</label>
                        <select id="gender1" name="gender" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <label for="userType">I am a:</label>
                        <select id="userType" name="userType" required>
                            <option value="client">Client</option>
                            <option value="serviceProvider">Service Provider</option>
                        </select>
                        
                        <button type="submit" class="btn">Sign Up</button>
                    </form>
                </div>
                <div id="forgotPasswordForm" class="form-container" style="display: none;">
                    <h2>Forgot Password</h2>
                    <form id="forgotPasswordFormContent">
                        <label for="forgotEmail">Email:</label>
                        <input type="email" id="forgotEmail" name="email" required>
                        <button type="submit" class="btn">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = `
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                background: #19433c; /* Original background color */
                color: #D7D7D7; /* Original text color */
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1000;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s, color 0.3s; /* Smooth transition */
            }

            /* Scrolled header styles */
            .scrolled {
                background-color: rgba(255, 255, 255, 0.5); /* Slightly opaque background when scrolled */
                color: black; /* Change text color to ensure visibility */
            }

            .scrolled .nav-links a {
                color: #19433c !important; /* Use !important if necessary */
            }

            .scrolled .btn.login {
                background: #19433c !important;
                color: white !important;
            }

            .scrolled .btn.signup {
                background: black !important;
                color: white !important;
            }

            /* Ensure logo image is not affected by color changes */
            .scrolled .logo img {
                filter: none !important;
            }

            header .logo img {
                width: 120px;
                transition: filter 0.3s;
            }
            header nav {
                position: relative;
            }
            header nav ul {
                list-style: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            header nav ul li {
                margin-right: 20px;
            }
            header nav ul li a {
                text-decoration: none;
                color: #D7D7D7;
            }
            
            header nav ul li a.btn.login {
                display: inline-block;
                padding: 10px 20px;
                background: white;
                color: black;
                text-decoration: none;
                border-radius: 5px;
            }
            header nav ul li a.btn.login:hover {
                background: #000000;
                color: white;
            }
            header nav ul li a.btn.signup {
                display: inline-block;
                padding: 10px 20px;
                background: #000000;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            header nav ul li a.btn.signup:hover {
                background: white;
                color: black;
            }
            .menu-toggle {
                display: none;
                font-size: 1.5em;
                cursor: pointer;
            }
            @media (max-width: 768px) {
                header nav ul {
                    flex-direction: column;
                    align-items: center;
                    display: none;
                }
                header nav ul.show {
                    display: flex;
                }
                header nav ul li {
                    margin: 10px 0;
                }
                .menu-toggle {
                    display: block;
                }
            }

            /* Modal styles */
            .modal {
                display: none;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgb(0,0,0);
                background-color: rgba(0,0,0,0.4);
                padding-top: 60px;
            }

            .modal-content {
                background-color: #fefefe;
                margin: 5% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
                max-width: 600px;
                border-radius: 10px;
                position: relative;
            }

            .close-btn {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }

            .close-btn:hover,
            .close-btn:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }

            .form-container {
                margin-top: 20px;
            }

            .form-container label {
                display: block;
                margin: 10px 0 5px;
            }

            .form-container input,
            .form-container select {
                width: 90%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }

            .form-container button {
                display: inline-block;
                padding: 10px 20px;
                background: #19433c;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                border: none;
                cursor: pointer;
            }

            .form-container button:hover {
                background: #000;
            }
        `;
        document.head.appendChild(styleElement);

        const scriptElement = document.createElement('script');
        scriptElement.textContent = `
            document.addEventListener('DOMContentLoaded', function() {
                // Mobile menu toggle
                document.getElementById('menu-toggle').addEventListener('click', function() {
                    var nav = document.querySelector('nav ul');
                    nav.classList.toggle('show');
                    this.querySelector('i').classList.toggle('fa-bars');
                    this.querySelector('i').classList.toggle('fa-times');
                });
                
                // Modal functionality
                const authModal = document.getElementById('authModal');
                const closeBtn = document.querySelector('.close-btn');
                const loginModalBtn = document.getElementById('loginModalBtn');
                const signupModalBtn = document.getElementById('signupModalBtn');
                const forgotPasswordLink = document.getElementById('forgotPassword');

                loginModalBtn.onclick = function() {
                    authModal.style.display = 'block';
                    // Show the login form
                };

                signupModalBtn.onclick = function() {
                    authModal.style.display = 'block';
                    // Show the signup form
                };

                forgotPasswordLink.onclick = function() {
                    authModal.style.display = 'block';
                    // Show the forgot password form
                };

                closeBtn.onclick = function() {
                    authModal.style.display = 'none';
                };

                window.onclick = function(event) {
                    if (event.target === authModal) {
                        authModal.style.display = 'none';
                    }
                };

                // Header transparency on scroll
                const header = document.querySelector('header'); // Correct header selector
                const logo = document.querySelector('.logo img'); // Correct logo selector
                const originalLogoSrc = '../statics/images/EVENTEASY_Logo_Design_2-removebg.png';
                const scrolledLogoSrc = '../statics/images/EVENTEASY Logo Design.png';
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 0) {
                        header.classList.add('scrolled');
                        logo.src = scrolledLogoSrc;
                    } else {
                        header.classList.remove('scrolled');
                        logo.src = originalLogoSrc;
                    }
                });

            });
        `;
        document.body.appendChild(scriptElement);

    }
}

customElements.define('my-header', MyHeader);
