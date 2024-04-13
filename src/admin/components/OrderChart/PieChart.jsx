import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js with all components

import axiosInstance from '../../../../axiosInstance';

const PieChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/admin/order');
                const orders = response?.data?.response;

                if (!Array.isArray(orders)) {
                    console.error('Invalid response format:', orders);
                    return;
                }

                const pendingOrders = orders.filter(order => order.orderStatus === false).length;
                const completedOrders = orders.filter(order => order.orderStatus === true).length;

                setChartData({
                    labels: ['Pending', 'Completed'],
                    datasets: [
                        {
                            label: 'No of Order',
                            data: [pendingOrders, completedOrders],
                            backgroundColor: ['#80bcbd', '#a0cea4'],
                            hoverBackgroundColor: ['#5eaaac', '#6eb474'],
                            type: 'doughnut', // Set the type to 'doughnut'
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchData();
    }, []);

    // Ensure Chart.js is registered before rendering
    useEffect(() => {
        if (Chart.controllers && Chart.elements) {
            Chart.register(...Object.values(Chart.controllers), ...Object.values(Chart.elements));
        } else {
            console.error('Chart.controllers or Chart.elements is not available:', Chart.controllers, Chart.elements);
        }
    }, []);

    return (
        <div>
            {chartData && <Doughnut data={chartData} />} {/* Use Doughnut component instead of Pie */}
        </div>
    );
};

export default PieChart;
