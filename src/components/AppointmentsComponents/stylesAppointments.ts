const stylesAppointments = {
    
    
    //// 
    container: 'flex-1 bg-principal ', 
   
    //// Tarjetas de las Citas
    card: 'flex-1 px-1 mt-4', 
  
    //// color de la tarjeta en las Citas 
    cardcolor:' bg-terciary p-4 mb-4 rounded-lg relative shadow-md mx-5',
  
    //// Tarjetas de informacion en la Pantalla Historial 
    cardHistory:'bg-terciary rounded-lg py-4 px-6 mx-5 my-2 shadow-md flex-row items-center',
   
   //// Barra de Busqueda en la pantalla Historial 
    searchBar: 'flex-row items-center bg-[#e6f7f9] rounded-lg mx-4 my-4 px-4 py-2',
    searchInput:' flex-1 text-lg text-primary ml-2 font-montserrat ',

    //// Boton de agregar cita
    button1: 'flex-row right-1 justify-between items-center mb-2',
    button1Color:'bg-primary w-8 h-8 rounded-full items-center  justify-center',

    //// boton de eliminar cita 
    button2:"absolute top-3 right-3 bg-terciary w-8 h-8 rounded-full items-center justify-center -m-2",

   //// Titulo en la  pantalla de Citas
    title:'text-2xl text-primary ml-4 font-montserrat',
    
   //// Titulo en la  pantalla de Detalle
    titleDetail:'text-principal text-2xl font-montserrat',

   //// Items en la tarjeta de Citas 
   itemDate:'text-sm text-black ml-1.5',
   item:'text-sm text-bgImput mr-1.5',
   item2:'text-sm text-bgImput  font-montserrat',
   item3:'text-base text-primary font-montserrat',
    
   //// Fecha y Hora en la pantalla de Detalle , Items de la tarjetas de Historial
    textTitle:'text-primary font-montserrat mb-1 pt-3',
    textTitleItems:'text-bg-cancel font-montserrat mb-1 pr-5 pl-7',
    textTitle3:'text-lg text-primary font-montserrat -ml-12 pl-2 ',
    textDate:'text-cancel pr-6',
    
    /* Contenedor del detalle citas con Bordes Superiores Redondeados */
    containerDetail:'bg-principal rounded-t-3xl p-4 mt-4 w-full ',

    containerDetail2:'bg-primary flex-1 ',
   
    //// Header con Botón de Atrás
    headerDetail:'bg-secundary p-4 mt-10 flex flex-row items-center justify-between',

        //// separa la fecha y hora de la demas informacion 
    separation:'flex flex-row justify-between mt-2 mb-6 space-x-20',
       //// Separa la fecha y hora
    separation2:'flex-1 flex flex-row items-center ',

    loadingContainer: "flex justify-center items-center pt-20",
    
   

    };
    
    export default stylesAppointments;
