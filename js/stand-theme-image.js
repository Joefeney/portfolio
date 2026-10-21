document.addEventListener("DOMContentLoaded", () => {
    const standImage = document.querySelector("#theme-stand-image");
    if (!standImage) return;

    const standByTheme = {
        dark: {
            src: "assets/images/stands/stand-dark.webp",
            alt: "Purple Haze stand artwork"
        },
        light: {
            src: "assets/images/stands/stand-light.webp",
            alt: "The World Over Heaven stand artwork"
        },
        teal: {
            src: "assets/images/stands/stand-crimson.webp",
            alt: "King Crimson stand artwork"
        },
        forest: {
            src: "assets/images/stands/stand-green.webp",
            alt: "Hierophant Green stand artwork"
        }
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentTheme = document.body.dataset.theme || "dark";
    let exitHandler;
    let enterHandler;

    Object.values(standByTheme).forEach(({ src }) => {
        const image = new Image();
        image.src = src;
    });

    function removeAnimationHandlers() {
        if (exitHandler) standImage.removeEventListener("animationend", exitHandler);
        if (enterHandler) standImage.removeEventListener("animationend", enterHandler);
        exitHandler = undefined;
        enterHandler = undefined;
    }

    function setStand(themeName) {
        const stand = standByTheme[themeName];
        if (!stand) return;
        standImage.src = stand.src;
        standImage.alt = stand.alt;
    }

    function animateIn() {
        standImage.classList.remove("is-entering", "is-exiting");
        void standImage.offsetWidth;
        standImage.classList.add("is-entering");
        enterHandler = (event) => {
            if (event.target !== standImage || event.animationName !== "stand-slide-in") return;
            standImage.classList.remove("is-entering");
            standImage.removeEventListener("animationend", enterHandler);
            enterHandler = undefined;
        };
        standImage.addEventListener("animationend", enterHandler);
    }

    setStand(currentTheme);
    if (!reducedMotion.matches) animateIn();

    window.addEventListener("portfolio:themechange", (event) => {
        const nextTheme = event.detail?.theme;
        if (!standByTheme[nextTheme] || nextTheme === currentTheme) return;

        currentTheme = nextTheme;
        removeAnimationHandlers();

        if (reducedMotion.matches) {
            standImage.classList.remove("is-entering", "is-exiting");
            setStand(nextTheme);
            return;
        }

        standImage.classList.remove("is-entering", "is-exiting");
        void standImage.offsetWidth;
        standImage.classList.add("is-exiting");
        exitHandler = (animationEvent) => {
            if (animationEvent.target !== standImage || animationEvent.animationName !== "stand-slide-out") return;
            standImage.removeEventListener("animationend", exitHandler);
            exitHandler = undefined;
            setStand(nextTheme);
            animateIn();
        };
        standImage.addEventListener("animationend", exitHandler);
    });
});
