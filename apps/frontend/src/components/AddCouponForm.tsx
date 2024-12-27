import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData{
  Token : string   //signin
  userId: string
}

export default function AddCouponForm() {
  const [Name, setName] = useState('')
  const [Description, setDescription] = useState('')
  const [RedeemCode, setRedeemCode] = useState('')
  const [Platform, setPlatform] = useState('')
  const [userData , setUserData] = useState<UserData | null>(null)

  useEffect(()=>{
    const Token = localStorage.getItem("userData")
    const pareseToken = Token ? JSON.parse(Token) : null;
    setUserData(pareseToken)  
    console.log(pareseToken);
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  

    if (!userData || !userData.Token) {
      console.error("No user token found. Please log in.");
      return;
    }
    // Here you would typically send the data to your backend
    try {
      const response = await axios.post("http://localhost:3000/api/v1/MyCoupon/MyNewCoupon",
      { Name,
        Description,
        RedeemCode,
        Platform,
        },{
          headers:{
            'authorization': `Bearer ${userData.Token}`,
          }
        })
      
      console.log({ Name, Description, RedeemCode, Platform })
      console.log(response.data);
  
      // Reset form
      setName('')
      setDescription('')
      setRedeemCode('')
      setPlatform('')
    } catch (error) {
      console.error("Error while submitting the form:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text">Title</label>
        <input
          type="text"
          id="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md shadow-sm cursor-auto"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text">Description</label>
        <textarea
          id="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="Platform" className="block text-sm font-medium text-text">Platform</label>
        <input
          type="text"
          id="Platform"
          value={Platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
          className="mt-1 block w-full rounded-md shadow-sm cursor-auto"
        />
      </div>
      <div>
        <label htmlFor="Couponcode" className="block text-sm font-medium text-text">Redeem Code</label>
        <input
          type="text"
          id="Code"
          value={RedeemCode}
          onChange={(e) => setRedeemCode(e.target.value)}
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

 