FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Variáveis dummy apenas para satisfazer o build estático — valores reais vêm em runtime
ENV NEXT_PUBLIC_BUILD=1 \
    ADMIN_EMAIL=build@build.com \
    ADMIN_PASSWORD=build \
    ADMIN_SECRET=build \
    SUPABASE_URL=https://build.supabase.co \
    SUPABASE_ANON_KEY=build \
    SUPABASE_SERVICE_ROLE=build \
    CRON_SECRET=build \
    GOOGLE_ADS_CUSTOMER_ID=build \
    GOOGLE_ADS_CLIENT_ID=build \
    GOOGLE_ADS_CLIENT_SECRET=build \
    GOOGLE_ADS_REFRESH_TOKEN=build
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
