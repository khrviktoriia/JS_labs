//Завдання 1.2.3 - 1.2.10 

const car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.tuning = true;
car1.number_of_accidents = 0;

car1.driver = new Object();
car1.driver.name = "Христан Вікторія";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

car1.drive = function() {
    console.log("I am not driving at night");
};

const car2 = {
    color: "blue",
    maxSpeed: 180,
    tuning: false,
    number_of_accidents: 2,
    driver: {
        name: "Христан Вікторія",
        category: "B",
        "personal limitations": null
    }
};

car2.drive = function() {
    console.log("I can drive anytime");
};

console.log("Виклик car1.drive():");
car1.drive();
console.log("Виклик car2.drive():");
car2.drive();


function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
    
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let msg = `Driver [${this.driver.name}]`;
            if (this.driver.nightDriving === true) {
                msg += " drives at night";
            } else {
                msg += " does not drive at night";
            }
            msg += ` and has [${this.driver.experience}] years of experience.`;
            console.log(msg);
        }
    };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

console.log("\n--- Тестування Truck ---");
const truck1 = new Truck("black", 5000, 80, "Volvo", "FH16");
const truck2 = new Truck("white", 4500, 85, "MAN", "TGX");

truck1.AssignDriver("Іван Іванов", true, 5);
truck2.AssignDriver("Петро Петров", false, 2);

truck1.trip();
truck2.trip();


//  Завдання 1.2.11 - 1.2.24 

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Квадрат — це правильний чотирикутник, у якого всі сторони і кути рівні.");
    }

    length() {
        console.log(`Периметр квадрата: ${this.a * 4}`);
    }

    square() {
        console.log(`Площа квадрата: ${this.a * this.a}`);
    }

    info() {
        console.log("--- Інфо: Квадрат ---");
        console.log(`Довжини сторін: a=b=c=d=${this.a}`);
        console.log("Величини кутів: 90°, 90°, 90°, 90°");
        console.log(`Периметр: ${this.a * 4}`);
        console.log(`Площа: ${this.a * this.a}`);
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Прямокутник — чотирикутник, у якого всі кути прямі.");
    }

    length() {
        console.log(`Периметр прямокутника: ${(this.a + this.b) * 2}`);
    }

    square() {
        console.log(`Площа прямокутника: ${this.a * this.b}`);
    }

    info() {
        console.log("--- Інфо: Прямокутник ---");
        console.log(`Довжини сторін: a=${this.a}, b=${this.b}, c=${this.a}, d=${this.b}`);
        console.log("Величини кутів: 90°, 90°, 90°, 90°");
        console.log(`Периметр: ${(this.a + this.b) * 2}`);
        console.log(`Площа: ${this.a * this.b}`);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Ромб — це паралелограм, у якого всі сторони рівні.");
    }

    length() {
        console.log(`Периметр ромба: ${this.a * 4}`);
    }

    square() {
        const rad = (this.beta * Math.PI) / 180;
        const S = this.a * this.a * Math.sin(rad);
        console.log(`Площа ромба: ${S.toFixed(2)}`);
    }

    info() {
        console.log("--- Інфо: Ромб ---");
        console.log(`Довжини сторін: всі сторони = ${this.a}`);
        console.log(`Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        console.log(`Периметр: ${this.a * 4}`);
        this.square(); 
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this._alpha = alpha;
        this._beta = beta;
    }

    get alpha() { return this._alpha; }
    set alpha(val) { this._alpha = val; }

    get beta() { return this._beta; }
    set beta(val) { this._beta = val; }

    static help() {
        console.log("Паралелограм — чотирикутник, у якого протилежні сторони попарно паралельні.");
    }

    length() {
        console.log(`Периметр паралелограма: ${(this.a + this.b) * 2}`);
    }

    square() {
        const rad = (this._beta * Math.PI) / 180;
        const S = this.a * this.b * Math.sin(rad);
        console.log(`Площа паралелограма: ${S.toFixed(2)}`);
    }

    info() {
        console.log("--- Інфо: Паралелограм ---");
        console.log(`Сторони: a=${this.a}, b=${this.b}`);
        console.log(`Кути: ${this._alpha}°, ${this._beta}°`);
        console.log(`Периметр: ${(this.a + this.b) * 2}`);
        this.square();
    }
}

console.log("\n--- Тест Статичних методів help() ---");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

console.log("\n--- Тест методів info() ---");
const mySquare = new Square(5);
const myRectangle = new Rectangle(4, 6);
const myRhombus = new Rhombus(5, 120, 60);
const myParallelogram = new Parallelogram(4, 7, 110, 70);

mySquare.info();
myRectangle.info();
myRhombus.info();
myParallelogram.info();


// Завдання 1.2.25 - 1.2.31

function Triangular(a = 3, b = 4, c = 5) {
    const obj = { a, b, c };
    return obj;
}

console.log("\nТест функції Triangular:");
const t1 = Triangular(); 
const t2 = Triangular(6, 8, 10);
const t3 = Triangular(5, 5, 5);
console.log("Об'єкт 1:", t1);
console.log("Об'єкт 2:", t2);
console.log("Об'єкт 3:", t3);


function PiMultiplier(num) {
    return function() {
        return Math.PI * num;
    };
}

console.log("\nТест PiMultiplier:");
const p1 = PiMultiplier(2);
const p2 = PiMultiplier(2 / 3);
const p3 = PiMultiplier(0.5);

console.log("π * 2 =", p1());
console.log("π * (2/3) =", p2());
console.log("π / 2 =", p3());


function Painter(color) {
    return function(obj) {
        if (obj && obj.type !== undefined) {
            console.log(`%cColor: ${color}, Type: ${obj.type}`, `color: ${color}; font-weight: bold;`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

console.log("\nТест Painter:");
const obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const obj2 = { "avg speed": 90, type: "Truck", "load capacity": 2400 };
const obj3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);
