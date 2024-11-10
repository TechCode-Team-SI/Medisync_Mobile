import { useEffect, useState } from 'react';
import { getMedicalCenters } from "@/src/services/medicalcenters/infoServices";

const useMedicalCenters = () => {
  const [medicalCenters, setMedicalCenters] = useState<{
    name: string,
    mission: string,
    vision: string,
  }>({ vision: '', mission: "", name: "" });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalCenters = async () => {
      const result = await getMedicalCenters();
      if (result.success) {
        setMedicalCenters(result.data);
      } else {
        setError(result.message || "Error al obtener información del centro médico.");
      }
    };

    fetchMedicalCenters();
  }, []);

  return { medicalCenters, error };
};

export default useMedicalCenters;
