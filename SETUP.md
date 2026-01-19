# Smart Note AI - Setup Guide

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Firebase account
- An OpenRouter API account

## Step 1: Clone the Repository

```bash
git clone https://github.com/gwaghmar/Note-taker.git
cd Note-taker
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Firebase Setup

### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name (e.g., "smart-note-ai")
4. Enable Google Analytics (optional)
5. Create project

### Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" sign-in method
4. Enable "Google" sign-in method
5. Add your domain to authorized domains

### Create Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Start in "Production mode"
4. Choose a location close to your users
5. Create database

### Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app
5. Copy the configuration values

## Step 4: OpenRouter API Setup

### Get API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to "Keys" section
4. Create a new API key
5. Copy the API key

### Add Credits

OpenRouter requires credits for API usage:
1. Go to "Billing" section
2. Add credits (recommended: start with $5)
3. Monitor usage in dashboard

## Step 5: Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# OpenRouter API
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Step 6: Deploy Firestore Security Rules

Install Firebase CLI:

```bash
npm install -g firebase-tools
```

Login to Firebase:

```bash
firebase login
```

Initialize Firebase in your project:

```bash
firebase init firestore
```

Select your Firebase project and use the existing `firestore.rules` file.

Deploy the rules:

```bash
firebase deploy --only firestore:rules
```

## Step 7: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Test the Application

1. **Sign Up**: Go to `/auth/signup` and create an account
2. **Quick Note**: Try adding a quick note
3. **AI Expansion**: Click "Expand with AI" to test AI integration
4. **Save**: Save your expanded note

## Step 9: Deploy to Vercel

### Automatic Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - Add all variables from `.env.local`
6. Click "Deploy"

### Manual Deployment

Install Vercel CLI:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy:

```bash
vercel
```

Follow the prompts and add environment variables when asked.

## Troubleshooting

### Firebase Authentication Issues

**Problem**: "Firebase: Error (auth/unauthorized-domain)"

**Solution**: Add your domain to Firebase authorized domains:
1. Go to Firebase Console → Authentication → Settings
2. Add your domain (including localhost for development)

### OpenRouter API Errors

**Problem**: "AI API error: Unauthorized"

**Solution**: 
1. Check your `OPENROUTER_API_KEY` is correct
2. Ensure you have credits in your OpenRouter account
3. Verify the API key has proper permissions

### Build Errors

**Problem**: Module not found errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Firestore Permission Denied

**Problem**: "Missing or insufficient permissions"

**Solution**:
1. Ensure Firestore rules are deployed: `firebase deploy --only firestore:rules`
2. Check that user is authenticated before accessing Firestore

## Development Tips

### Hot Reload

The development server supports hot reload. Changes to files will automatically refresh the browser.

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

### Linting

Run ESLint:

```bash
npm run lint
```

### Code Formatting

Format code with Prettier:

```bash
npm run format
```

## Production Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Firebase authentication enabled
- [ ] Firestore security rules deployed
- [ ] OpenRouter API credits added
- [ ] Test sign up/login flow
- [ ] Test AI expansion functionality
- [ ] Test on mobile devices
- [ ] Check Lighthouse scores
- [ ] Enable production mode in Firebase
- [ ] Set up monitoring/analytics
- [ ] Configure custom domain (optional)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

## License

This project is open source and available under the MIT License.
