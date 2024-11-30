import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { S3 } from "aws-sdk";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

import "./index.css";
import Image from "next/image";
import { FilePondFile } from "filepond";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Fullscreen, FullscreenIcon } from "lucide-react";
import { uploadFileToS3, uploadWithPresignedUrl } from "@/lib/uploadS3";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

interface Props {
  files: Array<File | Blob | string>;
  setFiles: React.Dispatch<React.SetStateAction<Array<File | Blob | string>>>;
}

const FileUpload = ({ files, setFiles }: Props) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleFileChange = async (fileItems: FilePondFile[]) => {
    const file = fileItems[0]?.file;
    setFiles(fileItems.map((fileItem) => fileItem.file));
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      try {
        const key = `uploads/${file.name}`;
        const presignedUrl = await fetch(
          `/api/get-signed-image?key=${key}`
        ).then((res) => res.text());
        const response = await uploadWithPresignedUrl(
          file as File,
          presignedUrl
        );
        // const imageFile = new File([file], key, { type: file.type });
        // const response = await uploadFileToS3(imageFile, key);
        console.log("Upload successful:", response);
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  };

  return (
    <div className="relative hover:cursor-pointer">
      <FilePond
        files={files}
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

      {imageSrc && files.length > 0 && (
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
