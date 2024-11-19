const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    satisfaction: { type: String, required: true },
    expectationsMet: { type: String, required: true },
    reccomendProduct: { type: String, required: true },
    experience: { type: String, required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;