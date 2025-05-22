const { useState, useEffect } = React;

/* AI CHAT PAGE */
function InterviewChatPage({ setActivePage }) {
  const [messages, setMessages] = useState([
    { 
      text: "Welcome to your AI interview practice! I'm Sensei. Let's begin. Tell me about yourself and why you're interested in this position.", 
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const interviewQuestions = [
    "How do you handle conflicting priorities when working on multiple projects?",
    "Describe a time you had to learn a new technology quickly. What was your approach?",
    "Can you give an example of a challenging team dynamic you helped resolve?",
    "What metrics do you use to measure success in your work?",
    "How would you explain a complex technical concept to a non-technical stakeholder?"
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }]);

    // Check if there are more questions
    if (currentQuestionIndex < interviewQuestions.length) {
      // AI responds with next question
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: interviewQuestions[currentQuestionIndex],
          isUser: false,
          timestamp: new Date()
        }]);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1000);
    } else {
      // All questions answered, show feedback
      setShowFeedback(true);
    }

    setInputText('');
  };

  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-4 quick-page-enter max-w-4xl mx-auto h-[90vh] flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-red-800">
        <h2 className="text-xl font-bold flex items-center">
          <i className="fas fa-comments mr-2 sensei-accent"></i>
          AI Interview Practice
        </h2>
        <button 
          onClick={() => setActivePage('dashboard')}
          className="text-sm px-3 py-1 border border-red-700 rounded-lg hover:bg-red-900/30 transition-colors sensei-button"
        >
          End Session
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`${msg.isUser 
                ? 'bg-red-900/40 border-red-800 rounded-tr-none ml-6' 
                : 'bg-gray-800/60 border-gray-700 rounded-tl-none mr-6'} 
                p-3 rounded-lg border max-w-[85%] relative`}
            >
              <div className="message-avatar">
                {msg.isUser ? (
                  <i className="fas fa-user text-xs text-gray-400"></i>
                ) : (
                  <i className="fas fa-robot text-xs text-red-400"></i>
                )}
              </div>
              <p className="text-sm">{msg.text}</p>
              <div className="text-xs text-gray-400 mt-1.5 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showFeedback ? (
        <div className="feedback-card p-3 rounded-lg mb-2 border border-red-800 bg-gray-900/50">
          <h3 className="text-md font-semibold mb-2 sensei-accent">Interview Completed</h3>
          <p className="text-sm mb-4">Thank you for completing the interview. Here's your feedback:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <h4 className="font-medium mb-1">✅ Strengths</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Clear communication</li>
                <li>Good examples used</li>
                <li>Strong technical knowledge</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">📈 Improvements</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Add specific metrics</li>
                <li>More concise answers</li>
                <li>Better time management</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 input-custom rounded-lg text-sm px-4 py-2"
            placeholder="Type your response..."
          />
          <button
            type="submit"
            className="btn-gradient px-4 py-2 rounded-lg sensei-button text-sm hover:opacity-90 flex-shrink-0 min-w-[80px]"
          >
            <i className="fas fa-paper-plane ml-1.5"></i>
          </button>
        </form>
      )}
    </div>
  );
}

/* RESUME FEEDBACK */
function ResumeFeedbackPage({ setActivePage }) {
  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 quick-page-enter max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <i className="fas fa-file-alt mr-3 sensei-accent"></i>
          Resume Feedback Report
        </h2>
        <button 
          onClick={() => setActivePage('resume')}
          className="text-red-400 hover:text-red-300 transition-colors sensei-button"
        >
          <i className="fas fa-arrow-left mr-2"></i>Back to Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="feedback-card p-4">
          <div className="text-2xl font-bold sensei-accent mb-2">84/100</div>
          <div className="text-sm">Overall Score</div>
        </div>
        <div className="feedback-card p-4">
          <div className="text-2xl font-bold sensei-accent mb-2">4.2★</div>
          <div className="text-sm">Technical Skills</div>
        </div>
        <div className="feedback-card p-4">
          <div className="text-2xl font-bold sensei-accent mb-2">3.8★</div>
          <div className="text-sm">Presentation</div>
        </div>
      </div>

      <div className="feedback-card p-4 rounded-lg mb-4">
        <h3 className="font-semibold mb-3 sensei-accent">Key Improvements</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-red-400 mr-2 mt-1"></i>
            <div>
              <div className="font-medium">Skills Section</div>
              <p className="text-sm text-gray-300">
                Add more industry-specific keywords (e.g., "Agile methodologies", "CI/CD")
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-red-400 mr-2 mt-1"></i>
            <div>
              <div className="font-medium">Work Experience</div>
              <p className="text-sm text-gray-300">
                Quantify achievements with metrics ("Improved performance by 35%...")
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-red-400 mr-2 mt-1"></i>
            <div>
              <div className="font-medium">Formatting</div>
              <p className="text-sm text-gray-300">
                Increase consistency in date formats and section headings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="feedback-card p-4 rounded-lg">
        <h3 className="font-semibold mb-3 sensei-accent">Optimization Tips</h3>
        <ul className="list-disc pl-4 space-y-2">
          <li>Include a professional summary at the top</li>
          <li>Add links to portfolio projects</li>
          <li>Use bullet points for readability</li>
          <li>Include relevant certifications</li>
        </ul>
      </div>
    </div>
  );
}

