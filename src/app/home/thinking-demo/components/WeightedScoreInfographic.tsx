'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* ---------------------------------------------------------------------------
   DATA
--------------------------------------------------------------------------- */

type Option = {
  id: 'a' | 'b';
  label: string;
  sublabel: string;
  color: string;
  colorDeep: string;
  colorRgb: string;
};

const OPTION_A: Option = {
  id: 'a',
  label: 'Software Engineering',
  sublabel: 'KMITL',
  color: '#22c55e',
  colorDeep: '#064e3b',
  colorRgb: '34, 197, 94',
};

const OPTION_B: Option = {
  id: 'b',
  label: 'Computer Science',
  sublabel: 'CHULA',
  color: '#3b82f6',
  colorDeep: '#172554',
  colorRgb: '59, 130, 246',
};

type Factor = {
  n: number;
  name: string;
  weight: number;
  scoreA: number;
  scoreB: number;
};

const FACTORS: Factor[] = [
  { n: 1, name: 'Subject scores', weight: 0.9, scoreA: 7, scoreB: 5 },
  { n: 2, name: 'Career path', weight: 0.7, scoreA: 8, scoreB: 8 },
  { n: 3, name: 'Curriculum', weight: 0.8, scoreA: 8, scoreB: 7 },
  { n: 4, name: 'Opportunities', weight: 0.9, scoreA: 8, scoreB: 7 },
  { n: 5, name: 'Passion', weight: 0.7, scoreA: 10, scoreB: 10 },
  { n: 6, name: 'Location', weight: 0.5, scoreA: 8, scoreB: 8 },
  { n: 7, name: 'Financials', weight: 0.7, scoreA: 7, scoreB: 9 },
  { n: 8, name: 'Society & culture', weight: 0.4, scoreA: 9, scoreB: 9 },
];

const sumA = FACTORS.reduce((s, f) => s + f.scoreA * f.weight, 0);
const sumB = FACTORS.reduce((s, f) => s + f.scoreB * f.weight, 0);
const FINAL_A = sumA / FACTORS.length;
const FINAL_B = sumB / FACTORS.length;

/* ---------------------------------------------------------------------------
   ANIMATED COUNTER
--------------------------------------------------------------------------- */

