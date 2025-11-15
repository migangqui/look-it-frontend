export async function uploadGarment(file) {
  // Llamada al backend para subir la prenda
  const formData = new FormData();
  formData.append('file', file);
  return fetch('/api/v1/garment', {
    method: 'POST',
    body: formData
  });
}

export async function getLook() {
  // Llamada al backend para obtener el look generado
  return fetch('/api/v1/look');
}
