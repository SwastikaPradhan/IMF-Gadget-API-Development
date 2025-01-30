const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getUsers, createUser } = require("../controllers/usersController.js");


router.post('/signup', createUser);


router.post('/login', async (req, res) => {
    console.log("Request Body:",req.body);
    try {
        const { password, username } = req.body;

       
        if (!password || !username) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required.",
            });
        }

      
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

       
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist. Please register.",
            });
        }

       
        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(password, hashedPassword);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please enter the correct username and password.",
            });
        }

      
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

      
        res.status(200).json({
            success: true,
            message: "Signin Successful.",
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error);

       
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
});


router.get('/users', getUsers);

module.exports = router;


