const saveTeamLead = (req, res) => {
  console.log("user object", req.user);
  // console.log(req.sessionStore.sessions)

  // console.log(req)
  // console.log(req.session)

  // console.log(req)
  const { details } = req.body;
  // console.log(details);
  // req.app
  //     .get('db')
  //     .save_teamlead([req.sessi])
  //     .then(response=>res.redirect('http://localhost:3000/#/profile'))
};

module.exports = {
  saveTeamLead
};
