export function EgoPathOverlay() {
  const dots = Array.from({ length: 22 }, (_, index) => {
    const t = index / 21;
    const leftX = 455 + (302 - 455) * t;
    const rightX = 545 + (698 - 545) * t;
    const y = 78 + (690 - 78) * t;
    const radius = 1.8 + 2.4 * t;

    return (
      <g key={index} opacity={0.18 + 0.78 * t}>
        <circle cx={leftX} cy={y} r={radius} fill="rgba(105,238,255,0.95)" />
        <circle cx={rightX} cy={y} r={radius} fill="rgba(105,238,255,0.95)" />
      </g>
    );
  });

  return (
    <div className="ego-path-overlay" aria-hidden="true">
      <svg viewBox="0 0 1000 700" className="ego-path-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(58,220,255,0.04)" />
            <stop offset="34%" stopColor="rgba(64,230,255,0.16)" />
            <stop offset="72%" stopColor="rgba(45,202,255,0.36)" />
            <stop offset="100%" stopColor="rgba(28,170,255,0.58)" />
          </linearGradient>

          <linearGradient id="pathGrid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(140,245,255,0.05)" />
            <stop offset="100%" stopColor="rgba(140,245,255,0.38)" />
          </linearGradient>

          <linearGradient id="edgeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(120,240,255,0.08)" />
            <stop offset="100%" stopColor="rgba(85,230,255,0.95)" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id="ribbonGrid" width="34" height="28" patternUnits="userSpaceOnUse">
            <path d="M 0 28 L 34 28" stroke="rgba(145,245,255,0.22)" strokeWidth="1" />
            <path d="M 17 0 L 17 28" stroke="rgba(145,245,255,0.12)" strokeWidth="1" />
          </pattern>
        </defs>

        <polygon
          points="455,78 545,78 704,700 296,700"
          fill="url(#pathFill)"
          filter="url(#strongGlow)"
        />

        <polygon
          points="455,78 545,78 704,700 296,700"
          fill="url(#ribbonGrid)"
          opacity="0.85"
        />

        <polyline
          points="455,78 296,700"
          fill="none"
          stroke="url(#edgeGlow)"
          strokeWidth="5"
          filter="url(#softGlow)"
        />

        <polyline
          points="545,78 704,700"
          fill="none"
          stroke="url(#edgeGlow)"
          strokeWidth="5"
          filter="url(#softGlow)"
        />

        <line
          x1="500"
          y1="78"
          x2="500"
          y2="700"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="4"
          strokeDasharray="20 20"
          filter="url(#softGlow)"
        />

        <line
          x1="474"
          y1="108"
          x2="408"
          y2="700"
          stroke="rgba(150,245,255,0.28)"
          strokeWidth="2"
        />
        <line
          x1="526"
          y1="108"
          x2="592"
          y2="700"
          stroke="rgba(150,245,255,0.28)"
          strokeWidth="2"
        />

        {dots}
      </svg>
    </div>
  );
}
