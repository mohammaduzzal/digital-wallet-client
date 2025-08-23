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
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
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
  {
    id: "faq-5",
    question: "How do I send money to another user?",
    answer:
      "To send money, log into your account and initiate a send-money transaction. You'll need the receiver's phone number or wallet ID to complete the transfer. The amount will be deducted from your wallet and credited to theirs instantly.",
  },
  {
    id: "faq-6",
    question: "Is there a transaction fee for sending money?",
    answer:
      "Yes, there may be a small transaction fee for sending money. The fee is deducted from the sender's wallet at the time of the transaction.",
  },
  {
    id: "faq-7",
    question: "What is an Agent and what is their role?",
    answer:
      "An Agent is a designated partner who facilitates cash-based transactions. They are the primary way to convert physical cash into digital funds (cash-in) and vice-versa (cash-out). Agents may earn a commission on these transactions.",
  },
  {
    id: "faq-8",
    question: "How is my account secured?",
    answer:
      "Your account is protected by a secure, hashed password and a robust JWT-based authentication system. All financial transactions are processed atomically to ensure data integrity and prevent fraud.",
  },
  {
    id: "faq-9",
    question: "What should I do if my wallet is blocked?",
    answer:
      "A wallet can be blocked by an admin for security reasons. If your wallet is blocked, you will be unable to perform any financial operations. Please contact our support team to resolve this issue.",
  },
  {
    id: "faq-10",
    question: "How can I view my transaction history?",
    answer:
      "You can view a complete history of all your transactions, including sent, received, and cash-in/out records, by navigating to your account dashboard.",
  },
  {
    id: "faq-11",
    question: "Can I cancel a transaction?",
    answer:
      "Once a transaction is completed, it cannot be canceled. Please double-check all details, especially the recipient's wallet ID, before confirming a transaction.",
  },
  {
    id: "faq-12",
    question: "What is the difference between an 'Agent' and a 'User'?",
    answer:
      "A 'User' is an individual who uses the wallet for personal transactions like sending money. An 'Agent' is a special role that is approved by an admin to facilitate transactions for other users, earning a commission in the process.",
  },
  {
    id: "faq-13",
    question: "How can I change my password?",
    answer:
      "You can change your password from your account settings. You will be required to provide your old password to verify your identity.",
  },
];

export default function FAQ ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
}: Faq3Props) {
  return (
    <section className="py-32">
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
};

