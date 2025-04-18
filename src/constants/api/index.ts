// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = "/api";

export const API_END_POINT = {
  USER: {
    LOGIN: "/users/login",
    REGISTER: "/users/register",

    ORDERS: {
      CREATE: "/orders",
      ADD_FACD_BACK: (id: string) => `/products/${id}/feedback`,
      ADD_TO_FAVORTIES: (id: string) => `/products/${id}/favorties`,
      CHECK_FAVORTIES: (id: string) => `/products/${id}/favorties`,
    },
  },

  ADMIN: {
    USERS: {
      UPDATE_ROLE: (userId: string) => `/users/${userId}/role`,
    },
  },
  ORDERS: {
    CHANGE_STATUS: "/orders/order",
  },
  CHEF: {
    CATEGORY: {
      CREATE: "/categories",
      EDIT: "/categories",
      DELETE: (id: string) => `/categories/${id}`,
    },
  },
  PRODUCT: {
    CREATE: "/products/",
    EDIT: "/products/",
    DELETE: (id: string) => `/products/${id}`,
    CHANGE_AVAILABLE: (id: string) => `/products/${id}`,
  },
};
