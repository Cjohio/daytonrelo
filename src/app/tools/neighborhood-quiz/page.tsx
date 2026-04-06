'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  text: string;
  options: { label: string; value: string; scores: Record<string, number> }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'commute',
    text: "What's your primary work destination?",
    options: [
      { label: 'Wright-Patterson AFB', value: 'wpafb', scores: { fairborn: 5, beavercreek: 4, xenia: 3 } },
      { label: 'L3Harris / Beavercreek', value: 'l3', scores: { beavercreek: 5, fairborn: 4, kettering: 2 } },
      { label: 'Kettering / Premier Health', value: 'kh', scores: { kettering: 5, centerville: 4, oakwood: 3 } },
      { label: 'Downtown Dayton', value: 'dt', scores: { oakwood: 5, huber: 3, kettering: 3 } },
    ],
  },
  {
    id: 'vibe',
    text: 'What neighborhood vibe fits you best?',
    options: [
      { label: 'Quiet suburban', value: 'sub', scores: { beavercreek: 4, centerville: 5, huber: 3 } },
      { label: 'Walkable & urban', value: 'urb', scores: { oakwood: 5, kettering: 3 } },
      { label: 'Rural & spacious', value: 'rur', scores: { xenia: 5, fairborn: 3 } },
      { label: 'Lively community', value: 'com', scores: { fairborn: 4, huber: 4, beavercreek: 3 } },
    ],
  },
  {
    id: 'schools',
    text: 'How important are top-rated public schools?',
    options: [
      { label: 'Very important', value: 'vhi', scores: { beavercreek: 5, centerville: 5, oakwood: 4 } },
      { label: 'Somewhat important', value: 'med', scores: { kettering: 3, fairborn: 3, huber: 3 } },
      { label: 'Not a priority', value: 'low', scores: { xenia: 2, fairborn: 2 } },
    ],
  },
  {
    id: 'budget',
    text: 'What\'s your approximate home budget?',
    options: [
      { label: 'Under $200K', value: 'low', scores: { xenia: 5, huber: 4, fairborn: 4 } },
      { label: '$200K – $300K', value: 'med', scores: { fairborn: 5, kettering: 4, huber: 3 } },
      { label: '$300K – $450K', value: 'hi', scores: { beavercreek: 5, centerville: 4, kettering: 3 } },
      { label: 'Over $450K', value: 'lux', scores: { centerville: 5, oakwood: 5, beavercreek: 3 } },
    ],
  },
  {
    id: 'lifestyle',
    text: 'What matters most outside of home?',
    options: [
      { label: 'Parks & outdoor trails', value: 'out', scores: { beavercreek: 4, xenia: 5, centerville: 3 } },
      { label: 'Restaurants & nightlife', value: 'din', scores: { oakwood: 5, kettering: 3 } },
      { label: 'Shopping & convenience', value: 'shp', scores: { beavercreek: 4, centerville: 4, huber: 3 } },
      { label: 'Military community', value: 'mil', scores: { fairborn: 5, beavercreek: 3 } },
    ],
  },
];

const NEIGHBORHOOD_DETAILS: Record<string, { name: string; tagline: string }> = {
  beavercreek: { name: 'Beavercreek', tagline: 'Top-rated schools, upscale retail, strong military community' },
  fairborn: { name: 'Fairborn', tagline: 'Best value near WPAFB, 3 minutes to main gate' },
  kettering: { name: 'Kettering', tagline: 'Beautiful older homes, excellent schools, well-established community' },
  centerville: { name: 'Centerville', tagline: 'Newer construction, great schools, family-friendly' },
  oakwood: { name: 'Oakwood', tagline: 'Most prestigious suburb with walkable village center' },
  xenia: { name: 'Xenia', tagline: 'Most affordable option with small-town feel' },
  huber: { name: 'Huber Heights', tagline: 'Good value, solid community with growing commercial base' },
};

type Answers = Record<string, string>;
type Scores = Record<string, number>;

function computeScores(answers: Answers): Scores {
  const totals: Scores = {};
  QUESTIONS.forEach(({ id, options }) => {
    const answer = answers[id];
    if (!answer) return;
    const option = options.find((o) => o.value === answer);
    if (!option) return;
    Object.entries(option.scores).forEach(([hood, pts]) => {
      totals[hood] = (totals[hood] ?? 0) + pts;
    });
  });
  return totals;
}

function rankNeighborhoods(scores: Scores) {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id, score]) => ({
      id,
      ...(NEIGHBORHOOD_DETAILS[id] ?? { name: id, tagline: '' }),
      score,
    }));
}

export default function NeighborhoodQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const q = QUESTIONS[step];

  const answer = (value: string) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const progress = (step / QUESTIONS.length) * 100;

  if (done) {
    const ranked = rankNeighborhoods(computeScores(answers));

    return (
      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Results Hero */}
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold text-charcoal mb-3">Your Top Matches</h1>
            <p className="text-lg text-gray-600">
              Based on your answers, here are your best-fit Dayton neighborhoods.
            </p>
          </div>

          {/* Results */}
          <div className="space-y-4 mb-12">
            {ranked.map(({ id, name, tagline, score }, i) => (
              <div
                key={id}
                className={`card border-2 p-6 flex items-start gap-6 ${
                  i === 0 ? 'border-gold bg-blue-50' : 'border-gray-200'
                }`}
              >
                {i === 0 && (
                  <div className="absolute -top-4 right-6 bg-gold text-charcoal text-xs font-bold px-3 py-1 rounded">
                    # Best Match
                  </div>
                )}
                <div className="text-3xl font-bold text-gray-400 min-w-fit">#{i + 1}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-charcoal mb-1">{name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{tagline}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gold h-full"
                      style={{ width: `${Math.min((score / 20) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="text-gold text-xl">→</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3 mb-8">
            <Link
              href={`/listings?city=${ranked[0]?.name || ''}`}
              className="btn-gold block w-full text-center"
            >
              Browse Homes in {ranked[0]?.name}
            </Link>
            <button
              onClick={reset}
              className="btn-outline w-full"
            >
              Retake Quiz
            </button>
            <Link
              href="/contact"
              className="btn-outline block w-full text-center"
            >
              Talk to an Agent
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden mb-3">
            <div
              className="bg-gold h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-sm text-gray-600">
            Question {step + 1} of {QUESTIONS.length}
          </p>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-charcoal mb-8">{q.text}</h2>

          {/* Options */}
          <div className="space-y-4">
            {q.options.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => answer(value)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[q.id] === value
                    ? 'border-gold bg-charcoal text-white'
                    : 'border-gray-200 hover:border-gold'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{label}</span>
                  {answers[q.id] === value && <span className="text-gold text-xl">✓</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Back Button */}
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-8 text-gold hover:text-gold/80 transition text-sm font-semibold"
            >
              ← Previous question
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
