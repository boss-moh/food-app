// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = "/api";

export const API_END_POINT = {
  GET_CATEGORIES: "/categories",
  GET_MEALS: (categoryId: string) => `/meals?categoryId=${categoryId}`,
  PRODUCT: {
    CREATE: "/meals/",
    EDIT: "/meals/",
    DELETE: (id: string) => `/meals/${id}`,
  },
};
