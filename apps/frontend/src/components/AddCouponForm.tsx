import { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";


export default function AddCouponForm() {
  const [Name, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [CouponCode, setCouponCode] = useState('')
  const [platform, setPlatform] = useState('Google Pay')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwt_decode(token);
      const userId = decoded?.UserId; 
      console.log("Extracted UserId:", userId);
    }
    const response = await axios.post("http://localhost:3000/api/v1/MyCoupon/MyNewCoupon",{Name,Description,CouponCode})
    console.log({ Name, Description, CouponCode })

    // Reset form
    setTitle('')
    setDescription('')
    setCouponCode('')
    setPlatform('Google Pay')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text">Title</label>
        <input
          type="text"
          id="title"
          value={Name}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text">Description</label>
        <textarea
          id="description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-text">Platform</label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="Google Pay">Google Pay</option>
          <option value="PhonePe">PhonePe</option>
        </select>
      </div>
      <div>
        <label htmlFor="Couponcode" className="block text-sm font-medium text-text">Coupon Code</label>
        <input
          type="text"
          id="Code"
          value={CouponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
        Add Coupon
      </button>
    </form>
  )
}

 