import AddCouponForm from '../components/AddCouponForm'

export default function AddCoupon() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Add New Coupon</h1>
      <div className="bg-white shadow-sm rounded-lg p-6 border-t-4 border-accent">
        <AddCouponForm />
      </div>
    </div>
  )
}

