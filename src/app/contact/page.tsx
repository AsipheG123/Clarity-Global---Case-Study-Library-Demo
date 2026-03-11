import Link from "next/link";
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-black">
      <div className="mb-8">
  <Link
    href="/work"
    className="inline-flex rounded-full border border-black/15 bg-white/70 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-black/5"
  >
    ← Back to Library
  </Link>
</div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-3 text-black/70">Send us a message and we’ll get back to you.</p>

        <form
          method="POST"
          className="mt-10 space-y-5 rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur"
        >

          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              name="name"
              required
              className="mt-2 w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 outline-none focus:border-black/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-xl border border-black/10 bg-white/80 px-4 py-3 outline-none focus:border-black/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={6}
              className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white/80 px-4 py-3 outline-none focus:border-black/20"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            Send message
          </button>

          <p className="text-xs text-black/50">This form is processed when deployed.</p>
        </form>
      </div>
    </main>
  );
}