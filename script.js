/* =========================================================
   PRATHAMESH MATE PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   LOADER
   ========================================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 700);

});


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

const typingText = document.getElementById("typingText");

const typingWords = [
    "Web Developer",
    "Python Developer",
    "SQL Developer",
    "Computer Vision Developer",
    "UI Developer"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingText) {
        return;
    }


    const currentWord =
        typingWords[wordIndex];


    if (!deleting) {

        characterIndex++;

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        characterIndex--;

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % typingWords.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 55 : 90
    );

}


typeEffect();


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


if (menuBtn && navMenu) {

    menuBtn.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                navMenu.classList.contains("open")
                    ? "true"
                    : "false"
            );

        }
    );


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove(
                    "open"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =========================================================
   NAVBAR SCROLL
   ========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    function () {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 50) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    },
    { passive: true }
);


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(
        function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        }
    );


    navigationLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================================
   STICKY HORIZONTAL PROJECT SCROLL
   ========================================================= */

const projectSection =
    document.querySelector(
        ".projects-section"
    );


const projectWrappers =
    projectSection
        ? projectSection.querySelectorAll(
            ".project-row-wrapper"
        )
        : [];


const projectTrack =
    projectWrappers.length
        ? projectWrappers[0].querySelector(
            ".project-row"
        )
        : null;


if (
    projectTrack &&
    projectWrappers.length > 1
) {

    const extraTrack =
        projectWrappers[1].querySelector(
            ".project-row"
        );


    extraTrack.querySelectorAll(
        ".project-card"
    ).forEach(
        function (card) {

            projectTrack.appendChild(
                card
            );

        }
    );


    projectWrappers[1].remove();

}


function sizeProjectScrollSection() {

    if (!projectSection || !projectTrack) {
        return;
    }


    const travelDistance =
        Math.max(
            0,
            projectTrack.scrollWidth -
            window.innerWidth + 40
        );


    const projectViewport =
        projectSection.querySelector(
            ".project-row-wrapper"
        );


    const headingOffset =
        projectViewport.offsetTop;


    projectSection.style.height =
        `${headingOffset + projectViewport.offsetHeight + travelDistance}px`;

}


function updateProjectTrack() {

    if (!projectSection || !projectTrack) {
        return;
    }


    const sectionTop =
        projectSection.offsetTop;


    const scrollableDistance =
        Math.max(
            1,
            projectSection.offsetHeight -
            window.innerHeight
        );


    const progress =
        Math.max(
            0,
            Math.min(
                1,
                (window.scrollY - sectionTop) /
                scrollableDistance
            )
        );


    const travelDistance =
        Math.max(
            0,
            projectTrack.scrollWidth -
            window.innerWidth + 40
        );


    projectTrack.style.transform =
        `translate3d(${-travelDistance * progress}px, 0, 0)`;

}


sizeProjectScrollSection();
updateProjectTrack();


window.addEventListener(
    "resize",
    function () {

        sizeProjectScrollSection();
        updateProjectTrack();

    }
);


window.addEventListener(
    "scroll",
    updateProjectTrack,
    { passive: true }
);


/* =========================================================
   SIDE RAIL ANIMATION
   ========================================================= */

const leftColumn =
    document.getElementById(
        "leftColumn"
    );


const rightColumn =
    document.getElementById(
        "rightColumn"
    );


let lastSideScroll =
    window.scrollY;


function updateSideRails() {

    const current =
        window.scrollY;


    const difference =
        current - lastSideScroll;


    if (leftColumn) {

        const currentLeft =
            leftColumn.dataset.position
                ? Number(
                    leftColumn.dataset.position
                )
                : 0;


        const newLeft =
            currentLeft +
            difference * 0.18;


        leftColumn.style.transform =
            `translateY(calc(-50% + ${newLeft}px))`;


        leftColumn.dataset.position =
            newLeft;

    }


    if (rightColumn) {

        const currentRight =
            rightColumn.dataset.position
                ? Number(
                    rightColumn.dataset.position
                )
                : 0;


        const newRight =
            currentRight -
            difference * 0.18;


        rightColumn.style.transform =
            `translateY(calc(-50% + ${newRight}px))`;


        rightColumn.dataset.position =
            newRight;

    }


    lastSideScroll =
        current;

}


