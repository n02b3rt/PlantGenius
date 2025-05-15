import { useEffect, useState } from "react";
import AddDeviceForm from "./AddDeviceForm";

export default function DeviceList() {
    const [devices, setDevices] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null); // do zaznaczenia
    const [showConfirm, setShowConfirm] = useState(false); // popup

    const fetchDevices = () => {
        fetch("/api/status")
            .then((res) => res.json())
            .then((data) => setDevices(data))
            .catch((err) => console.error("Błąd API (DeviceList):", err));
    };

    useEffect(() => {
        fetchDevices();
        const interval = setInterval(fetchDevices, 20000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/devices/${selectedDevice}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Urządzenie usunięte");
                setSelectedDevice(null);
                setShowConfirm(false);
                fetchDevices();
            } else {
                const err = await res.json();
                alert("Błąd usuwania: " + err.error);
            }
        } catch (e) {
            console.error("Błąd DELETE:", e);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowForm(true)}
                className="absolute bottom-[200px] right-0 m-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg"
                title="Dodaj urządzenie"
            >
                ＋
            </button>

            {showForm && <AddDeviceForm onClose={() => setShowForm(false)} />}

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Potwierdź usunięcie</h2>
                        <p>Czy na pewno chcesz usunąć urządzenie <span className="font-mono">{selectedDevice}</span>?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Usuń
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-12">
                {Object.entries(devices).map(([mac, { alias, last_seen, status }]) => (
                    <div
                        key={mac}
                        className={`bg-white p-4 rounded shadow border-l-4 cursor-pointer ${
                            selectedDevice === mac ? "border-red-400" : "border-green-400"
                        }`}
                        onClick={() => setSelectedDevice(selectedDevice === mac ? null : mac)}
                    >
                        <h3 className="font-bold text-lg">{alias}</h3>
                        <p className="text-sm text-gray-600">MAC: {mac}</p>
                        <p className="text-sm">
                            Status:{" "}
                            <span className={status === "online" ? "text-green-600" : "text-red-600"}>
                                {status}
                            </span>
                        </p>
                        <p className="text-sm">Ostatnio widziany: {last_seen ?? "Brak danych"}</p>

                        {selectedDevice === mac && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowConfirm(true);
                                }}
                                className="mt-4 bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                                Usuń
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
