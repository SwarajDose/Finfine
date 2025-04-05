
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { X, CheckCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationDialogProps {
  open: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const NotificationDialog = ({ open, onClose }: NotificationDialogProps) => {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Budget Alert",
      message: "You're approaching your monthly entertainment budget limit.",
      date: "2 hours ago",
      read: false
    },
    {
      id: "2",
      title: "Goal Achievement",
      message: "Congratulations! You're 75% of the way to your emergency fund goal.",
      date: "Yesterday",
      read: false
    },
    {
      id: "3",
      title: "New Investment Opportunity",
      message: "Check out the new tax-advantaged investment options available this month.",
      date: "3 days ago",
      read: true
    }
  ];

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <DialogTitle>Notifications</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <DialogDescription className="text-right mb-2">
          <Button variant="ghost" size="sm" className="text-blue-500 gap-1">
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </Button>
        </DialogDescription>
        
        <div className="max-h-[60vh] overflow-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications yet
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-100'}`}>
                  <div className="flex justify-between items-start">
                    <h4 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-blue-700'}`}>{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDialog;
