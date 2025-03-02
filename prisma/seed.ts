import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "product-1",
    name: "Mighty Super Cheesecake",
    description:
      "A creamy and delicious cheesecake topped with fresh berries and a drizzle of berry sauce. This indulgent dessert is perfect for any occasion and will satisfy your sweet tooth cravings.",
    price: 8.99,
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1612431962/cheesecake.jpg",
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
    id: "product-2",
    name: "Classic Spaghetti Bolognese",
    description:
      "A savory and hearty spaghetti with rich tomato and meat sauce, topped with grated Parmesan.",
    price: 12.99,
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1612431962/spaghetti.jpg",
    categoryId: "category-2",
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
    id: "product-3",
    name: "Iced Latte",
    description: "A smooth and refreshing iced coffee with a hint of milk.",
    price: 3.99,
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1612431962/iced-latte.jpg",
    categoryId: "category-3",
    prepTime: 5,
    rating: 4.5,
    ingredients: ["Espresso", "Ice", "Milk"],
    nutritionalInfo: ["calories: 150", "fat: 8", "carbs: 12", " protein: 6"],
  },
];

const categories = [
  {
    id: "category-1",
    name: "Desserts",
  },
  {
    id: "category-2",
    name: "Main Courses",
  },
  {
    id: "category-3",
    name: "Beverages",
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
  for (const foodItem of products) {
    await prisma.product.create({
      data: foodItem,
    });
  }
  console.log("finsih file");
}

// Call the seed function
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
