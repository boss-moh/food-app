export const URL_PATHS = {
  HOME: "/",
  CATEGORIES: "/categories",
  ADMIN: "/admin",
} as const;

export const NAV_LINKS = {
  homepage: [{ name: "Home Classic", href: URL_PATHS.HOME }],
  recipe: [{ name: "Recipe Categories", href: URL_PATHS.CATEGORIES }],
  pages: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Admin Dashboard", href: URL_PATHS.ADMIN },
  ],
};
