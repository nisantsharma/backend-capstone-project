import mongoose from 'mongoose';

const skillSchema = mongoose.Schema({
    allSkills: {
        type: [String]
    }
});

const SkillModel = mongoose.model('Skill', skillSchema);

export default SkillModel;