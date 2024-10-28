import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (query, page) => {
  const regex = new RegExp(query, "i");

  const ITEM_PER_PAGE = 2;

  try {
    await connectToDB();
    const count = await User.countDocuments({ username: { $regex: regex } });

    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchProducts = async (query, page) => {
  const regex = new RegExp(query, "i");

  const ITEM_PER_PAGE = 2;

  try {
    await connectToDB();
    const count = await Product.countDocuments({
      title: { $regex: regex },
    });

    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};
