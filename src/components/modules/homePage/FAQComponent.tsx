import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
}

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is a digital wallet?",
    answer:
      "A digital wallet is a secure online platform that allows you to store money, send and receive funds, and manage transactions digitally from your mobile device or computer.",
  },
  {
    id: "faq-2",
    question: "How do I create a wallet and get started?",
    answer:
      "Your digital wallet is automatically created for you when you successfully register an account on our platform. Your initial balance will be ৳50.",
  },
  {
    id: "faq-3",
    question: "How can I add money to my wallet?",
    answer:
      "You can add money to your wallet through a designated agent. Simply visit an agent point and request a cash-in transaction. The agent will transfer the amount to your digital wallet in exchange for cash.",
  },
  {
    id: "faq-4",
    question: "Can I withdraw money from my wallet?",
    answer:
      "Yes, you can withdraw money from your wallet. To do so, visit an agent point and request a cash-out transaction. The agent will give you cash and deduct the amount from your digital wallet.",
  },
 
  
];

export default function FAQComponent({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
}: Faq3Props) {
  return (
    <section className="py-32 w-11/12 mx-auto">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
