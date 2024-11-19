export const getTypeLabel = (type: string) => {
    switch (type) {
      case 'complaint':
        return 'Reclamo';
      case 'suggestion':
        return 'Sugerencia';
      default:
        return type;
    }
  };

export const getStatusLabel = (status: string) => {
    return status === 'open' ? 'Abierto' : status;
  };

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('es-ES'), 
      time: date.toLocaleTimeString('es-ES'), 
    };
  };