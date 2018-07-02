const getUser = (req, res) => {
  const { user } = req;
  const { id } = req.session.user;
 //console.log("user id is ", user.emails[0].value);
  req.app
    .get("db")
    .getUserByAuthid(user.emails[0].value)
    .then(response => {
      
        //console.log(response[0].job_title)
      //  console.log("response from the database is ",response[0])
              let obj = {
                id: id,
                name: response[0].name,
                jobTitle: response[0].job_title,
                email: response[0].email,
                orgName: response[0].org,
                teamName: response[0].team_name,
                img: response[0].img_url,
                isLead: response[0].lead,
                full_name: response[0].full_name
              };
              // console.log(obj)
              res.status(200).json(obj)
            })

          }


const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  logout,
  getUser
};
