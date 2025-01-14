import { Lock } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4">
      <div>
        <Lock className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-gray-600">
          Your privacy is our priority. Your data is encrypted, secure, and
          fully protected under{" "}
          <a href="#" className="text-primary underline hover:text-green-500">
            HIPAA compliance
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyNotice;
