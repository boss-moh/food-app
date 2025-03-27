// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = "/api";

export const API_END_POINT = {

  USER: {

    LOGIN: "/users/login",
    REGISTER: "/users/register",
    
    ORDERS: {
      CREATE: "/orders",
    },
  },

  PRODUCT: {
    CREATE: "/products/",
    EDIT: "/products/",
    DELETE: (id: string) => `/products/${id}`,
    CHANGE_AVAILABLE: (id: string) => `/products/${id}`,
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
