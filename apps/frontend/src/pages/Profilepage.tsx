import { User, Lock, Tag } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserInfo {
  username: string;
  password: string;
  role: 'Seller' | 'Buyer';
  couponsCount: number;
  userId: string   //signin
}

interface Coupon {
  id: string;
  title: string;
  description: string;
  Platform: 'GooglePay' | 'PhonePe';
  couponCode: string;
}

 export default function ProfilePage() {
  const [userData, setUserData] = useState<UserInfo | null>(null); // Use proper typing
  const [coupons, setCoupons] = useState<Coupon[]>([]); // State for coupons

  useEffect(() => {
    // Fetch user info from localStorage
    const storedData = localStorage.getItem('userData');
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (parsedData) {
      setUserData(parsedData); // Set user data
      // Mock fetching coupons dynamically based on role
      if (parsedData.role === 'Seller') {
        setCoupons([
          { id: '1', title: '20% off on groceries', description: 'Valid for 30 days', Platform: 'GooglePay', couponCode: 'GROC20' },
          { id: '2', title: '₹50 cashback on recharge', description: 'Min recharge ₹200', Platform: 'PhonePe', couponCode: 'RCASH50' },
        ]);
      } else {
        setCoupons([
          { id: '3', title: 'Free movie ticket', description: 'Valid for weekdays only', Platform: 'GooglePay', couponCode: 'MOVIEFREE' },
        ]);
      }
    }
  }, []);

  const response = axios.get("http://localhost:3000/api/v1/MyCoupon/userid",{
    headers:{
      'Authorization': `Bearer ${userData?.userId}`,
    }
  });
  console.log(response);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-5xl w-full max-h-[90vh] overflow-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">User Profile</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side: User Info */}
          <div className="w-full md:w-1/3 space-y-6">
            {userData ? (
              <>
                <div className="flex items-center space-x-4">
                  <User className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{userData.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <User className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">UserId</p>
                    <p className="font-medium">{userData.userId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Lock className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Password</p>
                    <p className="font-medium">{userData.password}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Tag className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">{userData.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-xs">
                    #
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {userData.role === 'Seller' ? 'Coupons Sold' : 'Coupons Bought'}
                    </p>
                    <p className="font-medium">{userData.couponsCount}</p>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>

          {/* Right side: User's Coupons */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {userData?.role === 'Seller' ? 'Your Listed Coupons' : 'Your Purchased Coupons'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    id={coupon.id}
                    Name={coupon.title}
                    Description={coupon.description}
                    Platform={coupon.Platform}
                    CouponCode={coupon.couponCode}
                  />
                ))
              ) : (
                <p>No coupons available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}