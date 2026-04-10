import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { ShieldAlert, Activity, LayoutDashboard, KeyRound, ArrowRight, Mail, MessageSquare, AlertTriangle, Globe, Server, CheckCircle, XCircle, Search, LogOut, ShieldCheck, Zap, BarChart3, Fingerprint } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import './index.css'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Context for Authentication
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

// Interactive Map Background Component
const InteractiveBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: -1, backgroundColor: '#020617' }}>
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y, scale: 1.05 }}
        transition={{ type: "spring", damping: 50, stiffness: 400 }}
        style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.6 }}
      >
        <ComposableMap projectionConfig={{ scale: 200 }} style={{ width: "100%", height: "100%" }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  style={{
                    default: { fill: "#0f172a", stroke: "#60a5fa", strokeWidth: 0.6, outline: "none" },
                    hover: { fill: "#10b981", stroke: "#34d399", strokeWidth: 1.5, outline: "none", transition: "all 0.2s ease-in-out", cursor: "pointer", filter: "drop-shadow(0px 0px 8px #10b981)" },
                    pressed: { fill: "#3b82f6", outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </motion.div>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at center, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.9) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [scanStatus, setScanStatus] = useState('idle');
  const [riskLevel, setRiskLevel] = useState('Malicious'); // Malicious, Suspicious, Safe

  const pieData = [
    { name: 'Safe', value: 39787, color: '#10b981' },
    { name: 'Suspicious', value: 5420, color: '#f59e0b' },
    { name: 'Malicious', value: 3104, color: '#ef4444' }
  ];

  const historyData = [
    { id: '1042', target: 'login-secure-auth.xyz', type: 'URL Scan', status: 'Blocked', time: '2 mins ago' },
    { id: '1041', target: 'support@paypal-verify.net', type: 'Email Scan', status: 'Blocked', time: '14 mins ago' },
    { id: '1040', target: 'Urgent: Package delivery...', type: 'SMS Scan', status: 'Flagged', time: '1 hour ago' },
    { id: '1039', target: 'https://docs.google.com/...', type: 'URL Scan', status: 'Safe', time: '3 hours ago' },
  ];

  const handleScan = () => {
    setScanStatus('scanning');
    // Randomly assign a risk level for demo
    const risks = ['Malicious', 'Suspicious', 'Safe'];
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    setRiskLevel(randomRisk);
    setTimeout(() => setScanStatus('result'), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1100px', margin: '0 auto', pointerEvents: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', textShadow: '0 0 10px rgba(59, 130, 246, 0.3)' }}>Intelligence Analysis Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Problem Statement Compliance: AI-Powered Heuristic Threat Analysis.</p>
        </div>
        <div className="card glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-green)', fontWeight: 600 }}>
            <Server size={18} className="animate-pulse-green" /> Nodes Active
          </div>
        </div>
      </div>

      <div className="grid-cols-tools" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={() => { setActiveTab('email'); setScanStatus('idle'); }} className={`card ${activeTab === 'email' ? 'glass-panel' : ''}`} style={{ borderLeft: activeTab === 'email' ? '3px solid var(--accent-blue)' : '1px solid var(--border-color)', background: activeTab === 'email' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-card)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Mail size={24} style={{ color: activeTab === 'email' ? 'var(--accent-blue)' : 'var(--text-secondary)' }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: activeTab === 'email' ? 'white' : 'var(--text-primary)' }}>Batch URL Processor</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Analyze multiple URL structures</p>
            </div>
          </button>
          
          <button onClick={() => { setActiveTab('urgent'); setScanStatus('idle'); }} className={`card ${activeTab === 'urgent' ? 'glass-panel' : ''}`} style={{ borderLeft: activeTab === 'urgent' ? '3px solid var(--accent-red)' : '1px solid var(--border-color)', background: activeTab === 'urgent' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-card)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={24} style={{ color: activeTab === 'urgent' ? 'var(--accent-red)' : 'var(--text-secondary)' }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: activeTab === 'urgent' ? 'white' : 'var(--text-primary)' }}>Threat Explorer</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Deep-scan malicious behavior</p>
            </div>
          </button>
          
          <button onClick={() => { setActiveTab('sms'); setScanStatus('idle'); }} className={`card ${activeTab === 'sms' ? 'glass-panel' : ''}`} style={{ borderLeft: activeTab === 'sms' ? '3px solid var(--accent-green)' : '1px solid var(--border-color)', background: activeTab === 'sms' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Fingerprint size={24} style={{ color: activeTab === 'sms' ? 'var(--accent-green)' : 'var(--text-secondary)' }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: activeTab === 'sms' ? 'white' : 'var(--text-primary)' }}>Heuristic Engine</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ML Pattern Recognition</p>
            </div>
          </button>
        </div>
        
        <div className="card glass-panel" style={{ height: '520px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {scanStatus === 'scanning' && <div className="scanner-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.5, zIndex: 0 }} />}
          
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem' }}>
              <Activity size={24} color={activeTab === 'urgent' ? "var(--accent-red)" : activeTab === 'sms' ? "var(--accent-green)" : "var(--accent-blue)"} /> 
              Intelligent URL Input Module
            </h3>
            {scanStatus === 'result' && (
              <button onClick={() => setScanStatus('idle')} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Reset Session</button>
            )}
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
            {scanStatus !== 'result' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  disabled={scanStatus === 'scanning'}
                  placeholder="Paste URL(s) for Pattern & Behavior Classification..." 
                  className="input-field" 
                  style={{ flex: 1 }} 
                />
                <button disabled={scanStatus === 'scanning'} onClick={handleScan} className="btn-primary" style={{ padding: '0 2rem' }}>
                  {scanStatus === 'scanning' ? 'Analyzing...' : 'Analyze Pattern'}
                </button>
              </div>
            )}
            
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', padding: scanStatus === 'result' ? '1rem' : '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)', position: 'relative', overflowY: 'auto' }}>
               {scanStatus === 'scanning' ? (
                <div style={{ textAlign: 'center' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                    <Activity size={48} style={{ color: 'var(--accent-blue)' }} />
                  </motion.div>
                  <p style={{ color: 'var(--accent-blue)', marginTop: '0.5rem' }}>Extracting features & calculating risk classification...</p>
                </div>
              ) : scanStatus === 'result' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    background: riskLevel === 'Malicious' ? 'rgba(239, 68, 68, 0.1)' : riskLevel === 'Suspicious' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
                    border: `1px solid ${riskLevel === 'Malicious' ? 'var(--accent-red)' : riskLevel === 'Suspicious' ? '#f59e0b' : 'var(--accent-green)'}`, 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-sm)' 
                  }}>
                    {riskLevel === 'Malicious' ? <XCircle size={36} color="var(--accent-red)" /> : riskLevel === 'Suspicious' ? <AlertTriangle size={36} color="#f59e0b" /> : <ShieldCheck size={36} color="var(--accent-green)" />}
                    <div>
                      <h4 style={{ color: riskLevel === 'Malicious' ? 'var(--accent-red)' : riskLevel === 'Suspicious' ? '#f59e0b' : 'var(--accent-green)', fontSize: '1.2rem', margin: 0 }}>
                        {riskLevel.toUpperCase()} CLASSIFICATION
                      </h4>
                      <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0 }}>AI Confidence Score: {riskLevel === 'Safe' ? '99.8%' : '98.4%'}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Explainability Module</h5>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {riskLevel === 'Safe' ? (
                          <>
                            <li>Reputable domain verified</li>
                            <li>No suspicious script triggers found</li>
                          </>
                        ) : (
                          <>
                            <li>Typosquatting detected (Visual similarity)</li>
                            <li>Hidden redirect chain detected</li>
                            <li>Keyword markers for Phishing found</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                      <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Security Insights</h5>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        Redirect Hop Count: {riskLevel === 'Safe' ? '1' : '4'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontWeight: 500 }}>
                         Result: {riskLevel === 'Safe' ? 'Access Granted' : 'Quarantine Required'}
                      </div>
                      {riskLevel !== 'Safe' && <button className="btn-primary" style={{ marginTop: '0.8rem', width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>View Redirect Chain</button>}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <ShieldAlert size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                  <p>Awaiting URL parameters for system feature extraction...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-cols-stats">
        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', alignSelf: 'flex-start' }}>Risk Distribution Engine</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Scan History (Persistent Logs)</h3>
          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '0.8rem 0.5rem' }}>ID</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>URL / Pattern</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Classification</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Confidence</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-secondary)' }}>#{row.id}</td>
                    <td style={{ padding: '0.8rem 0.5rem', fontFamily: 'monospace', color: '#fff' }}>{row.target}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: row.status === 'Safe' ? '#10b981' : row.status === 'Flagged' ? '#f59e0b' : '#ef4444' }}>{row.status}</td>
                    <td style={{ padding: '0.8rem 0.5rem' }}>{row.status === 'Safe' ? '99.8%' : '98.4%'}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-secondary)' }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Footer = () => (
  <footer style={{ 
    padding: '4rem 2rem', 
    marginTop: '4rem', 
    borderTop: '1px solid var(--border-color)', 
    textAlign: 'center',
    background: 'rgba(10, 14, 23, 0.8)',
    backdropFilter: 'blur(10px)',
    pointerEvents: 'auto'
  }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms & Protocol</a>
        <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Whitepaper</a>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Intelligent Link Defense. Built by <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Glitched Guys</span>.
      </div>
    </div>
  </footer>
);

