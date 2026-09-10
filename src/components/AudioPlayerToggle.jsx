import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayerToggle({ autoStart = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState(false);
  
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthTimerRef = useRef(null);
  const masterGainRef = useRef(null);

  // Ethereal romantic chord progression
  const chords = [
    [146.83, 220.00, 277.18, 369.99],
    [185.00, 220.00, 277.18, 369.99],
    [123.47, 185.00, 220.00, 293.66],
    [196.00, 246.94, 293.66, 369.99]
  ];

  const playSynthChord = (freqs, duration = 6.5) => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    const ctx = audioCtxRef.current;
    
    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(560, ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 2.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current || ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });
  };

  const startSynthLoop = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.setValueAtTime(0.18, audioCtxRef.current.currentTime);
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let chordIdx = 0;
    playSynthChord(chords[chordIdx]);

    synthTimerRef.current = setInterval(() => {
      chordIdx = (chordIdx + 1) % chords.length;
      playSynthChord(chords[chordIdx], 6.5);
    }, 6000);
  };

  const stopSynthLoop = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const startMusic = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.18;
        await audioRef.current.play();
        setIsPlaying(true);
        setUsingFallbackSynth(false);
      } catch (err) {
        startSynthLoop();
        setIsPlaying(true);
        setUsingFallbackSynth(true);
      }
    } else {
      startSynthLoop();
      setIsPlaying(true);
      setUsingFallbackSynth(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthLoop();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    if (autoStart) {
      startMusic();
    }
  }, [autoStart]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollPos / (docHeight || 1);

      let targetVol = 0.18;
      if (scrollRatio > 0.75) {
        targetVol = 0.12;
      } else if (scrollRatio > 0.4 && scrollRatio < 0.7) {
        targetVol = 0.22;
      }

      if (audioRef.current && !usingFallbackSynth) {
        audioRef.current.volume = targetVol;
      }
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current.currentTime, 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [usingFallbackSynth]);

  return (
    <>
      <audio ref={audioRef} src="/audio/romantic-instrumental.mp3" loop preload="none" />

      {/* Floating Light Pill Control */}
      <div
        style={{
          position: 'fixed',
          top: '22px',
          right: '24px',
          zIndex: 1000
        }}
      >
        <button
          onClick={toggleMusic}
          aria-label="Toggle romantic music"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(255, 253, 252, 0.9)',
            border: '1px solid rgba(217, 107, 131, 0.3)',
            backdropFilter: 'blur(16px)',
            color: 'var(--text-deep)',
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(100, 40, 55, 0.08)',
            transition: 'all 0.3s ease'
          }}
        >
          {isPlaying ? (
            <>
              <span>♪ playing</span>
              <span
                style={{
                  display: 'flex',
                  gap: '2px',
                  alignItems: 'flex-end',
                  height: '10px',
                  marginLeft: '2px'
                }}
              >
                <span className="eq-bar" style={{ animationDelay: '0s' }}></span>
                <span className="eq-bar" style={{ animationDelay: '0.2s' }}></span>
                <span className="eq-bar" style={{ animationDelay: '0.4s' }}></span>
              </span>
            </>
          ) : (
            <>
              <span>♪ paused</span>
            </>
          )}
        </button>

        <style>{`
          .eq-bar {
            width: 2px;
            height: 100%;
            background: var(--accent-rose);
            animation: eqWave 1.2s ease-in-out infinite alternate;
          }
          @keyframes eqWave {
            0% { height: 3px; }
            100% { height: 10px; }
          }
        `}</style>
      </div>
    </>
  );
}
