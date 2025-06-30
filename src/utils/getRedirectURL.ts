import {
  isAdminPath,
  isChefPath,
  isCustomerPath,
  isDriverPath,
  isPublicPath,
  URL_PATHS,
} from "@/constants";
import { RoleStatus } from "@prisma/client";

export const getURLRedirectBaseOnRole = (role: RoleStatus) => {
  switch (role) {
    case RoleStatus.ADMIN:
      return URL_PATHS.ADMIN.HOME_PAGE;
    case RoleStatus.CHEF:
      return URL_PATHS.CHEF.HOME_PAGE;
    case RoleStatus.CUSTOMER:
      return URL_PATHS.HOME;
    case RoleStatus.DRIVER:
      return URL_PATHS.DRIVER;
  }
};

export const isPathForOtherRole = (role: RoleStatus, path: string) => {
  switch (role) {
    case RoleStatus.ADMIN:
      return isCustomerPath(path) || isDriverPath(path) || isChefPath(path);

    case RoleStatus.CHEF:
      return isCustomerPath(path) || isDriverPath(path) || isAdminPath(path);
    case RoleStatus.CUSTOMER:
      return isDriverPath(path) || isChefPath(path) || isAdminPath(path);
    case RoleStatus.DRIVER:
      return isCustomerPath(path) || isChefPath(path) || isAdminPath(path);
  }
};

export const isPathForThisRole = (role: RoleStatus, path: string) => {
  switch (role) {
    case RoleStatus.CUSTOMER: {
      if (isCustomerPath(path) || isPublicPath(path)) return true;
      return false;
    }
    case RoleStatus.ADMIN: {
      if (isAdminPath(path)) return true;
      return false;
    }

    case RoleStatus.CHEF: {
      if (isChefPath(path)) return true;
      return false;
    }

    case RoleStatus.DRIVER: {
      if (isDriverPath(path)) return true;
      return false;
    }
  }
  return false;
};
