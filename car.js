class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0              // Текущая скорость
        this.acceleration = .2      // Ускорение
        this.maxSpeed = maxSpeed    // Максимальная скорость
        this.friction = 0.05        // Трение - замедление
        this.angle = 0              // Текущий угол поворота машины

        this.damaged = false        // Получила ли машина повреждения

        //Сенсоры
        if(controlType==='KEYS')
            this.sensor = new Sensor(this)
        // Управление
        this.controls = new Controls(controlType)

        // // Получаем 4точки по краям квадрата машины
        // this.poligon = this.#createPolygon()
    }

    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders, traffic);
        }

        if(this.sensor)
        {
            this.sensor.update(roadBorders, traffic);
        }

    }

    #createPolygon() {
        const points = []
        const rad = Math.hypot(this.width, this.height) / 2
        const alpha = Math.atan2(this.width, this.height)
        points.push({
                x: this.x - Math.sin(this.angle - alpha) * rad,
                y: this.y - Math.cos(this.angle - alpha) * rad
            },
            {
                x: this.x - Math.sin(this.angle + alpha) * rad,
                y: this.y - Math.cos(this.angle + alpha) * rad
            },
            // + 180*
            {
                x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
                y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
            },
            {
                x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
                y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
            }
        )

        return points
    }

    #assessDamage(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polysIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            if (polysIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }

        return false;
    }


    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration
        }

        if (this.controls.backward) {
            this.speed -= this.acceleration
        }

        // Проверка максимальной скорости
        if (this.speed > this.maxSpeed)
            this.speed = this.maxSpeed

        if (this.speed < -this.maxSpeed / 2)
            this.speed = -this.maxSpeed / 2

        // Трение
        if (this.speed > 0)
            this.speed -= this.friction
        if (this.speed < 0)
            this.speed += this.friction
        if (Math.abs(this.speed) < this.friction)
            this.speed = 0


        //Переворот управления если едем назад
        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            // Работа с углами
            if (this.controls.left) {
                this.angle += 0.03 * flip
            }

            if (this.controls.right) {
                this.angle -= 0.03 * flip
            }
        }

        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed
    }


    draw(ctx, color = "black") {

        // Рисуем по точкам
        if (this.damaged) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = color;
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();


        ctx.fill();


        /*
          ctx.save()
          ctx.translate(this.x, this.y)
          ctx.rotate(-this.angle)

          ctx.beginPath()
          ctx.rect(
              -this.width / 2,
              -this.height / 2,
              this.width,
              this.height
          )
          ctx.fill()


          ctx.restore()
          */

        if(this.sensor)
            this.sensor.draw(ctx)
    }
}