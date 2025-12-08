/* eslint-disable import/no-default-export */
/* eslint-disable unicorn/prefer-export-from */
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT } from '../config/jwt.config';
import { Users } from '../repositories';

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT.JWT_SECRET,
  },
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (payload, done) => {
    const email = payload.email;
    const user = await Users.findUserByEmail(email);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  },
);

passport.use(jwtStrategy);

export default passport;
