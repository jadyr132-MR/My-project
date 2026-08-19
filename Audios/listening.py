import asyncio
import os
import edge_tts

# Catálogo variado de 12 voces neuronales en inglés
VOICES = [
    "en-US-JennyNeural",        # US Femenino - Claro y natural
    "en-US-GuyNeural",          # US Masculino - Neutro y conversacional
    "en-US-AriaNeural",         # US Femenino - Expresivo
    "en-US-ChristopherNeural",  # US Masculino - Tono formal / locutor
    "en-US-AvaNeural",          # US Femenino - Cálido y fluido
    "en-US-AndrewNeural",       # US Masculino - Amigable y dinámico
    "en-GB-SoniaNeural",        # UK Femenino - Británico estándar
    "en-GB-RyanNeural",         # UK Masculino - Británico natural
    "en-AU-NatashaNeural",      # AU Femenino - Australiano
    "en-CA-LiamNeural",         # CA Masculino - Canadiense
    "en-US-MichelleNeural",     # US Femenino - Suave
    "en-US-EricNeural",         # US Masculino - Claro y pausado
]

# Las 72 frases completas incluyendo etiquetas A1, A2, etc.
PHRASES = [
    # SET 1
    {"id": "Set1_A1", "text": "A1: The athlete is doing push-ups to improve strength."},
    {"id": "Set1_A2", "text": "A2: The athlete must rest to recover during the session."},
    {"id": "Set1_A3", "text": "A3: The goal is on the soccer field."},
    {"id": "Set1_B1", "text": "B1: He is doing a bridge for balance."},
    {"id": "Set1_B2", "text": "B2: The coach is shouting to start training."},
    {"id": "Set1_B3", "text": "B3: Massage is important for the athlete's recovery."},
    {"id": "Set1_C1", "text": "C1: The mat is inside the play area."},
    {"id": "Set1_C2", "text": "C2: The coach uses the tablet to boost performance."},
    {"id": "Set1_C3", "text": "C3: The bike is for endurance and long-distance training."},
    {"id": "Set1_D1", "text": "D1: The referee should be fast during the game."},
    {"id": "Set1_D2", "text": "D2: The athlete has an injury in the ankle."},
    {"id": "Set1_D3", "text": "D3: These weight plates are heavier than those."},

    # SET 2
    {"id": "Set2_A1", "text": "A1: The athlete is doing lunges to improve strength."},
    {"id": "Set2_A2", "text": "A2: Athletes must focus during the session."},
    {"id": "Set2_A3", "text": "A3: The finish line is on the field."},
    {"id": "Set2_B1", "text": "B1: He is doing a side plank for balance."},
    {"id": "Set2_B2", "text": "B2: The coach is clapping to start training."},
    {"id": "Set2_B3", "text": "B3: Sleeping is important for recovery."},
    {"id": "Set2_C1", "text": "C1: The cone is in the area."},
    {"id": "Set2_C2", "text": "C2: The coach uses the clipboard for performance."},
    {"id": "Set2_C3", "text": "C3: The rope is for endurance training."},
    {"id": "Set2_D1", "text": "D1: The referee should be objective."},
    {"id": "Set2_D2", "text": "D2: The athlete has an injury in the shoulder."},
    {"id": "Set2_D3", "text": "D3: These bands are stronger than those."},

    # SET 3
    {"id": "Set3_A1", "text": "A1: The athlete is doing crunches to improve and strengthen the core."},
    {"id": "Set3_A2", "text": "A2: Athletes must sweat during the session training."},
    {"id": "Set3_A3", "text": "A3: The goal is on the field."},
    {"id": "Set3_B1", "text": "B1: He is doing a deadbug for balance."},
    {"id": "Set3_B2", "text": "B2: The coach is writing to start training basketball."},
    {"id": "Set3_B3", "text": "B3: Walking is important for your knee injury recovery."},
    {"id": "Set3_C1", "text": "C1: The box is next to the bathroom in the area."},
    {"id": "Set3_C2", "text": "C2: The coach uses the whistle to control the game."},
    {"id": "Set3_C3", "text": "C3: The Skierg is a machine designed specifically for endurance training."},
    {"id": "Set3_D1", "text": "D1: The referee should be honest."},
    {"id": "Set3_D2", "text": "D2: The athlete has an injury in the back body part."},
    {"id": "Set3_D3", "text": "D3: These ropes are heavier than those."},

    # SET 4
    {"id": "Set4_A1", "text": "A1: The athlete is doing jumping jacks to improve endurance."},
    {"id": "Set4_A2", "text": "A2: Athletes must breathe during the session."},
    {"id": "Set4_A3", "text": "A3: The cone is beside the field."},
    {"id": "Set4_B1", "text": "B1: He is doing a single leg for balance."},
    {"id": "Set4_B2", "text": "B2: The coach is signaling to start training."},
    {"id": "Set4_B3", "text": "B3: Ice bath is important for recovery."},
    {"id": "Set4_C1", "text": "C1: The barbell is outside the area."},
    {"id": "Set4_C2", "text": "C2: The coach uses the heart rate monitor for performance."},
    {"id": "Set4_C3", "text": "C3: The elliptical is for endurance training."},
    {"id": "Set4_D1", "text": "D1: The referee should be focused."},
    {"id": "Set4_D2", "text": "D2: The athlete has an injury on the elbow."},
    {"id": "Set4_D3", "text": "D3: These balls are bigger than those."},

    # SET 5
    {"id": "Set5_A1", "text": "A1: The athlete is doing burpees to improve skill."},
    {"id": "Set5_A2", "text": "A2: Athletes must breathe during the session."},
    {"id": "Set5_A3", "text": "A3: The cone is in the field."},
    {"id": "Set5_B1", "text": "B1: He is doing a bird-dog for balance."},
    {"id": "Set5_B2", "text": "B2: The coach is pointing to start training."},
    {"id": "Set5_B3", "text": "B3: Ice bath is important for recovery."},
    {"id": "Set5_C1", "text": "C1: The kettlebell is in the area."},
    {"id": "Set5_C2", "text": "C2: The coach uses the heart rate monitor for performance."},
    {"id": "Set5_C3", "text": "C3: The Skierg is for endurance training."},
    {"id": "Set5_D1", "text": "D1: The referee should be calm."},
    {"id": "Set5_D2", "text": "D2: The athlete has an injury in the elbow."},
    {"id": "Set5_D3", "text": "D3: These rollers are softer than those."},

    # SET 6
    {"id": "Set6_01", "text": "The athlete is doing lunges to improve balance."},
    {"id": "Set6_02", "text": "She is doing a side plank to improve her balance and strengthen her core muscles."},
    {"id": "Set6_03", "text": "The cone is in the training area to help athletes practice their speed and coordination."},
    {"id": "Set6_04", "text": "The referee should be objective and make fair decisions during every match."},
    {"id": "Set6_05", "text": "Athletes must focus during the session to improve their skills and avoid mistakes."},
    {"id": "Set6_06", "text": "The coach is clapping to start training and motivate the players to work hard."},
    {"id": "Set6_07", "text": "The coach uses the clipboard to organize the exercise and evaluate the players' performance."},
    {"id": "Set6_08", "text": "The athlete has an injury in the shoulder, so he needs to rest before returning to training."},
    {"id": "Set6_09", "text": "The finish line is at the end of the field, where the runners complete the race."},
    {"id": "Set6_10", "text": "Sleeping is important for recovery because it helps athletes restore energy after intense exercise."},
    {"id": "Set6_11", "text": "The rower is for endurance training and helps athletes improve their strength and cardiovascular fitness."},
    {"id": "Set6_12", "text": "These bands are stronger than those, so they are better for advanced resistance exercises."},
]

