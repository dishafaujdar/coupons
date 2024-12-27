import CouponDetails from "../pages/Detail";
import CopyIcon from "./functionShare/CopyIcon";
import { useState } from "react";
import { ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { useCoupons } from "./functionShare/MockCoupons";

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

  const openPage = () => setispageOpen(true);
  const closePage = () => setispageOpen(false);

  return (
    <div
      className="bg-white shadow-sm rounded-lg p-6 m-2 w-auto hover:shadow-md transition-shadow duration-300 border-l-4 border-accent cursor-pointer "
      onClick={openPage}
    >
      {coupons.length === 0 ? (
        <p>No coupons available at the moment.</p>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-primary mb-2">{Name}</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <ThumbsUp className="text-primary mr-1" />
                <span>{likes}</span>
              </div>
              <div className="flex items-center">
                <ThumbsDown className="text-primary mr-1" />
                <span>{dislikes}</span>
              </div>
            </div>
          </div>
          <p className="text-text mb-4">{Description}</p>
          <div className="flex justify-between items-center gap-1 ">
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
      <div>
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
    </div>
  );
}