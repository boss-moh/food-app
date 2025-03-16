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

export const URL_PATHS = {
  HOME: "/",
  CATEGORIES: "/categories",
  CATEGORIY: (id: string) => `/categories/${id}`,
  PRODUCTS: (categoryId: string, productId: string) =>
    `${URL_PATHS.CATEGORIY(categoryId)}/${productId}`,

  MENU: {
    GET_DISH: (categoryId: string, dishId: string) =>
      `${URL_PATHS.CATEGORIY(categoryId)}/${dishId}`,
  },

  PRODUCT: {
    CREATE: "/admin/products/create",
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

  MEALS: "/meals",

  AUTH: {
    SIGN_IN: "/login",
    SIGN_UP: "/register",
  },

  CART: "/cart",

  UN_AUTHORIZED: "/unauthorized",
} as const;

export const NAV_LINKS = {
  menu: [
    { name: "Meals", href: URL_PATHS.MEALS },
    { name: "Categories", href: URL_PATHS.CATEGORIES },
  ],
  pages: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Admin Dashboard", href: URL_PATHS.ADMIN.HOME_PAGE },
  ],
};

export const PUBLICE_PATHS: string[] = [
  URL_PATHS.HOME,
  URL_PATHS.AUTH.SIGN_IN,
  URL_PATHS.AUTH.SIGN_UP,
  URL_PATHS.UN_AUTHORIZED,
];

export const ADMIN_PATHS: string[] = getPaths(URL_PATHS.ADMIN);
export const PROTECTED_PATHS: string[] = [URL_PATHS.HOME];

export const DEFAULT_REDIRECTED = URL_PATHS.AUTH.SIGN_IN;
export const API_PREFIX = "/api/";

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

// {
//   label: "Analytics",
//   icon: BarChart3,
//   href: "/admin/analytics",
// // },
// {
//   label: "Settings",
//   icon: Settings,
//   href: "/admin/settings",
// },
