import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Menu, User, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIssues } from "@/context/IssuesContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Issue } from "@/data/issues";

type IssueStatusFilter = Issue["status"];

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Menu, User, Check, X, Filter, TrendingUp, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIssues } from "@/context/IssuesContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Issue } from "@/data/issues";

type IssueStatusFilter = Issue["status"];

const Index = () => {
  const [statusFilter, setStatusFilter] = useState<IssueStatusFilter>("Pending");
  const { issues, acknowledgeIssue, rejectIssue } = useIssues();
  const [rejectingIssueId, setRejectingIssueId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const activeIssues = issues
    .filter((issue) => issue.status === statusFilter)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const getPriorityBadgeClass = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "border-red-500/50 text-red-600 bg-red-500/10 shadow-sm";
      case "Medium":
        return "border-yellow-500/50 text-yellow-600 bg-yellow-500/10 shadow-sm";
      case "Low":
        return "border-blue-500/50 text-blue-600 bg-blue-500/10 shadow-sm";
      default:
        return "border-gray-500/50 text-gray-600 bg-gray-500/10 shadow-sm";
    }
  };

  const getStatusStats = () => {
    const pending = issues.filter(i => i.status === "Pending").length;
    const inProgress = issues.filter(i => i.status === "In Progress").length;
    const resolved = issues.filter(i => i.status === "Resolved").length;
    const rejected = issues.filter(i => i.status === "Rejected").length;
    return { pending, inProgress, resolved, rejected, total: issues.length };
  };

  const stats = getStatusStats();

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

  const statusLabels: Record<IssueStatusFilter, string> = {
    "Pending": "Pending Issues",
    "In Progress": "Acknowledged Issues",
    "Resolved": "Completed Issues",
    "Rejected": "Rejected Issues",
  };

  const statusColors: Record<IssueStatusFilter, string> = {
    "Pending": "from-orange-500 to-red-500",
    "In Progress": "from-blue-500 to-purple-500",
    "Resolved": "from-green-500 to-emerald-500",
    "Rejected": "from-gray-500 to-slate-500",
  };

  return (
    <>
      <main className="px-6 pb-6 space-y-8 animate-in fade-in duration-500">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="glass-card p-8 rounded-2xl border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground font-medium">Live Dashboard</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  <span className="gradient-text">Hello Sir,</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Monitor and manage civic issues in real-time. Let's make our city better together!
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 min-w-fit">
                <div className="glass-card p-4 rounded-xl text-center border-white/20">
                  <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center border-white/20">
                  <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center border-white/20">
                  <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                  <div className="text-xs text-muted-foreground">Resolved</div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center border-white/20">
                  <div className="text-2xl font-bold gradient-text">{stats.total}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl floating-animation"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl floating-animation" style={{animationDelay: '1s'}}></div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <div className={`w-1 h-8 bg-gradient-to-b ${statusColors[statusFilter]} rounded-full`}></div>
                <span>{statusLabels[statusFilter]}</span>
              </h2>
              <p className="text-muted-foreground">
                {activeIssues.length} {activeIssues.length === 1 ? 'issue' : 'issues'} found
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="glass-card border-white/30 hover:bg-white/20">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter: {statusLabels[statusFilter]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-white/20">
                <DropdownMenuItem onClick={() => setStatusFilter("Pending")} className="hover:bg-white/20">
                  <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                  Pending ({stats.pending})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("In Progress")} className="hover:bg-white/20">
                  <Activity className="mr-2 h-4 w-4 text-blue-500" />
                  In Progress ({stats.inProgress})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Resolved")} className="hover:bg-white/20">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Resolved ({stats.resolved})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Rejected")} className="hover:bg-white/20">
                  <X className="mr-2 h-4 w-4 text-gray-500" />
                  Rejected ({stats.rejected})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Issues Grid */}
          {activeIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeIssues.map((issue, index) => (
                <Link to={`/issue/${issue.id}`} key={issue.id} className="block group">
                  <Card
                    className="glass-card border-white/20 card-hover h-full transform transition-all duration-300 group-hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="p-6 border-b border-white/10">
                      <div className="flex items-start justify-between space-x-3">
                        <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
                          {issue.title}
                        </CardTitle>
                        <Badge variant="outline" className={getPriorityBadgeClass(issue.priority)}>
                          {issue.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-4 text-sm flex-grow">
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {issue.description}
                      </p>
                      
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{issue.citizenName}</p>
                            <p className="text-xs text-muted-foreground">ID: {issue.citizenId}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-muted-foreground truncate flex-1">{issue.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-muted-foreground">
                            {new Date(issue.reportedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    
                    {statusFilter === "Pending" && (
                      <CardFooter className="p-6 border-t border-white/10 space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
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
                          className="flex-1 btn-gradient text-white border-0"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Acknowledge
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 rounded-2xl text-center border-white/20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No {statusFilter.toLowerCase()} issues</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {statusFilter === "Pending" 
                  ? "Great news! There are no pending issues that require immediate attention."
                  : `No issues currently in ${statusFilter.toLowerCase()} status.`
                }
              </p>
            </div>
          )}
        </section>

        <div className="pb-20 md:pb-8"></div>
      </main>

      <AlertDialog open={!!rejectingIssueId} onOpenChange={handleRejectCancel}>
        <AlertDialogContent
          onClick={(e) => e.stopPropagation()}
          className="glass-card border-white/20"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="gradient-text">Reject Issue Confirmation</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Please provide a detailed reason for rejecting this issue. This information will be sent to the citizen who reported it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="rejection-reason" className="text-sm font-medium">Rejection Reason</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Please provide a clear and constructive reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px] bg-white/50 border-white/30 focus:bg-white/70 transition-all duration-300"
            />
          </div>
          <AlertDialogFooter className="space-x-3">
            <AlertDialogCancel 
              onClick={handleRejectCancel}
              className="hover:bg-gray-100 transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim()}
              className="btn-gradient text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Index;