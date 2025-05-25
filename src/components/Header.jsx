export default function Header({ onViewChange }) {
    return (
        <header className="bg-sky-50 p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">PLANTGENIUS</h1>
            <nav className="flex gap-6 text-sm font-medium text-gray-800">
        <span className="cursor-pointer hover:underline" onClick={() => onViewChange("sensors")}>
          Czujniki
        </span>
                <span className="cursor-pointer hover:underline" onClick={() => onViewChange("devices")}>
          Urządzenia
        </span>
                <span className="cursor-pointer hover:underline" onClick={() => onViewChange("live")}>
          Odczyty LIVE
        </span>
                <span className="cursor-pointer hover:underline" onClick={() => onViewChange("thresholds")}>
          Edycja progów
        </span>
                <span className="cursor-pointer hover:underline" onClick={() => onViewChange("add-threshold")}>
          Dodaj próg
        </span>
            </nav>
        </header>
    );
}
