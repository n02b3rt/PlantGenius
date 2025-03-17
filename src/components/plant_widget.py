import tkinter as tk
from PIL import Image, ImageTk
import os

class PlantCard(tk.Canvas):
    def __init__(self, parent, plant_name, icon_path, sensor_value, percentage, **kwargs):
        """Stylowa karta rośliny z ikoną, nazwą, poziomem nawilżenia i odczytem sensora."""
        super().__init__(parent, width=180, height=130, bg="black", highlightthickness=0)

        # Tło karty - zaokrąglony prostokąt
        self.card_bg = "white"
        self.shadow = self.create_rounded_rect(5, 5, 175, 125, radius=15, fill="gray30")  # Cień
        self.card = self.create_rounded_rect(0, 0, 170, 120, radius=15, fill=self.card_bg)  # Karta

        # Załaduj ikonę rośliny
        self.icon = None
        if os.path.exists(icon_path):
            self.icon = Image.open(icon_path).resize((40, 40), Image.Resampling.LANCZOS)
            self.icon = ImageTk.PhotoImage(self.icon)
            self.create_image(85, 25, image=self.icon, anchor="center")

        # Teksty (nazwa, sensor, poziom)
        self.create_text(85, 55, text=plant_name, font=("Arial", 12, "bold"), fill="black", anchor="center")
        self.sensor_label = self.create_text(85, 80, text=f"Sensor: {sensor_value}", font=("Arial", 10), fill="black", anchor="center")
        self.percentage_label = self.create_text(85, 100, text=f"Poziom: {percentage}%", font=("Arial", 10), fill="black", anchor="center")

        # Animacje hover (podświetlenie)
        self.bind("<Enter>", self._on_enter)
        self.bind("<Leave>", self._on_leave)

    def create_rounded_rect(self, x1, y1, x2, y2, radius, **kwargs):
        """Rysuje zaokrąglony prostokąt."""
        return self.create_polygon(
            x1 + radius, y1, x2 - radius, y1, x2, y1 + radius,
            x2, y2 - radius, x2 - radius, y2, x1 + radius, y2,
            x1, y2 - radius, x1, y1 + radius,
            smooth=True, **kwargs
        )

    def _on_enter(self, event):
        """Zmiana koloru na hover."""
        self.itemconfig(self.card, fill="#f0f0f0")  # Jasnoszare podświetlenie

    def _on_leave(self, event):
        """Przywrócenie koloru po opuszczeniu."""
        self.itemconfig(self.card, fill=self.card_bg)

    def update_data(self, sensor_value, percentage):
        """Aktualizacja tekstu sensora i poziomu nawilżenia."""
        self.itemconfig(self.sensor_label, text=f"Sensor: {sensor_value}")
        self.itemconfig(self.percentage_label, text=f"Poziom: {percentage}%")
