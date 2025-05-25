import { useEffect, useState } from "react";

export default function ThresholdEditor() {
    const [thresholds, setThresholds] = useState({});
    const [statusMap, setStatusMap] = useState({});
    const [editingKey, setEditingKey] = useState(null);
    const [editValues, setEditValues] = useState([]);
    const [editingMac, setEditingMac] = useState(null);
    const [loading, setLoading] = useState(true);

    // Pobierz thresholds i status (dla mapy ID → MAC)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [thresholdRes, statusRes] = await Promise.all([
                    fetch("/api/thresholds"),
                    fetch("/api/status"),
                ]);

                const thresholdsData = await thresholdRes.json();
                const statusData = await statusRes.json();

                const idToMac = {};
                Object.entries(statusData).forEach(([mac, obj]) => {
                    if (obj.id !== undefined) {
                        idToMac[obj.id] = mac;
                    }
                });

                setThresholds(thresholdsData);
                setStatusMap(idToMac);
                setLoading(false);
            } catch (err) {
                console.error("Błąd pobierania danych:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async (key) => {
        setEditingKey(key);
        const [devicePart, pinPart] = key.split("_pin_");
        const numericId = parseInt(devicePart.split("_")[1], 10);
        const mac = statusMap[numericId];

        if (!mac) {
            console.error("Nie znaleziono MAC dla ID:", numericId);
            return;
        }

        setEditingMac(mac);

        try {
            const res = await fetch(`/api/thresholds/${mac}/${pinPart}`);
            const data = await res.json();

            if (!Array.isArray(data.thresholds)) {
                console.error("Niepoprawne dane progów:", data);
                return;
            }

            setEditValues(data.thresholds);
        } catch (err) {
            console.error("Błąd podczas pobierania progów:", err);
        }
    };

    const handleDelete = async (key) => {
        if (!window.confirm(`Na pewno usunąć progi dla ${key}?`)) return;
        console.log(key)
        const res = await fetch(`/api/thresholds/${key}`, {
            method: "DELETE"
        });

        if (res.ok) {
            const updated = { ...thresholds };
            delete updated[key];
            setThresholds(updated);
        } else {
            const err = await res.json();
            alert("Błąd: " + (err.error || "Nieznany"));
        }
    };


    const handleSave = async () => {
        const pin = editingKey.split("_pin_")[1];

        await fetch(`/api/thresholds/${editingMac}/${pin}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editValues),
        });

        const updated = { ...thresholds };
        updated[editingKey] = editValues;
        setThresholds(updated);
        setEditingKey(null);
        setEditingMac(null);
    };

    const handleInputChange = (index, field, value) => {
        const updated = [...editValues];
        updated[index][field] = field === 2 ? value : Number(value);
        setEditValues(updated);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Edycja progów wilgotności</h2>
            <table className="w-full table-auto border">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Sensor</th>
                    <th className="border px-4 py-2">Progi</th>
                    <th className="border px-4 py-2">Akcja</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(thresholds).map(([key, values]) => (
                    <tr key={key} className="bg-gray-50 text-center">
                        <td className="border px-4 py-2 font-mono">{key}</td>
                        <td className="border px-4 py-2 text-sm">
                            {(values || []).map(([min, max, label], i) => (
                                <div key={i}>{min} - {max} ({label})</div>
                            ))}
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleEdit(key)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Edytuj
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingKey && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl w-full max-w-xl">
                        <h3 className="text-xl font-bold mb-4">Edytuj: {editingKey}</h3>
                        <table className="w-full mb-4 text-sm">
                            <thead>
                            <tr>
                                <th className="text-left">Min</th>
                                <th className="text-left">Max</th>
                                <th className="text-left">Etykieta</th>
                            </tr>
                            </thead>
                            <tbody>
                            {editValues.map(([min, max, label], index) => (
                                <tr key={index}>
                                    <td><input type="number" value={min}
                                               onChange={(e) => handleInputChange(index, 0, e.target.value)}
                                               className="border p-1 w-full"/></td>
                                    <td><input type="number" value={max}
                                               onChange={(e) => handleInputChange(index, 1, e.target.value)}
                                               className="border p-1 w-full"/></td>
                                    <td><input type="text" value={label}
                                               onChange={(e) => handleInputChange(index, 2, e.target.value)}
                                               className="border p-1 w-full"/></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setEditingKey(null);
                                    setEditingMac(null);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Zapisz
                            </button>
                            <button
                                onClick={() => handleDelete(editingKey)}
                                className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Usuń
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
