const numberButtons = document.querySelectorAll(".number:not(.operator):not(.clear):not(.delete):not(.decimal)");
const expressionDisplay = document.querySelector("#expression");
const display = document.querySelector("#display");

numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        expressionDisplay.textContent += button.textContent;
    });
});

const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", function() {
    expressionDisplay.textContent = "";
    display.textContent = "";
});

const deleteButton = document.querySelector(".delete");

deleteButton.addEventListener("click", function() {
    expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1);

    if(expressionDisplay.textContent === "") {
        display.textContent = "";
    }
});

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const expression = expressionDisplay.textContent;
        const lastChar = expression.slice(-1);
        const operators = ["+", "-", "X", "/"];

        if (expression === "" || display.textContent === "Error") {
            return;
        }

        if (operators.includes(lastChar)) {
            expressionDisplay.textContent = expression.slice(0, -1) + button.textContent;
        } else {
            expressionDisplay.textContent += button.textContent;
        }
    });
});

const decimalButton = document.querySelector(".decimal");

decimalButton.addEventListener("click", function() {
    expressionDisplay.textContent += ".";
});

const equalButton = document.querySelector(".equals");

equalButton.addEventListener("click", function() {
    const expression = expressionDisplay.textContent;
    const operators = ["+", "-", "X", "/"];

    for (const operator of operators) {
        if (expression.includes(operator)) {
            const parts = expression.split(operator);

            if (parts.length !== 2 || parts[0] === "" || parts[1] === "") {
                display.textContent = "Error";
                return;
            }

            const num1 = Number(parts[0]);
            const num2 = Number(parts[1]);

            if (Number.isNaN(num1) || Number.isNaN(num2)) {
                display.textContent = "Error";
                return;
            }

            const data = {
                num1: num1,
                operator: operator === "X" ? "*" : operator,
                num2: num2
            };

            fetch("/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if(result.error){
                    display.textContent = "Error";
                }
                else{
                    display.textContent = result.answer;

                    const historyList = document.querySelector("#history-list");

                    const historyItem = document.createElement("li");
                    historyItem.textContent = `${num1} ${operator} ${num2} = ${result.answer}`;

                    historyList.prepend(historyItem);

                    while (historyList.children.length > 5) {
                        historyList.removeChild(historyList.lastElementChild);
                    }
                }
            })

            .catch(() => {
                display.textContent = "Error";
            });

            return;
        }
    }
});

const historyButton = document.querySelector(".history");
const historyPanel = document.querySelector("#history-panel");

historyButton.addEventListener("click", function(){
    const historyList = document.querySelector("#history-list");
    const showingHistory = historyList.style.display !== "none";

    historyList.style.display = showingHistory ? "none" : "block";

    expressionDisplay.style.display = showingHistory ? "block" : "none";
    display.style.display = showingHistory ? "block" : "none";
});

document.querySelector("#clear-history").addEventListener("click", function(){
    document.querySelector("#history-list").innerHTML = "";
});