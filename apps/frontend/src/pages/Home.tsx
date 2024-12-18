import CouponList from '../components/CouponList'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Available Coupons</h1>
      <CouponList />
    </div>
  )
}

