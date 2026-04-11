.PHONY: run test lint docker-build docker-up docker-down docker-log-logs

run:
	go run ./cmd/server

test:
	go test ./...

lint:
	golangci-lint run ./...

# Docker commands
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f app

# View logs in Grafana/Loki
docker-grafana:
	@echo "Grafana available at http://localhost:3000"
	@echo "Login: admin/admin"
