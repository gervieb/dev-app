import User, { DocumentUser } from "../models/user";

export const createGoogleUser = async (accessToken: string,
    refreshToken: string,
    profile: any) => {
    try {
        const user: DocumentUser = await User.findOne({
            email: profile?._json?.email,
        });
        if (user) {
            const tokens: any = user.tokens;
            let index = tokens.findIndex((e) => e.provider === "google");
            if (index === -1) {
                tokens.push({
                    provider: "google",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    salt: null,
                });
            } else {
                tokens[index].accessToken = accessToken;
                tokens[index].refreshToken = refreshToken;
            }
            user.active = true;
            user.tokens = tokens.map((token) => token);
            user.username =
                typeof user.username !== "undefined"
                    ? user.username
                    : `${profile.name.givenName}${
                          profile.name.familyName
                      }${Math.floor(1000 + Math.random() * 9000)}`
                          .replace(/\s+/g, "")
                          .toLowerCase();
            user.profile.img = user.profile.img || profile._json.picture;
            user.last_activity = new Date();
            user.active = true;

            await user.save();
            return user;
        } else {
            const newUser: any = {};
            let tokens = [];
            let newProfile: any = {};
            newUser.roles = ["member"];
            newUser.active = true;
            newUser.newUser = true;
            newUser.username = `${profile.name.givenName}${
                profile.name.familyName
            }${Math.floor(1000 + Math.random() * 9000)}`
                .replace(/\s+/g, "")
                .toLowerCase();
            newUser.email = profile.emails[0].value;
            tokens.push({
                provider: "google",
                accessToken: accessToken,
                refreshToken: refreshToken,
                salt: null,
            });
            newUser.tokens = tokens;
            newProfile.first_name = profile.name.givenName;
            newProfile.last_name = profile.name.familyName;
            newProfile.img = profile._json.picture;
            newUser.profile = newProfile;
            const user = await User.create(newUser);
            return user;
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
};
