import { useState } from "react";
import { Copy, ExternalLink, X } from "lucide-react";
import { useCoupons } from "../components/functionShare/MockCoupons";

interface CouponDetailsProps {
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
  closePage: () => void; 
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-lg flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closePage}
            className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
          >
            <X size={20} />
          </button>
          {coupons.length === 0 ? (
            <p className="text-center text-gray-600">No coupon found</p>
          ) : (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-primary mb-4">
                {coupon.Name}
              </h1>
              {coupon.ImageUrl && (
                <img
                  src={coupon.ImageUrl}
                  alt={coupon.Name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              )}
              <p className="text-gray-700 text-lg">{coupon.Description}</p>
              <div className="flex justify-between items-center text-gray-600">
                <span className="font-semibold">Platform:</span>
                <span>{coupon.Platform}</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner flex justify-between items-center">
                <span className="font-mono text-lg">{coupon.RedeemCode}</span>
                <button
                  onClick={handleCopy}
                  className="bg-primary text-white px-3 py-1 rounded-md hover:bg-opacity-90 flex items-center"
                >
                  <Copy className="mr-1" size={16} />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              {coupon.SiteLink && (
                <a
                  href={coupon.SiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Visit site to redeem <ExternalLink className="ml-1" size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}