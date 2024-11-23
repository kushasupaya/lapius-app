interface Props {
  title: string;
}

const SectionTitle = ({ title }: Props) => {
  return (
    <div className="bg-primary-light h-9 px-4 py-1 rounded-[37px] border border-primary w-fit">
      <h3 className="text-xs text-secondary font-semibold leading-7 uppercase">
        { title }
      </h3>
    </div>
  )
}

export default SectionTitle;
