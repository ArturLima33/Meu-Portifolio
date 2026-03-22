"use client";

export default function ForcaSVG({ erros }) {
  return (
    <svg height="250" width="200" style={{ marginBottom: 20 }}>
      <line x1="10" y1="240" x2="190" y2="240" stroke="#eee" strokeWidth="4" />
      <line x1="50" y1="20" x2="50" y2="240" stroke="#eee" strokeWidth="4" />
      <line x1="50" y1="20" x2="140" y2="20" stroke="#eee" strokeWidth="4" />
      <line x1="140" y1="20" x2="140" y2="50" stroke="#eee" strokeWidth="4" />

      {erros > 0 && <circle cx="140" cy="70" r="20" stroke="#eee" strokeWidth="4" fill="transparent" />}
      {erros > 1 && <line x1="140" y1="90" x2="140" y2="150" stroke="#eee" strokeWidth="4" />}
      {erros > 2 && <line x1="140" y1="110" x2="110" y2="130" stroke="#eee" strokeWidth="4" />}
      {erros > 3 && <line x1="140" y1="110" x2="170" y2="130" stroke="#eee" strokeWidth="4" />}
      {erros > 4 && <line x1="140" y1="150" x2="110" y2="190" stroke="#eee" strokeWidth="4" />}
      {erros > 5 && <line x1="140" y1="150" x2="170" y2="190" stroke="#eee" strokeWidth="4" />}
    </svg>
  );
}