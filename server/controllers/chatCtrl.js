const getProjUsers=(req,res)=>{
    
    const { user } = req.session
    const { id } = req.session.user
        req.app.get('db')
                .getProjectNameImg([id])
                .then(response=>{

                let arr=   response.filter(element=>{
                    return element.img_url!= user.img_url
                })

                    res.status(200).json(arr)
                })
}



module.exports={
    getProjUsers
}