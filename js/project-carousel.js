document.addEventListener("DOMContentLoaded", () => {
    const slides = [
        document.getElementById("project-logo-slide"),
        document.getElementById("project-team-slide")
    ];
    const previousButton = document.querySelector(".project-previous-button");
    const nextButton = document.querySelector(".project-next-button");
    const indicators = [...document.querySelectorAll(".project-slide-dot")];

    if (slides.some((slide) => !slide) || !previousButton || !nextButton || indicators.length !== slides.length) return;

    let activeIndex = 0;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.hidden = !isActive;
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        indicators.forEach((indicator, indicatorIndex) => {
            const isActive = indicatorIndex === activeIndex;
            indicator.classList.toggle("is-active", isActive);
            indicator.setAttribute("aria-pressed", String(isActive));
        });
    };

    previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
    nextButton.addEventListener("click", () => showSlide(activeIndex + 1));
    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => showSlide(Number(indicator.dataset.slide)));
    });

    showSlide(activeIndex);
});
