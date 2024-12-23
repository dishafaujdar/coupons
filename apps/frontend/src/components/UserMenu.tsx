import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

interface UserInfo {
  username: string;
}

const Icons = [
  '../../public/cat.png',
  '../../public/img1.jpg',
  '../../public/img2.jpg'
]

export default function UserMenu() {

  const [isOpen, setIsOpen] = useState(false);
  const [userData , setUserData] = useState<UserInfo | null>(null);

  useEffect(()=>{
    const storedData = localStorage.getItem('userData');
    const parsedData = storedData ? JSON.parse(storedData) : null;
    if(parsedData){
      setUserData(parsedData)
    }
  },[])

  const [iconimg, setIcoimg] = useState('');

  useEffect(() => {
    setIcoimg(getRandIcon());
  }, []);

  function getRandIcon() {
    const randomIndex = Math.floor(Math.random() * Icons.length);
    return Icons[randomIndex];
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={iconimg}
          alt="User avatar"
          className="w-8 h-8 rounded-full border-2 border-secondary"
        />
        {userData ? (
          <>
          <span className="text-sm font-medium text-text">{userData.username}</span>
          <ChevronDown className="w-4 h-4 text-secondary" />
          </>
          ) : (
            <>
            <span className="text-sm font-medium text-text">Guest</span>
            <ChevronDown className="w-4 h-4 text-secondary" />
            </>
          )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <Link to="/profile" className="block px-4 py-2 text-sm text-text hover:bg-background hover:text-primary">Profile</Link>
          <a href="/signout" className="block px-4 py-2 text-sm text-text hover:bg-background hover:text-primary">Sign out</a>
        </div>
      )}
    </div>
  )
}

