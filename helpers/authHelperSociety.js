const jwt=require('jsonwebtoken')
const Society=require('../models/society')

const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWTSECRET)
        const society=await Society.findOne({
            _id: decoded.society.id,
            'tokens.token': token
        })
        if(!society){
            throw new Error()
        }
        req.token=token
        req.society=society
        next()
    }catch(e){
        res.status(401).send({error: 'Please Authenticate'})
    }
}

module.exports=auth