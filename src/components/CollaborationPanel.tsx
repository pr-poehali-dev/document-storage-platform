import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: "owner" | "editor" | "viewer";
  isOnline: boolean;
  lastSeen?: string;
}

interface CollaborationPanelProps {
  documentTitle: string;
  collaborators: Collaborator[];
  onInvite: () => void;
}

const CollaborationPanel = ({
  documentTitle,
  collaborators,
  onInvite,
}: CollaborationPanelProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800";
      case "editor":
        return "bg-blue-100 text-blue-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "owner":
        return "Владелец";
      case "editor":
        return "Редактор";
      case "viewer":
        return "Просмотр";
      default:
        return "Неизвестно";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Users" size={20} />
            <span>Совместная работа</span>
          </CardTitle>
          <Button size="sm" onClick={onInvite}>
            <Icon name="UserPlus" size={16} className="mr-2" />
            Пригласить
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-3">
            Участники ({collaborators.length})
          </h4>
          <div className="space-y-3">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs">
                        {collaborator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {collaborator.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {collaborator.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {collaborator.isOnline ? "Онлайн" : collaborator.lastSeen}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={getRoleColor(collaborator.role)}
                >
                  {getRoleText(collaborator.role)}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-sm text-gray-900 mb-3">
            Настройки доступа
          </h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <Icon name="Link" size={16} className="mr-2" />
              Скопировать ссылку для просмотра
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <Icon name="Edit" size={16} className="mr-2" />
              Скопировать ссылку для редактирования
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки доступа
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationPanel;