function AnimatedNumber({
  value,
  decimals = 3,
  duration = 1.6,
  trigger,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  trigger: boolean;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));
  const [text, setText] = useState('0'.padEnd(decimals + 2, '0'));

  useEffect(() => {
    if (!trigger) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = rounded.on('change', (v) => setText(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [trigger, value, duration, mv, rounded]);

  return <span className="tabular">{text}</span>;
}

/* ---------------------------------------------------------------------------
   STAGE PILL
--------------------------------------------------------------------------- */

function StagePill({
  number,
  title,
  delay = 0,
}: {
  number: number;
  title: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="px-5 py-2.5 rounded-full border border-white/10 bg-ink-700/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
              {String(number).padStart(2, '0')}
            </span>
            <span className="font-display text-xs italic text-white/80">{title}</span>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   FACTOR ROW (one row of the table — name + score-A + score-B + weight)
--------------------------------------------------------------------------- */

function FactorRow({ factor, index, inView }: { factor: Factor; index: number; inView: boolean }) {
  const baseDelay = 0.15 * index;
  const wA = (factor.scoreA * factor.weight).toFixed(2);
  const wB = (factor.scoreB * factor.weight).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: baseDelay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-[40px_1fr_120px_120px_90px] gap-3 items-center py-3 px-3 border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors group"
    >
      {/* index */}
      <div className="font-mono text-[11px] text-white/30 tabular">
        {String(factor.n).padStart(2, '0')}
      </div>

      {/* factor name */}
      <div className="font-display text-[15px] text-white/85 italic">{factor.name}</div>

      {/* score A column */}
      <ScoreCell
        score={factor.scoreA}
        weighted={wA}
        color={OPTION_A.color}
        delay={baseDelay + 0.3}
        inView={inView}
      />

      {/* score B column */}
      <ScoreCell
        score={factor.scoreB}
        weighted={wB}
        color={OPTION_B.color}
        delay={baseDelay + 0.4}
        inView={inView}
      />

      {/* weight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: baseDelay + 0.5, duration: 0.5 }}
        className="flex items-center justify-end gap-2"
      >
        <span className="font-mono text-[10px] text-white/30 tracking-wider">w</span>
        <div className="font-mono text-sm text-white/90 tabular px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 min-w-[44px] text-center">
          {factor.weight}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScoreCell({
  score,
  weighted,
  color,
  delay,
  inView,
}: {
  score: number;
  weighted: string;
  color: string;
  delay: number;
  inView: boolean;
}) {
  const barWidth = `${(score / 10) * 100}%`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col gap-1"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px]" style={{ color: color, opacity: 0.7 }}>
          {score}/10
        </span>
        <span className="font-mono text-[11px] tabular" style={{ color: color }}>
          = {weighted}
        </span>
      </div>
      <div className="relative h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: barWidth } : {}}
          transition={{ delay: delay + 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: `0 0 6px ${color}80`,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   FORMULA CARD
--------------------------------------------------------------------------- */

function FormulaCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-glow/30 via-white/5 to-azure-glow/30 opacity-60 blur-sm" />
      <div className="relative rounded-2xl border border-white/10 bg-ink-800/60 backdrop-blur-md p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">THE FORMULA</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </div>

        <div className="text-center font-display text-2xl md:text-3xl text-white leading-relaxed">
          <span className="italic text-white/60">score</span>
          <span className="mx-3 text-white/40">=</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-white/40">(</span>
            <span>
              <span className="text-emerald-glow">x</span>
              <sub className="text-[0.65em] text-white/50">i</sub>
              <span className="text-white/40 mx-1">·</span>
              <span className="text-azure-glow">w</span>
              <sub className="text-[0.65em] text-white/50">i</sub>
            </span>
            <span className="text-white/30">+ ··· +</span>
            <span>
              <span className="text-emerald-glow">x</span>
              <sub className="text-[0.65em] text-white/50">n</sub>
              <span className="text-white/40 mx-1">·</span>
              <span className="text-azure-glow">w</span>
              <sub className="text-[0.65em] text-white/50">n</sub>
            </span>
            <span className="text-white/40">)</span>
          </span>
          <span className="mx-2 text-white/40">/</span>
          <span className="italic text-white/60">n</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-6 border-t border-white/5">
          <Step num="01" title="Multiply" desc="Each item score × its weight" color="#22c55e" />
          <Step num="02" title="Sum" desc="Add all weighted scores together" color="#a78bfa" />
          <Step num="03" title="Normalize" desc="Divide by sum of weights (or n)" color="#3b82f6" />
        </div>
      </div>
    </motion.div>
  );
}

function Step({
  num,
  title,
  desc,
  color,
}: {
  num: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="font-mono text-xl font-light tabular leading-none" style={{ color }}>
        {num}
      </div>
      <div className="space-y-1">
        <div className="font-display text-sm text-white">{title}</div>
        <div className="text-xs text-white/45 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   FINAL SCORE CARD
--------------------------------------------------------------------------- */

function FinalScoreCard({
  option,
  score,
  expression,
  inView,
  delay = 0,
  isWinner,
}: {
  option: Option;
  score: number;
  expression: string;
  inView: boolean;
  delay?: number;
  isWinner?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {isWinner && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 0.8, duration: 0.5 }}
          className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] z-10"
          style={{
            background: option.color,
            color: '#000',
          }}
        >
          ★ WINNER
        </motion.div>
      )}

      <div
        className="relative rounded-2xl border p-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${option.colorDeep}40, transparent 60%)`,
          borderColor: `rgba(${option.colorRgb}, 0.3)`,
        }}
      >
        {/* glowing accent */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30 -translate-y-20 translate-x-20"
          style={{ background: option.color }}
        />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: option.color, boxShadow: `0 0 8px ${option.color}` }}
            />
            <div className="font-display text-base text-white italic">{option.label}</div>
            <div className="font-mono text-[10px] text-white/40 tracking-wider">
              {option.sublabel}
            </div>
          </div>

          <div className="font-mono text-[10px] text-white/35 mb-2 tracking-wider">CALCULATION</div>
          <div className="font-mono text-[11px] text-white/60 mb-5 leading-relaxed break-all">
            ({expression}) / 8
          </div>

          <div className="flex items-baseline gap-3">
            <div className="font-mono text-[10px] text-white/35 tracking-wider">FINAL</div>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div
            className="font-display text-5xl md:text-6xl font-light mt-2 tabular"
            style={{
              color: option.color,
              textShadow: `0 0 30px ${option.color}40`,
            }}
          >
            <AnimatedNumber value={score} decimals={3} trigger={inView} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------------------------- */

