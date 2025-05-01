import {
  Coffee,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

/**
 * #BUG: Put All URL To Public And Private
 * #BUG: MENU CATEGORY - PRODUCT
 */

export const URL_PATHS = {
  HOME: "/",
  DRIVER: "/driver",

  MENU: {
    HOME_PAGE: "/meals",
    CATEGORIES: "/categories",

    CATEGORIY: (id: string) => `/categories/${id}`,

    GET_PRODUCT: (categoryId: string, productId: string) =>
      `${URL_PATHS.MENU.CATEGORIY(categoryId)}/${productId}`,
  },

  CHEF: {
    HOME_PAGE: "/chef",
    ORDERS: "/chef/orders",
    PRODUCT: {
      HOME_PAGE: "/chef/products/",
      CREATE: "/chef/products/create",
      EDIT: (id: string) => `/chef/products/edit/${id}`,
    },

    CATEGORIE: {
      HOME_PAGE: "/chef/categories/",
      CREATE: "/chef/categories/create",
      EDIT: (id: string) => `/chef/categories/edit/${id}`,
    },
  },

  ADMIN: {
    HOME_PAGE: "/admin",

    USERS: {
      HOME_PAGE: "/admin/users",
      ORDERS: {
        VIEW: (id: string) => `/admin/users/${id}/orders`,
      },
    },
    ORDERS: {
      HOME_PAGE: "/admin/orders",
      VIEW_ORDER: (id: string) => `/admin/orders/${id}`,
    },
  },

  AUTH: {
    SIGN_IN: "/login",
    SIGN_UP: "/register",
  },

  CART: "/cart",

  UN_AUTHORIZED: "/unauthorized",

  NOT_FOUND: "/not-found",

  USER: {
    ORDERS: {
      HOME_PAGE: "/orders",
    },
    PROFILE: (id: string) => `/users/${id}`,
  },
} as const;

export const NAV_LINKS = [
  {
    label: "Home",

    href: URL_PATHS.HOME,
  },
  {
    label: "Categories",

    href: URL_PATHS.MENU.CATEGORIES,
  },
  {
    label: "Meals",

    href: URL_PATHS.MENU.HOME_PAGE,
  },
];

export const ADMIN_LINKS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: URL_PATHS.ADMIN.HOME_PAGE,
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    href: URL_PATHS.ADMIN.ORDERS.HOME_PAGE,
  },

  {
    label: "Users",
    icon: Users,
    href: URL_PATHS.ADMIN.USERS.HOME_PAGE,
  },
] as const;

export const CHEF_LINKS = [
  {
    label: "Orders",
    icon: ShoppingBag,
    href: URL_PATHS.CHEF.ORDERS,
  },
  {
    label: "Products",
    icon: Coffee,
    href: URL_PATHS.CHEF.PRODUCT.HOME_PAGE,
  },
  {
    label: "Categories",
    icon: Package,
    href: URL_PATHS.CHEF.CATEGORIE.HOME_PAGE,
  },
] as const;

export type SideLinkRouteType = {
  label: string;
  icon: React.ElementType;
  href: string;
};
export const PUBLICE_PATHS: string[] = [
  URL_PATHS.HOME,
  URL_PATHS.AUTH.SIGN_IN,
  URL_PATHS.AUTH.SIGN_UP,
  URL_PATHS.MENU.CATEGORIES,
  URL_PATHS.MENU.HOME_PAGE,
  URL_PATHS.MENU.CATEGORIY(""),
  URL_PATHS.MENU.GET_PRODUCT("", ""),
  URL_PATHS.UN_AUTHORIZED,
  URL_PATHS.NOT_FOUND,
];

export const isAdminPath = (path: string) => path.startsWith("/admin");
export const isProtectedPath = (path: string) => path.startsWith("/orders");
export const isChefPath = (path: string) => path.startsWith("/chef");
export const isDriverPath = (path: string) => path.startsWith("/driver");
export const DEFAULT_REDIRECTED = URL_PATHS.HOME;
export const API_PREFIX = "/api/";
