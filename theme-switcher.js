document.addEventListener("DOMContentLoaded", function () {
    const themeSelector = document.getElementById("theme-selector");
    const body = document.body;

    // Apply navbar styling to the dropdown
    themeSelector.style.backgroundColor = "#121212";
    themeSelector.style.color = "#e1e1e1";
    themeSelector.style.fontFamily = "inherit";
    themeSelector.style.border = "none";
    themeSelector.style.padding = "10px";
    themeSelector.style.cursor = "pointer";

    const themes = {
        "dark": "#121212",
        "light": "#fff5e1",
        "navy": "#1b1b3a",
        "dustygold": "#b68d40",
        "teal": "#008080",
        "maroon": "#800000"
    };

    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme && themes[savedTheme]) {
        body.style.backgroundColor = themes[savedTheme];
        themeSelector.value = savedTheme;
    }

    themeSelector.addEventListener("change", function () {
        const selectedTheme = themeSelector.value;
        body.style.backgroundColor = themes[selectedTheme];
        localStorage.setItem("selectedTheme", selectedTheme);
    });
});
