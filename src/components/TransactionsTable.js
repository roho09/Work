��
 
 // src/components/TransactionsTable.js
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const TransactionsTable = ({ month, searchQuery }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`/api/transactions?month=${month}&search=${searchQuery}`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [month, searchQuery]);

    return (
        <div>
            <h2>Transactions for {new Date(2020, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                            <td>{transaction.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
