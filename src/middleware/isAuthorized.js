import { MESSAGES } from "../constant/index.js";
const isAuthorized = async (req, res, next) => {
  try {
    const bearer = req?.headers?.authorization;  //Bearer check krta ha header mae authorization ha ya ni
    if (!bearer) {
      res.status(404);
      return next(apiError.badRequest(MESSAGES.AUTHORIZATION_INVALID, 'isAuthorized'));
    }

    const token = bearer.split(' ')[1] || ''; //ye line beare k bad ka token nikalti ha agr token invalid ha tou ye error dae ga
    if (!token) {
      return next(apiError.badRequest(MESSAGES.AUTHORIZATION_TOKEN_NOT_FOUND, 'isAuthorized'));
    }

  
    const decodedToken = jwt.decode(token); //yaha token ko decode kia jata ha basic info nikali jati ha jesay email, password wager
    if (!decodedToken || !decodedToken.role) {
      return next(apiError.badRequest(MESSAGES.TOKEN_INVALID, 'isAuthorized'));
    }

  
    const decodeUser = await verifyJwtToken(token, decodedToken.role); //yaha verification hoti ha koi scret key invalid tou ni epxire tou ni hoya token

    if (!decodeUser) return next(apiError.badRequest(MESSAGES.TOKEN_NOT_VERIFIED, 'isAuthorized'));

    const email = decodeUser?.email; //agr token verigy ho jai tou us mae sae email nikali jati ha
    if (!email) return next(apiError.badRequest(MESSAGES.EMAIL_NOT_FOUND, 'isAuthorized'));

  
    const user = await UserModel.findOne({ emailAddress: email }); //ab database ko check kia jata ha kia email wala user exist krta ha ya ni
    if (!user) {
      return next(apiError.badRequest(MESSAGES.USERNAME_NOT_FOUND, 'isAuthorized'));
    }

    req.userId = new mongoose.Types.ObjectId(user?._id);
    req.user = user;
    req.userRole = user?.role;
    next();
  } catch (error) {
    console.log('Error:', error);
    return next(apiError.badRequest(error?.message === 'jwt expired' ? MESSAGES.TOKEN_EXPIRED : MESSAGES.TOKEN_INVALID, 'verifyJwtToken'));
  }
};

export default isAuthorized;