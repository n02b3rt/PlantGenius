export default function StatusBar() {
    const actions = [
        "Podlej roślinę: BAZYLIA",
        "Podlej roślinę: MIĘTA",
    ];

    return (
        <footer className="bg-plantgreen text-white p-4">
            <h3 className="font-semibold mb-2">Potrzebne działania:</h3>
            <ul className="list-disc pl-6">
                {actions.map((action, idx) => (
                    <li key={idx}>{action}</li>
                ))}
            </ul>
        </footer>
    );
}
