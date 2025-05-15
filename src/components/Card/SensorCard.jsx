// SensorCard.jsx
import { ReactComponent as WaterIcon } from "./potted_plant.svg";

export default function SensorCard({ device, pin, raw, state, onClick }) {
    const stateStyle = {
        "Bardzo mokro": "bg-blue-100 text-blue-800",
        "Wilgotno (OK)": "bg-green-100 text-green-800",
        "Sucho": "bg-yellow-100 text-yellow-800",
        "Bardzo sucho": "bg-red-100 text-red-800",
    };

    const style = stateStyle[state] || "bg-gray-100 text-gray-800";

    return (
        <div
            className={`p-4 rounded-xl shadow cursor-pointer hover:scale-[1.02] transition ${style}`}
            onClick={onClick}
        >
            <WaterIcon className="w-20 h-20 text-blue-500 mb-2 mx-auto" />
            <h2 className="text-lg font-semibold">{device.toUpperCase()}</h2>
            <p className="text-sm text-gray-600">Czujnik: {pin}</p>
            <p className="text-sm">
                Raw: <span className="font-mono">{raw}</span>
            </p>
            <p className="text-base font-bold mt-2">{state}</p>
        </div>
    );
}
