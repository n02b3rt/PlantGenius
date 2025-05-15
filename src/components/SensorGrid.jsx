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
        fetchSensors();
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
    const aliasStatusMap = {};
    Object.entries(deviceStatus).forEach(([mac, info]) => {
        if (info.alias) {
            aliasStatusMap[`pico_${info.alias.toLowerCase().replace("pico", "")}`] = info.status;
        }
    });

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(sensors).map(([key, data]) => {
                const [device, pin] = key.split("_pin_");
                const deviceAlias = device.toLowerCase();
                const isOnline = aliasStatusMap[deviceAlias] === "online";

                console.log(`[DEBUG] ${deviceAlias} is ${aliasStatusMap[deviceAlias]}`);

                if (!isOnline) return null;

                return (
                    <SensorCard
                        key={key}
                        device={device}
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
