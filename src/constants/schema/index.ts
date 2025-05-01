import { z } from "zod";
import { OrderStatus, RoleStatus } from "../types";

const RULES = {
  NAME: z.string().min(2, "Name must be at least 2 characters"),
  EMAIL: z.string().email("Invalid email address"),
  PASSWORD: z.string().min(8, "Password must be at least 8 characters"),
  DESCRIPTION: z.string().min(10, "Description must be at least 10 characters"),
  PRICE: z.coerce.number().positive("Price must be greater than zero").finite(),
  RATING: z.coerce
    .number()
    .max(5, "Rating must be between 0 and 5")
    .min(0)
    .transform((val) => Number(val)),

  PERPTIME: z.coerce.number().positive("Preparation must be greater than zero"),
  PHONE: z.string().min(10, "Phone number must be at least 10 digits"),
  id: z.string({
    required_error: "Please provide a valid ID ",
  }),
};

export const IDSchmea = z.object({
  id: RULES.id,
});

export const createProductSchema = z.object({
  name: RULES.NAME,
  description: RULES.DESCRIPTION,
  price: RULES.PRICE,
  categoryId: z.string().min(1, "Please select a category"),
  prepTime: RULES.PERPTIME,
  ingredients: z.array(z.string()),
  nutritionalInfo: z.array(z.string()),
  imageUrl: z.string().url("Should Be URL"),
});

export type createProductType = z.infer<typeof createProductSchema>;

export const editProductSchema = createProductSchema.merge(IDSchmea);

export type editProductType = z.infer<typeof editProductSchema>;

export const signupSchema = z
  .object({
    name: RULES.NAME,
    email: RULES.EMAIL,
    password: RULES.PASSWORD,
    confirmPassword: z.string().nonempty(),
    phone: RULES.PHONE,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type signupType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: RULES.EMAIL,
  password: RULES.PASSWORD,
});

export const createCategorySchema = z.object({
  name: RULES.NAME,
  imageUrl: z.string().url("Should Be URL"),
});

export type createCategoryType = z.infer<typeof createCategorySchema>;

export const editCategorySchema = IDSchmea.merge(createCategorySchema);

export type editCategoryType = z.infer<typeof editCategorySchema>;

export type signinType = z.infer<typeof signinSchema>;

export type ErrorResponse<T> =
  | Partial<Record<keyof T, string[]>>
  | Record<string, string[]>;

export const addressSchema = z.object({
  address: z.string({
    required_error: "address requrie",
  }),
});

export type addressType = z.infer<typeof addressSchema>;

export const createOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().min(1, "it should me great than one "),
    })
  ),
  address: z.string({
    required_error: "address requrie",
  }),
});

export type createOrderType = z.infer<typeof createOrderSchema>;

export const changeRoleSchema = IDSchmea.extend({
  role: z.nativeEnum(RoleStatus),
});

export const changOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  id: z.string(),
});

export const addFeedBackSchmea = z.object({
  rating: RULES.RATING,
  content: z
    .string()
    .min(10, "the description should has more 10 letters")
    .max(255, "the description should has less 255 letters"),
});

export type addFeedBackType = z.infer<typeof addFeedBackSchmea>;

export const toggleSchema = IDSchmea.extend({
  isAvailable: z.boolean({
    required_error: "Please provide availability status",
  }),
});