window.addEventListener(
    "scroll",
    updateSideRails,
    { passive: true }
);


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backTop =
    document.getElementById(
        "backTop"
    );


if (backTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 600
            ) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   PROJECT DATA
   ========================================================= */

const projectData = {

    1: {

        category:
            "COMPUTER VISION",

        title:
            "Eye Based Communication System",

        description:
            "An assistive communication system that uses a camera to detect eye movement and blinking. It helps a user select letters from a virtual keyboard and convert the final message into speech.",

        features: [
            "Eye blink and gaze based selection",
            "Virtual keyboard for composing messages",
            "Text-to-speech communication support"
        ],

        technologies: [
            "Python",
            "OpenCV",
            "Tkinter",
            "PIL",
            "pyttsx3",
            "Computer Vision"
        ]

    },


    2: {

        category:
            "SQL / DATABASE",

        title:
            "Movie Ticket Booking System",

        description:
            "A database-driven movie ticket booking system designed to manage movies, users, bookings and transactions. SQL queries help check seat availability and organize booking records.",

        features: [
            "Movie and show management",
            "Seat availability and booking records",
            "User and transaction tables"
        ],

        technologies: [
            "SQL",
            "Database Design",
            "Queries",
            "Booking Logic"
        ]

    },


    3: {

        category:
            "WEB DEVELOPMENT",

        title:
            "Personal Portfolio Website",

        description:
            "A responsive personal portfolio website presenting education, technical skills and projects through a clean interactive interface.",

        features: [
            "Responsive layout for desktop and mobile",
            "Animated project section and navigation",
            "Interactive project information modals"
        ],

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ]

    },


    4: {

        category:
            "SQL / ANALYTICS",

        title:
            "Sales Analytics Database",

        description:
            "A relational SQL project for organizing customers, products and orders, then turning that data into useful sales reports with joins, grouping, filtering and aggregate queries.",

        features: [
            "Customers, products and orders schema",
            "JOIN and GROUP BY reporting queries",
            "Sales filtering and summary analysis"
        ],

        technologies: [
            "SQL",
            "MySQL",
            "Joins",
            "Aggregate Queries",
            "Reporting"
        ]

    },


    5: {

        category:
            "SQL / MANAGEMENT",

        title:
            "Student Records Database",

        description:
            "A structured student records system designed with related tables for students, courses and results. It demonstrates CRUD operations, constraints and normalized database design.",

        features: [
            "Student, course and result tables",
            "CRUD operations and data validation",
            "Normalized relational database structure"
        ],

        technologies: [
            "SQL",
            "MySQL",
            "CRUD",
            "Normalization",
            "Database Design"
        ]

    },


    6: {

        category:
            "PYTHON / AI-ML",

        title:
            "Python AI/ML Practice App",

        description:
            "A small Python learning project focused on programming logic, AI/ML concepts and practical experimentation with modern AI tools.",

        features: [
            "Python programming and problem solving",
            "AI/ML concept exploration",
            "Practical automation experiments"
        ],

        technologies: [
            "Python",
            "AI/ML",
            "AI Tools",
            "Problem Solving"
        ]

    },


};


/* =========================================================
   OPEN PROJECT MODAL
   ========================================================= */

