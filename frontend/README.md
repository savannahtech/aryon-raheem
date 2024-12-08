# Aryon Frontend Take-home Assignment

This is a React frontend take-home assessment to test my frontend skills.


## Demo
### Video Demo
[![Explainer Video](https://img.youtube.com/vi/gEEQ5vdIbyQ/0.jpg)](https://www.youtube.com/watch?v=gEEQ5vdIbyQ)

### Live Demo
[https://aryon-test-zeta.vercel.app/](https://aryon-test-zeta.vercel.app)

## Set up
- Install dependencies
```shell
npm install
```
- Start the project. The app will start on [http://localhost:3000](http://localhost:3000)
```shell
npm run start
```
- Run tests
```shell
npm run test
```
- Run tests with coverage
```shell
npm run test:coverage
```

## Developer
This project is developed by **Raheem Adebayo**, a senior frontend engineer with over 5 years of
professional experience developing projects in various industries (Social networking, Logistics,
Entertainment, Fintech and Edtech).

### My Frontend Stack
[![My Skills](https://skillicons.dev/icons?i=ts,react,jest,nextjs,css,sass,tailwind,docker,figma&theme=dark)](https://linkedin.com/in/adebayo-raheem)

### Contact
- Email: [adraheemzy@gmail.com](mailto:adraheemzy@gmail.com)
- GitHub: [Raheem Adebayo](https://github.com/Adraheem)
- LinkedIn: [Raheem (Oluseyi) Adebayo](https://linkedin.com/in/adebayo-raheem)

## About

**About the Project:**

The **Security Rules Management Dashboard** is a React-based web application designed to empower security teams with an intuitive, streamlined interface for managing, reviewing, and enforcing security policy rules. This tool offers robust capabilities for viewing and searching large datasets of security rule recommendations, allowing security professionals to efficiently track compliance, review potential vulnerabilities, and take action based on recommended security measures.

Key features of the dashboard include:
- **Search and Filtering**: A powerful search functionality to quickly locate specific security rule recommendations, with options to filter results based on various criteria.
- **Detailed Rule Insights**: Clear presentation of security recommendations, including details such as impact assessments, affected resources, and associated frameworks.
- **Efficient Data Handling**: Designed to handle large datasets seamlessly, ensuring smooth performance even with extensive rule data.
- **User-Friendly Interface**: An intuitive design that allows security teams to easily navigate through recommendations, view detailed information, and take necessary actions on policy rules.

With this dashboard, security teams can manage and prioritize security rules effectively, ensuring that the organization stays on top of emerging security threats and compliance requirements.

### Features
#### 1. Main Dashboard View

- Infinite scrolling list of recommendations
- Each recommendation card displays:
    - Title and description
    - Risk score indicator
    - Cloud provider icons
    - Framework compliance badges
    - Quick archive action
- Responsive flex layout
- Loading states and error handling

#### 2. Search & Filter System

- Debounced search (300ms) across:
    - Title
    - Description
    - Reasons
    - Framework names
- Multi-tag filtering:
    - Framework filters
    - Cloud provider filters
    - Risk class filters
    - Reason filters
- Real-time results updates
- Clear loading states
- "No results" handling

#### 3. Detail View

- Side panel implementation
- Complete recommendation details:
    - Full description
    - Impact assessment
    - Resource implications (Resources enforced by policy)
    - Framework compliance
    - Implementation reasons
- Archive/unarchive functionality
- Smooth transitions

#### 4. Archive Management

- Separate archived items view
- Unarchive capability
- Maintained filter/search state
- Success/error messaging

#### 5. Authentication & Authorization

- Login page with form validation
- Protected routes implementation
- Session management
- Logout functionality
- Auth state persistence

### Technical Requirements
- React.js
- TypeScript
- Tailwind
- Jest
- React Testing Library
- ShadCN UI
- Zod + React Hook Form
- Zustand for state management
- React Query
