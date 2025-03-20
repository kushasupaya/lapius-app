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

// Storage keys used for localStorage
const STORAGE_KEYS = {
  FILE_URL: "uploadedFileUrl",
  FILE_NAME: "uploadedFileName",
  FILE_TYPE: "uploadedFileType",
  FILE_SIZE: "uploadedFileSize",
  UPLOAD_SOURCE: "uploadSource"
};

interface Props {
  onFileUpload?: (name: string) => void;
  uploadedFrom: "app" | "medical-assistant";
  setIsUploaded?: (isUploaded: boolean) => void;
}

const FileUpload = ({ onFileUpload, uploadedFrom, setIsUploaded }: Props) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pondFiles, setPondFiles] = useState<any[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

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

  // Load saved file URL on component mount - only once
  useEffect(() => {
    // Skip if we've already loaded the initial file
    if (initialLoadComplete) return;
    
    const loadSavedFile = async () => {
      const savedFileUrl = localStorage.getItem(STORAGE_KEYS.FILE_URL);
      const savedFileName = localStorage.getItem(STORAGE_KEYS.FILE_NAME);
      const savedFileType = localStorage.getItem(STORAGE_KEYS.FILE_TYPE);
      const savedFileSize = localStorage.getItem(STORAGE_KEYS.FILE_SIZE);
      const savedUploadSource = localStorage.getItem(STORAGE_KEYS.UPLOAD_SOURCE);

      // Check if there's a saved file
      if (savedFileUrl && savedFileName) {
        try {
          // For FilePond, we need to create a file object with the correct structure
          const fileInfo = {
            source: savedFileUrl,
            options: {
              type: "local",
              file: {
                name: savedFileName,
                size: savedFileSize ? parseInt(savedFileSize) : 0,
                type: savedFileType || "",
              },
            },
          };

          setPondFiles([fileInfo]);
          setImageSrc(savedFileUrl);
          
          // Notify parent component that a file is loaded
          if (onFileUpload) {
            onFileUpload(savedFileName);
          }
          
          // Set uploaded flag if component is in app view
          if (setIsUploaded) {
            setIsUploaded(true);
          }
        } catch (error) {
          console.error("Error loading saved file:", error);
          // Clear localStorage if there's an error loading the file
          clearStoredFileData();
        }
      }
      
      // Mark initial load as complete to prevent future runs
      setInitialLoadComplete(true);
    };

    loadSavedFile();
  }, [onFileUpload, setIsUploaded, initialLoadComplete]);

  const clearStoredFileData = () => {
    localStorage.removeItem(STORAGE_KEYS.FILE_URL);
    localStorage.removeItem(STORAGE_KEYS.FILE_NAME);
    localStorage.removeItem(STORAGE_KEYS.FILE_TYPE);
    localStorage.removeItem(STORAGE_KEYS.FILE_SIZE);
    localStorage.removeItem(STORAGE_KEYS.UPLOAD_SOURCE);
    
    setImageSrc(null);
    setPondFiles([]);
    
    // Notify parent component that file was removed
    if (setIsUploaded) {
      setIsUploaded(false);
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const key = `${file.name}`;
      const presignedUrl = await fetch(`/api/get-signed-image?key=${key}`).then(
        (res) => res.text()
      );
      await uploadWithPresignedUrl(file as File, presignedUrl);
      
      // Generate public URL for the uploaded file
      const publicUrl = `https://imagemedbill.s3.us-east-1.amazonaws.com/${key}`;
      
      // Save file metadata to localStorage
      localStorage.setItem(STORAGE_KEYS.FILE_URL, publicUrl);
      localStorage.setItem(STORAGE_KEYS.FILE_NAME, file.name);
      localStorage.setItem(STORAGE_KEYS.FILE_TYPE, file.type);
      localStorage.setItem(STORAGE_KEYS.FILE_SIZE, file.size.toString());
      localStorage.setItem(STORAGE_KEYS.UPLOAD_SOURCE, uploadedFrom);
      
      // Notify parent component
      if (onFileUpload) {
        onFileUpload(file.name);
      }
      
      // Set uploaded flag if component is used in app view
      if (setIsUploaded) {
        setIsUploaded(true);
      }
      
      return publicUrl;
    } catch (error) {
      console.error("Failed to upload file:", error);
      return null;
    }
  };

  const handleFileChange = async (fileItems: FilePondFile[]) => {
    setPondFiles(fileItems);

    const file = fileItems[0]?.file;
    
    if (file) {
      // Upload the file and get the public URL
      const publicUrl = await uploadFile(file as File);
      if (publicUrl) {
        setImageSrc(publicUrl);
      }
    } else {
      // If all files are removed, clear localStorage
      clearStoredFileData();
    }
  };

  return (
    <div className="relative hover:cursor-pointer">
      <FilePond
        files={pondFiles}
        onupdatefiles={handleFileChange}
        allowMultiple={false}
        maxFiles={1}
        server={{
          load: (source, load, error, progress, abort, headers) => {
            // This is crucial for loading remote files
            fetch(source)
              .then(response => {
                if (!response.ok) {
                  error('Failed to fetch image');
                  return;
                }
                return response.blob();
              })
              .then(blob => {
                if (blob) {
                  load(blob);
                }
              })
              .catch(err => {
                console.error('Error loading file:', err);
                error('Failed to load file');
              });
              
            // Return abort function
            return {
              abort: () => {
                // This is optional but good practice
                abort();
              }
            };
          }
        }}
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
            src={imageSrc}
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