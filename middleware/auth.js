const userRole = (role) => {
    return (req, res, next) => {
      if (isAdmin) {
        next();
      } else 
        return res.status(403)
        .json({ message: "You're not authorized" });
    };
  };
  
  module.exports = userRole;
  