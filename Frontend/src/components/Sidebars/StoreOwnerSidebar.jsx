"use client";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  IconArrowLeft,
  IconLayoutDashboard,
  IconLock
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, useSidebar } from "../ui/Sidebar";
import { cn } from "../ui/Sidebar";
import { getUser } from "../../utils/authUtils";

const links = [
  { label: "Dashboard", href: "/store-owner/main-panel", icon: <IconLayoutDashboard className="h-5 w-5 shrink-0" /> },
  { label: "Update Password", href: "/update-password", icon: <IconLock className="h-5 w-5 shrink-0" /> },
  { label: "Logout", href: "/logout", icon: <IconArrowLeft className="h-5 w-5 shrink-0" /> },
];

const RouterSidebarLink = ({ link }) => {
  const { open, animate } = useSidebar();
  return (
    <NavLink
      to={link.href}
      end
      className={({ isActive }) =>
        cn(
          "flex items-center gap-5 p-2 rounded-lg group/sidebar",
          isActive
            ? "text-white bg-neutral-800 font-semibold"
            : "text-white hover:bg-neutral-700 transition-colors duration-200"
        )
      }
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm whitespace-pre inline-block"
      >
        {link.label}
      </motion.span>
    </NavLink>
  );
};

export default function StoreOwnerSidebar() {
  const [open, setOpen] = useState(false);

  const user = {
    name: getUser()?.name,
  };


  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="flex flex-col justify-between h-screen bg-black text-white">
        <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <RouterSidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>

        <div className="p-1 border-t border-neutral-700 relative">
          {open && (
              <span className="text-sm font-semibold mt-4">{user.name}</span>
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

const Logo = () => (
  <a href="#" className="flex items-center gap-2 py-1">
    <div className="h-5 w-6 bg-white rounded" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">
      Roxiler
    </motion.span>
  </a>
);

const LogoIcon = () => (
  <a href="#" className="flex items-center gap-2 py-1">
    <div className="h-5 w-6 bg-white rounded" />
  </a>
);
