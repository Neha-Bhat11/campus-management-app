const User = require('../models/User');

const allowDepartmentAccess = () => {
  return async (req, res, next) => {
    try {
      if (req.user.role === 'admin') {
        return next();
      }

      const user = await User.findById(req.user._id);

      if (!user.department) {
        return res.status(403).json({ message: 'No department assigned' });
      }

      req.departmentFilter = { department: user.department };
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { allowDepartmentAccess };
