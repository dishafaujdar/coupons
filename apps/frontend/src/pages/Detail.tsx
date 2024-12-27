import { useState } from "react";
import { ThumbsUp, ThumbsDown, Copy, ExternalLink, X } from "lucide-react";
import { useCoupons } from "../components/functionShare/MockCoupons";

interface CouponDetailsProps {
  // In a real app, you'd fetch this data based on the ID
  coupon : {
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
  closePage: () => void; // Prop to close the modal
}


export default function CouponDetails({ coupon, closePage }: CouponDetailsProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const { coupons} = useCoupons();

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.RedeemCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePage}
          className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        >
          <X size={20} />
        </button>
        {coupons.length === 0 ? (
          <p>No coupon found</p>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">
              {coupon.Name}
            </h1>
            <img
              src={coupon.ImageUrl}
              alt={coupon.Name}
              className="w-full h-48 object-cover rounded-md mb-4 shadow-xl"
            />
            <p className="text-gray-700 mb-4">{coupon.Description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-secondary">{coupon.Platform}</span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <ThumbsUp className="text-primary mr-1" />
                <span>{coupon.likes}</span>
              </div>
              <div className="flex items-center">
                <ThumbsDown className="text-primary mr-1" />
                <span>{coupon.dislikes}</span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-md mb-4 flex items-center justify-between">
              <span className="font-mono text-lg">{coupon.RedeemCode}</span>
              <button
                onClick={handleCopy}
                className="bg-primary text-white px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors duration-200 flex items-center"
              >
                <Copy className="mr-1" size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <a
              href={coupon.SiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              Visit site to redeem <ExternalLink className="ml-1" size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}