function openProject(projectNumber) {

    const project =
        projectData[projectNumber];


    if (!project) {
        return;
    }


    const modal =
        document.getElementById(
            "projectModal"
        );


    const modalCategory =
        document.getElementById(
            "modalCategory"
        );


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalDescription =
        document.getElementById(
            "modalDescription"
        );


    const modalTech =
        document.getElementById(
            "modalTech"
        );


    const modalFeatures =
        document.getElementById(
            "modalFeatures"
        );


    if (!modal) {
        return;
    }


    modalCategory.textContent =
        project.category;


    modalTitle.textContent =
        project.title;


    modalDescription.textContent =
        project.description;


    modalFeatures.innerHTML = "";


    project.features.forEach(
        function (feature) {

            const item =
                document.createElement(
                    "li"
                );


            item.textContent =
                feature;


            modalFeatures.appendChild(
                item
            );

        }
    );


    modalTech.innerHTML = "";


    project.technologies.forEach(
        function (technology) {

            const tag =
                document.createElement(
                    "span"
                );


            tag.textContent =
                technology;


            modalTech.appendChild(
                tag
            );

        }
    );


    modal.classList.add(
        "show"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE PROJECT MODAL
   ========================================================= */

function closeProject() {

    const modal =
        document.getElementById(
            "projectModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/*
   Make functions available to HTML
*/

window.openProject =
    openProject;


window.closeProject =
    closeProject;


/* =========================================================
   ESC KEY MODAL CLOSE
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeProject();

        }

    }
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const senderEmail =
                document.getElementById(
                    "email"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            const subject =
                `Portfolio message from ${name}`;


            const body =
                `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`;


            window.location.href =
                `mailto:prathameshmate2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


            if (formMessage) {

                formMessage.textContent =
                    "Your email app is opening with this message ready to send.";

            }

        }
    );

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const year =
    document.getElementById(
        "year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

const projectImages =
    document.querySelectorAll(
        ".project-image img"
    );


projectImages.forEach(
    function (image) {

        image.addEventListener(
            "error",
            function () {

                image.style.display =
                    "none";

                image.parentElement.style.background =
                    "linear-gradient(135deg, #181818, #262626)";

            }
        );

    }
);


const heroImages =
    document.querySelectorAll(
        ".hero-image, .about-image-box img"
    );


heroImages.forEach(
    function (image) {

        image.addEventListener(
            "error",
            function () {

                image.style.display =
                    "none";

                image.parentElement.style.background =
                    "linear-gradient(135deg, #181818, #262626)";

            }
        );

    }
);


/* =========================================================
   HERO PARALLAX
   ========================================================= */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


window.addEventListener(
    "scroll",
    function () {

        if (!heroImage) {
            return;
        }


        if (
            window.innerWidth <= 900
        ) {
            return;
        }


        const scroll =
            window.scrollY;


        const movement =
            Math.min(
                scroll * 0.08,
                35
            );


        heroImage.style.transform =
            `translateY(${movement}px)`;

    },
    { passive: true }
);


/* =========================================================
   PROJECT IMAGE HOVER
   ========================================================= */

document.querySelectorAll(
    ".project-card"
).forEach(
    function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                const image =
                    card.querySelector(
                        ".project-image img"
                    );


                if (image) {

                    image.style.transform =
                        "scale(1.08)";

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                const image =
                    card.querySelector(
                        ".project-image img"
                    );


                if (image) {

                    image.style.transform =
                        "scale(1)";

                }

            }
        );

    }
);


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.offsetTop -
                    navbarHeight;


                window.scrollTo({
                    top:
                        targetPosition,
                    behavior:
                        "smooth"
                });

            }
        );

    }
);


/* =========================================================
   RESIZE CLEANUP
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 700 &&
            navMenu
        ) {

            navMenu.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   INITIAL PROJECT POSITION
   ========================================================= */

function initializeProjectRows() {

    projectRows.forEach(
        function (row, index) {

            const direction =
                Number(
                    row.dataset.direction || 1
                );


            const initial =
                direction === 1
                    ? -100
                    : -500;


            row.style.transform =
                `translate3d(${initial}px, 0, 0)`;

        }
    );

}


initializeProjectRows();


/* =========================================================
   READY
   ========================================================= */

console.log(
    "Prathamesh Mate Portfolio JavaScript Loaded Successfully"
);


