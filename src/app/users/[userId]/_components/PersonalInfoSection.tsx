import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userType } from "../page";

type PersonalInfoProps = {
  user: userType;
};

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your account details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Full Name
              </h3>
              <p className="text-base">{user.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Email
              </h3>
              <p className="text-base">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Phone
              </h3>
              <p className="text-base">{user.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Account Type
              </h3>
              <p className="text-base">{user.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PersonalInfo;
