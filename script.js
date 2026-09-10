/* ==========================================
   ARYA — Pure Static JavaScript
   Reproducing Canvas, Scroll Progress, Audio & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------
     1. Scroll Progress Bar
     ------------------------------------------ */
  const progressBar = document.getElementById('scrollProgressBar');
  
  function updateProgressBar() {
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }
  
  window.addEventListener('scroll', updateProgressBar, { passive: true });
  updateProgressBar();

  /* ------------------------------------------
     2. Canvas Background Animation (Stars, Petals, Ambient Globs)
     ------------------------------------------ */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const isMobile = width < 768;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    if (!isMobile) {
      window.addEventListener('mousemove', (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
      }, { passive: true });
    }

    const particleCount = isMobile ? 12 : Math.min(28, Math.floor((width * height) / 30000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.01 + 0.003,
      layer: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#d96b83' : '#e9a6b4'
    }));

    const ambientCount = isMobile ? 2 : 4;
    const ambientGlobs = Array.from({ length: ambientCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 70 + 40,
      alpha: Math.random() * 0.08 + 0.02,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.5 ? 'rgba(246, 214, 221, ' : 'rgba(253, 236, 239, '
    }));

    const petalCount = isMobile ? 3 : 5;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      speedY: Math.random() * 0.3 + 0.15,
      speedX: Math.sin(Math.random() * Math.PI) * 0.2,
      opacity: Math.random() * 0.3 + 0.15
    }));

    const render = () => {
      if (document.hidden) {
        requestAnimationFrame(render);
        return;
      }
      mouse.x += (mouse.targetX - mouse.x) * 0.025;
      mouse.y += (mouse.targetY - mouse.y) * 0.025;

      const offsetX = (mouse.x - width / 2) * 0.01;
      const offsetY = (mouse.y - height / 2) * 0.01;

      ctx.clearRect(0, 0, width, height);

      // Render ambient globs
      ambientGlobs.forEach(g => {
        g.x += g.speedX;
        g.y += g.speedY;
        if (g.x < -100) g.x = width + 100;
        if (g.x > width + 100) g.x = -100;
        if (g.y < -100) g.y = height + 100;
        if (g.y > height + 100) g.y = -100;

        const gx = g.x + offsetX * 0.5;
        const gy = g.y + offsetY * 0.5;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, g.radius);
        grad.addColorStop(0, g.color + g.alpha + ')');
        grad.addColorStop(1, g.color + '0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(gx, gy, g.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render glowing dots
      particles.forEach(p => {
        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.6 || p.alpha < 0.1) p.pulseSpeed = -p.pulseSpeed;
        const px = p.x + offsetX * p.layer;
        const py = p.y + offsetY * p.layer;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.6, p.alpha));
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Render falling rose petals
      petals.forEach(pt => {
        pt.y += pt.speedY;
        pt.x += Math.sin(pt.y * 0.01) * 0.4;
        pt.rotation += pt.rotationSpeed;
        if (pt.y > height + 20) {
          pt.y = -20;
          pt.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(pt.x + offsetX, pt.y + offsetY);
        ctx.rotate(pt.rotation);
        ctx.fillStyle = `rgba(217, 107, 131, ${pt.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-pt.size / 2, -pt.size, -pt.size, pt.size / 2, 0, pt.size);
        ctx.bezierCurveTo(pt.size, pt.size / 2, pt.size / 2, -pt.size, 0, 0);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(render);
    };

    render();
  }

  /* ------------------------------------------
     3. Audio Player Pill & Web Audio Fallback
     ------------------------------------------ */
  const audioBtn = document.getElementById('audioBtn');
  const bgAudio = document.getElementById('bgAudio');
  const audioStatusText = document.getElementById('audioStatusText');
  const eqBars = document.getElementById('eqBars');
  let isAudioPlaying = false;
  let synthCtx = null;
  let synthInterval = null;

  const chords = [
    [146.83, 220, 277.18, 369.99],
    [185, 220, 277.18, 369.99],
    [123.47, 185, 220, 293.66],
    [196, 246.94, 293.66, 369.99]
  ];

  function playSynthChord(notes, duration = 6.5) {
    if (!synthCtx || synthCtx.state !== 'running') return;
    const now = synthCtx.currentTime;
    const gainNode = synthCtx.createGain();
    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.connect(synthCtx.destination);

    notes.forEach(freq => {
      const osc = synthCtx.createOscillator();
      const noteGain = synthCtx.createGain();
      const filter = synthCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(560, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.035, now + 2.2);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(gainNode);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  function startWebAudioSynth() {
    if (!synthCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      synthCtx = new AudioCtx();
    }
    if (synthCtx.state === 'suspended') synthCtx.resume();

    let step = 0;
    playSynthChord(chords[step]);
    synthInterval = setInterval(() => {
      step = (step + 1) % chords.length;
      playSynthChord(chords[step]);
    }, 6000);
  }

  function stopWebAudioSynth() {
    if (synthInterval) clearInterval(synthInterval);
    if (synthCtx && synthCtx.state === 'running') synthCtx.suspend();
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      if (bgAudio) bgAudio.pause();
      stopWebAudioSynth();
      isAudioPlaying = false;
      if (audioStatusText) audioStatusText.textContent = '♪ paused';
      if (eqBars) eqBars.style.display = 'none';
    } else {
      if (bgAudio) {
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isAudioPlaying = true;
            if (audioStatusText) audioStatusText.textContent = '♪ playing';
            if (eqBars) eqBars.style.display = 'flex';
          }).catch(() => {
            startWebAudioSynth();
            isAudioPlaying = true;
            if (audioStatusText) audioStatusText.textContent = '♪ playing';
            if (eqBars) eqBars.style.display = 'flex';
          });
        }
      } else {
        startWebAudioSynth();
        isAudioPlaying = true;
        if (audioStatusText) audioStatusText.textContent = '♪ playing';
        if (eqBars) eqBars.style.display = 'flex';
      }
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudio, { passive: true });
  }

  /* ------------------------------------------
     4. Interactive Page Elements
     ------------------------------------------ */
  // Section 3: Emoji Incident toggle
  const emojiTrigger = document.getElementById('emojiIncidentTrigger');
  const emojiAngryBox = document.getElementById('emojiAngryBox');
  const emojiHappyBox = document.getElementById('emojiHappyBox');

  if (emojiTrigger) {
    emojiTrigger.addEventListener('click', () => {
      if (emojiAngryBox && emojiHappyBox) {
        if (emojiAngryBox.style.display === 'none') {
          emojiAngryBox.style.display = 'block';
          emojiHappyBox.style.display = 'none';
          emojiTrigger.textContent = '😡';
        } else {
          emojiAngryBox.style.display = 'none';
          emojiHappyBox.style.display = 'block';
          emojiTrigger.textContent = '😂 🫂';
        }
      }
    });
  }

  // Section 10: Conflict Resolution Deal toggle
  const dealBtn = document.getElementById('dealBtn');
  let dealAccepted = false;
  if (dealBtn) {
    dealBtn.addEventListener('click', () => {
      dealAccepted = !dealAccepted;
      const span = dealBtn.querySelector('span');
      if (span) {
        span.textContent = dealAccepted 
          ? 'Deal Accepted: Always Communicate! 🤝'
          : 'Proposed Deal: Always Talk It Out! 😂';
      }
    });
  }

  /* ------------------------------------------
     5. Scroll Reveal Observer
     ------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
});
