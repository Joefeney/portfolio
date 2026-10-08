document.addEventListener("wheel", (event) => {
    if (event.ctrlKey || event.shiftKey || event.deltaY === 0 || event.deltaX !== 0) return;

    const target = event.target;
    const nestedScroller = target instanceof Element
        ? target.closest(".about-me, .section-container, .timeline-container")
        : null;

    if (nestedScroller) {
        const canScrollDown = event.deltaY > 0 && nestedScroller.scrollTop + nestedScroller.clientHeight < nestedScroller.scrollHeight;
        const canScrollUp = event.deltaY < 0 && nestedScroller.scrollTop > 0;
        if (canScrollDown || canScrollUp) return;
    }

    if (target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']")) return;

    const pageScroller = document.scrollingElement;
    if (!pageScroller || pageScroller.scrollHeight <= window.innerHeight) return;

    const unitScale = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;

    event.preventDefault();
    pageScroller.scrollTop += event.deltaY * unitScale * 0.7;
}, { passive: false });
