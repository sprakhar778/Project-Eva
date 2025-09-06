def add(a, b):
    """Add two numbers and return the result."""
    return a + b


def subtract(a, b):
    """Subtract two numbers and return the result."""
    return a - b


def multiply(a, b):
    """Multiply two numbers and return the result."""
    return a * b


def divide(a, b):
    """Divide two numbers and handle division by zero."""
    if b == 0:
        return "Error: Division by zero is undefined."
    return a / b


def main():
    """Main function to run the CLI application."""
    while True:
        print("Calculator CLI")
        print("1. Add")
        print("2. Subtract")
        print("3. Multiply")
        print("4. Divide")
        print("5. Exit")
        choice = input("Choose an operation (1-5): ")

        if choice == '5':
            print("Exiting...")
            break

        if choice not in ['1', '2', '3', '4']:
            print("Invalid choice. Please select a valid operation (1-4).")
            continue

        try:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))
        except ValueError:
            print("Invalid input. Please enter numeric values for numbers.")
            continue

        if choice == '1':
            result = add(num1, num2)
        elif choice == '2':
            result = subtract(num1, num2)
        elif choice == '3':
            result = multiply(num1, num2)
        elif choice == '4':
            result = divide(num1, num2)

        print(f"Result: {result}")


if __name__ == "__main__":
    main()
