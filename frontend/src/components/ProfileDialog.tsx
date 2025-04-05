import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { X, LogOut, Settings, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

const ProfileDialog = ({ open, onClose }: ProfileDialogProps) => {
  const { user, logout } = useAuth();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            <DialogTitle>My Profile</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-finance-primary to-finance-secondary flex items-center justify-center text-white text-2xl font-bold mb-4">
            {user?.avatar || 'U'}
          </div>
          <h3 className="text-xl font-bold">{user?.name || 'User'}</h3>
          <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
          <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {user?.role || 'User'}
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <Button variant="outline" className="w-full justify-start" asChild onClick={onClose}>
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild onClick={onClose}>
            <Link to="/help">
              <HelpCircle className="h-4 w-4 mr-2" /> Help & Support
            </Link>
          </Button>
        </div>
        
        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
