document.addEventListener("DOMContentLoaded", () => {

    const carCanvas = document.getElementById("carCanvas");
    carCanvas.width = 400;
    const networkCanvas = document.getElementById("networkCanvas");
    networkCanvas.width = 600;

    const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9)
    const lineCenter = road.getLaneCenter(2)


    const ctxCar = carCanvas.getContext("2d");
    const ctxNetwork = networkCanvas.getContext("2d");


    // Отрисовка машины игрока
    const car = new Car(lineCenter, 100, 30, 50, "AI");


    // Машины манекены
    const traffic = [
        new Car(road.getLaneCenter(0), -200, 30, 50, "DUMMY", 2.5),
        new Car(road.getLaneCenter(1), -150, 30, 50, "DUMMY", 2.0),
        new Car(road.getLaneCenter(2), -100, 30, 50, "DUMMY", 1.0),
        new Car(road.getLaneCenter(3), -100, 30, 50, "DUMMY", 1.2),
        new Car(road.getLaneCenter(4), -100, 30, 50, "DUMMY", 1.5),
    ]


    animate()

    function animate(time) {
        for (let i = 0; i < traffic.length; i++) {
            traffic[i].update(road.borders, []);
        }
        car.update(road.borders, traffic)

        carCanvas.height = window.innerHeight // очищаем хост
        networkCanvas.height = window.innerHeight // очищаем хост

        ctxCar.save()
        ctxCar.translate(0, -car.y + carCanvas.height * 0.5)

        road.draw(ctxCar)

        traffic.forEach(car => {
            car.draw(ctxCar, "blue");
        })

        car.draw(ctxCar, "green")

        ctxNetwork.lineDashOffset = -time / 50
        Visualizer.drawNetwork(ctxNetwork, car.brain)


        ctxCar.restore()
        requestAnimationFrame(animate)
    }

});