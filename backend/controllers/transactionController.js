const Transaction = require("../models/Transaction");

//adding a new transaction in mongodb database
exports.addTransaction = async (req,res)=>{
    try{
        const {type, category, amount, date, notes} = req.body;
        //comes from the HTTP request in JSON format 
        const transaction = new Transaction({
            user:req.user,
            type,category,amount,date,notes
        });
        await transaction.save();
        res.status(201).json(transaction);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//getting all transactions for logged in user
exports.getTransactions = async (req,res)=>{
    try{
        const transactions = await Transaction.find({user: req.user}).sort({date: -1});
        //sorting by dates 1-> ascending order -1: descending order
        res.json(transactions);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};