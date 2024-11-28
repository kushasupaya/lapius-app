interface Props {
  summary: string;
}

const SummarySection = ({ summary }: Props) => {
  return (
    <div className="w-full h-full p-5 pt-3 text-left">
      {summary}
    </div>
  )
};

export default SummarySection;
