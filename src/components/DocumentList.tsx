import DocumentCard from "./DocumentCard";

const DocumentList = () => {
  const mockDocuments = [
    {
      title: "Финансовый отчет Q3 2024",
      type: "pdf",
      size: "2.4 МБ",
      lastModified: "2 часа назад",
      collaborators: 3,
    },
    {
      title: "Презентация продукта",
      type: "ppt",
      size: "5.1 МБ",
      lastModified: "Вчера",
      collaborators: 5,
    },
    {
      title: "Техническое задание",
      type: "doc",
      size: "890 КБ",
      lastModified: "3 дня назад",
      collaborators: 2,
    },
    {
      title: "Аналитика продаж",
      type: "xls",
      size: "1.2 МБ",
      lastModified: "1 неделю назад",
      collaborators: 4,
    },
    {
      title: "Логотип компании",
      type: "img",
      size: "340 КБ",
      lastModified: "2 недели назад",
    },
    {
      title: "Договор поставки",
      type: "pdf",
      size: "1.8 МБ",
      lastModified: "1 месяц назад",
      collaborators: 1,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockDocuments.map((doc, index) => (
        <DocumentCard key={index} {...doc} />
      ))}
    </div>
  );
};

export default DocumentList;
