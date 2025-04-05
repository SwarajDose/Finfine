
import { useState } from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationDialog from "./NotificationDialog";
import ProfileDialog from "./ProfileDialog";

const Header = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent">
            Money<span className="text-finance-accent">Smart</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setNotificationOpen(true)}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setProfileOpen(true)}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <NotificationDialog 
        open={notificationOpen} 
        onClose={() => setNotificationOpen(false)} 
      />
      
      <ProfileDialog 
        open={profileOpen} 
        onClose={() => setProfileOpen(false)} 
      />
    </header>
  );
};

export default Header;
