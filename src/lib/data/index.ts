import prisma from "../prisma";


export async function fetchCategories() {
  try {
    
    const categories = await prisma.category.findMany();
    return categories
  }
  catch {
    throw new Error('Faild to fetch categories')
  }
}