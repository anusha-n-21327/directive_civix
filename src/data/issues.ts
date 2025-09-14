import { showSuccess, showError } from "@/utils/toast";

export interface Issue {
  id: string;
  citizenId: string;
  title: string;
  description: string;
  location: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected"; // Added Rejected
  reportedAt: string;
  priority: "High" | "Medium" | "Low";
  citizenName: string; // New field
  issueArea: string; // New field
  category: string; // New field
  imageUrl: string;
}

export const sampleIssues: Issue[] = [
  {
    id: "1",
    citizenId: "CZ-84265",
    title: "Large Pothole on Main Street",
    description: "There's a very large pothole near the intersection of Main St and Oak Ave, causing traffic hazards.",
    location: "Main St, near Oak Ave",
    status: "Resolved", // Changed to Resolved for example
    reportedAt: "2023-10-26T10:00:00Z",
    priority: "High",
    citizenName: "Priya Sharma",
    issueArea: "Roads",
    category: "Infrastructure",
    imageUrl: "https://picsum.photos/seed/pothole/800/600",
  },
  {
    id: "2",
    citizenId: "CZ-19374",
    title: "Broken Street Light",
    description: "Street light outside 123 Elm Street is not working, making the area dark at night.",
    location: "123 Elm St",
    status: "In Progress",
    reportedAt: "2023-10-25T14:30:00Z",
    priority: "Medium",
    citizenName: "Rahul Verma",
    issueArea: "Lighting",
    category: "Public Amenities",
    imageUrl: "https://picsum.photos/seed/streetlight/800/600",
  },
  {
    id: "3",
    citizenId: "CZ-50281",
    title: "Garbage Pile Up",
    description: "Illegal dumping has created a large pile of garbage behind the park.",
    location: "Behind Central Park",
    status: "Pending",
    reportedAt: "2023-10-24T08:15:00Z",
    priority: "High",
    citizenName: "Sneha Reddy",
    issueArea: "Waste Management",
    category: "Sanitation",
    imageUrl: "https://picsum.photos/seed/garbage/800/600",
  },
  {
    id: "4",
    citizenId: "CZ-98765",
    title: "Damaged Public Bench",
    description: "A public bench in the town square has been broken and is unsafe to use.",
    location: "Town Square",
    status: "Rejected", // Changed to Rejected for example
    reportedAt: "2023-10-23T11:00:00Z",
    priority: "Low",
    citizenName: "Amit Kumar",
    issueArea: "Parks & Recreation",
    category: "Public Amenities",
    imageUrl: "https://picsum.photos/seed/bench/800/600",
  },
  {
    id: "5",
    citizenId: "CZ-12345",
    title: "Water Leak in Sector 7",
    description: "A significant water leak has been reported near the community center in Sector 7.",
    location: "Sector 7 Community Center",
    status: "Resolved",
    reportedAt: "2023-10-22T09:00:00Z",
    priority: "Medium",
    citizenName: "Deepika Singh",
    issueArea: "Water Supply",
    category: "Infrastructure",
    imageUrl: "https://picsum.photos/seed/waterleak/800/600",
  },
  {
    id: "6",
    citizenId: "CZ-67890",
    title: "Graffiti on Underpass Wall",
    description: "Extensive graffiti found on the walls of the underpass near the railway station.",
    location: "Railway Station Underpass",
    status: "In Progress",
    reportedAt: "2023-10-21T16:00:00Z",
    priority: "Low",
    citizenName: "Arjun Das",
    issueArea: "Public Spaces",
    category: "Vandalism",
    imageUrl: "https://picsum.photos/seed/graffiti/800/600",
  },
  {
    id: "7",
    citizenId: "CZ-24680",
    title: "Blocked Drainage System",
    description: "Drainage system blocked near the market area causing water logging during rain.",
    location: "Market Area",
    status: "Pending",
    reportedAt: "2023-10-20T11:00:00Z",
    priority: "High",
    citizenName: "Kavita Rao",
    issueArea: "Drainage",
    category: "Infrastructure",
    imageUrl: "https://picsum.photos/seed/drainage/800/600",
  },
  {
    id: "8",
    citizenId: "CZ-13579",
    title: "Missing Road Sign",
    description: "A crucial road sign indicating a sharp turn is missing on Highway 45.",
    location: "Highway 45, near bridge",
    status: "Resolved",
    reportedAt: "2023-10-19T09:00:00Z",
    priority: "Medium",
    citizenName: "Rajesh Kumar",
    issueArea: "Road Safety",
    category: "Infrastructure",
    imageUrl: "https://picsum.photos/seed/roadsign/800/600",
  },
];

export const handleAcknowledge = (issueId: string) => {
  console.log(`Issue ${issueId} acknowledged!`);
  showSuccess(`Issue ${issueId} acknowledged. Status is now 'In Progress'.`);
  // In a real app, you'd update the issue status in your state/backend
};

export const handleReject = (issueId: string, reason: string) => {
  console.log(`Issue ${issueId} rejected. Reason: ${reason}`);
  showError(`Issue ${issueId} rejected. Reason: "${reason}". A notification has been sent to the citizen.`);
  // In a real app, you'd update the issue status in your state/backend
};

export const handleImplement = (issueId: string) => {
  console.log(`Starting implementation for issue ${issueId}!`);
  showSuccess(`Implementation started for issue ${issueId}. Status would eventually be 'Resolved'.`);
  // In a real app, you'd update the issue status in your state/backend
};