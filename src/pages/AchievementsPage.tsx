import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

interface Feedback {
  id: string;
  citizenName: string;
  rating: number;
  comment: string;
  date: string; // "YYYY-MM-DD"
  area: string;
  issueType: string;
}

const sampleFeedback: Feedback[] = [
  {
    id: "1",
    citizenName: "Priya Sharma",
    rating: 5,
    comment: "Excellent work on the pothole repair! The road is much smoother now. Thank you!",
    date: "2023-10-28",
    area: "Roads",
    issueType: "Infrastructure",
  },
  {
    id: "2",
    citizenName: "Rahul Verma",
    rating: 4,
    comment: "The street light was fixed quickly. Appreciate the prompt response.",
    date: "2023-10-27",
    area: "Lighting",
    issueType: "Public Amenities",
  },
  {
    id: "3",
    citizenName: "Sneha Reddy",
    rating: 5,
    comment: "Very impressed with the cleanliness drive. Our neighborhood looks much better.",
    date: "2023-09-15",
    area: "Waste Management",
    issueType: "Sanitation",
  },
  {
    id: "4",
    citizenName: "Amit Kumar",
    rating: 3,
    comment: "The issue was resolved, but it took a bit longer than expected.",
    date: "2022-10-25",
    area: "Parks & Recreation",
    issueType: "Maintenance",
  },
];

const AchievementsPage = () => {
  const [filters, setFilters] = useState({
    dateRange: "All", // "Week", "Month", "Year", "All"
    issueType: "All",
    area: "All",
  });

  const uniqueAreas = useMemo(() => ["All", ...Array.from(new Set(sampleFeedback.map(f => f.area))).sort()], []);
  const uniqueIssueTypes = useMemo(() => ["All", ...Array.from(new Set(sampleFeedback.map(f => f.issueType))).sort()], []);

  const filteredFeedback = useMemo(() => {
    const now = new Date();
    return sampleFeedback
      .filter(f => {
        const date = new Date(f.date);
        
        let dateMatch = true;
        if (filters.dateRange !== "All") {
            let interval: Interval | undefined;
            if (filters.dateRange === "Week") {
                interval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
            } else if (filters.dateRange === "Month") {
                interval = { start: startOfMonth(now), end: endOfMonth(now) };
            } else if (filters.dateRange === "Year") {
                interval = { start: startOfYear(now), end: endOfYear(now) };
            }
            if (interval) {
                dateMatch = isWithinInterval(date, interval);
            }
        }

        const areaMatch = filters.area === "All" || filters.area === f.area;
        const issueTypeMatch = filters.issueType === "All" || filters.issueType === f.issueType;

        return dateMatch && areaMatch && issueTypeMatch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filters]);

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "All",
      issueType: "All",
      area: "All",
    });
  };

  const activeFilters = Object.entries(filters).filter(([, value]) => value !== "All");

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill={i < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold ml-2">Feedback</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Date</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => handleFilterChange("dateRange", "Week")}>This Week</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleFilterChange("dateRange", "Month")}>This Month</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleFilterChange("dateRange", "Year")}>This Year</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleFilterChange("dateRange", "All")}>All Time</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Issue Type</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {uniqueIssueTypes.map(type => (
                  <DropdownMenuItem key={type} onSelect={() => handleFilterChange("issueType", type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Area</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {uniqueAreas.map(area => (
                  <DropdownMenuItem key={area} onSelect={() => handleFilterChange("area", area)}>
                    {area}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={clearFilters} className="text-red-600">
              Clear All Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="p-6 space-y-4">
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <span className="text-sm font-semibold">Filters:</span>
            {activeFilters.map(([key, value]) => (
              <Badge key={key} variant="secondary" className="capitalize">
                {key === 'dateRange' ? `Date: This ${value}` : `${key.replace('issueType', 'Type')}: ${value}`}
              </Badge>
            ))}
          </div>
        )}
        {filteredFeedback.length > 0 ? (
          filteredFeedback.map((feedback) => (
            <Card key={feedback.id} className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{feedback.citizenName.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-base">{feedback.citizenName}</h3>
                      <div className="flex items-center mt-0.5">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 text-sm">{feedback.comment}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No feedback found matching your criteria.</p>
          </div>
        )}
        <div className="pb-20 md:pb-0" />
      </main>
    </>
  );
};

export default AchievementsPage;