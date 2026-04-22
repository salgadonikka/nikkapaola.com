import { useState } from 'react';

interface Props {
  images: string[];
  captions?: string[];
  /** Gallery variant: square-crop grid. Screenshots variant: natural-ratio, first image full-width. */
  variant?: 'gallery' | 'screenshots';
  /** Gallery only: number of columns (default 3). */
  columns?: 2 | 3 | 4;
  /** Collapse grid after N images and show a "+X more" overlay on the last visible tile. */
  maxVisible?: number;
  /** Screenshots only: used for alt text fallback. */
  name?: string;
}

export default function PhotoGallery({
  images,
  captions = [],
  variant = 'gallery',
  columns = 3,
  maxVisible,
  name = 'Screenshot',
}: Props) {
  const [active, setActive] = useState<number | null>(null);

  function prev() {
    setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  function next() {
    setActive((i) => (i === null ? null : (i + 1) % images.length));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setActive(null);
  }

  const visible = maxVisible != null ? images.slice(0, maxVisible) : images;
  const hiddenCount = images.length - visible.length;

  const modal = active !== null && (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => setActive(null)}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(28, 26, 23, 0.96)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <button
        onClick={() => setActive(null)}
        aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'none', border: 'none', color: 'rgba(250,247,242,0.6)',
          fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1,
        }}
      >✕</button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(250,247,242,0.1)', border: '1px solid rgba(250,247,242,0.2)',
          color: 'rgba(250,247,242,0.8)', width: 44, height: 44, borderRadius: '50%',
          cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >←</button>

      <img
        src={images[active]}
        alt={captions[active] ?? (variant === 'screenshots' ? `${name} screenshot ${active + 1}` : `Photo ${active + 1}`)}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: '4px' }}
      />

      {captions[active] && (
        <p
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: '12px', color: 'rgba(250,247,242,0.65)',
            fontSize: '0.85rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            textAlign: 'center', maxWidth: '60ch',
          }}
        >
          {captions[active]}
        </p>
      )}

      <p style={{ color: 'rgba(250,247,242,0.35)', fontSize: '0.75rem', marginTop: '10px' }}>
        {active + 1} / {images.length}
      </p>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next"
        style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(250,247,242,0.1)', border: '1px solid rgba(250,247,242,0.2)',
          color: 'rgba(250,247,242,0.8)', width: 44, height: 44, borderRadius: '50%',
          cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >→</button>
    </div>
  );

  if (variant === 'screenshots') {
    return (
      <>
        <div className="proj-screenshots">
          {visible.map((src, i) => {
            const showOverlay = i === visible.length - 1 && hiddenCount > 0;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={showOverlay ? `View all ${images.length} screenshots` : `${name} screenshot ${i + 1} — click to enlarge`}
                className="screenshot-btn"
              >
                <img
                  src={src}
                  alt={captions[i] ?? `${name} screenshot ${i + 1}`}
                  className="screenshot-img"
                  loading="lazy"
                />
                {showOverlay && (
                  <div className="screenshot-more-overlay">+{hiddenCount} more</div>
                )}
              </button>
            );
          })}
        </div>
        {modal}
      </>
    );
  }

  const cols = { 2: '1fr 1fr', 3: 'repeat(3, 1fr)', 4: 'repeat(4, 1fr)' }[columns];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '4px', margin: '2em 0' }}>
        {visible.map((src, i) => {
          const showOverlay = i === visible.length - 1 && hiddenCount > 0;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={captions[i] ?? `Photo ${i + 1}`}
              style={{
                border: 'none', padding: 0, cursor: 'pointer', overflow: 'hidden',
                aspectRatio: '1', background: '#e8d5ce', display: 'block', position: 'relative',
              }}
            >
              <img
                src={src}
                alt={captions[i] ?? `Photo ${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
              />
              {showOverlay && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(28,26,23,0.62)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(250,247,242,0.92)', fontSize: '1rem', fontWeight: 500,
                  letterSpacing: '0.04em', pointerEvents: 'none',
                }}>
                  +{hiddenCount} more
                </div>
              )}
            </button>
          );
        })}
      </div>
      {modal}
    </>
  );
}
