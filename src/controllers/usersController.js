const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.getUsers = async (req,res)=>{
    try{
        const users= await prisma.user.findMany({
            select:{
                id:true,
                username:true,
                firstname:true,
                lastname:true

            }
        });
        res.json(users);
    }
    catch (error){
        console.log("Error fetching users:",error);
        res.status(500).json({
            error:"Failed to fetch users",
        });
    }
};

exports.createUser=async(req,res) =>{
    try{
        const {username,password,firstname,lastname} = req.body;
        if(!username  || !password || !firstname || !lastname){
            return res.status(400).json({
                error:"All fields are required"
            });
        }

        const hasedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data:{username,password:hasedPassword,firstname,lastname},
        });
        res.status(201).json({
            message:"User created successfully",
            user:{
                id:newUser.id,
                username:newUser.username,
                firstname:newUser.firstname,
                lastname:newUser.lastname,
            
            }
        });

    }catch(error){
        console.error("Error creating user:",error);
        res.status(400).json({
            error:"Failed to create user"
        });
    }
}