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
                    <li><a href="index.html">Home</a></li>
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
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = `
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                background: #19433c;
                color: #D7D7D7;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1000;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s, color 0.3s;
            }

            .scrolled {
                background-color: rgba(255, 255, 255, 0.5);
                color: black;
            }

            .scrolled .nav-links a {
                color: #19433c !important;
            }

            .scrolled .btn.login {
                background: #19433c !important;
                color: white !important;
            }

            .scrolled .btn.signup {
                background: black !important;
                color: white !important;
            }

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
        `;
        document.head.appendChild(styleElement);

        const scriptElement = document.createElement('script');
        scriptElement.textContent = `
            document.addEventListener('DOMContentLoaded', function() {
                document.getElementById('menu-toggle').addEventListener('click', function() {
                    var nav = document.querySelector('nav ul');
                    nav.classList.toggle('show');
                    this.querySelector('i').classList.toggle('fa-bars');
                    this.querySelector('i').classList.toggle('fa-times');
                });

                // Header transparency on scroll
                const header = document.querySelector('header');
                const logo = document.querySelector('.logo img');
                const originalLogoSrc = '../statics/images/EVENTEASY_Logo_Design_2-removebg.png';
                const scrolledLogoSrc = '../statics/images/EVENTEASY Logo Design.png';

                window.addEventListener('scroll', function() {
                    console.log('Scroll event detected:', window.scrollY); // Debug log
                    if (window.scrollY > 0) {
                        header.classList.add('scrolled');
                        logo.src = scrolledLogoSrc;
                        console.log('Header scrolled class added'); // Debug log
                    } else {
                        header.classList.remove('scrolled');
                        logo.src = originalLogoSrc;
                        console.log('Header scrolled class removed'); // Debug log
                    }
                });
            });
        `;
        document.body.appendChild(scriptElement);
    }
}

customElements.define('my-header', MyHeader);
