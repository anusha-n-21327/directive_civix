import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleIssues, Issue } from "@/data/issues";
import RecordsCardList from "@/components/civix/RecordsCardList";
import { useMemo } from "react";

const IssuesPage = () => {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") as Issue["status"] | null;

  const filteredIssues = useMemo(() => {
    if (!statusFilter) {
      return sampleIssues; // Show all if no filter is applied
    }
    return sampleIssues.filter((issue) => issue.status === statusFilter);
  }, [statusFilter]);

  const title = statusFilter ? `${statusFilter} Issues` : "All Issues";

  return (
    <>
      <header className="flex items-center p-4 border-b">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">{title}</h1>
      </header>
      <main className="p-6">
        <RecordsCardList issues={filteredIssues} />
        <div className="pb-20 md:pb-0" />
      </main>
    </>
  );
};

export default IssuesPage;