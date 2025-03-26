import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
interface UserInfoProps {
  name: string;
  avatar?: string;
  phone: string;
}

export const UserInfo = ({ name, avatar, phone }: UserInfoProps) => {
  return (
    <Card className="p-4 flex justify-between items-center">
      <div className="flex gap-4  items-center ">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{phone}</p>
        </div>
      </div>

      <Button variant="outline" size="sm">
        <User className="h-4 w-4 mr-2" />
        View Detatils
      </Button>
    </Card>
  );
};

export default UserInfo;
