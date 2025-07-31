import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  return (
    <nav className="flex justify-center mt-8">
      <div className="flex flex-row justify-between gap-2 sm:gap-8 bg-gray-100 rounded-2xl px-2 py-4 sm:px-12 sm:py-8 shadow-sm w-full max-w-xs sm:max-w-3xl">
        <Link href="/alquran" className="flex flex-col items-center group flex-1 min-w-0">
          <span className="rounded-full bg-white p-2 mb-2 flex items-center justify-center">
            <Image src="/alquran.svg" alt="Al-Quran" width={48} height={48} />
          </span>
          <span className="font-bold text-neutral-900 group-hover:text-green-700 transition-colors text-xs sm:text-base text-center">Al-Quran</span>
        </Link>
        <Link href="/waktu-salat" className="flex flex-col items-center group flex-1 min-w-0">
          <span className="rounded-full bg-white p-2 mb-2 flex items-center justify-center">
            <Image src="/time.svg" alt="Waktu Salat" width={48} height={48} />
          </span>
          <span className="font-bold text-neutral-900 group-hover:text-green-700 transition-colors text-xs sm:text-base text-center">Waktu Salat</span>
        </Link>
        <Link href="/ayat" className="flex flex-col items-center group flex-1 min-w-0">
          <span className="rounded-full bg-white p-2 mb-2 flex items-center justify-center">
            <Image src="/ayat.svg" alt="Ayat" width={48} height={48} />
          </span>
          <span className="font-bold text-neutral-900 group-hover:text-green-700 transition-colors text-xs sm:text-base text-center">Ayat</span>
        </Link>
        <Link href="/wirid" className="flex flex-col items-center group flex-1 min-w-0">
          <span className="rounded-full bg-white p-2 mb-2 flex items-center justify-center">
            <Image src="/doa.svg" alt="Wirid & Doa" width={48} height={48} />
          </span>
          <span className="font-bold text-neutral-900 group-hover:text-green-700 transition-colors text-xs sm:text-base text-center">Wirid & Doa</span>
        </Link>
      </div>
    </nav>
  );
}