import { Flame, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockUser, COUNTRIES, EXPLANATION_LANGUAGES } from "@/data/mockData";

export function Profile() {
  const country = COUNTRIES.find((item) => item.code === mockUser.country);
  const explanationLanguage = EXPLANATION_LANGUAGES.find(
    (item) => item.code === mockUser.explanationLanguage
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Profile</h1>

      <Card className="animate-fade-slide-up">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left">
          <Avatar initial={mockUser.avatarInitial} size="lg" />
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">{mockUser.username}</h2>
            <p className="text-sm text-plum-400">{mockUser.email}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="rose">
                {country?.flag} {country?.name}
              </Badge>
              <Badge variant="lavender">
                Explains in {explanationLanguage?.flag} {explanationLanguage?.label}
              </Badge>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="text-center">
          <p className="text-xs text-plum-400">English level</p>
          <p className="mt-1 font-display text-lg font-semibold">{mockUser.englishLevel}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-plum-400">Target level</p>
          <p className="mt-1 font-display text-lg font-semibold">{mockUser.targetLevel}</p>
        </Card>
        <Card className="text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-plum-400">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Streak
          </p>
          <p className="mt-1 font-display text-lg font-semibold">{mockUser.streak} days</p>
        </Card>
        <Card className="text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-plum-400">
            <Star className="h-3.5 w-3.5" aria-hidden="true" /> XP
          </p>
          <p className="mt-1 font-display text-lg font-semibold">{mockUser.xp.toLocaleString()}</p>
        </Card>
      </div>
    </div>
  );
}
