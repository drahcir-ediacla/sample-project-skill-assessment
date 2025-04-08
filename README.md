# Article Management System Mock API Server (Archintel Developer Exam)

A simple Next.js project with mock API and JSON-based data storage.

## Available Features
- Mock endpoints: `/api/auth`, `/api/companies`, `/api/users`, `/api/articles` (available GET, POST, and UPDATE APIs for managing data)
- Authentication with JWT tokens.
- Persistent data using `data.json`.
- Web Responsive
- Login function for both writer and editor users (required fields)
- Editor and Writer Dashboard(Admin Panel)
- "Add New User" and "Add New Company" buttons are hidden if the authenticated user is "Writer"
- "Add New Article" button is hidden if the authenticated user is "Editor"
- The first name and type of the authenticated user are displayed in the header of the admin panel page.
- Create New Article 
- Tabular display for the lists of articles
- The Edit button is disabled for the writer if the article status is "Published."

## Some functionality issues from available features
- EROFS: read-only file system (Occurs when your application tries to write to a file in a location that is read-only in "production" mode.)
- Creating a new article is supposed to be allowed for writers only, but I didn't complete the functionality to restrict it for editors
- Failure to implement a text editor or WYSIWYG editor in the Content field. (I got stuck with this part of the process and decided to temporarily skip it.)
- Link of article will lead to 404 page as I am not yet done creating page for specific article.

Note: This app is a demonstration and uses a file-based storage system (data.json) for simplicity. In production, a scalable database would replace this setup. 
Deployed on Vercel:
https://sample-project-skill-assessment.vercel.app/

Credentials of editor:
Username: admin_editor
Password: P@ss#0365

Credentials of writer:
Username: admin_writer
Password: P@$$#01205

Resources
https://aiven.io/mysql
https://stackoverflow.com/questions/71506016/how-to-run-front-end-and-backend-together-in-react-js-and-express-js
https://www.svgrepo.com/vectors/edit-tool-pencil/
