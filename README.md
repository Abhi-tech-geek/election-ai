# 🇮🇳 Election Sahayak AI

**Election Sahayak** is a highly professional, bilingual (Hindi/English) AI-powered dashboard designed to guide Indian citizens through the electoral process with strict adherence to Election Commission of India (ECI) guidelines.

Built as a submission for **Hack2skill**, this project focuses on factual accuracy, premium UI/UX, and accessibility.

## ✨ Key Features

- **🧠 Real-time LLM Integration (Groq)**: Powered by the blazing-fast `llama3-8b-8192` model via the Groq API to provide dynamic, intelligent responses. Includes a robust local fallback system for flawless demos.
- **🌐 Bilingual Support**: Seamlessly toggle between English and Hindi. The AI detects the language preference and translates all procedural steps, including the visual pipeline!
- **📜 ECI "Smart" Knowledge Base**: 
  - Trained to understand the nuances of **Forms 6, 6A, 7, and 8**.
  - **The "Age Rule" Secret**: Unlike generic bots, this assistant is explicitly trained on the ECI's latest **4 qualifying dates** (Jan 1, April 1, July 1, Oct 1) and correctly advises 17-year-olds on the "Advance Registration" facility.
- **🎨 Premium UI/UX**:
  - **Glassmorphism Design**: Beautiful translucent sidebars with vibrant abstract backgrounds.
  - **Interactive Quick Actions**: Pre-populated chips for instant query resolution without typing.
  - **Visual Electoral Timeline**: A dynamic horizontal pipeline tracking the 4 major election phases.
  - **Verified Fact-Check Badges**: Every AI response includes a "Source: Official ECI Portal" verification badge to build trust.
  - **Floating Inputs & Auto-Scroll**: Modern chat aesthetics with automated scrolling for a seamless conversation flow.

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.
- A free [Groq API Key](https://console.groq.com/keys).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhi-tech-geek/election-ai.git
   cd election-ai
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173/` in your browser.

## 🛠️ Technology Stack
- **Frontend**: React.js (Vite)
- **Styling**: Custom CSS (Glassmorphism, Animations)
- **Icons**: Lucide-React
- **AI Logic**: Groq API (Llama 3 8B)