/* APP COMPONENTS */
function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState('dashboard');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [pageTransition, setPageTransition] = useState(false);
  
  const users = [
    { email: 'demo@example.com', password: 'password123', name: 'Demo User' }
  ];
  
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let newCaptcha = '';
    for(let i = 0; i < 4; i++) {
      newCaptcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(newCaptcha);
  };

  useEffect(() => {
    if (currentView === 'landing') {
      const timer = setTimeout(() => {
        setPageTransition(true);
        setTimeout(() => {
          setCurrentView('auth');
          setPageTransition(false);
        }, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  useEffect(() => {
    if (currentView === 'auth') {
      generateCaptcha();
    }
  }, [currentView, isLogin]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setCaptchaError('');

    if(userCaptcha.toLowerCase() !== captcha.toLowerCase()) {
      setCaptchaError('CAPTCHA verification failed');
      generateCaptcha();
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUserName(user.name);
      setIsLoggedIn(true);
      setPageTransition(true);
      setTimeout(() => {
        setCurrentView('app');
        setPageTransition(false);
      }, 300);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setPageTransition(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setCurrentView('landing');
      setEmail('');
      setPassword('');
      setPageTransition(false);
    }, 300);
  };

  const handlePageChange = (page) => {
    setPageTransition(true);
    setTimeout(() => {
      setActivePage(page);
      setPageTransition(false);
    }, 300);
  };

  const handleAutoFill = (field) => {
    if (field === 'email' && !email) {
      setEmail('demo@example.com');
    }
    if (field === 'password' && !password) {
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentView !== 'landing' && (
        <header className="py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-user-ninja text-2xl mr-3 sensei-accent"></i>
              <h1 className="text-xl md:text-2xl font-bold">Applicant <span className="sensei-accent">Sensei</span></h1>
            </div>
            
            {isLoggedIn && (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-10 h-10 rounded-full bg-red-900 bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-red-800 transition-all duration-300">
                    <i className="fas fa-user text-lg"></i>
                  </div>
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-gray-900 rounded-lg shadow-lg p-4 min-w-[200px] quick-stagger-1 opacity-0">
                    <div className="text-sm mb-2">Logged in as:</div>
                    <div className="font-medium text-red-400">{userName}</div>
                    <hr className="my-3 border-gray-700" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-2 py-1 hover:bg-red-900 hover:bg-opacity-20 rounded transition-all duration-300"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      )}
      
      {currentView === 'landing' && (
        <div className={`fixed inset-0 flex flex-col items-center justify-center ${pageTransition ? 'quick-exit' : ''}`}>
          <div className="text-center max-w-3xl px-4">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight space-y-4">
                <div className="quick-stagger-1 opacity-0">Enhance your resume.</div>
                <div className="quick-stagger-2 opacity-0">Ace your interview.</div>
                <div className="quick-stagger-3 opacity-0">Get the job you want.</div>
              </h2>
              <div className="mt-6">
                <div className="quick-stagger-4 opacity-0 text-4xl md:text-5xl font-bold sensei-accent">
                  Applicant Sensei
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {currentView === 'auth' && (
        <div className={`flex-grow flex flex-col items-center justify-center px-4 ${pageTransition ? 'quick-exit' : 'quick-page-enter'}`}>
          <div className="w-full max-w-md login-card rounded-lg shadow-2xl overflow-hidden p-6 md:p-8 relative">
            <h2 className="text-2xl font-bold mb-6 text-center quick-stagger-1 opacity-0">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            <div className="flex mb-8">
              <button 
                className={`flex-1 py-2 text-center transition-all duration-300 ${isLogin ? 'bg-red-900 bg-opacity-30 rounded-l-lg font-medium' : 'text-gray-400'}`}
                onClick={() => {setIsLogin(true); setError('');}}
              >
                Login
              </button>
              <button 
                className={`flex-1 py-2 text-center transition-all duration-300 ${!isLogin ? 'bg-red-900 bg-opacity-30 rounded-r-lg font-medium' : 'text-gray-400'}`}
                onClick={() => {setIsLogin(false); setError('');}}
              >
                Sign Up
              </button>
            </div>
            
            {error && (
              <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-200 px-4 py-2 rounded mb-4 quick-stagger-2 opacity-0">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4 quick-stagger-2 opacity-0">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 rounded-lg input-custom transition-all duration-300" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={() => handleAutoFill('email')}
                  required
                />
              </div>
              
              <div className="mb-4 relative quick-stagger-3 opacity-0">
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-lg input-custom pr-10 transition-all duration-300"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={() => handleAutoFill('password')}
                    required
                  />
                  <i 
                    className={`fas fa-eye${showPassword ? "" : "-slash"} absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors text-xs opacity-50 hover:opacity-70`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>

              <div className="mb-4 quick-stagger-4 opacity-0">
                <label className="block text-sm font-medium mb-2">
                  Prove you're human
                </label>
                <div className="captcha-container">
                  <div className="captcha-text">
                    {captcha.split('').map((char, index) => {
                      const scaleX = 0.8 + Math.random() * 0.4;
                      const rotate = Math.random() * 15 - 7.5;
                      const strikeRotate = Math.random() * 20 - 10;
                      
                      return (
                        <span 
                          key={index} 
                          className="captcha-char" 
                          style={{ 
                            transform: `scaleX(${scaleX}) rotate(${rotate}deg) translateY(${Math.random() * 4 - 2}px)`,
                          }}
                        >
                          {char}
                          <div 
                            className="absolute top-1/2 left-0 w-full h-px bg-red-400 opacity-70"
                            style={{
                              transform: `rotate(${strikeRotate}deg) translateY(-50%)`,
                              top: `${50 + (Math.random() * 20 - 10)}%`,
                              width: `${80 + Math.random() * 40}%`
                            }}
                          ></div>
                        </span>
                      );
                    })}
                  </div>
                  <div className="refresh-captcha" onClick={generateCaptcha}>
                    <i className="fas fa-redo"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg input-custom captcha-input transition-all duration-300"
                  placeholder="Enter the code above"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  required
                />
                {captchaError && (
                  <div className="text-red-400 text-sm mt-1">{captchaError}</div>
                )}
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 px-4 btn-gradient text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 mb-2 quick-stagger-1 opacity-0 sensei-button"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
              
              {isLogin && (
                <div className="text-center text-sm text-gray-400 quick-stagger-1 opacity-0">
                  <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      
      {currentView === 'app' && (
        <div className={`flex-grow container mx-auto px-4 py-6 ${pageTransition ? 'quick-exit' : 'quick-page-enter'}`}>
          {activePage === 'dashboard' && <DashboardPage setActivePage={handlePageChange} />}
          {activePage === 'resume' && <ResumeAnalysisPage setActivePage={handlePageChange} />}
          {activePage === 'interview' && <AIInterviewPage setActivePage={handlePageChange} />}
          {activePage === 'interview-chat' && <InterviewChatPage setActivePage={handlePageChange} />}
          {activePage === 'resume-feedback' && <ResumeFeedbackPage setActivePage={handlePageChange} />}
          
          <footer className="py-4 px-6 text-center text-sm text-gray-500">
            <p>© 2025 Applicant Sensei. All rights reserved.</p>
            
          </footer>
        </div>
      )}
    </div>
  );
}

function DashboardPage({ setActivePage }) {
  return (
    <div className="container mx-auto px-4 py-6 quick-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="quick-card sensei-card transform transition-all duration-300 bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 cursor-pointer"
            onClick={() => setActivePage('interview')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 sensei-accent text-4xl">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Interview Practice</h3>
              <p className="text-gray-400 text-sm">
                Practice mock interviews with real-time AI feedback and scoring system
              </p>
              <button className="mt-4 px-4 py-2 text-sm btn-gradient rounded-lg sensei-button">
                Start Practice →
              </button>
            </div>
          </div>

          <div 
            className="quick-card sensei-card transform transition-all duration-300 bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 cursor-pointer"
            onClick={() => setActivePage('resume')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 sensei-accent text-4xl">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Resume Analysis</h3>
              <p className="text-gray-400 text-sm">
                Get instant AI-powered resume review with optimization suggestions.
              </p>
              <button className="mt-4 px-4 py-2 text-sm btn-gradient rounded-lg sensei-button">
                Analyze Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumeAnalysisPage({ setActivePage }) {
  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 quick-page-enter max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold flex items-center mb-6">
        <i className="fas fa-file-alt mr-3 sensei-accent"></i>
        Resume Analysis
      </h2>
      
      <div className="mb-8">
        <p className="mb-4">Upload your resume to get detailed AI-powered analysis and personalized improvement suggestions.</p>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-red-500 transition-all duration-300">
          <i className="fas fa-cloud-upload-alt text-3xl mb-4 text-gray-500"></i>
          <p className="mb-4">Drag and drop your resume here or</p>
          <button className="px-4 py-2 btn-gradient text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 sensei-button">
            Browse Files
          </button>
          <p className="mt-3 text-sm text-gray-500">Supported formats: PDF, DOCX (Max size: 5MB)</p>
        </div>
      </div>
      
      <div className="mb-8 quick-stagger-3 opacity-0">
        <h3 className="text-lg font-semibold mb-4">Analysis History</h3>
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 flex items-center justify-between transform transition-all duration-300 hover:bg-gray-700 hover:bg-opacity-50 hover:translate-x-1">
          <div className="flex-1 min-w-0 pr-4">
            <p className="font-medium truncate">Frontend_Developer_Resume.pdf</p>
            <p className="text-sm text-gray-400">Last analyzed 3 hours ago</p>
          </div>
          <button 
            onClick={() => setActivePage('resume-feedback')}
            className="flex-shrink-0 px-3 py-1 text-sm rounded border border-red-500 text-red-400 hover:bg-red-900 hover:bg-opacity-20 transition-all duration-300 sensei-button"
          >
            View Details
          </button>
        </div>
      </div>

      <div className="mt-6 text-center quick-stagger-4 opacity-0">
        <button 
          onClick={() => setActivePage('dashboard')}
          className="text-red-400 hover:text-red-300 transition-colors sensei-button"
        >
          <i className="fas fa-arrow-left mr-2"></i>Back to Dashboard
        </button>
      </div>
    </div>
  );
}

function AIInterviewPage({ setActivePage }) {
  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 quick-page-enter max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold flex items-center mb-6">
        <i className="fas fa-comments mr-3 sensei-accent"></i>
        AI Interview Preparation
      </h2>
      
      <div className="mb-8">
        <p className="mb-6">Practice with Sensei, our AI-powered chat-based interviewer.</p>
        <div className="mb-6 quick-stagger-1 opacity-0">
          <label className="block text-sm font-medium mb-2">Target Job Role</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-lg input-custom transition-all duration-300" 
            placeholder="e.g. Marketing Manager, Software Engineer"
          />
        </div>
        <div className="mb-6 quick-stagger-2 opacity-0">
          <label className="block text-sm font-medium mb-2">Industry</label>
          <select className="w-full px-4 py-2 rounded-lg input-custom transition-all duration-300">
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
            <option>Education</option>
            <option>Marketing</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-6 quick-stagger-3 opacity-0">
          <label className="block text-sm font-medium mb-2">Experience Level</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="experience" defaultChecked />
              <span className="ml-2">Entry</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="experience" />
              <span className="ml-2">Mid-level</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="experience" />
              <span className="ml-2">Senior</span>
            </label>
          </div>
        </div>
        <button 
          onClick={() => setActivePage('interview-chat')}
          className="w-full py-3 px-4 btn-gradient text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 sensei-button quick-stagger-4 opacity-0"
        >
          Start Interview Practice
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => setActivePage('dashboard')}
          className="text-red-400 hover:text-red-300 transition-colors text-sm sensei-button"
        >
          <i className="fas fa-arrow-left mr-2"></i>Back to Dashboard
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
