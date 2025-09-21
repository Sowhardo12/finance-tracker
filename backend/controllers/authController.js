const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
    try{
        const { name, email, password } = req.body;
        //comes from the JSON request comes from post request maybe
        const userExists = await User.findOne({email});
        //check if user already exists 
        if(userExists) return res.status(400).json({message: 'User already exists'});
        //hashing password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //saving new user
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();

        res.status(201).json({message:'user created successfully'});
    }catch(err){
        //error part handeling
        res.status(500).json({error:err.message});
    }
};

//login
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user)return res.status(400).json({message:'user not found invalid credentials'});
        //password comparing
        const matched = await bcrypt.compare(password,user.password);
        //compares the given password with stored password (both done in hashed form)
        if(!matched)return res.status(400).json({message:'invalid credentails'});
        //create token
        const token = jwt.sign(
            {id:user._id}, //payload
            process.env.JWT_SECRET, // secret
            {expiresIn: '1h'} //options 
        );
        res.json({token, user:{id:user._id,name:user.name,email:user.email}});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};