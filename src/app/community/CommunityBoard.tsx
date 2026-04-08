"use client";
import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Post {
  id:        string;
  category:  string;
  author:    string;
  title:     string;
  body:      string;
  createdAt: string;
  replies:   Reply[];
  pinned?:   boolean;
}

interface Reply {
  id:        string;
  author:    string;
  body:      string;
  createdAt: string;
  isChris?:  boolean;
}

// ─── Seed data (shown on first load) ─────────────────────────────────────────
const SEED_POSTS: Post[] = [
  {
    id: "seed-1",
    category: "PCS / Military",
    author: "SSgt_Relocating",
    title: "PCS to WPAFB in June — Beavercreek vs Fairborn?",
    body: "Getting orders to Wright-Patt for June. Family of 4, looking at Beavercreek vs Fairborn. Budget around $280k. Schools are priority. Anyone been through this recently?",
    createdAt: "2026-04-01T14:32:00Z",
    pinned: true,
    replies: [
      {
        id: "r1",
        author: "Chris Jurgens (Agent)",
        body: "Great question — I help a LOT of WPAFB families with exactly this decision. Short answer: Beavercreek gives you top-rated schools (Beaver Creek City Schools) and is about 12 min from Gate 12A. Fairborn gets you closer and more budget-friendly, but the school ratings are lower. At $280k you can get a solid 3-4 bed in either. DM me or call (937) 241-3484 and I can send over some current listings.",
        createdAt: "2026-04-01T16:10:00Z",
        isChris: true,
      },
      {
        id: "r2",
        author: "WPAFB_Vet_2021",
        body: "We did exactly this in 2021 — chose Beavercreek, never looked back. Kids' school is fantastic. 15 min drive to the gate is nothing.",
        createdAt: "2026-04-01T18:45:00Z",
      },
    ],
  },
  {
    id: "seed-2",
    category: "Neighborhoods",
    author: "NewtoDayton",
    title: "What's the vibe in Oakwood? Worth the premium?",
    body: "Oakwood keeps coming up in my research but prices are noticeably higher than surrounding areas. What exactly are you paying for? Is it worth it for a young family?",
    createdAt: "2026-04-02T09:15:00Z",
    replies: [
      {
        id: "r3",
        author: "Oakwood_Resident",
        body: "We've lived here 6 years. You're paying for walkability, top schools (Oakwood City), safety, and neighborhood character. If you can swing it, do it. You won't regret it.",
        createdAt: "2026-04-02T10:30:00Z",
      },
    ],
  },
  {
    id: "seed-3",
    category: "VA Loans",
    author: "RetiredAF_Buyer",
    title: "Using a VA loan for the first time — tips?",
    body: "I'm a retired Air Force vet buying my first home with a VA loan. Any tips on the process? Do sellers in Dayton push back on VA offers?",
    createdAt: "2026-04-03T11:00:00Z",
    replies: [
      {
        id: "r4",
        author: "Chris Jurgens (Agent)",
        body: "I specialize in VA loans — been working with vets for years. The short answer: Dayton is very VA-friendly, especially compared to competitive markets. A few things to know: (1) no PMI, no down payment needed, (2) VA appraisals can be stricter on property condition, (3) I always present VA offers strongly to sellers so you don't get disadvantaged. Call me and I'll walk you through the whole process.",
        createdAt: "2026-04-03T13:20:00Z",
        isChris: true,
      },
    ],
  },
  {
    id: "seed-4",
    category: "Schools",
    author: "MovingWithKids",
    title: "Best school districts for elementary aged kids?",
    body: "Moving to Dayton area with a 7 and 9 year old. Which school districts should I be targeting? Happy to stretch the budget for the right district.",
    createdAt: "2026-04-04T08:00:00Z",
    replies: [],
  },
];

