import React from "react";
// import Details from './Details'
// import Image from './Image'

// company: "PRZ INGENIEROS"
// content: "Formación: *Administración, marketing y afines. Conocimientos básicos en SEO, SEM Facebook Ads, Google Ads, Google Analytics, WORDPRESS, email marketing. S/.1,025 al mes<br>De Indeed - Mon, 18 Apr 2022 00:34:30 GMT - Ver todo: <a href=\"https://pe.indeed.com/jobs?l=Lima%2C+Lima\">empleo en Lima, Lima</a>"
// contentSnippet: "Formación: *Administración, marketing y afines. Conocimientos básicos en SEO, SEM Facebook Ads, Google Ads, Google Analytics, WORDPRESS, email marketing. S/.1,025 al mes\nDe Indeed - Mon, 18 Apr 2022 00:34:30 GMT - Ver todo: empleo en Lima, Lima"
// link: "https://pe.indeed.com/ver-empleo?t=Asistente+marketing&c=PRZ+INGENIEROS&l=Lima,+Lima&jk=8de6b22745cb8ef1&rtk=1g0tdf6i6r078800&from=rss"
// location: "Lima, Lima"
// pubDate: "Mon, 18 Apr 2022 00:34:30 GMT"
// type: "indeed"

const Skeleton = () => {
  // const rules = `bg-white max-w-4xl mb-10 shadow-lg p-4 flex justify-center items-center`
  return (
    // <div className="shadow p-4 max-w-sm w-fullw-60 h-24 border-2 rounded-md mx-auto mt-10 ">
    // <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
    //     <div className="w-12 bg-gray-300 h-12 rounded-full ">
    //     </div>
    //         <div className="flex flex-col space-y-3">
    //         <div className="w-36 bg-gray-300 h-6 rounded-md ">
    //         </div>
    //         <div className="w-24 bg-gray-300 h-6 rounded-md ">
    //         </div>
    //     </div>
    //     </div>
    // </div>

    <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md center mx-auto w-full h-full border-2 ">
      <div className="max-w-4xl flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div class="w-full flex flex-col space-y-3 ">
          <div class="flex space-x-3 justify-between">
            <div class="animate-pulse w-1/6 h-3  bg-gray-300 rounded-full"></div>
            <div class="justify-end animate-pulse w-1/6 h-3  bg-gray-300 rounded-full"></div>
          </div>
          <div class="w-full bg-gray-300 h-6 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div class="w-full bg-gray-300 h-6 bg-gray-300 rounded-full"></div>
          <div class="flex space-x-4 align-center items-center justify-between">
            <div class="animate-pulse w-1/5 h-3 bg-gray-300 rounded-full"></div>
            <div class="w-8 bg-gray-300 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
      </div>
    </div>

    //
    // <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    //     <div className="animate-pulse flex space-x-4">
    //       <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    //       <div className="flex-1 space-y-6 py-1">
    //         <div className="h-2 bg-slate-700 rounded"></div>
    //         <div className="space-y-3">
    //           <div className="grid grid-cols-3 gap-4">
    //             <div className="h-2 bg-slate-700 rounded col-span-2"></div>
    //             <div className="h-2 bg-slate-700 rounded col-span-1"></div>
    //           </div>
    //           <div className="h-2 bg-slate-700 rounded"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
  );
};

export default Skeleton;
