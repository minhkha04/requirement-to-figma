# 🚀 AI-Powered Figma Layout Generator

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-green.svg)
![License](https://img.shields.io/badge/license-ISC-yellow.svg)

> 🎨 **Cosmic Chat Interface** with AI Assistant to automatically generate Figma layouts from natural language requirements

## ✨ Key Features

- 🤖 **AI-Powered Conversation**: Chat with Gemini AI to collect requirements
- 🎨 **Auto Figma Generation**: Automatically generate Figma layouts in JSON format
- 🌌 **Cosmic UI Design**: Space-themed interface with stunning visual effects
- ⚡ **Real-time Socket.IO**: Real-time chat with AI
- 📱 **Responsive Design**: Smooth operation across all devices
- 🔧 **Figma Plugin Integration**: Plugin to render layouts directly in Figma

## 🏗️ System Architecture

```
├── 🌐 Frontend (Cosmic UI)
│   ├── Real-time chat interface
│   ├── Conversation management
│   └── Figma layout preview
│
├── 🚀 Backend (Node.js + Express)
│   ├── RESTful API
│   ├── Socket.IO real-time
│   ├── MongoDB database
│   └── Gemini AI integration
│
└── 🎨 Figma Plugin
    ├── Socket connection
    ├── JSON layout parser
    └── Auto render components
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js 22+ (ES Modules)
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini 2.5-flash
- **Real-time**: Socket.IO 4.8.1

### Frontend

- **UI**: Pure HTML/CSS/JavaScript
- **Design**: Cosmic/Space theme with Glassmorphism
- **Fonts**: Orbitron (Sci-fi), Space Mono (Code)
- **Real-time**: Socket.IO Client
- **HTTP**: Axios

## 🚀 Quick Start

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Environment configuration

Create `.env` file:

```env
# Server Configuration
PORT=8080
PREFIX_API=/api

# Database
MONGODB_URI=mongodb://localhost:27017/figma-ai-chat

# CORS Configuration
CORS_ORIGIN=http://localhost:8080,http://127.0.0.1:8080

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# App Info
APP_NAME=AI Figma Generator
```

### 3️⃣ Run application

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

### 4️⃣ Access application

- 🌐 **Web Interface**: http://localhost:8080
- 🔌 **Socket.IO**: ws://localhost:8080

## 🎯 How to Use

### 1. Create new conversation

- Click **"⭐ New Stellar Chat"** button
- Enter conversation title

### 2. Describe requirements

- Chat with AI about the website/app you want to create
- AI will ask questions to gather requirements

### 3. Generate Figma Layout

- After collecting enough information, click **"🛸 Generate Cosmic Layout"**
- System will automatically create JSON layout

### 4. Import to Figma (Optional)

- Install Figma Plugin from `figma-ai-sync/` folder
- Plugin will automatically receive layout and render in Figma

## 📁 Project Structure

```
├── 📄 index.html              # Frontend with Cosmic UI
├── 📦 package.json            # Dependencies and scripts
├── 🐳 Dockerfile             # Container configuration
│
├── 📂 src/                   # Backend source code
│   ├── 🚀 app.js            # Entry point
│   ├── 📂 config/           # Configuration (DB, ENV, Gemini)
│   ├── 📂 controllers/      # Request handlers
│   ├── 📂 models/          # MongoDB schemas
│   ├── 📂 services/        # Business logic
│   ├── 📂 repositories/    # Data access layer
│   ├── 📂 routes/          # API routes
│   ├── 📂 middlewares/     # Express middlewares
│   ├── 📂 socketIO/        # Real-time events
│   └── 📂 utils/           # Helper functions
│
└── 📂 figma-ai-sync/        # Figma Plugin
    ├── 📄 manifest.json     # Plugin configuration
    ├── 🧩 code.js          # Plugin logic
    └── 🎨 ui.html          # Plugin UI
```

## 🤖 AI Flow

1. **Requirements Collection**: AI asks user about specific requirements
2. **Facts Extraction**: Extract important information from conversation
3. **Context Building**: Build context from collected facts
4. **Layout Generation**: Gemini AI creates JSON layout based on requirements
5. **Figma Integration**: Plugin renders layout in Figma

## 🔌 API Endpoints

```
GET    /api/conversations          # Get conversations list
POST   /api/conversations          # Create new conversation
GET    /api/messages/:id           # Get messages in conversation
POST   /api/conversations/:id/figma-layout  # Generate Figma layout
```

## 🌌 Socket.IO Events

```javascript
// Client -> Server
socket.emit("join_room", conversationId);
socket.emit("send_message", { conversationId, text });

// Server -> Client
socket.on("receive_message", { conversationId, text, sender });
socket.on("figma_layout", { layout });
socket.on("error", { message });
```

## 🎨 Cosmic UI Features

- **🌟 Animated Starfield**: Background with moving stars
- **🌌 Nebula Effects**: Rotating gradients creating nebula effects
- **✨ Glassmorphism**: Transparent UI with blur effects
- **🔮 Neon Glows**: Cosmic lighting effects
- **🚀 Smooth Animations**: Smooth transitions
- **📱 Responsive Design**: Optimized for all devices

## 🛡️ Security Features

- **CORS Protection**: Whitelist domains
- **Rate Limiting**: 100 requests/minute
- **Input Validation**: Joi schema validation
- **Error Handling**: Centralized error management
- **Health Checks**: Container monitoring

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Create Pull Request

## 📜 License

ISC License - see LICENSE file for more details.

## 👨‍💻 Author

**minhkha04**

- GitHub: [@minhkha04](https://github.com/minhkha04)
- Project: [requirement-to-figma](https://github.com/minhkha04/requirement-to-figma)

---

<div align="center">

**🌌 Built with love and cosmic energy ⭐**

_Transform your ideas into beautiful Figma layouts with the power of AI_

</div>
