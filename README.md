# 🔗 LinkTrimer - Modern URL Shortener

A beautiful, fast, and secure URL shortening service built with Next.js 15, React 19, and MongoDB. Transform long URLs into short, memorable links instantly with a modern, responsive design.

![LinkTrimer](https://img.shields.io/badge/LinkTrimer-URL%20Shortener-purple?style=for-the-badge&logo=link)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-green?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🚀 **Core Functionality**
- **Multiple URL Management** - Create and manage multiple shortened URLs in one place
- **Custom Short URLs** - Choose your own memorable short codes
- **Instant Generation** - Get shortened URLs in milliseconds
- **No Registration Required** - Start shortening immediately
- **Zero Tracking** - Complete privacy, no data collection

### 🎨 **Modern UI/UX**
- **Beautiful Design** - Modern gradient backgrounds and smooth animations
- **Responsive Layout** - Works perfectly on all devices
- **Interactive Elements** - Hover effects, transitions, and smooth animations
- **Clean Interface** - Intuitive and user-friendly design
- **Dark/Light Theme Ready** - Built with modern design principles

### 🔧 **Technical Features**
- **Real-time Validation** - Instant feedback on URL and short code validation
- **Duplicate Prevention** - Prevents creating URLs with the same short code
- **Persistent Storage** - URLs saved locally for easy access
- **Copy to Clipboard** - One-click copying of shortened URLs
- **Test Links** - Verify your shortened URLs work correctly

### 🛡️ **Security & Performance**
- **Input Validation** - Comprehensive validation for URLs and short codes
- **Reserved Path Protection** - Prevents conflicts with system routes
- **Error Handling** - Graceful error handling with user-friendly messages
- **Loading States** - Visual feedback during operations
- **Optimized Performance** - Fast and efficient URL processing

## 🖼️ Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=LinkTrimer+Home+Page)

### URL Shortening Interface
![Shorten Page](https://via.placeholder.com/800x400/3b82f6/ffffff?text=URL+Shortening+Interface)

### Multiple URLs Management
![URL Management](https://via.placeholder.com/800x400/6366f1/ffffff?text=Multiple+URLs+Management)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Patel-huzaifa/Linktrimmer.git
   cd Linktrimmer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
LinkTrimer/
├── app/
│   ├── [shorturl]/          # Dynamic route for shortened URLs
│   ├── about/               # About page
│   ├── api/
│   │   └── generate/        # API endpoint for URL generation
│   ├── shorten/             # Main URL shortening page
│   ├── globals.css          # Global styles and animations
│   ├── layout.js            # Root layout component
│   └── page.js              # Home page
├── Components/
│   └── Navbar.js            # Navigation component
├── lib/
│   └── mongodb.js           # MongoDB connection utility
├── public/                  # Static assets
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Toastify** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for URL storage
- **MongoDB Driver** - Official MongoDB Node.js driver

### Development
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript Ready** - Easy to add TypeScript support

## 📱 Features in Detail

### 🔗 **URL Shortening**
- **Smart Validation**: Validates URLs and prevents duplicate short codes
- **Custom Short Codes**: Choose your own memorable short URLs
- **Reserved Path Protection**: Prevents conflicts with system routes
- **Instant Generation**: Get shortened URLs immediately

### 📋 **URL Management**
- **Multiple URLs**: Create and manage unlimited shortened URLs
- **Local Storage**: URLs persist across browser sessions
- **Bulk Operations**: Clear all URLs with one click
- **Individual Actions**: Test, copy, or delete individual URLs

### 🎨 **User Experience**
- **Modern Design**: Beautiful gradients and smooth animations
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Interactive Feedback**: Loading states and success messages
- **Accessibility**: Keyboard navigation and screen reader support

### 🔒 **Privacy & Security**
- **No Registration**: Start using immediately without signup
- **Zero Tracking**: No analytics or user tracking
- **Data Privacy**: URLs stored locally, not shared
- **Secure Validation**: Prevents malicious URL injection

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Configuration

### Environment Variables
```env
# Required
MONGODB_URI=mongodb://localhost:27017/linktrimer

# Optional
NEXT_PUBLIC_URL=https://yourdomain.com
```

### MongoDB Setup
1. Create a MongoDB database
2. Create a collection named `urls`
3. The collection will store documents with this structure:
   ```json
   {
     "url": "https://example.com/very-long-url",
     "shorturl": "my-short-link"
   }
   ```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use consistent formatting
- Add comments for complex logic
- Follow React best practices
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **React Team** - For the incredible React library
- **MongoDB** - For the powerful database

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] URL analytics and click tracking
- [ ] Custom domains support
- [ ] API rate limiting
- [ ] Bulk URL import/export
- [ ] QR code generation
- [ ] Social media integration
- [ ] Advanced URL management features

---

**Made with ❤️ by [Patel Huzaifa](https://github.com/Patel-huzaifa)**

⭐ **Star this repository if you find it helpful!**
