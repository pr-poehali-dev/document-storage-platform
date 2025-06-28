import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Navigation = () => {
  const navItems = [
    { label: "Главная", icon: "Home", path: "/" },
    { label: "Мои документы", icon: "FileText", path: "/documents" },
    { label: "Общие документы", icon: "Share2", path: "/shared" },
    { label: "Недавние", icon: "Clock", path: "/recent" },
    { label: "Папки", icon: "Folder", path: "/folders" },
    { label: "Корзина", icon: "Trash2", path: "/trash" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="FileStack" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">DocSpace</h1>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Icon name="Bell" size={16} className="mr-2" />
              Уведомления
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
