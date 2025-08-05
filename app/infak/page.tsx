"use client";

import { useState } from "react";

declare global {
	interface Window {
		snap?: {
			pay: (token: string) => void;
		};
	}
}

const infakOptions = [
	{ label: "Infak Pendidikan", amount: 50000 },
	{ label: "Infak Masjid", amount: 100000 },
	{ label: "Infak Sosial", amount: 200000 },
];

export default function Infak() {
	const [selected, setSelected] = useState<number | null>(null);
	const [customAmount, setCustomAmount] = useState<{ [key: number]: number }>({});
	const [loading, setLoading] = useState(false);

	const handleAmountChange = (idx: number, value: string) => {
		const val = Number(value.replace(/[^0-9]/g, ""));
		setCustomAmount((prev) => ({ ...prev, [idx]: val }));
		setSelected(val > 0 ? val : infakOptions[idx].amount);
	};

	const handleSelect = (idx: number) => {
		setSelected(customAmount[idx] && customAmount[idx] > 0 ? customAmount[idx] : infakOptions[idx].amount);
	};

	const handlePayment = async () => {
		if (!selected || selected < 1000) return;
		setLoading(true);
		try {
			const res = await fetch("/api/midtrans", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount: selected }),
			});
			const { redirect_url } = await res.json();
			if (redirect_url) {
				window.open(redirect_url, "_blank", "noopener,noreferrer");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="min-h-screen w-full flex flex-col">
				<div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
					<div className="mt-4 bg-gray-100 rounded-2xl px-2 py-4 sm:px-12 sm:py-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="col-span-1 sm:col-span-2">
								<div className="max-w-md mx-auto p-4">
									<h1 className="text-xl font-bold mb-4">Pilih Infak</h1>
									<ul className="mb-6">
										{infakOptions.map((opt, idx) => (
											<li key={opt.amount} className="mb-2">
												<button
													type="button"
													className={`w-full text-left px-4 py-2 rounded border ${
														selected === (customAmount[idx] && customAmount[idx] > 0 ? customAmount[idx] : opt.amount)
															? "bg-green-100 border-green-400"
															: "bg-white border-gray-300"
													}`}
													onClick={() => handleSelect(idx)}
													aria-pressed={selected === (customAmount[idx] && customAmount[idx] > 0 ? customAmount[idx] : opt.amount)}
												>
													{opt.label} - Rp{(customAmount[idx] && customAmount[idx] > 0 ? customAmount[idx] : opt.amount).toLocaleString()}
												</button>
												<input
													type="number"
													min={1000}
													className="mt-2 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200"
													placeholder={`Ubah nominal ${opt.label}`}
													value={customAmount[idx] ?? ""}
													onChange={(e) => handleAmountChange(idx, e.target.value)}
													aria-label={`Nominal ${opt.label}`}
												/>
											</li>
										))}
									</ul>
									<button
										type="button"
										className="bg-green-600 text-white px-4 py-2 rounded w-full"
										disabled={selected === null || selected < 1000 || loading}
										onClick={handlePayment}
									>
										{loading ? "Memproses..." : "Proses Pembayaran"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}