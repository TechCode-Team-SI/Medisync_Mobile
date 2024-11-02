import { addCommentToTicket } from '@/src/services/tickets/ticketsServices';

export const handleSendComment = async (id: string, inputTex: string, setModalMessage: (message: string) => void, setModalVisible: (visible: boolean) => void, setInputTex: (text: string) => void) => {
  if (!inputTex.trim()) {
    setModalMessage("Por favor ingresa un mensaje antes de enviar.");
    setModalVisible(true);
    return;
  }

  console.log("Enviando comentario:", inputTex);

  const result = await addCommentToTicket(id, inputTex);

  if (result.success) {
    console.log("Comentario enviado exitosamente:", result.data);
    setModalMessage("Tu comentario ha sido enviado exitosamente.");
    setModalVisible(true);
    setInputTex(''); 
  } else {
    console.error("Error al enviar el comentario:", result.message);
    setModalMessage("No se pudo enviar el comentario.");
    setModalVisible(true);
  }
};
