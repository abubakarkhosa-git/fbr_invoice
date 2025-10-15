import User from "./user.model.js"




export const getUserByConditions = async (condition, removeFields = "") => {
  return await User.findOne({ ...condition }).select(removeFields); 
};


export const updatesUser = async (data, next) => {
  return await User.findOneAndUpdate({ _id: data.userId }, data);
};

export const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export const getUserByResetToken = async (token) => {
  return await User.findOne({
    resetPasswordToken: token,
    resetTokenExpiry: { $gt: Date.now() }, // Check if token is not expired
  });
};