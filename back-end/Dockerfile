# Temel imajım
FROM node:16

# İmaj metadatasına kendim ile alakalı bilgileri verdim
LABEL maintainer="Yusuf Dagdeviren @xsentez" version="1.0" description="My internship web project - Express.js backend"

# Çalışma dizinim
WORKDIR /usr/src/app

# package.json dosyamı dizine kopyaladim
COPY package*.json ./

# Bağımlılıkları kur
RUN npm install

# Uygulama kaynak kodumu kopyaladim
COPY . .

# 8080 portuna yönlendir
EXPOSE 8080

# Uygulamayı çalıştır
CMD [ "node","index.js" ]