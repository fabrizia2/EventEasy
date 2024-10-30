class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- footer.html -->
        <footer>
            <p>Contact us at <a href="mailto:info@eventeasy.com">info@eventeasy.com</a></p>
            <ul>
                <li><a href="https://www.facebook.com/profile.php?id=61565886325908&mibextid=ZbWKwL" target="_blank"><i class="fab fa-facebook"></i></a></li>
                <li><a href="https://www.linkedin.com/company/eventeasy-kenya/" target="_blank"><i class="fab fa-linkedin"></i></a></li>
                <li><a href="https://www.tiktok.com/@eventeasykenya?_t=8qc9C7RHOFx&_r=1" target="_blank"><i class="fab fa-tiktok"></i></a></li>
                <li><a href="https://www.instagram.com/eventeasy_kenya/" target="_blank"><i class="fab fa-instagram"></i></a></li>
            </ul>
        </footer>
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Footer styles */
            footer {
                background-color: #19433c;
                padding: 20px;
                color: #D7D7D7;
                text-align: center;
            }

            footer a {
                color: #D7D7D7;
                text-decoration: none;
            }

            footer ul {
                list-style: none;
                padding: 10px;
                display: flex;
                justify-content: center;
            }

            footer ul li {
                margin: 0 10px;
            }

            footer ul li a i {
                font-size: 1.5em;
            }
        `;
        document.head.appendChild(styleElement);
    }
}

customElements.define('my-footer', MyFooter);
