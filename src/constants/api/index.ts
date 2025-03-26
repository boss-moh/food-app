// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = "/api";

export const API_END_POINT = {
  AUTH: {
    LOGIN: "/login",
  },
  USER: {
    CREATE: "/register",
    ORDERS: {
      CREATE: "/orders",
    },
  },

  GET_CATEGORIES: "/categories",
  GET_MEALS: (categoryId: string) => `/meals?categoryId=${categoryId}`,
  PRODUCT: {
    CREATE: "/meals/",
    EDIT: "/meals/",
    DELETE: (id: string) => `/meals/${id}`,
  },

  ADMIN: {
    CATEGORY: {
      CREATE: "/categories",
      EDIT: "/categories",
      DELETE: (id: string) => `/categories/${id}`,
    },
    USERS: {
      UPDATE_ROLE: (userId: string) => `/users/${userId}/role`,
    },
  },
  ORDERS: {
    CHANGE_STATUS: "/orders/order",
  },
};
