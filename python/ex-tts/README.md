# Voice Synthesis with Kokoro TTS

Text-to-speech examples using lightweight, efficient TTS models.

## Setup

### 1. Install System Dependencies

**macOS (with Homebrew):**
```sh
brew install sox
```

**Linux (Ubuntu/Debian):**
```sh
sudo apt-get install sox libsox-fmt-all
```

### 2. Install Python Dependencies with uv

```sh
uv sync
```

This installs all dependencies from `pyproject.toml` into `.venv/`.

### 3. Verify Installation

```sh
uv run python -c "from kokoro import KPipeline; print('✓ Kokoro ready')"
```

## Running Examples

### Kokoro TTS - Basic Example (recommended)

```sh
uv run python kokoro_sample.py
```

Generates `0.wav` with synthesized speech (voice cloning demo).

**Features:**
- Text-to-speech with voice cloning
- Reference audio-based synthesis
- Outputs multi-speaker capabilities

### Kokoro TTS - Apple Silicon Optimized

```sh
uv run python talk.py
```

Generates `audio_0.wav` with MPS device optimization for Apple Silicon.

**Features:**
- Uses Metal Performance Shaders (MPS) for GPU acceleration
- Customizable voice and speech speed
- Single-speaker synthesis

**All Kokoro examples:**
- First run downloads the model (~100MB from HuggingFace)
- Subsequent runs use cached model from `~/.cache/huggingface/`
- Lightweight at 82M parameters, works on CPU/GPU

### Qwen3 TTS (experimental)

```sh
uv run python qwen-tts.py
```

**Status:** Requires transformers compatibility fix (advanced users only).

## Dependency Management

### Using uv (Recommended)

All dependencies are declared in `pyproject.toml`. Install with:

```sh
uv sync
```

This uses the locked versions from `uv.lock` for reproducible builds.

### uv Best Practices

**Always use `uv run` to execute code:**
```sh
uv run python kokoro_sample.py
```

**Why `uv run` is best:**
- ✓ No venv activation required
- ✓ Automatically uses locked dependencies from `uv.lock`
- ✓ Ensures consistent environment across machines/CI
- ✓ No PATH pollution
- ✓ Works everywhere without shell configuration

**Avoid these:**
- ❌ Manually activating `.venv/bin/activate`
- ❌ Installing packages with plain `pip install`
- ❌ Trying to run `python` without `uv run`

**Your workflow:**
```sh
# One-time setup
uv sync              # Install dependencies from uv.lock

# Always use uv run
uv run python script.py
uv run python -m module

# Update dependencies (commits changes to uv.lock)
uv lock
```

### Dependency Details
- **torch**: PyTorch for neural network inference
- **kokoro**: Lightweight TTS model (82M parameters)
- **soundfile**: WAV file I/O
- **torchaudio**: Audio processing utilities

### System Dependencies
- **sox**: Audio processing utility (required for soundfile on some systems)

### Optional
- **qwen-tts**: Alternative TTS model (experimental, has transformers compatibility issues on some systems)

## Performance Notes

- **M1/M2/M3 Mac**: Uses Metal Performance Shaders automatically. Flash attention not available (uses standard PyTorch fallback).
- **Linux/NVIDIA GPU**: Standard PyTorch inference works, flash-attention can be installed for faster inference.
- **First run**: Downloads model from HuggingFace Hub (~100MB). Subsequent runs use cached model from `~/.cache/huggingface/`.

## Editor Configuration

### Neovim with LazyVim

LazyVim uses Pyright as the default Python LSP. For it to find your project dependencies:

**The `pyrightconfig.json` file is already included** in this project and configures Pyright to use the `.venv` directory.

If you're setting up a new project with uv + LazyVim:

1. Create `pyrightconfig.json` in project root:
```json
{
  "venvPath": ".",
  "venv": ".venv",
  "pythonVersion": "3.13"
}
```

2. Reopen files in Neovim and run `:LspRestart`

3. Verify LSP is working: `:LspInfo`

**Why this is needed:**
- Pyright needs to know where your `.venv` is located
- Without this config, it uses system Python and can't find project dependencies
- This prevents "Import X could not be resolved" errors

## Troubleshooting

**Neovim: "Import kokoro could not be resolved"**
- Ensure `pyrightconfig.json` exists in project root
- Run `:LspRestart` in Neovim
- Python version in config should match `.venv` Python version

**"No module named pip"**: Install pip in venv
```sh
uv pip install pip
```

**"sox: command not found"**: Install system sox (see Setup section above)

**"No module named kokoro"**: Run `uv sync` to install dependencies

## References

- https://github.com/hexgrad/kokoro
- [Kokoro Paper](https://arxiv.org/abs/2404.11307)
- [HuggingFace Model Card](https://huggingface.co/hexgrad/Kokoro-82M)

### Conversation Links

- https://gemini.google.com/app/967bc8afce63c488

---

## Appendix: Using pip (Alternative, Not Recommended)

This project is optimized for **uv**. If you must use pip instead:

```sh
# Install system dependencies first
brew install sox

# Then install Python dependencies
pip install -r requirements-minimal.txt

# Run scripts
python kokoro_sample.py
```

**Note:** pip doesn't guarantee reproducible builds like uv does. The `uv.lock` file won't be used, which may cause dependency conflicts on different machines.

**Why uv is better:**
- Faster installation
- Locked, reproducible dependencies
- No venv activation needed with `uv run`
- Better error messages
