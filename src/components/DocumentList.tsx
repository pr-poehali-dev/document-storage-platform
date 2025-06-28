import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import DocumentCard from "./DocumentCard";

const DocumentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("modified");
  const [filterType, setFilterType] = useState("all");

  const mockDocuments = [
    {
      title: "Финансовый отчет Q3 2024",
      type: "pdf",
      size: "2.4 МБ",
      lastModified: "2 часа назад",
      collaborators: 3,
      isShared: true,
      version: "2.1",
      owner: "Анна Смирнова",
    },
    {
      title: "Техническое задание",
      type: "docx",
      size: "890 КБ",
      lastModified: "3 дня назад",
      collaborators: 2,
      isShared: false,
      version: "1.3",
      owner: "Вы",
    },
    {
      title: "Презентация продукта",
      type: "pptx",
      size: "5.1 МБ",
      lastModified: "Вчера",
      collaborators: 5,
      isShared: true,
      version: "3.0",
      owner: "Михаил Петров",
    },
    {
      title: "Аналитика продаж",
      type: "xlsx",
      size: "1.2 МБ",
      lastModified: "1 неделю назад",
      collaborators: 4,
      isShared: true,
      version: "1.5",
      owner: "Елена Козлова",
    },
    {
      title: "Договор поставки",
      type: "pdf",
      size: "1.8 МБ",
      lastModified: "1 месяц назад",
      collaborators: 1,
      isShared: false,
      version: "1.0",
      owner: "Вы",
    },
    {
      title: "Инструкция пользователя",
      type: "docx",
      size: "3.2 МБ",
      lastModified: "5 дней назад",
      collaborators: 0,
      isShared: false,
      version: "2.0",
      owner: "Вы",
    },
  ];

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "type":
        return a.type.localeCompare(b.type);
      case "size":
        return parseFloat(a.size) - parseFloat(b.size);
      default: // modified
        return 0; // In real app, would sort by actual dates
    }
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Поиск документов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Тип файла" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="docx">Word (.docx)</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
              <SelectItem value="pptx">PowerPoint (.pptx)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Сортировать:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modified">По дате</SelectItem>
              <SelectItem value="name">По имени</SelectItem>
              <SelectItem value="type">По типу</SelectItem>
              <SelectItem value="size">По размеру</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Document Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Все документы</TabsTrigger>
          <TabsTrigger value="my">Мои документы</TabsTrigger>
          <TabsTrigger value="shared">Общие</TabsTrigger>
          <TabsTrigger value="recent">Недавние</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments.map((doc, index) => (
              <DocumentCard key={index} {...doc} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments
              .filter((doc) => doc.owner === "Вы")
              .map((doc, index) => (
                <DocumentCard key={index} {...doc} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments
              .filter((doc) => doc.isShared)
              .map((doc, index) => (
                <DocumentCard key={index} {...doc} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments.slice(0, 6).map((doc, index) => (
              <DocumentCard key={index} {...doc} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {sortedDocuments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Документы не найдены
          </h3>
          <p className="text-gray-500">Попробуйте изменить критерии поиска</p>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
