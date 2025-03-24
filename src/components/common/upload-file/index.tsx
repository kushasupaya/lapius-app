import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import { FilePondFile } from "filepond";
import { uploadWithPresignedUrl } from "@/lib/uploadS3";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginPdfPreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

interface Props {
  onUploadComplete?: (url: string) => void;
}

const UploadFile = ({ onUploadComplete }: Props) => {
  const [pondFiles, setPondFiles] = useState<any[]>([]);

  const uploadFile = async (file: File) => {
    try {
      const key = `${file.name}`;
      const presignedUrl = await fetch(`/api/get-signed-image?key=${key}`).then(
        (res) => res.text()
      );
      await uploadWithPresignedUrl(file as File, presignedUrl);

      const publicUrl = `https://imagemedbill.s3.us-east-1.amazonaws.com/${key}`;

      // Call onUploadComplete with the public URL if provided
      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  const handleFileChange = async (fileItems: FilePondFile[]) => {
    setPondFiles(fileItems);

    const file = fileItems[0]?.file;
    if (file) {
      await uploadFile(file as File);
    }
  };

  return (
    <div className="relative">
      <FilePond
        files={pondFiles}
        onupdatefiles={handleFileChange}
        allowMultiple={false}
        maxFiles={1}
        acceptedFileTypes={[
          "image/png",
          "image/jpeg",
          "image/gif",
          "application/pdf",
        ]}
        labelIdle='
          <div class="flex justify-center items-center">
            <image alt="" src="/icons/upload.svg" class="h-10 w-10 mb-3"/>
          </div>
          <div>
            <div class="mb-1">
              <span class="text-primary-foreground font-medium">Click to upload</span>
              <span class="text-subtitle-dashboard text-opacity-80 text-xs"> or drag and drop</span>
            </div>
            <div>
              <span class="text-subtitle-dashboard text-opacity-80 text-xs">PNG, JPG, GIF or PDF files</span>
            </div>
          </div>'
      />
    </div>
  );
};

export default UploadFile;
