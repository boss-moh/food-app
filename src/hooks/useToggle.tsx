import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => {
    setIsOpen(true);
  };
  const open = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggle,
    close,
    open,
    setIsOpen,
  };
};

export default useToggle;
