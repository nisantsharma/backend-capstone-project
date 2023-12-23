import mongoose from "mongoose";


const jobSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    monthlySalary: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time'],
        required: true,
    },
    remoteOffice: {
        type: String,
        enum: ['Remote', 'Office'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    recruiterName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const jobPost = mongoose.model('job', jobSchema);

export default jobPost;