import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { CustomerAuth } from "@/components/common";

// interface BlogPostProps {
//   params: {
//     slug: string;
//   };
// }

// Fetch markdown data for a specific blog post
async function getBlogData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
    const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { frontmatter, content };
  } catch (error) {
    return null;
  }
}

// Dynamic blog detail page
export default async function BlogPost() {
  // const { slug } = await params;
  // const blogData = await getBlogData(slug);

  // if (!blogData) {
  //   notFound();
  // }
  // const [open, setOpen] = useState(false);
  // const [openSignup, setOpenSignup] = useState(false);
  // const { frontmatter, content } = blogData;
  return (
    <div className="container mx-auto py-12 mt-20">
      <article className="flex-col flex justify-center items-center">
        <h1 className="text-center max-w-[500px] text-3xl font-semibold">
          5 Common Medical Billing Errors That Cost Patients Thousands—and How
          to Avoid Them
        </h1>
        <p className="text-gray-600 text-sm">13 Dec, 2024</p>
        <div className="px-4 md:px-0">
          <Image
            src="/images/blogs/blogoneheading.png"
            alt="Blog Image"
            width={700}
            height={250}
            className="object-cover rounded-lg my-4"
          />
        </div>
        {/* Introduction */}
        <div className="md:py-14 py-4 md:px-28 px-12 space-y-4 leading-7 md:tracking-wide text-justify">
          <p>
            Medical bills can be confusing and overwhelming, and it’s not
            uncommon to find <strong>common medical billing errors</strong> that
            inflate costs and leave you paying far more than you owe.
            Understanding these errors will help you{" "}
            <strong>spot medical bill mistakes</strong>, dispute inaccurate
            charges, and ultimately prevent thousands of dollars in unnecessary
            expenses.
          </p>
          <p>
            In this guide, we’ll walk through the most frequent and costly
            medical billing issues—from{" "}
            <strong>duplicate charges on medical bills</strong> to{" "}
            <strong>unbundling services</strong>—and show you how to correct
            them. With the right knowledge and resources, you can protect
            yourself and ensure you’re only paying for the care you actually
            receive.
          </p>

          {/* Key Tip */}
          <h2 className="text-xl font-bold">
            Don’t Just Ask for an Itemized Bill—Request a UB-04
          </h2>
          <p>
            Before diving into the common errors, here’s a crucial tip that can
            save you time and frustration. If you were treated as an outpatient
            at a hospital (which is often the case), consider asking for the
            hospital’s <strong>UB-04 form</strong> instead of a generic
            “itemized bill.” The UB-04 is a standardized claim form hospitals
            use when submitting charges to insurance companies. Unlike ordinary
            itemized bills, which can vary widely, the UB-04 adheres to a clear,
            uniform format, giving you a reliable snapshot of every service,
            code, and charge. By requesting the UB-04 directly, you avoid the
            back-and-forth of debating what constitutes a true “itemized” bill
            and get straight to the consistent, standardized details you need.
          </p>
          <div className="items-center justify-center flex">
            <Image
              src="/images/blogs/billerrors.png"
              alt="Blog Image"
              width={700}
              height={250}
              className="object-cover rounded-lg my-4"
            />
          </div>
          {/* Common Errors */}
          <h2 className="text-xl font-bold">1. Upcoding</h2>
          <p>
            <strong>What It Is:</strong> <strong>Upcoding</strong> is when
            providers bill for a more expensive service than the one you
            received. For example, a standard follow-up office visit (often
            coded as CPT 99213) might be billed as a more complex evaluation and
            management visit (e.g., CPT 99215).
          </p>
          <p>
            <strong>Example:</strong> You visited your primary care doctor for a
            routine follow-up, which should be billed as CPT 99213 (moderate
            complexity). However, your bill shows CPT 99215 (high complexity),
            implying a more extensive and costly visit than you actually had.
          </p>
          <p>
            <strong>Why It Costs You:</strong> A routine office visit may cost
            around $100, but a high-complexity consultation could jump to $300
            or more, tripling your out-of-pocket expense.
          </p>
          <p>
            <strong>How to Spot It:</strong> Match the codes on your bill to the
            level of service you recall receiving. Use resources like{" "}
            <a
              href="https://www.fairhealthconsumer.org/"
              className="text-blue-500 underline"
              target="_blank"
            >
              Fair Health Consumer
            </a>{" "}
            to verify typical costs. If it seems inflated, consider disputing
            the charge.
          </p>

          <h2 className="text-xl font-bold">2. Duplicate Charges</h2>
          <p>
            <strong>What It Is:</strong> <strong>Duplicate charges</strong>{" "}
            occur when the same test, procedure, or service is billed more than
            once. This often happens when different departments fail to
            coordinate or when billing staff mistakenly submit a charge twice.
          </p>
          <p>
            <strong>Example:</strong> You have an MRI of the brain coded as CPT
            70551. Your bill shows this MRI charge twice on the same date of
            service, resulting in double billing for a single procedure.
          </p>
          <p>
            <strong>Why It Costs You:</strong> A test like an MRI might cost
            hundreds or even thousands of dollars. If it’s billed twice, you
            could be paying double for a procedure you only had once.
          </p>
          <p>
            <strong>How to Spot It:</strong> Request an itemized bill and
            compare it against your insurance Explanation of Benefits (EOB). If
            you see identical procedures listed multiple times for the same
            date, contact the billing department immediately.
          </p>

          <h2 className="text-xl font-bold">3. Unbundling of Services</h2>
          <p>
            <strong>What It Is:</strong> <strong>Unbundling services</strong>{" "}
            involves billing for individual components of a procedure separately
            when they should be grouped under one bundled code. For example, a
            Basic Metabolic Panel (BMP), commonly coded as CPT 80048, might be
            broken down into separate charges for each test—like sodium (CPT
            84295), potassium (CPT 84132), and so on—instead of the discounted
            panel rate.
          </p>
          <p>
            <strong>Example:</strong> Instead of seeing one line item (CPT
            80048) for the BMP test on your bill, you see multiple line items
            for each component test. This practice raises your total cost
            significantly.
          </p>
          <p>
            <strong>Why It Costs You:</strong> One bundled test might cost $50,
            while billing each component separately could push the total to $100
            or more.
          </p>
          <p>
            <strong>How to Spot It:</strong> If your bill lists multiple lab
            test codes that look like they belong together, call the billing
            department and ask if these should be bundled under a single code.
          </p>
          <h2 className="text-xl font-bold">
            4. Incorrect or Missing Patient Information
          </h2>
          <p>
            <strong>What It Is:</strong> Even a small clerical error—like a typo
            in your name, date of birth, insurance ID, or procedure code—can
            lead to claim denials or inaccurate charges.
          </p>
          <p>
            <strong>Example:</strong> Your last name is spelled incorrectly, or
            your insurance member ID is off by one digit. Your insurer rejects
            the claim, forcing you to pay out-of-pocket until the error is
            corrected.
          </p>
          <p>
            <strong>Why It Costs You:</strong> If your insurance denies coverage
            because of mismatched information, you might have to pay the entire
            bill upfront—potentially hundreds or thousands of dollars—until the
            issue is resolved.
          </p>
          <p>
            <strong>How to Spot It:</strong> Double-check every detail on your
            bill and EOB. Ensure that all personal and insurance data matches
            your records exactly. If something’s off, contact the provider’s
            billing office.
          </p>
          <h2 className="text-xl font-bold">
            5. Charges for Canceled Services
          </h2>
          <p>
            <strong>What It Is:</strong> Sometimes, tests or procedures that
            were never performed still show up on the bill. This can happen if a
            cancellation wasn’t recorded properly in the billing system.
          </p>
          <p>
            <strong>Example:</strong> A scheduled MRI (CPT 70551) or a minor
            surgery (e.g., CPT 10060 for a simple abscess drainage) was canceled
            but not removed from the billing system.
          </p>
          <p>
            <strong>Why It Costs You:</strong> Paying for services you never
            received is essentially throwing money away. An expensive canceled
            outpatient procedure left on the bill can cost you thousands
            needlessly.
          </p>
          <p>
            <strong>How to Spot It:</strong> Review your medical records and
            appointment history. If you see a service you didn’t receive, call
            the provider’s billing department and have it removed.
          </p>

          {/* Dispute Section */}
          <h2 className="text-xl font-bold">
            How to Prevent and Dispute Medical Bill Errors
          </h2>
          <ul className="list-disc pl-8">
            <li>
              <strong>Request an Itemized Bill or a UB-04:</strong> An itemized
              statement breaks down every charge, making it easier to spot
              mistakes.
            </li>
            <li>
              <strong>Compare with Your EOB:</strong> The EOB from your insurer
              shows what they covered and what’s left for you to pay.
            </li>
            <li>
              <strong>Look Up Medical Codes:</strong> Websites like{" "}
              <a
                href="https://www.fairhealthconsumer.org/"
                className="text-blue-500 underline"
                target="_blank"
              >
                Fair Health Consumer
              </a>{" "}
              help you confirm that codes match the services you received.
            </li>
            <li>
              <strong>Contact the Billing Department:</strong> Don’t hesitate to
              call and ask for clarification or dispute questionable charges.
            </li>
            <li>
              <strong>Seek Assistance if Needed:</strong> Consider hiring a
              medical billing advocate or consulting consumer advocacy groups.
            </li>
          </ul>

          {/* Conclusion */}
          <h2 className="text-xl font-bold">
            Ready to Take Control of Your Medical Bills?
          </h2>
          <p>
            Overpaying due to <strong>common medical billing errors</strong>{" "}
            doesn’t have to be your reality. By understanding how to{" "}
            <strong>spot medical bill mistakes</strong> and taking proactive
            steps to verify every charge, you can save yourself thousands.
          </p>
          <p>
            Staying informed and proactive is the best way to prevent hidden
            charges from sneaking into your bill. After all, healthcare should
            help you feel better—not break the bank.
          </p>
          <p>
            {/* <span className="text-[#023434] hover:underline hover:cursor-pointer"> */}
            Sign up {/* </span>{" "} */}
            for our waitlist today by clicking on the <q>Get in Touch</q> button
            on the top right to be one of the first notified when the Lapius
            platform launches—helping you catch billing errors, avoid
            overcharges, and take control of your medical expenses.
          </p>
        </div>

        {/* <ReactMarkdown>{content}</ReactMarkdown> */}
      </article>
      {/* <CustomerAuth
        initialState="sign-up"
        open={openSignup}
        setOpenSignup={setOpenSignup}
        onOpenChange={() => setOpenSignup((open) => !open)}
      /> */}
    </div>
  );
}

// Generate static parameters for all blog posts
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}