export default function WeightedScoreInfographic() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const formulaRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  const stagesInView = useInView(stagesRef, { once: true, amount: 0.15 });
  const formulaInView = useInView(formulaRef, { once: true, amount: 0.4 });
  const finalInView = useInView(finalRef, { once: true, amount: 0.3 });

  const expressionA = FACTORS.map((f) => `${f.scoreA}·${f.weight}`).join(' + ');
  const expressionB = FACTORS.map((f) => `${f.scoreB}·${f.weight}`).join(' + ');

  return (
    <div className="relative">
      {/* ambient grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-50" />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 pb-32"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] tracking-[0.4em] text-white/40 mb-6"
        >
          A DECISION FRAMEWORK · CHAPTER 01
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl"
        >
          The art of the
          <br />
          <span className="italic text-white/60">weighted</span>{' '}
          <span className="relative inline-block">
            decision
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-emerald-glow via-white/40 to-azure-glow origin-left"
            />
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-white/55 text-base md:text-lg max-w-2xl mt-8 leading-relaxed"
        >
          When two paths matter, instinct rarely settles it. Score each factor, weigh what counts,
          and let the math reveal what you already half-know.
        </motion.p>

        {/* options preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 max-w-3xl">
          {[OPTION_A, OPTION_B].map((opt, i) => (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.15, duration: 0.7 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div
                className="w-1 h-12 rounded-full"
                style={{
                  background: opt.color,
                  boxShadow: `0 0 12px ${opt.color}80`,
                }}
              />
              <div>
                <div className="font-display italic text-white/90">{opt.label}</div>
                <div className="font-mono text-[10px] text-white/40 tracking-wider mt-1">
                  OPTION {opt.id.toUpperCase()} · {opt.sublabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* STAGE PILLS */}
      <section className="relative px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          <StagePill number={1} title="Set goals" delay={0.0} />
          <StagePill number={2} title="Set factors" delay={0.1} />
          <StagePill number={3} title="Set weights" delay={0.2} />
          <StagePill number={4} title="Calculate" delay={0.3} />
          <StagePill number={5} title="Compare" delay={0.4} />
        </div>
      </section>

      {/* THE TABLE */}
      <section ref={stagesRef} className="relative px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={stagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
              02 · THE LEDGER
            </div>
            <h2 className="font-display font-light text-3xl md:text-5xl text-white max-w-3xl leading-tight">
              Eight factors. Two contenders. One quiet calculation.
            </h2>
          </motion.div>

          {/* table header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={stagesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-[40px_1fr_120px_120px_90px] gap-3 px-3 pb-3 border-b border-white/10 mb-2"
          >
            <div className="font-mono text-[10px] text-white/30 tracking-wider">#</div>
            <div className="font-mono text-[10px] text-white/30 tracking-wider">FACTOR</div>
            <div className="font-mono text-[10px] tracking-wider" style={{ color: OPTION_A.color }}>
              {OPTION_A.sublabel} (A)
            </div>
            <div className="font-mono text-[10px] tracking-wider" style={{ color: OPTION_B.color }}>
              {OPTION_B.sublabel} (B)
            </div>
            <div className="font-mono text-[10px] text-white/30 tracking-wider text-right">
              WEIGHT
            </div>
          </motion.div>

          <div>
            {FACTORS.map((f, i) => (
              <FactorRow key={f.n} factor={f} index={i} inView={stagesInView} />
            ))}
          </div>
        </div>
      </section>

      {/* FORMULA */}
      <section ref={formulaRef} className="relative px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={formulaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
              03 · THE MATH
            </div>
            <h2 className="font-display font-light text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-tight">
              Three moves, in order.
            </h2>
          </motion.div>

          <FormulaCard inView={formulaInView} />
        </div>
      </section>

      {/* FINAL SCORES */}
      <section ref={finalRef} className="relative px-6 md:px-16 lg:px-24 py-24 pb-40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={finalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">
              04 · THE VERDICT
            </div>
            <h2 className="font-display font-light text-3xl md:text-5xl text-white max-w-3xl leading-tight">
              The numbers, side by side.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FinalScoreCard
              option={OPTION_A}
              score={FINAL_A}
              expression={expressionA}
              inView={finalInView}
              delay={0.1}
              isWinner={FINAL_A > FINAL_B}
            />
            <FinalScoreCard
              option={OPTION_B}
              score={FINAL_B}
              expression={expressionB}
              inView={finalInView}
              delay={0.25}
              isWinner={FINAL_B > FINAL_A}
            />
          </div>

          {/* delta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={finalInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/[0.02]">
              <span className="font-mono text-[10px] tracking-wider text-white/40">MARGIN</span>
              <span className="font-display text-lg italic text-white">
                <AnimatedNumber
                  value={Math.abs(FINAL_A - FINAL_B)}
                  decimals={3}
                  trigger={finalInView}
                />
              </span>
              <span className="font-mono text-[10px] text-white/40">
                points in favor of{' '}
                <span style={{ color: FINAL_A > FINAL_B ? OPTION_A.color : OPTION_B.color }}>
                  {FINAL_A > FINAL_B ? OPTION_A.sublabel : OPTION_B.sublabel}
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 md:px-16 lg:px-24 py-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4">
          <div className="font-mono text-[10px] tracking-wider text-white/30">
            WEIGHTED SCORE · DECISION FRAMEWORK · v1.0
          </div>
          <div className="font-display italic text-xs text-white/40">
            &ldquo;The math does not decide for you — it just shows you what you already
            feel.&rdquo;
          </div>
        </div>
      </footer>
    </div>
  );
}
