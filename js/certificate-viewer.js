document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector(".certificate-viewer");
    const viewerImage = dialog?.querySelector("[data-viewer-image]");
    const viewerStage = dialog?.querySelector(".certificate-viewer-stage");
    const closeButton = dialog?.querySelector("[data-viewer-close]");

    if (!dialog || !viewerImage || !viewerStage) return;

    const fitImage = () => {
        if (!viewerImage.naturalWidth || !viewerImage.naturalHeight || !dialog.open) return;

        const availableWidth = viewerStage.clientWidth - 24;
        const availableHeight = viewerStage.clientHeight - 24;
        const scale = Math.min(
            availableWidth / viewerImage.naturalWidth,
            availableHeight / viewerImage.naturalHeight
        );

        viewerImage.style.width = `${Math.floor(viewerImage.naturalWidth * scale)}px`;
        viewerImage.style.height = `${Math.floor(viewerImage.naturalHeight * scale)}px`;
    };

    viewerImage.addEventListener("load", fitImage);
    window.addEventListener("resize", fitImage);

    document.querySelectorAll("[data-certificate-src]").forEach((preview) => {
        preview.addEventListener("click", () => {
            viewerImage.src = preview.dataset.certificateSrc;
            viewerImage.alt = preview.querySelector("img")?.alt ?? "Certificate preview";
            document.body.classList.add("certificate-viewer-open");
            dialog.showModal();
            requestAnimationFrame(fitImage);
            closeButton?.focus();
        });
    });

    closeButton?.addEventListener("click", () => dialog.close());

    dialog.addEventListener("close", () => {
        document.body.classList.remove("certificate-viewer-open");
    });

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
});
