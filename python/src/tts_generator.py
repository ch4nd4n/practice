import argparse
import logging
from pathlib import Path
from kokoro import KPipeline
import soundfile as sf

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)


def generate_speech(text: str, output_dir: str = ".", voice: str = "af_bella") -> None:
    """Generate speech from text using Kokoro TTS."""
    logger.info("Initializing Kokoro pipeline")
    pipeline = KPipeline(lang_code='a')

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    logger.info(f"Output directory: {output_path.resolve()}")

    logger.info(f"Generating speech for: {text[:50]}..." if len(text) > 50 else f"Generating speech for: {text}")
    logger.info(f"Using voice: {voice}")
    generator = pipeline(text, voice=voice)

    chunk_count = 0
    for i, (gs, ps, audio) in enumerate(generator):
        logger.debug(f"Chunk {i}: gs={gs}, ps={ps}")
        filename = output_path / f'{i}.wav'
        sf.write(filename, audio, 24000)
        logger.info(f"Saved {filename}")
        chunk_count += 1

    logger.info(f"Speech generation complete: {chunk_count} chunks saved")


def main():
    parser = argparse.ArgumentParser(
        description="Generate speech from text using Kokoro TTS"
    )
    parser.add_argument(
        "text",
        help="Text to convert to speech"
    )
    parser.add_argument(
        "-o", "--output",
        default=".",
        help="Output directory for WAV files (default: current directory)"
    )
    parser.add_argument(
        "-v", "--voice",
        default="af_bella",
        help="Voice to use for synthesis (default: af_bella)"
    )

    args = parser.parse_args()
    generate_speech(args.text, args.output, args.voice)


if __name__ == "__main__":
    main()
