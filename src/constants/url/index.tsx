import {
  Coffee,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

type PathsObject = Record<string, string>;
type NestedPaths = Record<string, string | PathsObject>;

const getPaths = (obj: NestedPaths): string[] => {
  return Object.values(obj).flatMap((value) =>
    typeof value === "string" ? value : getPaths(value)
  );
};

/**
 * #BUG: Put All URL To Public And Private
 * #BUG: MENU CATEGORY - PRODUCT
 */

// Check if path matches category structure: /categories/:id
// const categoryRex = /^\/categories\/[^/]+$/

// Check if path matches product structure: /categories/:categoryId/:productId
// const isProduct = /^\/categories\/[^/]+\/[^/]+$/

export const URL_PATHS = {
  HOME: "/",

  MENU: {
    HOME_PAGE: "/meals",
    CATEGORIES: "/categories",

    CATEGORIY: (id: string) => `/categories/${id}`,

    GET_PRODUCT: (categoryId: string, productId: string) =>
      `${URL_PATHS.MENU.CATEGORIY(categoryId)}/${productId}`,
  },

  ADMIN: {
    HOME_PAGE: "/admin",
    PRODUCT: {
      CREATE: "/admin/products/create",
      EDIT: "/admin/products/create",
    },

    CATEGORIE: {
      HOME_PAGE: "/admin/categories/",
      CREATE: "/admin/categories/create",
      EDIT: "/admin/categories/edit",
    },
    SIDE_BAR: {
      ORDERS: "/admin/orders",
      PRODUCTS: "/admin/products",
      CATEGORIES: "/admin/categories",
      CUSTOMERS: "/admin/customers",
    },
  },

  AUTH: {
    SIGN_IN: "/login",
    SIGN_UP: "/register",
  },

  CART: "/cart",

  UN_AUTHORIZED: "/unauthorized",

  USER: {
    ORDERS: {
      HOME_PAGE: "/user/orders",
    },
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
    href: URL_PATHS.ADMIN.SIDE_BAR.ORDERS,
  },
  {
    label: "Products",
    icon: Coffee,
    href: URL_PATHS.ADMIN.SIDE_BAR.PRODUCTS,
  },
  {
    label: "Categories",
    icon: Package,
    href: URL_PATHS.ADMIN.SIDE_BAR.CATEGORIES,
  },
  {
    label: "Customers",
    icon: Users,
    href: URL_PATHS.ADMIN.SIDE_BAR.CUSTOMERS,
  },
] as const;

export const PUBLICE_PATHS: string[] = [
  URL_PATHS.HOME,
  ...getPaths(URL_PATHS.AUTH),
  URL_PATHS.MENU.CATEGORIES,
  URL_PATHS.MENU.HOME_PAGE,
  URL_PATHS.MENU.CATEGORIY("[id]"),
  URL_PATHS.MENU.GET_PRODUCT("[categoryId]", "[productId]"),
  URL_PATHS.UN_AUTHORIZED,
];

export const ADMIN_PATHS: string[] = getPaths(URL_PATHS.ADMIN);
export const PROTECTED_PATHS: string[] = [];

export const DEFAULT_REDIRECTED = URL_PATHS.HOME;
export const API_PREFIX = "/api/";
