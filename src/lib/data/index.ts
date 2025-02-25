import prisma from "../prisma";

export async function getPosts() {
  return await prisma.post.findMany();
}
