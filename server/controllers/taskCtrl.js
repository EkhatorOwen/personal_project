const sgMail = require('@sendgrid/mail')
var twilio = require('twilio')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var accountSid = process.env.TWILIO_ACCOUNT_SID 
var authToken = process.env.TWILIO_AUTH_TOKEN;   


var client = new twilio(accountSid, authToken);

const assignTask = (req,res) =>{
    const { body } = req;
    const { proj_id }= req.params;
    const { user } = req.session;
 
    // console.log('body from saved task is ',body)
    // console.log('the project id is ',proj_id)
    //send a mail to user
    const msg ={
        to: `${body.email}`,
        from: `${user.email}`,
        subject: 'Collaborate!',
        text: `Hi ${body.personName}, You have been assigned a task ${body.name} by ${user.name} in project ${body.projName}`,
        html: `Hi ${body.personName}, You have been assigned a task ${body.name} by ${user.name} in project ${body.projName}`
    }
    sgMail.send(msg)
    
    if(body.notifyPhone){
        client.messages.create({
            body: `Hi ${body.personName}, You have been assigned to task ${body.name} by ${user.name} in project ${body.projName}` ,
            to: '+19086624871',  // Text this number
            from: '+12019925556' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
    }
    //save the task
    req.app.get('db')
            .save_task([body.name,body.desc,body.userid,body.assigned_date,proj_id])
            .then(response=>{
               res.status(200).json('all done!')          
            })
   
}

const getTask =(req,res)=>{
    const { proj_id }= req.params;
    req.app.get('db')
            .getTaskProj([proj_id])
            .then(response=>{
                res.status(200).json(response)
            })
}

const deleteTask =(req,res)=>{
    const { task_id } = req.params;
    req.app.get('db')
            .deleteTask([task_id])
            .then(response=>{
                res.status(200).json(response)
            })
            .catch(err=>console.log(err))
}

const getUserTask = (req,res)=>{
        const { id } = req.session.user
        const { proj_id } = req.params
        req.app.get('db')
                .getUserTask([id,proj_id])
                .then(respone=>{
                    res.status(200).json(respone)
                })
}

const updateTask =(req,res)=>{
    const { id } = req.session.user
    const { task_id } = req.params;
    const { body } = req;
    
    let teamLead;

    req.app.get('db')
            .get_teamlead([task_id])
            .then(response=>{
        
    const msg ={
        to: `${response[0].email}`,
        from: `${user.email}`,
        subject: 'Collaborate!',
        text: `Hi ${response[0].name}, Task assigned to ${user.name} has been marked as completed. Log into your account to view`,
        html: `Hi ${response[0].name}, Task assigned to ${user.name} has been marked as completed. Log into your account to view`
    }
    sgMail.send(msg)
            })

    
    req.app.get('db')
            .updateTask([body.status,body.date,task_id])
            .then(respone=>{
                req.app.get('db')
                        .getUserTask([id,body.proj_id])
                        .then(response=>{
                            res.status(200).json(response)
                        })
            })
}

module.exports={
    assignTask,
    getTask,
    deleteTask,
    getUserTask,
    updateTask
}