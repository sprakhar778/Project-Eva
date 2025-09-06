import unittest
from unittest.mock import patch
import calculator

class TestCalculator(unittest.TestCase):
    def test_add(self):
        self.assertEqual(calculator.add(1, 1), 2)
        self.assertEqual(calculator.add(-1, 1), 0)
        self.assertEqual(calculator.add(-1, -1), -2)
        self.assertEqual(calculator.add(0, 0), 0)

    def test_subtract(self):
        self.assertEqual(calculator.subtract(1, 1), 0)
        self.assertEqual(calculator.subtract(-1, 1), -2)
        self.assertEqual(calculator.subtract(-1, -1), 0)
        self.assertEqual(calculator.subtract(0, 0), 0)

    def test_multiply(self):
        self.assertEqual(calculator.multiply(2, 3), 6)
        self.assertEqual(calculator.multiply(-2, 3), -6)
        self.assertEqual(calculator.multiply(-2, -3), 6)
        self.assertEqual(calculator.multiply(0, 100), 0)

    def test_divide(self):
        self.assertEqual(calculator.divide(6, 3), 2)
        self.assertEqual(calculator.divide(-6, 3), -2)
        self.assertEqual(calculator.divide(-6, -3), 2)
        self.assertEqual(calculator.divide(0, 1), 0)
        self.assertEqual(calculator.divide(5, 2), 2.5)
        self.assertEqual(calculator.divide(1, 0), "Error: Division by zero is undefined.")
    
    @patch('builtins.input', side_effect=['6', '5'])
    @patch('builtins.print')
    def test_invalid_operation_choice(self, mock_print, mock_input):
        calculator.main()
        mock_print.assert_any_call("Invalid choice. Please select a valid operation (1-4).")

    @patch('builtins.input', side_effect=['1', 'a', 'b', '5'])
    @patch('builtins.print')
    def test_non_numeric_input(self, mock_print, mock_input):
        calculator.main()
        mock_print.assert_any_call("Invalid input. Please enter numeric values for numbers.")


if __name__ == '__main__':
    unittest.main()