const CATEGORIES = ["All", "PCS / Military", "Neighborhoods", "VA Loans", "Schools", "Market Talk", "General Q&A"];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  if (days > 1)  return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CommunityBoard() {
  const [posts,       setPosts]       = useState<Post[]>([]);
  const [category,    setCategory]    = useState("All");
  const [activePost,  setActivePost]  = useState<Post | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [replyBody,   setReplyBody]   = useState("");
  const [replyName,   setReplyName]   = useState("");

  // New post form state
  const [newTitle,    setNewTitle]    = useState("");
  const [newBody,     setNewBody]     = useState("");
  const [newAuthor,   setNewAuthor]   = useState("");
  const [newCat,      setNewCat]      = useState("General Q&A");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dr_community_posts");
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(SEED_POSTS);
        localStorage.setItem("dr_community_posts", JSON.stringify(SEED_POSTS));
      }
    } catch {
      setPosts(SEED_POSTS);
    }
  }, []);

  function savePosts(updated: Post[]) {
    setPosts(updated);
    try { localStorage.setItem("dr_community_posts", JSON.stringify(updated)); } catch {}
  }

  function submitPost(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim() || !newAuthor.trim()) return;
    const post: Post = {
      id:        `post-${Date.now()}`,
      category:  newCat,
      author:    newAuthor.trim(),
      title:     newTitle.trim(),
      body:      newBody.trim(),
      createdAt: new Date().toISOString(),
      replies:   [],
    };
    savePosts([post, ...posts]);
    setNewTitle(""); setNewBody(""); setNewAuthor(""); setNewCat("General Q&A");
    setShowNewPost(false);
    setActivePost(post);
  }

  function submitReply(e: React.FormEvent, postId: string) {
    e.preventDefault();
    if (!replyBody.trim() || !replyName.trim()) return;
    const reply: Reply = {
      id:        `reply-${Date.now()}`,
      author:    replyName.trim(),
      body:      replyBody.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = posts.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
    );
    savePosts(updated);
    setActivePost(updated.find(p => p.id === postId) ?? null);
    setReplyBody(""); setReplyName("");
  }

  const filtered = posts.filter(p => category === "All" || p.category === category);
  const pinned   = filtered.filter(p => p.pinned);
  const regular  = filtered.filter(p => !p.pinned);

  // ── Post detail view ────────────────────────────────────────────────────────
  if (activePost) {
    const post = posts.find(p => p.id === activePost.id) ?? activePost;
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => setActivePost(null)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gold mb-6 transition-colors"
        >
          ← Back to Community
        </button>

        <div className="card mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-gold uppercase tracking-wide">{post.category}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
          </div>
          <h1 className="text-xl font-black mb-3">{post.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-black">
              {post.author[0].toUpperCase()}
            </div>
            <span className="text-sm font-semibold">{post.author}</span>
          </div>
          <p className="text-gray-600 leading-relaxed">{post.body}</p>
        </div>

        {/* Replies */}
        {post.replies.length > 0 && (
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-sm font-bold text-gray-500">{post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}</p>
            {post.replies.map(reply => (
              <div
                key={reply.id}
                className={`rounded-2xl p-5 ${
                  reply.isChris
                    ? "bg-gold/5 border-2 border-gold"
                    : "bg-cream border border-gray-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                    reply.isChris ? "bg-gold text-white" : "bg-charcoal text-white"
                  }`}>
                    {reply.author[0].toUpperCase()}
                  </div>
                  <span className={`text-sm font-black ${reply.isChris ? "text-gold" : ""}`}>{reply.author}</span>
                  {reply.isChris && (
                    <span className="text-xs bg-gold text-white font-bold px-2 py-0.5 rounded-full">Agent</span>
                  )}
                  <span className="text-xs text-gray-400 ml-auto">{timeAgo(reply.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{reply.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Reply form */}
        <div className="card">
          <h3 className="text-base font-black mb-4">Leave a Reply</h3>
          <form onSubmit={e => submitReply(e, post.id)} className="flex flex-col gap-3">
            <input
              required
              placeholder="Your name"
              value={replyName}
              onChange={e => setReplyName(e.target.value)}
              className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <textarea
              required
              rows={4}
              placeholder="Share your experience or answer…"
              value={replyBody}
              onChange={e => setReplyBody(e.target.value)}
              className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
            />
            <button type="submit" className="btn-gold justify-center">Post Reply</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Board view ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-12 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-3">Dayton Relo</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Community Board</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Ask questions about relocating to Dayton. Get answers from locals, vets, and Chris himself.
          </p>
          <button
            onClick={() => setShowNewPost(true)}
            className="btn-gold text-base"
          >
            + Ask a Question
          </button>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* New post modal */}
        {showNewPost && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black">Ask the Community</h2>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="text-gray-400 hover:text-charcoal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={submitPost} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Your Name *</label>
                  <input
                    required
                    placeholder="First name or username"
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Category</label>
                  <select
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Question / Title *</label>
                  <input
                    required
                    placeholder="What do you want to know?"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Give a bit more context…"
                    value={newBody}
                    onChange={e => setNewBody(e.target.value)}
                    className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold justify-center">Post Question</button>
              </form>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-colors ${
                category === c
                  ? "bg-gold text-white border-gold"
                  : "border-gray-200 text-gray-600 hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Pinned posts */}
        {pinned.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">📌 Pinned</p>
            <div className="flex flex-col gap-3">
              {pinned.map(post => (
                <PostRow key={post.id} post={post} onClick={() => setActivePost(post)} />
              ))}
            </div>
          </div>
        )}

        {/* Regular posts */}
        <div className="flex flex-col gap-3">
          {regular.map(post => (
            <PostRow key={post.id} post={post} onClick={() => setActivePost(post)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-14 bg-cream rounded-2xl">
            <p className="text-3xl mb-3">💬</p>
            <h3 className="font-black mb-2">No posts in this category yet</h3>
            <p className="text-gray-500 text-sm mb-4">Be the first to ask!</p>
            <button onClick={() => setShowNewPost(true)} className="btn-gold">Ask a Question</button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-charcoal rounded-2xl p-8 text-center text-white">
          <p className="text-xs font-bold text-gold uppercase tracking-widest mb-2">Need a Real Answer Fast?</p>
          <h2 className="text-xl font-black mb-2">Call Chris Directly</h2>
          <p className="text-gray-400 text-sm mb-4">Licensed agent, Army vet, Dayton expert. He picks up.</p>
          <a href="tel:+19372413484" className="btn-gold">(937) 241-3484</a>
        </div>
      </div>
    </>
  );
}

// ─── Post row component ───────────────────────────────────────────────────────
function PostRow({ post, onClick }: { post: Post; onClick: () => void }) {
  const hasChrisReply = post.replies.some(r => r.isChris);
  return (
    <button
      onClick={onClick}
      className="w-full text-left card hover:border-gold hover:shadow-md transition-all duration-200 flex items-start gap-4"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center text-sm font-black flex-shrink-0 mt-0.5">
        {post.author[0].toUpperCase()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-xs font-bold text-gold">{post.category}</span>
          {post.pinned && <span className="text-xs text-gray-400">📌</span>}
          {hasChrisReply && (
            <span className="text-xs bg-gold/10 text-gold font-bold px-2 py-0.5 rounded-full">
              Chris replied
            </span>
          )}
        </div>
        <p className="font-black text-sm md:text-base truncate">{post.title}</p>
        <p className="text-gray-500 text-xs truncate mt-0.5">{post.body}</p>
      </div>

      {/* Meta */}
      <div className="flex-shrink-0 text-right ml-2">
        <div className="flex items-center gap-1 text-xs text-gray-400 justify-end mb-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.replies.length}
        </div>
        <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
      </div>
    </button>
  );
}
