console.log("ІНСТРУКЦІЯ З ВИКОРИСТАННЯ");
console.log("Функція обчислює прямокутний трикутник за двома елементами.");
console.log("Виклик: triangle(значення1, 'тип1', значення2, 'тип2')");
console.log("Допустимі типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'");

function triangle(val1, type1, val2, type2) {
    if (val1 === undefined || type1 === undefined || val2 === undefined || type2 === undefined) {
        console.log("Помилка: Необхідно передати всі 4 аргументи. Перечитайте інструкцію.");
        return "failed";
    }

    if (typeof val1 !== 'number' || typeof val2 !== 'number' || typeof type1 !== 'string' || typeof type2 !== 'string') {
        console.log("Помилка: Некоректні типи даних аргументів (значення мають бути числами, типи — рядками).");
        return "failed";
    }

    if (val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "failed";
    }

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: Некоректний тип елемента. Перечитайте інструкцію.");
        return "failed";
    }

    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    let a, b, c, alpha, beta;

    const args = [
        { val: val1, type: type1 },
        { val: val2, type: type2 }
    ];

    const leg1 = args.find(arg => arg.type === "leg");
    const leg2 = args.filter(arg => arg.type === "leg")[1]; // якщо введено два катети
    const hypotenuse = args.find(arg => arg.type === "hypotenuse");
    const adjAngle = args.find(arg => arg.type === "adjacent angle");
    const oppAngle = args.find(arg => arg.type === "opposite angle");
    const angle = args.find(arg => arg.type === "angle");


    if (args.filter(arg => arg.type === "leg").length === 2) {
        a = args[0].val;
        b = args[1].val;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    }
 
    else if (leg1 && hypotenuse) {
        c = hypotenuse.val;
        a = leg1.val;

        if (a >= c) {
            console.log("Помилка: Катет не може бути більшим або рівним гіпотенузі.");
            return "failed";
        }

        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }
    

    else if (leg1 && adjAngle) {
        a = leg1.val;
        beta = adjAngle.val;

        if (beta >= 90) {
            console.log("Помилка: Гострий кут прямокутного трикутника повинен бути меншим за 90°.");
            return "failed";
        }

        alpha = 90 - beta;
        c = a / Math.cos(toRad(beta));
        b = Math.sqrt(c * c - a * a);
    }
  
    else if (leg1 && oppAngle) {
        a = leg1.val;
        alpha = oppAngle.val;

        if (alpha >= 90) {
            console.log("Помилка: Гострий кут прямокутного трикутника повинен бути меншим за 90°.");
            return "failed";
        }

        beta = 90 - alpha;
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
    }
  
    else if (hypotenuse && angle) {
        c = hypotenuse.val;
        alpha = angle.val;

        if (alpha >= 90) {
            console.log("Помилка: Гострий кут прямокутного трикутника повинен бути меншим за 90°.");
            return "failed";
        }

        beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    }

    else {
        console.log("Помилка: Несумісна або неповна комбінація типів для розрахунку.");
        return "failed";
    }

  
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);

    return "success";
}
