# WikiGroup Wiki Project

## Overview
The WikiGroup Wiki project is a collaborative platform designed to facilitate the creation, editing, and organization of content in a wiki format. This project aims to provide a user-friendly interface for teams to document their projects, share knowledge, and enhance communication.

## Project Structure
The project is organized into several key directories and files:

- **public/**: Contains all publicly accessible files, including CSS, JavaScript, images, and the main HTML file.
  - **css/**: Styles for the application.
    - `style.css`: Defines the visual presentation of HTML elements.
  - **js/**: JavaScript files for functionality.
    - `custom.js`: Custom JavaScript code for enhanced interactivity.
    - `all.js`: Additional JavaScript libraries or scripts.
  - **images/**: Contains images used in the application.
    - `logo.png`: The logo image for the application.
  - `index.html`: The main entry point for the web application.

- **templates/**: Contains HTML templates for the application.
  - `layout.html`: The main layout template defining the overall structure of the HTML pages.
  - `menu.html`: The navigation menu HTML.
  - `footer.html`: The footer section HTML.

- **src/**: Contains the source code for the application.
  - **main/java/[your_package]/**: Java source files.
    - `Application.java`: The main Java application file with the `main` method.

- **resources/**: Contains configuration files.
  - `application.properties`: Configuration properties for the application.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd wikigroup-wiki
   ```

2. **Install Dependencies**
   Ensure you have the necessary dependencies installed. Refer to the specific instructions for your build tool (e.g., Maven, Gradle).

3. **Run the Application**
   Navigate to the `src/main/java/[your_package]` directory and run the `Application.java` file to start the application.

4. **Access the Application**
   Open your web browser and go to `http://localhost:8080` to access the WikiGroup Wiki.

## Usage
- Users can create and edit wiki pages to document their projects.
- The navigation menu allows easy access to different sections of the wiki.
- The footer provides additional links and information about the project.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.