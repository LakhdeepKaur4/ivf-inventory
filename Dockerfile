FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .

ENV REACT_APP_INVENTORY_SERVICE="http://circle.tip.ivfuture.tk:88"
ENV REACT_APP_VOXEL_SERVICE="http://voxel-cp.tip.ivfuture.tk:88"
ENV REACT_APP_MINIO_SERVICE="http://minio.ivfuture.internal:9000/"

RUN yarn install

RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .


EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
