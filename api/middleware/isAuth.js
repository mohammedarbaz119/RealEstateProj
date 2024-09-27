import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized no token" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
    } catch (err) {
      res.clearCookie("token");
      return res.status(401).json({ message: "Unauthorized" });
    }    
    next();
  }