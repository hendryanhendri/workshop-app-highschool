import Image from "next/image";

export default function AlQuran() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="mt-4 bg-gray-100 rounded-2xl px-2 py-4 sm:px-12 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center transition-colors cursor-pointer hover:bg-green-100">
              <div className="flex-shrink-0">
                <Image src="/alquran.svg" alt="Al-Quran Logo" width={60} height={60} />
              </div>
              <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                <h2 className="text-lg font-bold text-green-700">Welcome to Alquran App</h2>
                <p className="text-base text-gray-700">Explore the Quran, prayer times, and more.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center transition-colors cursor-pointer hover:bg-green-100">
              <div className="flex-shrink-0">
                <Image src="/alquran.svg" alt="Al-Quran Logo" width={60} height={60} />
              </div>
              <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                <h2 className="text-lg font-bold text-green-700">Welcome to Alquran App</h2>
                <p className="text-base text-gray-700">Explore the Quran, prayer times, and more.</p>
              </div>
            </div>
            {/* Tambahkan card lain di sini untuk list berikutnya */}
          </div>
        </div>
      </div>
    </div>
  );
}
