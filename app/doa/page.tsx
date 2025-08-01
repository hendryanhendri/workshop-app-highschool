"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function Doa() {
  interface Doa {
    id: number;
    grup: string;
    nama: string;
    ar: string;
    tr: string;
    tentang: string;
    tag: string[];
  }

  const [search, setSearch] = useState("");
  const [data, setData] = useState<Doa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useState(() => {
    fetch("https://equran.id/api/doa", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json.data)) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  });

  const allGroups = useMemo(() => {
    const set = new Set<string>();
    data.forEach((doa) => {
      if (typeof doa.grup === "string") set.add(doa.grup);
    });
    return Array.from(set).sort();
  }, [data]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    data.forEach((doa) => {
      doa.tag.forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort();
  }, [data]);

  const filteredData = useMemo(() => {
    let filtered = data;
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (doa) =>
          doa.nama.toLowerCase().includes(s) ||
          doa.tentang.toLowerCase().includes(s) ||
          doa.grup.toLowerCase().includes(s) ||
          doa.tag.some((tag) => tag.toLowerCase().includes(s))
      );
    }
    if (selectedGroup) {
      filtered = filtered.filter((doa) => doa.grup === selectedGroup);
    }
    if (selectedTag) {
      filtered = filtered.filter((doa) => doa.tag.includes(selectedTag));
    }
    return filtered;
  }, [search, data, selectedGroup, selectedTag]);

  const grouped = useMemo(() => {
    const result: Record<string, Doa[]> = {};
    filteredData.forEach((doa) => {
      const group = typeof doa.grup === "string" ? doa.grup : "Lainnya";
      if (!result[group]) result[group] = [];
      result[group].push(doa);
    });
    return result;
  }, [filteredData]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <style>{`
        .doa-hover:hover {
          background-color: #e3faeb;
          transition: background 0.2s;
        }
      `}</style>
      <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="mb-6">
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Cari doa berdasarkan nama, grup, atau tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari doa"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center">
            <select
              className="w-full sm:w-auto rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              aria-label="Filter berdasarkan kategori"
            >
              <option value="">Semua Kategori</option>
              {allGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <select
              className="w-full sm:w-auto rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              aria-label="Filter berdasarkan tag"
            >
              <option value="">Semua Tag</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Menampilkan {filteredData.length} dari {data.length} doa
          </div>
        </div>
        <div className="mt-4 bg-gray-100 rounded-2xl px-2 py-4 sm:px-12 sm:py-8">
          {loading ? (
            <div className="text-center text-gray-500">Memuat data...</div>
          ) : (
            <div className="flex flex-col gap-6">
              {Object.entries(grouped).length === 0 && (
                <div className="text-center text-gray-500">Tidak ditemukan.</div>
              )}
              {Object.entries(grouped).map(([group, doas]) => (
                <div key={group} className="bg-white rounded-lg shadow">
                  <div className="rounded-t-lg px-4 py-3 bg-blue-50">
                    <h2 className="font-bold text-xl text-green-700">{group}</h2>
                  </div>
                  <div className="divide-y divide-gray-200 px-4 py-4">
                    {doas.map((doa) => {
                      const slug = encodeURIComponent(
                        doa.nama.replace(/\s+/g, "-").toLowerCase()
                      );
                      return (
                        <Link
                          key={doa.id}
                          href={`/doa/${slug}`}
                          className="block py-3 doa-hover cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                          tabIndex={0}
                          aria-label={`Lihat detail doa ${doa.nama}`}
                          prefetch={false}
                        >
                          <div className="flex items-center gap-2">
                            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="text-green-600 text-lg">&#128218;</span>
                            </div>
                            <span className="font-medium">{doa.nama}</span>
                            {doa.tag && doa.tag.length > 0 && (
                              <nav aria-label="breadcrumb" className="flex flex-wrap gap-1 ml-3">
                                {doa.tag.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs bg-gray-200 text-gray-700 rounded px-2 py-0.5"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </nav>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}