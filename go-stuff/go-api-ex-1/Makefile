.PHONY: run test lint build-linux docker-build docker-up docker-down docker-logs docker-build-local docker-up-local

run:
	go run ./cmd/server

test:
	go test ./...

lint:
	golangci-lint run ./...

# Linux cross-compile (requires: brew install FiloSottile/musl-cross/musl-cross)
build-linux:
	chmod +x build-linux.sh
	./build-linux.sh

# Docker with in-container build (original)
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

# Docker with locally pre-built binary
docker-build-local: build-linux
	docker build -t go-api-ex-1:local .

docker-up-local: docker-build-local
	docker-compose -f docker-compose.local.yml up -d

# Stop
docker-down:
	docker-compose down
docker-down-local:
	docker-compose -f docker-compose.local.yml down

docker-logs:
	docker-compose logs -f app

# View logs in Grafana/Loki
docker-grafana:
	@echo "Grafana available at http://localhost:3000"
	@echo "Login: admin/admin"
