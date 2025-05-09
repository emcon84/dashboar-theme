import { motion } from "framer-motion";
import type { ReactNode } from "react";
import CountUp from "react-countup";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface Props {
  title: string;
  value: number;
  percentage: number;
  icon?: ReactNode;
  chartData: { value: number }[];
}

export const StatsCard = ({
  title,
  value,
  percentage,
  icon,
  chartData,
}: Props) => {
  const isPositive = percentage >= 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 p-4 rounded shadow flex flex-col justify-between"
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {title}
          </h3>
          <div className="text-2xl font-bold text-gray-800 dark:text-white flex items-center space-x-2">
            {icon}
            <CountUp end={value} duration={2} separator="," />
          </div>
        </div>
        <span
          className={`text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {percentage}%
        </span>
      </div>
      <div className="h-16 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#16a34a" : "#dc2626"}
              fill={isPositive ? "#86efac" : "#fca5a5"}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
