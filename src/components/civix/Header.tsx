import { Bell, Search, Menu, UserCircle, Home, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="glass-card border-0 border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text tracking-tight">
                  Civicx
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Building Better Communities
                </p>
              </div>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues, locations..."
                className="pl-10 bg-white/80 border-white/30 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link to="/leaderboard">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-white/20">
                  <Users className="h-4 w-4 mr-2" />
                  Leaders
                </Button>
              </Link>
              <Link to="/achievements">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-white/20">
                  <Award className="h-4 w-4 mr-2" />
                  Awards
                </Button>
              </Link>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-white/20">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs border-0">
                3
              </Badge>
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/20">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-white/20">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/20">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;