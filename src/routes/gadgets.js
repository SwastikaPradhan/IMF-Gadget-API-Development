const express = require("express");
const {
    getGadgets,
    createGadget,
    updateGadget,
    deleteGadget,
    selfDestruct,
}  = require("../controllers/gadgetsController");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.get("/",getGadgets);
router.post("/",createGadget);
router.patch("/:id",updateGadget);
router.delete("/:id",deleteGadget);
router.post("/:id/self-destruct",selfDestruct);

module.exports = router;