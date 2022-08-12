const Intro = () => {
   const imgURL =
       "https://images.unsplash.com/photo-1606819717115-9159c900370b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
   return (
      //  <div
      //      className="hero h-96"
      //      style={{
      //          backgroundImage: `url(${imgURL})`,
      //      }}
      //  >
          
      //  </div>
      <div className="relative flex flex-col overflow-hidden bg-white py-6 sm:py-12">
      <div className="mx-auto max-w-4xl rounded-3xl bg-[#092540] p-20 text-center">
         <h2 className="text-5xl font-bold leading-tight text-white">Portal de Empleos TI & Desarrollo</h2>
         <p className="mt-5 text-xl leading-8 text-white"> Busca empleos y le enviaremos a correo</p>
         <div className="mt-6 flex items-center justify-center gap-4">
            
         </div>
      </div>
      </div>
   );
};
export default Intro;