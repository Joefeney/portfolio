document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll("[data-credential-filter]");
    const groups = document.querySelectorAll("[data-credential-group]");

    if (!filters.length || !groups.length) return;

    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            const selectedCategory = filter.dataset.credentialFilter;

            filters.forEach((button) => {
                const isSelected = button === filter;
                button.classList.toggle("is-active", isSelected);
                button.setAttribute("aria-pressed", String(isSelected));
            });

            groups.forEach((group) => {
                const isVisible = selectedCategory === "all"
                    || group.dataset.credentialGroup === selectedCategory;
                group.hidden = !isVisible;

                if (isVisible && group.hasAttribute("data-aos")) {
                    // AOS may have measured this group while the filter kept it hidden.
                    group.classList.add("aos-animate");
                }
            });

            const allCards = document.querySelectorAll("[data-credential-group] article");
            const visibleCards = document.querySelectorAll("[data-credential-group]:not([hidden]) article");
            allCards.forEach((card) => {
                card.classList.remove("filter-reveal");
                card.style.removeProperty("--filter-animation-delay");
            });
            void document.querySelector(".certificates-container").offsetHeight;
            visibleCards.forEach((card, index) => {
                card.style.setProperty("--filter-animation-delay", `${Math.min(index % 6, 5) * 35}ms`);
                card.classList.add("filter-reveal");
            });

            if (window.AOS) {
                requestAnimationFrame(() => window.AOS.refreshHard());
            }
        });
    });
});
