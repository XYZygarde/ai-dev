import { useState, type CSSProperties, type FormEvent } from "react";

export interface BoothSettings {
  numberOfShots: number;
  countdownSeconds: number;
}

export const DEFAULT_BOOTH_SETTINGS: BoothSettings = {
  numberOfShots: 4,
  countdownSeconds: 3,
};

interface BoothSettingFormProps {
  initialSettings?: BoothSettings;
  onSave?: (settings: BoothSettings) => void;
}

export function BoothSettingForm({
  initialSettings = DEFAULT_BOOTH_SETTINGS,
  onSave,
}: BoothSettingFormProps) {
  const [numberOfShots, setNumberOfShots] = useState(
    String(initialSettings.numberOfShots),
  );
  const [countdownSeconds, setCountdownSeconds] = useState(
    String(initialSettings.countdownSeconds),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof BoothSettings, string>>>({});

  function validate(): BoothSettings | null {
    const nextErrors: Partial<Record<keyof BoothSettings, string>> = {};
    const shots = Number(numberOfShots);
    const countdown = Number(countdownSeconds);

    if (!Number.isInteger(shots) || shots < 1 || shots > 10) {
      nextErrors.numberOfShots = "Enter a whole number between 1 and 10.";
    }

    if (!Number.isInteger(countdown) || countdown < 1 || countdown > 30) {
      nextErrors.countdownSeconds = "Enter a whole number between 1 and 30.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return null;

    return { numberOfShots: shots, countdownSeconds: countdown };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const settings = validate();
    if (settings) onSave?.(settings);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <header style={styles.header}>
        <h1 style={styles.title}>Photobooth Settings</h1>
        <p style={styles.subtitle}>Configure how each session runs.</p>
      </header>

      <div style={styles.field}>
        <label htmlFor="numberOfShots" style={styles.label}>
          Number of shots
        </label>
        <input
          id="numberOfShots"
          type="number"
          min={1}
          max={10}
          value={numberOfShots}
          onChange={(e) => setNumberOfShots(e.target.value)}
          style={styles.input}
          aria-invalid={Boolean(errors.numberOfShots)}
          aria-describedby={errors.numberOfShots ? "numberOfShots-error" : undefined}
        />
        {errors.numberOfShots && (
          <p id="numberOfShots-error" style={styles.error}>
            {errors.numberOfShots}
          </p>
        )}
        <p style={styles.hint}>How many photos to take per session.</p>
      </div>

      <div style={styles.field}>
        <label htmlFor="countdownSeconds" style={styles.label}>
          Countdown timer (seconds)
        </label>
        <input
          id="countdownSeconds"
          type="number"
          min={1}
          max={30}
          value={countdownSeconds}
          onChange={(e) => setCountdownSeconds(e.target.value)}
          style={styles.input}
          aria-invalid={Boolean(errors.countdownSeconds)}
          aria-describedby={
            errors.countdownSeconds ? "countdownSeconds-error" : undefined
          }
        />
        {errors.countdownSeconds && (
          <p id="countdownSeconds-error" style={styles.error}>
            {errors.countdownSeconds}
          </p>
        )}
        <p style={styles.hint}>Seconds before each shot is captured.</p>
      </div>

      <button type="submit" style={styles.button}>
        Save settings
      </button>
    </form>
  );
}

const styles: Record<string, CSSProperties> = {
  form: {
    maxWidth: 420,
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "system-ui, sans-serif",
    color: "#1a1a2e",
    background: "#fafafa",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
  },
  header: {
    marginBottom: "1.75rem",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  subtitle: {
    margin: "0.35rem 0 0",
    fontSize: "0.9rem",
    color: "#666",
  },
  field: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "0.65rem 0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: 8,
    boxSizing: "border-box",
  },
  hint: {
    margin: "0.35rem 0 0",
    fontSize: "0.8rem",
    color: "#888",
  },
  error: {
    margin: "0.35rem 0 0",
    fontSize: "0.8rem",
    color: "#c0392b",
  },
  button: {
    width: "100%",
    marginTop: "0.5rem",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#fff",
    background: "#1a1a2e",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
