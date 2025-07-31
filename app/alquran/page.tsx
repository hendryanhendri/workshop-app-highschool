export const dynamic = "force-dynamic";

interface Surat {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  arti: string;
}

export default async function AlQuran() {
  const res = await fetch("https://equran.id/api/surat", { cache: "no-store" });
  const data: Surat[] = await res.json();

  return (
    <>
      <div className="min-h-screen w-full flex flex-col">
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="mt-4 bg-gray-100 rounded-2xl px-2 py-4 sm:px-12 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.map((surat: Surat) => (
                <div
                  key={surat.nomor}
                  className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 transition-colors cursor-pointer hover:bg-green-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-green-50 border border-green-200">
                      <span className="text-green-700 font-bold text-lg">{surat.nomor}</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-gray-800">{surat.nama}</span>
                      <span className="block text-green-700 font-semibold text-base">{surat.nama_latin}</span>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 text-sm text-gray-600">
                    <span>Jumlah Ayat: <span className="font-bold text-green-700">{surat.jumlah_ayat}</span></span>
                    <span>Arti: <span className="font-bold text-green-700">{surat.arti}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
