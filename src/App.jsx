import { useState } from "react";
import SensorGrid from "./components/SensorGrid";
import Sidebar from "./components/Sidebar/Sidebar";
import StatusBar from "./components/StatusBar";
import Header from "./components/Header";
import DeviceList from "./components/DeviceList";

export default function App() {
    const [view, setView] = useState("sensors"); // "sensors" lub "devices"

    return (
        <div className="h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-200">
            <Header onViewChange={setView} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        {view === "sensors" ? <SensorGrid /> : <DeviceList />}
                    </div>
                    <div className="flex-shrink-0">
                        <StatusBar />
                    </div>
                </div>
            </div>
        </div>
    );
}
