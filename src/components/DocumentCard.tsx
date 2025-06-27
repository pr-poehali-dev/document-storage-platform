import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface DocumentCardProps {
  title: string;
  type: string;
  size: string;
  lastModified: string;
  preview?: string;
  collaborators?: number;
}

const DocumentCard = ({
  title,
  type,
  size,
  lastModified,
  preview,
  collaborators,
}: DocumentCardProps) => {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "FileText";
      case "doc":
      case "docx":
        return "FileType";
      case "xls":
      case "xlsx":
        return "Sheet";
      case "ppt":
      case "pptx":
        return "Presentation";
      case "img":
      case "jpg":
      case "png":
        return "Image";
      default:
        return "File";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-purple-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon
                name={getFileIcon(type)}
                size={20}
                className="text-purple-600"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-gray-500">{size}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {type.toUpperCase()}
          </Badge>
        </div>

        {preview && (
          <div className="mb-3 h-20 bg-gray-50 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-400">
              Предварительный просмотр
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{lastModified}</span>
          {collaborators && (
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{collaborators}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
