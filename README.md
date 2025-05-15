# PlantGenius – Webowy interfejs monitorowania roślin

PlantGenius to frontendowa aplikacja stworzona w React do wizualizacji danych środowiskowych roślin. Pozwala śledzić wilgotność gleby, temperaturę, światło i status urządzeń Raspberry Pi Pico z czujnikami.

**Backend oraz logika obsługi danych znajdują się w repozytorium:**  
[PicoNetAuto (branch: moisture-sensor)](https://github.com/n02b3rt/PicoNetAuto/tree/moisture-sensor)

---

## ️Funkcje interfejsu

- Wizualizacja wszystkich czujników w formie siatki
- Wykres historii danych po kliknięciu na czujnik
- Sidebar z bieżącym światłem, temperaturą i wilgotnością
- Sekcja urządzeń z możliwością dodawania i usuwania Pico
- StatusBar z zaleceniami – np. "Podlej roślinę" lub "Za niska temperatura"

---

## Stack technologiczny

- **React**
- **TailwindCSS** 
- **Recharts** (wykresy)
- **Fetch API** (komunikacja z backendem)

---


## Jak uruchomić frontend

```bash
npm install
npm start
```

Domyślnie interfejs działa pod adresem: "http://192.168.0.180:5000",

⚠️ Uwaga: upewnij się, że backend działa na "proxy": "http://192.168.0.180:5000" lub skonfiguruj proxy w package.json.
