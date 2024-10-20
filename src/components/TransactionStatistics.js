��
 
 // src/components/TransactionStatistics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionStatistics = ({ month }) => {
    const [statistics, setStatistics] = useState({ totalSales: 0, totalItems: 0, totalUnsold: 0 });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`/api/statistics?month=${month}`);
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, [month]);

    return (
        <div>
            <h2>Transaction Statistics for {new Date(2020, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <p>Total Sales: ${statistics.totalSales}</p>
            <p>Total Sold Items: {statistics.totalItems}</p>
            <p>Total Not Sold Items: {statistics.totalUnsold}</p>
        </div>
    );
};

export default TransactionStatistics;
