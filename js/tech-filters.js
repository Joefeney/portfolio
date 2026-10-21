const initializeTechFilters = () => {
    const filters = document.querySelectorAll("[data-tech-filter]");
    const categories = document.querySelectorAll("[data-tech-category]");

    if (!filters.length || !categories.length) return;

    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            const selectedCategory = filter.dataset.techFilter;

            filters.forEach((button) => {
                const isSelected = button === filter;
                button.classList.toggle("is-active", isSelected);
                button.setAttribute("aria-pressed", String(isSelected));
            });

            categories.forEach((category) => {
                const isVisible = selectedCategory === "all" || category.dataset.techCategory === selectedCategory;
                category.hidden = !isVisible;

                if (isVisible) {
                    // AOS may have measured these cards before their section was filtered
                    // into view, leaving them transparent after the section is unhidden.
                    category.querySelectorAll(".tech-card[data-aos]").forEach((card) => {
                        card.classList.add("aos-animate");
                    });
                }
            });

            const allCards = document.querySelectorAll(".tech-card");
            const visibleCards = document.querySelectorAll(".tech-category:not([hidden]) .tech-card");
            allCards.forEach((card) => {
                card.classList.remove("filter-reveal");
                card.style.removeProperty("--filter-animation-delay");
            });
            void document.querySelector(".tech-stack-page").offsetHeight;
            visibleCards.forEach((card, index) => {
                card.style.setProperty("--filter-animation-delay", `${Math.min(index % 6, 5) * 35}ms`);
                card.classList.add("filter-reveal");
            });

            if (window.AOS) {
                requestAnimationFrame(() => window.AOS.refreshHard());
            }
        });
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTechFilters, { once: true });
} else {
    initializeTechFilters();
}
