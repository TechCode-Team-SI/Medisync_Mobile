import { useState, useEffect } from "react";
import { getTicketTag } from "@/src/services/tickets/ticketsServices";

const useTicketTags = (type: "suggestion" | "complaint") => {
  const [ticketTags, setTicketTags] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (type === "complaint") {
      const fetchTicketTags = async () => {
        try {
          const result = await getTicketTag();
          if (result.success) {
            setTicketTags(Array.isArray(result.data.data) ? result.data.data : []);
          } else {
            setError(result.message || "Error al obtener los tipos de reclamo.");
          }
        } catch (err) {
          setError("Hubo un problema al obtener los tipos de reclamo.");
        }
      };
      fetchTicketTags();
    }
  }, [type]);

  return { ticketTags, error };
};

export default useTicketTags;
