# Projekt PLANTGENIUS

To jest projekt, którego celem jest monitorowanie stanu roślin przy użyciu danych z czujników. System wykorzystuje technologię RF do przesyłania informacji, dzięki czemu może podejmować decyzje mające na celu poprawę kondycji monitorowanych roślin.

## Opis projektu

Projekt ma na celu:
- **Zbieranie danych**: Odczytywanie parametrów środowiskowych (takich jak temperatura, wilgotność, nasłonecznienie) przy pomocy API.
- **Komunikację RF**: Wykorzystanie technologii RF do bezprzewodowego przesyłania danych pomiędzy urządzeniami.
- **Podejmowanie decyzji**: Analizę zebranych danych i automatyczne podejmowanie działań (np. włączenie oświetlenia, powiadamianie o niskim stanie wilgotności gleby) w celu poprawy stanu roślin.
- **Przyjazny interfejs użytkownika**: Wizualizacja danych i stanu roślin w aplikacji zbudowanej w Tkinter, która umożliwia łatwą obserwację oraz ewentualne manualne sterowanie systemem.

## Struktura projektu

Projekt został podzielony na moduły, co umożliwia łatwą rozbudowę i utrzymanie kodu. Główne elementy projektu:

- **main.py**  
  Główny plik uruchomieniowy, odpowiedzialny za inicjalizację interfejsu oraz integrację wszystkich modułów.

- **components/**  
  Folder zawierający komponenty interfejsu użytkownika, takie jak:
  - `sidebar.py` – panel boczny z danymi środowiskowymi,
  - `card.py` – moduł reprezentujący pojedynczą kartę rośliny,
  - `dashboard.py` – obszar główny wyświetlający karty roślin,
  - `status_bar.py` – dolny pasek z informacjami o stanie systemu.

## Jak rozpocząć

1. **Sklonuj repozytorium:**

   ```bash
   git clone https://github.com/n02b3rt/PlantGenius.git
   
2. **Utwórz środowisko wirtualne**
    ```bash
    python -m venv .venv
    ```
3. **Aktywuj środowisko wirtualne**
    ```bash
    ./.venv/Scripts/activate
    ```

4. **Zainstaluj potrzebne bibloteki**
    ```bash
    pip install -m requirements.txt   
    ```
(Opcjonalne) Dodaj do PyCharma interpreter ze środowiska które wlaśnie zrobiłeś jeśli nie chcesz korzystać z terminala podczas uruchamiania aplikacji
