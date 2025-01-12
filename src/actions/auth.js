"use server";
import dbConnect from "@/dbConnect/dbConnect";
import { createSession, deleteSession } from "@/lib/session";
import User from "@/models/Users";

export const login = async (formData) => {
  const errorMessage = {
    error: "Invalid username or password",
  };

  await dbConnect();

  const { email, password } = formData;
  if (!email || !password) {
    return errorMessage;
  }

  const user = await User.findOne({ username: email });

  if (!user) {
    return errorMessage;
  }

  const passwordMatch = password === "123465";
  if (!passwordMatch) {
    return errorMessage;
  }
  const userId = user._id.toString();
  await createSession(userId);
};

export async function logout() {
  deleteSession();
}
