import React from 'react'

// import Details from './Details'
// import Image from './Image'

// company: "PRZ INGENIEROS"
// content: "Formación: *Administración, marketing y afines. Conocimientos básicos en SEO, SEM Facebook Ads, Google Ads, Google Analytics, WORDPRESS, email marketing. S/.1,025 al mes<br>De Indeed - Mon, 18 Apr 2022 00:34:30 GMT - Ver todo: <a href=\"https://pe.indeed.com/jobs?l=Lima%2C+Lima\">empleo en Lima, Lima</a>"
// contentSnippet: "Formación: *Administración, marketing y afines. Conocimientos básicos en SEO, SEM Facebook Ads, Google Ads, Google Analytics, WORDPRESS, email marketing. S/.1,025 al mes\nDe Indeed - Mon, 18 Apr 2022 00:34:30 GMT - Ver todo: empleo en Lima, Lima"
// link: "https://pe.indeed.com/ver-empleo?t=Asistente+marketing&c=PRZ+INGENIEROS&l=Lima,+Lima&jk=8de6b22745cb8ef1&rtk=1g0tdf6i6r078800&from=rss"
// location: "Lima, Lima"
// pubDate: "Mon, 18 Apr 2022 00:34:30 GMT"
// type: "indeed"

function JobCard({job}) {
    // const rules = `bg-white max-w-4xl mb-10 shadow-lg p-4 flex justify-center items-center`    
    const hasSalary= job.salary.includes("null")
    const salary = !hasSalary? job.salary:"-"
    return (
    
        <div className="max-w-4xl mx-auto px-10 my-4 py-6 bg-white rounded-lg shadow-md center">
            <div className="flex justify-between items-center">
                <span className="font-light text-gray-600">{job.date}</span>
                <span className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" >{salary}</span>
            </div>
            <div className="mt-2">
                <span className="text-2xl text-gray-700 font-bold hover:text-gray-600" >{job.title}</span>
                <p className="mt-2 text-gray-600">{job.content}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <a className="text-blue-600 hover:underline" rel="noopener" target='_blank' href={`${job.link}`}>Details</a>
                <div>
                    <div className="flex items-center" href="#">
                        <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src={`${job.image}`} alt="avatar" />
                        <h1 className="text-gray-700 font-bold">{job.company}</h1>
                    </div>
                </div>
            </div>

            
        </div>

        
            )

}


{/* <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">mar 10, 2019</span>
            <a class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">Design</a>
        </div>
        <div class="mt-2">
            <a class="text-2xl text-gray-700 font-bold hover:text-gray-600" href="#">Accessibility tools for designers and developers</a>
            <p class="mt-2 text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
        </div>
        <div class="flex justify-between items-center mt-4">
            <a class="text-blue-600 hover:underline" href="#">Read more</a>
            <div>
                <a class="flex items-center" href="#">
                    <img class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar">
                    <h1 class="text-gray-700 font-bold">Khatab wedaa</h1>
                </a>
            </div>
        </div>
    </div> */}

    

    //     <div className={rules}>
    //     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    //     <div className="md:flex">
    //         <div className="md:shrink-0">
    //         <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img/store.jpg" alt="Man looking at item at a store" />
    //         </div>
    //         <div className="p-8">
    //         <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
    //         <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
    //         <p className="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
    //         </div>
    //     </div>
    //     </div>
    // </div>

export default JobCard
