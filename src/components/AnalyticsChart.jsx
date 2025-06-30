// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const AnalyticsChart = () => {
//   const [analytics, setAnalytics] = useState(null);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/admin/analytics");
//       const data = await response.json();
//       setAnalytics(data);
//     } catch (error) {
//       console.error("Failed to fetch analytics:", error);
//     }
//   };
  

//   useEffect(() => {
//     fetchAnalytics();
//     const interval = setInterval(fetchAnalytics, 60000); // Fetch every 60s
//     return () => clearInterval(interval);
//   }, []);

//   if (!analytics) {
//     return (
//       <div className="has-text-centered">
//         <p className="has-text-grey-dark">⏳ Loading analytics...</p>
//         <progress className="progress is-small is-primary" max="100">Loading</progress>
//       </div>
//     );
//   }

//   // Data for bar chart
//   const barChartData = [
//     { name: "Users", count: analytics.totalUsers },
//     { name: "Campaigns", count: analytics.totalCampaigns },
//     { name: "Interests", count: analytics.totalInterests },
//   ];

//   // Data for pie chart
//   const pieChartData = [
//     { name: "Converted", value: analytics.conversionRate },
//     { name: "Not Converted", value: 100 - analytics.conversionRate },
//   ];

//   return (
//     <div className="box has-background-light p-5">
//       <h2 className="title is-4 has-text-primary has-text-centered">📊 Admin Analytics</h2>

//       <div className="columns">
//         {/* Bar Chart */}
//         <div className="column is-half">
//           <div className="box">
//             <h3 className="subtitle has-text-centered">📶 Platform Metrics</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barChartData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="count" fill="#007bff" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pie Chart */}
//         <div className="column is-half">
//           <div className="box">
//             <h3 className="subtitle has-text-centered">📈 Conversion Rate</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} label>
//                   {pieChartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsChart;




// import React, { useState, useEffect } from "react";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
//   PieChart, Pie, Cell, LineChart, Line
// } from "recharts";
// import { saveAs } from "file-saver";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#FF6666"];

// const AnalyticsChart = () => {
//   const [analytics, setAnalytics] = useState(null);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/admin/analytics");
//       const data = await response.json();
//       setAnalytics(data);
//     } catch (error) {
//       console.error("Failed to fetch analytics:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//     const interval = setInterval(fetchAnalytics, 60000); // Fetch every 60s
//     return () => clearInterval(interval);
//   }, []);

//   if (!analytics) {
//     return (
//       <div className="has-text-centered">
//         <p className="has-text-grey-dark">⏳ Loading analytics...</p>
//         <progress className="progress is-small is-primary" max="100">Loading</progress>
//       </div>
//     );
//   }

//   // Bar Chart data
//   const barChartData = [
//     { name: "Users", count: analytics.totalUsers },
//     { name: "Campaigns", count: analytics.totalCampaigns },
//     { name: "Interests", count: analytics.totalInterests },
//   ];

//   // Pie chart data
//   const pieChartData = [
//     { name: "Converted", value: analytics.conversionRate },
//     { name: "Not Converted", value: 100 - analytics.conversionRate },
//   ];

//   // Line chart data for daily interest trends
//   const interestTrends = analytics.dailyInterestCounts || [];

//   // Top 5 celebrities
//   const topCelebrities = analytics.topCelebrities || [];

//   const handleExportCSV = () => {
//     let csv = "Celebrity,Interest Count\n";
//     topCelebrities.forEach(c => {
//       csv += `${c.name},${c.interestCount}\n`;
//     });
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
//     saveAs(blob, "top_celebrities.csv");
//   };

//   return (
//     <div className="box has-background-light p-5">
//       <h2 className="title is-4 has-text-primary has-text-centered">📊 Admin Analytics</h2>

//       <div className="columns">
//         {/* Bar Chart */}
//         <div className="column is-half">
//           <div className="box">
//             <h3 className="subtitle has-text-centered">📶 Platform Metrics</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={barChartData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="count" fill="#007bff" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pie Chart */}
//         <div className="column is-half">
//           <div className="box">
//             <h3 className="subtitle has-text-centered">📈 Conversion Rate</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} label>
//                   {pieChartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       <div className="columns">
//         {/* Line Chart */}
//         <div className="column is-half">
//           <div className="box">
//             <h3 className="subtitle has-text-centered">📅 Interest Trend (Daily)</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={interestTrends}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="count" stroke="#00C49F" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Top Celebrities */}
//         <div className="column is-half">
//           <div className="box">
//             <h3 className="subtitle has-text-centered">🌟 Top 5 Celebrities</h3>
//             <ul>
//               {topCelebrities.map((celeb, idx) => (
//                 <li key={idx}>
//                   <strong>{celeb.name}</strong> — {celeb.interestCount} interests
//                 </li>
//               ))}
//             </ul>
//             <button className="button is-small is-info mt-3" onClick={handleExportCSV}>
//               📤 Export CSV
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsChart;

import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { saveAs } from "file-saver";
import { config } from "../config";


const COLORS = ["#00C49F", "#FF4444", "#FFBB28", "#007bff", "#AA336A", "#FF8042"];

const AnalyticsChart = () => {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${config.API_URL}/admin/analytics`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!analytics) {
    return (
      <div className="has-text-centered has-text-grey-light">
        <p>⏳ Loading analytics...</p>
        <progress className="progress is-small is-primary" max="100">Loading</progress>
      </div>
    );
  }

  const barChartData = [
    { name: "Users", count: analytics.totalUsers },
    { name: "Campaigns", count: analytics.totalCampaigns },
    { name: "Interests", count: analytics.totalInterests },
  ];

  const pieChartData = [
    { name: "Converted", value: analytics.conversionRate },
    { name: "Not Converted", value: 100 - analytics.conversionRate },
  ];

  const interestTrends = analytics.dailyInterestCounts || [];
  const topCelebrities = analytics.topCelebrities || [];

  const handleExportCSV = () => {
    let csv = "Celebrity,Interest Count\n";
    topCelebrities.forEach(c => {
      csv += `${c.name},${c.interestCount}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "top_celebrities.csv");
  };

  return (
    <div className="box has-background-black-ter p-5 animated-fade text-light-mode">
      <h2 className="title is-3 has-text-white has-text-centered mb-5 slide-in-top">
        📊 Admin Analytics
      </h2>

      <div className="columns is-multiline">
        <div className="column is-half">
          <div className="box chart-card has-background-dark animated-hover">
            <h3 className="subtitle has-text-white has-text-centered">📶 Platform Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                <Legend />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="column is-half">
          <div className="box chart-card has-background-dark animated-hover">
            <h3 className="subtitle has-text-white has-text-centered">📈 Conversion Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="column is-half">
          <div className="box chart-card has-background-dark animated-hover">
            <h3 className="subtitle has-text-white has-text-centered">📅 Interest Trend (Daily)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interestTrends}>
                <XAxis dataKey="date" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#FFBB28" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="column is-half">
          <div className="box chart-card has-background-dark animated-hover">
            <h3 className="subtitle has-text-white has-text-centered">🌟 Top 5 Celebrities</h3>
            <ul className="mt-3">
              {topCelebrities.map((celeb, idx) => (
                <li key={idx} className="mb-2 fade-in-item has-text-light">
                  <strong>{celeb.name}</strong> — {celeb.interestCount} interests
                </li>
              ))}
            </ul>
            <button className="button is-small is-link mt-3" onClick={handleExportCSV}>
              📤 Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
