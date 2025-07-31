"use client";

import { useState, useRef, useEffect } from "react";

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
  ayat: Ayat[];
}

const voices = [
  { id: "01", name: "Abdullah Al-Juhany" },
  { id: "02", name: "Abdul-Muhsin Al-Qasim" },
  { id: "03", name: "Abdurrahman as-Sudais" },
  { id: "04", name: "Ibrahim Al-Dossari" },
  { id: "05", name: "Misyari Rasyid Al-Afasi" },
];

export default function SurahPlayer({ surah }: { surah: SurahDetail }) {
  const [showBar, setShowBar] = useState(false);
  const [currentAyat, setCurrentAyat] = useState<number | null>(null);
  const [voice, setVoice] = useState("05");
  const [showMenu, setShowMenu] = useState<{ open: boolean; ayat: number | null }>({ open: false, ayat: null });
  const audioRef = useRef<HTMLAudioElement>(null);
  const ayatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentAyat !== null && showBar) {
      const node = ayatRefs.current[currentAyat];
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentAyat, showBar]);

  const playAyat = (index: number) => {
    setCurrentAyat(index);
    setShowBar(true);
  };

  const handleEnded = () => {
    if (currentAyat !== null && currentAyat < surah.ayat.length - 1) {
      setCurrentAyat(currentAyat + 1);
    } else {
      setShowBar(false);
      setCurrentAyat(null);
    }
  };

  const handlePrev = () => {
    if (currentAyat !== null && currentAyat > 0) {
      setCurrentAyat(currentAyat - 1);
    }
  };

  const handleNext = () => {
    if (currentAyat !== null && currentAyat < surah.ayat.length - 1) {
      setCurrentAyat(currentAyat + 1);
    }
  };

  const handleCopy = (idx: number) => {
    const ayat = surah.ayat[idx];
    const text = `${ayat.teksArab}\n${ayat.teksLatin}\n${ayat.teksIndonesia}`;
    navigator.clipboard.writeText(text);
    setShowMenu({ open: false, ayat: null });
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4">
        <div>
          {surah.ayat.map((a, idx) => (
            <div
              key={a.nomorAyat}
              ref={el => { ayatRefs.current[idx] = el; }}
              className={`mb-6 border-b pb-4 relative transition-colors ${
                currentAyat === idx && showBar
                  ? "bg-green-50 border-green-400"
                  : "bg-white"
              }`}
              style={currentAyat === idx && showBar ? { borderWidth: 2 } : {}}
            >
              <div className="flex items-start gap-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none mt-1"
                  aria-label="Menu Ayat"
                  onClick={() => setShowMenu({ open: !showMenu.open || showMenu.ayat !== idx, ayat: idx })}
                  type="button"
                  style={{ minWidth: 36, minHeight: 36 }}
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2" fill="#888" />
                    <circle cx="12" cy="12" r="2" fill="#888" />
                    <circle cx="12" cy="19" r="2" fill="#888" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="text-2xl text-right font-bold mb-2">{a.teksArab}</div>
                  <div className="italic text-green-700 mb-1">{a.teksLatin}</div>
                  <div className="text-gray-800">{a.teksIndonesia}</div>
                </div>
              </div>
              {showMenu.open && showMenu.ayat === idx && (
                <div className="absolute left-0 top-10 bg-white rounded-xl shadow-lg border w-48 z-50 animate-fadeIn">
                  <button
                    className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-gray-50"
                    onClick={() => {
                      playAyat(idx);
                      setShowMenu({ open: false, ayat: null });
                    }}
                    type="button"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-3">
                      <path fill="currentColor" d="M8 5v14l11-7z" />
                    </svg>
                    Putar Ayat
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-gray-50"
                    onClick={() => handleCopy(idx)}
                    type="button"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-3">
                      <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                    Copy Ayat
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showBar && currentAyat !== null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg px-2 py-2 flex justify-center animate-fadeIn"
          style={{paddingBottom: 'env(safe-area-inset-bottom, 0)'}}>
          <div className="w-full max-w-4xl flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2" style={{marginBottom: 16}}>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-15 h-15 rounded-full bg-teal-600 flex items-center justify-center shadow text-white text-sm font-bold">
                <span style={{ fontFamily: "serif" }}>{surah.nama}</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-gray-500">Putar Surah</span>
                <span
                  className="font-semibold text-gray-800 text-base sm:text-lg whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300"
                  style={{ WebkitOverflowScrolling: "touch", direction: "ltr" }}
                  title={`${surah.namaLatin} - ${surah.ayat[currentAyat].nomorAyat}/${surah.jumlahAyat}`}
                >
                  {surah.namaLatin} - {surah.ayat[currentAyat].nomorAyat}/{surah.jumlahAyat}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap mt-2 sm:mt-0 flex-1">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={handlePrev}
                disabled={currentAyat === 0}
                aria-label="Sebelumnya"
                type="button"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                onClick={() => {
                  if (audioRef.current) audioRef.current.play();
                }}
                aria-label="Play"
                type="button"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M8 5v14l11-7z" />
                </svg>
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={handleNext}
                disabled={currentAyat === surah.ayat.length - 1}
                aria-label="Selanjutnya"
                type="button"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m10 17 6-5-6-5v10z" />
                </svg>
              </button>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-xs sm:text-sm ml-2"
                aria-label="Pilih Qari"
              >
                {voices.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              <button
                className="ml-1 p-2 rounded-full hover:bg-gray-100"
                onClick={() => {
                  setShowBar(false);
                  setCurrentAyat(null);
                  if (audioRef.current) audioRef.current.pause();
                }}
                aria-label="Tutup player"
                type="button"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center">
              <audio
                ref={audioRef}
                src={surah.ayat[currentAyat].audio[voice]}
                autoPlay
                controls
                className="w-full max-w-xs sm:max-w-lg ml-0 sm:ml-4 mt-2 sm:mt-0"
                onEnded={handleEnded}
                style={{background: "#fff", marginTop: 8}}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <style jsx global>{`
            .animate-fadeIn {
              animation: fadeInBar 0.3s;
            }
            @keyframes fadeInBar {
              from {
                transform: translateY(100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @media (max-width: 640px) {
              .fixed > .flex {
                flex-direction: column !important;
                align-items: stretch !important;
              }
              .fixed select,
              .fixed button,
              .fixed audio {
                margin-left: 0 !important;
              }
              .fixed audio {
                width: 100% !important;
                max-width: 100% !important;
              }
            }
            .mb-6 {
              margin-bottom: 2.5rem !important;
            }
          `}</style>
        </div>
      )}
    </>
  );
}