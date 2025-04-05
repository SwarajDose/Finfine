
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  ArrowUpRight 
} from "lucide-react";

const ProTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Pro Tips</CardTitle>
        <CardDescription>Smart strategies for long-term wealth</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full mt-1">
            <TrendingUp className="h-4 w-4 text-finance-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Start SIPs with as little as $500</h3>
            <p className="text-sm text-gray-600">
              Begin with whatever you can afford and gradually increase the amount as your income grows.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full mt-1">
            <Calendar className="h-4 w-4 text-finance-secondary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Step-Up SIPs with your income</h3>
            <p className="text-sm text-gray-600">
              Increase your monthly investments by 5-10% annually to match your income growth and accelerate wealth creation.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-red-100 p-2 rounded-full mt-1">
            <CreditCard className="h-4 w-4 text-finance-danger" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Avoid high-interest debt</h3>
            <p className="text-sm text-gray-600">
              Credit card debt and personal loans can derail your financial progress. Pay them off as quickly as possible.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-full mt-1">
            <AlertCircle className="h-4 w-4 text-finance-accent" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Pay Yourself First!</h3>
            <p className="text-sm text-gray-600">
              Set up automatic transfers to your savings and investment accounts as soon as you get paid.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 p-2 rounded-full mt-1">
            <ArrowUpRight className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Review and Rebalance Annually</h3>
            <p className="text-sm text-gray-600">
              Schedule an annual financial review to assess your progress, adjust goals, and rebalance investments.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProTips;
