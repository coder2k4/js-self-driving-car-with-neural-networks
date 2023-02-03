document.addEventListener("DOMContentLoaded", ()=>{

    const canvas=document.getElementById("myCanvas");
    canvas.width=200;


    // Отрисовка машины
    const ctx = canvas.getContext("2d");
    const car=new Car(100,100,30,50);
    car.draw(ctx);

    animate()

    function animate() {
        car.update()
        canvas.height = window.innerHeight // очищаем хост
        car.draw(ctx);
        requestAnimationFrame(animate)
    }

});