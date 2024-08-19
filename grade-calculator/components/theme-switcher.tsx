"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} variant="outline">
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </Button>
  );
}
export default ThemeSwitcher;