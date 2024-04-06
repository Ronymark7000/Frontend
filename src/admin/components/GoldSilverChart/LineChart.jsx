import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getAllMetalPrice } from '../../../services/PriceInstance';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineController
);

const LineChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Gold Price (Tola)',
                data: [],
                borderWidth: 1,
                borderColor: 'rgb(128, 188, 189)',
                backgroundColor: 'rgba(128, 188, 189, 0.2)'
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllMetalPrice();
                const priceResponse = response?.data?.response;

                if (!priceResponse || priceResponse.length === 0) {
                    console.error('Price response is empty.');
                    return;
                }

                const goldTolaData = priceResponse.map(item => parseFloat(item.goldTola.replace('Rs ', '')));
                const labels = priceResponse.map(item => {
                    const date = new Date(item.priceDate);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                });

                setChartData(prevState => ({
                    ...prevState,
                    labels: labels,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: goldTolaData
                        }
                    ]
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateYAxisRange = () => {
        const minPrice = Math.min(...chartData.datasets[0].data) - 10000;
        const maxPrice = Math.max(...chartData.datasets[0].data) + 10000;
        return [minPrice, maxPrice];
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: `Year - ${new Date().getFullYear()}`,
                    font: {
                        weight: 'bold' // Bold font
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: `Price (Nrs)`,
                    font: {
                        weight: 'bold' // Bold font
                    }
                },
                ticks: {
                    precision: 0,
                    suggestedMin: calculateYAxisRange()[0],
                    suggestedMax: calculateYAxisRange()[1]
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const tooltipLabel = context.dataset.label || '';
                        let label = tooltipLabel;
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += ' Nrs' + context.parsed.y ;
                        }
                        return label;
                    }
                }
            },
            annotation: {
                annotations: [{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x',
                    value: chartData.labels[0], // Adjust as needed
                    borderColor: 'red',
                    borderWidth: 2,
                    label: {
                        content: 'Hover Line',
                        enabled: true,
                        position: 'top'
                    }
                }]
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        }
    };

    return (
        <div>
            <Line data={chartData} options={options} height={400} />
        </div>
    );
}

export default LineChart;
