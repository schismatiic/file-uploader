import { prisma } from "../lib/prisma.js";
const createSignUpQuery = async (
  firstName,
  lastName,
  username,
  email,
  password,
) => {
  await prisma.users.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password,
    },
  });
};
const createFolderQuery = async (name, usersId) => {
  await prisma.folders.create({
    data: {
      name,
      usersId,
    },
  });
};
const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: { id },
  });
  return user;
};
const getUsername = async (username) => {
  const user = await prisma.users.findFirst({
    where: {
      username,
    },
  });
  console.log("getUsername:", user);
  return user;
};
const getEmail = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  console.log("getEmail:", user);
  return user;
};
const getIdentifier = async (identifier) => {
  const user = await prisma.users.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
    },
  });
  return user;
};
const getFolders = async () => {
  const folders = await prisma.folders.findMany();
  return folders;
};
const getFolderById = async (id) => {
  const folder = await prisma.folders.findUnique({
    where: { id },
  });
  return folder;
};
const updateFolderQuery = async (id, name) => {
  await prisma.folders.update({
    where: { id },
    data: { name },
  });
};
export {
  createSignUpQuery,
  createFolderQuery,
  getUserById,
  getUsername,
  getEmail,
  getIdentifier,
  getFolders,
  getFolderById,
  updateFolderQuery,
};
