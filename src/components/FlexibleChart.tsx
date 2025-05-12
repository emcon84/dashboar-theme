import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ChartType = "line" | "bar" | "area";

type ChartDatum = {
  name: string;
  [key: string]: string | number;
};

interface FlexibleChartProps {
  title: string;
  type: ChartType;
  data: ChartDatum[];
  dataKeys: { key: string; color?: string; label?: string }[];
}

const FlexibleChart: React.FC<FlexibleChartProps> = ({
  title,
  type,
  data,
  dataKeys,
}) => {
  const renderChart = () => {
    const chartProps = {
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    const renderLines = () =>
      dataKeys.map(({ key, color, label }, i) => {
        const common = {
          dataKey: key,
          stroke: color || "#3b82f6",
          name: label || key,
          strokeWidth: 2,
          key: `${type}-${key}-${i}`,
        };

        switch (type) {
          case "line":
            return <Line {...common} dot={{ r: 3 }} type="monotone" />;
          case "bar":
            return <Bar {...common} fill={color || "#3b82f6"} />;
          case "area":
            return (
              <Area
                {...common}
                fillOpacity={0.3}
                fill={color || "#3b82f6"}
                type="monotone"
              />
            );
        }
      });

    const ChartComponent =
      type === "line" ? LineChart : type === "bar" ? BarChart : AreaChart;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data} {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              color: "#f9fafb",
              borderRadius: "5px",
            }}
            labelStyle={{ color: "#f9fafb" }}
            itemStyle={{ color: "#f9fafb" }}
          />
          <Legend />
          {renderLines()}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      {renderChart()}
    </div>
  );
};

export default FlexibleChart;
