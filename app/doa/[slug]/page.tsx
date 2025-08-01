"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";

type Doa = {
  id: number;
  nama: string;
  tentang: string;
  grup: string;
  ar: string;
  tr: string;
  idn?: string;
  tag?: string[];
};

export default function DoaDetails({ params }: { params: Promise<{ slug: string }> }) {
  const [doa, setDoa] = useState<Doa | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Doa[]>([]);

  const resolvedParams = use(params);

  useEffect(() => {
    const fetchDoaByName = async () => {
      try {
        const res = await fetch("https://equran.id/api/doa", { cache: "no-store" });
        const json = await res.json();
        if (Array.isArray(json.data)) {
          const found = json.data.find(
            (item: Doa) =>
              item.nama &&
              item.nama.toLowerCase().replace(/\s+/g, "-") === decodeURIComponent(resolvedParams.slug)
          );
          if (found) {
            setDoa(found);
            const relatedDoa = json.data.filter(
              (item: Doa) => item.grup === found.grup && item.id !== found.id
            );
            setRelated(relatedDoa);
          }
        }
      } catch {}
      setLoading(false);
    };
    fetchDoaByName();
  }, [resolvedParams.slug]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!doa) return <div className="text-center py-8">Doa tidak ditemukan</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 flex items-center gap-2">
        <Link
          href="/doa"
          className="inline-flex items-center text-gray-600 hover:text-green-600 text-sm font-medium"
        >
          &#8592; Kembali ke Daftar Doa
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow border border-green-100 p-6">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-green-600 text-xl">&#128218;</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{doa.nama}</h1>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-green-100 text-green-700 px-4 py-2 rounded font-medium hover:bg-green-200 transition"
                onClick={() => navigator.clipboard.writeText(
                  `${doa.nama}\n${doa.ar}\n${doa.tr}\n${doa.idn || doa.tentang}`
                )}
              >
                Salin
              </button>
              <button
                type="button"
                className="bg-green-100 text-green-700 px-4 py-2 rounded font-medium hover:bg-green-200 transition"
                onClick={() => {
                  const url = typeof window !== "undefined" ? window.location.href : "";
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      `${doa.nama}\n${doa.ar}\n${doa.tr}\n${doa.idn || doa.tentang}\n${url}`
                    )}`,
                    "_blank"
                  );
                }}
              >
                Bagikan
              </button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs">{doa.grup}</span>
            {doa.tag?.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-2 text-gray-500 text-sm">{doa.tentang}</div>
        <div className="mt-6">
          <h2 className="text-green-700 font-semibold mb-2 text-lg">Teks Arab</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-2xl text-gray-900 leading-relaxed mb-6" dir="rtl">
            {doa.ar}
          </div>
          <h2 className="text-green-700 font-semibold mb-2 text-lg">Transliterasi</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-gray-700 italic mb-6">
            {doa.tr}
          </div>
          <h2 className="text-green-700 font-semibold mb-2 text-lg">Terjemahan</h2>
          <div className="bg-green-50 rounded-lg p-4 text-gray-800">
            {doa.idn}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Doa Lainnya dalam Kategori &quot;{doa.grup}&quot;
          </h3>
          <div
            className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#22c55e #f3f4f6"
            }}
          >
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/doa/${encodeURIComponent(item.nama.toLowerCase().replace(/\s+/g, "-"))}`}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-green-300 transition"
              >
                <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-green-600 text-lg">&#128218;</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-semibold text-gray-900">{item.nama}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}