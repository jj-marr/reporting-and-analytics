const surveySchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    overall: { type: String, required: true },
    recWebpage: { type: String, required: true },
    satisfactionProd: { type: String, required: true },
    feasibility: { type: String, required: true },
    threats: { type: String, required: true },
    customerSupport: { type: String, required: true },
    enjoyment: { type: String, required: true },
    frequency: { type: String, required: true },
    marketing: { type: String, required: true }
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;