interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "brand" | "warning";
}

const variantAccent: Record<string, string> = {
  default: "border-t-stone-200",
  brand: "border-t-brand-400",
  warning: "border-t-amber-400",
};

const variantText: Record<string, string> = {
  default: "text-stone-800",
  brand: "text-brand-600",
  warning: "text-amber-600",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  variant = "default",
}: StatsCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-6 border-t-2 ${variantAccent[variant]}`}
    >
      <p className={`text-3xl font-semibold ${variantText[variant]}`}>
        {value}
      </p>
      <p className="text-sm text-stone-500 mt-1">{title}</p>
      {subtitle && (
        <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
