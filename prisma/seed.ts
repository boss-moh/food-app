// import { createProduct } from "@/lib";
import { PrismaClient, RoleStatus } from "@prisma/client";
import {
  admin,
  categories,
  createProductType,
  feedbackData,
  feedBackType,
  productsList,
} from "./constant";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // Create categories
  console.log("run seed");
  console.log("create category");
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log("create food items");

  for (const product of productsList) {
    await createProduct(product);
  }
  console.log("create admin count ");

  await prisma.user.create({
    data: {
      ...admin,
      role: "ADMIN",
      password: await bcrypt.hash("admin@a2.com", 10),
      name:"ali "
    },
  });
  await prisma.user.create({
    data: {
      name: "Yasser",
      email: "test@chef.com",
      phone: "00000000",
      role: "CHEF",
      password: await bcrypt.hash("test@chef.com", 10),
      
    },
  });
  await prisma.user.create({
    data: {
      name: "kareem",
      email: "test@driver.com",
      phone: "00000000",
      role: "DRIVER",
      password: await bcrypt.hash("test@driver.com", 10),
    },
  });
  await prisma.user.create({
    data: {
      name: "omr",
      email: "test@customer.com",
      phone: "00000000",
      role: "CUSTOMER",
      password: await bcrypt.hash("test@customer.com", 10),
    },
  });

  const usersList = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: await bcrypt.hash("password123", 10),
      role: RoleStatus.CUSTOMER,
      phone: "+1234567890",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: await bcrypt.hash("password123", 10),
      role: RoleStatus.CUSTOMER,
      phone: "+1987654321",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      password: await bcrypt.hash("password123", 10),
      role: RoleStatus.CUSTOMER,
      phone: "+1122334455",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      password: await bcrypt.hash("password123", 10),
      role: RoleStatus.CUSTOMER,
      phone: "+1555666777",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      password: await bcrypt.hash("password123", 10),
      role: RoleStatus.CHEF,
      phone: "+1777888999",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  console.log("Create the users");
  // Create the users

  await Promise.all(
    usersList.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  console.log("Create feedback entries");
  const products = await prisma.product.findMany();
  const users = await prisma.user.findMany();
  // Create the feedback entries
  for (let i = 0; i < feedbackData.length; i++) {
    const index = i % products.length;
    const feedbackItem = feedbackData[i];
    const customerId = users[index].id;
    const productId = products[index].id;

    await createFeedBack({ ...feedbackItem, productId, customerId });
  }

  console.log("finsih file");
}

// Call the seed function
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export const createProduct = async (foodItem: createProductType) => {
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

type createFeedBack = feedBackType & {
  productId: string;
  customerId: string;
};
export const createFeedBack = async (feedBack: createFeedBack) => {
  try {
    await prisma.$transaction(async () => {
      await prisma.feedBack.create({
        data: feedBack,
      });

      const product = await prisma.product.findUnique({
        where: {
          id: feedBack.productId,
        },
      });

      const { rating, rateCount } = product!;
      const newRateCount = rateCount + 1;
      const newRating = (rating * rateCount + feedBack.rating) / newRateCount;

      await prisma.product.update({
        where: {
          id: feedBack.productId,
        },
        data: {
          rateCount: newRateCount,
          rating: newRating,
        },
      });
    });
  } catch (error) {
    throw error;
  }
};
