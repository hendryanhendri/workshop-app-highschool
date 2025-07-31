/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import SurahPlayer from "./SurahPlayerClient";


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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getSurahDetail(slug: string): Promise<SurahDetail | null> {
  const res = await fetch("https://equran.id/api/surat", { cache: "no-store" });
  if (!res.ok) return null;
  const list = await res.json();
  const found = list.find((s: any) => slugify(s.nama_latin) === slug);
  if (!found) return null;
  const detailRes = await fetch(`https://equran.id/api/v2/surat/${found.nomor}`, { cache: "no-store" });
  if (!detailRes.ok) return null;
  const detailData = await detailRes.json();
  return detailData.data as SurahDetail;
}

export default async function Surah({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) return notFound();

  const surah = await getSurahDetail(slug);
  if (!surah) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        {surah.nama} <span className="text-lg text-gray-600">({surah.namaLatin})</span>
      </h1>
      <div className="mb-2 text-green-700 font-semibold">Arti: {surah.arti}</div>
      <div className="mb-2 text-gray-600">Jumlah Ayat: {surah.jumlahAyat}</div>
      <div className="mb-4 text-gray-600">Tempat Turun: {surah.tempatTurun}</div>
      <div className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: surah.deskripsi }} />
      <div className="mb-6 flex justify-center">
        <svg
          width="48"
          height="16"
          viewBox="0 0 120 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
        d="M60 2 Q65 10 80 16 Q95 22 110 16 Q115 14 118 16 Q120 18 118 20 Q115 22 110 20 Q95 14 80 20 Q65 26 60 30 Q55 26 40 20 Q25 14 10 20 Q5 22 2 20 Q0 18 2 16 Q5 14 10 16 Q25 22 40 16 Q55 10 60 2 Z"
        fill="#15803d"
        stroke="#166534"
        strokeWidth="1"
          />
        </svg>
      </div>
      <div className="mb-6 flex items-center">
        <div className="flex-grow border-t border-dashed border-green-700"></div>
        <span className="mx-4 text-green-800 text-2xl" aria-label="Islamic Ornament">﷽</span>
        <div className="flex-grow border-t border-dashed border-green-700"></div>
      </div>
      <div className="mb-6 flex justify-center">
        <svg
          width="48"
          height="16"
          viewBox="0 0 120 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
        d="M60 2 Q65 10 80 16 Q95 22 110 16 Q115 14 118 16 Q120 18 118 20 Q115 22 110 20 Q95 14 80 20 Q65 26 60 30 Q55 26 40 20 Q25 14 10 20 Q5 22 2 20 Q0 18 2 16 Q5 14 10 16 Q25 22 40 16 Q55 10 60 2 Z"
        fill="#15803d"
        stroke="#166534"
        strokeWidth="1"
          />
        </svg>
      </div>
      <SurahPlayer surah={surah} />
    </div>
  );
}
