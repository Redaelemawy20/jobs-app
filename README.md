# Job Listing App

A React application for job listings that includes features like job search, job details, related jobs, and more. The app utilizes React Hooks, Redux/Redux-Toolkit for state management, TypeScript, Axios for API calls, and employs techniques such as lazy loading components using Intersection Observer.

## Features
- **Search Job Listings**: Search for job listings based on various criteria.
- **Job Details**: View detailed information about a specific job.
- **Related Jobs**: Find jobs related to the one currently viewed.
- **Global State Management**: Utilized Redux/Redux-Toolkit for efficient global state management.
- **Efficient Searching**: Implemented search using LRU (Least Recently Used) cache for improved performance.
- **Lazy Loading**: Components are lazily loaded using the Intersection Observer API to fetch job data efficiently for each card in the list.

## Technologies Used
- **React**: Library for building user interfaces.
- **React Hooks**: Used for state and effect management.
- **Redux/Redux-Toolkit**: For state management.
- **TypeScript**: For type checking and improved developer experience.
- **Axios**: For making API calls.

## Getting Started
### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jobs-app.git
   ```
2. Install dependencies:
   ```bash
      cd job-listing-app
      npm install
      ```
## Running the App:
   ```bash
      npm start
   ```  
### Running Tests
   ```bash
      npm test
      ```
