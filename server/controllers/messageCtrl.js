
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

}

const updateMessage=(req,res)=>{
    
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