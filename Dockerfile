FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/types/ ./packages/types/
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/prisma/ ./apps/backend/prisma/
COPY apps/backend/prisma.config.ts ./apps/backend/

RUN npm ci

COPY apps/backend/src/ ./apps/backend/src/
COPY apps/backend/nest-cli.json apps/backend/tsconfig.json apps/backend/tsconfig.build.json* ./apps/backend/

RUN cd apps/backend && npm run build

EXPOSE 3000

CMD ["sh", "-c", "cd apps/backend && npx prisma migrate deploy && node dist/main"]
