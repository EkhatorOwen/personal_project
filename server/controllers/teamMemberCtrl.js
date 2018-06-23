const saveJobTitle =(req,res)=>{
    const { id } = req.session.user;
    const { body } = req;
   // console.log(id)
    req.app.get('db')
        .save_jobTitle([body.jobTitle,id])
        .then(response=>{
            res.status(200).json('Done')
        })
}


module.exports={
    saveJobTitle
}