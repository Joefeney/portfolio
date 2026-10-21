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
