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
                group.hidden = selectedCategory !== "all"
                    && group.dataset.credentialGroup !== selectedCategory;
            });
        });
    });
});
