const userSchema = require('../model/userModelSchema');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const sendMail = require('../service/emailService')
const randomEmail = require('random-email')

// api for user signup
 const signUp = async(req, res)=>{
    const userDetail = new userSchema(req.body);
    const isEmailExist = await userSchema.findOne({
        userEmail:req.body.userEmail
    })
    if(isEmailExist)
    {
        res.status(409).json({
            success : 'failure',
            message : 'User with this email is already register.'
        })
    }
    else{
        try{
            const salt = await bcrypt.genSalt(10);
            userDetail.password = await bcrypt.hash(req.body.password, salt);
            // const filePath = `/upload/${req.file.filename}`;
            // userDetail.profilepic = filePath;
            await userDetail.save();
            res.status(201).json({
                success : 'success',
                message : 'Signup completed.'
            })
        }catch(err){
            res.status(400).json({
                success : 'failure',
                message : 'Error occured '+err.message
            })
        }
    }
 }

 const signIn = async (req, res) => {
        try {
            const { userEmail, password } = req.body;
            if (userEmail && password) {
                const userData = await userSchema.findOne({ userEmail: userEmail });
                if (userData != null) {
                    const isMatch = await bcrypt.compare(password, userData.password);
                    if (userData.userEmail === userEmail && isMatch) {
                        //Generate jwt
                        const token = jwt.sign({ userId: userData._id },
                            process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                        return res.status(200).send({
                            success: "success",
                            message: "SignIn Success",
                            "userDetail": userData,
                            token: token,
                        });
                    } else {
                        res.status(401).send({
                            success: "failure",
                            message: "Invalid credentials."
                        });
                    }
                } 
            }
    
        } catch (err) {
            res.status(400).json({
            success : 'failure',
            message :'Error message'+err.message
        })
        }
    }

    const resetPasswordEmail = async (req, res) => {
        try{
            const isEmailExist = await userSchema.findOne({userEmail:req.body.userEmail})
            console.log(isEmailExist)
            if(isEmailExist){
                const secret = isEmailExist._id + process.env.JWT_SECRET_KEY;
                const token = await jwt.sign({userId : isEmailExist._id}, secret, {
                    expiresIn : "5d"})
                    console.log("token",token)
                    console.log("1")
                   await sendMail.sendMailer(req.body.userEmail,token,isEmailExist._id)
                res.status(200).json({
                    success : 'success',
                    message : 'Email sent successfully.',
                    token : token,
                    
                })
            }else{
                res.status(401).json({
                    success : 'failure',
                    message : 'Invalid credentials'
                })
            }
        }
        catch(err){
            res.status(400).json({
                success : 'failure',
                error : "Error occured " + err.message
            })
        }
    }

    const userPasswordReset = async(req, res)=>{
        const {id, token} = req.params;
        const {newPassword, confirmPassword} = req.body;
        try{
            const checkUser = await userSchema.findById(id);
            if(checkUser){
                const secretKey = checkUser._id + process.env.JWT_SECRET_KEY;
                jwt.verify(token, secretKey);
                if(newPassword === confirmPassword)
                {
                    const salt = await bcrypt.genSalt(10);
                    const password = await bcrypt.hash(confirmPassword, salt);
                    await userSchema.findByIdAndUpdate(checkUser._id, {
                        $set: {password : password},
                    })
                    res.status(202).json({
                        success : 'success',
                        message : "Password updated successfully."
                    })
                }else{
                    res.status(403).json({
                        success : 'failure',
                        message : "New password and confirm password does not match."
                    })
                }
                }else{
                    res.status(409).json({
                        success : 'failure',
                        message : 'Invalid credential.'
                    })
                }
            }
        catch(err){
            res.status(400).json({
                success : 'failure',
                message : 'Error occured '+err.message
            })
        }
    }

 module.exports = {
    signUp,
    signIn,
    resetPasswordEmail,
    userPasswordReset
 }
 