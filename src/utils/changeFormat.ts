export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  export const formatGender = (gender: string | string[] | undefined) => {
    if (Array.isArray(gender)) {
      return gender[0] === "F" ? "Femenino" : "Masculino";
    }
    return gender === "F" ? "Femenino" : gender === "M" ? "Masculino" : "No especificado";
  };

  export const capitalizeFirstLetter = (text: string): string => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };