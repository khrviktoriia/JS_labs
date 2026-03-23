(function () {
    
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    console.log("%c--- Завдання 1.2.2: Основний цикл (J/j check) ---", "color: green; font-weight: bold;");

    for (var i = 0; i < names.length; i++) {
       
        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === 'j') {
            byeSpeaker.speak(names[i]);
        } else {
            helloSpeaker.speak(names[i]);
        }
    }

   
    console.log("\n%c--- Додатковий функціонал: Пошук імен, що закінчуються на 'n' ---", "color: blue; font-weight: bold;");
    console.log("Анотація: Перевіряємо останній символ кожного імені за допомогою властивості length та charAt.");

    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var lastLetter = name.charAt(name.length - 1).toLowerCase();

        if (lastLetter === 'n') {
            console.log("Found name ending with 'n': " + name);
        }
    }
})(); - file: script.js
