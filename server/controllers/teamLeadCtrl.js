

const saveTeamLead =(req,res) =>{
    console.log(req.user)
   // console.log(req.sessions)
    
   // console.log(req)
   const { details } = req.body;
  // console.log(details);
    // req.app
    //     .get('db')
    //     .save_teamlead([req.sessi])
    //     .then(response=>req.redirect('http://localhost:3000/#/profile'))
}


module.exports={
    saveTeamLead 
}