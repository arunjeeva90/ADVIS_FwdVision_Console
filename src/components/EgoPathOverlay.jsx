export function EgoPathOverlay() {
  const dots = Array.from({ length: 26 }, (_, index) => {
    const t = index / 25;
    const leftX = 470 + (185 - 470) * t;
    const rightX = 530 + (815 - 530) * t;
    const y = 70 + (700 - 70) * t;
    const radius = 1.4 + 2.9 * t;

    return (
      <g key={index} opacity={0.14 + 0.82 * t}>
        <circle cx={leftX} cy={y} r={radius} fill="rgba(105,238,255,0.96)" />
        <circle cx={rightX} cy={y} r={radius} fill="rgba(105,238,255,0.96)" />
      </g>
    );
  });

  return (
    <div className="ego-path-overlay" aria-hidden="true">
      <svg viewBox="0 0 1000 700" className="ego-path-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(45,210,255,0.03)" />
            <stop offset="28%" stopColor="rgba(55,225,255,0.12)" />
            <stop offset="68%" stopColor="rgba(42,205,255,0.34)" />
            <stop offset="100%" stopColor="rgba(20,175,255,0.66)" />
          </linearGradient>

          <linearGradient id="edgeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(120,240,255,0.06)" />
            <stop offset="100%" stopColor="rgba(85,235,255,1)" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="11" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id="ribbonGrid" width="38" height="30" patternUnits="userSpaceOnUse">
            <path d="M 0 30 L 38 30" stroke="rgba(145,245,255,0.2)" strokeWidth="1" />
            <path d="M 19 0 L 19 30" stroke="rgba(145,245,255,0.1)" strokeWidth="1" />
          </pattern>
        </defs>

        <polygon
          points="470,70 530,70 835,700 165,700"
          fill="url(#pathFill)"
          filter="url(#strongGlow)"
        />

        <polygon
          points="470,70 530,70 835,700 165,700"
          fill="url(#ribbonGrid)"
          opacity="0.74"
        />

        <polyline
          points="470,70 165,700"
          fill="none"
          stroke="url(#edgeGlow)"
          strokeWidth="5.5"
          filter="url(#softGlow)"
        />

        <polyline
          points="530,70 835,700"
          fill="none"
          stroke="url(#edgeGlow)"
          strokeWidth="5.5"
          filter="url(#softGlow)"
        />

        <line
          x1="500"
          y1="70"
          x2="500"
          y2="700"
          stroke="rgba(255,255,255,0.68)"
          strokeWidth="4"
          strokeDasharray="20 22"
          filter="url(#softGlow)"
        />

        <line x1="482" y1="120" x2="378" y2="700" stroke="rgba(150,245,255,0.22)" strokeWidth="2" />
        <line x1="518" y1="120" x2="622" y2="700" stroke="rgba(150,245,255,0.22)" strokeWidth="2" />

        {dots}
      </svg>
    </div>
  );
}
