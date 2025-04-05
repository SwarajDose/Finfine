import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-finance-primary/10 to-finance-secondary/10">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-finance-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent">
          Money<span className="text-finance-accent">Smart</span>
        </h1>
        <p className="text-gray-500 mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 