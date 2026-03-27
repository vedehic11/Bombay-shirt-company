import { Globe, Package, Shield, Star } from 'lucide-react';

const stats = [
  {
    icon: Globe,
    value: '150+',
    label: 'Countries Shipped'
  },
  {
    icon: Package,
    value: '2M+',
    label: 'Orders Delivered'
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Fit Guarantee'
  },
  {
    icon: Star,
    value: '4.8',
    label: 'Customer Rating'
  }
];

export default function Stats() {
  return (
    <div className="relative z-20 bg-[#ddd5ca] text-[#4f5b44] py-12 border-y border-[#cfc5b8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon size={32} className="text-[#5f6853]" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-[#6a745f] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
