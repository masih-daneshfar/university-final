import * as session from "express-session";

const SessionMiddleware = session({
  secret: "my secret key",
  name: "auth-cookie",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 3600000,
    signed: false,
    // sameSite: "strict",
    // domain: "localhost",
    path: "/",
  },
});

export default SessionMiddleware;
