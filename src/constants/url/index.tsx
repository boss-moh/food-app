import {
  Coffee,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

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
    SIGN_IN: "login",
    SIGN_UP: "register",
  },

  CART: "/cart",
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
