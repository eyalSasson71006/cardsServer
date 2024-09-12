const auth = (req,res,next) => {
    if(req.header("x-auth-token")){
        console.log("This user is authenticated");
    }else{
        console.log("This user is NOT authenticated");
        res.status(401).send("User is not authenticated - please login first")
    }
}

module.exports = auth