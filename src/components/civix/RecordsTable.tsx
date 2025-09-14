import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Issue } from "@/data/issues";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface RecordsTableProps {
  issues: Issue[];
}

const RecordsTable = ({ issues }: RecordsTableProps) => {
  const navigate = useNavigate();

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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Citizen Name</TableHead>
            <TableHead>Issue Area</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <TableRow
                key={issue.id}
                onClick={() => navigate(`/issue/${issue.id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{issue.id}</TableCell>
                <TableCell>{issue.citizenName}</TableCell>
                <TableCell>{issue.issueArea}</TableCell>
                <TableCell>{issue.category}</TableCell>
                <TableCell className="text-center">
                  <Badge className={cn("text-white", getStatusBadgeClass(issue.status))}>
                    {getDisplayStatus(issue.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                No issues to display.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecordsTable;