"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: "red" | "green" | "blue" | "purple" | "orange" | "cyan";
  progress?: number;
}

const colorMap = {
  red: "from-red-500 to-red-700",
  green: "from-emerald-500 to-emerald-700",
  blue: "from-blue-500 to-blue-700",
  purple: "from-purple-500 to-purple-700",
  orange: "from-orange-500 to-orange-700",
  cyan: "from-cyan-500 to-cyan-700",
};

const bgColorMap = {
  red: "bg-red-500/10 border-red-500/20",
  green: "bg-emerald-500/10 border-emerald-500/20",
  blue: "bg-blue-500/10 border-blue-500/20",
  purple: "bg-purple-500/10 border-purple-500/20",
  orange: "bg-orange-500/10 border-orange-500/20",
  cyan: "bg-cyan-500/10 border-cyan-500/20",
};

const progressColorMap = {
  red: "bg-red-500",
  green: "bg-emerald-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  cyan: "bg-cyan-500",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color,
  progress,
}: StatsCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${bgColorMap[color]} p-5 backdrop-blur-sm transition-all hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p
            className={`mt-1 text-3xl font-bold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent`}
          >
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      {progress !== undefined && (
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-800">
            <div
              className={`h-2 rounded-full ${progressColorMap[color]} transition-all duration-500`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-gray-500">
            {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
}
