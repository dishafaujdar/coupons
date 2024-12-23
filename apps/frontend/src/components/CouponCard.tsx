import CouponDetails from "../pages/Detail";
import CopyIcon from "./functionShare/CopyIcon"
import { useState } from "react";

interface CouponCardProps {
  id: string
  Name: string
  Description: string
  Platform: 'GooglePay' | 'PhonePe'
  CouponCode: string 
}

export default function CouponCard({ Name, Description, Platform, CouponCode}: CouponCardProps) {


  const [isPageOpen , setispageOpen] = useState(false);

  const openPage = () => setispageOpen(true);
  const closePage = () => setispageOpen(false)

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-accent cursor-pointer" onClick={openPage}>
      <h3 className="text-lg font-semibold text-primary mb-2">{Name}</h3>
      <p className="text-text mb-4">{Description}</p>
      <div className="flex justify-between items-center">
      <span className="text-sm text-secondary">
      <CopyIcon textToCopy={CouponCode}/>
      </span>
      <span className="text-sm text-secondary">{Platform}</span>
      </div>
      <div>
        {isPageOpen && <CouponDetails closePage={closePage}/>}
      </div>
    </div>
  )
}

