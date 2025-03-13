import gspread
import pandas as pd
import requests
from bs4 import BeautifulSoup
from oauth2client.service_account import ServiceAccountCredentials
import yagmail
import sys
from datetime import datetime, timedelta

# ------------------------- CONFIGURAR ACCESO A GOOGLE SHEETS -------------------------
try:
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/spreadsheets",
             "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]
    
    creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
    client = gspread.authorize(creds)

    spreadsheet_id = "1LU-QsEyenBQkllipQkvV-QbkK1CfjwO3Gpz4JhitXYc"  # Reemplázalo con tu ID real
    sheet = client.open_by_key(spreadsheet_id).sheet1

    data = sheet.get_all_records()
    df = pd.DataFrame(data)

    if df.empty:
        print("⚠️ La hoja de Google Sheets está vacía. Verifica que haya respuestas registradas.")
        sys.exit()

    df.columns = df.columns.str.strip()
    print("📄 Columnas obtenidas de Google Sheets:", df.columns.tolist())
    print(df.head())

except Exception as e:
    print(f"❌ Error al conectar con Google Sheets: {e}")
    sys.exit()

# ------------------------- OBTENER RESULTADOS OFICIALES DE LA F1 -------------------------
url = "https://www.formula1.com/en/results.html/2025/races.html"

try:
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    resultados = []
    for fila in soup.select("tr"):
        columnas = fila.find_all("td")
        if len(columnas) > 1:
            posicion = columnas[0].text.strip()
            piloto = columnas[1].text.strip()
            resultados.append((posicion, piloto))

    if not resultados:
        print("⚠️ No se encontraron resultados en la web de la F1. Revisa la estructura de la página.")
        sys.exit()

    print("🏎 Resultados obtenidos de la F1:", resultados)

except Exception as e:
    print(f"❌ Error al obtener datos de la web de la F1: {e}")
    sys.exit()

# ------------------------- COMPARAR PREDICCIONES Y ASIGNAR PUNTOS -------------------------
def calcular_puntaje(predicciones, resultados):
    puntos = 0
    for i, (pos, piloto) in enumerate(resultados):
        if i < len(predicciones) and predicciones[i].strip().lower() == piloto.strip().lower():
            puntos += 10  # 10 puntos por acierto exacto
    return puntos

columna_prediccion = next((col for col in df.columns if "predic" in col.lower()), None)

if not columna_prediccion:
    print("❌ No se encontró la columna 'Predicción'. Verifica los nombres de las columnas en Google Sheets.")
    sys.exit()

df["Puntos"] = df[columna_prediccion].apply(lambda x: calcular_puntaje(x.split(","), resultados))

print("🏆 Tabla de puntajes:")
print(df[["Nombre", "Puntos"]])

try:
    sheet.update([df.columns.values.tolist()] + df.values.tolist())
    print("✅ Puntajes actualizados en Google Sheets")

except Exception as e:
    print(f"❌ Error al actualizar Google Sheets: {e}")

# ------------------------- OBTENER LA COLUMNA DE CORREOS -------------------------
columna_correo = next((col for col in df.columns if "correo" in col.lower() or "email" in col.lower()), None)

if not columna_correo:
    print("❌ No se encontró la columna de correos electrónicos en Google Sheets.")
    sys.exit()

correos_participantes = df[columna_correo].dropna().unique().tolist()
print("📩 Correos extraídos:", correos_participantes)

# ------------------------- DETECTAR EL PRÓXIMO GP -------------------------
gps_f1_2025 = {
    "GP de Australia": "2025-03-16",
    "GP de China": "2025-03-23",
    "GP de Japón": "2025-04-06",
    "GP de Baréin": "2025-04-13",
    "GP de Arabia Saudita": "2025-04-20",
    "GP de Miami": "2025-05-04",
    "GP de Emilia-Romaña": "2025-05-18",
    "GP de Mónaco": "2025-05-25",
    "GP de España": "2025-06-01",
    "GP de Canadá": "2025-06-15",
    "GP de Austria": "2025-06-29",
    "GP de Gran Bretaña": "2025-07-06",
    "GP de Bélgica": "2025-07-27",
    "GP de Hungría": "2025-08-03",
    "GP de Países Bajos": "2025-08-31",
    "GP de Italia": "2025-09-07",
    "GP de Azerbaiyán": "2025-09-21",
    "GP de Singapur": "2025-10-05",
    "GP de Estados Unidos": "2025-10-19",
    "GP de México": "2025-10-26",
    "GP de São Paulo": "2025-11-09",
    "GP de Las Vegas": "2025-11-23",
    "GP de Catar": "2025-11-30",
    "GP de Abu Dabi": "2025-12-07"
}

gps_f1_2025 = {gp: datetime.strptime(fecha, "%Y-%m-%d") for gp, fecha in gps_f1_2025.items()}
hoy = datetime.today()

proximo_gp = next((gp for gp, fecha in gps_f1_2025.items() if fecha >= hoy and hoy.date() == (fecha - timedelta(days=3)).date()), None)

if proximo_gp:
    print(f"📢 Hoy es jueves antes del {proximo_gp}. Se enviarán notificaciones.")
else:
    print("⚠️ No hay GP este fin de semana. No se enviarán emails.")
    sys.exit()

# ------------------------- ENVIAR NOTIFICACIONES -------------------------
EMAIL = "enzoiriarte92@gmail.com"
PASSWORD = "tqmt qpyz paqo zmzy"

link_formulario = "https://forms.gle/7YJpK52SeNY3iMWB7"

asunto = f"🏎️ Predicciones abiertas para el {proximo_gp}!"
cuerpo = f"""
Hola,

Este fin de semana se corre el {proximo_gp} y ya puedes hacer tu predicción.

📩 Entra aquí para completar el formulario: {link_formulario}

¡Mucha suerte! 🏁
"""

try:
    yag = yagmail.SMTP(EMAIL, PASSWORD)
    for correo in correos_participantes:
        yag.send(to=correo, subject=asunto, contents=cuerpo)
    print(f"✅ Emails enviados para el {proximo_gp}")

except Exception as e:
    print(f"❌ Error al enviar correos: {e}")
    sys.exit()


# https://script.google.com/macros/s/AKfycbw6xDkqFcYxGWvM3SyLSJLdO_6bR7D-zCEwu5ipEHZSRTWM3WIATYA9NxMuPtbxn70a/exec