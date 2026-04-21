import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the Dayton Relo app and website. By using the service you agree to these terms.",
};

const LAST_UPDATED = "April 2026";
const CONTACT_EMAIL = "chris@cjohio.com";

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Terms of <span className="text-gold">Service</span>
          </h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="card bg-cream border-l-4 border-gold mb-10">
          <p className="text-gray-700 leading-relaxed">
            Welcome to Dayton Relo. By downloading or using this app or this
            website, you agree to be bound by these Terms of Service. Please
            read them carefully. If you do not agree, do not use the service.
          </p>
        </div>

        <Section title="1. About the Service">
          <P>
            Dayton Relo is a real estate and relocation information service
            operated by Chris Jurgens, Licensed Ohio Realtor. The service
            includes this website, the Dayton Relo mobile app, tools, guides,
            neighborhood information, a community board, and access to a
            licensed real estate professional to help people relocating to or
            within the Dayton, Ohio area.
          </P>
        </Section>

        <Section title="2. Not Legal or Financial Advice">
          <P>
            Content in this service — including calculators, guides,
            neighborhood comparisons, BAH estimates, cost of living data, and
            mortgage estimates — is provided for informational purposes only.
            It does not constitute legal, financial, tax, or investment advice.
            All real estate transactions should be reviewed with a licensed
            professional. Calculator results are estimates only and may not
            reflect current market conditions.
          </P>
        </Section>

        <Section title="3. Eligibility">
          <P>
            You must be at least 18 years old to create an account or use the
            service. By using Dayton Relo, you represent that you meet this
            requirement.
          </P>
        </Section>

        <Section title="4. Your Account">
          <P>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity under your account. Notify
            us immediately at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-gold font-semibold hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            if you suspect unauthorized use of your account. We reserve the
            right to suspend or terminate accounts that violate these Terms.
          </P>
        </Section>

        <Section title="5. Community Board">
          <P>
            The Community Board allows users to post messages and replies
            using a chosen display name. By posting, you agree not to submit
            content that is:
          </P>
          <Bullet>
            Unlawful, abusive, harassing, threatening, or defamatory
          </Bullet>
          <Bullet>Spam, advertising, or solicitation not authorized by us</Bullet>
          <Bullet>False, misleading, or deceptive</Bullet>
          <Bullet>
            Infringing on the intellectual property rights of others
          </Bullet>
          <Bullet>Sexually explicit or otherwise inappropriate</Bullet>
          <P>
            We reserve the right to remove any content and ban any user who
            violates these guidelines, without notice. You retain ownership of
            content you post but grant Dayton Relo a non-exclusive,
            royalty-free license to display it within the service.
          </P>
        </Section>

        <Section title="6. AI Chat (DaytonBot)">
          <P>
            The DaytonBot chat feature is powered by Claude AI (Anthropic).
            Conversations are used to generate responses and may be processed
            by Anthropic in accordance with their policies. DaytonBot responses
            are informational only and do not constitute professional real
            estate, legal, or financial advice. Always verify important
            information with a licensed professional.
          </P>
        </Section>

        <Section title="7. Listing Data">
          <P>
            Real estate listing data is provided by third-party MLS data
            services. Dayton Relo does not guarantee the accuracy,
            completeness, or timeliness of any listing information. Listings
            are subject to change without notice. All properties are subject
            to prior sale or withdrawal.
          </P>
        </Section>

        <Section title="8. Privacy">
          <P>
            Your use of the service is also governed by our{" "}
            <Link
              href="/privacy-policy"
              className="text-gold font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference.
          </P>
        </Section>

        <Section title="9. Intellectual Property">
          <P>
            All content, features, and functionality of this service —
            including text, graphics, logos, and software — are the property of
            Chris Jurgens / Dayton Relo and are protected by applicable
            intellectual property laws. You may not reproduce, distribute, or
            create derivative works without our express written permission.
          </P>
        </Section>

        <Section title="10. Disclaimer of Warranties">
          <P className="uppercase">
            The service is provided &quot;as is&quot; without warranty of any
            kind. We disclaim all warranties, express or implied, including
            warranties of merchantability, fitness for a particular purpose,
            and non-infringement. We do not warrant that the service will be
            uninterrupted, error-free, or free of viruses.
          </P>
        </Section>

        <Section title="11. Limitation of Liability">
          <P className="uppercase">
            To the maximum extent permitted by law, Dayton Relo and Chris
            Jurgens shall not be liable for any indirect, incidental, special,
            or consequential damages arising from your use of the service,
            including lost profits or data, even if advised of the possibility
            of such damages.
          </P>
        </Section>

        <Section title="12. Governing Law">
          <P>
            These Terms are governed by the laws of the State of Ohio, without
            regard to its conflict of law provisions. Any disputes shall be
            resolved in the courts of Montgomery County, Ohio.
          </P>
        </Section>

        <Section title="13. Changes to These Terms">
          <P>
            We may update these Terms from time to time. We will notify users
            of material changes by updating the &quot;Last updated&quot; date
            above. Continued use of the service after changes constitutes
            acceptance of the revised Terms.
          </P>
        </Section>

        <Section title="14. Contact Us">
          <P>Questions about these Terms? Reach us at:</P>
          <div className="mt-4 leading-relaxed text-gray-600">
            <p className="font-black text-charcoal">
              Chris Jurgens — Licensed Ohio Realtor
            </p>
            <p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-gold font-semibold hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Team Flory · eXp Realty · Dayton, Ohio
            </p>
          </div>
        </Section>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-6 text-sm">
          <Link href="/privacy-policy" className="text-gray-500 hover:text-gold font-semibold">
            Privacy Policy →
          </Link>
          <Link href="/support" className="text-gray-500 hover:text-gold font-semibold">
            Support
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gold font-semibold">
            Home
          </Link>
        </div>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-black text-charcoal mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-gray-600 leading-relaxed ${className ?? ""}`}>
      {children}
    </p>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-600 leading-relaxed pl-4 relative">
      <span className="absolute left-0 text-gold">•</span>
      {children}
    </p>
  );
}
