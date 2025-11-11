# BUILDER:
FROM node:22-alpine AS builder
WORKDIR /app
  
# Enable PNPM:
RUN corepack enable

# Set NEXTJS_STANDALONE_OUTPUT env:
ENV NEXTJS_STANDALONE_OUTPUT=true

# Install dependencies:
COPY ./package.json5 ./pnpm-lock.yaml ./pnpm-workspace.yaml ./

###########################
# GENERATED COPY COMMANDS #
###########################
COPY ./modules/ui-kit/    ./modules/ui-kit/
COPY ./packages/effect/   ./packages/effect/
COPY ./services/frontend/ ./services/frontend/
###########################

RUN pnpm install --frozen-lockfile

# Use environment variables (Railway):

RUN pnpm --filter=@core-services/frontend run build

# RUNNER:
FROM node:22-alpine AS runner
WORKDIR /app

# Define environment variables for execution:
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV="production" 
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy only necessary files from the build stage:
COPY --from=builder /app/services/frontend/.next/standalone ./
# COPY --from=builder /app/services/frontend/public ./services/frontend/public
COPY --from=builder /app/services/frontend/.next/static ./services/frontend/.next/static

# Run the server:
WORKDIR /app/services/frontend
CMD ["node", "./server.js"]