import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Coupon Exchange</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/add-coupon" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90 transition-colors duration-200">
              Add Coupon
            </Link>
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}

