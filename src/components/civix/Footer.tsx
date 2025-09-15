import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, User, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  const location = useLocation();
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/records", icon: Archive, label: "Records" },
    { href: "/achievements", icon: MessageSquare, label: "Feedback" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-card shadow-lg p-2 border-t flex justify-around items-center z-50">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center transition-colors duration-200 w-1/4",
              active ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <item.icon className="h-6 w-6" />
            </Button>
            <span className={cn("text-xs mt-1", active && "font-semibold")}>{item.label}</span>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;