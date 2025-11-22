import Header from "@/components/layout/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { leaderboardData } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

function getAvatarUrl(rank: number) {
  const image = PlaceHolderImages.find(img => img.id === `user-avatar-${rank}`);
  return image?.imageUrl || `https://picsum.photos/seed/${rank}/100/100`;
}

function getAvatarHint(rank: number) {
    const image = PlaceHolderImages.find(img => img.id === `user-avatar-${rank}`);
    return image?.imageHint || 'person portrait';
}


export default function CompetitionPage() {
  return (
    <>
      <Header title="Competition" />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leaderboard</h2>
            <p className="text-muted-foreground">
              See who is leading the charge in conservation!
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Top Savers</CardTitle>
            <CardDescription>This week's champions of conservation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Energy Saved (kWh)</TableHead>
                  <TableHead className="text-right">Water Saved (Liters)</TableHead>
                  <TableHead className="text-right">Total Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow key={user.rank}>
                    <TableCell className="font-medium text-lg">{user.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={getAvatarUrl(user.rank)} alt={user.name} data-ai-hint={getAvatarHint(user.rank)} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{user.energySaved}</TableCell>
                    <TableCell className="text-right">{user.waterSaved.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{user.points.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
