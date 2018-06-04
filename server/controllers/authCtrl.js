const Auth0Strategy = require('passport-auth0');

const auth0Strategy = new Auth0Strategy(
    {
        domain: process.env.DOMAIN,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/login',
        scope:'openid email profile'

    },
    (accessToken, refreshToken,extraParams, profile,done)=>{
       // console.log(profile);
        done(null, profile)
    }
)

const getUser = (req,res) =>{
    if(req.user)res.status(200).json(req.user)
    else res.status(403).json({message: 'Not logged In'})
}

const logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('http://localhost:3000/#/')
    })
}


module.exports ={
    auth0Strategy,
    logout,
    getUser

}