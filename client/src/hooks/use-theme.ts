import { useEffect, useState } from "react";
import { useTheme } from "@/components/ui/theme-provider";

export function useThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, set the theme based on the stored value
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    // Avoid rendering with server-side theme to prevent hydration mismatch
    return { theme: "light", toggleTheme };
  }

  return { theme, toggleTheme };
}
