# pip install edge-tts asyncio
import asyncio
import edge_tts

TEXT = """
In February 1996, Colombian soccer star Faustino "El Tino" Asprilla arrived in England to play for Newcastle United.
The weather was freezing, and it was snowing heavily. 
Faustino did not speak English, and he was wearing a giant, elegant fur coat! 
The team coach looked at the snow and said: "Faustino, you shouldn't play today in this terrible blizzard."
But El Tino smiled and said: "Coach, no problem!" 
He ate a warm meal, drank a cup of English tea, and went onto the snowy field. 
In the second half of the match, he made an incredible assist and Newcastle won the game!
After the match, El Tino said with a smile: "England is very cold! Athletes should always wear warm jackets, but they shouldn't be afraid of the snow."
"""

VOICE = "en-GB-RyanNeural"  # Acento británico muy claro y natural
OUTPUT_FILE = "track_1_3.mp3"

async def generate_audio():
    # rate="-12%" hace la locución más pausada y clara para nivel A1-A2
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="-12%", pitch="+0Hz")
    await communicate.save(OUTPUT_FILE)
    print(f"Audio guardado exitosamente en: {OUTPUT_FILE}")

if __name__ == "__main__":
    asyncio.run(generate_audio())