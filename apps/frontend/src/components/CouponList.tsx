import CouponCard from './CouponCard'

const coupons = [
  { id: 1, title: '20% off on groceries', description: 'Valid for 30 days', platform: 'Google Pay' , couponCode: 'MKOOPL@22' },
  { id: 2, title: '₹50 cashback on recharge', description: 'Min recharge ₹200', platform: 'PhonePe', couponCode: 'MKOIKDS99' },
  { id: 3, title: 'Free movie ticket', description: 'Valid for weekdays only', platform: 'Google Pay',couponCode: 'MKOOO9@22' },
  { id: 4, title: '15% off on food delivery', description: 'Valid for first order', platform: 'PhonePe',couponCode: 'MK!23PL@22' },
]

interface CouponListProps {
  platform?: 'Google Pay' | 'PhonePe'
}

export default function CouponList({ platform }: CouponListProps) {
  const filteredCoupons = platform
    ? coupons.filter(coupon => coupon.platform === platform)
    : coupons

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCoupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          title={coupon.title}
          description={coupon.description}
          platform={coupon.platform as 'Google Pay' | 'PhonePe'}
          couponCode={coupon.couponCode}
        />
      ))}
    </div>
  )
}

