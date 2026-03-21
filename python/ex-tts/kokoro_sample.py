import logging
from kokoro import KPipeline
import soundfile as sf

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

logger.info("Initializing Kokoro pipeline")
pipeline = KPipeline(lang_code='a')
text = '''
What goes up must come down. That's a song by someone that I don't remember, but anyway.
'''
generator = pipeline(text, voice='af_heart')
for i, (gs, ps, audio) in enumerate(generator):
    logger.debug(f"Chunk {i}: gs={gs}, ps={ps}")
    filename = f'{i}.wav'
    sf.write(filename, audio, 24000)
    logger.info(f"Saved {filename}")
