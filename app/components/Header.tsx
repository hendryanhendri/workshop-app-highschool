import { FiSearch, FiSun } from "react-icons/fi";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header top-0 text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
      <div className="navigation relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
        <div className="container max-w-2xl mx-auto">
          <div className="flex justify-between items-center h-16 md:h-24">
            <div className="lg:flex-1 flex items-center">
              <Link href="/" className="ml-2 text-lg font-semibold text-green-600" tabIndex={0} aria-label="Go to home">
                Alquran App
              </Link>
            </div>

            <div className="flex-1 flex space-x-1 items-center justify-end text-slate-700 dark:text-slate-100">
              <button className="rounded-full bg-green-50 p-2 hover:bg-green-100 transition-colors" aria-label="Search">
                <FiSearch className="text-green-600 text-xl" />
              </button>
              <button className="rounded-full bg-green-50 p-2 hover:bg-green-100 transition-colors" aria-label="Theme">
                <FiSun className="text-green-600 text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
