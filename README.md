# Vue 3 & Tailwind CSS Portfolio

This is a modern, fully responsive portfolio website built with Vue 3, Vite, and Tailwind CSS. It features a clean design, smooth animations, and a structure designed to be powered by a dynamic backend. The project also includes a foundational layout for a CMS/admin dashboard to manage portfolio content.

## ✨ Key Features

-   **Fully Responsive Design**: A custom 3-tier navigation system ensures a great user experience on any device.
    -   **Mobile (`<768px`):** A clean, icon-only navigation bar fixed to the bottom.
    -   **Tablet (`768px - 1024px`):** A horizontal navigation bar at the top with icons and text for clarity.
    -   **Desktop (`>1024px`):** An elegant, expanding icon-to-text navigation bar.
-   **Dynamic Content Ready**: The application is architected to be easily connected to a backend. All portfolio sections (Projects, Experiences, Tech Stacks, etc.) are designed to be managed dynamically.
-   **Comprehensive Database Schema**: Includes a `schema.dbml` file that defines a complete and scalable database structure, ready for backend development.
-   **Interactive UI**: Engaging user experience with modals for project details, smooth page transitions, and hover animations.
-   **Admin Dashboard Layout**: A complete layout for a backend dashboard is included, with a responsive sidebar and header, ready for building out content management functionality.

## 🚀 Tech Stack

-   **Vue 3**: A progressive JavaScript framework for building user interfaces.
-   **Vite**: A build tool that provides a faster and leaner development experience.
-   **Vue Router**: The official router for Vue.js.
-   **Pinia**: The official state management library for Vue.js.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Axios**: A promise-based HTTP client for making API requests.
-   **ApexCharts**: A modern charting library for creating interactive charts and graphs.
-   **SweetAlert2**: A beautiful and customizable replacement for JavaScript's popup boxes.

## 📦 Installation and Usage

### Prerequisites

-   Node.js (v16 or higher recommended)
-   npm

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/your-username/vue-portfolio-numen.git
    ```

2.  Navigate to the project directory:

    ```sh
    cd vue-portfolio-numen
    ```

3.  Install the dependencies:

    ```sh
    npm install
    ```

### Development

To start the development server with hot-reloading, run the following command:

```sh
npm run dev
```

### Production

To build the application for production, run the following command:

```sh
npm run build
```

This will create a `dist` directory with the optimized and minified files.

## 📁 Project Structure

The project follows a standard Vue.js application structure, with a few additions for better organization:

-   `src/assets`: Static assets like images, fonts, and stylesheets.
-   `src/components`: Reusable Vue components.
-   `src/composables`: Vue composables for reusable logic.
-   `src/constants`: Application-wide constants.
-   `src/data`: Mock data for development.
-   `src/layouts`: Layout components for different page structures.
-   `src/router`: Vue Router configuration.
-   `src/services`: Services for making API calls.
-   `src/stores`: Pinia store modules.
-   `src/utils`: Utility functions.
-   `src/views`: Page components.

## 🔗 Backend Integration

This project is designed to be connected to a backend for dynamic content management. The `axios` library is pre-configured for making API requests. You can find the service files in the `src/services` directory, which can be modified to interact with your backend API.

The `schema.dbml` file in the root directory provides a blueprint for the database schema, which you can use to set up your backend database.

## 🤝 Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
