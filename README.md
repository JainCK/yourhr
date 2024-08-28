# YourHR - Mock Application

YourHR is a mock job search service designed to help users find ideal job roles based on their qualifications and preferences. This application showcases a range of features including user authentication, a dashboard for viewing user details and job postings, and integration with AWS S3 for resume uploads.

## Tech Stack

- **TypeScript:** Used for type safety and better developer experience.
- **Next.js:** The framework for building the application, handling both the frontend and backend.
- **Tailwind CSS:** Used for styling the application with a modern, responsive design.
- **PostgreSQL:** The database for storing user details and job information.
- **Prisma:** ORM used for database interactions, making it easier to work with PostgreSQL.
- **AWS S3:** Used for storing user-uploaded resumes.
- **Node.js:** Backend runtime environment for executing server-side code.

## Features

### 1. User Authentication

- **Signup:** Users can create an account by filling out a comprehensive signup form that includes name, email, phone number, years of experience, job category, expected LPA, and resume upload.
- **Login:** Users can log in to access their personalized dashboard.

### 2. Dashboard

- **User Details:** The dashboard displays user information such as email, phone number, experience, job category, expected LPA, and a link to view the uploaded resume.
- **Job Postings:** A list of hardcoded job postings is displayed on the dashboard for the user to browse.

### 3. File Upload and Storage

- **AWS S3 Integration:** User resumes are uploaded and stored securely in an AWS S3 bucket, ensuring scalability and reliability.

### 4. Database

- **PostgreSQL:** All user information is securely stored in a PostgreSQL database, managed via Prisma.

### 5. Styling and UI/UX

- **Tailwind CSS:** The application is styled with Tailwind CSS to ensure a modern, responsive, and user-friendly interface.
- **Aesthetic Design:** The UI is designed to be professional and aesthetically pleasing, with a focus on user experience.
