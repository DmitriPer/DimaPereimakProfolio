FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/types/ ./packages/types/

RUN npm ci

COPY apps/backend/ ./apps/backend/

RUN cd apps/backend && npx prisma generate && npm run build

EXPOSE 3000

CMD ["sh", "-c", "cd apps/backend && npx prisma migrate deploy && node dist/main"]
