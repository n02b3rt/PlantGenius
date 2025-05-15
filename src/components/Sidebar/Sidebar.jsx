import { useEffect, useState } from "react";
import { ReactComponent as TempIcon } from "./device_thermostat.svg";
import { ReactComponent as HumIcon } from "./humidity_indoor.svg";
import { ReactComponent as LightIcon } from "./sunny.svg";


export default function Sidebar() {
    const [temp, setTemp] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [lux, setLux] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            console.log("[DEBUG] Fetching /api/sensors/status...");
            fetch("/api/latest-readings")
                .then((res) => {
                    console.log("[DEBUG] Response status:", res.status);
                    return res.json();
                })
                .then((data) => {
                    console.log("[DEBUG] Received data:", data);
                    if (data.temp?.value) {
                        console.log("[DEBUG] Temperature:", data.temp.value.temperature);
                        console.log("[DEBUG] Humidity:", data.temp.value.humidity);
                        setTemp(data.temp.value.temperature);
                        setHumidity(data.temp.value.humidity);
                    } else {
                        console.warn("[WARN] Brak danych temp");
                    }

                    if (data.lux_sensor?.value) {
                        console.log("[DEBUG] Lux:", data.lux_sensor.value.lux);
                        setLux(data.lux_sensor.value.lux);
                    } else {
                        console.warn("[WARN] Brak danych lux_sensor");
                    }
                })
                .catch((err) => console.error("[ERROR] Błąd API (Sidebar):", err));
        };

        fetchData();
        const interval = setInterval(fetchData, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <aside className="w-64 bg-green-600 text-white p-4 flex flex-col gap-6 flex-shrink-0">
            <h2 className="text-md font-semibold">Dane środowiskowe</h2>
            <div className="bg-white text-green-800 rounded p-4 shadow">
                <div className="text-center">
                    <TempIcon className="w-20 h-20 text-blue-500 fill-stone-500 mb-2 mx-auto" />
                    <p className="text-xl">Temperatura</p>
                    <p className="text-[18px]">{temp ?? "--"}°C</p>
                </div>
            </div>
            <div className="bg-white text-green-800 rounded p-4 shadow">
                <div className="text-center">
                    <HumIcon className="w-20 h-20 text-blue-500 fill-stone-500 mb-2 mx-auto" />
                    <p className="text-xl">Wilgotność</p>
                    <p className="text-[18px]">{humidity ?? "--"}%</p>
                </div>
            </div>
            <div className="bg-white text-green-800 rounded p-4 shadow">
                <div className="text-center">
                    <LightIcon className="w-20 h-20 text-blue-500 fill-stone-500 mb-2 mx-auto" />
                    <p className="text-xl">Natężenie światła</p>
                    <p className="text-[18px]">
                        {lux !== null ? lux.toFixed(2) : "--"} lux
                    </p>
                </div>
            </div>

        </aside>
    );
}
