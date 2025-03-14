import FileUpload from "@/components/common/file-upload";

interface Props {
  files: Array<File | Blob | string>;
  setFiles: React.Dispatch<React.SetStateAction<Array<File | Blob | string>>>;
}

const ImageUploadSection = ({ files, setFiles }: Props) => {
  return (
    <div className="bg-white border-2 border-tertiary rounded-[32px] w-full p-4 md:p-6 h-full md:h-[610px]">
      <h3 className="text-4xl font-bold text-foreground mb-1">
        Upload your medical bill
      </h3>
      <p className="text-primary-foreground font-medium text-base mb-6">
        See the results by uploading your medical bill.
      </p>
      <FileUpload files={files} setFiles={setFiles} />
    </div>
  );
};

export default ImageUploadSection;
