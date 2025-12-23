# AI Sales Manager MVP

The Manager that never sleeps. Automate sales coaching with AI-powered call analysis.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)

## ✨ Features

- **AI-Powered Call Analysis**: Leverage Google's Gemini 2.0 Flash to analyze sales call transcripts
- **Real-Time Scoring**: Get instant performance scores (0-100) based on rapport, discovery, and effectiveness
- **Actionable Coaching**: Receive specific, actionable coaching notes for every call
- **Team Insights**: Track team performance, identify top performers, and spot trends
- **Beautiful UI**: Modern dark theme with smooth animations and intuitive navigation
- **Call Library**: Browse, search, and analyze all sales calls in one place

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   cd AI-Sales-Manger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **📖 Detailed setup guide:** See [GEMINI_SETUP.md](./GEMINI_SETUP.md) for step-by-step instructions

   **Quick setup:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key to your `.env.local` file
   
   **Test your setup:**
   ```bash
   node test-gemini.js
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Authentication (Demo Mode)

The app includes a mock authentication system for MVP purposes. On the login page, enter any email and password to access the dashboard.

### Analyzing Calls

1. Navigate to **Call Library** from the sidebar
2. Click on any call to view details
3. Click **"Analyze Call with AI"** to get instant insights
4. View the AI-generated score, summary, and coaching notes

### Exploring Team Insights

1. Click **Team Insights** in the sidebar
2. View the **Leaderboard** to see top performers
3. Check **Trends** to see performance over time
4. Review **Coaching Themes** to identify common areas for improvement

## 🏗️ Project Structure

```
/app
  /page.tsx                    # Landing page
  /login/page.tsx              # Login page
  /dashboard
    /layout.tsx                # Dashboard layout with sidebar
    /page.tsx                  # Dashboard home
    /calls
      /page.tsx                # Call library
      /[id]/page.tsx           # Call detail & AI analysis
    /insights/page.tsx         # Team insights
    /settings/page.tsx         # Settings
  /actions
    /analyze-call.ts           # Server action for AI analysis
  /globals.css                 # Global styles
  /layout.tsx                  # Root layout

/components
  /ui                          # Shadcn UI components
  /dashboard-sidebar.tsx       # Dashboard navigation
  /progress-ring.tsx           # Circular progress indicator

/lib
  /mock-data.ts                # Mock sales call data
  /gemini.ts                   # Gemini AI client
  /auth.ts                     # Mock authentication
  /utils.ts                    # Utility functions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Google Gemini 2.0 Flash

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

This MVP follows a **Modern Minimal** aesthetic inspired by Vercel and Linear:

- **Dark Mode First**: Deep black (#0a0a0a) background with crisp white text
- **Success Green** (#10b981): Positive scores and affirmations
- **Warning Amber** (#f59e0b): Areas needing improvement
- **Subtle Animations**: Framer Motion for smooth, professional transitions
- **Responsive**: Works beautifully on desktop, tablet, and mobile

## 🔒 Security Notes

⚠️ **This is an MVP for demonstration purposes:**

- Authentication is mock-only (client-side session storage)
- No database - all data is in-memory
- Not production-ready
- Gemini API key should be kept secret (use environment variables)

## 📊 Mock Data

The app includes 10 realistic sales call transcripts with various scenarios:
- Excellent discovery calls
- Poor pitch-heavy calls
- Objection handling examples
- Different rep performance levels

Pre-computed AI analyses are included for some calls to enable quick demos without API calls.

## 🚧 Roadmap / Future Enhancements

- [ ] Real authentication (NextAuth.js)
- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Real-time call recording integration
- [ ] Custom coaching templates
- [ ] Team management and roles
- [ ] Advanced analytics and reporting
- [ ] Slack/Email notifications
- [ ] Call recording uploads

## 🤝 Contributing

This is an MVP project. Feel free to fork and enhance!

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own sales coaching platform.

## 💡 Support

For questions or issues:
1. Check the code comments
2. Review the Gemini API documentation
3. Ensure your API key is properly set in `.env.local`

---

Built with ❤️ using Next.js, Gemini AI, and Shadcn UI

# ai-sales-manager
