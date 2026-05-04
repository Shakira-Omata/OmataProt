import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { BookmarkProvider } from './context/BookmarkContext';
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
import Bookmarks from './pages/Bookmarks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AnonymousChat from './pages/AnonymousChat';
import Confessions from './pages/Confessions';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BookmarkProvider>
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
              <Route path="/bookmarks" element={<Layout><Bookmarks /></Layout>} />
              <Route path="/chat" element={<Layout><AnonymousChat /></Layout>} />
              <Route path="/confessions" element={<Layout><Confessions /></Layout>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AccessibilityProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
};

export default App;
