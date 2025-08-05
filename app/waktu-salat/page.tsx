"use client"
import { useEffect, useState } from "react"

type City = {
  id: string
  lokasi: string
}

type JadwalSholat = {
  id: number
  lokasi: string
  daerah: string
  jadwal: {
    tanggal: string
    imsak: string
    subuh: string
    terbit: string
    dhuha: string
    dzuhur: string
    ashar: string
    maghrib: string
    isya: string
    date: string
  }
}

function getCurrentSholat(jadwal: JadwalSholat["jadwal"]) {
  const now = new Date()
  const [h, m] = [now.getHours(), now.getMinutes()]
  const nowMinutes = h * 60 + m

  const times = [
    { name: "imsak", time: jadwal.imsak },
    { name: "subuh", time: jadwal.subuh },
    { name: "terbit", time: jadwal.terbit },
    { name: "dhuha", time: jadwal.dhuha },
    { name: "dzuhur", time: jadwal.dzuhur },
    { name: "ashar", time: jadwal.ashar },
    { name: "maghrib", time: jadwal.maghrib },
    { name: "isya", time: jadwal.isya },
  ]

  let current = "imsak"
  for (let i = 0; i < times.length; i++) {
    const [th, tm] = times[i].time.split(":").map(Number)
    const tMinutes = th * 60 + tm
    if (nowMinutes >= tMinutes) {
      current = times[i].name
    }
  }
  return current
}

export default function QuranPage() {
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState("")
  const [jadwal, setJadwal] = useState<JadwalSholat | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("https://api.myquran.com/v2/sholat/kota/semua")
      .then((res) => res.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setCities(data.data)
        } else {
          setError("Gagal memuat daftar kota")
        }
      })
      .catch(() => setError("Gagal memuat daftar kota"))
  }, [])

  useEffect(() => {
    if (!selectedCity) return
    setLoading(true)
    setError("")
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const url = `https://api.myquran.com/v2/sholat/jadwal/${selectedCity}/${yyyy}/${mm}/${dd}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data && data.data.jadwal) {
          setJadwal(data.data)
        } else {
          setError("Gagal memuat jadwal sholat")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Gagal memuat jadwal sholat")
        setLoading(false)
      })
  }, [selectedCity])

  const currentSholat = jadwal ? getCurrentSholat(jadwal.jadwal) : ""

  return (
    <div className="min-h-screen w-full flex flex-col">
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
            <div className="mt-4 bg-gray-100 rounded-2xl px-2 py-4 sm:px-12 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1 sm:col-span-2">
                        <div className="max-w-md mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Jadwal Sholat</h2>
                {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="city" className="block mb-1 font-medium">Pilih Kota</label>
                    <select
                    id="city"
                    className="w-full p-2 border rounded"
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    >
                    <option value="">-- Pilih Kota --</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>{city.lokasi}</option>
                    ))}
                    </select>
                </div>
                {loading && <div>Memuat jadwal...</div>}
                {jadwal && !loading && (
                    <div className="bg-gray-100 p-4 rounded-xl shadow mt-4">
                    <div className="font-semibold mb-2">{jadwal.lokasi}</div>
                    <div className="text-xs text-gray-500 mb-2">{jadwal.daerah}</div>
                    <div className="space-y-1">
                        <div className="flex justify-between"><span>Tanggal</span><span>{jadwal.jadwal.tanggal}</span></div>
                        <div className={`flex justify-between ${currentSholat === "imsak" ? "bg-green-200 font-bold rounded" : ""}`}><span>Imsak</span><span>{jadwal.jadwal.imsak}</span></div>
                        <div className={`flex justify-between ${currentSholat === "subuh" ? "bg-green-200 font-bold rounded" : ""}`}><span>Subuh</span><span>{jadwal.jadwal.subuh}</span></div>
                        <div className={`flex justify-between ${currentSholat === "terbit" ? "bg-green-200 font-bold rounded" : ""}`}><span>Terbit</span><span>{jadwal.jadwal.terbit}</span></div>
                        <div className={`flex justify-between ${currentSholat === "dhuha" ? "bg-green-200 font-bold rounded" : ""}`}><span>Dhuha</span><span>{jadwal.jadwal.dhuha}</span></div>
                        <div className={`flex justify-between ${currentSholat === "dzuhur" ? "bg-green-200 font-bold rounded" : ""}`}><span>Dzuhur</span><span>{jadwal.jadwal.dzuhur}</span></div>
                        <div className={`flex justify-between ${currentSholat === "ashar" ? "bg-green-200 font-bold rounded" : ""}`}><span>Ashar</span><span>{jadwal.jadwal.ashar}</span></div>
                        <div className={`flex justify-between ${currentSholat === "maghrib" ? "bg-green-200 font-bold rounded" : ""}`}><span>Maghrib</span><span>{jadwal.jadwal.maghrib}</span></div>
                        <div className={`flex justify-between ${currentSholat === "isya" ? "bg-green-200 font-bold rounded" : ""}`}><span>Isya</span><span>{jadwal.jadwal.isya}</span></div>
                    </div>
                    </div>
                )}<br />
                </div>
            </div>
                    </div>
                </div>
            </div>
        </div>

  )
}
