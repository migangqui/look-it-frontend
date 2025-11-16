# Dockerfile optimizado para Google Cloud Run (Vue + Vite + Tailwind)
# Multi-stage build para menor tamaño y seguridad

FROM node:25-alpine AS builder
WORKDIR /app

# Copiar dependencias y lockfiles primero para aprovechar cache
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --production=false

# Copiar el resto del código fuente
COPY . .
RUN npm run build

# Imagen final minimalista para servir archivos estáticos
FROM node:25-alpine AS runner
WORKDIR /app

# Instalar servidor estático
RUN npm install -g serve

# Copiar solo los archivos necesarios para producción
COPY --from=builder /app/dist ./dist

# Cloud Run requiere el puerto 8080
EXPOSE 8080

# Comando para servir la app en el puerto 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
