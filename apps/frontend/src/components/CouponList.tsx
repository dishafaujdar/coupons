import CouponCard from "./CouponCard";
import { useCoupons } from "./functionShare/MockCoupons";

// interface CouponDetailsProps {
//   coupon: {
//     id: string;
//     Name: string;
//     Description: string;
//     Platform: "GooglePay" | "PhonePe";
//     likes: number;
//     dislikes: number;
//     RedeemCode: string;
//     SiteLink: string;
//     ImageUrl: string;
//   };
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export default function CouponList() {
  const { coupons, loading, error } = useCoupons();

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {Array.isArray(coupons) && coupons.length === 0 ? (
        <p>No coupons available at the moment.</p>
      ) : Array.isArray(coupons) ? (
        <ul>
          {coupons.map((coupon) => (
            <li key={coupon.id}>
              <CouponCard
                id={coupon.id}
                Name={coupon.Name}
                Description={coupon.Description}
                Platform={coupon.Platform}
                likes={coupon.likes}
                dislikes={coupon.dislikes}
                RedeemCode={coupon.RedeemCode}
                SiteLink={coupon.SiteLink}
                ImageUrl={coupon.ImageUrl}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No coupons available at the moment.</p>
      )}
    </div>
  );
}