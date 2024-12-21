import { User, Lock, Tag, } from 'lucide-react';
import CouponCard from '../components/CouponCard';

interface UserInfo {
  username: string;
  password: string
  role: 'Seller' | 'Buyer';
  couponsCount: number;
}

interface Coupon {
  id: string;
  title: string;
  description: string;
  platform: 'Google Pay' | 'PhonePe';  //add in db
  CouponCode: string;
}

const mockUserInfo: UserInfo = {
  username: 'JohnDoe',
  password: '@8989',
  role: 'Seller',
  couponsCount: 5,
};

const mockCoupons: Coupon[] = [
  { id: '1', title: '20% off on groceries', description: 'Valid for 30 days', platform: 'Google Pay' , CouponCode:'jnsckn' },
  { id: '2', title: '₹50 cashback on recharge', description: 'Min recharge ₹200',  platform: 'PhonePe' , CouponCode:'jnsckn' },
  { id: '3', title: 'Free movie ticket', description: 'Valid for weekdays only',  platform: 'Google Pay' , CouponCode:'jnsckn' },
];

export default function ProfilePage() {

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || "");
  console.log(userInfo);
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-5xl w-full max-h-[90vh] overflow-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">User Profile</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side: User Info */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="flex items-center space-x-4">
              <User className="text-primary" />
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{userInfo?.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Lock className="text-primary" />
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="font-medium">{userInfo?.password}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tag className="text-primary" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{userInfo?.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-xs">
                #
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {mockUserInfo.role === 'Seller' ? 'Coupons Sold' : 'Coupons Bought'}
                </p>
                <p className="font-medium">{mockUserInfo.couponsCount}</p>
              </div>
            </div>
          </div>

          {/* Right side: User's Coupons */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {mockUserInfo.role === 'Seller' ? 'Your Listed Coupons' : 'Your Purchased Coupons'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  id={coupon.id}
                  title={coupon.title}
                  description={coupon.description}
                  platform={coupon.platform}
                  couponCode={coupon.CouponCode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

