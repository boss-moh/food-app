export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_END_POINT = {
  AUTH: {
    LOGIN: "/login",
  },
  USER: {
    CREATE: "/register",
  },

  GET_CATEGORIES: "/categories",
  GET_MEALS: (categoryId: string) => `/meals?categoryId=${categoryId}`,
  PRODUCT: {
    CREATE: "/meals/",
  },
};
