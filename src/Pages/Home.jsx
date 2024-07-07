import React from 'react';
import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Sidebar from "./Sidebar";
import './Home.css';

const data = [
  { name: 'Delegate', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Booking ', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Course', uv: 200, pv: 9800, amt: 2290 },
  { name: 'CourseFee', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Invoice', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Registration', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
];

export default function Home() {
  return (
    <div style={{ display: "flex", margin: 0, padding: 0, width: "100%" }}>
      <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
        <Sidebar />
      </div>

      <div className="col-md-10">
        <div className="dashboard">
          <div className="nav">
            <Typography variant="h4" component="div" gutterBottom style={{ color: "#fff" }}>
              Course Dashboard
            </Typography>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <div className="section2" style={{ marginTop: "50px" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card className="animated-card gradient-card">
                        <CardHeader title="Welcome to the Dashboard" style={{ color: "#fff" }} />
                        <CardContent>
                          <Typography variant="body2" style={{ color: "#fff" }}>
                            Here you can find an overview of your courses and progress.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className="animated-card gradient-card">
                        <CardHeader title="Recent Activity" style={{ color: "#fff" }} />
                        <CardContent>
                          <Typography variant="body2" style={{ color: "#fff" }}>
                            No recent activity.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Card className="animated-card gradient-card">
                        <CardHeader title="Progress Chart" style={{ color: "#fff" }} />
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                              <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
                              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                              <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                              <YAxis tick={{ fill: "#fff" }} />
                              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
