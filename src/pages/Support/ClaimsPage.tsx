import TicketPage from "@/src/components/SupportComponents/TicketPage";

const ClaimsPage: React.FC = () => {
  return (
    <TicketPage
      title="Reclamos"
      icon="alert"
      descriptionText="¿Algo no está bien? Escribe tu reclamo."
      type="complaint"
    />
  );
};

export default ClaimsPage;
