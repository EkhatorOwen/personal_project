const sgMail = require('@sendgrid/mail')
var twilio = require('twilio')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var accountSid = process.env.TWILIO_ACCOUNT_SID 
var authToken = process.env.TWILIO_AUTH_TOKEN;   


var client = new twilio(accountSid, authToken);


addPeople =( req, res)=>{
    const { data } = req.body;
    const { user } = req.session;
    

    const msg ={
        to: `${data.email}`,
        from: `${user.email}`,
        subject: 'Collaborate!',
        text: `You have been added to ${data.projectName} by ${user.name}`,
        html: `You have been added to ${data.projectName} by ${user.name}, <strong> click <a href="http://localhost:3000/#/">here to join</a></strong>`
    }
    sgMail.send(msg)
        console.log('notify? ',data.notifyPhone)
        if(data.notifyPhone){
            client.messages.create({
            body: `You have been added to ${data.projectName} by ${user.name}` ,
            to: '+19086624871',  // Text this number
            from: '+12019925556' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid))
            }

    req.app.get('db')
            .addUserByEmail([data.email,data.phone])
            .then(userid=>{
                console.log(userid);

                req.app.get('db')
                        .insert_proj_user([userid[0].id,data.projid])
                        .then(respone=>{
                            req.app.get('db')
                                    .get_orgid_org_user([user.id])
                                    .then(orgid=>{
                                        console.log(orgid)
                                        req.app.get('db')
                                                .insert_orgid_org_user([userid[0].id,orgid[0].org_id])
                                                .then(response=>{
                                                    res.status(200).json(response)
                                                })
                                    })
                        
                        })
           
                    })


}

getPeopleProject = (req,res) =>{
    const { id } = req.session.user;
//console.log('user id is ',id)
    const { params } = req;
    req.app.get('db')
            .getPeopleProject([params.id])
            .then(response=>{
               // console.log('response from query is',response)
                let arr = response;
               let index = arr.findIndex(element=> element.id===id)
              // console.log('index is ', index)
               let newArr = arr.splice(index,1)
              // console.log('new arr created is',arr)
               res.status(200).json(arr)
            })
            .catch(err=>console.log(err))
}

deletePeople =(req,res) =>{
    const { id } = req.session.user;
        const { user_id,proj_id } = req.params;
        req.app.get('db')
                .deletePeople([user_id,proj_id])
                .then(response=>{  
                    req.app.get('db')
                    .getPeopleProject([proj_id])
                    .then(response=>{
                       // console.log('response from query is',response)
                        let arr = response;
                       let index = arr.findIndex(element=> element.id===id)
                      // console.log('index is ', index)
                       let newArr = arr.splice(index,1)
                      // console.log('new arr created is',arr)
                       res.status(200).json(arr)
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
}

module.exports={
    addPeople,
    getPeopleProject,
    deletePeople
}