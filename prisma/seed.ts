// import { createProduct } from "@/lib";
import { productType } from "@/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Mighty Super Cheesecake",
    description:
      "A creamy and delicious cheesecake topped with fresh berries and a drizzle of berry sauce. This indulgent dessert is perfect for any occasion and will satisfy your sweet tooth cravings.",
    price: 8.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741688453/food-app/gnz3xfmfgwjp56u5uq3j.jpg",
    categoryId: "category-1",
    prepTime: 45,
    rating: 5,
    ingredients: [
      "Cream Cheese",
      "Sugar",
      "Eggs",
      "Vanilla Extract",
      "Graham Cracker Crust",
      "Fresh Berries",
    ],
    nutritionalInfo: ["calories: 150", "fat: 8", "carbs: 12", " protein: 6"],
  },
  {
    name: "Classic Spaghetti Bolognese",
    description:
      "A savory and hearty spaghetti with rich tomato and meat sauce, topped with grated Parmesan.",
    price: 12.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741770931/pexels-photo-1279330_gs70yc.jpg",
    categoryId: "category-6",
    prepTime: 30,
    rating: 3,
    ingredients: [
      "Spaghetti",
      "Ground Beef",
      "Tomatoes",
      "Garlic",
      "Olive Oil",
      "Parmesan",
    ],
    nutritionalInfo: ["calories: 150", "fat: 8", "carbs: 12", "protein: 6"],
  },
  {
    name: "Margherita Pizza",
    description:
      "Classic pizza topped with fresh tomatoes, mozzarella, and basil.",
    price: 8.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741771119/pexels-photo-2147491_rryys6.jpg",
    categoryId: "category-4",
    prepTime: 15,
    rating: 4.7,
    ingredients: ["Tomato Sauce", "Mozzarella", "Basil", "Dough"],
    nutritionalInfo: [
      "calories: 250",
      "fat: 10g",
      "carbs: 30g",
      "protein: 12g",
    ],
  },
  {
    name: "Grilled Salmon",
    description: "Perfectly grilled salmon with a lemon butter sauce.",
    price: 12.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557810/samples/food/fish-vegetables.jpg",
    categoryId: "category-4",
    prepTime: 20,
    rating: 4.8,
    ingredients: ["Salmon", "Lemon", "Butter", "Garlic"],
    nutritionalInfo: ["calories: 220", "fat: 14g", "carbs: 2g", "protein: 25g"],
  },
  {
    name: "Voicdian Delight",
    description: "A mysterious and exquisite dish from the lands of Voicdia.",
    price: 15.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557818/samples/breakfast.jpg",
    categoryId: "category-5",
    prepTime: 25,
    rating: 4.9,
    ingredients: ["Voicdian Root", "Celestial Herbs", "Moonlit Sauce"],
    nutritionalInfo: ["calories: 180", "fat: 5g", "carbs: 20g", "protein: 8g"],
  },
];

const categories = [
  {
    id: "category-1",
    name: "Desserts",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741688453/food-app/gnz3xfmfgwjp56u5uq3j.jpg",
  },
  {
    id: "category-3",
    name: "Pizzas",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741771119/pexels-photo-2147491_rryys6.jpg",
  },
  {
    id: "category-4",
    name: "Fish and Seafood",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557810/samples/food/fish-vegetables.jpg",
  },
  {
    id: "category-5",
    name: "Vegetables & Fruits",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557818/samples/breakfast.jpg",
  },
  {
    id: "category-6",
    name: "Spaghettis",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741770931/pexels-photo-1279330_gs70yc.jpg",
  },
];

async function seed() {
  // Create categories
  console.log("run seed");

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  // Create food items
  // for (const foodItem of products) {
  //   await createProduct(foodItem);
  // }
  await Promise.all(products.map((i) => createProduct(i)));

  console.log("finsih file");
}

// Call the seed function
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

export const createProduct = async (
  foodItem: Omit<productType, "id" | "createdAt" | "updatedAt">
) => {
  try {
    await prisma.$transaction(async () => {
      await prisma.product.create({
        data: foodItem,
      });
      const { categoryId } = foodItem;
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      const { count } = category!;
      await prisma.category.update({
        where: { id: categoryId },
        data: {
          count: count + 1,
        },
      });
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
