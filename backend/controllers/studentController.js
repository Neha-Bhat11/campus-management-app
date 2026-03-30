const Timetable = require('../models/Timetable');
const StudyMaterial = require('../models/StudyMaterial');
const Complaint = require('../models/Complaint');
const viewTimetable = async(req,res)=>{
  try{
    const timetable = await Timetable.find({ department:req.user.department });
    res.json(timetable);
  }catch(err){ res.status(500).json({ message: err.message }); }
};
const viewMaterials = async(req,res)=>{
  try{
    const materials = await StudyMaterial.find({ department:req.user.department });
    res.json(materials);
  }catch(err){ res.status(500).json({ message: err.message }); }
};

module.exports = { viewTimetable, viewMaterials, submitComplaint };
