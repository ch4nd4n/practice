from kokoro import KPipeline
import soundfile as sf

# Use 'mps' for Apple Silicon GPU speed
pipeline = KPipeline(lang_code='a', device='mps') 

text = "I have changed the text and lets see how that goes"
generator = pipeline(text, voice='af_heart', speed=1)

for i, (gs, ps, audio) in enumerate(generator):
    sf.write(f'audio_{i}.wav', audio, 24000)
    print(f"Generated audio_{i}.wav")
