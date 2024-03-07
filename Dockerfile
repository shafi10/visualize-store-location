FROM node:18-alpine

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY
EXPOSE 8081
WORKDIR /app
COPY web .
RUN npm install --legacy-peer-deps
RUN cd frontend && npm install --legacy-peer-deps && npm run build
CMD ["npm", "run", "serve"]
