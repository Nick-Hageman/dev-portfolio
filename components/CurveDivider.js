// SVG ports of the original CSS clip-path curves (coordinates are % of the box).
const PATHS = {
  upLeft: 'M100 100.9 L100 101.7 L0 101.7 L0 21.2 C0 9.6 .49 .4 1.09 .88 L99 80.5 C99.56 81 100 90 100 100.9 Z',
  upRight: 'M0 100.9 L0 101.7 L100 101.7 L100 21.2 C100 9.6 99.5 .4 98.9 .88 L1 80.5 C.44 81 0 90 0 100.9 Z',
  downLeft: 'M100 1.7 L100 .86 L0 .86 L0 81.4 C0 92.9 .49 102.2 1.09 101.7 L99 22 C99.56 21.6 100 12.6 100 1.7 Z',
  downRight: 'M0 1.7 L0 .86 L100 .86 L100 81.4 C100 92.9 99.5 102.2 98.9 101.7 L1 22 C.44 21.6 0 12.6 0 1.7 Z',
  inverseDownLeft: 'M0 79.7 L0 100 L1.04 100 L100 100 L100 0 C100 10.9 99.56 19.9 99 20.3 L1.09 100 C.47 99.9 0 90.9 0 79.7 Z',
}

export default function CurveDivider({ variant, color = '#fff', className = '' }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden w-full max-w-6xl mx-auto h-6 sm:h-12 ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full" fill={color}>
        <path d={PATHS[variant]} />
      </svg>
    </div>
  )
}
