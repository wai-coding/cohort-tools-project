const router = require("express").Router();
const UserModel = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");

//GET /api/users/:id (protected) WORKING!!!
router.get("/:id", isAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ errorMessage: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Error retrieving user" })
    }
});

module.exports = router;