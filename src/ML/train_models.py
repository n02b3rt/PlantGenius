import pandas as pd
import pickle
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Wczytanie danych
df = pd.read_csv("../data/dane.csv", index_col="Data/Godzina", parse_dates=True)
df.index.freq = "15min"  # Ustawienie częstotliwości próbek

# Listy kolumn
wilgotność_gleby = ["Rzodkiewka_Carmen", "Szczypiorek_Bohemia", "Rukola_Dzika", "Bazylia", "Mięta"]
podlewaj_kolumny = ["Podlej_Rzodkiewka_Carmen", "Podlej_Szczypiorek_Bohemia", "Podlej_Rukola_Dzika", "Podlej_Bazylia",
                    "Podlej_Mięta"]
dodatkowe_akcje = ["Włącz_światło", "Włącz_ogrzewanie"]

# 📌 **TRENING MODELI ARIMA** 📌
arima_models = {}
forecast_horizon = 24  # 24 godziny w przód

for roslina in wilgotność_gleby:
    print(f"Trenowanie ARIMA dla {roslina}...")
    model = ARIMA(df[roslina], order=(3, 1, 2))
    fitted_model = model.fit()
    arima_models[roslina] = fitted_model

    # Predykcja na przyszłość
    forecast = fitted_model.forecast(steps=forecast_horizon)
    print(f"Prognoza wilgotności gleby dla {roslina} na 24h: {forecast.values}")

# Zapisanie modeli ARIMA
with open("arima_models.pkl", "wb") as f:
    pickle.dump(arima_models, f)
print("✅ Modele ARIMA zostały zapisane jako 'arima_models.pkl'")

# 📌 **TRENING MODELI RANDOM FOREST** 📌
rf_models = {}


def prepare_rf_data(target_col):
    features = df.drop(columns=podlewaj_kolumny + dodatkowe_akcje)
    target = df[target_col]
    return train_test_split(features, target, test_size=0.2, random_state=42)


for akcja in podlewaj_kolumny + dodatkowe_akcje:
    print(f"Trenowanie Random Forest dla {akcja}...")
    X_train, X_test, y_train, y_test = prepare_rf_data(akcja)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"Dokładność dla {akcja}: {acc:.4f}")
    print(confusion_matrix(y_test, y_pred))
    print(classification_report(y_test, y_pred))
    print("--------------------------------------------------")

    rf_models[akcja] = model

# Zapisanie modeli Random Forest
with open("rf_models.pkl", "wb") as f:
    pickle.dump(rf_models, f)
print("✅ Modele Random Forest zostały zapisane jako 'rf_models.pkl'")


# 📌 **PREDYKCJA NA PRZYKŁADOWYCH DANYCH** 📌
def predict_decisions(sample_data):
    with open("rf_models.pkl", "rb") as f:
        rf_models = pickle.load(f)

    sample_df = pd.DataFrame([sample_data])
    decyzje = []

    for akcja, model in rf_models.items():
        predykcja = model.predict(sample_df)[0]
        if predykcja == 1:
            decyzje.append(akcja.replace("Podlej_", "Podlej ").replace("Włącz_", "Włącz "))

    if decyzje:
        print("🔔 Wykonaj akcje:", ", ".join(decyzje))
    else:
        print("✅ Nie wymaga działań.")


# 📌 **PREDYKCJA PRZYSZŁEJ WILGOTNOŚCI** 📌
def predict_future_soil_moisture():
    with open("arima_models.pkl", "rb") as f:
        arima_models = pickle.load(f)

    print("📉 Prognoza wilgotności gleby na 24h:")
    for roslina, model in arima_models.items():
        forecast = model.forecast(steps=24)
        print(f"{roslina}: {forecast.values}")


# 📌 **TESTOWA PREDYKCJA** 📌
przykladowe_dane = {
    "Rzodkiewka_Carmen": 45.0,
    "Szczypiorek_Bohemia": 55.0,
    "Rukola_Dzika": 50.0,
    "Bazylia": 60.0,
    "Mięta": 42.0,
    "Światło": 1,
    "Wilgotność_powietrza": 70,
    "Temperatura": 20
}

print("\n🔮 **TEST PREDYKCJI** 🔮")
predict_decisions(przykladowe_dane)
predict_future_soil_moisture()
