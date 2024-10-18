// controllers/transactionController.js
const Transaction = require('../models/transaction');
const axios = require('axios');

exports.initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.deleteMany(); // Clear existing records
        await Transaction.insertMany(transactions); // Insert new records

        res.status(201).json({ message: 'Database initialized', count: transactions.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    const startIndex = (page - 1) * perPage;

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $regex: `^${month}`, $options: 'i' },
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search } },
            ],
        })
            .limit(perPage)
            .skip(startIndex);

        const total = await Transaction.countDocuments({
            dateOfSale: { $regex: `^${month}`, $options: 'i' },
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search } },
            ],
        });

        res.status(200).json({
            transactions,
            total,
            page,
            perPage,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStatistics = async (req, res) => {
    const { month } = req.query;

    try {
        const totalSales = await Transaction.aggregate([
            { $match: { dateOfSale: { $regex: `^${month}`, $options: 'i' } } },
            { $group: { _id: null, totalAmount: { $sum: '$price' }, totalSoldItems: { $sum: 1 } } },
        ]);

        const totalNotSoldItems = await Transaction.countDocuments({
            dateOfSale: { $regex: `^${month}`, $options: 'i' },
            price: { $eq: 0 },
        });

        res.status(200).json({
            totalSales: totalSales[0]?.totalAmount || 0,
            totalSoldItems: totalSales[0]?.totalSoldItems || 0,
            totalNotSoldItems,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBarChartData = async (req, res) => {
    const { month } = req.query;

    const priceRanges = [
        { range: '0-100', count: 0 },
        { range: '101-200', count: 0 },
        { range: '201-300', count: 0 },
        { range: '301-400', count: 0 },
        { range: '401-500', count: 0 },
        { range: '501-600', count: 0 },
        { range: '601-700', count: 0 },
        { range: '701-800', count: 0 },
        { range: '801-900', count: 0 },
        { range: '901-above', count: 0 },
    ];

    try {
        const transactions = await Transaction.find({ dateOfSale: { $regex: `^${month}`, $options: 'i' } });

        transactions.forEach((transaction) => {
            const price = transaction.price;
            if (price <= 100) priceRanges[0].count++;
            else if (price <= 200) priceRanges[1].count++;
            else if (price <= 300) priceRanges[2].count++;
            else if (price <= 400) priceRanges[3].count++;
            else if (price <= 500) priceRanges[4].count++;
            else if (price <= 600) priceRanges[5].count++;
            else if (price <= 700) priceRanges[6].count++;
            else if (price <= 800) priceRanges[7].count++;
            else if (price <= 900) priceRanges[8].count++;
            else priceRanges[9].count++;
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPieChartData = async (req, res) => {
    const { month } = req.query;

    try {
        const categories = await Transaction.aggregate([
            { $match: { dateOfSale: { $regex: `^${month}`, $options: 'i' } } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDashboardData = async (req, res) => {
    const { month } = req.query;

    try {
        const [barChartData, pieChartData, statistics] = await Promise.all([
            this.getBarChartData(req, res),
            this.getPieChartData(req, res),
            this.getStatistics(req, res),
        ]);

        res.status(200).json({ barChartData, pieChartData, statistics });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
