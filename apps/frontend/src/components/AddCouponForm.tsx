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
  const [SiteLink, setSiteLink] = useState('')
  const [likes, setLikes] = useState('')
  const [dislikes, setDislikes] = useState('')
  
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
    try {
      const response = await axios.post("http://localhost:3000/api/v1/MyCoupon/MyNewCoupon",
      { Name,
        Description,
        RedeemCode,
        Platform,
        SiteLink,
        likes,
        dislikes,
        },{
          headers:{
            'authorization': `Bearer ${userData.Token}`,
          }
        })
      
      console.log({ Name, Description, RedeemCode, Platform, SiteLink, likes, dislikes });    
      const CouponCode = localStorage.setItem('couponId',JSON.stringify((response.data)))
      console.log(CouponCode);  
      // Reset form
      setName('')
      setDescription('')
      setRedeemCode('')
      setPlatform('')
      setSiteLink('')
      setLikes('')
      setDislikes('')
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
        <label htmlFor="SiteLink" className="block text-sm font-medium text-text">SiteLink</label>
        <input
          type="url"
          id="SiteLink"
          value={SiteLink}
          onChange={(e) => setSiteLink(e.target.value)}
          required
          placeholder="https://example.com"
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
      <div className='flex gap-6 mt-1 w-11 h-11 rounded-md shadow-sm cursor-auto'>
        <label htmlFor="likes" className="text-sm font-medium text-text">Likes</label>
        <input
          type="text"
          id="likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
          required
        />
        <label htmlFor="dislikes" className="text-sm font-medium text-text">Dislikes</label>
        <input
          type="text"
          id="dislikes"
          value={dislikes}
          onChange={(e) => setDislikes(e.target.value)}
          required
          />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
        Add Coupon
      </button>
    </form>
  )
}

 