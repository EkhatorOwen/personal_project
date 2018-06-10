let orgid, user_id;

const saveTeamLead = (req, res) => {
  console.log(req.session.user);
  req.app
    .get("db")
    .save_teamlead([req.body.jobTitle, req.user.authid])
    .then(response =>
      req.app
        .get("db")
        .insert_orgname_teamname([req.body.companyName, req.body.teamName])
        .then(response =>
          req.app
            .get("db")
            .get_orgid([req.body.companyName])
            .then(response => {
              orgid = response;
              console.log("orgid ", orgid);
              req.app
                .get("db")
                .get_userid([req.user.authid])
                .then(uid => {
                  console.log("user id", uid);
                  req.app
                    .get("db")
                    .insert_orgid_org_user([req.session.user.id, orgid[0].id])
                    .then(response =>
                      res.redirect(
                        "http://localhost:3000/#/dashboard/viewproject"
                      )
                    )
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err));
};

const getProjects = (req, res) => {
  req.app
    .get("db")
    .get_project()
    .then(response => res.status(200).json(response));
};

module.exports = {
  saveTeamLead,
  getProjects
};
