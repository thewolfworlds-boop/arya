/* ==========================================
   ARYA — Live Site Exact Re-creation Script
   Source: https://arya-mauve.vercel.app/
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. Scroll Progress Bar
     ------------------------------------------ */
  const progressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }, { passive: true });


  /* ------------------------------------------
     2. Interactive Emoji Toggle (Things I Notice)
     ------------------------------------------ */
  const emojiDisplay = document.getElementById('emojiToggleDisplay');
  const emojiState1 = document.getElementById('emojiState1');
  const emojiState2 = document.getElementById('emojiState2');
  let isEmojiTransformed = false;

  if (emojiDisplay) {
    emojiDisplay.addEventListener('click', () => {
      isEmojiTransformed = !isEmojiTransformed;
      if (isEmojiTransformed) {
        emojiDisplay.textContent = '😂 🫂';
        if (emojiState1) emojiState1.style.display = 'none';
        if (emojiState2) emojiState2.style.display = 'block';
      } else {
        emojiDisplay.textContent = '😡';
        if (emojiState1) emojiState1.style.display = 'block';
        if (emojiState2) emojiState2.style.display = 'none';
      }
    });
  }


  /* ------------------------------------------
     3. Interactive Conflict Deal Button (When You're Angry)
     ------------------------------------------ */
  const dealButton = document.getElementById('conflictDealBtn');
  let isDealAccepted = false;

  if (dealButton) {
    dealButton.addEventListener('click', () => {
      isDealAccepted = !isDealAccepted;
      if (isDealAccepted) {
        dealButton.innerHTML = '<span>Deal Accepted: Always Communicate! 🤝</span>';
      } else {
        dealButton.innerHTML = '<span>Proposed Deal: Always Talk It Out! 😂</span>';
      }
    });
  }


  /* ------------------------------------------
     4. Ambient Floating Canvas Particles (Petals & Glows)
     ------------------------------------------ */
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    let animId, resizeHandler, mouseHandler;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const isMobile = width < 768;

    resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler, { passive: true });

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    mouseHandler = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    if (!isMobile) {
      window.addEventListener('mousemove', mouseHandler, { passive: true });
    }

    const particleCount = isMobile ? 12 : Math.min(28, Math.floor(width * height / 30000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.01 + 0.003,
      layer: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#d96b83' : '#e9a6b4'
    }));

    const glowCount = isMobile ? 2 : 4;
    const glows = Array.from({ length: glowCount }, () => ({
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
        animId = requestAnimationFrame(render);
        return;
      }
      mouse.x += (mouse.targetX - mouse.x) * 0.025;
      mouse.y += (mouse.targetY - mouse.y) * 0.025;
      const offsetX = (mouse.x - width / 2) * 0.01;
      const offsetY = (mouse.y - height / 2) * 0.01;

      ctx.clearRect(0, 0, width, height);

      glows.forEach(g => {
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

      animId = requestAnimationFrame(render);
    };

    render();
  }


  /* ------------------------------------------
     5. Romantic Audio Player (Audio / Web Audio Fallback)
     ------------------------------------------ */
  const audioBtn = document.getElementById('audioPillBtn');
  const bgAudio = document.getElementById('bgAudioElement');
  let isPlaying = false;
  let synthContext = null;
  let synthInterval = null;

  const chords = [
    [146.83, 220, 277.18, 369.99],
    [185, 220, 277.18, 369.99],
    [123.47, 185, 220, 293.66],
    [196, 246.94, 293.66, 369.99]
  ];

  function playSynthChord(freqs, duration = 6.5) {
    if (!synthContext || synthContext.state !== 'running') return;
    freqs.forEach(f => {
      const osc = synthContext.createOscillator();
      const gain = synthContext.createGain();
      const filter = synthContext.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, synthContext.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(560, synthContext.currentTime);

      const now = synthContext.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 2.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(synthContext.destination);
      osc.start(now);
      osc.stop(now + duration);
    });
  }

  function startSynth() {
    if (!synthContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      synthContext = new AudioCtx();
    }
    if (synthContext.state === 'suspended') {
      synthContext.resume();
    }
    let index = 0;
    playSynthChord(chords[index]);
    synthInterval = setInterval(() => {
      index = (index + 1) % chords.length;
      playSynthChord(chords[index], 6.5);
    }, 6000);
  }

  function stopSynth() {
    if (synthInterval) clearInterval(synthInterval);
    if (synthContext && synthContext.state === 'running') {
      synthContext.suspend();
    }
  }

  function updateAudioButton(active) {
    isPlaying = active;
    if (!audioBtn) return;
    if (isPlaying) {
      audioBtn.innerHTML = `
        <span>♪ playing</span>
        <span style="display:flex;gap:2px;align-items:flex-end;height:10px;margin-left:2px;">
          <span class="eq-bar" style="animation-delay:0s"></span>
          <span class="eq-bar" style="animation-delay:0.2s"></span>
          <span class="eq-bar" style="animation-delay:0.4s"></span>
        </span>
      `;
    } else {
      audioBtn.innerHTML = `<span>♪ paused</span>`;
    }
  }

  function toggleAudio() {
    if (!isPlaying) {
      if (bgAudio) {
        bgAudio.volume = 0.18;
        const promise = bgAudio.play();
        if (promise !== undefined) {
          promise.then(() => {
            updateAudioButton(true);
          }).catch(() => {
            startSynth();
            updateAudioButton(true);
          });
        } else {
          updateAudioButton(true);
        }
      } else {
        startSynth();
        updateAudioButton(true);
      }
    } else {
      if (bgAudio) bgAudio.pause();
      stopSynth();
      updateAudioButton(false);
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudio);
  }
});
