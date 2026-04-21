import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Dayton Relo app and website — what information is collected, how it is used, and your rights.",
};

const LAST_UPDATED = "April 2026";
const CONTACT_EMAIL = "chris@cjohio.com";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Privacy <span className="text-gold">Policy</span>
          </h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="card bg-cream border-l-4 border-gold mb-10">
          <p className="text-gray-700 leading-relaxed">
            Dayton Relo (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            operated by Chris Jurgens, Licensed Ohio Realtor. This Privacy
            Policy explains what information we collect, how we use it, and
            your rights regarding your data.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <P>
            <B>Account Information:</B> When you create an account, we collect
            your name, email address, phone number, move timeline, and persona
            (Military, Corporate, or General).
          </P>
          <P>
            <B>Usage Data:</B> We collect information about how you interact
            with the app — screens visited, features used, and saved listings
            or tools.
          </P>
          <P>
            <B>Chat Messages:</B> Messages you send to DaytonBot are processed
            by Anthropic&apos;s Claude AI in order to generate responses. These
            messages are not stored by us permanently but are transmitted to
            Anthropic&apos;s API.
          </P>
          <P>
            <B>Device Information:</B> We may collect basic device information
            such as operating system type and app version for diagnostic
            purposes.
          </P>
        </Section>

        <Section title="2. How We Use Your Information">
          <Bullet>
            Provide and personalize the app experience based on your move
            timeline and persona
          </Bullet>
          <Bullet>
            Connect you with Chris Jurgens for real estate services you request
          </Bullet>
          <Bullet>
            Send SMS notifications when you request a tour or contact Chris
            (via Twilio)
          </Bullet>
          <Bullet>
            Display relevant home listings through the MLS data provider
            (CoreLogic Trestle)
          </Bullet>
          <Bullet>
            Show live mortgage rate data from the Federal Reserve (FRED API)
          </Bullet>
          <Bullet>Remember your saved listings, tools, and preferences</Bullet>
          <Bullet>Improve the app&apos;s features and fix issues</Bullet>
        </Section>

        <Section title="3. Information Sharing">
          <P>
            We do not sell your personal information. We share data only with
            the third-party service providers necessary to operate the app:
          </P>
          <Bullet><B>Supabase</B> — secure cloud database and authentication (supabase.com)</Bullet>
          <Bullet><B>Anthropic</B> — AI chat processing for DaytonBot (anthropic.com)</Bullet>
          <Bullet><B>Twilio</B> — SMS delivery for tour requests and notifications (twilio.com)</Bullet>
          <Bullet><B>CoreLogic Trestle</B> — MLS real estate listing data (corelogic.com)</Bullet>
          <Bullet><B>Federal Reserve (FRED)</B> — mortgage rate data (stlouisfed.org)</Bullet>
          <P>
            We may disclose information if required by law or to protect the
            rights and safety of our users.
          </P>
        </Section>

        <Section title="4. Data Storage &amp; Security">
          <P>
            Your account data is stored securely in Supabase, which uses
            industry-standard encryption at rest and in transit. We use Row
            Level Security to ensure users can only access their own data. We
            do not store payment information.
          </P>
        </Section>

        <Section title="5. Your Rights">
          <P>You have the right to:</P>
          <Bullet><B>Access</B> the personal data we hold about you</Bullet>
          <Bullet><B>Correct</B> inaccurate information via Edit Profile in the app</Bullet>
          <Bullet><B>Delete</B> your account and associated data by contacting us</Bullet>
          <Bullet>
            <B>Opt out</B> of SMS communications at any time by replying STOP
          </Bullet>
          <P>
            To exercise any of these rights, contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-gold font-semibold hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </P>
        </Section>

        <Section title="6. Children's Privacy">
          <P>
            This app is not directed to children under 13. We do not knowingly
            collect personal information from children. If you believe we have
            inadvertently collected such data, please contact us immediately.
          </P>
        </Section>

        <Section title="7. Third-Party Links">
          <P>
            The app contains links to external websites (venue sites, parks,
            event pages, etc.). We are not responsible for the privacy
            practices of those sites and encourage you to review their
            policies.
          </P>
        </Section>

        <Section title="8. Changes to This Policy">
          <P>
            We may update this Privacy Policy periodically. Continued use of
            the app after changes are posted constitutes acceptance of the
            updated policy. We will update the &quot;Last Updated&quot; date at
            the top of this page when changes are made.
          </P>
        </Section>

        <Section title="9. Contact Us">
          <P>For any privacy questions or requests:</P>
          <div className="mt-4 leading-relaxed text-gray-600">
            <p className="font-black text-charcoal">Chris Jurgens — Dayton Relo</p>
            <p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-gold font-semibold hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              {" · "}
              <a
                href="tel:+19372413484"
                className="text-gold font-semibold hover:underline"
              >
                (937) 241-3484
              </a>
            </p>
          </div>
        </Section>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-6 text-sm">
          <Link href="/terms-of-service" className="text-gray-500 hover:text-gold font-semibold">
            Terms of Service →
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

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 leading-relaxed">{children}</p>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-600 leading-relaxed pl-4 relative">
      <span className="absolute left-0 text-gold">•</span>
      {children}
    </p>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <span className="font-bold text-charcoal">{children}</span>;
}
