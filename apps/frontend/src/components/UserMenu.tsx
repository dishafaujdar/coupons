import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src="/placeholder.svg?height=32&width=32"
          alt="User avatar"
          className="w-8 h-8 rounded-full border-2 border-secondary"
        />
        <span className="text-sm font-medium text-text">John Doe</span>
        <ChevronDown className="w-4 h-4 text-secondary" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-background hover:text-primary">Profile</a>
          <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-background hover:text-primary">My Coupons</a>
          <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-background hover:text-primary">Settings</a>
          <a href="#" className="block px-4 py-2 text-sm text-text hover:bg-background hover:text-primary">Sign out</a>
        </div>
      )}
    </div>
  )
}

