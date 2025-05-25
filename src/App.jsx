import { useState } from "react";
import SensorGrid from "./components/SensorGrid";
import SensorTable from "./components/SensorTable"; // ⬅️ dodaj to
import Sidebar from "./components/Sidebar/Sidebar";
import StatusBar from "./components/StatusBar";
import Header from "./components/Header";
import DeviceList from "./components/DeviceList";
import ThresholdEditor from "./components/ThresholdEditor";
import AddThresholdForm from "./components/AddThresholdForm";

export default function App() {
    const [view, setView] = useState("sensors");

    return (
        <div className="h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-200">
            <Header onViewChange={setView} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        {view === "sensors" && <SensorGrid />}
                        {view === "devices" && <DeviceList />}
                        {view === "live" && <SensorTable />}
                        {view === "thresholds" && <ThresholdEditor />}
                        {view === "add-threshold" && <AddThresholdForm />}

                    </div>
                    <div className="flex-shrink-0">
                        <StatusBar />
                    </div>
                </div>
            </div>
        </div>
    );
}
