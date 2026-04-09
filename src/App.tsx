import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import LearnDetail from './pages/LearnDetail';
import Rights from './pages/Rights';
import DiverseCorner from './pages/DiverseCorner';
import Myths from './pages/Myths';
import Support from './pages/Support';
import Guides from './pages/Guides';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* App Routes with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/learn" element={<Layout><Learn /></Layout>} />
          <Route path="/learn/:id" element={<Layout><LearnDetail /></Layout>} />
          <Route path="/rights" element={<Layout><Rights /></Layout>} />
          <Route path="/diverse" element={<Layout><DiverseCorner /></Layout>} />
          <Route path="/myths" element={<Layout><Myths /></Layout>} />
          <Route path="/support" element={<Layout><Support /></Layout>} />
          <Route path="/guides" element={<Layout><Guides /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AccessibilityProvider>
  );
};

export default App;
