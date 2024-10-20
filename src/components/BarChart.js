��
 
 // src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarChart = ({ month }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const response = await axios.get(`/api/bar-chart?month=${month}`);
                const data = response.data;

                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Price Range',
                            data: data.values,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            }
        };

        fetchBarChartData();
    }, [month]);

    return (
        <div>
            <h2>Bar Chart of Transactions for {new Date(2020, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
