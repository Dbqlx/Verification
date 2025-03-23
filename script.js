document.getElementById("start-btn").addEventListener("click", function () {
    // Remove start screen
    document.getElementById("start-screen").remove();

    // Show main screen
    document.getElementById("main-screen").classList.remove("hidden");

    // Show verification text & button
    document.getElementById("verification-text").classList.remove("hidden");
    document.getElementById("verify-btn").classList.remove("hidden");

    // Play looping music
    let audio = document.getElementById("audio");
    audio.play();

    // Start Snow Effect
    startSnow();
});

document.getElementById("verify-btn").addEventListener("click", function () {
    let btn = document.getElementById("verify-btn");
    btn.classList.add("expand"); // Make the button bigger

    let texts = ["Loading", "Loading.", "Loading..", "Loading..."];
    let counter = 0;

    let interval = setInterval(() => {
        btn.innerText = texts[counter % texts.length];
        counter++;

        if (counter === Math.floor(Math.random() * 3) + 3) { // Random between 3-5 sec
            clearInterval(interval);
            btn.innerText = "עשיתם אימות בהצלחה";
            setTimeout(() => {
                btn.classList.add("slide-down"); // Slide the button down
            }, 3000);
        }
    }, 1000);
});

// Snow Effect
function startSnow() {
    const canvas = document.getElementById("snow-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let snowflakes = [];

    function createSnowflakes() {
        for (let i = 0; i < 100; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 4 + 1,
                speedY: Math.random() * 3 + 2,
            });
        }
    }

    function updateSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        for (let flake of snowflakes) {
            flake.y += flake.speedY;
            if (flake.y > canvas.height) flake.y = 0;

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(updateSnow);
    }

    createSnowflakes();
    updateSnow();
}
