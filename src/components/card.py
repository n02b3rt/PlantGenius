import tkinter as tk

# Klasa PlantCard: reprezentuje pojedynczą kartę rośliny z nazwą i parametrami (status, wilgotność itp.)
class PlantCard(tk.Frame):
    def __init__(self, parent, name, status, moisture):
        # Inicjalizacja ramki dla karty. Ustawiamy obramowanie, padding wewnętrzny dla estetyki.
        super().__init__(parent, relief=tk.RIDGE, bd=2, padx=10, pady=10)
        # Tworzenie widgetów wewnątrz karty (etykiety z informacjami o roślinie)
        name_label = tk.Label(self, text=name, font=("Arial", 12, "bold"))
        status_label = tk.Label(self, text=f"Status: {status}")
        moisture_label = tk.Label(self, text=f"Wilgotność gleby: {moisture}%")
        # Rozmieszczenie etykiet wewnątrz ramki karty za pomocą grid (jedna kolumna)
        name_label.grid(row=0, column=0, sticky="w")
        status_label.grid(row=1, column=0, sticky="w", pady=(5, 0))   # odstęp od nazwy rośliny
        moisture_label.grid(row=2, column=0, sticky="w")
