
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { validateSignInInputs } from "./user.validation.js"
import { getUserByConditions, updateUser } from "./user.service.js";
import User from "./user.model.js";
import  { generateToken,generateRefreshToken } from "../../utils/token.js"
import ApiError from "../../utils/apiError.js";
import { sendForgotPassEmail } from "../../utils/nodemail.js";




// ============================ LOGIN ============================
export const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // ✅ 1. Validate Inputs
    // const validateResult = validateSignInInputs(req.body);
    // if (validateResult?.error) {
    //   return next(ApiError.badRequest(validateResult.msg, "Login"));
    // }

    // ✅ 2. Check if user exists
    let user = await getUserByConditions({ email });

    if (!user) {
      // New user (first-time login)
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
    } else {
      // Existing user: verify password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return next(ApiError.badRequest("Invalid password", "Login"));
      }
    }

    // ✅ 3. Generate Tokens
    const payload = { _id: user._id, email: user.email, username: user.username };
    const accessToken = await generateToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    // ✅ 4. Save token to DB
    user.token = accessToken;
    await user.save();

    // ✅ 5. Response (no password)
    return res.status(200).json({
      isSuccess: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return next(ApiError.internal(error, "Login"));
  }
};

// ============================ FORGOT PASSWORD ============================
export const forgotpassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(ApiError.badRequest("User not found, please login first"));
    }

    // Generate reset token and expiry
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await updateUser(user._id, {
      resetPasswordToken: resetToken,
      resetTokenExpiry: resetTokenExpiry,
    });

    await sendForgotPassEmail(user.email, resetToken);

    return res.status(200).json({
      isSuccess: true,
      message: "Password reset email sent to your email",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return next(ApiError.internal(error, "Forgot Password"));
  }
};

// ============================ RESET PASSWORD ============================
export const resetpassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, newpassword } = req.body;
   

    if (newpassword !== password) {
      return next(ApiError.badRequest("New Password and Confirm Password do not match"));
    }

    const user = await getUserByResetToken(token);
    if (!user) {
      return next(ApiError.badRequest("Invalid or expired token"));
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return next(ApiError.internal(error, "Reset Password"));
  }
};

// ============================ CHANGE PASSWORD ============================
export const changepassword = async (req, res, next) => {
  try {
    const { password, newpassword } = req.body;
    const user = await getUserByConditions({ _id: req.user?._id });

    if (!user) {
      return next(ApiError.badRequest("User not found, please login first"));
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(ApiError.badRequest("Invalid current password"));
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await updateUser(user._id, { password: hashedPassword });

    return res.status(200).json({
      isSuccess: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    return next(ApiError.internal(error, "Change Password"));
  }
};

export default { login, forgotpassword, resetpassword, changepassword };
