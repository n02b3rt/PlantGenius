import tkinter as tk
from components.card import PlantCard

# Klasa Dashboard: obszar główny zawierający i rozmieszczający karty roślin.
class Dashboard(tk.Frame):
    def __init__(self, parent):
        super().__init__(parent)
        # Przykładowe dane roślin (w realnej aplikacji dane mogłyby pochodzić z bazy lub czujników)
        plants = [
            {"name": "Monstera", "status": "OK", "moisture": 80},
            {"name": "Fikus", "status": "Podlewanie wymagane", "moisture": 30},
            {"name": "Sukulenta", "status": "OK", "moisture": 50},
        ]
        # Tworzenie kart dla każdej rośliny z powyższej listy
        for idx, plant in enumerate(plants):
            card = PlantCard(self, plant["name"], plant["status"], plant["moisture"])
            # Obliczenie pozycji (wiersz, kolumna) dla karty, np. 2 kolumny w rzędzie
            row = idx // 2   # dwa elementy na wiersz
            col = idx % 2
            card.grid(row=row, column=col, padx=10, pady=10, sticky="nw")
        # Konfiguracja siatki wewnątrz dashboard:
        # Ustawienie równego rozciągania dwóch kolumn, aby karty były poprawnie wyrównane
        self.grid_columnconfigure(0, weight=1)
        self.grid_columnconfigure(1, weight=1)
