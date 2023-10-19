const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Admin = db.admin;


const loginAdmin = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const usernameRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const secrteKey = process.env.JWT_SECRTE_KEY;
    if (userName && password) {
        console.log(userName, password);
        if (usernameRegex.test(userName) && passwordRegex.test(password)) {
            try {
                const admin = await Admin.findOne({
                    attributes: ["admin_id", "admin_password", "admin_username", "admin_status"]
                },
                    {
                        where:
                            { admin_username: userName },
                    })
                if (admin) {
                    const adminPassword = admin.admin_password;
                    const username = admin.admin_username;
                    const userId = admin.admin_id;
                    const userStatus = admin.admin_status;
                    const userData = { userId, username, userStatus };
                    const matchPassword = await bcrypt.compare(password, adminPassword);
                    if (matchPassword) {
                        const token = jwt.sign({ username, userId }, secrteKey, { expiresIn: "2h" })
                        res.cookie('token', token, { httpOnly: true });
                        return res.status(200).json({ success: true, message: "user login SuccesFully", token, userData })
                    } else {
                        return res.status(401).json({ success: false, message: "Incorrect password" })
                    };
                } else {
                    return res.status(404).json({ success: false, message: "User not found" })
                };
            } catch (error) {
                return res.status(400).json({ success: false, message: "User not found" })
            };
        } else {
            return res.status(401).json({ success: false, message: "Invalid Username" })
        };
    }
    else {
        return res.status(401).json({ success: false, message: "userName & password are required" })
    };
};

module.exports = { loginAdmin }