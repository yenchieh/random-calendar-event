FROM alpine:3.7

ADD build/main /main
ADD dist /dist

ENTRYPOINT ["/main"]
