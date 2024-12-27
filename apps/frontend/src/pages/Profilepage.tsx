import { User, Lock, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  username: string;
  password: string;
  userRole: "Seller" | "Buyer";
  couponsCount: number;
  userId: string; //signin
  Token: string;
}

interface Coupon {
  id: string;
  Name: string;
  Description: string;
  Platform: "GooglePay" | "PhonePe";
  likes: number;
  dislikes: number;
  RedeemCode: string;
  SiteLink: string;
  ImageUrl: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (!parsedData || !parsedData.Token) {
      console.error("No user token found. Please log in.");
      return;
    }

    setUserData(parsedData);
  }, []);

  useEffect(() => {
    if (userData && userData.Token && userData.userId) {
      const fetchCoupons = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/MyCoupon/${userData.userId}`,
            {
              headers: {
                Authorization: `Bearer ${userData.Token}`,
              },
            }
          );
          setCoupons(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching coupons:", error);
        }
      };
      fetchCoupons();
    }
  }, [userData]);

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
                    <p className="text-sm text-gray-500">userRole</p>
                    <p className="font-medium">{userData.userRole}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-xs">
                    #
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {userData.userRole === "Seller"
                        ? "Coupons Sold"
                        : "Coupons Bought"}
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
              {userData?.userRole === "Seller"
                ? "Your Listed Coupons"
                : "Your Purchased Coupons"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <li key={coupon.id}>
                    <h3>{coupon.Name}</h3>
                    <p>{coupon.Description}</p>
                    <p>Platform: {coupon.Platform}</p>
                    <p>Likes: {coupon.likes}</p>
                    <p>Dislikes: {coupon.dislikes}</p>
                    <p>Redeem Code: {coupon.RedeemCode}</p>
                    <a
                      href={coupon.SiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      >
                      Visit Site
                    </a>
                    {coupon.ImageUrl && <img src={coupon.ImageUrl} alt={coupon.Name} />}
                  </li>
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