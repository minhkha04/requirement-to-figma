# 🚀 AI-Powered Figma Layout Generator

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-green.svg)
![License](https://img.shields.io/badge/license-ISC-yellow.svg)

> 🎨 **Cosmic Chat Interface** với AI Assistant để tự động tạo layout Figma từ yêu cầu tự nhiên

## ✨ Tính năng nổi bật

- 🤖 **AI-Powered Conversation**: Chat với Gemini AI để thu thập requirements
- 🎨 **Auto Figma Generation**: Tự động tạo layout Figma dưới dạng JSON
- 🌌 **Cosmic UI Design**: Giao diện space theme với hiệu ứng tuyệt đẹp
- ⚡ **Real-time Socket.IO**: Chat real-time với AI
- 📱 **Responsive Design**: Hoạt động mượt mà trên mọi thiết bị
- 🔧 **Figma Plugin Integration**: Plugin để render layout trực tiếp trong Figma

## 🏗️ Kiến trúc hệ thống

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
- **Database**: MongoDB với Mongoose
- **AI**: Google Gemini 2.5-flash
- **Real-time**: Socket.IO 4.8.1

### Frontend

- **UI**: Pure HTML/CSS/JavaScript
- **Design**: Cosmic/Space theme với Glassmorphism
- **Fonts**: Orbitron (Sci-fi), Space Mono (Code)
- **Real-time**: Socket.IO Client
- **HTTP**: Axios

## 🚀 Quick Start

### 1️⃣ Cài đặt dependencies

```bash
npm install
```

### 2️⃣ Cấu hình environment

Tạo file `.env`:

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

### 3️⃣ Chạy ứng dụng

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

### 4️⃣ Truy cập ứng dụng

- 🌐 **Web Interface**: http://localhost:8080
- 🔌 **Socket.IO**: ws://localhost:8080

## 🎯 Cách sử dụng

### 1. Tạo conversation mới

- Nhấn nút **"⭐ New Stellar Chat"**
- Nhập tiêu đề cho cuộc trò chuyện

### 2. Mô tả yêu cầu

- Chat với AI về website/app bạn muốn tạo
- AI sẽ hỏi các câu hỏi để thu thập requirements

### 3. Generate Figma Layout

- Sau khi có đủ thông tin, nhấn **"🛸 Generate Cosmic Layout"**
- Hệ thống sẽ tạo JSON layout tự động

### 4. Import vào Figma (Optional)

- Cài đặt Figma Plugin từ thư mục `figma-ai-sync/`
- Plugin sẽ tự động nhận layout và render trong Figma

## 📁 Cấu trúc project

```
├── 📄 index.html              # Frontend với Cosmic UI
├── 📦 package.json            # Dependencies và scripts
├── 🐳 Dockerfile             # Container configuration
│
├── 📂 src/                   # Backend source code
│   ├── 🚀 app.js            # Entry point
│   ├── 📂 config/           # Cấu hình (DB, ENV, Gemini)
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

1. **Requirements Collection**: AI hỏi user về các yêu cầu cụ thể
2. **Facts Extraction**: Trích xuất thông tin quan trọng từ conversation
3. **Context Building**: Xây dựng context từ facts đã thu thập
4. **Layout Generation**: Gemini AI tạo JSON layout dựa trên requirements
5. **Figma Integration**: Plugin render layout trong Figma

## 🔌 API Endpoints

```
GET    /api/conversations          # Lấy danh sách conversations
POST   /api/conversations          # Tạo conversation mới
GET    /api/messages/:id           # Lấy messages trong conversation
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

- **🌟 Animated Starfield**: Background với ngôi sao di chuyển
- **🌌 Nebula Effects**: Gradient xoay tạo hiệu ứng nebula
- **✨ Glassmorphism**: UI trong suốt với blur effect
- **🔮 Neon Glows**: Hiệu ứng sáng cosmic
- **🚀 Smooth Animations**: Transition mượt mà
- **📱 Responsive Design**: Tối ưu mọi thiết bị

## 🛡️ Security Features

- **CORS Protection**: Whitelist domains
- **Rate Limiting**: 100 requests/minute
- **Input Validation**: Joi schema validation
- **Error Handling**: Centralized error management
- **Health Checks**: Container monitoring

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 📜 License

ISC License - xem file LICENSE để biết thêm chi tiết.

## 👨‍💻 Author

**minhkha04**

- GitHub: [@minhkha04](https://github.com/minhkha04)
- Project: [requirement-to-figma](https://github.com/minhkha04/requirement-to-figma)

---

<div align="center">

**🌌 Built with love and cosmic energy ⭐**

_Transform your ideas into beautiful Figma layouts with the power of AI_

</div>
