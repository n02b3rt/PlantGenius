// components/AddDeviceForm.jsx
import { useState } from "react";

export default function AddDeviceForm({ onClose }) {
    const [deviceId, setDeviceId] = useState("");
    const [alias, setAlias] = useState("");
    const [pins, setPins] = useState([]);
    const [interval, setInterval] = useState(20);

    const handleAddPin = () => {
        setPins([...pins, { pin: "", name: "", type: "analog", DRY_VALUE: 50000, WET_VALUE: 10000 }]);
    };

    const handlePinChange = (index, field, value) => {
        const newPins = [...pins];
        newPins[index][field] = field === "pin" ? parseInt(value) : value;
        setPins(newPins);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pinConfig = {};
        for (const { pin, name, DRY_VALUE, WET_VALUE } of pins) {
            if (![26, 27, 28].includes(pin)) continue;
            pinConfig[pin] = {
                type: "analog",
                name,
                DRY_VALUE: parseInt(DRY_VALUE),
                WET_VALUE: parseInt(WET_VALUE)
            };
        }

        const payload = {
            device_id: deviceId,
            alias,
            pins: pinConfig,
            interval: parseInt(interval)
        };

        try {
            const res = await fetch("/api/devices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Urządzenie dodane pomyślnie!");
                onClose();
            } else {
                const error = await res.json();
                alert("Błąd: " + error.error);
            }
        } catch (err) {
            console.error("Błąd dodawania urządzenia:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Dodaj urządzenie</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="MAC urządzenia" className="border p-2 rounded" required />
                    <input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Alias" className="border p-2 rounded" required />
                    <input type="number" value={interval} onChange={(e) => setInterval(e.target.value)} placeholder="Interwał (sekundy)" className="border p-2 rounded" />

                    <h3 className="font-semibold">Czujniki (piny 26–28)</h3>
                    {pins.map((pin, index) => (
                        <div key={index} className="border p-2 rounded flex flex-col gap-2">
                            <input type="number" placeholder="Pin (26-28)" value={pin.pin} onChange={(e) => handlePinChange(index, "pin", e.target.value)} className="border p-1 rounded" />
                            <input type="text" placeholder="Nazwa" value={pin.name} onChange={(e) => handlePinChange(index, "name", e.target.value)} className="border p-1 rounded" />
                            <input type="number" placeholder="DRY_VALUE" value={pin.DRY_VALUE} onChange={(e) => handlePinChange(index, "DRY_VALUE", e.target.value)} className="border p-1 rounded" />
                            <input type="number" placeholder="WET_VALUE" value={pin.WET_VALUE} onChange={(e) => handlePinChange(index, "WET_VALUE", e.target.value)} className="border p-1 rounded" />
                        </div>
                    ))}

                    <button type="button" onClick={handleAddPin} className="bg-gray-200 rounded p-2 text-sm">➕ Dodaj pin</button>
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose} className="bg-red-400 text-white px-4 py-2 rounded">Anuluj</button>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Zapisz</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
