



const getUser = (req,res) =>{
    if(req.user)res.status(200).json(req.user)
    else res.status(403).json({message: 'Not logged In'})
}

const logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('http://localhost:3000/')
    })
}


module.exports ={
    
    logout,
    getUser

}