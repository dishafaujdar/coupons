import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AddCoupon from './pages/AddCoupon'

function App() {
  return (
    <>
      <div className="text-red-500 bg-gray-100 p-4">
          Hello, Tailwind CSS!
        </div>
    <Router>
      <div className="min-h-screen bg-background">
      <Header />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-coupon" element={<AddCoupon />} />
          </Routes>
        </main>
      </div>
    </Router>
    </>
  )
}
export default App