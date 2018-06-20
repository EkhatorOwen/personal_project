
const getMessages =(req,res)=>{
    const { id } = req.params;
    //console.log('id is ',id)
    req.app
        .get('db')
        .get_messages_user([id])
        .then(response=>res.status(200).json(response))

}

const addMessage =(req,res)=>{
    
    const { body } = req; //body of message
   // const { projId } = req.parmas; //id of project
    const { id } = req.session.user; //user id

    req.app.get('db')
            .add_message([body.title,body.content,id,body.projId,body.created_at])
            .then(response=> 
                req.app.get('db')
                        .get_messages_user([body.projId])
                        .then(data=> res.status(200).json(data))
            )
}

const deleteMessage =(req,res) =>{
     const { projid, messageid } = req.params;
    
    console.log(req.params);
    req.app
        .get('db')
        .delete_message([messageid])
        .then(response=>{
            req.app.get('db')
                    .get_messages_user([projid])
                    .then(data=> res.status(200).json(data))
        })
        .catch(err=>console.log(err))
}

const updateMessage=(req,res)=>{
    const { body } = req;
    console.log(body)
    req.app.get('db')
            .update_message([body.title,body.content,body.userId,body.id])
            .then(response=>{
                req.app.get('db')
                .get_messages_user([body.projId])
                .then(data=> res.status(200).json(data))

            })
}

module.exports={
    getMessages,
    addMessage,
    deleteMessage,
    updateMessage
}