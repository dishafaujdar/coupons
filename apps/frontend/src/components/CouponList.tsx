import CouponCard from './CouponCard'

const coupons = [
  { id: 1, title: '20% off on groceries', description: 'Valid for 30 days', value: 100, platform: 'Google Pay' },
  { id: 2, title: '₹50 cashback on recharge', description: 'Min recharge ₹200', value: 50, platform: 'PhonePe' },
  { id: 3, title: 'Free movie ticket', description: 'Valid for weekdays only', value: 200, platform: 'Google Pay' },
]

export default function CouponList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          title={coupon.title}
          description={coupon.description}
          value={coupon.value}
          platform={coupon.platform as 'Google Pay' | 'PhonePe'}
        />
      ))}
    </div>
  )
}

