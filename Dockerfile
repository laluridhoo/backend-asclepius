# Gunakan Node.js base image
FROM node:18

# Tetapkan direktori kerja
WORKDIR /usr/src/app

# Salin semua file ke dalam image Docker
COPY package*.json ./
COPY . .

# Instal dependencies
RUN npm install

# Expose port yang digunakan aplikasi (sesuai aplikasi Anda, misalnya 5000)
EXPOSE 5000

# Jalankan aplikasi
CMD ["npm", "start"]
