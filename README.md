🏋️‍♂️ Smart Gym App
📌 Purpose

The Smart Gym App is designed to modernize gym operations by automating core business workflows and improving the member experience.

It streamlines member check-ins through QR codes, integrates a cashless café ordering system with Stripe, and provides a robust class management system with automated waitlist handling and real-time notifications.

On the business side, it equips administrators with tools for inventory control and automated analytics to track membership growth, class attendance, and peak usage hours.

By reducing manual overhead and providing actionable insights, the app empowers gyms to operate more efficiently, make data-driven decisions, and deliver a seamless, user-friendly experience for members.

✨ Features

✅ QR Code Member Check-In

✅ Café Ordering System with Stripe integration (self-checkout for members) & admin inventory management

✅ Class Management System

Members can sign up for classes

Automated waitlist handling & real-time notifications

Admin tools for class scheduling and management

✅ Analytics Dashboard

Membership growth tracking

Class attendance trends

Peak usage hours monitoring

🛠 Tech Stack

Frontend: React

Backend: Node.js, Express.js

Database: MongoDB

APIs & Libraries: react-bootstrap, Stripe, ag-Grid, FullCalendar

⚙️ Installation & Setup
1. Clone the repositories

Frontend

git clone https://github.com/seancampbell3161/DSD-Smart-Gym.git
cd DSD-Smart-Gym


Backend

git clone https://github.com/seancampbell3161/DSD-Smart-Gym-API.git
cd DSD-Smart-Gym-API

2. Install dependencies

Run the following in both the frontend and backend directories:

npm install

3. Configure environment variables

Create a .env file in both the frontend and backend directories.

Example configuration:

# ---------- Server ----------
PORT=5000

# Secret used for signing JWTs
JWT_SECRET=<your_jwt_secret>

# Database connection string
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db_name>?retryWrites=true&w=majority

# App user
NODE_USER=<db_username>
NODE_PASS=<db_password>

# Stripe credentials
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>

# Client URL (frontend)
CLIENT_URL=http://localhost:5173

# ---------- Client ----------
# API base URL
VITE_API_URL=http://localhost:5000/api

# Stripe publishable key
VITE_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>


⚠️ Important: Never commit real secrets. Use this template to create your own .env files locally.

4. Run the servers

Backend

npm run dev


Frontend

npm run dev

5. Visit the app

Once both servers are running, open your browser at:

http://localhost:3000

💻 Usage

The Smart Gym App is available as a web application.

Members can: check in, order from the café, join classes, and manage accounts.

Admins can: manage inventory, track analytics, and oversee class scheduling.

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a new branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add YourFeature')

Push to your branch (git push origin feature/YourFeature)

Open a Pull Request

🚀 Deployment

The Smart Gym App is deployed on Render.
🔗 Live Demo

👥 Contributors

Team Leads

Sean Campbell

Jerry Reghunadh

Engineers

Alex Appleget

Alexia Moore

Carmen Wheeler

David De La Rosa

Sai Krishna
