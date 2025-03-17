import tkinter as tk
from components.sidebar import Sidebar
from components.dashboard import Dashboard
from components.status_bar import StatusBar

# Główny moduł aplikacji: tworzy główne okno, inicjalizuje komponenty i uruchamia aplikację.
root = tk.Tk()
root.title("Panel Monitoringu Roślin")  # Ustawienie tytułu okna

# Konfiguracja siatki dla głównego okna:
# - kolumna 0: sidebar (nie rozciąga się na dodatkową szerokość)
# - kolumna 1: dashboard (rozciąga się, zajmując dostępną przestrzeń)
# - wiersz 0: główny obszar (sidebar + dashboard, rozciąga się na wysokość)
# - wiersz 1: pasek statusu (stała wysokość)
root.columnconfigure(0, weight=0)  # kolumna 0 (sidebar) o stałej szerokości
root.columnconfigure(1, weight=1)  # kolumna 1 (dashboard) rozszerza się przy zmianie rozmiaru okna
root.rowconfigure(0, weight=1)     # wiersz 0 rozszerza się (zajmuje większość okna)
root.rowconfigure(1, weight=0)     # wiersz 1 (status bar) ma stałą wysokość

# Tworzenie instancji komponentów interfejsu
sidebar = Sidebar(root)
dashboard = Dashboard(root)
status_bar = StatusBar(root)

# Rozmieszczenie komponentów w oknie głównym za pomocą grid
sidebar.grid(row=0, column=0, sticky="ns")                 # Sidebar w kolumnie 0, rozciąga się na całą wysokość (north-south)
dashboard.grid(row=0, column=1, sticky="nsew")             # Dashboard w kolumnie 1, rozciąga się we wszystkich kierunkach (north-south-east-west)
status_bar.grid(row=1, column=0, columnspan=2, sticky="we")# Status bar na dole, zajmuje dwie kolumny (rozciąga się na całą szerokość okna)

# Uruchomienie głównej pętli zdarzeń Tkinter
root.mainloop()
