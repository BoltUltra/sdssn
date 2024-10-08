"use client";
import Image from "next/image";
import { Footer, Header } from "../components";
import Heading3 from "../components/Heading3";
import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleRight } from "react-icons/fa";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order using the tracking number provided in your order confirmation email.",
  },
  {
    question: "Can I purchase items again?",
    answer:
      "Yes, you can purchase items again by visiting our store and adding them to your cart.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship internationally. Shipping charges and delivery times may vary depending on the destination.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team via email at support@example.com or call us at (123) 456-7890.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-black">
    <button
      className={`${
        isOpen ? "bg-primary text-white" : ""
      } w-full text-left py-11 px-6 hover:bg-primary hover:text-white flex justify-between items-center`}
      onClick={onClick}
    >
      <span className="text-lg font-medium">{faq.question}</span>
      <span className="text-xl">
        {isOpen ? <FaChevronCircleDown /> : <FaChevronCircleRight />}
      </span>
    </button>
    {isOpen && <p className="mt-2 px-6 py-4 bg-gray-50">{faq.answer}</p>}
  </div>
);
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <Header />
      <section className="pt-44 pb-20 bg-background text-center">
        <div className="max-w-[1440px] mx-auto md:px-20 px-5">
          <div className="mb-20 space-y-2">
            <p>Check the recently asked questions here</p>
            <Heading3 text={"Frequently Asked Questions"} />
          </div>
          <div className="border border-black rounded-lg overflow-hidden bg-white text-left">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
          <div className="text-center mt-20 space-y-4">
            <Heading3 text={"Don't see your Questions?"} />
            <button className="bg-primary text-white px-10 py-3 rounded-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
