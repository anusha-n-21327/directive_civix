import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Issue } from "@/data/issues";
import { cn } from "@/lib/utils";
import { MapPin, Tag, User, CheckCircle, Clock, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface RecordsCardListProps {
  issues: Issue[];
}

const RecordsCardList = ({ issues }: RecordsCardListProps) => {
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

  return (
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
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{issue.issueArea}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span>{issue.category}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">Reported: {new Date(issue.reportedAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg py-8">
          No issues to display.
        </p>
      )}
    </div>
  );
};

export default RecordsCardList;