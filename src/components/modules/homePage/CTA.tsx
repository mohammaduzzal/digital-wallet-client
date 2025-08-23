import { Button } from "@/components/ui/button";

interface Cta10Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text?: string;
      url?: string;
    };
    secondary?: {
      text?: string;
      url?: string;
    };
  };
}

export default function CTA({
  heading = "Ready to Experience a Smarter Wallet?",
  description = "Join the future of digital finance. Sign up in minutes and start sending money, paying bills, and managing your funds securely.",
  buttons = {
    primary: {
      text: "Get Started Now",
      url: "/register",
    },
  },
}: Cta10Props){
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="bg-accent flex w-full flex-col gap-16 overflow-hidden rounded-lg p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="text-muted-foreground max-w-xl lg:text-lg">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {buttons.secondary && (
              <Button variant="outline" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
            {buttons.primary && (
              <Button asChild variant="default" size="lg">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


