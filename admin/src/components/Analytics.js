import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, Eye, Clock } from 'lucide-react';
import '../styles/Analytics.css';


function Analytics() {
  const [timeRange, setTimeRange] = useState('week');

  // Sample data - replace with real data from your API
  const visitorData = [
    { name: 'Mon', visitors: 2400, pageViews: 4400 },
    { name: 'Tue', visitors: 1398, pageViews: 3210 },
    { name: 'Wed', visitors: 9800, pageViews: 12000 },
    { name: 'Thu', visitors: 3908, pageViews: 4800 },
    { name: 'Fri', visitors: 4800, pageViews: 6800 },
    { name: 'Sat', visitors: 3800, pageViews: 4300 },
    { name: 'Sun', visitors: 4300, pageViews: 5300 }
  ];

  const categoryData = [
    { name: 'Technology', value: 400 },
    { name: 'Sports', value: 300 },
    { name: 'News', value: 500 },
    { name: 'Entertainment', value: 200 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const stats = {
    totalVisitors: '45.2K',
    avgTimeOnSite: '4m 32s',
    bounceRate: '32.8%',
    returnRate: '42.1%'
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon visitors">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h3>Total Visitors</h3>
            <p>{stats.totalVisitors}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon time">
            <Clock size={24} />
          </div>
          <div className="stat-details">
            <h3>Avg. Time on Site</h3>
            <p>{stats.avgTimeOnSite}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bounce">
            <TrendingUp size={24} />
          </div>
          <div className="stat-details">
            <h3>Bounce Rate</h3>
            <p>{stats.bounceRate}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon return">
            <Eye size={24} />
          </div>
          <div className="stat-details">
            <h3>Return Rate</h3>
            <p>{stats.returnRate}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Visitor Traffic Chart */}
        <div className="chart-card">
          <h2>Visitor Traffic</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="#82ca9d" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution Chart */}
        <div className="chart-card">
          <h2>Content Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Metrics Chart */}
        <div className="chart-card">
          <h2>Engagement Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#8884d8" />
              <Bar dataKey="pageViews" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics; 