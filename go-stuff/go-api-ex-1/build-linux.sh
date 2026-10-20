#!/bin/bash
set -e

# Build script for cross-compiling Go app with CGO (DuckDB) from macOS to Linux

# Check if musl-cross compiler is installed
if ! command -v x86_64-linux-musl-gcc &> /dev/null; then
    echo "Error: musl cross-compiler not found"
    echo ""
    echo "Install with:"
    echo "  brew install FiloSottile/musl-cross/musl-cross"
    echo ""
    exit 1
fi

echo "Building Linux binary with musl..."

CC=x86_64-linux-musl-gcc \
CXX=x86_64-linux-musl-g++ \
CGO_ENABLED=1 GOOS=linux GOARCH=amd64 \
go build -ldflags '-linkmode external -extldflags "-static"' \
  -o server-linux ./cmd/server/main.go

echo "Build complete: server-linux"
ls -lh server-linux
