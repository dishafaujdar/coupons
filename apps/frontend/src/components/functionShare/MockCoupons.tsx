import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  username: string;
  password: string;
  userRole: "Seller" | "Buyer";
  couponsCount: number;
  userId: string;
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

export const useCoupons = () => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (!parsedData || !parsedData.Token) {
      setError("No user token found. Please log in.");
      return;
    }

    setUserData(parsedData);
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (userData && userData.Token) {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`http://localhost:3000/api/v1/Coupon/${userData.userId}`);
          setCoupons(response.data);
        } catch (error) {
          console.error("Error fetching coupons:", error);
          setError("Failed to fetch coupons.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoupons();
  }, [userData]);

  return { coupons, loading, error };
};