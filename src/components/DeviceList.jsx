// components/DeviceList.jsx
import { useEffect, useState } from "react";

export default function DeviceList() {
    const [devices, setDevices] = useState({});

    useEffect(() => {
        const fetchDevices = () => {
            fetch("/api/status")
                .then((res) => res.json())
                .then((data) => setDevices(data))
                .catch((err) => console.error("Błąd API (DeviceList):", err));
        };

        fetchDevices();
        const interval = setInterval(fetchDevices, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(devices).map(([mac, { alias, last_seen, status }]) => (
                <div key={mac} className="bg-white p-4 rounded shadow border-l-4
                    border-green-400">
                    <h3 className="font-bold text-lg">{alias}</h3>
                    <p className="text-sm text-gray-600">MAC: {mac}</p>
                    <p className="text-sm">Status: <span className={status === "online" ? "text-green-600" : "text-red-600"}>{status}</span></p>
                    <p className="text-sm">Ostatnio widziany: {last_seen ?? "Brak danych"}</p>
                </div>
            ))}
        </div>
    );
}
