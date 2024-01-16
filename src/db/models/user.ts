import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

export const User = mongoose.model("User", UserSchema);

export const getUsers = async () => {
  return await User.find();
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select(
    "+authentication.password +authentication.salt +authentication.sessionToken"
  );
};

export const getUserBySessionToken = async (sessionToken: string) => {
  return await User.findOne({
    "authentication.sessionToken": sessionToken,
  });
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async (values: Record<string, any>) => {
  const user = new User(values);
  await user.save();
  return user;
};

export const deleteUserById = async (id: string) => {
  return await User.findOneAndDelete({ _id: id });
};

export const updateUserById = async (
  id: string,
  values: Record<string, any>
) => {
  return await User.findByIdAndUpdate(id, values);
};
