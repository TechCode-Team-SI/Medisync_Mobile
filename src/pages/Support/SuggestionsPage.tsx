import TicketPage from "@/src/components/SupportComponents/TicketPage";

const SuggestionsPage: React.FC = () => {
  return (
    <TicketPage
      title="Sugerencias"
      icon="alert"
      descriptionText="¿Tienes alguna sugerencia? Compártela con nosotros."
      type="suggestion"
    />
  );
};

export default SuggestionsPage;

