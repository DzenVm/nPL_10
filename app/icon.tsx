import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Abstrakcyjny znak favicon: węzeł emitujący impuls na dwóch ścieżkach.
// Generowany kodem (next/og), bez żadnej nazwy czy inicjałów — nie jest logiem marki.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(155deg, #0c1120 0%, #070a12 100%)",
          borderRadius: 14,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path d="M22 22 L6 10" stroke="#4cf1e0" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M22 22 L38 12" stroke="#b39bff" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M22 22 L16 38" stroke="#4cf1e0" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" />
          <circle cx="6" cy="10" r="3.6" fill="#4cf1e0" />
          <circle cx="38" cy="12" r="3.6" fill="#b39bff" />
          <circle cx="16" cy="38" r="3.2" fill="#4cf1e0" opacity="0.6" />
          <circle cx="22" cy="22" r="7.5" fill="#ffb454" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
