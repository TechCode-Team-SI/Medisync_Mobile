const stylesLogin = {
    container: 'flex-1 bg-primary relative', 
    container2: 'flex-1 bg-primary relative', 

    //// Contenedor inferior Login y Forgot
    containerBelow: 'absolute bottom-0 w-full h-3/5 bg-principal rounded-tl-3xl px-6',
  
    //// Background Register
    containerRegister: 'bg-principal w-full flex-1 rounded-t-3xl mt-6  px-6',
    containerImage:"justify-center items-center mb-3 px-6",
    image:"w-24 h-24 rounded-full",
    iconImage: "w-24 h-24 rounded-full border-2 border-primary justify-center items-center",
  
    //// General
    container4: "justify-center items-center", //Container del boton
    container3: "flex-row items-center justify-center space-x-2 pt-20", //Login Container inferior para Iniciar sesión
    container5: "flex-row items-center justify-center space-x-2 pt-6 pb-6", //Register Container inferior para Iniciar sesión
    container6: "flex-row items-center justify-center space-x-2 pt-32", //Forgot - Code Container inferior para Iniciar sesión
    container7: "flex-row items-center justify-center space-x-2 pt-24", //Change Container inferior para Iniciar sesión

    /// Titulos
    containerTitle:"pb-4",
    title1: "text-principal font-montserrat text-center pt-36 text-3xl px-5", // Titulo principal
    title2: "font-montserrat text-center my-8 text-base",   //Login - Forgot - Descripción
    title3: "font-montserrat text-center my-6 text-base",   //Register - Descripción
    title4: "text-principal font-montserrat text-center pt-28 pb-6 text-3xl px-5", // Titulo principal

    /// Input
    
    inputContainer: "flex-row items-center bg-bgInput w-full mb-5 p-3 h-12",
    input: 'mx-1 w-4/5 h-full',

    /// Botones de texto
  
    textButton: 'text-primary text-sm text-right font-bold pb-5',
    textButton2: 'text-primary text-sm text-right font-bold',

    /// Botones
  
    button: 'w-full h-12 items-center justify-center bg-primary rounded-xl',
    buttonText: 'text-white text-lg font-montserrat',
    
    /// EN REGISTRO permite que el contenido de la pantalla permanezca dentro de los límites sin afectar el diseño 
    safeArea:'flex-1 bg-transparent',
};
    
    export default stylesLogin;