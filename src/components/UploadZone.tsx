import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface UploadFile {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
}

const UploadZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const supportedFormats = {
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/pdf": "PDF",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PPTX",
    "text/plain": "TXT",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const validateFile = (file: File): boolean => {
    if (!Object.keys(supportedFormats).includes(file.type)) {
      alert(`Формат ${file.type} не поддерживается`);
      return false;
    }
    if (file.size > maxFileSize) {
      alert(`Файл ${file.name} превышает максимальный размер 50 МБ`);
      return false;
    }
    return true;
  };

  const simulateUpload = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.file === file
                ? { ...f, progress: 100, status: "completed" }
                : f,
            ),
          );
          resolve();
        } else {
          setUploadFiles((prev) =>
            prev.map((f) => (f.file === file ? { ...f, progress } : f)),
          );
        }
      }, 200);
    });
  };

  const handleFiles = async (files: FileList) => {
    const validFiles = Array.from(files).filter(validateFile);

    const newUploadFiles = validFiles.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setUploadFiles((prev) => [...prev, ...newUploadFiles]);

    // Simulate upload for each file
    validFiles.forEach((file) => simulateUpload(file));
  };

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
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes("word")) return "FileText";
    if (type.includes("pdf")) return "FileText";
    if (type.includes("excel") || type.includes("sheet")) return "Sheet";
    if (type.includes("powerpoint") || type.includes("presentation"))
      return "Presentation";
    if (type.includes("image")) return "Image";
    return "File";
  };

  return (
    <div className="space-y-4">
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

          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png"
          />
          <label htmlFor="file-upload">
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <span>
                <Icon name="Plus" size={16} className="mr-2" />
                Выбрать файлы
              </span>
            </Button>
          </label>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Поддерживаются: Word (.doc, .docx), PDF, Excel (.xls, .xlsx),
            <br />
            PowerPoint (.ppt, .pptx), изображения (до 50 МБ)
          </p>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadFiles.length > 0 && (
        <div className="space-y-3">
          {uploadFiles.map((uploadFile, index) => (
            <Card key={index} className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon
                    name={getFileIcon(uploadFile.file.type)}
                    size={20}
                    className="text-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {uploadFile.file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(uploadFile.file.size / 1024 / 1024).toFixed(1)} МБ
                      </span>
                    </div>
                    <Progress value={uploadFile.progress} className="h-2" />
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {uploadFile.status === "completed"
                          ? "Загружено"
                          : "Загрузка..."}
                      </span>
                      <span className="text-xs text-gray-500">
                        {Math.round(uploadFile.progress)}%
                      </span>
                    </div>
                  </div>
                  {uploadFile.status === "completed" && (
                    <Icon
                      name="CheckCircle"
                      size={20}
                      className="text-green-600"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadZone;
