package main

import (
	"backend/graph"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: graph.NewResolver()}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", cors(srv.ServeHTTP))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func cors(h http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "*")
        w.Header().Set("Access-Control-Allow-Headers", "*")
        h(w, r)
    }
}