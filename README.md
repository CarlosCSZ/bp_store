# BpProducts

This project is an Angular application for managing banks products.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
- [Usage](#usage)
- [Running Tests](#running-tests)
  - [Unit Tests](#unit-tests)
- [Build](#build)
- [Further Help](#further-help)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 18 or above)
- [Angular CLI](https://angular.io/cli) (version 17 or above)
- [pnpm](https://pnpm.io/installation) (lastest version)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/BpProducts.git
cd BpProducts
pnpm install
```

2. Configure environment variables:

- Navigate to src/environments/ and open the environment.dev.ts for development, or environment.prd.ts file.
- Adjust the API_URL and authorId variables if needed.

### Development Server

- Run the application

```bash
pnpm start
```

- Navigate to http://localhost:4200/ in your browser.

## Usage

BpProducts is an intuitive and user-friendly platform that offers various functionalities for efficient financial product management. Here are the key features:

1. Presentation Screen:

- Upon launching the application, a presentation screen lists the available financial products.
- The clean and organized interface facilitates the identification of products and provides an overview of the financial offerings.

2. Dynamic Search:

- The application features a powerful search engine that allows users to instantly filter products.
- A search input provides a fast and efficient experience by displaying results that match the entered characters.

3. Product Quantity Selector:

- A selector is incorporated, allowing users to choose the number of products they want to view on the main screen.
- Options include displaying 4, 10, or 20 products, providing flexibility and adaptability to user preferences.

4. Smart Pagination:

- For extensive product sets, the application implements pagination to ensure easy and quick navigation.
- Pagination is automatically activated when the number of products exceeds the defined quantity for display.

5. Add Products Screen:

- The application provides a dedicated interface for adding new products to the system.
- A reactive form validates fields synchronously and asynchronously, ensuring the integrity of the entered information.

6. Edit Products Screen:

- Similar in design to the creation screen, the edit screen allows modifications to the details of existing products.
- The reactive form facilitates the editing of fields and ensures a consistent user experience.

7. Product Deletion with Modal:

- The main screen includes a contextual menu offering options to edit or delete products.
- When selecting the deletion option, a confirmation modal is displayed, requesting confirmation before proceeding with the deletion.

## Running Tests

### Unit Tests

- Execute `pnpm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

```bash
  pnpm test
```

## Build

- Build the project:

```bash
  pnpm build
```

- The build artifacts will be stored in the dist/ directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
