"use server";

import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "@/app/auth/definitions";
import { createSession, deleteSession } from "@/app/auth/stateless-session";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function signup(
  name: string,
  email: string,
  password: string,
  roleId: number
): Promise<void> {
  // 3. Check if the user's email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error(
      "Email already exists, please use a different email or login."
    );
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Provider's API
  const data = await prisma.user.create({
    data: {
      username: name,
      email,
      password: hashedPassword,
      roleId,
    },
  });

  const user = data;

  if (!user) {
    throw new Error("An error occurred while creating your account.");
  }

  // 4. Create a session for the user
  const userId = user.id.toString();
  await createSession(userId);
}

export async function signupWithFormData(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    roleId: formData.get("roleId"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password, roleId } = validatedFields.data;

  // 3. Check if the user's email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      message: "Email already exists, please use a different email or login.",
    };
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Provider's API
  const data = await prisma.user.create({
    data: {
      username: name,
      email,
      password: hashedPassword,
      roleId,
    },
  });

  const user = data;

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // 4. Create a session for the user
  const userId = user.id.toString();
  await createSession(userId);
}

export async function login(email: string, password: string): Promise<void> {
  // 2. Query the database for the user with the given email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If user is not found, return early
  if (!user) {
    throw new Error("Not found!");
  }
  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  // If the password does not match, return early
  if (!passwordMatch) {
    throw new Error("Invalid password!");
  }

  // 4. If login successful, create a session for the user and redirect
  const userId = user.id.toString();
  await createSession(userId);
}

export async function loginWithFormData(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const errorMessage = { message: "Invalid login credentials." };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  const user = await prisma.user.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });
  console.log("user:", user);

  // If user is not found, return early
  if (!user) {
    return errorMessage;
  }
  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password
  );

  // If the password does not match, return early
  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. If login successful, create a session for the user and redirect
  const userId = user.id.toString();
  await createSession(userId);
}

export async function logout() {
  deleteSession();
}
