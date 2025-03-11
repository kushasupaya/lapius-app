const AdvantagesSection = () => {
  return (
    <section className="bg-muted">
      <div className="container px-4 xl:px-0 py-16 lg:py-28 mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium mb-4 text-center">
          The Lapius Advantage
        </h2>
        <p className="text-base md:text-lg max-w-[622px] text-center mx-auto mb-12 md:mb-24">
          Amet minim mollit non deserunt ullamco est site aliqua dolor. velit amet suiget officia. Exercitation veniam consequat sit.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="w-full h-[395px] bg-background px-9 py-16 border-[3px] border-tertiary rounded-lg text-base md:text-xl">
            Your health information is encrypted and stored securely, meeting strict <strong>HIPAA</strong> standards.
          </div>
          <div className="w-full h-[395px] bg-background px-9 py-16 border-[3px] border-tertiary rounded-lg text-base md:text-xl">
            Our technology uses advanced algorithms trained on thousands of medical claims to detect errors in under a minute. By contrast, traditional dispute services take days to uncover the same issues.
          </div>
          <div className="w-full h-[395px] bg-background px-9 py-16 border-[3px] border-tertiary rounded-lg text-base md:text-xl">
            We’re transparent about our process, fees, and any next steps—so you know exactly where your dispute stands at all times.
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdvantagesSection;
