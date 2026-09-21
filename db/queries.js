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
const createFileQuery = async (name, size, path, foldersId) => {
  await prisma.files.create({
    data: {
      name,
      size,
      path,
      foldersId,
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
const getFolders = async (usersId) => {
  const folders = await prisma.folders.findMany({
    where: { usersId },
  });
  return folders;
};
const getFolderById = async (usersId, id) => {
  const folder = await prisma.folders.findFirst({
    where: { id, usersId },
  });
  return folder;
};
const getFilesByFoldersId = async (usersId, foldersId) => {
  const files = await prisma.files.findMany({
    where: {
      foldersId,
      folders: {
        usersId,
      },
    },
  });
  return files;
};
const getFileById = async (usersId, id) => {
  const file = await prisma.files.findFirst({
    where: {
      id,
      folders: {
        usersId,
      },
    },
  });
  return file;
};
const updateFolderQuery = async (usersId, id, name) => {
  const folder = await prisma.folders.findFirst({
    where: {
      id,
      usersId,
    },
  });
  if (!folder) {
    return null;
  }
  return await prisma.folders.update({
    where: { id },
    data: { name },
  });
};
const deleteFolderQuery = async (usersId, id) => {
  const folder = await prisma.folders.findFirst({
    where: {
      id,
      usersId,
    },
  });
  if (!folder) {
    return null;
  }
  await prisma.files.deleteMany({
    where: { foldersId: id },
  });
  return await prisma.folders.delete({
    where: { id },
  });
};
const deleteFileQuery = async (usersId, id) => {
  const file = await prisma.files.findFirst({
    where: {
      id,
      folders: {
        usersId,
      },
    },
  });
  if (!file) {
    return null;
  }
  return await prisma.files.delete({
    where: { id },
  });
};
export {
  createSignUpQuery,
  createFolderQuery,
  createFileQuery,
  getUserById,
  getUsername,
  getEmail,
  getIdentifier,
  getFolders,
  getFolderById,
  getFilesByFoldersId,
  getFileById,
  updateFolderQuery,
  deleteFolderQuery,
  deleteFileQuery,
};
