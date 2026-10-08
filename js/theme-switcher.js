document.addEventListener("DOMContentLoaded", function () {
    const themeBtn = document.getElementById("themeBtn");
    const body = document.body;

    // Define theme colors
    const themes = {
        "dark": "#121212",
        "light": "#fff5e1",
        "navy": "#1b1b3a",
        "dustygold": "#b68d40",
        "teal": "#008080",
        "maroon": "#800000"
    };

    // Set the default or saved theme
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme && themes[savedTheme]) {
        body.style.backgroundColor = themes[savedTheme];
        themeBtn.querySelector("span").textContent = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1);  // Show theme name
        updateThemeIcon(savedTheme);  // Update the icon accordingly
    }

    // Add event listener to the theme button
    themeBtn.addEventListener("click", function () {
        let currentTheme = body.getAttribute("data-theme");
        
        // Cycle through the themes
        const themeOrder = ["dark", "light", "navy", "dustygold", "teal", "maroon"];
        let currentIndex = themeOrder.indexOf(currentTheme);
        let nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

        body.style.backgroundColor = themes[nextTheme];
        body.setAttribute("data-theme", nextTheme);

        themeBtn.querySelector("span").textContent = nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1);  // Update button text
        updateThemeIcon(nextTheme);

        
        localStorage.setItem("selectedTheme", nextTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector("i");
        switch (theme) {
            case "dark":
                icon.className = "fas fa-moon";  // Moon for Dark theme
                break;
            case "light":
                icon.className = "fas fa-sun";  // Sun for Light theme
                break;
            case "navy":
                icon.className = "fas fa-anchor";  // Anchor for Navy theme
                break;
            case "dustygold":
                icon.className = "fas fa-gem";  // Gold for Dusty Gold theme
                break;
            case "teal":
                icon.className = "fas fa-tint";  // Water droplet for Teal theme
                break;
            case "maroon":
                icon.className = "fas fa-tint";  // Tint for Maroon theme
                break;
        }
    }
});
