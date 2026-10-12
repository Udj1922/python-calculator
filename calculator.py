#calculator

def calculate(num1, operator, num2):
    if operator == "+":
        result = num1 + num2
    elif operator == "-":
        result = num1 - num2
    elif operator == "*":
        result = num1 * num2
    elif operator == "/":
        result = num1 / num2
    elif operator == "%":
        result = num1 % num2
    elif operator == "//":
        result = num1 // num2
    elif operator == "**":
        result = num1 ** num2
    else:
        raise ValueError("Invalid operator.")

    return result

if __name__ == "__main__":
    history = []

    while True:
        print("1.Calculate, 2.history, 3.Exit")
        choice = input("Enter the choice: ")
        if choice == "1":
            while True:
                try:
                    num1 = float(input("Enter the first number: "))
                    operator = input("Enter the operator(+,-,*,/,//,%,**): ")
                    num2 = float(input("Enter the second number: "))

                    answer = calculate(num1, operator, num2)
                    print(f"Answer: {answer}")

                    history.append(f"{num1} {operator} {num2} = {answer}")

                    another_calculation = input("Do you what to perform another calculation?(yes/no): ").lower()

                    if another_calculation != "yes":
                        break

                except ValueError:
                    print("Invalid number or operator. please enter valid numbers or operator only")
                except ZeroDivisionError:
                    print("Cannot divide by zero.")
        elif choice == "2":
            print(history)
        elif choice == "3":
            break
        else:
            print("Invalid choice")

