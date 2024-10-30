"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

// Добавить пользователя
export const addUser = async (formData) => {
  const { username, password, email, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (error) {
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

// Добавить продукт
export const addProduct = async (formData) => {
  const { title, price, stock, desc, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      price,
      stock,
      desc,
      color,
      size,
    });

    await newProduct.save();
  } catch (error) {
    throw new Error("Failed to add product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

// Удалить пользователя
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

// Обновить пользователя
export const updateUser = async (formData) => {
  const { id, username, password, email, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      password,
      email,
      phone,
      address,
      isActive,
      isAdmin,
    };

    console.log(updateFields);

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

// Обновить продукт
export const updateProduct = async (formData) => {
  const { id, title, price, stock, desc, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      price,
      stock,
      desc,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};
