package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type Env struct {
	Debug bool
	ApiKey string
	ClientId string
	CalendarId string
}
var envVar = Env{}

func main() {
	debug := false
	debugString := os.Getenv("DEBUG")
	if debugString == "1" || debugString == "true" {
		debug = true
	}

	// Firebase key
	apiKey := os.Getenv("FIREBASE_API_KEY")
	clientId := os.Getenv("CLIENT_ID")
	if apiKey == "" || clientId == "" {
		panic("FIREBASE_API_KEY and CLIENT_ID is required")
		return
	}

	calendarId := os.Getenv("CALENDAR_ID")
	if calendarId == "" {
		calendarId = "p9qkn7k06u837lj5hdeh6au9rc@group.calendar.google.com"
	}

	envVar = Env{
		Debug: debug,
		ApiKey: apiKey,
		ClientId: clientId,
	}

	r := gin.Default()
	if !debug {
		r.Static("/js", "./dist/js")
		r.Static("/css", "./dist/css")
		r.StaticFile("/favicon.ico", "./dist/favicon.ico")

		r.LoadHTMLFiles("./dist/index.html")

		r.GET("/", index)
		r.GET("/member", index)
		r.GET("/event", index)
		r.GET("/preview", index)

	}

	err := r.Run(":8081")
	if err != nil {
		panic(err)
	}

}

func index(c * gin.Context) {
	c.HTML(http.StatusOK, "index.html", envVar)
}
