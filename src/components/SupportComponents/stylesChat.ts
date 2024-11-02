const stylesChat = {
    /////General
    container: 'flex-1 bg-principal relative', 

    ///// Info del ticket (superior)
    container1: "bg-gray-200 m-3 rounded-tr-xl mx-4 mt-8 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl", 
    containerRow: "flex-row my-4 ml-3",
    containerInfo: "mx-4 mb-4",
    containerImage: "w-full absolute",
    image: "w-11 h-11 rounded-full",
    iconImage: "w-11 h-11 rounded-full border-2 border-primary justify-center items-center bg-white",
    title: "font-bold text-lg ml-14",
    title2: "font-bold text-primary text-base pt-1",
    text: "pt-1 text-justify",

    /////Input (inferior)

    container2:"flex-1 justify-end mb-6",
    containerInput: "flex-row bg-gray-200 h-12 rounded-lg  mx-4 items-center",
    input: ' flex-1 pl-4',
    iconButton: "pr-2",

    ////Bloque de mensajes
    container3:"flex-grow mb-4",
    
    container4:"mr-11 ml-4",
    containerInfo2: "bg-terciary h-16 m-1 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl left-7 -mt-7 w-auto ",

    containerDate:"flex-row justify-end mr-4 mt-2",
    containerMessage:"mx-4",

    //// texto

        title4:"text-black text-1x3 ml-9 mt-4 font-bold ", ///titulo de Usuario o Soporte
        textDate:"text-secondary mx-2", //fecha
        textHour:"text-secondary ", //hora
        textMessage:"text-primary", //mensaje

    //// Botón de respuestas
    container5: "flex-row items-center ml-4",
    title3:"text-primary text-2 ml-1",
    

    ////Comentarios
    commentContainer: 'bg-gray-100 p-3 rounded-lg mb-2',
    commentUser: 'font-semibold text-gray-700',
    commentText: 'text-gray-800',
    commentDate: 'text-sm text-gray-500 mt-1',

    };
    
    export default stylesChat;