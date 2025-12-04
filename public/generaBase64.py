import json
import base64
import os

# Archivo JSON de entrada
archivo_entrada = archivo_entrada = r"C:\Varios\ReactJS\v05\public\productos.json"

# Carpeta donde están las imágenes
ruta_imagenes = r'C:\Varios\ReactJS\v05\public\imagenes'

# Archivo JSON de salida
archivo_salida = r"C:\Varios\ReactJS\v05\public\productos_base64.json"

# Leer JSON original
with open(archivo_entrada, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Recorrer productos y codificar imágenes en Base64
for producto in data['productos']:
    nombre_archivo = os.path.basename(producto['imagen'])  # Extraer nombre de la imagen
    ruta_completa = os.path.join(ruta_imagenes, nombre_archivo)

    if os.path.exists(ruta_completa):
        with open(ruta_completa, 'rb') as img_file:
            encoded_string = base64.b64encode(img_file.read()).decode('utf-8')
            producto['imagen'] = encoded_string
    else:
        print(f"⚠️ No se encontró la imagen: {ruta_completa}")
        producto['imagen'] = None

# Guardar nuevo JSON con Base64
with open(archivo_salida, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f"✅ Archivo generado: {archivo_salida}")
