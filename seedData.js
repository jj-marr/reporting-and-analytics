const mongoose = require('mongoose');
const Report = require('./models/Report');
require('dotenv').config();

const _uwu_connect = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kawaii_reports';

        console.log('OwO trying to connect to:', mongoURI);

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB like Naruto to Kurama! ⭐');
    } catch (error) {
        console.error('Connection failed senpai! (╥﹏╥)', error);
        process.exit(1);
    }
};

const _generateDummyData = () => {
    const reports = [];
    const rewardNames = ['Kawaii Plushie', 'Anime Figurine', 'Manga Volume', 'Gaming Voucher', 'Bento Box'];

    for (let i = 1; i <= 10; i++) {
        const report = {
            reportId: `REP${i.toString().padStart(3, '0')}`,
            generatedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
            metrics: {
                ticketResolution: {
                    averageResolutionTime: Math.floor(Math.random() * 120) + 30,
                    resolutionTimeDistribution: [
                        { timeRange: '0-30min', count: Math.floor(Math.random() * 100) },
                        { timeRange: '30-60min', count: Math.floor(Math.random() * 100) },
                        { timeRange: '60-120min', count: Math.floor(Math.random() * 50) }
                    ]
                },
                userSatisfaction: {
                    averageRating: (Math.random() * 2 + 3).toFixed(1),
                    ratingDistribution: {
                        '1': Math.floor(Math.random() * 10),
                        '2': Math.floor(Math.random() * 20),
                        '3': Math.floor(Math.random() * 30),
                        '4': Math.floor(Math.random() * 40),
                        '5': Math.floor(Math.random() * 50)
                    }
                },
                feedbackTrends: [
                    {
                        category: 'Service',
                        sentiment: 'positive',
                        frequency: Math.floor(Math.random() * 100)
                    },
                    {
                        category: 'Product',
                        sentiment: 'neutral',
                        frequency: Math.floor(Math.random() * 100)
                    },
                    {
                        category: 'Support',
                        sentiment: 'positive',
                        frequency: Math.floor(Math.random() * 100)
                    }
                ],
                participationMetrics: {
                    totalParticipants: Math.floor(Math.random() * 1000) + 500,
                    participationRate: (Math.random() * 30 + 70).toFixed(2),
                    activeUsersPercentage: (Math.random() * 40 + 60).toFixed(2)
                },
                rewardsAnalytics: {
                    popularRewards: rewardNames.map((name, index) => ({
                        rewardId: `RWD${index + 1}`,
                        rewardName: name,
                        redemptionCount: Math.floor(Math.random() * 200)
                    }))
                },
                customerMetrics: Array.from({ length: 3 }, (_, index) => ({
                    customerId: `CUST${index + 1}`,
                    pointsEarned: Math.floor(Math.random() * 10000),
                    rewardsRedeemed: Array.from({ length: 2 }, (_, rewardIndex) => ({
                        rewardId: `RWD${rewardIndex + 1}`,
                        rewardName: rewardNames[rewardIndex],
                        pointsSpent: Math.floor(Math.random() * 1000),
                        redeemedAt: new Date()
                    }))
                }))
            }
        };
        reports.push(report);
    }
    return reports;
};

const _uwu_seedDatabase = async () => {
    try {
        // Clear existing data like Thanos snap! ✨
        await Report.deleteMany({});
        console.log('Cleared existing reports uwu!');

        // Generate and insert new data
        const dummyReports = _generateDummyData();
        await Report.insertMany(dummyReports);

        console.log('ヽ(✿ﾟ▽ﾟ)ノ Sugoi! Database seeded with kawaii data!');

        // Close connection like ending an anime episode
        await mongoose.connection.close();
        console.log('Sayonara, MongoDB-chan! Connection closed ~');

    } catch (error) {
        console.error('Gomen nasai! Error seeding database (╥﹏╥)', error);
        process.exit(1);
    }
};

// Execute the seeding process
_uwu_connect().then(() => {
    _uwu_seedDatabase();
});
