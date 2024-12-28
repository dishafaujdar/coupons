import { User, Lock, Tag } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  username: string;
  password: string;
  userRole: "Seller" | "Buyer";
  couponsCount: number;
  RedeemCode: string
  userId: string; //signin
  Token: string;
  couponId: string;

}

interface Coupon {
  id: string;
  Name: string;
  Description: string;
  platform: "GooglePay" | "PhonePe";
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
          setCoupons(response.data.showCoupons);
          console.log(response.data.showCoupons);
        } catch (error) {
          console.error("Error fetching coupons:", error);
        }
      };
      fetchCoupons();
    }
  }, [userData]);

  //set the api object carefully
  async function handelDelete() {
    const GetCouponId = localStorage.getItem("couponId");
    console.log("Raw couponId from localStorage:", GetCouponId);
    const parsedId = GetCouponId ? JSON.parse(GetCouponId) : null;
    console.log("Parsed couponId:", parsedId);
  
    if(parsedId && userData?.Token){            
      const response = await axios.delete(`http://localhost:3000/api/v1/MyCoupon/${parsedId}`,{
        headers:{
          "Authorization": `Bearer ${userData.Token}`
        }
      })
      console.log(response.data.couponId);
    }
    else{
      console.log("CouponID || Token incorrect");
      
    }
  }

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
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="relative border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <div className="absolute top-4 right-4 flex space-x-4">
                    <button
                      onClick={()=>handelDelete()}
                      className="text-gray-500 hover:text-red-500"
                      title="Delete Coupon"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button> 
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      {coupon.Name.toUpperCase()}
                      
                    </h3>
                    <p className="text-gray-600 mb-2 text-xl">
                      {coupon.Description}
                    </p>
                    <p className="text-xl text-gray-500 mb-1">
                      <strong>Platform:</strong> {coupon.platform}
                    </p>
                    <p className="text-xl text-gray-500 mb-2">
                      <strong>Redeem Code:</strong> {coupon.RedeemCode}
                    </p>
                    {coupon.SiteLink && (
                      <a
                        href={coupon.SiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline mb-2 block"
                      >
                        Visit Site
                      </a>
                    )}
                    {coupon.ImageUrl && (
                      <img
                        src={coupon.ImageUrl}
                        alt={coupon.Name}
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No coupons available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
