import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Footer = () => {
  const location = useLocation();
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/issues", icon: ClipboardList, label: "Issues", isDropdown: true },
    { href: "/achievements", icon: MessageSquare, label: "Feedback" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  const issueStatuses = [
    { label: "Pending", status: "Pending" },
    { label: "Ongoing", status: "In Progress" },
    { label: "Completed", status: "Resolved" },
    { label: "Rejected", status: "Rejected" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 border-t border-gray-200 flex justify-around items-center z-50">
      {navItems.map((item) => {
        if (item.isDropdown) {
          return (
            <DropdownMenu key={item.href}>
              <DropdownMenuTrigger asChild>
                <div className={cn(
                  "flex flex-col items-center transition-colors duration-200 w-1/4 cursor-pointer",
                  isActive(item.href) ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
                )}>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <item.icon className="h-6 w-6" />
                  </Button>
                  <span className="text-xs mt-1">{item.label}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mb-2" side="top" align="center">
                {issueStatuses.map((s) => (
                  <DropdownMenuItem key={s.status} asChild>
                    <Link to={`/issues?status=${encodeURIComponent(s.status)}`}>{s.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center transition-colors duration-200 w-1/4",
              isActive(item.href)
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-600"
            )}
          >
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <item.icon className="h-6 w-6" />
            </Button>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;