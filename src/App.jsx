import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';

// Lazy Load Icons
const Bot = React.lazy(() => import('lucide-react').then(module => ({ default: module.Bot })));
const User = React.lazy(() => import('lucide-react').then(module => ({ default: module.User })));
const Send = React.lazy(() => import('lucide-react').then(module => ({ default: module.Send })));
const FileText = React.lazy(() => import('lucide-react').then(module => ({ default: module.FileText })));
const Calendar = React.lazy(() => import('lucide-react').then(module => ({ default: module.Calendar })));
const MapPin = React.lazy(() => import('lucide-react').then(module => ({ default: module.MapPin })));
const CheckCircle2 = React.lazy(() => import('lucide-react').then(module => ({ default: module.CheckCircle2 })));
const Globe2 = React.lazy(() => import('lucide-react').then(module => ({ default: module.Globe2 })));
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [lang, setLang] = useState('EN'); // 'EN' or 'HI'
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize and handle tab switching
  useEffect(() => {
    handleTabClick('Naya Voter ID (Form 6)');
  }, [lang]); // Re-trigger when language changes

  const getBotResponse = (input, tab, currentLang) => {
    const lowercaseInput = input.toLowerCase();
    
    // Check if input itself looks like Hindi (Devanagari characters)
    const isHindiInput = /[\u0900-\u097F]/.test(input);
    const responseLang = isHindiInput ? 'HI' : currentLang;
    
    const standardFooter = responseLang === 'HI' 
      ? `\n\n📌 आधिकारिक संसाधन:\n• पोर्टल: https://voters.eci.gov.in\n• हेल्पलाइन: 1950 (टोल-फ्री)`
      : `\n\n📌 Official Resources:\n• Portal: https://voters.eci.gov.in\n• Helpline: 1950 (Toll-Free)`;

    // Edge Case: Political Neutrality
    if (lowercaseInput.includes('vote for') || lowercaseInput.includes('which party') || lowercaseInput.includes('bjp') || lowercaseInput.includes('congress') || lowercaseInput.includes('aap')) {
      return responseLang === 'HI'
        ? "एक चुनाव सहायक AI के रूप में, मैं सख्त राजनीतिक तटस्थता बनाए रखता हूं। मेरा उद्देश्य केवल चुनावी प्रक्रियाओं पर तथ्यात्मक मार्गदर्शन प्रदान करना है। मैं किसी राजनीतिक दल का सुझाव या समर्थन नहीं कर सकता।" + standardFooter
        : "As an Election Sahayak AI, I maintain strict political neutrality. My purpose is solely to provide factual guidance on electoral procedures and ECI guidelines. I cannot suggest, endorse, or discuss political parties or candidates." + standardFooter;
    }

    // Edge Case: Underage / 17 years old
    if (lowercaseInput.includes('17 saal') || lowercaseInput.includes('17 years') || lowercaseInput.includes('age 17') || lowercaseInput.includes('underage') || lowercaseInput.includes('age rule')) {
      return responseLang === 'HI'
        ? "ECI के आयु नियम के अनुसार, यदि आप 4 योग्यता तिथियों (1 जनवरी, 1 अप्रैल, 1 जुलाई, 1 अक्टूबर) में से किसी पर भी 18+ वर्ष के हैं तो आप मतदान कर सकते हैं। यदि आप 17 वर्ष के हैं, तो आप 'अग्रिम पंजीकरण' के माध्यम से फॉर्म 6 जमा कर सकते हैं, ताकि 18 वर्ष का होते ही आपका नाम जुड़ जाए।" + standardFooter
        : "According to ECI's Age Rule, you are eligible if you are 18+ years on any of the 4 qualifying dates (Jan 1st, April 1st, July 1st, Oct 1st). If you are 17 years old, you can use the 'Advance Registration' facility to apply early, so your name is added as soon as you turn 18." + standardFooter;
    }

    // Edge Case: Polling Booth via EPIC
    if (lowercaseInput.includes('mujhe apna polling booth') || lowercaseInput.includes('booth kaise milega') || tab === 'Polling Station Finder' || lowercaseInput.includes('booth') || lowercaseInput.includes('polling')) {
      return responseLang === 'HI'
        ? "अपना मतदान केंद्र खोजने के लिए, आधिकारिक पोर्टल पर अपने EPIC नंबर (वोटर आईडी) का उपयोग करके खोजें: https://electoralsearch.eci.gov.in.\n\nवैकल्पिक रूप से, 1950 पर <EPIC नंबर> SMS करें।" + standardFooter
        : "To locate your specific polling station, you can search using your EPIC Number (Voter ID Number) on the official portal: https://electoralsearch.eci.gov.in.\n\nAlternatively, you can SMS <EPIC Number> to 1950. Note that booth assignments are subject to ECI updates closer to the election date." + standardFooter;
    }

    // Context: Election Dates 2026
    if (tab === 'Election Dates 2026' || lowercaseInput.includes('date') || lowercaseInput.includes('schedule')) {
      return responseLang === 'HI'
        ? "चुनाव की तारीखें ECI द्वारा चुनाव के करीब आधिकारिक तौर पर घोषित की जाती हैं। वर्तमान में, केवल एक गाइड के रूप में पिछले (2024) कार्यक्रम का उपयोग करें।" + standardFooter
        : "Dates are officially announced by ECI closer to the event. Currently, use past general election schedules (e.g., 2024 dates) as a guide only." + standardFooter;
    }

    // Context: Voter ID / Form 6 / Form 8
    if (tab === 'Naya Voter ID (Form 6)' || lowercaseInput.includes('form 6') || lowercaseInput.includes('form 7') || lowercaseInput.includes('form 8') || lowercaseInput.includes('voter id') || lowercaseInput.includes('new voter') || lowercaseInput.includes('change') || lowercaseInput.includes('correction') || lowercaseInput.includes('apply')) {
      return responseLang === 'HI'
        ? `अपने वोटर आईडी को प्रबंधित करने के लिए, कृपया इन ECI फॉर्म का उपयोग करें:\n
• फॉर्म 6: नया मतदाता पंजीकरण (नया आवेदन)।
• फॉर्म 6A: विदेशी (NRI) मतदाताओं के लिए पंजीकरण।
• फॉर्म 7: नाम शामिल करने पर आपत्ति या विलोपन की मांग।
• फॉर्म 8: विवरणों में सुधार, निवास बदलना, EPIC का प्रतिस्थापन, या PwD के रूप में चिह्नित करना।

नए वोटर आईडी (फॉर्म 6) की प्रक्रिया:
1. पात्रता जांच (4 योग्यता तिथियों पर 18+ वर्ष)
2. दस्तावेज (आयु और पता प्रमाण)
3. voters.eci.gov.in पर ऑनलाइन सबमिशन
4. रेफरेंस आईडी का उपयोग करके ट्रैकिंग
5. पंजीकृत पते पर EPIC की डिलीवरी` + standardFooter
        : `To manage your Voter ID, please utilize the specific ECI forms:\n
• Form 6: New Voter Registration (Fresh Application).
• Form 6A: Registration for Overseas (NRI) Voters.
• Form 7: Objection to inclusion or seeking deletion of a name.
• Form 8: Correction of entries, Shifting of residence, Replacement of EPIC, or marking as PwD.

Process for New Voter ID (Form 6):
1. Eligibility check (18+ on the 4 qualifying dates)
2. Documentation gathering (Age & Address proof)
3. Online submission via voters.eci.gov.in
4. Tracking using reference ID
5. Delivery of EPIC to registered address` + standardFooter;
    }

    return responseLang === 'HI'
      ? "मैं चुनाव सहायक AI हूं। मैं ECI प्रक्रियाओं के आधार पर तथ्यात्मक मार्गदर्शन प्रदान करता हूं। मैं आज आपकी क्या सहायता कर सकता हूं?" + standardFooter
      : "I am the Election Sahayak AI. I provide formal, neutral, and factual guidance based strictly on the Election Commission of India (ECI) procedures. How may I assist you with your electoral queries today?" + standardFooter;
  };

  // --- Groq LLM Integration ---
  const generateGroqResponse = async (userMessage, tabContext, currentLang) => {
    // IMPORTANT: Using API key from .env file for security
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 
    
    // Fallback to simulated responses if no API key is provided
    if (!API_KEY || API_KEY === "YOUR_GROQ_API_KEY_HERE") {
      return getBotResponse(userMessage, tabContext, currentLang);
    }

    const systemPrompt = `You are the 'Election Sahayak AI', a factual, trusted assistant for the Indian general public.
Rules:
1. Always use neutral, formal, non-partisan language. Never provide political opinions.
2. Reference the Election Commission of India (ECI) as the authority.
3. Master Data: Form 6 (New Voter), Form 6A (NRI), Form 7 (Deletion), Form 8 (Correction).
4. Age Rule: Eligible if 18+ on Jan 1, April 1, July 1, Oct 1. 17-year-olds can use Advance Registration.
5. Timeline: Notification, Nominations, Polling Day, Counting.
6. If the user speaks Hindi or the requested language is Hindi, respond ENTIRELY in formal Hindi. Preferred language: ${currentLang}.
7. Keep answers concise, strictly factual, and use bullet points for steps.`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192", // Fast and highly capable
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Context: User is currently on the '${tabContext}' tab. User Query: ${userMessage}` }
          ],
          temperature: 0.2,
          max_tokens: 500
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        let answer = data.choices[0].message.content;
        
        // Always append the standard footer
        const standardFooter = currentLang === 'HI' 
          ? `\n\n📌 आधिकारिक संसाधन:\n• पोर्टल: https://voters.eci.gov.in\n• हेल्पलाइन: 1950 (टोल-फ्री)`
          : `\n\n📌 Official Resources:\n• Portal: https://voters.eci.gov.in\n• Helpline: 1950 (Toll-Free)`;
          
        return answer + standardFooter;
      }
      return getBotResponse(userMessage, tabContext, currentLang); // fallback
    } catch (error) {
      console.error("Groq API Error:", error);
      return getBotResponse(userMessage, tabContext, currentLang); // fallback
    }
  };

  const handleTabClick = useCallback(async (tabName) => {
    setActiveTab(tabName);
    
    let userQuery = '';
    if (tabName === 'Naya Voter ID (Form 6)') {
      userQuery = lang === 'HI' ? 'फॉर्म 6 के माध्यम से नया वोटर आईडी कार्ड लागू करने की प्रक्रिया बताएं' : 'Explain the process of applying for a new Voter ID card via Form 6';
    } else if (tabName === 'Election Dates 2026') {
      userQuery = lang === 'HI' ? '2026 के आम चुनाव की तारीखें क्या हैं?' : 'What are the general election dates for 2026?';
    } else if (tabName === 'Polling Station Finder') {
      userQuery = lang === 'HI' ? 'मैं आगामी चुनाव के लिए अपना मतदान केंद्र कैसे ढूंढ सकता हूं?' : 'How can I find my polling station for the upcoming election?';
    }

    const initialMessages = [
      { id: Date.now(), sender: 'user', text: userQuery }
    ];
    setMessages(initialMessages);
    setIsTyping(true);
    
    const botReply = await generateGroqResponse(userQuery, tabName, lang);
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        isVerified: true
      }
    ]);
    setIsTyping(false);
  }, [lang]);

  const navItems = [
    { name: 'Naya Voter ID (Form 6)', icon: <FileText className="icon" size={22} strokeWidth={1.5} /> },
    { name: 'Election Dates 2026', icon: <Calendar className="icon" size={22} strokeWidth={1.5} /> },
    { name: 'Polling Station Finder', icon: <MapPin className="icon" size={22} strokeWidth={1.5} /> }
  ];

  const quickActions = lang === 'HI' ? [
    "रजिस्टर कैसे करें?", "दस्तावेज़ सूची?", "अगले चुनाव की तारीख?"
  ] : [
    "How to register?", "Document list?", "Next election date?"
  ];

  const handleQuickAction = useCallback(async (query) => {
    if (isTyping) return;
    const newMessages = [
      ...messages,
      { id: Date.now(), sender: 'user', text: query }
    ];
    
    setMessages(newMessages);
    setIsTyping(true);
    
    const botReply = await generateGroqResponse(query, activeTab, lang);
    
    setMessages(prev => [
      ...prev,
      { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: botReply,
        isVerified: true
      }
    ]);
    setIsTyping(false);
  }, [isTyping, messages, activeTab, lang]);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue;
    
    const newMessages = [
      ...messages,
      { id: Date.now(), sender: 'user', text: userMsg }
    ];
    
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);
    
    const botReply = await generateGroqResponse(userMsg, activeTab, lang);
    
    setMessages(prev => [
      ...prev,
      { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: botReply,
        isVerified: true
      }
    ]);
    setIsTyping(false);
  }, [inputValue, messages, activeTab, lang]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar - Semantic nav */}
      <nav className="sidebar" aria-label="Main Navigation">
        <div className="sidebar-header">
          <Suspense fallback={<div style={{ width: 32, height: 32 }} />}>
            <Bot size={32} color="var(--primary-blue)" strokeWidth={1.5} aria-hidden="true" />
          </Suspense>
          <h1>Election Sahayak</h1>
        </div>
        
        <div className="nav-buttons" role="menu">
          {navItems.map((item) => (
            <button 
              key={item.name}
              className={`nav-btn ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => handleTabClick(item.name)}
              role="menuitem"
              aria-current={activeTab === item.name ? 'page' : undefined}
            >
              <Suspense fallback={<div style={{ width: 22, height: 22 }} />}>
                {item.icon}
              </Suspense>
              <span style={{ flex: 1, textAlign: 'left' }}>{item.name}</span>
              {activeTab === item.name && (
                <Suspense fallback={<div style={{ width: 20, height: 20 }} />}>
                  <CheckCircle2 className="icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                </Suspense>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content - Semantic main */}
      <main className="main-content" aria-label="Chat Interface">
        {/* Header - Semantic header */}
        <header className="header">
          <div className="header-content">
            <h2>Election Assistant - Empowering Every Voter</h2>
            <Suspense fallback={<span />}>
              <CheckCircle2 size={22} color="var(--white)" fill="var(--accent-blue)" strokeWidth={1.5} style={{ marginLeft: '4px' }} aria-hidden="true" />
            </Suspense>
          </div>
          <div className="header-actions">
            <div className="lang-toggle" role="group" aria-label="Language selection">
              <Suspense fallback={<span />}>
                <Globe2 size={16} color="var(--white)" aria-hidden="true" />
              </Suspense>
              <button 
                className={`lang-btn ${lang === 'EN' ? 'active' : ''}`}
                onClick={() => setLang('EN')}
                aria-pressed={lang === 'EN'}
                aria-label="Switch to English"
              >EN</button>
              <button 
                className={`lang-btn ${lang === 'HI' ? 'active' : ''}`}
                onClick={() => setLang('HI')}
                aria-pressed={lang === 'HI'}
                aria-label="Switch to Hindi"
              >HI</button>
            </div>
            <div className="avatar" style={{ width: '32px', height: '32px' }} aria-label="User Profile" role="img">
              <Suspense fallback={<span />}>
                <User size={18} strokeWidth={1.5} aria-hidden="true" />
              </Suspense>
            </div>
          </div>
        </header>

        {/* Chat Area Wrapper */}
        <section className="chat-area-wrapper" aria-label="Chat and Timeline">
          
          {/* Visual Progress Tracker (Pipeline) */}
          <div className="pipeline-container" aria-label="Electoral Process Timeline">
            <div className="pipeline-header" id="timeline-heading">
              {lang === 'HI' ? 'चुनावी प्रक्रिया समयरेखा (संदर्भ 2024)' : 'Electoral Process Timeline (Reference 2024)'}
            </div>
            <div className="pipeline-steps" aria-labelledby="timeline-heading">
              <div className="pipeline-line" aria-hidden="true"></div>
              
              <div className="pipeline-step active">
                <div className="step-circle active">
                  <Suspense fallback={<span />}>
                    <CheckCircle2 size={14} aria-hidden="true" />
                  </Suspense>
                </div>
                <span className="step-label">{lang === 'HI' ? 'अधिसूचना' : 'Notification'}</span>
              </div>
              
              <div className="pipeline-step active">
                <div className="step-circle active">
                  <Suspense fallback={<span />}>
                    <CheckCircle2 size={14} aria-hidden="true" />
                  </Suspense>
                </div>
                <span className="step-label">{lang === 'HI' ? 'नामांकन' : 'Nominations'}</span>
              </div>
              
              <div className="pipeline-step">
                <div className="step-circle" aria-hidden="true"></div>
                <span className="step-label">{lang === 'HI' ? 'मतदान का दिन' : 'Polling Day'}</span>
              </div>
              
              <div className="pipeline-step">
                <div className="step-circle" aria-hidden="true"></div>
                <span className="step-label">{lang === 'HI' ? 'मतगणना' : 'Counting'}</span>
              </div>
            </div>
          </div>

          <div className="chat-area">
            <div className="chat-messages" role="log" aria-live="polite" aria-atomic="false">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="avatar" aria-hidden="true">
                    <Suspense fallback={<span />}>
                      {msg.sender === 'bot' ? <Bot size={24} strokeWidth={1.5} /> : <User size={24} strokeWidth={1.5} />}
                    </Suspense>
                  </div>
                  <div className="message-content">
                    <div className="message-bubble">
                      {msg.text}
                    </div>
                    {msg.sender === 'bot' && msg.isVerified && (
                      <div className="fact-check-badge">
                        <Suspense fallback={<span />}>
                          <CheckCircle2 size={12} color="#16a34a" aria-hidden="true" />
                        </Suspense>
                        <span>{lang === 'HI' ? 'सत्यापित स्रोत: आधिकारिक ECI पोर्टल' : 'Source: Official ECI Portal'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot" aria-label="AI is typing">
                  <div className="avatar" aria-hidden="true">
                    <Suspense fallback={<span />}>
                      <Bot size={24} strokeWidth={1.5} />
                    </Suspense>
                  </div>
                  <div className="message-content">
                    <div className="message-bubble typing-bubble">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-container" aria-label="Quick Actions">
               {quickActions.map((action, idx) => (
                 <button 
                    key={idx} 
                    className="quick-action-chip" 
                    onClick={() => handleQuickAction(action)}
                    aria-label={`Ask: ${action}`}
                 >
                    {action}
                 </button>
               ))}
            </div>

            {/* Input Area */}
            <div className="chat-input-wrapper">
              <div className="chat-input-container">
                <input 
                  type="text" 
                  className="chat-input" 
                  placeholder={lang === 'HI' ? 'अपना प्रश्न यहां पूछें...' : `Ask a question about ${activeTab}...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Chat input field"
                />
                <button 
                  className="send-btn" 
                  onClick={handleSend}
                  aria-label="Send message"
                >
                  <Suspense fallback={<span />}>
                    <Send size={20} strokeWidth={1.5} aria-hidden="true" />
                  </Suspense>
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
