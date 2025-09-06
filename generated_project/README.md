# Calculator Application

This is a simple Command Line Interface (CLI) calculator application implemented in Python. It allows users to perform basic arithmetic operations such as addition, subtraction, multiplication, and division.

## Features

- **Addition**: Add two numbers.
- **Subtraction**: Subtract the second number from the first number.
- **Multiplication**: Multiply two numbers.
- **Division**: Divide the first number by the second number with a check for division by zero.

## Setup

### Prerequisites

- Python 3.x must be installed on your system.

### How to Run

1. Clone the repository or download the `calculator.py` file to your local machine.
2. Open a terminal or command prompt.
3. Navigate to the directory where `calculator.py` is located.
4. Run the application using the command:
   ```
   python calculator.py
   ```

## Usage

When you run the application, it will display a menu with the following options:

1. **Add**: Allows you to add two numbers.
2. **Subtract**: Allows you to subtract the second number from the first.
3. **Multiply**: Allows you to multiply two numbers.
4. **Divide**: Allows you to divide the first number by the second. If the second number is zero, it will display an error message.
5. **Exit**: Exit the application.

### Example Session

```plaintext
Calculator CLI
1. Add
2. Subtract
3. Multiply
4. Divide
5. Exit
Choose an operation (1-5): 1
Enter first number: 10
Enter second number: 5
Result: 15.0

Calculator CLI
1. Add
2. Subtract
3. Multiply
4. Divide
5. Exit
Choose an operation (1-5): 5
Exiting...
```

## Description of Operations

- **Add**: This function takes two inputs and returns their sum.
- **Subtract**: This function takes two inputs and returns the result of deducting the second from the first.
- **Multiply**: This function takes two inputs and returns their product.
- **Divide**: This function takes two inputs and returns the result of dividing the first by the second. It also checks if the divisor is zero to avoid division errors, returning a specific error message if so.

## Notes

- Ensure that you input numeric values when prompted to enter numbers.
- If an invalid menu option is selected, the application will prompt you to choose a valid option (1-4).
- Division by zero is handled gracefully with an error message.

That's all you need to know to start using the Calculator CLI application!