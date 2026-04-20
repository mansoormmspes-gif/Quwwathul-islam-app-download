'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  Bell,
  Calendar,
  BookOpen,
  Download,
  Smartphone,
  ShieldCheck,
  Users,
  Star,
  ArrowDown,
  CheckCircle,
  Wallet,
} from 'lucide-react';

// ─── Floating Orb ──────────────────────────────────────────────────────────────
function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: 'blur(80px)' }}
      animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

// ─── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Phone Screen Slides ────────────────────────────────────────────────────────
const phoneSlides = [
  {
    icon: Bell,
    color: '#10b981',
    label: 'NOTIFICATION',
    title: 'Milad-un-Nabi 🌙',
    desc: 'Special Dua after Maghrib. All students attend.',
    extra: null,
  },
  {
    icon: Calendar,
    color: '#f59e0b',
    label: 'ATTENDANCE',
    title: 'Today — 96%',
    desc: 'Ahmed Ali marked Present · Class 7',
    extra: { val: 96 },
  },
  {
    icon: BookOpen,
    color: '#6366f1',
    label: 'PROGRESS',
    title: 'Quran · Juz 18',
    desc: 'Syllabus 72% complete for this term',
    extra: { val: 72 },
  },
];

// ─── Feature Data ───────────────────────────────────────────────────────────────
const features = [
  { icon: Bell,       color: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  title: 'Parent Notifications',    desc: 'Keep parents instantly informed about Madrasa announcements, holidays, and their child\'s updates.' },
  { icon: Wallet,   color: '#10b981', bg: 'rgba(16,185,129,0.08)',  title: 'Fees Tracking',           desc: 'Monitor monthly fee status, pending dues, and payment history with full transparency.' },
  { icon: BookOpen,   color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  title: 'Academic Progress',       desc: 'Detailed syllabus completion tracking and exam results for every subject.' },
  { icon: Users,      color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',  title: 'Ustad Connectivity',      desc: 'Direct access to teacher contacts for personalized student support anytime.' },
  { icon: ShieldCheck,color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   title: 'Secure & Private',        desc: 'All data is encrypted and managed through secure Firebase infrastructure.' },
  { icon: Download,   color: '#064e3b', bg: 'rgba(6,78,59,0.08)',     title: 'Easy Updates',            desc: 'Always stay current with the latest features via our in-app auto-update checker.' },
];

// ─── Stats ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: 200, suffix: '+', label: 'Students Enrolled' },
  { value: 12,  suffix: '',  label: 'Classes Managed' },
  { value: 98,  suffix: '%', label: 'Parent Satisfaction' },
  { value: 4,   suffix: '',  label: 'Expert Ustads' },
];

