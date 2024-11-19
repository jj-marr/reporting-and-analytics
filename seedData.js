// seedData.js
const mongoose = require('mongoose');
const User = require('./models/User');
const LoyaltyClient = require('./models/LoyaltyClient');
const Feedback = require('./models/Feedback');
const Survey = require('./models/Survey');

const _uwu_connection = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alphabiz';

const seed_Data = async () => {
    try {
        await mongoose.connect(_uwu_connection);
        console.log('OwO Connected to MongoDB desu~! 🎉');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            LoyaltyClient.deleteMany({}),
            Feedback.deleteMany({}),
            Survey.deleteMany({})
        ]);
        console.log('Cleaned up old data uwu! ✨');

        // User Data UwU
        const kawaii_user = new User({
            email: "Group5@torontomu.ca",
            role: "primary_user",
            points_balance: 100,
            transaction_history: new Map([
                ['abc123', {
                    transaction_type: "purchase",
                    transaction_date: new Date("2024-05-05"),
                    transaction_cost: 500,
                    productName: "AlphaBiz CRM Software",
                    points_change: 50,
                    description: "Purchased product XYZ"
                }],
                ['123abc', {
                    transaction_type: "redeem",
                    transaction_date: new Date("2024-05-05"),
                    transaction_cost: 500,
                    productName: "AlphaBiz CRM Software",
                    points_change: -50,
                    description: "Purchased product XYZ"
                }],
                ['refund_abc123', {
                    transaction_type: "refund",
                    transaction_date: new Date("2024-05-05"),
                    transaction_cost: -500,
                    productName: "AlphaBiz CRM Software",
                    points_change: 50,
                    description: "Refunded product XYZ"
                }]
            ]),
            activity_log: [
                {
                    activity_type: "update",
                    activity_field: "name",
                    activity_date: new Date("2024-05-05")
                },
                {
                    activity_type: "update",
                    activity_field: "address",
                    activity_date: new Date("2024-05-05")
                }
            ]
        });

        // Loyalty Clients Data OwO
        const loyalty_clients = [
            {
                client_id: "C001",
                email: "Alice.Johnson@torontomu.ca",
                points: 1500,
                activities: [
                    {
                        type: "purchase",
                        description: "Purchased Product X",
                        points_earned: 500,
                        date: new Date("2024-11-01"),
                        activity_id: "A001"
                    },
                    {
                        type: "subscription",
                        description: "Subscribed to Service Y",
                        points_earned: 300,
                        date: new Date("2024-11-05"),
                        activity_id: "A002"
                    },
                    {
                        type: "event",
                        description: "Attended AlphaBiz Annual Conference",
                        points_earned: 200,
                        date: new Date("2024-11-10")
                    },
                    {
                        type: "webinar",
                        description: "Attended Webinar on Business Growth",
                        points_earned: 100,
                        date: new Date("2024-11-12"),
                        activity_id: "A003"
                    },
                    {
                        type: "support",
                        description: "Engaged with Customer Support",
                        points_earned: 50,
                        date: new Date("2024-11-13"),
                        activity_id: "A004"
                    }
                ],
                rewards: [
                    {
                        reward_id: "R001",
                        description: "10% Discount on Service Z",
                        points_redeemed: 200,
                        date: new Date("2024-11-11"),
                        activity_id: "A005"
                    }
                ]
            },
            {
                client_id: "C002",
                email: "Bob.Smith@torontomu.ca",
                points: 1200,
                activities: [
                    {
                        type: "purchase",
                        description: "Purchased Product A",
                        points_earned: 400,
                        date: new Date("2024-11-02"),
                        activity_id: "A006"
                    },
                    {
                        type: "event",
                        description: "Attended AlphaBiz Networking Event",
                        points_earned: 150,
                        date: new Date("2024-11-08"),
                        activity_id: "A007"
                    },
                    {
                        type: "webinar",
                        description: "Attended Webinar on Marketing Strategies",
                        points_earned: 100,
                        date: new Date("2024-11-09"),
                        activity_id: "A008"
                    },
                    {
                        type: "support",
                        description: "Engaged with Customer Support",
                        points_earned: 50,
                        date: new Date("2024-11-13"),
                        activity_id: "A009"
                    }
                ],
                rewards: [
                    {
                        reward_id: "R002",
                        description: "Access to Premium Feature X",
                        points_redeemed: 150,
                        date: new Date("2024-11-10")
                    }
                ]
            }
        ];

        // Feedback Data UwU
        const feedback_data = [
            {
                name: "John Doe",
                age: 34,
                phoneNumber: "+14165551235",
                email: "john.doe@example.com",
                satisfaction: "Satisfied",
                expectationsMet: "Met",
                reccomendProduct: "Yes",
                experience: "Positive experience with helpful support."
            },
            {
                name: "Mary Smith",
                age: 28,
                phoneNumber: "+14165551236",
                email: "mary.smith@example.com",
                satisfaction: "Very Satisfied",
                expectationsMet: "Exceeded",
                reccomendProduct: "Absolutely",
                experience: "Seamless interaction, very professional."
            },
            {
                name: "David Brown",
                age: 42,
                phoneNumber: "+14165551237",
                email: "david.brown@example.com",
                satisfaction: "Neutral",
                expectationsMet: "Partially",
                reccomendProduct: "Maybe",
                experience: "Overall okay, could improve responsiveness."
            },
            {
                name: "Jessica White",
                age: 31,
                phoneNumber: "+14165551238",
                email: "jessica.white@example.com",
                satisfaction: "Dissatisfied",
                expectationsMet: "Not Met",
                reccomendProduct: "No",
                experience: "Support was slow and didn't address my issue."
            },
            {
                name: "James Green",
                age: 25,
                phoneNumber: "+14165551239",
                email: "james.green@example.com",
                satisfaction: "Very Satisfied",
                expectationsMet: "Exceeded",
                reccomendProduct: "Yes, highly recommended",
                experience: "Fantastic experience, very efficient."
            }
        ];

        // Survey Data OwO
        const survey_data = [
            {
                name: "John Doe",
                age: 34,
                phoneNumber: "+14165551235",
                email: "john.doe@example.com",
                overall: "Positive",
                recWebpage: "Yes",
                satisfactionProd: "Very Satisfied",
                feasibility: "Easy to use",
                threats: "No issues",
                customerSupport: "Very helpful",
                enjoyment: "High",
                frequency: "Often",
                marketing: "Effective"
            },
            {
                name: "Mary Smith",
                age: 28,
                phoneNumber: "+14165551236",
                email: "mary.smith@example.com",
                overall: "Very Positive",
                recWebpage: "Definitely",
                satisfactionProd: "Satisfied",
                feasibility: "Very intuitive",
                threats: "Minor issues",
                customerSupport: "Supportive",
                enjoyment: "Enjoyable",
                frequency: "Sometimes",
                marketing: "Engaging"
            },
            {
                name: "David Brown",
                age: 42,
                phoneNumber: "+14165551237",
                email: "david.brown@example.com",
                overall: "Neutral",
                recWebpage: "Maybe",
                satisfactionProd: "Neutral",
                feasibility: "Average",
                threats: "Performance issues",
                customerSupport: "Could be improved",
                enjoyment: "Low",
                frequency: "Rarely",
                marketing: "Could improve targeting"
            },
            {
                name: "Jessica White",
                age: 31,
                phoneNumber: "+14165551238",
                email: "jessica.white@example.com",
                overall: "Negative",
                recWebpage: "No",
                satisfactionProd: "Dissatisfied",
                feasibility: "Difficult to use",
                threats: "User interface issues",
                customerSupport: "Unhelpful",
                enjoyment: "Not enjoyable",
                frequency: "Once",
                marketing: "Ineffective"
            },
            {
                name: "James Green",
                age: 25,
                phoneNumber: "+14165551239",
                email: "james.green@example.com",
                overall: "Very Positive",
                recWebpage: "Absolutely",
                satisfactionProd: "Very Satisfied",
                feasibility: "Smooth and easy",
                threats: "No concerns",
                customerSupport: "Responsive and helpful",
                enjoyment: "High",
                frequency: "Often",
                marketing: "Appealing and relevant"
            }
        ];

        // Save all the kawaii data! ✨
        await User.create(kawaii_user);
        await LoyaltyClient.create(loyalty_clients);
        await Feedback.create(feedback_data);
        await Survey.create(survey_data);

        console.log('All data seeded successfully! Yatta! 🎊');
        await mongoose.connection.close();
        console.log('Database connection closed desu~ 👋');

    } catch (error) {
        console.error('OMG Something went wrong >_< ', error);
        process.exit(1);
    }
};

seed_Data();
