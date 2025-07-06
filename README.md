# ForkNight



> “Pretty sure you’ve heard of Fortnite…  But have you ever tried ForkNight?”

---

## 🚨 Problem Statement

Open source is powerful — it builds the internet, fuels our frameworks, and gives us superpowers as developers.

But let’s be honest: contributing to open source often feels more like a chore than a challenge.  
You're not rewarded, recognized, or even remembered.

You might Push 5 commits, Fix 3 annoying bugs, Review 2 pull requests...  

And you get? 
No XP, No high-fives, No loot , Just digital silence :(

Meanwhile, Fortnite rewards you for showing up. Duolingo throws a party when you do 5 minutes of Spanish.  
Why doesn’t GitHub say “Nice work!” when you fix an issue that’s been open for 6 months?

The result?

💔 Developers burn out.  
🚪 Contributors leave after a few PRs.  
🧠 Talented devs stay hidden in GitHub’s shadows.

We’re developers too. We’ve been there.

That's the real bug.

That's what ForkNight is here to solve.


---

## 👾 What If...

- Fixing bugs gave you badges instead of burnout?  
- PRs unlocked power-ups?  
- Commits earned XP and leveled you up?  
- You had a leaderboard for your open source grind?

> 💡 Welcome to ForkNight.

---

## 🧠 Strategy

We’re turning every GitHub action into a game mechanic:

- 🏆 Earn XP for GitHub contributions (PRs, issues, reviews)  
- 🧩 Unlock badges like “Bug Slayer” and “Merge Master”  
- 📈 Track levels — from Squire Coder to Open Source Knight  
- 🔥 Maintain streaks and earn bonus XP  
- 🥇 Compete on leaderboards across teams and events  

---

## 🧰 Tech Stack

- 💻 Frontend: React + Tailwind CSS (retro-themed responsive UI)  
- 🧠 Backend: Node.js + Express (handles game logic and APIs)  
- 🗄️ Database: MongoDB (stores users, XP, badges, and leaderboards)  
- 🔐 Auth & Sync: GitHub OAuth + GitHub REST API  

---

## 🚀 Demo

Curious to see ForkNight in action? Get ready to level up your open source game!

🌐 **Link To ForkNight:**  [https://forknight.vercel.app/](https://forknight.vercel.app/)

---

<!-- ## 📸 Screenshots

<!-- Add screenshots or screen recordings here once available -->
<!-- Example:
![Dashboard](screenshots/dashboard.png)
-->

<!-- --- --> 





## 🤝 Contributing

We love contributions! ForkNight is open to pull requests, issues, and ideas. Here's how to get started:

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/forknight.git
cd forknight
````

### 2\. Install Dependencies

#### Backend (server/)

```bash
cd server
npm install
```

#### Frontend (client/)

```bash
cd ../client
npm install
```

### 3\. Environment Setup

Create a `.env` file inside the `server/` directory with the following:

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret
MONGO_URI=your_mongodb_connection_string
```

⚠️ **Never commit `.env` files\!**

### 4\. Run the App

Open two terminal windows(split terminal):

#### Terminal 1: Start the backend

```bash
cd server
npm run dev
```

#### Terminal 2: Start the frontend

```bash
cd client
npm run dev
```
Go to http://localhost:5173 in your browser.

Have Fun Contributing!

---

