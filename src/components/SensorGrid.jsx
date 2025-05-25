import { useEffect, useState } from "react";
import SensorCard from "./Card/SensorCard";
import SensorChart from "./SensorChart";

export default function SensorGrid() {
    const [sensors, setSensors] = useState({});
    const [deviceStatus, setDeviceStatus] = useState({});
    const [selectedSensor, setSelectedSensor] = useState(null);

    useEffect(() => {
        const fetchStatus = () => {
            fetch("/api/status")
                .then(res => res.json())
                .then(data => setDeviceStatus(data))
                .catch(err => console.error("❌ Błąd API /status:", err));
        };

        const fetchSensors = () => {
            fetch("/api/sensors/status")
                .then(res => res.json())
                .then(data => setSensors(data))
                .catch(err => console.error("❌ Błąd API /sensors/status:", err));
        };

        fetchStatus();
        console.log(fetchStatus())
        fetchSensors();
        console.log(fetchSensors());
        const interval = setInterval(() => {
            fetchStatus();
            fetchSensors();
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    if (selectedSensor) {
        return (
            <SensorChart
                sensorId={selectedSensor}
                onBack={() => setSelectedSensor(null)}
            />
        );
    }

    const idStatusMap = {};
    const idAliasMap = {};

    Object.entries(deviceStatus).forEach(([mac, info]) => {
        if (info.id !== undefined) {
            idStatusMap[info.id] = info.status;
            idAliasMap[info.id] = info.alias ?? mac;
        }
    });

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(sensors).map(([key, data]) => {
                const isOnline = idStatusMap[data.id] === "online";
                if (!isOnline) return null;

                const [device, pin] = key.split("_pin_");
                const deviceName = idAliasMap[data.id] ?? device;

                return (
                    <SensorCard
                        key={key}
                        device={deviceName} // 👈 alias jako nazwa urządzenia
                        pin={`pin_${pin}`}
                        raw={data.raw}
                        state={data.state}
                        onClick={() => setSelectedSensor(key)}
                    />
                );
            })}
        </div>
    );
}
