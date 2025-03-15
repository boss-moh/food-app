import { z } from "zod";

const RULES = {
  NAME: z.string().min(2, "Name must be at least 2 characters"),
  EMAIL: z.string().email("Invalid email address"),
  PASSWORD: z.string().min(8, "Password must be at least 8 characters"),
  DESCRIPTION: z.string().min(10, "Description must be at least 10 characters"),
  PRICE: z.number().positive("Price must be greater than zero").finite(),
  RATING: z.number().max(5, "Rating must be between 0 and 5").min(0),
  PERPTIME: z.number().min(0, "Preparation time cannot be negative"),
};

export const createDishSchema = z.object({
  id: z.string().or(z.null()),
  name: RULES.NAME,
  description: RULES.DESCRIPTION,
  price: RULES.PRICE,
  rating: RULES.RATING,
  categoryId: z.string().min(1, "Please select a category"),
  prepTime: RULES.PERPTIME,
  ingredients: z.array(z.string()),
  nutritionalInfo: z.array(z.string()),
  imageUrl: z.string().url("Should Be URL"),
});

export type createDishType = z.infer<typeof createDishSchema>;

export const signupSchema = z
  .object({
    name: RULES.NAME,
    email: RULES.EMAIL,
    password: RULES.PASSWORD,
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: RULES.EMAIL,
  password: RULES.PASSWORD,
});

export const createCategorySchema = z.object({
  name: RULES.NAME,
  imageUrl: z.string().url("Should Be URL"),
});

export type createCategoryType = z.infer<typeof createCategorySchema>;
export const editCategorySchema = z.object({
  id: z.string({message:"It should Has ID"}),
  name: RULES.NAME,
  imageUrl: z.string().url("Should Be URL"),
});

export type editCategoryType = z.infer<typeof editCategorySchema>;
