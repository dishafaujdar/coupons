import { useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Copy, ExternalLink, X } from "lucide-react";

interface CouponDetailsProps {
  // In a real app, you'd fetch this data based on the ID
  coupon: {
    id: string;
    title: string;
    description: string;
    platform: "GooglePay" | "PhonePe";
    likes: number;
    dislikes: number;
    redeemCode: string;
    siteLink: string;
    imageUrl: string;
  };
  closePage: () => void; // Prop to close the modal
}

export default function CouponDetails({ closePage }: CouponDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  // Mock data for demonstration
  const coupon = {
    id: id || "1",
    title: "20% off on groceries",
    description:
      "Get 20% off on your next grocery purchase. Valid for 30 days from the date of issue.",
    platform: "Google Pay" as const,
    likes: 150,
    dislikes: 10,
    redeemCode: "GROCERY20",
    siteLink: "https://example.com/redeem",
    imageUrl: "/placeholder.svg?height=200&width=400",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.redeemCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 max-w-2xl mx-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={closePage}
      >
        <div
          className="bg-white shadow-sm rounded-lg p-6 max-w-2xl mx-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closePage}
            className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
          >
            <X size={20} />
          </button>
          <h1 className="text-3xl font-bold text-primary mb-4">
            {coupon.title}
          </h1>
          <img
            src={coupon.imageUrl}
            alt={coupon.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <p className="text-text mb-4">{coupon.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-secondary">{coupon.platform}</span>
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
            <span className="font-mono text-lg">{coupon.redeemCode}</span>
            <button
              onClick={handleCopy}
              className="bg-primary text-white px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors duration-200 flex items-center"
            >
              <Copy className="mr-1" size={16} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <a
            href={coupon.siteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center"
          >
            Visit site to redeem <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
