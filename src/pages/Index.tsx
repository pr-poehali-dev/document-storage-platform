import Navigation from "@/components/Navigation";
import UploadZone from "@/components/UploadZone";
import DocumentList from "@/components/DocumentList";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Добро пожаловать в DocSpace
              </h1>
              <p className="text-gray-600">
                Управляйте документами, сотрудничайте в режиме реального времени
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Поиск документов..."
                  className="pl-10 w-full md:w-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Всего документов"
            value="247"
            icon="FileText"
            trend="+12% за месяц"
            trendUp={true}
          />
          <StatsCard
            title="Активных проектов"
            value="18"
            icon="FolderOpen"
            trend="+3 новых"
            trendUp={true}
          />
          <StatsCard
            title="Участников"
            value="64"
            icon="Users"
            trend="+8 за неделю"
            trendUp={true}
          />
          <StatsCard
            title="Объем данных"
            value="12.4 ГБ"
            icon="HardDrive"
            trend="75% использовано"
          />
        </div>

        {/* Upload and Recent Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Upload Zone */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Upload" size={20} />
                  <span>Загрузить документы</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UploadZone />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Zap" size={20} />
                  <span>Быстрые действия</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="FileText" size={24} />
                    <span className="text-sm">Создать документ</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="Presentation" size={24} />
                    <span className="text-sm">Презентация</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="Sheet" size={24} />
                    <span className="text-sm">Таблица</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="FolderPlus" size={24} />
                    <span className="text-sm">Новая папка</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="Users" size={24} />
                    <span className="text-sm">Пригласить</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="Share2" size={24} />
                    <span className="text-sm">Поделиться</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span>Недавние документы</span>
              </CardTitle>
              <Button variant="ghost" size="sm">
                Показать все
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DocumentList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
