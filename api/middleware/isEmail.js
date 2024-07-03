const isEmail = (input) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
   const validateUsernameOrEmail = (req, res, next) => {
    const { usernameOrEmail } = req.body;
  
    if (!usernameOrEmail) {
      return res.status(400).json({ message: "Username or email is required" });
    }
  
    req.body.isEmail = isEmail(usernameOrEmail);
  
    if (req.body.isEmail) {
      req.body.email = usernameOrEmail;
    } else {
      req.body.username = usernameOrEmail;
    }
  
    next();
  };
  export default validateUsernameOrEmail;