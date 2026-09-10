import React from 'react';
import { motion } from 'framer-motion';

export default function ClosingMomentSection() {
  const whatsappMsg = encodeURIComponent("So... I read it. 😊");
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMsg}`;

  return (
    <section
      id="closing-moment"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '5rem 1.5rem 6rem',
        position: 'relative',
        zIndex: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '650px', width: '100%' }}
      >
        <span className="handwritten-note mb-3" style={{ fontSize: '1.6rem', color: 'var(--accent-rose)' }}>
          ♡ closing thought
        </span>

        <h2 className="text-heading text-gradient-rose mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '1.75rem', fontWeight: 400 }}>
          One last thing...
        </h2>

        <p className="font-serif text-subtitle" style={{ fontSize: '1.35rem', color: 'var(--text-deep)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
          You don't have to answer anything right now.
        </p>

        <p className="font-serif text-subtitle" style={{ fontSize: '1.35rem', color: 'var(--text-deep)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
          I just wanted you to know what was in my heart.
        </p>

        <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          Take your time.<br />
          Get to know me.<br />
          And let's see where our vibes take us.
        </p>

        {/* Handwritten Invitation & Clickable WhatsApp Link */}
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <p className="font-serif text-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-deep)', margin: 0 }}>
            If you want to tell me what you think...
          </p>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="btn-romantic-link"
            style={{
              fontSize: '1.55rem',
              fontFamily: 'var(--font-handwriting)',
              color: 'var(--accent-rose)',
              textDecoration: 'none',
              display: 'inline-block',
              paddingBottom: '2px',
              borderBottom: '1px dashed var(--accent-rose)'
            }}
          >
            <span>message me on WhatsApp. ♡</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
