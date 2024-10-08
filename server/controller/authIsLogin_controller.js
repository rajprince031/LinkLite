async function authIsLogin (req,res){
    try{
        const{user} = req;
        console.log('user details only : ',user)
        return res.status(200).json({status:true,user})
    }catch(err){
        return res.status(500).json({err:"Internal Server Error"});
    }
}
module.exports = {authIsLogin}