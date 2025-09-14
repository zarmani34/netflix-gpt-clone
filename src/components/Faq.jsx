import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Tittle from "./Tittle";

const Faq = () => {
  return (
    <div className="bg-black sm:px-8 p-2 overflow-hidden ">
      <Tittle>FAQ's</Tittle>
      <Accordion type="single" collapsible className="mb-4 " >
        <AccordionItem value="item-1" className='mb-2 border-2 px-4 border-[#303030] bg-[#272727] rounded-xl hover:bg-[#303030] ' >
          <AccordionTrigger className='text-slate-50' >What is Stream Haven</AccordionTrigger>
          <AccordionContent className='text-slate-50' >
            Stream Haven is a streaming service that mimics netflix.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className='mb-2 border-2 px-4 border-[#303030] bg-[#272727] rounded-xl hover:bg-[#303030] ' >
          <AccordionTrigger className='text-slate-50' >Can you stream movies?</AccordionTrigger>
          <AccordionContent className='text-slate-50' >
            At the moment NO. Stream haven was initially created as aproject to practice my Front-end devlopment skills.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className='mb-2 border-2 px-4 border-[#303030] bg-[#272727] rounded-xl hover:bg-[#303030] ' >
          <AccordionTrigger className='text-slate-50' >Can you sign in?</AccordionTrigger>
          <AccordionContent className='text-slate-50' >
            Yes you can, and it's safe. The backend is powered by Google Firebase, so all data is safe.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className='mb-2 border-2 px-4 border-[#303030] bg-[#272727] rounded-xl hover:bg-[#303030] ' >
          <AccordionTrigger className='text-slate-50' >Do you have to subscribe?</AccordionTrigger>
          <AccordionContent className='text-slate-50' >
            No you don't, like i said STREAM HAVEN was a project to practice my coding skill's. For now it doesn't have the capacity to stream, but you can watch trailers of latest movies and check detailsof any movie you are interested in
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
