"use client";

import { useState } from "react";

export function useBoolean(initialVal: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialVal);

  function onToggle() {
    setIsOpen(!isOpen);
  }

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return {
    isOpen,
    onToggle,
    onOpen,
    onClose,
  };
}
