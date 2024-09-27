async function authIsLogin (req,res){
    try{
        return res.status(200).json({status:true})
    }catch(err){
        return res.status(500).json({err:"Internal Server Error"});
    }
}
module.exports = {authIsLogin}