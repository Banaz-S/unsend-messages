# 💌 Unsend Messages

> **Share the letters you never sent, the words you never spoke, the feelings you never expressed.**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Railway](https://img.shields.io/badge/Railway-Hosted-0B0D0E?style=for-the-badge&logo=railway)](https://railway.app/)
[![Neon](https://img.shields.io/badge/Neon-Database-00E5BE?style=for-the-badge&logo=neon)](https://neon.tech/)

## 🌟 About

**Unsend Messages** is a beautiful web application that allows users to share heartfelt letters they never had the courage to send. Whether it's a love letter, an apology, a thank you note, or just words left unsaid, this platform provides a safe space to express those feelings.

### ✨ Features

- 🎨 **Beautiful Letter Design**: Choose from multiple color themes and border styles
- 👤 **Personal Dedications**: Mention who the letter is for
- 💝 **Emotional Expression**: Share feelings that were meant to be shared
- 🔒 **Safe Space**: Express yourself without fear of judgment
- 📱 **Responsive Design**: Works perfectly on all devices
- 🌐 **Easy Sharing**: Share your letters with the world
- 🔍 **Search for letters**: filter letters based on color and mention

## 🚀 Live Demo

**[Visit Unsend Messages](https://banaz-s.github.io/unsend-messages)**

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **CSS3** - Custom styling with modern design
- **Responsive Design** - Mobile-first approach

### Backend

- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **PostgreSQL** - Relational database
- **Neon** - Serverless Postgres hosting

### Infrastructure

- **Railway** - Backend hosting and deployment
- **GitHub Pages** - Frontend hosting
- **Concurrently** - Development workflow management

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (or Neon account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/banaz-s/unsend-messages.git
   cd unsend-messages
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   ```bash
   # Create .env file in backend directory
   cp backend/.env.example backend/.env

   # Add your database credentials
   DATABASE_URL=your_neon_database_url
   PORT=5000
   ```

5. **Start the development servers**

   ```bash
   npm start
   ```

   This will start both the React frontend and Node.js backend concurrently.

### Development Scripts

```bash
npm start          # Start both frontend and backend
npm run build      # Build the React app for production
npm run deploy     # Deploy to GitHub Pages
npm test          # Run tests
```

## 🎨 Features in Detail

### Letter Creation

- **Color Themes**: Choose from 8 beautiful color schemes
- **Border Styles**: Multiple border designs to match your mood
- **Personalization**: Add recipient names and personal messages
- **Preview**: See your letter before sharing

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: Designed with accessibility in mind

## 🌐 Deployment

### Frontend (GitHub Pages)

The React app is automatically deployed to GitHub Pages when you push to the main branch.

### Backend (Railway)

The Node.js backend is hosted on Railway for reliable performance and easy scaling.

### Database (Neon)

PostgreSQL database is hosted on Neon's serverless platform for optimal performance.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design works on all devices

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Express.js** for the robust backend framework
- **Neon** for the serverless PostgreSQL hosting
- **Railway** for the reliable backend hosting
- **GitHub** for the free hosting and version control

## 📞 Contact

- **GitHub**: [@banaz-s](https://github.com/banaz-s)
- **Project Link**: [https://github.com/banaz-s/unsend-messages](https://github.com/banaz-s/unsend-messages)

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ star on GitHub!

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/banaz-s">Banaz</a></p>
  <p>Share your unsent messages with the world</p>
</div>
