import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";

import "./index.css";
import Image from "next/image";
import { FilePondFile } from "filepond";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { uploadWithPresignedUrl } from "@/lib/uploadS3";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginPdfPreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

interface Props {
  onFileUpload?: (name: string) => void;
  uploadedFrom: "app" | "medical-assistant";
}

const FileUpload = ({ onFileUpload, uploadedFrom }: Props) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pondFiles, setPondFiles] = useState<any[]>([]);

  const toggleImageFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef?.current?.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Load saved file URL on component mount
  useEffect(() => {
    const loadSavedFile = async () => {
      const savedFileUrl = localStorage.getItem('uploadedFileUrl');
      const savedFileName = localStorage.getItem('uploadedFileName');
      const savedFileType = localStorage.getItem('uploadedFileType');
      
      if (savedFileUrl && uploadedFrom === "app") {
        try {
          // Create a FilePond file representation
          const fileInfo = {
            source: savedFileUrl,
            options: {
              type: 'input',
              file: {
                name: savedFileName || 'uploaded-file',
                size: 0,
                type: savedFileType
              },
              metadata: {
                poster: savedFileUrl
              }
            }
          };
          
          setPondFiles([fileInfo]);
          setImageSrc(savedFileUrl);
        } catch (error) {
          console.error("Error loading saved file:", error);
        }
      }
    };
    
    loadSavedFile();
  }, [uploadedFrom]);

  const uploadFile = async (file: File) => {
    try {
      const key = `uploads/${file.name}`;
      const presignedUrl = await fetch(
        `/api/get-signed-image?key=${key}`
      ).then(res => res.text());

      const response = await uploadWithPresignedUrl(
        file as File,
        presignedUrl
      );

      // Save the file URL and name to localStorage
      const fileUrl = presignedUrl.split('?')[0]; // Remove query parameters to get clean URL
      localStorage.setItem('uploadedFileUrl', fileUrl);
      localStorage.setItem('uploadedFileName', file.name);
      localStorage.setItem('uploadedFileType', file.type);
      
      onFileUpload?.(file.name);
      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  }

  const handleFileChange = async (fileItems: FilePondFile[]) => {
    setPondFiles(fileItems);
    
    const file = fileItems[0]?.file;
    if (file) {
      setImageSrc(URL.createObjectURL(file));

      // Always upload the file
      uploadFile(file as File);
    } else {
      // If all files are removed, clear localStorage
      localStorage.removeItem('uploadedFileUrl');
      localStorage.removeItem('uploadedFileName');
      localStorage.removeItem('uploadedFileType');
      setImageSrc(null);
    }
  };

  return (
    <div className="relative hover:cursor-pointer">
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
          <div class="flex justify-center items-center ">
            <image alt="" src="/icons/upload.svg" class="h-10 w-10 mb-3"/>
          </div>
          <div>
            <div class="mb-1">
              <span class="text-primary-foreground font-medium">Click to upload</span>
              <span class="text-subtitle-dashboard text-opacity-80 text-xs"> or drag and drop</span>
            </div>
            <div>
              <span class="text-subtitle-dashboard text-opacity-80 text-xs">SVG, PNG, JPG, GIF (max. 800x400px)</span>
            </div>
          </div>'
      />

      {imageSrc && (
        <div className="mt-4">
          <Image
            ref={imageRef}
            src={imageSrc ?? ""}
            alt="Uploaded Image"
            height="500"
            width="500"
            className={cn(
              "w-full h-auto rounded-lg",
              isFullscreen ? "block" : "hidden"
            )}
          />
        </div>
      )}

      {imageSrc && pondFiles.length > 0 && (
        <Button
          variant="link"
          onClick={toggleImageFullscreen}
          className="absolute z-10 right-6 bottom-6 text-3xl rounded-md bg-white p-1 h-8"
        >
          <Image
            alt=""
            src="/icons/full-screen.svg"
            height="24"
            width="24"
            className="h-6 w-6"
          />
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
