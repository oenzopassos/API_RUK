# Etapa 1: Builder
FROM node:18-alpine3.20 AS builder

# Define diretório de trabalho
WORKDIR /usr/src/app


COPY package.json pnpm-lock.yaml ./


RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile


COPY . .


RUN pnpm prisma generate

RUN pnpm run build


FROM node:18-alpine3.20

WORKDIR /usr/src/app


RUN npm install -g pnpm


COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma


RUN pnpm prisma generate


EXPOSE 3001


CMD ["pnpm", "start:prod"]
