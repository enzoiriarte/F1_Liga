import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Definir el alcance de los permisos
scope = ["https://spreadsheets.google.com/feeds", 
         "https://www.googleapis.com/auth/spreadsheets",
         "https://www.googleapis.com/auth/drive.file",
         "https://www.googleapis.com/auth/drive"]

# Cargar credenciales desde el archivo JSON
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)

# Abre la hoja de cálculo por su ID
spreadsheet_id = "TU_GOOGLE_SHEET_ID"  # Reemplázalo con el ID de tu hoja de Google Sheets
sheet = client.open_by_key(spreadsheet_id).sheet1

# Obtener las primeras 5 filas de la hoja
data = sheet.get_all_records()

print(data)
