// Agregar la nueva clase para el estilo de la imagen
export const stylesBoard = {
  //////General//////
  container: "flex-1 bg-white relative",
  searchContainer: "items-center my-2.5",
  container3: "bg-white w-full flex-1 rounded-t-lg",

  ////ItemList///////////////
  container6: "mt-4 ml-4 mr-4 mb-2 p-4 border border-white rounded-lg bg-bgMenu",
  image: "w-full h-50 rounded-lg", // Aquí ajustamos el tamaño de la imagen para el contenedor de la imagen
  imageWithCustomSize: "w-full h-200 rounded-lg", // Nueva clase con tamaño personalizado para la imagen
  imagePlaceholder: "w-full h-44 justify-center items-center bg-gray-300 rounded-lg", // Estilo para el contenedor cuando no hay imagen
  description: "text-gray-600 my-2 text-base ml-1", // Descripción cuando no hay imagen
  title: "text-primary text-2xl font-bold pt-3 ml-1", // Título del artículo
  noPublicationsText: "text-[#818F8F] text-center mt-5 text-lg font-bold", // Mensaje cuando no hay publicaciones
  dateText: "text-[#818F8F] text-sm my-1.25 ml-1",
  loadingContainer: "flex justify-center items-center pt-20", // Estilo para el contenedor del Loader

  ///////// PublicationPage
  publicationContainer: "flex-1 bg-terciary",
  container2: "bg-principal w-full flex-1 rounded-t-3xl mt-44",

  publicationTitle: "text-2xl font-bold text-primary",
  publicationImage: "w-full h-48 my-2",
  publicationDescription: "text-base text-primary pt-6 text-justify",

  publicationDate: "text-gray-500 text-sm mb-2",

  //////// Separación entre componentes (nueva clase)
  spacingBetweenSections: "my-4",
};

export default stylesBoard;
