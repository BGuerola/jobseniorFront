# Etapa 1: Build de Angular
FROM node:18 AS build
WORKDIR /app
#COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build -- --configuration=production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
#RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/jobsenior /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
CMD ["sh", "-c", "envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]