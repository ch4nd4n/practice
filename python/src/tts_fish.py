
from mlx_audio.tts.utils import load_model
from mlx_audio.tts.generate import generate_audio

model = load_model("mlx-community/fish-audio-s2-pro-bf16")
generate_audio(
    model=model,
    text="Hello, this is a test.",
    ref_audio="path_to_audio.wav",
    file_prefix="test_audio",
)
