import FlexibleChart from "../components/FlexibleChart";

const chartMultipleData = [
  { name: "Jan", ingresos: 400, usuarios: 200 },
  { name: "Feb", ingresos: 650, usuarios: 280 },
  { name: "Mar", ingresos: 700, usuarios: 350 },
  { name: "Apr", ingresos: 500, usuarios: 300 },
  { name: "May", ingresos: 900, usuarios: 420 },
  { name: "Jun", ingresos: 750, usuarios: 390 },
];

const FlexibleChartPage = () => {
  return (
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
  );
};

export default FlexibleChartPage;
