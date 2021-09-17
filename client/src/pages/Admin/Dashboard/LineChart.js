import React,{useEffect,useState} from 'react';
import { Line, defaults } from 'react-chartjs-2';
import axios from 'axios';
import { useStyles } from "./styles";
import { Card, CardContent,  Divider,  Grid, Paper, Typography, } from "@material-ui/core";
import { blue, brown, cyan, deepOrange, green, grey, indigo, lightGreen, lime, pink, red, teal, yellow } from "@material-ui/core/colors";

const LineChart = () => {
    const classes=useStyles();
    const [month, setMonth] = useState([]);
    const [amount, setAmount] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/order/getSalesDistribution").then((response) => {
           const months=[];
           const amounts=[];
           for(var i=0;i<response.data.length;i++){
             const el=response.data[i].Month;
             months.push(el);
           }
           setMonth(months);

           for(var j=0;j<response.data.length;j++){
            const el=response.data[j].monthly_amount;
            amounts.push(el);
          }
          setAmount(amounts);
        });
    }, []);

console.log(month);
    return (
      

        <Grid container className={classes.section} spacing={1}  justify = "center">
        
        <Grid item xs={12} sm={10} md={10}>
          <Card component={Paper}>
            <CardContent style={{backgroundColor:"#C6C6C6"}}>
              <Typography variant='h6' className={classes.cardTitle} align='left'>
                 Sales Distribution
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
            <div>
                <Line
                       data={{
                           labels:month,
                           datasets: [
                            {
                              label: 'Sales Amount (Rs)',
                              data:amount,
                              backgroundColor: [grey[900]],
                              borderColor:[grey[900]],
                              borderWidth: 2,
                            },
                          ],
                       }}
                       height={400}
                       width={400}
                       options={{
                        maintainAspectRatio: false,
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                              },
                            },
                          ],
                        },
                        legend: {
                          labels: {
                            fontSize: 25,
                          },
                        },
                      }}
                />
              </div>
        
            </CardContent>
          </Card>
        </Grid>
        </Grid>
            );
};

export default LineChart;