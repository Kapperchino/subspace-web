FROM node:21-alpine AS builder
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:21-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
ENV ORIGIN=https://subspace.place
ENV BACK_END=https://subspace-backend.fly.dev
CMD [ "node", "build" ]