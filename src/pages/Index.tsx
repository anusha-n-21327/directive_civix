import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Menu, User, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleIssues, handleAcknowledge } from "@/data/issues";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RejectIssueDialog from "@/components/civix/RejectIssueDialog";

type IssueStatusFilter = "Pending" | "In Progress";

const Index = () => {
  const [statusFilter, setStatusFilter] = useState<IssueStatusFilter>("Pending");

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const activeIssues = sampleIssues
    .filter((issue) => issue.status === statusFilter)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const getPriorityBadgeClass = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "border-red-500/50 text-red-600 bg-red-500/10";
      case "Medium":
        return "border-yellow-500/50 text-yellow-600 bg-yellow-500/10";
      case "Low":
        return "border-blue-500/50 text-blue-600 bg-blue-500/10";
      default:
        return "border-gray-500/50 text-gray-600 bg-gray-500/10";
    }
  };

  return (
    <>
      <main className="px-6 pb-6 space-y-6 animate-in fade-in duration-500">
        <section className="text-left py-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hello Sir,</h1>
            <p className="text-muted-foreground mt-1">
              Here are the latest issues reported. Let's make our city better!
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>
                Acknowledged
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {statusFilter === "Pending" ? "Pending Issues" : "Acknowledged Issues"}
          </h2>
          {activeIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeIssues.map((issue) => (
                <Link to={`/issue/${issue.id}`} key={issue.id} className="block">
                  <Card
                    className="bg-card shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border rounded-lg overflow-hidden h-full"
                  >
                    <CardHeader className="p-4 border-b">
                      <CardTitle className="text-lg font-semibold text-foreground truncate">
                        {issue.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3 text-sm text-muted-foreground flex-grow">
                      <p className="line-clamp-2">{issue.description}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <User className="h-4 w-4 text-muted-foreground/80" />
                        <span className="truncate">{issue.citizenName} ({issue.citizenId})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground/80" />
                        <span className="truncate">{issue.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground/80" />
                        <span>
                          {new Date(issue.reportedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Badge variant="outline" className={getPriorityBadgeClass(issue.priority)}>
                          {issue.priority} Priority
                        </Badge>
                      </div>
                    </CardContent>
                    {statusFilter === "Pending" && (
                      <CardFooter className="p-4 border-t flex gap-2">
                        <RejectIssueDialog issueId={issue.id} />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAcknowledge(issue.id);
                          }}
                          className="flex-1"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Acknowledge
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg py-8">
              No {statusFilter.toLowerCase()} issues to display.
            </p>
          )}
        </section>

        <div className="pb-20 md:pb-0"></div>
      </main>
    </>
  );
};

export default Index;