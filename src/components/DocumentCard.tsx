import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

interface DocumentCardProps {
  title: string;
  type: string;
  size: string;
  lastModified: string;
  preview?: string;
  collaborators?: number;
  isShared?: boolean;
  version?: string;
  owner?: string;
}

const DocumentCard = ({
  title,
  type,
  size,
  lastModified,
  preview,
  collaborators,
  isShared = false,
  version = "1.0",
  owner = "Вы",
}: DocumentCardProps) => {
  const getFileIcon = (type: string) => {
    const fileType = type.toLowerCase();
    switch (fileType) {
      case "pdf":
        return { icon: "FileText", color: "text-red-600", bg: "bg-red-100" };
      case "doc":
      case "docx":
        return { icon: "FileText", color: "text-blue-600", bg: "bg-blue-100" };
      case "xls":
      case "xlsx":
        return { icon: "Sheet", color: "text-green-600", bg: "bg-green-100" };
      case "ppt":
      case "pptx":
        return {
          icon: "Presentation",
          color: "text-orange-600",
          bg: "bg-orange-100",
        };
      case "txt":
        return { icon: "FileText", color: "text-gray-600", bg: "bg-gray-100" };
      case "img":
      case "jpg":
      case "png":
        return { icon: "Image", color: "text-purple-600", bg: "bg-purple-100" };
      default:
        return { icon: "File", color: "text-gray-600", bg: "bg-gray-100" };
    }
  };

  const fileInfo = getFileIcon(type);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-purple-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <div
              className={`w-10 h-10 ${fileInfo.bg} rounded-lg flex items-center justify-center`}
            >
              <Icon name={fileInfo.icon} size={20} className={fileInfo.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                {title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{size}</span>
                <span>•</span>
                <span>v{version}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {type.toUpperCase()}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Icon name="Eye" size={16} className="mr-2" />
                  Просмотр
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Share2" size={16} className="mr-2" />
                  Поделиться
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Copy" size={16} className="mr-2" />
                  Копировать
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {preview && (
          <div className="mb-3 h-20 bg-gray-50 rounded-md flex items-center justify-center border">
            <span className="text-xs text-gray-400">
              Предварительный просмотр
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{lastModified}</span>
            <span>•</span>
            <span>{owner}</span>
          </div>
          <div className="flex items-center space-x-2">
            {isShared && (
              <Icon name="Share2" size={12} className="text-blue-600" />
            )}
            {collaborators && collaborators > 0 && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Icon name="Users" size={12} />
                <span>{collaborators}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
