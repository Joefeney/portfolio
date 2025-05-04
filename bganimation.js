document.addEventListener("DOMContentLoaded", function () {
    const bgContainer = document.querySelector(".bganimation");

    function createShape() {
        const shape = document.createElement("div");
        const isCircle = Math.random() > 0.5;
        shape.classList.add("shape", isCircle ? "circle" : "square");

        
        shape.style.top = Math.random() * window.innerHeight + "px";
        shape.style.left = Math.random() * window.innerWidth + "px";

        
        const size = 40 + Math.random() * 40;
        shape.style.width = size + "px";
        shape.style.height = size + "px";
        shape.style.opacity = Math.random().toFixed(1);

        bgContainer.appendChild(shape);

        
        setTimeout(() => shape.remove(), 5000); 
    }


    setInterval(createShape, 600);
});
