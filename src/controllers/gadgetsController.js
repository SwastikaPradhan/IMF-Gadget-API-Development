const {PrismaClient} = require("@prisma/client");
const generateCodename =  require("../utils/codenameGenerator");

const prisma = new PrismaClient();
exports.getGadgets = async (req,res)=>{
    const {status} = req.query;

    try{

        const gadgets = await prisma.gadget.findMany({
            where:status ? {status} : {},
        });

        console.log(gadgets);
    
        const gadgetsWithProbability = gadgets.map((gadget)=>({
            ...gadget,
            missionSuccessProbability: `${Math.floor(Math.random()*100)+1}%`,
        }));
        res.json(gadgetsWithProbability);
    }

    catch(error){
        console.error("Error fetching gadgets:",error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}    

   

exports.createGadget = async(req,res) =>{
    try{

        const {name}=req.body;
        const codename= generateCodename();
        const gadget = await prisma.gadget.create({
        data:{
            name:name || codename,
            codename:codename
        },
    });

    res.status(201).json({
        success:true,
        data:gadget
    });

    }catch(error){
        console.error("Error creating gadgets:",error);
        res.status(500).json({
            success:false,
            message:"Internal Error"
        })
    }
    

};

exports.updateGadget = async (req,res)=>{
    try{
        const {id} = req.params;
        const {name,status} = req.body;

        const updatedgadget = await prisma.gadget.update({
           where :{id},
           data:{name,status},
    });
    res.json({
        success:true,
        data:updatedgadget
    });
    res.json({
        success:true,
        data:updatedgadget
    });

    }catch(error){
        console.log("Error updating gadgets:",error);
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
    
};

exports.deleteGadget = async (req,res) =>{
    const {id} = req.params;
    try{
        const gadget = await prisma.gadget.update({
            where:{id},
            data:{status:"Decommissioned",
                decommissionedAt: new Date()
            },
        });
        res.json(gadget);

    }catch{
        res.status(404).json({
            error:"Gadget not found."
        })
    }
    
};


//self-destruct a gadget
exports.selfDestruct = async (req, res) => {
    try {
        const { id } = req.params;

        const confirmationCode = Math.floor(1000 + Math.random() * 9000);
        console.log(`Self-destruct confirmation code: ${confirmationCode}`);

        const updated = await prisma.gadget.update({
            where: { id },
            data: { status: "Destroyed" },
        });

        if (!updated) {
            return res.status(404).json({
                message: "Gadget not found",
            });
        }

        res.json({
            message: "Gadget self-destructed",
            confirmationCode,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Error initiating self-destruct",
            error: error.message,
        });
    }
};