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

//updating the transaction, adding new fields in the same transaction 
exports.updateTransactions = async (req, res)=>{
    try{
        const { id } = req.params;
        //parameter comes in the link

        //finding the transaction
        //transaction -> the specific transaction
        //Transaction -> the mongodb model 
        let transaction = await Transaction.findById(id);
        if(!transaction){
            return res.status(404).json({message:"Transaction not found"});
        }
        //check if the transaction is owned by the used sending the HTTP request
        if(transaction.user.toString()!==req.user){
            return res.status(401).json({message:"Not Authorised"});
        }

        //update with new fields
        transaction = await Transaction.findByIdAndUpdate(
            id,req.body,{new:true, runValidators:true}
        );
        res.json(transaction);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//deleting transaction
exports.deleteTransaction = async(req,res)=>{
    try{
        const{id} = req.params;
        const transaction = await Transaction.findById(id);
        if(!transaction){
            return res.status(404).json({message:"Transaction Not Found"})
        }
        //enrusing ownership (if transaction done by the requested user)
        if(transaction.user.toString()!== req.user){
            res.status(401).json({message:"Not Authorized"});
        }
        await transaction.deleteOne(); //deletes that transaction from the database
        res.json({message:"Transaction deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};