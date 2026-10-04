# Green Builders - Society Management (MERN)
Needs: Node.js 18+, MongoDB running locally.

Terminal 1:  cd server && npm install && npm run dev
Terminal 2:  cd client && npm install && npm run dev
Open http://localhost:5173   Login: admin@society.com / admin123
New residents added by the admin log in with password: welcome123
(A resident's flat number decides which maintenance bills they see.)

## Modules (each has its own files)
| Module         | Model                      | API route                 | React page                  |
|----------------|----------------------------|---------------------------|-----------------------------|
| Announcements  | models/Announcement.js     | routes/announcements.js   | pages/Announcements.jsx     |
| Maintenance    | models/Payment.js          | routes/payments.js        | pages/Payments.jsx          |
| Parking        | models/Parking.js          | routes/parking.js         | pages/Parking.jsx           |
| Complaints     | models/Complaint.js        | routes/complaints.js      | pages/Section.jsx (generic) |
| Residents      | models/User.js             | routes/residents.js       | pages/Section.jsx (generic) |

## Deploy online (free, https automatic)
1. Rename server/.env.example to server/.env for local use (never upload .env to GitHub).
2. Database: MongoDB Atlas free cluster -> copy the connection string.
3. Server: Render Web Service, Root Directory = server, Build = npm install, Start = npm start.
   Environment: MONGO_URI, JWT_SECRET, PORT=5000.
4. Website: Vercel project, Root Directory = client. Environment: VITE_API_URL = your Render address (no trailing slash).
5. Open the Vercel https address and log in.