// ════════════════════════════════════════════════════════════════════════════════
export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const navBg = useTransform(scrollYProgress, [0, 0.05], ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.95)']);

  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % phoneSlides.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Magnetic button hook
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18 });
  const sy = useSpring(my, { stiffness: 220, damping: 18 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleMouse = (e: React.MouseEvent) => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width / 2) * 0.35);
    my.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const resetMouse = () => { mx.set(0); my.set(0); };

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 20 } },
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#022c22] font-sans selection:bg-emerald-100 overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <motion.nav
        className="fixed top-0 w-full z-50 px-8 py-4 border-b border-white/40 backdrop-blur-xl"
        style={{ backgroundColor: navBg }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-10 h-10 bg-[#064e3b] rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-white font-bold text-xl">QI</span>
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-[#064e3b]">Quwwathul Islam</span>
          </motion.div>

          <motion.div
            className="hidden md:flex gap-8 font-medium"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {['Features', 'Stats', 'Download'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="relative group text-gray-600 hover:text-[#064e3b] transition-colors">
                {l}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#10b981] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.div>

          <motion.a
            href="#download"
            className="bg-[#064e3b] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-emerald-900/20 hover:bg-[#10b981] transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            Get App
          </motion.a>
        </div>
      </motion.nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden min-h-screen flex items-center">
        {/* Background orbs */}
        <FloatingOrb x="5%" y="10%"  size={500} color="rgba(16,185,129,0.12)" delay={0} />
        <FloatingOrb x="65%" y="5%"  size={400} color="rgba(6,78,59,0.1)"    delay={2} />
        <FloatingOrb x="20%" y="70%" size={350} color="rgba(217,119,6,0.08)" delay={1} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #064e3b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left text */}
          <motion.div style={{ y: heroY }}>
            <motion.span
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.span
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Empowering Madrasa Education
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {['Stay', 'Connected', 'with'].map((w, i) => (
                <motion.span key={i} variants={fadeUp} className="inline-block mr-4">{w}</motion.span>
              ))}
              <br />
              <motion.span
                variants={fadeUp}
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #064e3b 0%, #10b981 50%, #d97706 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Quwwathul Islam
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Track student progress, receive instant announcements, and manage attendance—all in one elegant app for parents & teachers.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              {/* Magnetic download button */}
              <motion.button
                ref={btnRef}
                className="relative bg-[#064e3b] text-white flex items-center gap-3 py-4 px-8 rounded-2xl shadow-xl shadow-emerald-900/30 overflow-hidden"
                style={{ x: sx, y: sy }}
                onMouseMove={handleMouse}
                onMouseLeave={resetMouse}
                whileTap={{ scale: 0.96 }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  animate={{ x: ['−100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
                <Download className="w-6 h-6 relative z-10" />
                <div className="text-left relative z-10">
                  <p className="text-[10px] uppercase font-bold opacity-70">Direct Download</p>
                  <p className="text-lg font-bold">Android APK</p>
                </div>
              </motion.button>

              <motion.button
                className="bg-white border border-gray-200 text-[#022c22] flex items-center gap-3 py-4 px-8 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold opacity-70">Direct Download</p>
                  <p className="text-lg font-bold">iOS App</p>
                </div>
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-3 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex -space-x-2">
                {['#fbbf24','#34d399','#60a5fa','#f87171'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                <span className="font-bold text-[#064e3b]">200+</span> families already connected
              </span>
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: animated phone */}
          <motion.div
            className="relative flex justify-center"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          >
            {/* Halo rings */}
            {[240, 300, 360].map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-emerald-200/40"
                style={{ width: s, height: s }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            {/* Phone frame */}
            <motion.div
              className="relative z-10 bg-white/80 backdrop-blur-xl p-3 rounded-[3rem] shadow-2xl border border-white/60"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-[#022c22] w-[300px] h-[580px] rounded-[2.5rem] overflow-hidden flex flex-col p-6 text-white relative">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-6 text-xs opacity-50 font-medium">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span>●●●</span>
                  </div>
                </div>

                {/* App name */}
                <p className="text-xs font-bold tracking-widest text-emerald-400 mb-4 uppercase">Quwwathul Islam</p>

                {/* Animated slide */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIdx}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className="flex-1 flex flex-col"
                  >
                    {(() => {
                      const slide = phoneSlides[slideIdx];
                      const Icon = slide.icon;
                      return (
                        <>
                          <div className="flex items-center gap-3 mb-4">
                            <motion.div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center"
                              style={{ background: slide.color + '22' }}
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Icon className="w-6 h-6" style={{ color: slide.color }} />
                            </motion.div>
                            <span className="text-xs font-bold opacity-40 tracking-widest">{slide.label}</span>
                          </div>
                          <h3 className="text-2xl font-extrabold mb-2">{slide.title}</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">{slide.desc}</p>

                          {slide.extra && (
                            <div className="mt-auto">
                              <div className="flex justify-between text-xs font-bold mb-2 opacity-50">
                                <span>PROGRESS</span><span style={{ color: slide.color }}>{slide.extra.val}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: slide.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${slide.extra.val}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>

                {/* Slide dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {phoneSlides.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 rounded-full"
                      animate={{
                        width: i === slideIdx ? 20 : 6,
                        background: i === slideIdx ? '#10b981' : 'rgba(255,255,255,0.2)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating notification chips */}
            <motion.div
              className="absolute -right-4 top-16 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 text-sm font-semibold border border-gray-100"
              animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bell className="w-4 h-4 text-blue-500" />
              New notification!
            </motion.div>

            <motion.div
              className="absolute -left-6 bottom-28 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 text-sm font-semibold border border-gray-100"
              animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Attendance marked ✓
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
          animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── Stats Band ──────────────────────────────────────────────────────── */}
      <section id="stats" className="py-20 bg-[#064e3b] px-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="text-5xl font-extrabold text-emerald-300 mb-2">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-medium text-white/60 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need, <span className="gradient-text">in one place</span></h2>
            <p className="text-gray-500 text-lg">Designed to bridge Madrasa and Home, seamlessly.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group p-8 rounded-3xl border border-gray-100 bg-gray-50/50 cursor-default overflow-hidden relative"
                  whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.1)', borderColor: f.color }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${f.color}18, transparent 70%)` }}
                  />
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
                    style={{ background: f.bg }}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-7 h-7" style={{ color: f.color }} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
                  <motion.div
                    className="h-0.5 mt-6 rounded-full"
                    style={{ background: f.color, originX: 0 }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Download CTA ────────────────────────────────────────────────────── */}
      <section id="download" className="py-28 px-8 relative overflow-hidden">
        <FloatingOrb x="0%"  y="0%"   size={500} color="rgba(16,185,129,0.15)" delay={0} />
        <FloatingOrb x="70%" y="50%"  size={400} color="rgba(6,78,59,0.12)"    delay={2} />

        <motion.div
          className="max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
        >
          <div className="bg-[#064e3b] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            {/* Animated rings inside the card */}
            {[200, 320, 440].map((s, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                style={{ width: s, height: s }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
                transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 text-sm font-bold px-4 py-1.5 rounded-full mb-8 border border-white/10"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              Free Download · No Subscription
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 relative z-10">Ready to get started?</h2>
            <p className="text-lg text-white/70 mb-14 max-w-xl mx-auto relative z-10 leading-relaxed">
              Join 200+ families at Quwwathul Islam Madrasa using the official app to stay informed and connected.
            </p>

            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <motion.button
                className="bg-white text-[#064e3b] py-5 px-10 rounded-2xl font-bold shadow-2xl flex items-center gap-3 text-lg relative overflow-hidden"
                whileHover={{ scale: 1.07, boxShadow: '0 20px 60px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent pointer-events-none"
                  animate={{ x: ['−100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                />
                <Download className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Download Android App (.apk)</span>
              </motion.button>

              <motion.button
                className="bg-[#0f172a] text-white py-5 px-10 rounded-2xl font-bold shadow-2xl flex items-center gap-3 text-lg relative overflow-hidden ring-1 ring-white/10"
                whileHover={{ scale: 1.07, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  animate={{ x: ['−100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                />
                <Download className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Download iOS App</span>
              </motion.button>
            </div>

            <motion.div
              className="mt-14 flex items-center justify-center gap-6 text-sm text-white/40 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {['Secure Firebase', 'Auto Updates', 'Offline Ready'].map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />{tag}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <motion.footer
        className="py-20 px-8 border-t border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-9 h-9 bg-[#064e3b] rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <span className="text-white font-bold text-sm">QI</span>
              </motion.div>
              <span className="font-bold text-xl tracking-tight text-[#064e3b]">Quwwathul Islam</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              A modern digital platform for Islamic educational institutions, focusing on character building and academic excellence.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Support Center'].map(l => (
                <li key={l}>
                  <motion.a href="#" className="hover:text-[#064e3b] transition-colors" whileHover={{ x: 4 }}>
                    {l}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Location</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Quwwathul Islam Sunni Madrasa,<br />
              Block, Kallekkad, Palakkad<br />
              Pin: 676553
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Quwwathul Islam Madrasa. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
}
