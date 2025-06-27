import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

const StatsCard = ({ title, value, icon, trend, trendUp }: StatsCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {trend && (
              <div
                className={`flex items-center mt-2 text-sm ${
                  trendUp ? "text-green-600" : "text-red-600"
                }`}
              >
                <Icon
                  name={trendUp ? "TrendingUp" : "TrendingDown"}
                  size={16}
                  className="mr-1"
                />
                {trend}
              </div>
            )}
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={24} className="text-purple-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
