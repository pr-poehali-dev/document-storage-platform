import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const UploadZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  return (
    <Card
      className={`border-2 border-dashed transition-all duration-300 ${
        isDragOver
          ? "border-purple-400 bg-purple-50"
          : "border-gray-300 hover:border-purple-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
            isDragOver ? "bg-purple-200" : "bg-gray-100"
          }`}
        >
          <Icon
            name="Upload"
            size={32}
            className={isDragOver ? "text-purple-600" : "text-gray-500"}
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Перетащите файлы сюда
        </h3>
        <p className="text-gray-500 text-center mb-6">
          или нажмите для выбора файлов с компьютера
        </p>

        <Button className="bg-purple-600 hover:bg-purple-700">
          <Icon name="Plus" size={16} className="mr-2" />
          Выбрать файлы
        </Button>

        <p className="text-xs text-gray-400 mt-4">
          Поддерживаются: PDF, DOC, XLS, PPT, изображения (до 50 МБ)
        </p>
      </CardContent>
    </Card>
  );
};

export default UploadZone;
