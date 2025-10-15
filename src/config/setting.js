import dotenv from 'dotenv'
dotenv.config();
 export default{
       port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    frontEndUrl: process.env.FRONT_END_URL,
 secrets: {
        jwtSecretKeyAdmin: process.env.JWT_SECRET_ADMIN,
        jwtSecretKeyUser: process.env.JWT_SECRET_USER,
        jwtSecretKey: process.env.JWT_SECRET,
        jwtSecretKeyUser: process.env.jwtSecretKeyUser,

        jwtTokenExp: process.env.JWT_TOKEN_EXPIRE,
        jwtRefreshExp: process.env.JWT_REFRESH_EXPIRE,
        jwtForgotExp: process.env.JWT_FORGOT_EXPIRE,
    }
    }