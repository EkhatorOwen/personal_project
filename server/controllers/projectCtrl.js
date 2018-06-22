const deleteProject =(req, res)=>{

    const { id }= req.params;

    console.log(id)

    req.app.get('db')
            .delete_project([id])
             .then(response=>{
                 res.status(200).json('done')
             })
}

 const getProjectPictures =(req,res)=>{
     const { id } = req.params;
     req.app.get('db')
            .getProjectPictures([id])
            .then(respsone=> res.status(200).json(respsone))

 }


module.exports={
    deleteProject,
    getProjectPictures
}