# Learnify

Learnify is a modern, personalized learning management platform designed to bridge the gap between educators and students through secure, role-specific environments.

Built with a React frontend and centralized authentication via AWS Amplify, the platform ensures distinct experiences: teachers have powerful tools to manage curriculum and analyze performance, while students receive tailored, engaging learning paths.

## 🎯 Project Overview & Core Features

Learnify is built around robust **Role-Based Access Control (RBAC)**. The core philosophy is security and separation of concerns, ensuring users only access appropriate tools and data based on whether they are a "Student" or "Teacher."

### 🔐 Authentication & Architecture
* **Secure Identity Management:** Powered by AWS Cognito via AWS Amplify for resilient sign-up, sign-in, and session handling.
* **Smart Route Guards:** Utilizing Higher-Order Components (HOCs) to protect routes. Unauthorized access attempts are handled gracefully with informative messaging rather than abrupt logouts.
* **New Password Flow:** Integrated handling for users requiring mandatory password resets upon initial login.

### 👨‍🏫 The Teacher Experience
Teachers are provided with a mission control to manage their virtual classroom:
* **Dashboard:** A high-level overview of class activity and student enrollment.
* **Module Creator:** A rich editor interface for building structured educational modules and sections.
* **Content Library:** Centralized management of all created teaching materials.
* **Performance Analytics:** Detailed insights into class progress to identify areas needing attention.

### 👩‍🎓 The Student Experience
Students gain access to a focused learning environment:
* **Personalized Dashboard:** A clear view of enrolled classes and current progress.
* **Interactive Learning:** An engaging interface for consuming module content, videos, and quizzes.
* **Progress Tracking:** Visual indicators to motivate course completion.

## 🛠️ Technology Stack

This repository houses the frontend application, designed for performance and user experience.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core** | [React](https://reactjs.org/) | UI Component Library |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling framework |
| **Auth & State**| [AWS Amplify](https://docs.amplify.aws/) | Authentication integration and event hub |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, lightweight icon set |

*(Contextual Backend Stack: Node.js, Express.js, MongoDB)*