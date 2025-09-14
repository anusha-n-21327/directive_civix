import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleIssues, handleAcknowledge, handleReject, handleImplement, Issue } from "@/data/issues";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, User, Tag, AlertTriangle, Check, X, Wrench, CheckCircle, XCircle, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Footer from "@/components/civix/Footer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const issue = sampleIssues.find((i) => i.id === id);
  const [rejectionReason, setRejectionReason] = useState("");

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

  const getStatusBadgeClass = (status: Issue["status"]) => {
    switch (status) {
      case "Resolved": return "bg-green-500 text-primary-foreground hover:bg-green-500/90";
      case "In Progress": return "bg-yellow-500 text-primary-foreground hover:bg-yellow-500/90";
      case "Pending": return "bg-blue-500 text-primary-foreground hover:bg-blue-500/90";
      case "Rejected": return "bg-red-500 text-primary-foreground hover:bg-red-500/90";
      default: return "bg-gray-500 text-primary-foreground hover:bg-gray-500/90";
    }
  };

  const getStatusIcon = (status: Issue["status"]) => {
    switch (status) {
      case "Resolved": return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
      case "In Progress": return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "Pending": return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "Rejected": return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default: return null;
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
                <Fingerprint className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Citizen ID:</span>
                <span className="font-medium">{issue.citizenId}</span>
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
              <div className="flex items-center gap-3">
                {getStatusIcon(issue.status)}
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusBadgeClass(issue.status)}>
                  {issue.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {issue.status === "Pending" && (
          <div className="p-4 bg-card border rounded-lg flex gap-4 items-center justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X className="mr-2 h-5 w-5" />
                  Reject
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to reject this issue?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please provide a reason for rejecting this issue. This reason will be sent to the citizen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-2">
                  <Label htmlFor="rejection-reason">Reason</Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Type your reason here."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setRejectionReason("")}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleReject(issue.id, rejectionReason);
                      setRejectionReason("");
                    }}
                    disabled={!rejectionReason.trim()}
                  >
                    Confirm Reject
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
      <Footer />
    </>
  );
};

export default IssueDetailPage;