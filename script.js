document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // Change icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-hidden');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Active Navigation Link Highlighting
    const sectionsToTrack = document.querySelectorAll('section');
    const navAnchors = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sectionsToTrack.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
        
        // Sticky Navbar background effect
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 10, 22, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(3, 10, 22, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });
    
// Contact Form Submission
    const form = document.querySelector('.contact-form');
    const popup = document.getElementById('confirmation-popup');
    const closePopupBtn = document.getElementById('close-popup');

        if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const formData = {

                name: document.getElementById("name").value,

                email: document.getElementById("email").value,

                message: document.getElementById("message").value

            };

            try {

                const response = await fetch("http://localhost:5000/api/contact", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)

                });

                if (response.ok) {

                    popup.classList.add("active");

                    form.reset();

                } else {

                    alert("Failed to send message.");

                }

            } catch (error) {

                console.error(error);

                alert("Server error.");

            }

        });

    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }

    // Close popup on click outside
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    }


// LOAD PROJECTS FROM BACKEND


async function loadProjects() {
    try {
        console.log("Loading projects...");

        const response = await fetch("http://localhost:5000/api/projects");

        const projects = await response.json();

        console.log(projects);

        // Find the projects container
        const projectsGrid = document.getElementById("projects-grid");

        console.log(projectsGrid);
    
        projects.forEach(project => {

    projectsGrid.innerHTML += `
        <div class="project-card glass-card">

            <div class="project-info">
                <div class="project-badges">

                    <span class="category-badge">
                        ${project.category}
                    </span>

                </div>

                <h3>${project.title}</h3>

                <p>${project.description || "No description available."}</p>

                <div class="project-tech">

                    ${project.technology.map(tech => `
                        <span>${tech}</span>
                    `).join("")}

                </div>
                <div class="project-links" style="display:flex; gap:1rem; margin-top:auto;">

                <a href="${project.liveDemo}"
                class="btn primary-btn small"
                target="_blank">
                View Live Site
                </a>

                <a href="${project.github}"
                class="btn secondary-btn small"
                target="_blank">

                <i class="fab fa-github"></i>
                GitHub Repo

                </a>

            </div>

            </div>

        </div>
    `;

});

    } catch (error) {
        console.error("Error:", error);
    }
}

loadProjects();


// LOAD SKILLS FROM BACKEND


async function loadSkills() {
    try {

        console.log("Loading skills...");

        const response = await fetch("http://localhost:5000/api/skills");

        const skills = await response.json();

        console.log(skills);

        const skillsWrapper = document.getElementById("skills-wrapper");

        skillsWrapper.innerHTML = "";

        skills.forEach(skill => {

            skillsWrapper.innerHTML += `
                <div class="skill-item glass-card">

                    <i class="${skill.icon}"></i>

                    <span>${skill.name}</span>

                </div>
            `;

        });

    } catch (error) {

        console.error("Error loading skills:", error);

    }
}

loadSkills();



// LOAD ABOUT FROM BACKEND


async function loadAbout() {
    try {

        console.log("Loading about...");

        const response = await fetch("http://localhost:5000/api/about");

        const about = await response.json();

        console.log(about);

        const aboutContent = document.getElementById("about-content");

        aboutContent.innerHTML = "";

        about.bio.forEach(paragraph => {

            aboutContent.innerHTML += `
                <p>${paragraph}</p>
            `;

        });

    } catch (error) {

        console.error("Error loading about:", error);

    }
}

loadAbout();



});