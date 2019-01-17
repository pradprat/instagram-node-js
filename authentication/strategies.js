import passport from 'passport';
import Instagram from 'passport-instagram';

export function instagram(){
  const InstagramStrategy = Instagram.Strategy; 

  var access = {
    clientID: "09ae4f7c9c80438abd686f25bb3b4fc1",
    clientSecret: "d491903ac915483ea63baad8434fa7b2",
    callbackURL: "http://localhost:3000/auth/instagram/callback"
};
  passport.use(
    new InstagramStrategy
    (access, (accessToken, refreshToken, profile, done) => {
      let user = {};
      user.accessToken = accessToken;
      user.name = profile.displayName;
      user.homePage = profile._json.data.website;
      user.image = profile._json.data.profile_picture;
      user.bio = profile._json.data.bio;
      user.media = `https://api.instagram.com/v1/users/${profile.id}/media/recent/?access_token=${accessToken}&count=9`
      done(null, user)
    })
  )
}