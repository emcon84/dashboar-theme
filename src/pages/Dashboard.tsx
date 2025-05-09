import { motion } from "framer-motion";
import { StatsCard } from "../components/StatsCard";
import { FaMoneyBillWave, FaUsers, FaShoppingCart } from "react-icons/fa";

const chartExampleData = [
  { value: 100 },
  { value: 200 },
  { value: 300 },
  { value: 250 },
  { value: 400 },
  { value: 350 },
];

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Dashboard = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <StatsCard
        title="Total Sales"
        value={12345}
        percentage={12}
        icon={<FaMoneyBillWave className="text-green-500" />}
        chartData={chartExampleData}
      />
      <StatsCard
        title="Total Users"
        value={9876}
        percentage={-5}
        icon={<FaUsers className="text-blue-500" />}
        chartData={chartExampleData}
      />
      <StatsCard
        title="Orders"
        value={765}
        percentage={8}
        icon={<FaShoppingCart className="text-purple-500" />}
        chartData={chartExampleData}
      />
    </motion.div>
  );
};

export default Dashboard;
