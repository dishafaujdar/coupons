import CouponDetails from "../pages/Detail";
import CopyIcon from "./functionShare/CopyIcon";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { useCoupons } from "./functionShare/MockCoupons";
import axios from "axios";

interface CouponCardProps {
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

interface userData {
  userId: string;
  Token: string;
}

export default function CouponCard({
  id,
  Name,
  Description,
  Platform,
  likes,
  dislikes,
  RedeemCode,
  SiteLink,
  ImageUrl,
}: CouponCardProps) {
  const { coupons } = useCoupons(); 
  const [isPageOpen, setispageOpen] = useState(false);
  const [userData, setUserData] = useState<userData | null>(null);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);

  const openPage = () => setispageOpen(true);
  const closePage = () => setispageOpen(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLike = async () => {
    if (!userData) {
      console.log("User not logged in");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/GetCoupons/upvote",
        { couponId: id, userId: userData.userId },
        { headers: { authorization: `Bearer ${userData.Token}` } }
      );

      setLike(true);
      setDislike(false);
      setLikes((prev) => prev + 1);
      if (dislike) setDislikes((prev) => prev - 1);
    } catch (error) {
      console.error("Error liking coupon:", error);
    }
  };

  const handleDislike = async () => {
    if (!userData) {
      console.log("User not logged in");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/GetCoupons/downvote",
        { couponId: id, userId: userData.userId },
        { headers: { authorization: `Bearer ${userData.Token}` } }
      );

      setDislike(true);
      setLike(false);
      setDislikes((prev) => prev + 1);
      if (like) setLikes((prev) => prev - 1);
    } catch (error) {
      console.error("Error disliking coupon:", error);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 m-2 w-auto hover:shadow-md transition-shadow duration-300 border-l-4 border-accent cursor-pointer">
      {coupons.length === 0 ? (
        <p>No coupons available at the moment.</p>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3
              className="text-lg font-semibold text-primary mb-2 cursor-pointer"
              onClick={openPage}
            >
              {Name}
            </h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div
                  className={`text-primary mr-2 cursor-pointer transition-transform duration-300 ${
                    like ? "scale-125 text-blue-600" : "scale-100"
                  }`}
                  onClick={handleLike}
                  aria-label="Like"
                >
                  <ThumbsUp />
                </div>
                <span className="text-primary transition-all duration-300">{Likes}</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`text-primary mr-2 cursor-pointer transition-transform duration-300 ${
                    dislike ? "scale-125 text-red-600" : "scale-100"
                  }`}
                  onClick={handleDislike}
                  aria-label="Dislike"
                >
                  <ThumbsDown />
                </div>
                <span className="text-primary transition-all duration-300">{Dislikes}</span>
              </div>
            </div>
          </div>
          <p className="text-text mb-4">{Description}</p>
          <div className="flex justify-between items-center gap-1">
            <span className="text-sm text-secondary">
              <CopyIcon textToCopy={RedeemCode} />
            </span>
            <span className="text-sm text-secondary">{Platform}</span>
            <a
              href={SiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              Visit site to redeem <ExternalLink className="ml-1" size={16} />
            </a>
          </div>
        </>
      )}
      {isPageOpen && (
        <CouponDetails
          closePage={closePage}
          coupon={{
            id,
            Name,
            Description,
            Platform,
            likes,
            dislikes,
            RedeemCode,
            SiteLink,
            ImageUrl,
          }}
        />
      )}
    </div>
  );
}
