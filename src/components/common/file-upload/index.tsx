import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

import "./index.css";
import Image from "next/image";
import { FilePondFile } from "filepond";
import { Button } from "@/components/ui/button";
import { uploadWithPresignedUrl } from "@/lib/uploadS3";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginPdfPreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

const getStorageKey = (key: string, source: string) => `${source}:${key}`;

const STORAGE_KEYS = {
  FILE_URL: "uploadedFileUrl",
  FILE_NAME: "uploadedFileName",
  FILE_TYPE: "uploadedFileType",
  FILE_SIZE: "uploadedFileSize",
  UPLOAD_SOURCE: "uploadSource",
  FILE_KEY: "uploadedFileKey"
};

interface Props {
  onFileUpload?: (name: string, url: string) => void;
  onFileRemove?: () => void;
  uploadedFrom: "app" | "medical-assistant";
  setIsUploaded?: (isUploaded: boolean) => void;
  maxFileSizeMB?: number;
  allowedFileTypes?: string[];
}

const FileUpload = ({ 
  onFileUpload, 
  onFileRemove,
  uploadedFrom, 
  setIsUploaded,
  maxFileSizeMB = 10,
  allowedFileTypes = ["image/png", "image/jpeg", "image/gif", "application/pdf"]
}: Props) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pondFiles, setPondFiles] = useState<any[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  const toggleImageFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
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

  const createSafeS3Url = (key: string): string => {
    const encodedKey = encodeURIComponent(key);
    return `https://imagemedbill.s3.us-east-1.amazonaws.com/${encodedKey}`;
  };

  const verifyUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error("Error verifying URL:", error);
      return false;
    }
  };

  useEffect(() => {
    if (initialLoadComplete) return;

    const loadSavedFile = async () => {
      setIsLoading(true);
      setLoadError(null);
      
      try {
        const savedFileUrl = localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_URL, uploadedFrom));
        const savedFileName = localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_NAME, uploadedFrom));
        const savedFileType = localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_TYPE, uploadedFrom));
        const savedFileSize = localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_SIZE, uploadedFrom));
        const savedFileKey = localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_KEY, uploadedFrom));
        const savedUploadSource = localStorage.getItem(getStorageKey(STORAGE_KEYS.UPLOAD_SOURCE, uploadedFrom));

        // Check if there's a saved file for this source
        if (savedFileUrl && savedFileName) {
          // Verify URL accessibility
          let finalUrl = savedFileUrl;
          let isUrlValid = await verifyUrl(savedFileUrl);
          
          // Try to regenerate URL if invalid but we have the key
          if (!isUrlValid && savedFileKey) {
            finalUrl = createSafeS3Url(savedFileKey);
            isUrlValid = await verifyUrl(finalUrl);
            
            if (isUrlValid) {
              // Update localStorage with new URL
              localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_URL, uploadedFrom), finalUrl);
            } else {
              throw new Error("Could not access the file");
            }
          }
          
          // Create file info for FilePond
          const fileInfo = {
            source: finalUrl,
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
          setImageSrc(finalUrl);

          if (onFileUpload) {
            onFileUpload(savedFileName, finalUrl);
          }
          
          if (setIsUploaded) {
            setIsUploaded(true);
          }
        }
      } catch (error) {
        console.error("Error loading saved file:", error);
        setLoadError("Failed to load the previously uploaded file");
        clearStoredFileData(true);
      } finally {
        setIsLoading(false);
        setInitialLoadComplete(true);
      }
    };

    loadSavedFile();
  }, [onFileUpload, setIsUploaded, initialLoadComplete, uploadedFrom]);

  // Clear stored file data with option to persist across routes
  const clearStoredFileData = (currentSourceOnly = false) => {
    if (currentSourceOnly) {
      // Clear only for current source
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(getStorageKey(key, uploadedFrom));
      });
    } else {
      // Clear both app and medical-assistant sources
      ["app", "medical-assistant"].forEach(source => {
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(getStorageKey(key, source));
        });
      });
    }
    
    setImageSrc(null);
    setPondFiles([]);
    setLoadError(null);
    
    if (setIsUploaded) {
      setIsUploaded(false);
    }
    
    if (onFileRemove) {
      onFileRemove();
    }
  };

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setLoadError(null);
    setUploadProgress(0);
    
    try {
      const timestamp = new Date().getTime();
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const key = `${uploadedFrom}-${timestamp}-${safeFileName}`;

      const presignedUrl = await fetch(`/api/get-signed-image?key=${key}`).then(
        (res) => {
          if (!res.ok) {
            throw new Error("Failed to get presigned URL");
          }
          return res.text();
        }
      );

      await uploadWithPresignedUrl(file, presignedUrl, (progress) => {
        setUploadProgress(progress);
      });

      const publicUrl = createSafeS3Url(key);
      const isUrlValid = await verifyUrl(publicUrl);

      if (!isUrlValid) {
        throw new Error("Uploaded file is not accessible");
      }

      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_URL, uploadedFrom), publicUrl);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_NAME, uploadedFrom), file.name);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_TYPE, uploadedFrom), file.type);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_SIZE, uploadedFrom), file.size.toString());
      localStorage.setItem(getStorageKey(STORAGE_KEYS.UPLOAD_SOURCE, uploadedFrom), uploadedFrom);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_KEY, uploadedFrom), key);

      // Also save to other source for cross-route access
      const otherSource = uploadedFrom === "app" ? "medical-assistant" : "app";
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_URL, otherSource), publicUrl);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_NAME, otherSource), file.name);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_TYPE, otherSource), file.type);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_SIZE, otherSource), file.size.toString());
      localStorage.setItem(getStorageKey(STORAGE_KEYS.UPLOAD_SOURCE, otherSource), uploadedFrom);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_KEY, otherSource), key);

      if (onFileUpload) {
        onFileUpload(file.name, publicUrl);
      }

      if (setIsUploaded) {
        setIsUploaded(true);
      }

      return publicUrl;
    } catch (error) {
      console.error("Failed to upload file:", error);
      setLoadError("Failed to upload file. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = async (fileItems: FilePondFile[]) => {
    setPondFiles(fileItems);

    const file = fileItems[0]?.file;

    if (file) {
      const fileSizeInMB = (file as File).size / (1024 * 1024);
      if (fileSizeInMB > maxFileSizeMB) {
        setLoadError(`File too large. Maximum size is ${maxFileSizeMB}MB.`);
        setPondFiles([]);
        return;
      }

      const publicUrl = await uploadFile(file as File);
      if (publicUrl) {
        setImageSrc(publicUrl);
      }
    } else {
      clearStoredFileData(false); // Clear across all sources
    }
  };

  const handleRetryLoad = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const savedFileKey = localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_KEY, uploadedFrom));
      
      if (savedFileKey) {
        const newUrl = createSafeS3Url(savedFileKey);
        const isValid = await verifyUrl(newUrl);
        
        if (isValid) {
          localStorage.setItem(getStorageKey(STORAGE_KEYS.FILE_URL, uploadedFrom), newUrl);
          setImageSrc(newUrl);
          
          // Create file info for FilePond
          const fileInfo = {
            source: newUrl,
            options: {
              type: "local",
              file: {
                name: localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_NAME, uploadedFrom)) || "file",
                size: parseInt(localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_SIZE, uploadedFrom)) || "0"),
                type: localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_TYPE, uploadedFrom)) || "",
              },
            },
          };

          setPondFiles([fileInfo]);
          setLoadError(null);

          if (onFileUpload && localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_NAME, uploadedFrom))) {
            onFileUpload(
              localStorage.getItem(getStorageKey(STORAGE_KEYS.FILE_NAME, uploadedFrom)) || "file",
              newUrl
            );
          }

          if (setIsUploaded) {
            setIsUploaded(true);
          }
        } else {
          throw new Error("File still inaccessible");
        }
      } else {
        throw new Error("No file key found");
      }
    } catch (error) {
      console.error("Retry failed:", error);
      setLoadError("Failed to reload file. Please upload again.");
      clearStoredFileData(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <FilePond
        files={pondFiles}
        onupdatefiles={handleFileChange}
        allowMultiple={false}
        maxFiles={1}
        disabled={isLoading}
        imageResizeTargetWidth={1200}
        imageResizeMode="contain"
        allowImageResize={true}
        acceptedFileTypes={allowedFileTypes}
        server={{
          load: (source, load, error, progress, abort, headers) => {
            fetch(source)
              .then(response => {
                if (!response.ok) {
                  error('Failed to fetch image');
                  return null;
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
              
            return {
              abort: () => {
                abort();
              }
            };
          }
        }}
        labelIdle={`
          <div class="flex justify-center items-center ">
            <image alt="" src="/icons/upload.svg" class="h-10 w-10 mb-3"/>
          </div>
          <div>
            <div class="mb-1">
              <span class="text-primary-foreground font-medium">Click to upload</span>
              <span class="text-subtitle-dashboard text-opacity-80 text-xs"> or drag and drop</span>
            </div>
            <div>
              <span class="text-subtitle-dashboard text-opacity-80 text-xs">PNG, JPG, GIF, PDF (max ${maxFileSizeMB}MB)</span>
            </div>
          </div>
        `}
      />

      {loadError && (
        <div className="mt-2 text-red-500 text-sm flex items-center justify-between">
          <span>{loadError}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetryLoad}
            disabled={isLoading}
          >
            Retry
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="mt-2">
          <div className="text-blue-500 text-sm">Processing... {uploadProgress > 0 ? `${uploadProgress.toFixed(0)}%` : ''}</div>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}

      {/* {imageSrc && !isFullscreen && (
        <div className="mt-4">
          <Image
            ref={imageRef}
            src={imageSrc}
            alt="Uploaded Image"
            height="500"
            width="500"
            className="w-full h-auto rounded-lg"
            onError={() => {
              setLoadError("Failed to load image. The image might be corrupted or inaccessible.");
            }}
          />
        </div>
      )} */}

      {/* {imageSrc && pondFiles.length > 0 && (
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
      )} */}

      {/* {isFullscreen && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <Image
            ref={imageRef}
            src={imageSrc}
            alt="Uploaded Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )} */}
    </div>
  );
};

export default FileUpload;
