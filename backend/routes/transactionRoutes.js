const express = require('express');
const {
        addTransaction,
        getTransactions,
        updateTransactions,
        deleteTransaction
      } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware,addTransaction);
router.get("/",authMiddleware,getTransactions);
router.put("/:id",authMiddleware,updateTransactions);
router.delete("/:id",authMiddleware,deleteTransaction);
//in both cases, the authMiddleware runs first, checks the JWT token and attaches the req.user
//the req.user then used to create transaction entry with that user

module.exports = router;