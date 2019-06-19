.PHONY: build dev

dev:
	DEBUG=0 \
    FIREBASE_API_KEY="AIzaSyAn7_XViedoGUcJPl3i64CFZewD0gxwHP8" \
    CLIENT_ID="1085697004242-915th2t6eman8vnkgsa3apo48cumgv1q.apps.googleusercontent.com" \
    go run main.go


build:
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 \
	go build -o build/main *.go
w
