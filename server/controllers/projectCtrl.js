const deleteProject =(req, res)=>{

    const { id }= req.params;

    console.log(id)

    req.app.get('db')
            .delete_project([id])
             .then(response=>{
                 res.status(200).json('done')
             })
}


module.exports={
    deleteProject
}