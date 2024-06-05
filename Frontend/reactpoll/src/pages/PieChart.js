import React,{ useState ,useEffect} from "react";
import { Chart } from "react-google-charts";
import "./styles/PieChart.css"
function PieChart({ polls }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (polls.OptionVote) {
      const formattedData = [
        ["Option", "Votes"],
        ...Object.entries(polls.OptionVote).map(([option, votes]) => [option, votes]),
      ];
      setData(formattedData);
    }
  }, [polls]);
  console.log(data)
  const chartOptions = {
    title: polls.Questions,
  };
  return (
    <div className="pie">
      <Chart
        chartType="PieChart"
        data={data}
        options={chartOptions}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}

export default PieChart;
