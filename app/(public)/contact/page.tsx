"use client";

import Link from "next/link";
import { ArrowRight, Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/support", label: "Support" },
          { href: "/contact", label: "Contact" },
        ]}
        eyebrow="Get in touch"
        EyebrowIcon={Mail}
        eyebrowColor="orange"
        title={
          <>
            Say <span className="text-orange">hello.</span>
          </>
        }
        body="Question about a kit, a build, an order, a custom request. Drop it below and we'll get back to you."
        bg="cream"
      />

      <section className="border-b border-line bg-white">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-20">
          {/* FORM */}
          <div className="rounded-2xl border-2 border-text bg-white p-6 md:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check className="size-7" strokeWidth={2.4} />
                </span>
                <h2 className="font-display text-3xl uppercase leading-tight">
                  Message sent.
                </h2>
                <p className="max-w-xs text-sm text-text-soft">
                  Thanks. We read every one. Expect a reply within a working
                  day.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-orange hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="font-display text-2xl uppercase leading-none">
                  Drop us a line
                </h2>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Your name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Ash Ketchum"
                    className="rounded-full border border-line bg-white px-4 py-3 text-base placeholder:text-muted focus:border-text focus:outline-none md:text-sm"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@trainer.com"
                    className="rounded-full border border-line bg-white px-4 py-3 text-base placeholder:text-muted focus:border-text focus:outline-none md:text-sm"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    What&apos;s it about?
                  </span>
                  <select
                    className="rounded-full border border-line bg-white px-4 py-3 text-base focus:border-text focus:outline-none md:text-sm"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pick a topic
                    </option>
                    <option>Order or shipping</option>
                    <option>Build help</option>
                    <option>Defect or return</option>
                    <option>Custom request</option>
                    <option>Account / wishlist</option>
                    <option>Wholesale</option>
                    <option>Press / partnership</option>
                    <option>Something else</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Order # (optional)
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. SL-1234"
                    className="rounded-full border border-line bg-white px-4 py-3 text-base placeholder:text-muted focus:border-text focus:outline-none md:text-sm"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Message
                  </span>
                  <textarea
                    rows={5}
                    required
                    placeholder="What's going on?"
                    className="rounded-2xl border border-line bg-white px-4 py-3 text-base placeholder:text-muted focus:border-text focus:outline-none md:text-sm"
                  />
                </label>

                <button type="submit" className="btn-orange w-full">
                  Send
                  <ArrowRight className="size-4" strokeWidth={2.6} />
                </button>

                <p className="text-xs text-muted">
                  We&apos;ll reply to the email above. We don&apos;t share or
                  sell your details.
                </p>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="flex flex-col gap-5">
            <div className="border-2 border-text bg-pink-tint p-6 md:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-magenta">
                <Mail className="size-5" strokeWidth={2.4} />
              </span>
              <h3 className="mt-3 font-display text-xl uppercase leading-tight">
                Email
              </h3>
              <p className="mt-2 text-sm text-text-soft">
                <Link
                  href="mailto:slablabsoz@gmail.com"
                  className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
                >
                  slablabsoz@gmail.com
                </Link>
              </p>
            </div>
            <div className="border-2 border-text bg-sky-tint p-6 md:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-cyan-deep">
                <MessageCircle className="size-5" strokeWidth={2.4} />
              </span>
              <h3 className="mt-3 font-display text-xl uppercase leading-tight">
                Socials
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-soft">
                Slablabs socials go live with the first batch. Until then,
                email is the fastest way to reach a human.
              </p>
            </div>
            <div className="border-2 border-text bg-mint-tint p-6 md:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-lime-deep">
                <Sparkles className="size-5" strokeWidth={2.4} />
              </span>
              <h3 className="mt-3 font-display text-xl uppercase leading-tight">
                Custom request?
              </h3>
              <p className="mt-2 text-sm text-text-soft">
                Use the{" "}
                <Link
                  href="/#request"
                  className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
                >
                  Request a Card
                </Link>{" "}
                form on the homepage. Faster than email for new kits.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
