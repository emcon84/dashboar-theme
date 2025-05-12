import { motion } from "framer-motion";
import { StatsCard } from "../components/StatsCard";
import { FaMoneyBillWave, FaUsers, FaShoppingCart } from "react-icons/fa";
import Chart from "../components/LineChart";
import FlexibleChart from "../components/FlexibleChart";

const chartExampleData = [
  { value: 100 },
  { value: 200 },
  { value: 300 },
  { value: 250 },
  { value: 400 },
  { value: 350 },
];

const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 650 },
  { name: "Mar", value: 700 },
  { name: "Apr", value: 500 },
  { name: "May", value: 900 },
  { name: "Jun", value: 750 },
];

const chartMultipleData = [
  { name: "Jan", ingresos: 400, usuarios: 200 },
  { name: "Feb", ingresos: 650, usuarios: 280 },
  { name: "Mar", ingresos: 700, usuarios: 350 },
  { name: "Apr", ingresos: 500, usuarios: 300 },
  { name: "May", ingresos: 900, usuarios: 420 },
  { name: "Jun", ingresos: 750, usuarios: 390 },
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
    <div className="p-10">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
        <Chart title="Ingresos Mensuales" data={chartData} />
        <Chart
          title="Usuarios Activos"
          data={chartData.map((d) => ({ ...d, value: d.value - 100 }))}
          color="#10b981"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-10">
        <FlexibleChart
          title="Ingresos por mes (Line)"
          type="line"
          data={chartMultipleData}
          dataKeys={[{ key: "ingresos", color: "#3b82f6" }]}
        />

        <FlexibleChart
          title="Usuarios activos por mes (Bar)"
          type="bar"
          data={chartMultipleData}
          dataKeys={[{ key: "usuarios", color: "#10b981" }]}
        />

        <FlexibleChart
          title="Comparativa ingresos vs usuarios (Area)"
          type="area"
          data={chartMultipleData}
          dataKeys={[
            { key: "ingresos", color: "#3b82f6", label: "Ingresos" },
            { key: "usuarios", color: "#10b981", label: "Usuarios" },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
