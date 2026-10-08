document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".theme-dropdown");
    const trigger = dropdown?.querySelector(".theme-trigger");
    const menu = dropdown?.querySelector(".theme-menu");
    const themeIcon = dropdown?.querySelector("#theme-icon");
    const themeLabel = dropdown?.querySelector("#theme-label");
    const themeOptions = [...(menu?.querySelectorAll("[data-theme]") ?? [])];
    const body = document.body;

    if (!dropdown || !trigger || !menu || !themeIcon || !themeLabel) return;

    const themes = {
        dark: { icon: "fa-moon", label: "Dark" },
        light: { icon: "fa-sun", label: "Light" },
        teal: { icon: "fa-tint", label: "Teal" },
        forest: { icon: "fa-leaf", label: "Forest" }
    };

    function applyTheme(themeName) {
        const theme = themes[themeName];
        if (!theme) return;

        body.setAttribute("data-theme", themeName);
        themeIcon.className = `fas ${theme.icon}`;
        themeLabel.textContent = theme.label;
        themeOptions.forEach((option) => {
            option.setAttribute("aria-checked", String(option.dataset.theme === themeName));
        });
        localStorage.setItem("selectedTheme", themeName);
    }

    function closeMenu(returnFocus = false) {
        menu.hidden = true;
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        if (returnFocus) trigger.focus();
    }

    function openMenu(focusSelected = false) {
        menu.hidden = false;
        dropdown.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        if (focusSelected) {
            (themeOptions.find((option) => option.getAttribute("aria-checked") === "true") ?? themeOptions[0])?.focus();
        }
    }

    trigger.addEventListener("click", () => {
        if (menu.hidden) openMenu();
        else closeMenu();
    });

    themeOptions.forEach((option, index) => {
        option.addEventListener("click", () => {
            applyTheme(option.dataset.theme);
            closeMenu(true);
        });

        option.addEventListener("keydown", (event) => {
            let nextIndex;
            if (event.key === "ArrowDown") nextIndex = (index + 1) % themeOptions.length;
            else if (event.key === "ArrowUp") nextIndex = (index - 1 + themeOptions.length) % themeOptions.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = themeOptions.length - 1;
            else if (event.key === "Escape") {
                event.preventDefault();
                closeMenu(true);
                return;
            }

            if (nextIndex !== undefined) {
                event.preventDefault();
                themeOptions[nextIndex].focus();
            }
        });
    });

    trigger.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu(true);
        }
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) closeMenu();
    });

    const savedTheme = localStorage.getItem("selectedTheme");
    applyTheme(themes[savedTheme] ? savedTheme : "dark");
});
