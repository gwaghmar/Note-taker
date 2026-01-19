# Smart Note AI - AI-Powered Note Taking Application

An intelligent note-taking web application where users can quickly jot down ideas, and AI automatically expands, refines, and structures those notes.

## Features

- 🚀 **Quick Capture**: Fast, minimal friction note input
- 🤖 **AI Expansion**: Automatic note expansion using OpenRouter API
- 💡 **Smart Refinement**: Collaborative refinement between user and AI
- 📋 **List Management**: Organize notes into custom lists
- 🔍 **Search & Filter**: Find notes quickly with full-text search
- 🏷️ **Smart Tags**: AI-powered tag suggestions
- 📱 **Mobile-First**: Responsive design optimized for all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **AI**: OpenRouter API (Claude Sonnet 3.5)
- **Backend**: Firebase (Authentication, Firestore)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gwaghmar/Note-taker.git
cd Note-taker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
- `OPENROUTER_API_KEY`: Your OpenRouter API key
- Firebase configuration keys

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── ai/           # AI endpoints
│   ├── dashboard/        # Main dashboard
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── notes/            # Note components
│   └── ai/               # AI interaction components
├── lib/                   # Utilities and configurations
│   ├── firebase/         # Firebase setup
│   ├── ai/               # AI integration
│   └── utils/            # Helper functions
└── public/               # Static assets
```

## Environment Variables

Required environment variables:

```env
# OpenRouter API
OPENROUTER_API_KEY=your_openrouter_api_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Firebase

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Deploy Firestore rules: `firebase deploy --only firestore:rules`

## Features in Development

- [ ] Firebase Authentication (Email/Password, Google OAuth)
- [ ] User dashboard with notes management
- [ ] List management system
- [ ] Advanced search and filtering
- [ ] Offline support (PWA)
- [ ] Sharing and collaboration
- [ ] Mobile app optimization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on GitHub.