import jobPost from '../models/jobModel.js';



export const createJobPost = async (req, res) => {
    try {

        const { companyName, logoUrl, jobPosition, monthlySalary, jobType, remoteOffice, location, jobDescription, aboutCompany, skillsRequired } = req.body;

        const recruiterName = req.body.user.name;

        const obj = { companyName, logoUrl, jobPosition, monthlySalary, jobType, remoteOffice, location, jobDescription, aboutCompany, skillsRequired, recruiterName };

        const arr = Object.keys(obj);

        for (let i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                return res.status(400).json({ msg: 'All fields are required' });
            }
        }

        const skillArr = skillsRequired.split(',').map((item) => item.trim());
        obj.skillsRequired = skillArr;

        const newObj = new jobPost(obj);
        await newObj.save();

        return res.status(200).json({ msg: 'job post created successfully', data: newObj });
    }
    catch (err) {
        return res.status(500).json({ msg: 'error while creating job post', data: err.message });
    }
}


export const updateJobPost = async (req, res) => {
    try {
        const jobId = req.params.id;
        const obj = req.body;

        const job = await jobPost.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'job post not found' });
        }

        if (obj.skillsRequired) {
            const skillArr = obj.skillsRequired.split(',').map((item) => item.trim());
            obj.skillsRequired = skillArr;
        }

        const updatedJobPost = await jobPost.findByIdAndUpdate(jobId, obj, { new: true });
        return res.status(200).json({ msg: 'job post updated successfully', data: updatedJobPost });

    }
    catch (err) {
        return res.status(500).json({
            msg: 'error in updating the job post', data: err.message
        })
    }
}


export const filterJobPost = async (req, res) => {
    try {
        const { jobTitle, skillsRequired } = req.query;
        const skillsArr = skillsRequired.split(' ').map((item) => item.trim());

        const res = jobPost.find({
            $or: [
                {
                    skillsRequired: { $in: skillsArr }
                },
                {
                    jobPosition: jobTitle
                }
            ]
        });

        if (res.length == 0) {
            return res.status(404).json({ msg: 'no job posts found' });
        }

        return res.status(200).json({ data: res });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}


export const getJobPost = async (req, res) => {
    try {
        const jobId = req.params.id;

        const res = await jobPost.findById(jobId);
        if (!res) {
            return res.status(404).json({ msg: 'no job post found with given id' });
        }

        return res.status(200).json({ data: res });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}