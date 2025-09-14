import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleIssues } from "@/data/issues";
import { handleAccept, handleImplement } from "@/data/issues";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <section className="text-left py-6">
          <h1 className="text-3xl font-bold text-foreground">Hello Sir,</h1>
          <p className="text-muted-foreground mt-1">
            Here are the latest issues reported. Let's make our city better!
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">
              {statusFilter === "Pending" ? "Pending Issues" : "Acknowledged Issues"}
            </h2>
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
          </div>
          {activeIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeIssues.map((issue) => (
                <Card
                  key={issue.id}
                  className="bg-card shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border rounded-lg overflow-hidden"
                >
                  <CardHeader className="p-4 border-b">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {issue.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 text-sm text-muted-foreground flex-grow">
                    <p>{issue.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <MapPin className="h-4 w-4 text-muted-foreground/80" />
                      <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground/80" />
                      <span>
                        Reported: {new Date(issue.reportedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="outline" className={getPriorityBadgeClass(issue.priority)}>
                        {issue.priority} Priority
                      </Badge>
                    </div>
                  </CardContent>
                  <div className="p-4 bg-secondary/50 flex gap-2 items-center justify-end">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAccept(issue.id)}
                      className="flex-1"
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleImplement(issue.id)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Implement
                    </Button>
                  </div>
                </Card>
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