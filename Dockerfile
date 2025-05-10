# Etapa 1: Build de Angular
FROM node:18 AS build
WORKDIR /app

# 1. Copia archivos de dependencias primero (para cachear)
COPY package.json package-lock.json ./
RUN npm install
RUN npm ci --silent

# 2. Copia el resto y construye
COPY . .
RUN npm run build -- --configuration=production

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# 1. Elimina los archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# 2. Copia los archivos construidos de Angular (ajusta según tu angular.json)
#    NOTA: Si tu build genera la carpeta 'browser', usa:
COPY --from=build /app/dist/jobsenior/browser /usr/share/nginx/html

# 3. Copia configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4. Permisos (opcional pero recomendado)
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]