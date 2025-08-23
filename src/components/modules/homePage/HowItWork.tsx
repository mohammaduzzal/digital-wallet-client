
export default function HowItWorks  () {
  const steps = [
    {
      title: "Create Your Wallet",
      description: "Sign up for an account in minutes and your digital wallet is instantly ready to go.",
      
    },
    {
      title: "Add Money",
      description: "Visit any of our designated agents to perform a cash-in transaction, converting your physical cash into a digital balance.",
      
    },
    {
      title: "Start Transacting",
      description: "Send money to friends,deposit, or withdraw cash from an agent directly from your dashboard.",
       
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container text-center mx-auto">
        <h2 className="text-4xl font-semibold mb-4">Your Journey to Seamless Finance</h2>
        <p className="text-lg text-muted-foreground mb-12">Getting started with our digital wallet is fast, simple, and secure. Follow these three steps.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-background rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary mr-2">{index + 1}.</span>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};