# LeetMetrics

A responsive **LeetCode statistics dashboard** built with HTML, CSS, and JavaScript.

Enter a LeetCode username to view solved problems by difficulty and submission statistics.

## 🚀 Features

- Search LeetCode users by username
- Easy, Medium, and Hard solved problem statistics
- Circular progress indicators
- Overall submission statistics
- Modern gradient UI
- Responsive design for desktop, tablet, and mobile
- Dynamic cards generated with JavaScript
- Fetches data using LeetCode GraphQL

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- GraphQL
- CSS Grid
- Flexbox

## 📊 Statistics

The dashboard displays:

- Easy Problems Solved
- Medium Problems Solved
- Hard Problems Solved
- Overall Submissions
- Overall Easy Submissions
- Overall Medium Submissions
- Overall Hard Submissions

## 📁 Project Structure

```text
LeetMetrics/
├── index.html
├── style.css
├── index.js
└── README.md
```

## ▶️ How to Run

1. Clone or download this repository.
2. Open the project in VS Code.
3. Run `index.html` with Live Server.
4. Enter a valid LeetCode username.
5. Click **Search**.

## 🔗 How It Works

The application sends a GraphQL request and receives the user's LeetCode statistics.

JavaScript then:

1. Validates the username.
2. Sends the request.
3. Reads the JSON response.
4. Calculates progress percentages.
5. Updates the progress circles.
6. Creates the statistics cards dynamically.

## ⚠️ CORS Proxy Note

This project uses a public CORS proxy for development. Public demo proxies can have temporary access limits or may become unavailable.

For a production project, use your own backend/server-side proxy instead of depending on a public CORS proxy.

## 📱 Responsive Design

The UI is responsive across:

- Desktop
- Tablet
- Mobile

The progress circles and statistics cards automatically adjust on smaller screens.

## 🎯 What I Practiced

This project helped me practice:

- DOM manipulation
- Async/Await
- Fetch API
- GraphQL
- JSON data handling
- Array methods
- Dynamic HTML generation
- CSS Grid and Flexbox
- Responsive web design
- Form/input validation

## 👨‍💻 Author

**Krishnendu Guria**

If you like this project, consider giving the repository a ⭐ on GitHub.
