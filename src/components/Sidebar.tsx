
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart, 
  PiggyBank, 
  Target, 
  Shield, 
  Baby, 
  Heart, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon, label, to, active }: NavItemProps) => {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`w-full justify-start gap-2 ${
        active ? "bg-finance-primary text-white" : ""
      }`}
      asChild
    >
      <Link to={to}>{icon} {label}</Link>
    </Button>
  );
};

const Sidebar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const path = location.pathname;
  
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 z-40 w-full bg-white border-t p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2" asChild>
            <Link to="/"><BarChart className="h-5 w-5" /><span className="text-xs">Dashboard</span></Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2" asChild>
            <Link to="/budget"><PiggyBank className="h-5 w-5" /><span className="text-xs">Budget</span></Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2" asChild>
            <Link to="/goals"><Target className="h-5 w-5" /><span className="text-xs">Goals</span></Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2" asChild>
            <Link to="/safety"><Shield className="h-5 w-5" /><span className="text-xs">Safety</span></Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-screen sticky top-16 p-4 bg-white border-r overflow-auto hidden md:block">
      <div className="space-y-1">
        <NavItem icon={<BarChart className="h-5 w-5" />} label="Dashboard" to="/" active={path === '/'} />
        <NavItem icon={<PiggyBank className="h-5 w-5" />} label="Budget Tracker" to="/budget" active={path === '/budget'} />
        <NavItem icon={<Target className="h-5 w-5" />} label="Financial Goals" to="/goals" active={path === '/goals'} />
        <NavItem icon={<Shield className="h-5 w-5" />} label="Financial Safety" to="/safety" active={path === '/safety'} />
        <NavItem icon={<Baby className="h-5 w-5" />} label="Children's Future" to="/children" active={path === '/children'} />
        <NavItem icon={<Heart className="h-5 w-5" />} label="Marriage Planning" to="/marriage" active={path === '/marriage'} />
      </div>
      
      <div className="absolute bottom-4 w-[calc(100%-2rem)] space-y-1">
        <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" to="/settings" active={path === '/settings'} />
        <NavItem icon={<HelpCircle className="h-5 w-5" />} label="Help & Support" to="/help" active={path === '/help'} />
      </div>
    </div>
  );
};

export default Sidebar;
