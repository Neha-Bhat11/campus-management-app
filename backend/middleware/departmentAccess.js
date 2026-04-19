// ✅ QUALITY FIX: removed redundant User.findById() call.
// authMiddleware already fetched and attached the full user as req.user,
// so we can just read req.user.department directly — no extra DB call needed.
const allowDepartmentAccess = () => {
  return (req, res, next) => {
    if (req.user.role === 'admin') {
      return next();
    }

    if (!req.user.department) {
      return res.status(403).json({ message: 'No department assigned' });
    }

    req.departmentFilter = { department: req.user.department };
    next();
  };
};

module.exports = { allowDepartmentAccess };
