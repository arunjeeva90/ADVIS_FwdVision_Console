export function EgoPathOverlay() {
  const dots = Array.from({ length: 24 }, (_, index) => {
    const t = index / 23;
    const leftX = 485 + (372 - 485) * t;
    const rightX = 515 + (628 - 515) * t;
    const y = 78 + (700 - 78) * t;
    const radius = 1.2 + 2.0 * t;

    return (
      <g key={index} opacity={0.12 + 0.75 * t}>
        <circle cx={leftX} cy={y} r={radius} fill="rgba(110,235,255,0.96)" />
        <circle cx={rightX} cy={y} r={radius} fill="rgba(110,235,255,0.96)" />
      </g>
    );
  });

  return (
    <div className="ego-path-overlay" aria-hidden="true">
      <svg viewBox="0 0 1000 700" className="ego-path-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(40,210,255,0.02)" />
            <stop offset="35%" stopColor="rgba(48,220,255,0.08)" />
            <stop offset="75%" stopColor="rgba(40,205,255,0.18)" />
            <stop offset="100%" stopColor="rgba(28,180,255,0.34)" />
          </linearGradient>

          <linearGradient id="edgeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(110,240,255,0.10)" />
            <stop offset="100%" stopColor="rgba(90,235,255,1)" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id="ribbonGrid" width="34" height="26" patternUnits="userSpaceOnUse">
            <path d="M 0 26 L 34 26" stroke="rgba(145,245,255,0.12)" strokeWidth="1" />
            <path d="M 17 0 L 17 26" stroke="rgba(145,245,255,0.06)" strokeWidth="1" />
          </pattern>
        </defs>

        <polygon points="485,78 515,78 640,700 360,700" fill="url(#pathFill)" filter="url(#softGlow)" />
        <polygon points="485,78 515,78 640,700 360,700" fill="url(#ribbonGrid)" opacity="0.55" />

        <polyline points="485,78 360,700" fill="none" stroke="url(#edgeGlow)" strokeWidth="4.5" filter="url(#softGlow)" />
        <polyline points="515,78 640,700" fill="none" stroke="url(#edgeGlow)" strokeWidth="4.5" filter="url(#softGlow)" />

        <line
          x1="500"
          y1="78"
          x2="500"
          y2="700"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="3"
          strokeDasharray="18 20"
          filter="url(#softGlow)"
        />

        <line x1="492" y1="110" x2="435" y2="700" stroke="rgba(150,245,255,0.14)" strokeWidth="1.7" />
        <line x1="508" y1="110" x2="565" y2="700" stroke="rgba(150,245,255,0.14)" strokeWidth="1.7" />

        {dots}
      </svg>
    </div>
  );
}
