.PHONY: build dev

dev:
	DEBUG=0 \
    FIREBASE_API_KEY="" \
    CLIENT_ID="" \
    go run main.go


build:
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 \
	go build -o build/main *.go
w
