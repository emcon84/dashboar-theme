import Chart from "../components/LineChart";

const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 650 },
  { name: "Mar", value: 700 },
  { name: "Apr", value: 500 },
  { name: "May", value: 900 },
  { name: "Jun", value: 750 },
];

const ChartPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
      <Chart title="Ingresos Mensuales" data={chartData} />
      <Chart
        title="Usuarios Activos"
        data={chartData.map((d) => ({ ...d, value: d.value - 100 }))}
        color="#10b981"
      />
    </div>
  );
};

export default ChartPage;
