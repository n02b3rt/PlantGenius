import { useEffect, useState } from "react";

export default function AddThresholdForm() {
    const [mac, setMac] = useState("");
    const [devices, setDevices] = useState([]);
    const [pin, setPin] = useState("");
    const [thresholds, setThresholds] = useState([
        [0, 20000, "Bardzo mokro"],
        [20000, 30000, "Wilgotno (OK)"],
        [30000, 40000, "Sucho"],
        [40000, 99999, "Bardzo sucho"]
    ]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch("/api/status")
            .then(res => res.json())
            .then(data => {
                const list = Object.entries(data).map(([mac, info]) => ({
                    mac,
                    alias: info.alias || mac
                }));
                setDevices(list);
            })
            .catch(err => console.error("Błąd ładowania urządzeń:", err));
    }, []);

    const handleThresholdChange = (index, field, value) => {
        const newThresholds = [...thresholds];
        newThresholds[index][field] = field === 2 ? value : Number(value);
        setThresholds(newThresholds);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/thresholds/${mac}/${pin}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(thresholds)
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("✅ Progi zapisane poprawnie.");
            } else {
                setMessage("❌ Błąd: " + (data?.error || "Nieznany problem"));
            }
        } catch (err) {
            setMessage("❌ Błąd połączenia z API.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Dodaj progi wilgotności</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                    value={mac}
                    onChange={(e) => setMac(e.target.value)}
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Wybierz urządzenie (MAC)</option>
                    {devices.map((device) => (
                        <option key={device.mac} value={device.mac}>
                            {device.alias} ({device.mac})
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Pin (np. 26)"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <table className="text-sm w-full">
                    <thead>
                    <tr>
                        <th className="text-left">Min</th>
                        <th className="text-left">Max</th>
                        <th className="text-left">Opis</th>
                    </tr>
                    </thead>
                    <tbody>
                    {thresholds.map(([min, max, label], i) => (
                        <tr key={i}>
                            <td>
                                <input
                                    type="number"
                                    value={min}
                                    onChange={(e) => handleThresholdChange(i, 0, e.target.value)}
                                    className="border p-1 w-full"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={max}
                                    onChange={(e) => handleThresholdChange(i, 1, e.target.value)}
                                    className="border p-1 w-full"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => handleThresholdChange(i, 2, e.target.value)}
                                    className="border p-1 w-full"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Zapisz
                </button>
                {message && <p className="text-center mt-2">{message}</p>}
            </form>
        </div>
    );
}
