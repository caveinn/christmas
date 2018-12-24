let canvas = document.getElementById('tutorial');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ctx.fillRect(20, 20, 100, 100);
// ctx.clearRect(40, 40, 60, 60);

class Circle {
    constructor(x, y, dy, dx, radius, color) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.dx = dx;
        this.radius = radius
        this.color = color
        this.collisions = 0;
    }

    update() {
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy *= -1
        }

        this.x += this.dx
        this.y += this.dy

        this.draw()
    }

    colided(circle) {
        if (circle) {
            let hyp = Math.sqrt(Math.pow((circle.x - this.x), 2) + Math.pow((circle.y - this.y), 2))
            if (hyp <= circle.radius + this.radius) {
                return true
            }
        }
        return false
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();

    }
}

let circles = []
let colors = [
    "#ff0000",
    "#ff7878",
    "#74d680",
    "#371769",
    "#378b29",

]

for (let i = 0; i < 200; i++) {
    let x = Math.random() * (innerWidth - 20) + 10
    let y = Math.random() * (innerHeight -20) + 10
    let vx = Math.random() * 2 + 1
    let vy = Math.random() * 1 + 1
    let radius = Math.random() * (8 - 3) + 3
    let color = colors[Math.floor(Math.random() * colors.length)]
    let circle = new Circle(x, y, vx, vy, radius, color)
    let invades = false;
    for (let j = 0; j < i; j++) {
        if (circle.colided(circles[j])) {
            invades = true;
        }
    }
    if (!invades) {
        circles.push(circle)
    }

}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
    ctx.fillRect(0, 0, innerWidth, innerHeight)
    for (let i = 0; i < circles.length; i++) {
        for (let j = 0; j < circles.length; j++) {
            if (j != i) {
                if (circles[i].colided(circles[j])) {
                    circles[i].dx = -circles[i].dx;
                    circles[i].dy = -circles[i].dy;
                    // circles[i].color = colors[Math.floor(Math.random() * colors.length)];
                    break;
                }
            }

        }
        circles[i].update()
    }
    ctx.fillStyle = 'black'
    ctx.font = "italic 80px Great Vibes";
    ctx.fillText("Merry Christmas", innerWidth/2 - 300, innerHeight/2 - 30);

}

animate();
