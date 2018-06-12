import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis,Tooltip,Legend,Bar, ResponsiveContainer } from 'recharts';
import Paper from 'material-ui/Paper';
import { Grid } from 'material-ui';
import { ItemGrid } from 'components';

class TicketAdminStats extends React.Component{
  
  render(){
    const data = [
      {name: 'User 1', Assigned: 4000 },
      {name: 'User 2', Assigned: 4000 },
      {name: 'User 3', Assigned: 4000 },
      {name: 'User 4', Assigned: 4000 },
      {name: 'User 5', Assigned: 4000 },
      {name: 'User 6', Assigned: 4000 },
      {name: 'User 7', Assigned: 4000 },
      {name: 'User 8', Assigned: 4000 },
      {name: 'User 9', Assigned: 4000 },
      {name: 'User 10', Assigned: 4000 },
      {name: 'User 11', Assigned: 4000 },
      {name: 'User 12', Assigned: 4000 },
      {name: 'User 13', Assigned: 4000 },
      {name: 'User 14', Assigned: 4000 },
      {name: 'User 15', Assigned: 4000 },
      {name: 'User 16', Assigned: 4000 },
      {name: 'User 17', Assigned: 4000 },
      {name: 'User 18', Assigned: 4000 },
      {name: 'User 19', Assigned: 4000 },
      {name: 'User 20', Assigned: 4000 },
      {name: 'User 21', Assigned: 4000 },
      {name: 'User 22', Assigned: 4000 },
      {name: 'User 23', Assigned: 4000 },
      {name: 'User 24', Assigned: 4000 },
      {name: 'User 25', Assigned: 4000 },
      {name: 'User 26', Assigned: 4000 },
      {name: 'User 27', Assigned: 4000 },
      {name: 'User 28', Assigned: 4000 },
      {name: 'User 29', Assigned: 4000 },
      {name: 'User 30', Assigned: 4000 },
      {name: 'User 31', Assigned: 4000 },
      {name: 'User 32', Assigned: 4000 },
      {name: 'User 33', Assigned: 4000 },
      {name: 'User 34', Assigned: 4000 },
      {name: 'User 35', Assigned: 4000 },
      {name: 'User 36', Assigned: 4000 },
      {name: 'User 37', Assigned: 4000 },
      {name: 'User 38', Assigned: 4000 },
      {name: 'User 39', Assigned: 4000 },
      {name: 'User 40', Assigned: 4000 },
      {name: 'User 41', Assigned: 4000 },
      {name: 'User 42', Assigned: 4000 },
      {name: 'User 43', Assigned: 4000 },
      {name: 'User 44', Assigned: 4000 },
      {name: 'User 45', Assigned: 4000 },
      {name: 'User 46', Assigned: 4000 },
      {name: 'User 47', Assigned: 4000 },
      {name: 'User 48', Assigned: 4000 },
      {name: 'User 49', Assigned: 4000 },
      {name: 'User 50', Assigned: 4000 },
      {name: 'User 51', Assigned: 4000 },
      {name: 'User 52', Assigned: 4000 },
      {name: 'User 53', Assigned: 4000 },
      {name: 'User 54', Assigned: 4000 },
      {name: 'User 55', Assigned: 4000 }
    
    ];
    return (
      <Paper>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <h2>Ticket Statistics</h2>
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                layout="vertical"
                barCategoryGap="3%"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Assigned" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ItemGrid>
        </Grid>
      </Paper>
    )
  }
}

export default TicketAdminStats;