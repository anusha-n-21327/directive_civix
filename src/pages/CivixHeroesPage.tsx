import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Hero {
  id: string;
  name: string;
  department: string;
  contact: string;
  email: string;
  avatarUrl: string;
}

const sampleHeroes: Hero[] = [
  {
    id: "1",
    name: "Anjali Sharma",
    department: "Public Works",
    contact: "+91 98765 43210",
    email: "anjali.s@civix.gov",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AS",
  },
  {
    id: "2",
    name: "Vikram Singh",
    department: "Sanitation",
    contact: "+91 98765 43211",
    email: "vikram.s@civix.gov",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=VS",
  },
  {
    id: "3",
    name: "Priya Patel",
    department: "Electrical Dept.",
    contact: "+91 98765 43212",
    email: "priya.p@civix.gov",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=PP",
  },
  {
    id: "4",
    name: "Rohan Mehra",
    department: "Water Supply",
    contact: "+91 98765 43213",
    email: "rohan.m@civix.gov",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=RM",
  },
  {
    id: "5",
    name: "Neha Gupta",
    department: "Parks & Recreation",
    contact: "+91 98765 43214",
    email: "neha.g@civix.gov",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
  },
  {
    id: "6",
    name: "Sameer Joshi",
    department: "Road Safety",
    contact: "+91 98765 43215",
    email: "sameer.j@civix.gov",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SJ",
  },
  {
    id: "7",
    name: "Aisha Khan",
    department: "Waste Management",
    contact: "+91 98765 43216",
    email: "aisha.k@civix.gov",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AK",
  },
];

const CivixHeroesPage = () => {
  return (
    <>
      <header className="flex items-center p-4 border-b">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="ml-2">
          <h1 className="text-xl font-bold">Our Heroes</h1>
          <p className="text-sm text-muted-foreground">
            Meet the dedicated officers making a difference.
          </p>
        </div>
      </header>
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleHeroes.map((hero) => (
          <Card
            key={hero.id}
            className="shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center p-6"
          >
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={hero.avatarUrl} alt={hero.name} />
              <AvatarFallback>
                {hero.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-gray-800">{hero.name}</h2>
            <Badge variant="secondary" className="mt-1 mb-4">
              {hero.department}
            </Badge>
            <div className="space-y-2 w-full mt-auto">
              <a
                href={`tel:${hero.contact}`}
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                <span>{hero.contact}</span>
              </a>
              <a
                href={`mailto:${hero.email}`}
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                <span className="truncate">{hero.email}</span>
              </a>
            </div>
          </Card>
        ))}
      </main>
      <div className="pb-20 md:pb-0" />
    </>
  );
};

export default CivixHeroesPage;