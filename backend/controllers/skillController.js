import SkillModel from '../models/skillModel.js';


export const getSkill = async (req, res) => {
    try {
        const result = await SkillModel.findOne();
        return res.status(200).json({ data: result?.allSkills });
    }
    catch (err) {
        return res.status(500).json({ data: err.message });
    }
} 