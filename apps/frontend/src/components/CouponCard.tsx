interface CouponCardProps {
  title: string
  description: string
  value: number
  platform: 'Google Pay' | 'PhonePe'
}

export default function CouponCard({ title, description, value, platform }: CouponCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-accent">
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-text mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-accent font-bold">₹{value}</span>
        <span className="text-sm text-secondary">{platform}</span>
      </div>
    </div>
  )
}

