import Image from "next/image";
import { SeverityAccordion } from "../components";
import { Severity } from "../components/severity-accordion";

export interface Upcoding {
  id: string;
  title: string;
  description: string;
  severity: string;
}

interface Props {
  data: Upcoding[];
}

const UnbundingSection = ({ data }: Props) => {
  return (
    <div className="w-full h-full p-5 pt-3">
      <div className="flex flex-col gap-4">
        {data.map((coding, index) => (
          <SeverityAccordion
            key={index}
            id={coding.id}
            title={coding.title}
            description={coding.description}
            severity={coding.severity as Severity}
          />
        ))}
      </div>
    </div>
  );
};

export default UnbundingSection;
