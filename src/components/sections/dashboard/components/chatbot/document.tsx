"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, Plus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  date: string;
  time: string;
}

interface DocumentListProps {
  onSelectDocument: (doc: Document) => void;
  activeDocumentId?: string;
}

const DocumentList = ({
  onSelectDocument,
  activeDocumentId,
}: DocumentListProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "Medical_bill_02/09.pdf", date: "Dec 9", time: "2:00 PM" },
    { id: "2", name: "Medical_bill_02/09.pdf", date: "Dec 6", time: "8:21 PM" },
    { id: "3", name: "Medical_bill_02/09.pdf", date: "Dec 4", time: "2:00 PM" },
    { id: "4", name: "Medical_bill_02/09.pdf", date: "Dec 3", time: "3:10 PM" },
    { id: "5", name: "Medical_bill_02/09.pdf", date: "Dec 3", time: "3:10 PM" },
    { id: "6", name: "Medical_bill_02/09.pdf", date: "Dec 2", time: "4:20 PM" },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files?.length) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF, PNG, or JPG file");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const newDoc: Document = {
      id: Date.now().toString(),
      name: selectedFile.name,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setDocuments([newDoc, ...documents]);
    onSelectDocument(newDoc);
    setSelectedFile(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="w-full h-min-screen flex flex-col border px-4 py-2 rounded-xl bg-white space-y-2">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-[#00463E]">
          Uploaded Documents
        </h2>

        {!selectedFile ? (
          <div
            className={cn(
              "relative border-2 border-dashed rounded-lg transition-colors hover:cursor-pointer",
              isDragging
                ? "border-[#00463E] bg-[#00463E]/10 shadow-lg"
                : "border-gray-300",
              "hover:border-[#00463E] hover:bg-gray-100/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-4 text-center space-y-2"
            >
              <Button
                className="w-full bg-primary hover:bg-[#003E34] text-white h-12 text-lg shadow-md"
                variant="secondary"
              >
                <Plus className="mr-0.5 h-5 w-5" /> Add New
              </Button>
              <div className="text-sm text-gray-500">
                or drag and drop your file here
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-100 border rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-primary" />
                <span className="text-sm truncate max-w-[140px] font-medium text-gray-800">
                  {selectedFile.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-red-100"
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 border-red-600 hover:bg-red-600 hover:text-white text-red-600 border"
                variant="outline"
                onClick={() => setSelectedFile(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#00463E] hover:bg-[#003E34] text-white shadow-md"
                onClick={handleUpload}
              >
                Start Chat
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id} className=" text-black">
            <button
              onClick={() => onSelectDocument(doc)}
              className={cn(
                "w-full text-left hover:bg-gray-200 rounded-lg transition-colors",
                " border-gray-200",
                activeDocumentId === doc.id &&
                  "bg-primary text-white hover:bg-[#00463E]"
              )}
            >
              <CardHeader className="font-medium px-4 py-2 border-b hover:border-b-white">
                <div className="flex justify-between items-center ">
                  <div>
                    {doc.date}
                    <span className="ml-1 text-xs opacity-70"> {doc.time}</span>
                  </div>
                  {activeDocumentId === doc.id ? (
                    <ChevronLeft className="h-5 w-5" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div>{doc.name}</div>
              </CardContent>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
