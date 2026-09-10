import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';

export default function HowItStartedSection() {
  const diaryEntries = [
    {
      num: '01',
      title: 'THE INTERVIEW',
      note: 'where I thought this was just work.',
      text: 'You came to me for a job. I took your interview, everything went well, and you started working with me.'
    },
    {
      num: '02',
      title: 'WORKING TOGETHER',
      note: 'and then I started noticing you.',
      text: 'Work updates, project discussions, and learning how we solve problems together.'
    },
    {
      num: '03',
      title: 'THAT GOOGLE MEET',
      note: 'the CRM call',
      text: 'At the end of explaining the CRM call... I casually asked for your Instagram ID.'
    },
    {
      num: '04',
      title: 'INSTAGRAM',
      note: 'asked once, asked again...',
      text: 'You initially said no. I didn\'t push you then. A few days later, I asked again... and this time, you shared it with me.'
    },
    {
      num: '05',
      title: 'MORE CONVERSATIONS',
      note: 'lunches, dinners, gym, late nights',
      text: 'Random messages, late replies, lunches, dinners, gym chats, and sharing small daily moments.'
    },
    {
      num: '06',
      title: 'THE CONFESSION',
      note: 'honest feelings',
      text: 'I told you that I liked you and wanted something more than just friendship.'
    },
    {
      num: '07',
      title: 'WHERE WE ARE NOW',
      note: 'no rush, just patience',
      text: '"Maybe after some time—a month, two months, a year—we see where things go and if our vibes match."'
    }
  ];

  return (
    <section id="how-this-started" className="section-container">
      <SectionHeader
        badge="our little timeline"
        title="Funny how this started."
        subtitle="It wasn't scripted, and I definitely didn't plan it. It just happened organically."
      />

      {/* Intro Narrative Quote */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
        <p className="font-serif text-subtitle" style={{ fontSize: '1.35rem', color: 'var(--text-deep)', lineHeight: '1.85' }}>
          "You came to me for a job. I took your interview. Everything went well. You started working with me...<br /><br />
          And somewhere between conversations about work, random messages, late replies, lunches, dinners, gym, and all those little moments...<br />
          <span className="text-gradient-rose font-serif" style={{ fontSize: '1.45rem' }}>I started seeing you differently."</span>
        </p>
      </div>

      {/* SPECIAL HANDWRITTEN MEMORY NOTE: "And then there was Instagram..." */}
      <div
        className="scrapbook-note mb-20"
        style={{
          maxWidth: '680px',
          margin: '0 auto 5rem',
          transform: 'rotate(-0.8deg)',
          background: '#fffdfc'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="handwritten-note" style={{ fontSize: '1.5rem', color: 'var(--accent-rose)' }}>
            ♡ That one Google Meet...
          </span>
          <h3 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginTop: '0.3rem' }}>
            "And then there was Instagram..."
          </h3>
        </div>

        {/* Handwritten Memory Sequence */}
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            textAlign: 'center'
          }}
        >
          <p className="handwritten-note" style={{ fontSize: '1.3rem', color: 'var(--text-deep)', margin: 0 }}>
            "Google Meet • CRM explanation call"
          </p>
          <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', margin: 0 }}>
            I asked for your Instagram ID.
          </p>

          <p className="handwritten-note" style={{ fontSize: '1.35rem', color: 'var(--accent-rose)', margin: '0.2rem 0' }}>
            You said no. 😌
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontStyle: 'italic', margin: 0 }}>
            (okay... I didn't push you then)
          </p>

          <p className="handwritten-note" style={{ fontSize: '1.3rem', color: 'var(--text-deep)', margin: '0.4rem 0 0' }}>
            A few days later... I asked again.
          </p>

          <p className="font-serif text-gradient-rose" style={{ fontSize: '1.3rem', fontWeight: 500, margin: 0 }}>
            And this time, Instagram unlocked. 😂
          </p>
        </div>

        {/* Narrative Reflection */}
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', borderTop: '1px dashed rgba(217, 107, 131, 0.2)', paddingTop: '1.25rem' }}>
          <p className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-deep)', lineHeight: 1.8, marginBottom: '1rem' }}>
            "I asked once. You said no. I didn't push you then. A few days later, I asked again... and this time, you shared it with me."
          </p>

          <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Maybe it was just Instagram. But somehow, that tiny little thing still made me smile.
          </p>

          <span className="handwritten-note" style={{ fontSize: '1.35rem', color: 'var(--accent-rose)' }}>
            CRM ➔ Google Meet ➔ Instagram — Funny how something that started with work slowly became a little more personal. 😂
          </span>
        </div>
      </div>

      {/* Flowing Diary Chapters (No cards, no boxes!) */}
      <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {diaryEntries.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: idx * 0.08 }}
            style={{
              paddingLeft: '1.5rem',
              borderLeft: '2px solid rgba(217, 107, 131, 0.25)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-rose)' }} />
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
              <span className="font-serif text-muted" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{entry.num}</span>
              <h3 className="font-serif text-gradient-rose" style={{ fontSize: '1.5rem', margin: 0 }}>{entry.title}</h3>
              <span className="handwritten-note" style={{ fontSize: '1.3rem', color: 'var(--accent-rose)' }}>{entry.note}</span>
            </div>

            <p style={{ fontSize: '1.02rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.75 }}>
              {entry.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
