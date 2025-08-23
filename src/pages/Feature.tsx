import { Button } from "@/components/ui/button";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Feature166Props {
  heading: string;
  description?: string;
  feature1: Feature;
  feature2: Feature;
  feature3: Feature;
  feature4: Feature;
}

export default function Feature ({
  heading = "Unlock a Smarter Way to Manage Your Money",
  description = "Experience seamless, secure, and instant financial transactions with our all-in-one digital wallet. Built for users, agents, and administrators.",
  feature1 = {
    title: "Instant Transactions",
    description:
      "Send and receive money in real-time. Whether it's a peer-to-peer transfer or a cash-in, our platform ensures your funds are available instantly.",
    image: "https://i.ibb.co.com/4RNbCDmg/shubham-dhage-Vtm64-Fggqe-Q-unsplash.jpg",
  },
  feature2 = {
    title: "Bank-Grade Security",
    description:
      "Your money is protected by an unbreachable security framework. We use JWT authentication and atomic operations to secure every single transaction.",
    image: "https://i.ibb.co.com/Tx8CNgdL/3d-cryptocurrency-rendering-design.jpg",
  },
  feature3 = {
    title: "Flexible User Roles",
    description:
      "Our system supports distinct roles for users, agents, and administrators, each with specific permissions and capabilities tailored to their needs.",
    image: "https://i.ibb.co.com/0jBngv48/22032857-63-Z-2112-w012-n001-19-C-p6-19.jpg",
  },
  feature4 = {
    title: "Comprehensive Tracking",
    description:
      "Never lose sight of your funds. Every transaction is meticulously recorded, providing you with a complete and searchable history of all your financial activities.",
    image: "https://i.ibb.co.com/MDtVzM6c/26857016-7180160.jpg",
  },
}: Feature166Props){
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            {heading}
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{feature1.title}</h2>
                <p className="text-muted-foreground">{feature1.description}</p>
                <img
                  src={feature1.image}
                  alt={feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-2/5">
                <h2 className="text-xl font-semibold">{feature2.title}</h2>
                <p className="text-muted-foreground">{feature2.description}</p>
                <img
                  src={feature2.image}
                  alt={feature2.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{feature3.title}</h2>
                <p className="text-muted-foreground">{feature3.description}</p>
                <img
                  src={feature3.image}
                  alt={feature3.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-3/5">
                <h2 className="text-xl font-semibold">{feature4.title}</h2>
                <p className="text-muted-foreground">{feature4.description}</p>
                <img
                  src={feature4.image}
                  alt={feature4.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


