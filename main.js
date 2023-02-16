document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("myCanvas");
    canvas.width = 400;

    const road = new Road(canvas.width / 2, canvas.width * 0.9)
    const lineCenter = road.getLaneCenter(2)


    const ctx = canvas.getContext("2d");


    // Отрисовка машины игрока
    const car = new Car(lineCenter, 100, 30, 50, "KEYS");


    // Машины манекены
    const traffic = [
        new Car(road.getLaneCenter(0), -200, 30, 50, "DUMMY", 2.5),
        new Car(road.getLaneCenter(1), -150, 30, 50, "DUMMY", 2.0),
        new Car(road.getLaneCenter(2), -100, 30, 50, "DUMMY", 1.0),
        new Car(road.getLaneCenter(3), -100, 30, 50, "DUMMY", 1.2),
        new Car(road.getLaneCenter(4), -100, 30, 50, "DUMMY", 1.5),
    ]


    animate()

    function animate() {
        for(let i=0;i<traffic.length;i++){
            traffic[i].update(road.borders,[]);
        }
        car.update(road.borders,traffic)

        canvas.height = window.innerHeight // очищаем хост

        ctx.save()
        ctx.translate(0, -car.y + canvas.height * 0.5)

        road.draw(ctx)

        traffic.forEach(car => {
            car.draw(ctx, "blue");
        })

        car.draw(ctx, "green")


        ctx.restore()
        requestAnimationFrame(animate)
    }

});