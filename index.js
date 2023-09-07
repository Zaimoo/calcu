
const operators = document.querySelectorAll(".operators button");
const numbers = document.querySelectorAll("#numbers button");
const equals = document.getElementById("equalTo");
const clear = document.getElementById("clearinput");
let input = document.getElementById("input");
let outputDisplayed = false;

for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function (e) {
        let currentString = input.textContent
        let lastChar = currentString[currentString.length - 1];

        if (outputDisplayed === false) {
            input.textContent += e.target.textContent;
        } else if (outputDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "÷" || lastChar === "×") {
            outputDisplayed = false;
            input.textContent += e.target.textContent;
        } else {

            outputDisplayed = false;
            input.textContent = "";
            input.textContent += e.target.textContent;
        }

    })
}

for (i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function (e) {
        let currentString = input.textContent;
        let lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "÷" || lastChar === "×") {
            let newString = currentString.substring(0, currentString.length - 1) + e.target.textContent;
            input.textContent = newString;
        } else if (currentString.length === 0) {
            console.log("Please enter a number!")
        } else {
            input.textContent += e.target.textContent;
        }

    })

equals.addEventListener("click", function() {

    let inputString = input.innerHTML

    let numbers = inputString.split(/\+|\-|\÷|\×/g)

    let operators = inputString.replace(/[0-9]|\./g, "").split("");
    console.log(numbers)
    console.log(operators)

    let divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
      }

      let multiply = operators.indexOf("×");
      while (multiply != -1) {
          numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
          operators.splice(multiply, 1);
          multiply = operators.indexOf("×");
        }

        let subtract = operators.indexOf("-");
        while (subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
          }

          let add = operators.indexOf("+");
          while (add != -1) {
              numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
              operators.splice(add, 1);
              add = operators.indexOf("+");
            }

      input.textContent = numbers[0];

    outputDisplayed = true;
})

clear.addEventListener("click", function(){
    
    input.textContent = "";
})


}