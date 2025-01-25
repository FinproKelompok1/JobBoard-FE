"use client";

import { useState } from "react";

export default function UseOpen() {
  const [open, setOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const menuHandler = () => {
    if (!open) {
      setHidden(!hidden);
      setTimeout(() => {
        setOpen(!open);
      }, 300);
    } else {
      setOpen(!open);
      setTimeout(() => {
        setHidden(!hidden);
      }, 300);
    }
  };

  return { open, hidden, menuHandler };
}
