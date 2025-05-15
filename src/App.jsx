import SensorGrid from "./components/SensorGrid";
import Sidebar from "./components/Sidebar/Sidebar";
import StatusBar from "./components/StatusBar";
import Header from "./components/Header";

export default function App() {
    return (
        <div className="h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-200">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        <SensorGrid />
                    </div>
                    <div className="flex-shrink-0">
                        <StatusBar />
                    </div>
                </div>
            </div>
        </div>
    );
}
