FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src

RUN npx prisma generate

# Elimina cualquier compilación anterior
RUN rm -rf dist

# Compila usando explícitamente tsconfig.json
RUN npm run build

# Verifica durante el build que no se hayan conservado imports ESM
RUN echo "Contenido generado de dist/index.js:" \
    && head -n 10 dist/index.js \
    && if grep -q "^import " dist/index.js; then \
         echo "ERROR: TypeScript todavía está generando ES Modules"; \
         exit 1; \
       fi

EXPOSE 4000

CMD ["npm", "start"]