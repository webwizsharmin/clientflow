# clientflow

Clientflow is a **SaaS style CRM dashboard** designed for freelancers and small teams.  
It showcases my ability to build **modular, scalable frontend applications**

---

## Case Study: Why Clientflow?

Freelancers often struggle to manage multiple clients, projects, and deadlines without a proper system.  
I designed **Clientflow** as a case study project to demonstrate how a lightweight, browser based CRM can solve this problem:

- **Problem:** Freelancers lack a simple tool to track clients, visualize progress, and manage tasks.
- **Solution:** Build a modular dashboard with CRUD functionality, authentication, and dynamic charts.
- **Impact:** A recruiter or client can instantly see my ability to design **real‑world solutions** with clean architecture and professional UI.

---

## Features

- Responsive SaaS style UI with tailwindCSS
- Modular JavaScript structure for scalability
- CRUD system for managing client records
- Chart.js integration for dynamic data visualization
- LocalStorage persistence for offline use
- Smooth animated transitions and dashboard interactions

---

## Project Structure

````Markdown
clientflow/
├── index.html
├── .gitignore
├── src/
│ ├── css/
│ │ ├── tailwind.css
│ │ └── styles.css
│ ├── js/
| | ├── app.js
| | ├──components
| | | ├── clientModal.js
| | | ├── invoiceModal.js
| | | └──taskModal.js
| | ├──data
| | | ├── constant.js
| | | ├── seed.js
| | | └── validations.js
│ │ ├── modules/
│ │ │ ├── auth.js
│ │ │ ├── charts.js
│ │ │ ├── storage.js
│ │ │ └── crud.js
│ ├── assets/
│ │ ├── images/
│ │ └── icons/
│ └── public
├── dist/
└── README.md



## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/webwizsharmin/clientflow.git

````

2. Navigation into the project:

   ```bash
   cd clientflow

   ```

3. Install dependencies

   ```bash
   npm install

   ```

4. Build Tailwind styles:
   ```bash
   npx tailwindcss -i ./src/css/tailwind.css -o ./dist/styles.css --watch
   ```

## Usage

- Open index.html in your browser.
- Add, edit or delete client, invoice, task records via the CRUD system
- Charts update dynamically with client dat
- Data persists locally for offline use.

## Tech Stack

- HTML5
- TailwindCSS
- Vanilla JavaScript(ES6 Modules)
- Chart.js
- LocalStorage API

## Future Improvements

- Integrate JWT based authentication with a backend
- Expand chart types and dashboard features
- Optimize for production with bundlers(vite/webpack)
- Deploy on Vercel for global accessibility

# Contact

Created by Sharmin Aktar

- Portfolio: https://portfolio-eta-tawny-32.vercel.app/
- LinkedIn: https://www.linkedin.com/in/webwizsharmin/
- Email: webwizsharmin@gmail.com
