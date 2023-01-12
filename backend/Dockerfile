FROM node:14 as base

FROM base as development
WORKDIR /app
COPY ./package.json ./
RUN npm install
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi
COPY ./ ./
EXPOSE 4000 
CMD ["npm" , "run" , "dev"]

FROM base as production
WORKDIR /app
COPY ./package.json ./
RUN npm install --only=production
COPY ./ ./
EXPOSE 4000 
CMD ["npm" ,"start"]
