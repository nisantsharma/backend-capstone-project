import jobPost from '../models/jobModel.js';
import SkillModel from '../models/skillModel.js';



export const createJobPost = async (req, res) => {
    try {

        const { companyName, logoUrl, jobPosition, monthlySalary, jobType, remoteOffice, location, jobDescription, aboutCompany, skillsRequired, information } = req.body;

        const recruiterName = req.body.user.name;

        const obj = { companyName, logoUrl, jobPosition, monthlySalary, jobType, remoteOffice, location, jobDescription, aboutCompany, skillsRequired, recruiterName, information };

        const arr = Object.keys(obj);

        for (let i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                return res.status(400).json({ msg: 'All fields are required' });
            }
        }

        const skillArr = skillsRequired.split(',').map((item) => item.trim());

        // check for duplicate skills in skillArr
        const skillArr2 = [];

        for (let i = 0; i < skillArr.length; i++) {
            let cnt = 0;

            for (let j = 0; j < skillArr.length; j++) {
                if (skillArr[i] === skillArr[j]) {
                    cnt++;
                }
            }

            if (cnt === 1) {
                skillArr2.push(skillArr[i]);
            }
        }

        obj.skillsRequired = skillArr2;

        const newObj = new jobPost(obj);
        await newObj.save();

        // extract new skill from this job which is not present in database and add these skill in database

        const skillDoc = await SkillModel.findOne({});
        const allSkills1 = skillDoc.allSkills;

        // add unique skill to the allskills1 array which will be saved in the database in skill collection        

        for (let i = 0; i < skillArr2.length; i++) {
            const item = skillArr2[i].toLowerCase();
            let cnt = 0;

            for (let j = 0; j < allSkills1.length; j++) {
                if (item === allSkills1[j].toLowerCase()) {
                    cnt++;
                    break;
                }
            }

            if (!cnt) {
                allSkills1.push(skillArr2[i]);
            }
        }

        const updatedSkills = await findByIdAndUpdate(skillDoc._id, { allSkills: allSkills1 }, { new: true });

        return res.status(200).json({ msg: 'job post created successfully', data: newObj });
    }
    catch (err) {
        return res.status(500).json({ msg: 'error while creating job post', data: err.message });
    }
}


export const updateJobPost = async (req, res) => {
    try {
        const jobId = req.params.id;

        const { companyName, logoUrl, jobPosition, monthlySalary, jobType, remoteOffice, location, jobDescription, aboutCompany, skillsRequired, information } = req.body;

        const recruiterName = req.body.user.name;

        const obj = { companyName, logoUrl, jobPosition, monthlySalary, jobType, remoteOffice, location, jobDescription, aboutCompany, skillsRequired, recruiterName, information };

        const arr = Object.keys(obj);

        for (let i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                return res.status(400).json({ msg: 'All fields are required' });
            }
        }

        const job = await jobPost.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'job post not found' });
        }


        const skillArr = skillsRequired.split(',').map((item) => item.trim());

        // check for duplicate skills in skillArr
        const skillArr2 = [];

        for (let i = 0; i < skillArr.length; i++) {
            let cnt = 0;

            for (let j = 0; j < skillArr.length; j++) {
                if (skillArr[i] === skillArr[j]) {
                    cnt++;
                }
            }

            if (cnt === 1) {
                skillArr2.push(skillArr[i]);
            }
        }

        obj.skillsRequired = skillArr2;

        const updatedJobPost = await jobPost.findByIdAndUpdate(jobId, obj, { new: true });

        // extract new skill from this job which is not present in database and add these skill in database

        const skillDoc = await SkillModel.findOne({});
        const allSkills1 = skillDoc.allSkills;

        // add unique skill to the allskills1 array which will be saved in the database in skill collection        

        for (let i = 0; i < skillArr2.length; i++) {
            const item = skillArr2[i].toLowerCase();
            let cnt = 0;

            for (let j = 0; j < allSkills1.length; j++) {
                if (item === allSkills1[j].toLowerCase()) {
                    cnt++;
                    break;
                }
            }

            if (!cnt) {
                allSkills1.push(skillArr2[i]);
            }
        }

        // console.log(allSkills1);
        // console.log(skillDoc);

        const updatedSkills = await SkillModel.findByIdAndUpdate(skillDoc._id, { allSkills: allSkills1 }, { new: true });

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
        const { jobTitle, skills } = req.query;
        // console.log(req, req.query);
        // console.log(jobTitle, skills);

        let searchQuery = {};

        if (skills.length > 0 || jobTitle.trim().length > 0) {
            searchQuery.$or = [];

            if (skills.length) {
                const skillsArr = skills.split(',').map((item) => item.trim());

                searchQuery.$or.push({
                    skillsRequired: { $in: skillsArr.map((skill) => new RegExp(skill, 'i')) }
                })
            }

            if (jobTitle.trim().length) {
                searchQuery.$or.push({
                    jobPosition: { $regex: new RegExp(jobTitle.trim(), 'i') }
                })
            }
        }


        const arr = await jobPost.find(searchQuery);

        // console.log(typeof arr);
        // console.log(arr[0]);
        // console.log(arr.length);
        // console.log(Array.isArray(arr));
        // console.log(arr);

        if (arr.length == 0) {
            return res.status(404).json({ msg: 'no job posts found' });
        }

        return res.status(200).json({ data: arr });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}


export const getJobPost = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await jobPost.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'no job post found with given id' });
        }

        return res.status(200).json({ data: job });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobPost.find({});

        return res.status(200).json({ data: jobs });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}