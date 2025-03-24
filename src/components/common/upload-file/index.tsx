"use client";
import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import { FilePondFile } from "filepond";
import { uploadWithPresignedUrl } from "@/lib/uploadS3";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./index.css";

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
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [pondFiles, setPondFiles] = useState<any[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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
        setImageSrc(publicUrl);
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

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleImageFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef?.current?.requestFullscreen();
      }
    } else {
      console.log("Image ref does not exist");
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

export default UploadFile;
