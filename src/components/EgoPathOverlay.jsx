const VP = { x: 500, y: 278 };
const PATH = {
  leftTop: { x: 492, y: VP.y },
  rightTop: { x: 508, y: VP.y },
  leftBottom: { x: 382, y: 690 },
  rightBottom: { x: 618, y: 690 },
};
const REFERENCE = {
  leftBottom: { x: 350, y: 690 },
  rightBottom: { x: 650, y: 690 },
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function EgoPathOverlay() {
  const dots = Array.from({ length: 25 }, (_, index) => {
    const t = index / 24;
    const leftX = lerp(PATH.leftTop.x, PATH.leftBottom.x, t);
    const rightX = lerp(PATH.rightTop.x, PATH.rightBottom.x, t);
    const y = lerp(PATH.leftTop.y, PATH.leftBottom.y, t);
    const radius = 1.1 + 2.2 * t;

    return (
      <g key={index} opacity={0.16 + 0.74 * t}>
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
            <stop offset="0%" stopColor="rgba(40,210,255,0.00)" />
            <stop offset="30%" stopColor="rgba(48,220,255,0.06)" />
            <stop offset="72%" stopColor="rgba(40,205,255,0.18)" />
            <stop offset="100%" stopColor="rgba(28,180,255,0.38)" />
          </linearGradient>

          <linearGradient id="edgeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(110,240,255,0.08)" />
            <stop offset="100%" stopColor="rgba(90,235,255,0.96)" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id="ribbonGrid" width="34" height="28" patternUnits="userSpaceOnUse">
            <path d="M 0 28 L 34 28" stroke="rgba(145,245,255,0.11)" strokeWidth="1" />
            <path d="M 17 0 L 17 28" stroke="rgba(145,245,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Two lane calibration/reference lines: these follow the visible background lane angle. */}
        <line
          className="lane-reference-line"
          x1={VP.x}
          y1={VP.y}
          x2={REFERENCE.leftBottom.x}
          y2={REFERENCE.leftBottom.y}
        />
        <line
          className="lane-reference-line"
          x1={VP.x}
          y1={VP.y}
          x2={REFERENCE.rightBottom.x}
          y2={REFERENCE.rightBottom.y}
        />

        <polygon
          points={`${PATH.leftTop.x},${PATH.leftTop.y} ${PATH.rightTop.x},${PATH.rightTop.y} ${PATH.rightBottom.x},${PATH.rightBottom.y} ${PATH.leftBottom.x},${PATH.leftBottom.y}`}
          fill="url(#pathFill)"
          filter="url(#softGlow)"
        />
        <polygon
          points={`${PATH.leftTop.x},${PATH.leftTop.y} ${PATH.rightTop.x},${PATH.rightTop.y} ${PATH.rightBottom.x},${PATH.rightBottom.y} ${PATH.leftBottom.x},${PATH.leftBottom.y}`}
          fill="url(#ribbonGrid)"
          opacity="0.45"
        />

        <polyline
          points={`${PATH.leftTop.x},${PATH.leftTop.y} ${PATH.leftBottom.x},${PATH.leftBottom.y}`}
          fill="none"
          stroke="url(#edgeGlow)"
          strokeWidth="4.5"
          filter="url(#softGlow)"
        />
        <polyline
          points={`${PATH.rightTop.x},${PATH.rightTop.y} ${PATH.rightBottom.x},${PATH.rightBottom.y}`}
          fill="none"
          stroke="url(#edgeGlow)"
          strokeWidth="4.5"
          filter="url(#softGlow)"
        />

        <line
          x1="500"
          y1={VP.y}
          x2="500"
          y2="690"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="3"
          strokeDasharray="18 20"
          filter="url(#softGlow)"
        />

        <line x1="493" y1="310" x2="438" y2="690" stroke="rgba(150,245,255,0.12)" strokeWidth="1.5" />
        <line x1="507" y1="310" x2="562" y2="690" stroke="rgba(150,245,255,0.12)" strokeWidth="1.5" />

        {dots}
      </svg>
    </div>
  );
}