OUTPUT_DIR = "audios_fitness_en"
RATE = "-15%"  # Velocidad 15% más pausada para facilitar la comprensión

async def procesar_audio(sem: asyncio.Semaphore, item: dict, idx: int):
    async with sem:
        texto_a_leer = item["text"]
        voz = VOICES[(idx - 1) % len(VOICES)]
        nombre_corto_voz = voz.split("-")[2].replace("Neural", "")
        
        # Formato de archivo: 01_Set1_A1_Jenny.mp3
        nombre_archivo = f"{idx:02d}_{item['id']}_{nombre_corto_voz}.mp3"
        ruta_completa = os.path.join(OUTPUT_DIR, nombre_archivo)

        comunicador = edge_tts.Communicate(texto_a_leer, voz, rate=RATE)
        await comunicador.save(ruta_completa)
        print(f"[{idx:02d}/72] Guardado: {nombre_archivo} -> '{texto_a_leer[:30]}...'")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    semaphore = asyncio.Semaphore(5)  # Ejecución concurrente controlada
    tareas = [
        procesar_audio(semaphore, item, idx) 
        for idx, item in enumerate(PHRASES, start=1)
    ]
    await asyncio.gather(*tareas)
    print(f"\nFinalizado con éxito: 72 audios generados en '{OUTPUT_DIR}/'.")

if __name__ == "__main__":
    asyncio.run(main())