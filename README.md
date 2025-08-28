
AI Mock Interview Website
Description
AI Mock Interview is a web application to practice job interviews with AI. It makes interview questions, turns your voice answers into text, saves them, and gives feedback and ratings. It helps users get better at interviews. It has done 30+ sessions with 150+ answers, with 85% text accuracy and 90% feedback consistency. Tested by 8+ users, it improved scores by 20%.

Live Demo: https://mockedge.vercel.app (Note: May take 30 seconds to load due to server setup.)

Tech Stack
Frontend: Next.js, React.js, Tailwind CSS
Authentication: Clerk Auth
Database & ORM: PostgreSQL, Drizzle ORM
AI Integration: Gemini API
Deployment: Vercel
Other Tools: GitHub
Features
AI-Driven Question Generation: Makes questions based on your topic or role.
Speech-to-Text Transcription: Turns your voice into text in real-time.
Feedback and Ratings: Gives ideal answers, question ratings, and overall score.
User Dashboard: Shows your answers, feedback, ratings, and past sessions.
User Authentication: Secure login with Clerk Auth.
Data Storage: Saves responses in PostgreSQL with Drizzle ORM.
Performance Metrics: Tracks score improvements, like 20% better.
Installation
To run this locally:

Clone the Repository:
text
git clone https://github.com/harshada05044/AI-Interview-Mocker.git
cd AI-Interview-Mocker
Install Dependencies:
text
npm install
# or
yarn install
# or
pnpm install
# or
bun install
Set Up Environment Variables: Create a .env.local file and add:
text
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
Get Clerk keys from Clerk Dashboard.
Set up a PostgreSQL database and add its URL.
Get Gemini API key from Google AI Studio.
Run the Development Server:
text
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 in your browser.
Build for Production:
text
npm run build
npm run start
Usage
Sign Up/Login: Use Clerk Auth to join or log in.
Start an Interview: Pick a topic or role for questions.
Respond: Answer by voice; it turns it into text.
Get Feedback: See ideal answers, ratings, and score on the dashboard.
Review Sessions: Check past sessions and improvements.
