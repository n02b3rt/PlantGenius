import { useEffect, useState } from "react";
import SensorCard from "./Card/SensorCard";

export default function SensorGrid() {
    const [sensors, setSensors] = useState({});

    useEffect(() => {
        const fetchData = () => {
            console.log("[DEBUG] Wysyłam zapytanie do /api/sensors/status");
            fetch("/api/sensors/status")
                .then((res) => {
                    console.log("[DEBUG] Odpowiedź status:", res.status);
                    return res.json();
                })
                .then((data) => {
                    console.log("[DEBUG] Odebrane dane:", data);
                    setSensors(data);
                })
                .catch((err) => console.error("❌ Błąd API:", err));
        };

        fetchData();
        const interval = setInterval(fetchData, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(sensors).map(([key, data]) => {
                const [device, pin] = key.split("_pin_");
                return (
                    <SensorCard
                        key={key}
                        device={device}
                        pin={`pin_${pin}`}
                        raw={data.raw}
                        state={data.state}
                    />
                );
            })}
        </div>
    );
}
