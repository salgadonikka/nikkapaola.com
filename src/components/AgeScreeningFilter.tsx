import { useState } from 'react';

type Screening = {
  name: string;
  startAge: number;
  note: string;
  tag?: string;
};

const SCREENINGS: Screening[] = [
  { name: 'Annual Physical Exam (APE)', startAge: 18, note: 'Every year' },
  { name: 'Blood Pressure', startAge: 18, note: 'Every year minimum; more if elevated' },
  { name: 'CBC, FBS, Lipid Panel, Liver & Kidney Function', startAge: 18, note: 'Annually; get a baseline in your early 20s' },
  { name: 'Blood Sugar / HbA1c', startAge: 18, note: 'Every 3 years if normal; annually if pre-diabetic', tag: 'especially if overweight or family history' },
  { name: 'Ferritin (Iron Stores)', startAge: 18, note: 'As needed — ask your doctor', tag: 'if experiencing fatigue or hair thinning' },
  { name: 'Thyroid (TSH)', startAge: 18, note: 'Annually if on meds or with history; every 3 yrs if normal', tag: 'especially if symptomatic' },
  { name: 'Dental Check-up & Cleaning', startAge: 18, note: 'Every 6 months' },
  { name: 'STI Screening', startAge: 18, note: 'At least annually', tag: 'if sexually active' },
  { name: 'Breast Self-Exam', startAge: 20, note: 'Monthly', tag: 'women' },
  { name: 'Clinical Breast Exam', startAge: 20, note: 'Every 3 years (20s–30s); annually from 40', tag: 'women' },
  { name: 'Eye Exam', startAge: 20, note: 'Every 2–3 years; annually after 40 or if diabetic' },
  { name: 'Uric Acid', startAge: 20, note: 'Annually in APE' },
  { name: 'Pap Smear', startAge: 21, note: 'Every 3 yrs (ages 21–29); every 5 yrs with HPV co-test (30–65)', tag: 'women' },
  { name: 'Hearing Test', startAge: 21, note: 'Every 10 years (20s–40s); every 3 years after 50' },
  { name: 'ECG / EKG', startAge: 30, note: 'Every 2–3 years; annually after 40 or with risk factors', tag: 'good time for a baseline' },
  { name: 'Full-Body Skin Check (Dermatologist)', startAge: 30, note: 'Annually' },
  { name: 'Mammogram', startAge: 40, note: 'Annually', tag: 'women; earlier if high risk' },
  { name: 'Colorectal Cancer Screening', startAge: 45, note: 'Every 10 years (colonoscopy)', tag: 'start at 40 with family history' },
  { name: 'Bone Density Scan (DEXA)', startAge: 65, note: 'As advised by your doctor', tag: 'earlier if low body weight, early menopause, or family history' },
];

export default function AgeScreeningFilter() {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState('');

  const parsedAge = parseInt(age, 10);
  const hasValidAge = !isNaN(parsedAge) && parsedAge >= 1 && parsedAge <= 120;
  const results = hasValidAge ? SCREENINGS.filter((s) => parsedAge >= s.startAge) : [];

  return (
    <div
      style={{
        margin: '2em 0',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '16px 20px',
          background: 'var(--color-cream)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--color-ink)',
        }}
        aria-expanded={open}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.1rem' }}>✦</span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            Get your personalized checklist
          </span>
        </span>
        <span
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
          }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Expanded content */}
      {open && (
        <div
          style={{
            padding: '20px',
            background: 'var(--color-warm-white)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {/* Age input */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-ink)',
                fontWeight: 500,
              }}
            >
              How old are you?
            </span>
            <input
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1.5px solid var(--color-border)',
                background: 'var(--color-cream)',
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                width: '140px',
                outline: 'none',
              }}
            />
          </label>

          {/* Results */}
          {age === '' ? (
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              Enter your age above to see which screenings apply to you.
            </p>
          ) : !hasValidAge ? (
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              Please enter a valid age.
            </p>
          ) : results.length === 0 ? (
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              No screenings matched. These guidelines start at age 18.
            </p>
          ) : (
            <>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-muted)',
                  margin: '0 0 14px 0',
                }}
              >
                {results.length} screening{results.length !== 1 ? 's' : ''} recommended for age {parsedAge}:
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {results.map((s) => (
                  <li
                    key={s.name}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'var(--color-cream)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--color-terracotta)',
                        fontSize: '0.9rem',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          color: 'var(--color-ink)',
                          lineHeight: 1.4,
                        }}
                      >
                        {s.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-muted)',
                          marginTop: '2px',
                          lineHeight: 1.4,
                        }}
                      >
                        {s.note}
                        {s.tag && (
                          <span
                            style={{
                              display: 'inline-block',
                              marginLeft: '6px',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              background: 'var(--color-border)',
                              fontSize: '0.7rem',
                              fontStyle: 'italic',
                              verticalAlign: 'middle',
                            }}
                          >
                            {s.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Disclaimer */}
          <p
            style={{
              marginTop: '16px',
              marginBottom: 0,
              fontSize: '0.75rem',
              color: 'var(--color-muted)',
              fontStyle: 'italic',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '12px',
            }}
          >
            Based on general guidelines. Not a substitute for your doctor's advice — your history and risk factors may shift these recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
