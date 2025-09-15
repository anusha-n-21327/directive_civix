import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleReject } from "@/data/issues";
import { X } from "lucide-react";

interface RejectIssueDialogProps {
  issueId: string;
}

const RejectIssueDialog = ({ issueId }: RejectIssueDialogProps) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const onReject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleReject(issueId, rejectionReason);
    setRejectionReason("");
  };

  const onTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setRejectionReason("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
          onClick={onTriggerClick}
        >
          <X className="mr-2 h-4 w-4" />
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
          <Label htmlFor={`rejection-reason-${issueId}`}>Reason</Label>
          <Textarea
            id={`rejection-reason-${issueId}`}
            placeholder="Type your reason here."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancelClick}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onReject}
            disabled={!rejectionReason.trim()}
          >
            Confirm Reject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RejectIssueDialog;