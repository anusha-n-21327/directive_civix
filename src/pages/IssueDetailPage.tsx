import { useParams, useNavigate } from "react-router-dom";
import { sampleIssues, handleAcknowledge, handleReject, handleImplement } from "@/data/issues";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, User, Tag, AlertTriangle, Check, X, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const issue = sampleIssues.find((i) => i.id === id);

  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <h2 className="text-2xl font-bold mb-2">Issue Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The issue you are looking for does not exist or may have been removed.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const getPriorityBadgeClass = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High": return "border-red-500/50 text-red-600 bg-red-500/10";
      case "Medium": return "border-yellow-500/50 text-yellow-600 bg-yellow-500/10";
      case "Low": return "border-blue-500/50 text-blue-600 bg-blue-500/10";
      default: return "border-gray-500/50 text-gray-600 bg-gray-500/10";
    }
  };

  const formattedDate = new Date(issue.reportedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <>
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold ml-2 truncate">{issue.title}</h1>
      </header>
      <main className="p-6 space-y-6">
        <Card>
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-64 md:h-96 object-cover rounded-t-lg"
          />
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold mb-2">{issue.title}</h2>
            <p className="text-muted-foreground">{issue.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Details</span>
              <Badge variant="outline" className={getPriorityBadgeClass(issue.priority)}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {issue.priority} Priority
              </Badge>
            </div>
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Reported by:</span>
                <span className="font-medium">{issue.citizenName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-medium">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    issue.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {issue.location}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{issue.category}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {issue.status === "Pending" && (
          <div className="p-4 bg-card border rounded-lg flex gap-4 items-center justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleReject(issue.id)}
              className="flex-1"
            >
              <X className="mr-2 h-5 w-5" />
              Reject
            </Button>
            <Button
              size="lg"
              onClick={() => handleAcknowledge(issue.id)}
              className="flex-1"
            >
              <Check className="mr-2 h-5 w-5" />
              Acknowledge
            </Button>
          </div>
        )}

        {issue.status === "In Progress" && (
          <div className="p-4 bg-card border rounded-lg flex gap-4 items-center justify-center">
            <Button
              size="lg"
              onClick={() => handleImplement(issue.id)}
              className="flex-1"
            >
              <Wrench className="mr-2 h-5 w-5" />
              Implement
            </Button>
          </div>
        )}
        <div className="pb-20 md:pb-0" />
      </main>
    </>
  );
};

export default IssueDetailPage;