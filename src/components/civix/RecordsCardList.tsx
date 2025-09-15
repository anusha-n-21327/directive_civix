import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Issue } from "@/data/issues";
import { cn } from "@/lib/utils";
import { MapPin, Tag, User, CheckCircle, Clock, XCircle, Fingerprint, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIssues } from "@/context/IssuesContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RecordsCardListProps {
  issues: Issue[];
}

const RecordsCardList = ({ issues }: RecordsCardListProps) => {
  const { acknowledgeIssue, rejectIssue } = useIssues();
  const [rejectingIssueId, setRejectingIssueId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const getStatusBadgeClass = (status: Issue["status"]) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500";
      case "In Progress":
      case "Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDisplayStatus = (status: Issue["status"]) => {
    if (status === "Resolved") return "Completed";
    if (status === "Pending" || status === "In Progress") return "Pending";
    return status;
  };

  const getStatusIcon = (status: Issue["status"]) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Progress":
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const handleRejectConfirm = () => {
    if (rejectingIssueId && rejectionReason.trim()) {
      rejectIssue(rejectingIssueId, rejectionReason);
      setRejectingIssueId(null);
      setRejectionReason("");
    }
  };

  const handleRejectCancel = () => {
    setRejectingIssueId(null);
    setRejectionReason("");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <Link to={`/issue/${issue.id}`} key={issue.id} className="block">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {getStatusIcon(issue.status)}
                      {issue.title}
                    </span>
                    <Badge className={cn("text-white", getStatusBadgeClass(issue.status))}>
                      {getDisplayStatus(issue.status)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{issue.citizenName}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-gray-500" />
                    <span>{issue.citizenId}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{issue.issueArea}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span>{issue.category}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Reported: {new Date(issue.reportedAt).toLocaleDateString()}</p>
                </CardContent>
                {issue.status === "Pending" && (
                  <CardFooter className="p-4 border-t flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setRejectingIssueId(issue.id);
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        acknowledgeIssue(issue.id);
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
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg py-8">
            No issues to display.
          </p>
        )}
      </div>

      <AlertDialog open={!!rejectingIssueId} onOpenChange={handleRejectCancel}>
        <AlertDialogContent
          onClick={(e) => e.stopPropagation()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to reject this issue?</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this issue. This reason will be sent to the citizen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="rejection-reason-records">Reason</Label>
            <Textarea
              id="rejection-reason-records"
              placeholder="Type your reason here."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleRejectCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim()}
            >
              Confirm Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RecordsCardList;