import ClientsSlider from "./components/clients-slider";

const ClientsSection = () => {
  return (
    <section className="w-full border-b">
      <div className="container px-4 xl:px-0 py-14 lg:py-24 mx-auto">
        <ClientsSlider />
      </div>
    </section>
  )
}

export default ClientsSection;
