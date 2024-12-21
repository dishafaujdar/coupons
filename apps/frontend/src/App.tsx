import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddCoupon from './pages/AddCoupon';
import Footer from './components/Footer';
import ProfilePage from './pages/Profilepage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LandingPage from './pages/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/Home" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/add-coupon" element={<AddCoupon />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
              </>
            )}
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
