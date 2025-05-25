import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function SensorChart({ sensorId, onBack }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/api/summary/${sensorId}/history`)
            .then((res) => res.json())
            .then((data) => {
                const clean = data.filter(
                    (item) =>
                        typeof item.raw === "number" &&
                        !isNaN(item.raw) &&
                        typeof item.timestamp === "string" &&
                        typeof item.state === "string" &&
                        item.state.trim() !== ""
                );
                setData(clean);
            })
            .catch((err) => console.error("Błąd pobierania wykresu:", err));
    }, [sensorId]);


    return (
        <div className="bg-white rounded p-6 shadow w-full">
            <button
                onClick={onBack}
                className="text-xl mb-4"
            >
                ← Wróć do czujników
            </button>
            <h2 className="text-xl font-bold mb-4">Historia: {sensorId}</h2>

            {data.length === 0 ? (
                <p>Brak danych do wyświetlenia</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="raw"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
