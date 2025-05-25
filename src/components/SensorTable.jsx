import { useEffect, useState } from "react";

export default function SensorTable() {
    const [readings, setReadings] = useState({});
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [readingsRes, statusRes] = await Promise.all([
                    fetch("/api/latest-readings"),
                    fetch("/api/status")
                ]);

                const readingsData = await readingsRes.json();
                const statusData = await statusRes.json();

                setReadings(readingsData);
                setStatus(statusData);
            } catch (err) {
                console.error("❌ Błąd pobierania danych:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
        const interval = setInterval(fetchAll, 20000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <p>Ładowanie danych...</p>;
    }

    // mapujemy ID → status (online/offline)
    const idStatusMap = {};
    Object.values(status).forEach(info => {
        if (info.id !== undefined) {
            idStatusMap[info.id] = info.status;
        }
    });

    const sensorEntries = Object.entries(readings)
        .filter(([key]) => key.startsWith("pico_") && key.includes("_pin_"))
        .filter(([, value]) => idStatusMap[value.id] === "online");

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-md shadow">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Alias</th>
                    <th className="px-4 py-2 border">Pin</th>
                    <th className="px-4 py-2 border">Raw Value</th>
                    <th className="px-4 py-2 border">Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {sensorEntries.map(([key, data]) => {
                    const pin = key.split("_pin_")[1];
                    return (
                        <tr key={key} className="bg-gray-50 hover:bg-gray-100">
                            <td className="px-4 py-2 border text-center">{data.id}</td>
                            <td className="px-4 py-2 border text-center">{data.alias}</td>
                            <td className="px-4 py-2 border text-center">{pin}</td>
                            <td className="px-4 py-2 border text-center">{data.value}</td>
                            <td className="px-4 py-2 border text-center text-sm">{data.timestamp}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
