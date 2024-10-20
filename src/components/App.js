��
 
 // src/components/App.js
import React, { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionStatistics from './TransactionStatistics';
import BarChart from './BarChart';

const App = () => {
    const [month, setMonth] = useState('03'); // March is default
    const [searchQuery, setSearchQuery] = useState('');

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <h1>Transaction Dashboard</h1>
            <select value={month} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, index) => {
                    const monthNumber = (index + 1).toString().padStart(2, '0');
                    return <option key={monthNumber} value={monthNumber}>{new Date(0, index).toLocaleString('default', { month: 'long' })}</option>;
                })}
            </select>
            <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={handleSearchChange} />
            <TransactionStatistics month={month} />
            <TransactionsTable month={month} searchQuery={searchQuery} />
            <BarChart month={month} />
        </div>
    );
};

export default App;

