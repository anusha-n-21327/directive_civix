import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleIssues, Issue } from "@/data/issues";
import RecordsCardList from "@/components/civix/RecordsCardList";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const issueStatuses: { label: string; status: Issue["status"] | "All" }[] = [
  { label: "All", status: "All" },
  { label: "Pending", status: "Pending" },
  { label: "Ongoing", status: "In Progress" },
  { label: "Completed", status: "Resolved" },
  { label: "Rejected", status: "Rejected" },
];

const IssuesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") as Issue["status"] | null;

  const filteredIssues = useMemo(() => {
    if (!statusFilter || statusFilter === "All") {
      return sampleIssues;
    }
    return sampleIssues.filter((issue) => issue.status === statusFilter);
  }, [statusFilter]);

  const handleFilterChange = (status: Issue["status"] | "All") => {
    if (status === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ status });
    }
  };

  const title = statusFilter ? `${statusFilter} Issues` : "All Issues";

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold ml-2">{title}</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {issueStatuses.map((s) => (
              <DropdownMenuItem key={s.status} onClick={() => handleFilterChange(s.status)}>
                {s.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="p-6">
        <RecordsCardList issues={filteredIssues} />
        <div className="pb-20 md:pb-0" />
      </main>
    </>
  );
};

export default IssuesPage;