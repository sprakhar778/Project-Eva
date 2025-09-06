# OnScreenCalculator

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](#) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Description

**OnScreenCalculator** is a lightweight, web‑based calculator that runs entirely in the browser. It provides an interactive UI with clickable buttons and full keyboard support, allowing users to perform basic arithmetic operations instantly. The app is built with vanilla HTML5, CSS3, and modern JavaScript (ES6), making it easy to understand, extend, and integrate into other projects.

## Features

- **Basic arithmetic** – addition, subtraction, multiplication, division.
- **Clear functions** – `AC` (All Clear) resets the whole expression, `C` (Clear) removes the last entry.
- **Keyboard support** – type numbers, operators, and use `Enter` for equals, `Backspace` for clear, etc.
- **Error handling** – division by zero or malformed expressions display an `Error` message.
- **Responsive layout** – works on desktop, tablets, and mobile devices.
- **Accessible UI** – ARIA live region for the display and meaningful `aria-label`s on buttons.

## Tech Stack

- **HTML5** – structure and semantic markup.
- **CSS3** – styling, grid layout, and responsive design.
- **JavaScript (ES6)** – core calculator logic, event handling, and keyboard integration.

## Installation / Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/your‑username/OnScreenCalculator.git
   cd OnScreenCalculator
   ```
2. **Open the app**
   - Simply open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. **Optional – serve with a static server**
   ```bash
   npx serve .
   ```
   This starts a local server at `http://localhost:5000` (or another port) which can be useful for debugging or when deploying.

## Keyboard Controls

| Key               | Action                     |
|-------------------|----------------------------|
| `0‑9`             | Insert corresponding digit |
| `.`               | Insert decimal point       |
| `+` `-` `*` `/`   | Insert operator            |
| `Enter` `=`       | Evaluate expression (`=` button) |
| `Backspace` `C`   | Clear last entry (`C` button) |
| `Escape` `AC`     | All Clear – reset calculator |
| `Delete`          | Same as `C` (clear last entry) |

## Error Handling

- **Division by zero** – attempting to divide by `0` results in the display showing `Error`.
- **Invalid expression** – any malformed input (e.g., `5++2` or stray decimal points) also triggers an `Error` message.
- After an error, the next valid input automatically clears the error state.

## Responsive Design

The calculator uses CSS Grid and flexible units to adapt to various screen sizes:
- **Desktop** – a compact, centered layout.
- **Tablet** – buttons enlarge slightly for comfortable tapping.
- **Mobile** – the grid expands to fill the width, and the display scales to remain readable.

## Contributing

Contributions are welcome! To get started:
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix.
3. Commit your changes with clear messages.
4. Open a Pull Request describing the changes.
5. Ensure the UI remains responsive and all existing functionality works.

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.
