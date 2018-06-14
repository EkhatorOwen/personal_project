let orgid, user_id;

const saveTeamLead = (req, res) => {
  console.log(req.body.jobTitle);
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

              req.app
                .get("db")
                .get_userid([req.user.authid])
                .then(uid => {
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
  const { id } = req.session.user;
  req.app
    .get("db")
    .get_orgid_org_user([id])
    .then(response => {
      console.log("org user id ", response[0].org_id);
      req.app
        .get("db")
        .get_projects([response[0].org_id])
        .then(project => {
          console.log(project);
          res.status(200).json(project);
        });
    });
};

const updateProfile = (req, res) => {
  const { body } = req;
  // console.log(req.session.user);
  const { id } = req.session.user;
  req.app
    .get("db")
    .update_user([body.name, body.jobTitle, body.img, req.user.id])
    .then(re => {
      req.app
        .get("db")
        .get_orgid_org_user([id])
        .then(response => {
          req.app
            .get("db")
            .update_teamname([body.teamName, response[0].id])
            .then(respon => res.status(200).json(respon));
        });
    });
};

const saveProject = (req, res) => {
  const { body } = req;
  const { id } = req.session.user;
  //console.log(body.details.name, body.details.desc, id);
  req.app
    .get("db")
    .get_orgid_org_user([id])
    .then(resp => {
      console.log(body.details.name, body.details.desc, resp[0].org_id);
      req.app
        .get("db")
        .insert_project([body.details.name, body.details.desc, resp[0].org_id])
        .then(response => res.status(200).json())
        .catch(err => res.status(200).json(err));
    })
    .catch(err => console.log(err));
};

module.exports = {
  saveTeamLead,
  getProjects,
  updateProfile,
  saveProject
};
