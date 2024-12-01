import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div className="bg-black px-8 overflow-hidden ">
      <Accordion type="single" collapsible className="mb-4 " >
        <AccordionItem value="item-1" className='mb-2 border-2 px-4 border-[#303030] bg-[#272727] rounded-xl hover:bg-[#303030] ' >
          <AccordionTrigger className='text-slate-50' >What is Netflix</AccordionTrigger>
          <AccordionContent className='text-slate-50' >
            Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet connected ddevices.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className='mb-2 border-2 px-4 border-[#303030] bg-[#272727] rounded-xl hover:bg-[#303030] ' >
          <AccordionTrigger className='text-slate-50' >Is it accessible?</AccordionTrigger>
          <AccordionContent className='text-slate-50' >
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
