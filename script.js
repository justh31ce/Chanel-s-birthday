/* =========================================
   ELEMENTS
========================================= */

const openSurprise =
    document.getElementById("openSurprise");

const introScreen =
    document.getElementById("introScreen");

const birthdayContent =
    document.getElementById("birthdayContent");

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


/* =========================================
   OPEN BIRTHDAY SURPRISE
========================================= */

openSurprise.addEventListener(
    "click",
    () => {

        /*
         * Hide introduction.
         */

        introScreen.classList.add(
            "hidden"
        );


        /*
         * Show birthday website.
         */

        birthdayContent.classList.remove(
            "hidden"
        );


        /*
         * Start music.

         * Browsers normally prevent
         * autoplay, but because this
         * happens after a button click,
         * the browser should allow it.
         */

        music
            .play()
            .then(() => {

                musicButton.textContent =
                    "❚❚";

            })
            .catch(() => {

                musicButton.textContent =
                    "♪";

            });


        /*
         * Create birthday celebration.
         */

        birthdayBurst();


        /*
         * Make sure the website starts
         * at the top.
         */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   MUSIC CONTROL
========================================= */

musicButton.addEventListener(
    "click",
    () => {

        /*
         * If music is currently stopped,
         * start it.
         */

        if (music.paused) {

            music
                .play()
                .then(() => {

                    musicButton.textContent =
                        "❚❚";

                })
                .catch(() => {});

        }

        /*
         * Otherwise pause the music.
         */

        else {

            music.pause();

            musicButton.textContent =
                "♪";

        }

    }
);


/* =========================================
   FLOATING HEARTS
========================================= */

function createHeart() {

    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "heart";


    /*
     * Randomly choose between
     * hearts and stars.
     */

    const symbols = [
        "♡",
        "✦",
        "✧",
        "♥"
    ];


    heart.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    /*
     * Random horizontal position.
     */

    heart.style.left =
        Math.random() *
        100 +
        "vw";


    /*
     * Random size.
     */

    heart.style.fontSize =
        10 +
        Math.random() *
        18 +
        "px";


    /*
     * Random animation duration.
     */

    heart.style.animationDuration =
        5 +
        Math.random() *
        7 +
        "s";


    /*
     * Random birthday color.
     */

    const colors = [
        "#e9a7b9",
        "#f4d58d",
        "#ffffff"
    ];


    heart.style.color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    /*
     * Add to page.
     */

    document.body.appendChild(
        heart
    );


    /*
     * Remove after animation.
     */

    setTimeout(
        () => {

            heart.remove();

        },
        13000
    );

}


/*
 * Keep creating floating
 * birthday decorations.
 */

setInterval(
    createHeart,
    900
);


/* =========================================
   BIRTHDAY BURST
========================================= */

function birthdayBurst() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 35
        );

    }

}


/* =========================================
   PARTICLE SYSTEM
========================================= */

let stars = [];


/*
 * Resize canvas to browser window.
 */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    /*
     * Create stars.

     * Number changes depending
     * on screen size.
     */

    const starCount =
        Math.min(
            150,
            Math.floor(
                window.innerWidth /
                7
            )
        );


    stars =
        Array.from(
            {
                length: starCount
            },
            () => {

                return {

                    x:
                        Math.random() *
                        canvas.width,

                    y:
                        Math.random() *
                        canvas.height,

                    radius:
                        Math.random() *
                        1.5 +
                        0.2,

                    opacity:
                        Math.random(),

                    speed:
                        Math.random() *
                        0.008 +
                        0.002

                };

            }
        );

}


/* =========================================
   ANIMATE PARTICLES
========================================= */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(
        (star) => {

            /*
             * Slowly change opacity
             * to create a twinkling effect.
             */

            star.opacity +=
                star.speed;


            const opacity =
                0.2 +
                Math.abs(
                    Math.sin(
                        star.opacity
                    )
                ) *
                0.65;


            ctx.globalAlpha =
                opacity;


            ctx.fillStyle =
                "#ffffff";


            ctx.beginPath();


            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }
    );


    /*
     * Keep animation running.
     */

    requestAnimationFrame(
        animateParticles
    );

}


/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   START PARTICLES
========================================= */

resizeCanvas();

animateParticles();
