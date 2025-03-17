import tkinter as tk

# Klasa StatusBar: dolny pasek statusu z informacjami o wymaganych działaniach lub stanie systemu.
class StatusBar(tk.Frame):
    def __init__(self, parent):
        super().__init__(parent, bd=1, relief=tk.SUNKEN)
        # Utworzenie etykiety statusu; anchor="w" powoduje wyrównanie tekstu do lewej.
        status_label = tk.Label(self, text="Wszystkie rośliny mają się dobrze.", anchor="w")
        # Rozmieszczenie etykiety w ramce za pomocą pack - wypełnia całą szerokość (fill=X)
        status_label.pack(fill=tk.X, padx=5, pady=2)
