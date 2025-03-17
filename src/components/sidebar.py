import tkinter as tk

# Klasa Sidebar: lewy panel z informacjami środowiskowymi (np. temperatura, wilgotność, itp.)
class Sidebar(tk.Frame):
    def __init__(self, parent):
        # Inicjalizacja ramki (Frame) dla paska bocznego
        super().__init__(parent, bg="lightgray")  # Opcjonalnie ustawiamy tło na jasnoszare dla wyróżnienia
        # Tworzenie widgetów (etykiet) z danymi środowiskowymi
        title_label = tk.Label(self, text="Dane środowiskowe", font=("Arial", 14, "bold"), bg="lightgray")
        temp_label = tk.Label(self, text="Temperatura: 25°C", bg="lightgray")
        humidity_label = tk.Label(self, text="Wilgotność: 60%", bg="lightgray")
        light_label = tk.Label(self, text="Nasłonecznienie: 300 lx", bg="lightgray")
        # Umieszczenie etykiet w siatce (jedna kolumna, kolejne wiersze)
        title_label.grid(row=0, column=0, padx=10, pady=(10,5), sticky="w")
        temp_label.grid(row=1, column=0, padx=10, pady=2, sticky="w")
        humidity_label.grid(row=2, column=0, padx=10, pady=2, sticky="w")
        light_label.grid(row=3, column=0, padx=10, pady=2, sticky="w")
        # Rozciągnięcie ostatniego wiersza, aby etykiety były przy górze (reszta przestrzeni poniżej pozostanie pusta)
        self.grid_rowconfigure(4, weight=1)
