document.addEventListener("DOMContentLoaded", () => {
    const members = Array.from(document.querySelectorAll(".team-member"));

    if (!members.length) return;

    const closeMember = (member) => {
        member.classList.remove("is-open");
        member.querySelector(".member-hotspot")?.setAttribute("aria-expanded", "false");
    };

    members.forEach((member) => {
        const button = member.querySelector(".member-hotspot");

        member.addEventListener("mouseenter", () => button?.setAttribute("aria-expanded", "true"));
        member.addEventListener("mouseleave", () => {
            if (!member.classList.contains("is-open")) button?.setAttribute("aria-expanded", "false");
        });
        member.addEventListener("focusin", () => button?.setAttribute("aria-expanded", "true"));
        member.addEventListener("focusout", (event) => {
            if (!member.contains(event.relatedTarget) && !member.classList.contains("is-open")) {
                button?.setAttribute("aria-expanded", "false");
            }
        });

        button?.addEventListener("click", () => {
            const shouldOpen = !member.classList.contains("is-open");
            members.forEach(closeMember);
            if (shouldOpen) {
                member.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".team-member")) members.forEach(closeMember);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") members.forEach(closeMember);
    });
});