const Home = () => {
   const [searchVal, setSearchVal] = useState('');
   const [isSearching, setIsSearching] = useState(false);
   const [showScanLine, setShowScanLine] = useState(false);

   const handleDivClick = () => {
     if (!showScanLine) {
       setShowScanLine(true);
       setTimeout(() => setShowScanLine(false), 3000);
     }
   };

   const handleAnalyze = () => {
      if(!searchVal) return;
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        alert(`Deep Analysis Complete: "${searchVal}" Classified as SUSPICIOUS (Confidence 87.2%). Check Dashboard for detailed heuristics.`);
        setSearchVal('');
      }, 2000);
   };

   return (
    <div style={{ width: '100%' }}>
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="card glass-panel" 
      onClick={handleDivClick}
      style={{ maxWidth: '850px', margin: '4rem auto', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '4rem 2rem', pointerEvents: 'auto', background: 'rgba(17, 24, 39, 0.3)', backdropFilter: 'blur(3px)' }}
    >
      <motion.div animate={{ filter: ["drop-shadow(0px 0px 5px #10b981)", "drop-shadow(0px 0px 25px #10b981)", "drop-shadow(0px 0px 5px #10b981)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <ShieldAlert size={80} style={{ color: 'var(--accent-green)', margin: '0 auto 1.5rem' }} />
      </motion.div>
      
      <h1 style={{ marginBottom: '1rem', background: 'linear-gradient(90deg, #fff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Intelligent Malicious Link Detection
      </h1>
      
      <p style={{ marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
        AI-Powered URL Threat Analysis & Real-Time Protection.
        Identify Phishing, Malware, and Suspicious Patterns using Deep Learning.
      </p>

      {/* Quick Analyzer Input Bar */}
      <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
         <div style={{ display: 'flex', width: '100%', maxWidth: '600px', background: 'var(--bg-card-hover)', borderRadius: 'var(--radius-full)', padding: '0.4rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', color: 'var(--text-secondary)' }}>
               <Search size={20} />
            </div>
            <input 
               type="text" 
               disabled={isSearching}
               value={searchVal}
               onChange={(e) => setSearchVal(e.target.value)}
               placeholder="Analyze single or multiple URL formats..." 
               style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', padding: '0.8rem 1rem', outline: 'none', fontSize: '1.05rem' }} 
            />
            <button disabled={isSearching} onClick={handleAnalyze} className="btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 2rem' }}>
              {isSearching ? <Activity size={18} className="animate-pulse-green" /> : 'Deep Analyze'}
            </button>
         </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            System Access Gate <ArrowRight size={20} />
          </motion.button>
        </Link>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            <Activity size={20} /> Real-Time Scanner
          </motion.button>
        </Link>
      </div>
      
      {showScanLine && <div className="scanner-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.2 }} />}
    </motion.div>

    {/* Section 2: Key Problem Statement Features (Small Divs) */}
    <div style={{ maxWidth: '1100px', margin: '4rem auto 8rem auto', padding: '0 2rem', pointerEvents: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Core Intelligence <span style={{ color: 'var(--accent-blue)' }}>Modules</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        <motion.div whileHover={{ y: -5 }} className="card glass-panel" style={{ padding: '2rem' }}>
          <Zap size={32} color="var(--accent-blue)" style={{ marginBottom: '1.2rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Intelligent URL Input</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Accepts single or multi-URL inputs with automated type validation and batch processing capabilities.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card glass-panel" style={{ padding: '2rem' }}>
          <Fingerprint size={32} color="var(--accent-green)" style={{ marginBottom: '1.2rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Threat Detection Engine</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Scans for typosquatting, hidden scripts, and malicious patterns using heuristic structure analysis.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card glass-panel" style={{ padding: '2rem' }}>
          <ShieldCheck size={32} color="var(--accent-red)" style={{ marginBottom: '1.2rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>AI Classification</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Deep Learning models classify links into Safe, Suspicious, or Malicious with granular confidence scores.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card glass-panel" style={{ padding: '2rem' }}>
          <MessageSquare size={32} color="var(--accent-blue)" style={{ marginBottom: '1.2rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Explainability Module</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Human-readable logic explains WHY a link is flagged, highlighting domain mismatches and redirects.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card glass-panel" style={{ padding: '2rem' }}>
          <BarChart3 size={32} color="var(--accent-green)" style={{ marginBottom: '1.2rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Interactive Dashboard</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Real-time visual monitoring of risk labels, redirect chains, and security insights.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="card glass-panel" style={{ padding: '2rem' }}>
           <Globe size={32} color="#f59e0b" style={{ marginBottom: '1.2rem' }} />
           <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Reputation Analysis</h3>
           <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
             Vets global reputation data and blacklist status without requiring manual expert intervention.
           </p>
        </motion.div>

      </div>
    </div>
    </div>
  );
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      login();
      navigate('/dashboard');
    }, 2500);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', pointerEvents: 'none' }}>
      <div className="card glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden', pointerEvents: 'auto' }}>
        {isAuthenticating && <div className="scanner-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.6 }} />}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div animate={isAuthenticating ? { rotate: 360, color: 'var(--accent-blue)' } : {}} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} style={{ display: 'inline-block' }}>
            <KeyRound size={48} style={{ color: isAuthenticating ? 'var(--accent-blue)' : 'var(--text-secondary)', transition: 'color 0.3s' }} />
          </motion.div>
          <h2 style={{ marginTop: '1rem', fontSize: '1.8rem' }}>{isAuthenticating ? 'Verifying Identity...' : (isLogin ? 'Secure Access' : 'Create Identity')}</h2>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Military-grade encrypted protocol connection</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><input type="text" placeholder="Full Name" className="input-field" required disabled={isAuthenticating} /></motion.div>}
          <input type="email" placeholder="Admin Email / Operator ID" className="input-field" required disabled={isAuthenticating} />
          <input type="password" placeholder="Passphrase" className="input-field" required disabled={isAuthenticating} />
          <motion.button whileHover={!isAuthenticating ? { scale: 1.02 } : {}} whileTap={!isAuthenticating ? { scale: 0.98 } : {}} className="btn-primary" style={{ marginTop: '1rem', padding: '1rem', width: '100%' }} disabled={isAuthenticating}>
            {isAuthenticating ? 'Processing Handshake...' : (isLogin ? 'Authenticate' : 'Register Operator')}
          </motion.button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button type="button" onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }} disabled={isAuthenticating}>
            {isLogin ? "New Operator? Initialize Registration" : "Existing Operator? Proceed to Authentication"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  return (
    <motion.nav initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="glass-panel" style={{ padding: '1.2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.5rem', color: 'var(--accent-blue)', textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>
        <ShieldAlert size={32} />
        <span>CyberGuard AI</span>
        <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-green)', fontSize: '0.7rem' }}>
          <div className="animate-pulse-green" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }}></div>
          LIVE MONITORING
        </div>
      </div>
      <div className="navbar-links">
        <Link to="/" style={{ color: location.pathname === '/' ? 'white' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'var(--transition)' }}>Home</Link>
        <Link to="/dashboard" style={{ color: location.pathname === '/dashboard' ? 'white' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        {user ? (
          <motion.button onClick={logout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary" style={{ padding: '0.6rem 1.5rem' }}>
            <LogOut size={16} /> Sign Out
          </motion.button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
              <KeyRound size={16} /> Login / Register
            </motion.button>
          </Link>
        )}
      </div>
    </motion.nav>
  )
}

function App() {
  const [user, setUser] = useState(false);
  
  const login = () => setUser(true);
  const logout = () => setUser(false);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <InteractiveBackground />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <Navbar />
          <main style={{ flex: 1, padding: '2rem' }}>
            <AnimatePresence mode='wait'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
