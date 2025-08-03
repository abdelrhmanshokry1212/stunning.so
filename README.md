# Stunning.so 🚀

A modern web application that generates stunning website sections based on user prompts. Built with Next.js, NestJS, and MongoDB.

## ✨ Features

- **AI-Powered Section Generation**: Create website sections from natural language prompts
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Real-time Processing**: Fast and efficient section generation
- **History Management**: Save and revisit previously generated sections
- **MongoDB Integration**: Persistent storage for generated content
- **RESTful API**: Clean API architecture with NestJS backend

## 🏗️ Project Structure

```
Stunning.so/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js 13+ app directory
│   │   ├── components/    # React components
│   │   └── ...
│   └── package.json
├── nestjs-backend/        # NestJS backend API
│   ├── src/
│   │   ├── sections/      # Section-related modules
│   │   └── ...
│   └── package.json
├── server/                # Express.js server (legacy)
│   ├── api/              # API routes
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### 1. Clone the Repository

```bash
git clone https://github.com/abdelrhmanshokry1212/stunning.so.git
cd stunning.so
```

### 2. Install Dependencies

Install dependencies for all three parts of the application:

```bash
# Install client dependencies
cd client
npm install

# Install NestJS backend dependencies
cd ../nestjs-backend
npm install

# Install server dependencies (optional - legacy)
cd ../server
npm install
```

### 3. Environment Setup

#### For NestJS Backend

Create a `.env` file in the `nestjs-backend` directory:

```bash
cd nestjs-backend
cp .env.example .env  # if .env.example exists
```

Or create `.env` manually with:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/stunning_so
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/stunning_so

# Server Configuration
PORT=3001
NODE_ENV=development

# Optional: JWT Secret (if implementing authentication)
JWT_SECRET=your-secret-key
```

#### For Client (Next.js)

Create a `.env.local` file in the `client` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

### 4. Start MongoDB

#### Local MongoDB
```bash
# Start MongoDB service
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### MongoDB Atlas (Cloud)
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get your connection string and add it to the `.env` file

### 5. Run the Application

#### Development Mode

**Terminal 1 - Start NestJS Backend:**
```bash
cd nestjs-backend
npm run start:dev
```

**Terminal 2 - Start Next.js Client:**
```bash
cd client
npm run dev
```

**Terminal 3 - Start Express Server (optional):**
```bash
cd server
npm run dev
```

#### Production Mode

**Build and Start Backend:**
```bash
cd nestjs-backend
npm run build
npm run start:prod
```

**Build and Start Frontend:**
```bash
cd client
npm run build
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **NestJS Backend**: http://localhost:3001
- **Express Server**: http://localhost:3002 (if running)

## 📝 API Endpoints

### NestJS Backend (Port 3001)

- `POST /sections/generate` - Generate website sections
- `GET /sections` - Get all sections
- `GET /sections/:id` - Get section by ID
- `DELETE /sections/:id` - Delete section

### Express Server (Port 3002)

- `POST /api/generate-sections` - Generate sections (legacy)

## 🛠️ Development

### Available Scripts

#### Client (Next.js)
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### NestJS Backend
```bash
cd nestjs-backend
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run tests
npm run test:e2e     # Run end-to-end tests
```

### Code Structure

- **Frontend**: React components with TypeScript
- **Backend**: NestJS with MongoDB integration
- **Styling**: CSS modules and custom CSS
- **Animations**: GSAP for smooth animations

## 🔧 Configuration

### MongoDB Connection

The application uses MongoDB for data persistence. Configure your connection in the `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/stunning_so
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/stunning_so` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |

## 🚀 Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Railway/Heroku (Backend)

1. Connect your repository
2. Set environment variables
3. Deploy the NestJS backend

### MongoDB Atlas

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to your environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   ```

2. **MongoDB connection failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure network access (for Atlas)

3. **Dependencies not found**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

- Check the [Issues](https://github.com/abdelrhmanshokry1212/stunning.so/issues) page
- Create a new issue with detailed description
- Include error logs and environment details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [NestJS](https://nestjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Animations: [GSAP](https://greensock.com/gsap/)

---

Made with ❤️ by [Abd El Rahman](https://github.com/abdelrhmanshokry1212) 