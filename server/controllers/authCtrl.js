const getUser = (req, res) => {
  const { user } = req;
  const { id } = req.session.user;
  // console.log("req.user is ", user);
  req.app
    .get("db")
    .getUserByAuthid([user.id])
    .then(response => {
      req.app
        .get("db")
        .get_orgid_org_user([response[0].id])
        .then(resp => {
          //console.log(resp);
          req.app
            .get("db")
            .get_orgname_teamname([resp[0].org_id])
            .then(re => {
              let obj = {
                id: id,
                name: response[0].name,
                jobTitle: response[0].job_title,
                email: response[0].email,
                orgName: re[0].name,
                teamName: re[0].team_name,
                img: response[0].img_url
              };
              // console.log("object ", obj);
              res.status(200).json(obj);
            });
        });
    });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/");
  });
};

module.exports = {
  logout,
  getUser
};
