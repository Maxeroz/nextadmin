import { User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (query) => {
  const regex = new RegExp(query, "i");

  try {
    await connectToDB();
    const users = await User.find({ username: { $regex: regex } });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};
