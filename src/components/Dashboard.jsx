import SensorCard from "./Card/SensorCard";

export default function Dashboard() {
    const sensors = [
        { name: "Bazylia", percent: 98, value: 20302 },
        { name: "Rukola", percent: 98, value: 20302 },
        { name: "Szczypiorek", percent: 98, value: 20302 },
        { name: "Mięta", percent: 98, value: 20302 },
        { name: "Rzodkiewka", percent: 98, value: 20302 },
    ];


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sensors.map((sensor, idx) => (
                <SensorCard key={idx} {...sensor} />
            ))}
        </div>
    );
}