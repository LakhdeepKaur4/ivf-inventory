FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .

ENV INVENTORY_SERVICE="http://circle-inv.tip.ivfuture.tk:88"
ENV VOXEL_SERVICE="http://voxel-cp.tip.ivfuture.tk:88"
ENV MOCKUP_SERVICE="http://localhost:4200"

RUN yarn install

RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .


EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
