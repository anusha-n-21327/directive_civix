import { createContext, useState, useContext, ReactNode } from "react";
import { Issue, sampleIssues as initialIssues } from "@/data/issues";
import { showSuccess, showError } from "@/utils/toast";

interface IssuesContextType {
  issues: Issue[];
  acknowledgeIssue: (issueId: string) => void;
  rejectIssue: (issueId: string, reason: string) => void;
  implementIssue: (issueId: string) => void;
}

const IssuesContext = createContext<IssuesContextType | undefined>(undefined);

export const IssuesProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const acknowledgeIssue = (issueId: string) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status: "In Progress" } : issue
      )
    );
    showSuccess(`Issue ${issueId} acknowledged. Status is now 'In Progress'.`);
  };

  const rejectIssue = (issueId: string, reason: string) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status: "Rejected", rejectionReason: reason } : issue
      )
    );
    showError(`Issue ${issueId} rejected. Reason: "${reason}". A notification has been sent to the citizen.`);
  };

  const implementIssue = (issueId: string) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status: "Resolved" } : issue
      )
    );
    showSuccess(`Implementation started for issue ${issueId}. Status is now 'Resolved'.`);
  };

  return (
    <IssuesContext.Provider value={{ issues, acknowledgeIssue, rejectIssue, implementIssue }}>
      {children}
    </IssuesContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssuesContext);
  if (!context) {
    throw new Error("useIssues must be used within an IssuesProvider");
  }
  return context;
};