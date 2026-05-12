import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import { IUser } from "../../types/user.types";
import { generateToken } from "./auth.service";

//============== user register service ========

export const userRegisterService = async (body: IUser) => {
  const { name, email, password, role } = body;

  // existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email already exists",
    });
  }

  //=============== hash password ==================

  const hashedPassword = await bcrypt.hash(password, 10);
  let newRole = role;
  if (!role) {
    newRole = "Employee";
  }

  //================== create user ==================

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: newRole,
  });

  return {
    success: true,
    user,
  };
};

//================ login service ==============

export const userLoginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { status: false, message: "User Not Found" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { status: false, message: "Email or password is incorrect!" };
  }

  const token = generateToken(user._id.toString());

  return {
    status: true,
    token,
  };
};

// =============== all users data (Restricted for emplyee only admin and manager can see all user )=====

export const allUser = async (page: number, limit: number, name: string) => {
  const query: {
    name?: {
      $regex: string;
      $options: string;
    };
  } = {};

  if (name) {
    query.name = {
      $regex: name,
      $options: "i",
    };
  }

  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .select({ password: 0 });

  const totalUsers = await User.countDocuments(query);

  const response = {
    status: true,
    data: users,
    pagination: {
      total: totalUsers,
      page: page,
      limit: limit,
    },
  };

  return response;
};
