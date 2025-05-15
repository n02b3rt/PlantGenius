import { useEffect, useState } from "react";

export default function StatusBar() {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        const fetchStatusData = async () => {
            try {
                const [sensorRes, latestRes] = await Promise.all([
                    fetch("/api/sensors/status"),
                    fetch("/api/latest-readings")
                ]);

                const sensorData = await sensorRes.json();
                const latestData = await latestRes.json();
                const newActions = [];

                Object.entries(sensorData).forEach(([key, val]) => {
                    if (val.state === "Sucho" || val.state === "Bardzo sucho") {
                        newActions.push(`Podlej roślinę: ${key.toUpperCase()}`);
                    }
                });

                if (latestData?.lux_sensor?.value?.lux < 150) {
                    newActions.push("Światło powinno być włączone");
                }

                if (latestData?.temp?.value?.temperature < 18.5) {
                    newActions.push("Temperatura za niska – podejmij działanie");
                }

                setActions(newActions);
            } catch (err) {
                console.error("[StatusBar] Błąd pobierania danych:", err);
            }
        };

        fetchStatusData();
        const interval = setInterval(fetchStatusData, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-plantgreen text-white p-4">
            <h3 className="font-semibold mb-2">Potrzebne działania:</h3>
            <ul className="list-disc pl-6">
                {actions.length > 0 ? (
                    actions.map((action, idx) => <li key={idx}>{action}</li>)
                ) : (
                    <li>Brak wymaganych działań</li>
                )}
            </ul>
        </footer>
    );
}
