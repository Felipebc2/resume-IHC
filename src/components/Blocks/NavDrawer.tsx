"use client";

import { AnimatePresence, motion } from "motion/react";
import NavItem from "@/components/Ui/NavItem";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS = [
  { label: "HOME", href: "#home" },
  { label: "EXPERIÊNCIAS", href: "#experiencias" },
  { label: "PROJETOS", href: "#projetos" },
  { label: "CONTATO", href: "#contato" },
];

/** Painel de navegação que desliza da direita, ocupando até 50% da tela. */
export default function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-y-0 right-0 z-40 flex w-full flex-col items-start justify-center gap-1 bg-dark px-10 md:w-1/2"
          >
            {ITEMS.map((item) => (
              <NavItem
                key={item.href}
                label={item.label}
                href={item.href}
                onClick={onClose}
              />
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
