import { TalkingHead } from "https://cdn.jsdelivr.net/gh/met4citizen/TalkingHead@1.3/modules/talkinghead.mjs";

// 1. CURRICULUM DE 20 LECCIONES POR TEMA (A2.1 -> A2.3 -> B1)
const CURRICULUM = {
  sports_training: [
    { id: 1, cefr: "A2.1", title: "Warm-up & Routines", grammar: "Present Simple Affirmative", vocab: ["stretch", "warm up", "hydrate", "heart rate"], goal: "Describe your daily pre-workout routine with simple present verbs." },
    { id: 2, cefr: "A2.1", title: "Training Frequency", grammar: "Adverbs of Frequency (always, usually, twice a week)", vocab: ["reps", "sets", "rest day", "routine"], goal: "Explain how often you perform different exercises." },
    { id: 3, cefr: "A2.1", title: "Workout Prohibitions", grammar: "Present Simple Negative (don't / doesn't)", vocab: ["skip", "overtrain", "bad posture", "fatigue"], goal: "Talk about habits and mistakes athletes must avoid." },
    { id: 4, cefr: "A2.1", title: "Coach Questions", grammar: "Present Simple Questions (Do you / Does he)", vocab: ["dumbbells", "treadmill", "stamina", "cooldown"], goal: "Ask and answer fitness questions during training." },
    { id: 5, cefr: "A2.2", title: "Fitness Advice", grammar: "Modal SHOULD / SHOULDN'T", vocab: ["protein", "sleep", "recovery", "sore muscles"], goal: "Give healthy nutrition and recovery advice to an athlete." },
    { id: 6, cefr: "A2.2", title: "Gym Safety Rules", grammar: "Modal MUST / MUST NOT", vocab: ["safety clips", "spotter", "heavy weights", "injuries"], goal: "Express strict safety regulations in the gym." },
    { id: 7, cefr: "A2.2", title: "Comparing Workouts", grammar: "Comparative Adjectives (-er / more... than)", vocab: ["heavier", "faster", "more intense", "effective"], goal: "Compare calisthenics vs. weightlifting." },
    { id: 8, cefr: "A2.2", title: "Top Performance", grammar: "Superlatives (the fastest / the most demanding)", vocab: ["strongest", "hardest exercise", "peak condition"], goal: "Discuss the best workouts and toughest athletic challenges." },
    { id: 9, cefr: "A2.2", title: "Yesterday's Session", grammar: "Past Simple Regular Verbs (-ed)", vocab: ["trained", "lifted", "stretched", "recovered"], goal: "Report what you practiced during yesterday's training." },
    { id: 10, cefr: "A2.2", title: "Past Athletic Records", grammar: "Past Simple Irregular Verbs (ran, broke, felt, had)", vocab: ["10k run", "felt exhausted", "built muscle", "won"], goal: "Narrate an athletic milestone achieved in the past." },
    { id: 11, cefr: "A2.3", title: "Training Log Questions", grammar: "Past Simple Questions (Did you train? When did...?)", vocab: ["intervals", "personal best", "soreness"], goal: "Interview a partner about their past workout performance." },
    { id: 12, cefr: "A2.3", title: "Next Month's Goals", grammar: "Future with BE GOING TO", vocab: ["compete", "bulk up", "cut weight", "marathon"], goal: "Share your fitness plans and upcoming competition prep." },
    { id: 13, cefr: "A2.3", title: "Immediate Feedback", grammar: "Present Continuous (is lifting, are sweating)", vocab: ["form", "breathing", "pacing", "tempo"], goal: "Describe what athletes are doing right now in the gym." },
    { id: 14, cefr: "A2.3", title: "Exercise Instructions", grammar: "Imperatives & Connectors (First, then, ensure that)", vocab: ["push-ups", "plank", "core tight", "inhale/exhale"], goal: "Give clear step-by-step instructions for a complex movement." },
    { id: 15, cefr: "A2.3", title: "Athletic Capacities", grammar: "CAN / CANNOT / COULD for physical ability", vocab: ["mobility", "flexibility", "endurance", "power"], goal: "Explain what an athlete can and cannot do after rehabilitation." },
    { id: 16, cefr: "A2.3", title: "Purpose & Hydration", grammar: "Connectors of Purpose (in order to, so that, because)", vocab: ["electrolytes", "dehydration", "energy levels"], goal: "Explain why hydration and rest days are necessary." },
    { id: 17, cefr: "A2.3", title: "Equipment Quantities", grammar: "Quantifiers (too much, enough, plenty of, a few)", vocab: ["calories", "resistance bands", "rest intervals"], goal: "Assess if an athlete is taking enough nutrients and rest." },
    { id: 18, cefr: "B1.1", title: "Athlete Experience", grammar: "Present Perfect (have trained, has competed, ever/never)", vocab: ["VO2 max", "periodization", "long-term progress"], goal: "Discuss athletic background and training milestones." },
    { id: 19, cefr: "B1.2", title: "Overtraining Warnings", grammar: "First Conditional (If you overtrain, you will...)", vocab: ["burnout", "joint strain", "proper deload"], goal: "Formulate realistic cause-and-effect warnings for athletes." },
    { id: 20, cefr: "B1.3", title: "Master Coach Strategy", grammar: "Second Conditional (If I were head coach, I would...)", vocab: ["microcycle", "hypertrophy", "biomechanics", "peak"], goal: "Formulate hypothetical coaching strategies for an elite athlete." }
  ],
  football_soccer: [
    { id: 1, cefr: "A2.1", title: "Pitch & Positions", grammar: "Present Simple Affirmative", vocab: ["striker", "goalkeeper", "winger", "penalty box"], goal: "Explain the main roles and pitch positions in football." },
    { id: 2, cefr: "A2.1", title: "Match Routine", grammar: "Adverbs of Frequency (always, usually, on weekends)", vocab: ["kickoff", "halftime", "warm up", "drills"], goal: "Describe a football team's weekly schedule." },
    { id: 3, cefr: "A2.1", title: "Fouls & Offsides", grammar: "Present Simple Negative (doesn't count, don't touch)", vocab: ["handball", "offside", "foul", "yellow card"], goal: "Explain basic rules and illegal actions on the pitch." },
    { id: 4, cefr: "A2.1", title: "Ref & Player Rules", grammar: "Can / Cannot for Football Rules", vocab: ["referee", "whistle", "throw-in", "corner kick"], goal: "Describe what the goalkeeper and outfield players can/cannot do." },
    { id: 5, cefr: "A2.2", title: "Tactical Advice", grammar: "SHOULD / SHOULDN'T for strategy", vocab: ["press high", "cross early", "mark tightly", "counterattack"], goal: "Give tactical suggestions to improve attacking play." },
    { id: 6, cefr: "A2.2", title: "Disciplinary Rules", grammar: "MUST / MUST NOT for Red Cards", vocab: ["tackle from behind", "dissent", "penalty kick", "expulsion"], goal: "Describe severe fouls that lead to red cards." },
    { id: 7, cefr: "A2.2", title: "Comparing Squads", grammar: "Comparatives (faster, more organized than)", vocab: ["possession", "defensive line", "stamina", "depth"], goal: "Compare two rival football teams." },
    { id: 8, cefr: "A2.2", title: "The Best Derby", grammar: "Superlatives (the most competitive, the loudest stadium)", vocab: ["champions", "top scorer", "clean sheet"], goal: "Describe the best match or striker in the league." },
    { id: 9, cefr: "A2.2", title: "Last Night's Match", grammar: "Past Simple Regular (-ed: passed, tackled, crossed)", vocab: ["dominated", "equalized", "attacked", "intercepted"], goal: "Recap the highlights of yesterday's game." },
    { id: 10, cefr: "A2.2", title: "Historic Goals", grammar: "Past Simple Irregular (scored, won, beat, shot, flew)", vocab: ["free kick", "header", "top corner", "clean tackle"], goal: "Narrate an iconic goal scored in a championship." },
    { id: 11, cefr: "A2.3", title: "Post-Match Interview", grammar: "Past Simple Questions (Did you expect...? How did...?)", vocab: ["tactics", "momentum", "substitutions"], goal: "Interview a player after an intense victory." },
    { id: 12, cefr: "A2.3", title: "Next Match Predictions", grammar: "Will vs. Going to (They are going to score)", vocab: ["derby", "semifinal", "home advantage", "lineup"], goal: "Predict upcoming match outcomes." },
    { id: 13, cefr: "A2.3", title: "Live Commentary", grammar: "Present Continuous (is dribbling, are pressing)", vocab: ["on the counter", "through ball", "saving the shot"], goal: "Provide live commentary of an ongoing play." },
    { id: 14, cefr: "A2.3", title: "Set-Piece Instructions", grammar: "Imperatives (Hold the wall, watch the post)", vocab: ["wall", "curve the ball", "near post", "clear it"], goal: "Instruct defenders and goalkeeper during a dangerous free kick." },
    { id: 15, cefr: "A2.3", title: "Match Contrast", grammar: "Connectors of Contrast (However, although, but)", vocab: ["conceded", "missed chances", "solid defense"], goal: "Analyze why a team played well but failed to win." },
    { id: 16, cefr: "A2.3", title: "Sequence of Play", grammar: "Sequential Markers (First, then, suddenly, finally)", vocab: ["build-up", "one-two pass", "assist", "tap-in"], goal: "Break down a complex team goal move by move." },
    { id: 17, cefr: "A2.3", title: "VAR & Controversy", grammar: "Past Time Clauses (Before the referee blew, while reviewing)", vocab: ["VAR check", "overruled", "offside line", "handball"], goal: "Discuss a controversial VAR decision." },
    { id: 18, cefr: "B1.1", title: "Season Review", grammar: "Present Perfect (has conceded only 5 goals, have qualified)", vocab: ["unbeaten run", "title race", "clean sheet streak"], goal: "Review a club's overall season performance." },
    { id: 19, cefr: "B1.2", title: "Knockout Strategy", grammar: "First Conditional (If we press high, they will make errors)", vocab: ["away goal", "aggregate score", "extra time"], goal: "Formulate strategies for a decisive second-leg match." },
    { id: 20, cefr: "B1.3", title: "Elite Tactical Systems", grammar: "Second Conditional (If we played with three at the back...)", vocab: ["inverted fullbacks", "low block", "high press", "transitions"], goal: "Debate modern tactical systems with a head coach." }
  ]
};

// 2. ESTADO DE LA APLICACIÓN
const appState = {
  selectedTrack: "sports_training",
  selectedLessonId: 1,
  selectedDurationMinutes: 10,
  secondsRemaining: 600,
  timerInterval: null,
  isPaused: false,
  lessonActive: false,
  currentStep: 1,
  userInteractionsCount: 0,
  conversationHistory: [],

  getProgress() {
    const stored = localStorage.getItem('sports_academy_progress');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return { sports_training: 1, football_soccer: 1 };
  },

  saveProgress(track, nextLessonId) {
    const prog = this.getProgress();
    if (nextLessonId > (prog[track] || 1)) {
      prog[track] = nextLessonId;
      localStorage.setItem('sports_academy_progress', JSON.stringify(prog));
    }
  },

  reset(trackKey, lessonId, durationMins) {
    this.selectedTrack = trackKey;
    this.selectedLessonId = lessonId;
    this.selectedDurationMinutes = durationMins;
    this.secondsRemaining = durationMins * 60;
    this.isPaused = false;
    this.lessonActive = true;
    this.currentStep = 1;
    this.userInteractionsCount = 0;
    this.conversationHistory = [];
    clearInterval(this.timerInterval);
  },

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }
};

// Referencias DOM
const trackSelect = document.getElementById('trackSelect');
const lessonSelect = document.getElementById('lessonSelect');
const durationSelect = document.getElementById('durationSelect');
const startLessonBtn = document.getElementById('startLessonBtn');
const progressStatus = document.getElementById('progressStatus');
const lessonObjective = document.getElementById('lessonObjective');
const levelTag = document.getElementById('levelTag');
const timeRemainingEl = document.getElementById('timeRemaining');
const pauseTimerBtn = document.getElementById('pauseTimerBtn');
const statusIndicator = document.getElementById('statusIndicator');
const chatHistory = document.getElementById('chatHistory');
const toggleMicBtn = document.getElementById('toggleMicBtn');
const micText = document.getElementById('micText');
const assessmentCard = document.getElementById('assessmentCard');
const passBadge = document.getElementById('passBadge');
const scoreFluency = document.getElementById('scoreFluency');
const scoreGrammar = document.getElementById('scoreGrammar');
const scoreVocab = document.getElementById('scoreVocab');
const scoreSummary = document.getElementById('scoreSummary');
const btnNextLesson = document.getElementById('btnNextLesson');
const timeModal = document.getElementById('timeModal');
const btnExtendYes = document.getElementById('btnExtendYes');
const btnExtendNo = document.getElementById('btnExtendNo');
// 3. AVATAR 3D CON TALKINGHEAD
let head = null;
let avatarLoaded = false;

async function initAvatar() {
  const container = document.getElementById('avatar-container');
  statusIndicator.innerText = "Connecting 3D Coach...";

  try {
    head = new TalkingHead(container, {
      ttsEndpoint: "/api/tts",
      cameraView: "head",
      cameraDistance: 0.65,
      cameraRotateEnable: false,
      avatarMood: "neutral",
      lipsyncLang: "en"
    });
    // Carga con URL garantizada desde CDN y porcentaje de progreso en tiempo real
    await head.showAvatar({
      url: "https://met4citizen.github.io/TalkingHead/avatars/brunette.glb",
      body: "M",
      avatarMood: "happy"
    }, (ev) => {
      if (ev.lengthComputable) {
        const percent = Math.round((ev.loaded / ev.total) * 100);
        statusIndicator.innerText = `Loading Avatar: ${percent}%`;
      }
    });

    avatarLoaded = true;
    statusIndicator.innerText = "Ready • Press Start Lesson";
  } catch (error) {
    console.warn("3D Avatar fallback mode:", error);
    statusIndicator.innerText = "Ready • Press Start Lesson (Audio Mode)";
  }
}

window.addEventListener('DOMContentLoaded', initAvatar);
// 4. POBLAR SELECTOR DE LECCIONES
function populateLessonsDropdown() {
  const track = trackSelect.value;
  const progress = appState.getProgress();
  const maxUnlocked = progress[track] || 1;

  lessonSelect.innerHTML = '';
  const list = CURRICULUM[track];

  list.forEach(les => {
    const opt = document.createElement('option');
    opt.value = les.id;
    const isLocked = les.id > maxUnlocked;
    opt.disabled = isLocked;
    opt.innerText = `${isLocked ? '🔒 ' : '✅ '}L${les.id}: ${les.title} (${les.cefr})`;
    if (les.id === maxUnlocked) opt.selected = true;
    lessonSelect.appendChild(opt);
  });

  progressStatus.innerText = `Progress: ${maxUnlocked}/20 Unlocked`;
  updateLessonObjectivePreview();
}

function updateLessonObjectivePreview() {
  const track = trackSelect.value;
  const id = parseInt(lessonSelect.value, 10) || 1;
  const lesson = CURRICULUM[track].find(l => l.id === id);
  if (lesson) {
    levelTag.innerText = `${lesson.cefr} Level`;
    lessonObjective.innerHTML = `<strong>Goal (L${lesson.id}):</strong> ${lesson.goal} <br><span style="color:var(--text-muted); font-size:12px;">Grammar: ${lesson.grammar}</span>`;
  }
}

trackSelect.addEventListener('change', populateLessonsDropdown);
lessonSelect.addEventListener('change', updateLessonObjectivePreview);
populateLessonsDropdown();

// 5. TIMER & PAUSA
function startTimer() {
  clearInterval(appState.timerInterval);
  updateTimerUI();
  pauseTimerBtn.disabled = false;
  pauseTimerBtn.innerText = "⏸️ Pause";
  pauseTimerBtn.classList.remove('paused');
  appState.isPaused = false;

  appState.timerInterval = setInterval(() => {
    if (!appState.isPaused) {
      if (appState.secondsRemaining > 0) {
        appState.secondsRemaining--;
        updateTimerUI();
      } else {
        clearInterval(appState.timerInterval);
        handleTimeExpired();
      }
    }
  }, 1000);
}

function updateTimerUI() {
  const mins = Math.floor(appState.secondsRemaining / 60);
  const secs = appState.secondsRemaining % 60;
  timeRemainingEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

pauseTimerBtn.addEventListener('click', () => {
  if (!appState.lessonActive) return;
  appState.isPaused = !appState.isPaused;
  if (appState.isPaused) {
    pauseTimerBtn.innerText = "▶️ Resume";
    pauseTimerBtn.classList.add('paused');
    statusIndicator.innerText = "Session Paused";
    if (isListening && recognition) recognition.stop();
    window.speechSynthesis.cancel();
    if (head && head.stopSpeaking) head.stopSpeaking();
  } else {
    pauseTimerBtn.innerText = "⏸️ Pause";
    pauseTimerBtn.classList.remove('paused');
    statusIndicator.innerText = "Session Resumed • Tap Mic to Speak";
    startListeningAuto();
  }
});

function handleTimeExpired() {
  if (appState.currentStep < 4) {
    timeModal.style.display = 'flex';
  }
}

btnExtendYes.addEventListener('click', () => {
  timeModal.style.display = 'none';
  appState.secondsRemaining = 300;
  startTimer();
});

btnExtendNo.addEventListener('click', () => {
  timeModal.style.display = 'none';
  forceAssessment();
});

// 6. CHAT FEED & RENDER
function appendChatBubble(role, text, tip = null, explanation = null) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;

  const author = document.createElement('div');
  author.className = 'bubble-author';
  author.innerText = role === 'tutor' ? 'AI Coach' : 'You';
  bubble.appendChild(author);

  const content = document.createElement('div');
  content.innerText = text;
  bubble.appendChild(content);

  if (explanation) {
    const expEl = document.createElement('div');
    expEl.className = 'lesson-explanation-box';
    expEl.innerHTML = `📚 <strong>Quick Rule Check:</strong> ${explanation}`;
    bubble.appendChild(expEl);
  }

  if (tip) {
    const tipEl = document.createElement('div');
    tipEl.className = 'feedback-chip';
    tipEl.innerHTML = `💡 <strong>Coach Tip:</strong> ${tip}`;
    bubble.appendChild(tipEl);
  }

  chatHistory.appendChild(bubble);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 7. SYSTEM PROMPT
function buildSystemPrompt() {
  const track = appState.selectedTrack;
  const lesson = CURRICULUM[track].find(l => l.id === appState.selectedLessonId);
  const isEveryFiveTurns = (appState.userInteractionsCount > 0 && appState.userInteractionsCount % 5 === 0);

  const baseInstructions = `You are an authentic, energetic AI Sports Coach & English Conversation Partner for CEFR ${lesson.cefr} learners.
Current Topic: "${lesson.title}"
Grammar Goal: ${lesson.grammar}
Target Vocabulary: ${lesson.vocab.join(", ")}
Mission: ${lesson.goal}

NATURAL CONVERSATION RULES:
1. NO PARROTING / NO ECHOING: NEVER repeat the learner's exact sentence back to them. React naturally like a real sports coach.
2. CONVERSATIONAL RHYTHM: Speak like a real human coach. Use transitions ("Nice," "Fair enough," "Good call," "Makes total sense"). Share a quick 1-sentence thought and ask an open-ended question.
3. SPEECH-TO-TEXT NOISE: The student speaks through browser voice recognition. Audio glitches are STT artifacts; understand their intended meaning effortlessly without commenting on the glitch.
4. PEDAGOGICAL FEEDBACK: Keep the conversation in "spoken_response" 100% natural. Put any grammar or wording correction strictly inside "pedagogical_tip" (max 15 words).
5. MICRO-TEACHING DIRECTIVE (Turn #${appState.userInteractionsCount}):
${isEveryFiveTurns ? `-> MANDATORY: In "grammar_explanation", write 1 clear sentence explaining "${lesson.grammar}". Then, in "spoken_response", ask a question directly inviting them to try that specific pattern.` : `-> Set "grammar_explanation": null`}`;

  let stepDirectives = "";
  if (appState.currentStep === 1) {
    stepDirectives = `PHASE: CASUAL WARM-UP
- Start the dialogue naturally as a coach catching up with an athlete.
- Ask an open, engaging question about habits using simple ${lesson.cefr} English.
- Advance step ("advance_step": true) when they respond.`;
  } else if (appState.currentStep === 2) {
    stepDirectives = `PHASE: GUIDED DRILL
- Pose a situational question that naturally requires them to use "${lesson.grammar}" and target words (${lesson.vocab.slice(0, 2).join(", ")}).
- If good, set "advance_step": true.`;
  } else if (appState.currentStep === 3) {
    stepDirectives = `PHASE: LIVE IMMERSIVE ROLEPLAY
- Act out the scenario dynamically: ${track === 'sports_training' ? 'Coach guiding a player through a crucial workout session' : 'Live post-match interview in the stadium tunnel'}.
- After completing the exchange, set "advance_step": true.`;
  } else {
    stepDirectives = `PHASE: FINAL ASSESSMENT
- Close the practice naturally with encouraging coach remarks.
- Set "is_lesson_finished": true.
- Populate the "assessment_card" JSON with realistic scores for ${lesson.cefr}.`;
  }

  const jsonSchema = `Respond STRICTLY in valid JSON:
{
  "spoken_response": "1-2 natural spoken sentences with a real reaction + follow-up question. NO echoing.",
  "pedagogical_tip": "Constructive grammar tip (max 15 words) or praise.",
  "grammar_explanation": ${isEveryFiveTurns ? '"Short 1-sentence explanation of grammar rule"' : 'null'},
  "advance_step": true or false,
  "is_lesson_finished": true or false,
  "assessment_card": {
    "passed": true,
    "fluency_score": 8,
    "grammar_score": 7,
    "vocab_score": 8,
    "summary": "2-sentence encouraging closing feedback."
  }
}`;

  return `${baseInstructions}\n\n${stepDirectives}\n\n${jsonSchema}`;
}

function cleanSTTNoise(transcript) {
  if (!transcript) return "";
  let cleaned = transcript.trim();
  cleaned = cleaned.replace(/^(re you|are you|or you|you|oh)\s+(?=i\s+|stretch|train|warm|play|go)/i, "");
  cleaned = cleaned.replace(/\bi\b/g, "I");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

// 8. LLAMADA AL BACKEND PROXY (SEGURO)
async function callAITutor(userInput = null) {
  const endpoint = "/api/chat";

  if (userInput) {
    appState.conversationHistory.push({ role: "user", content: userInput });
  }

  const payload = {
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: buildSystemPrompt() },
      ...appState.conversationHistory
    ],
    response_format: { type: "json_object" },
    temperature: 0.5
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const parsed = JSON.parse(data.choices[0].message.content);

  appState.conversationHistory.push({ role: "assistant", content: parsed.spoken_response });

  if (parsed.advance_step && appState.currentStep < 4) {
    appState.nextStep();
  }

  return parsed;
}

// 9. MICRÓFONO
let micStream = null;
async function initMicrophonePermission() {
  try {
    if (!micStream) {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    return true;
  } catch (err) {
    console.warn("Microphone access denied:", err);
    return false;
  }
}

// 10. INICIO DE LECCIÓN
async function startLesson() {
  const track = trackSelect.value;
  const lessonId = parseInt(lessonSelect.value, 10);
  const durationMins = parseInt(durationSelect.value, 10);

  await initMicrophonePermission();

  appState.reset(track, lessonId, durationMins);
  assessmentCard.style.display = 'none';
  chatHistory.innerHTML = '';
  updateLessonObjectivePreview();

  statusIndicator.innerText = "Coach is connecting...";
  startTimer();

  toggleMicBtn.disabled = false;
  micText.innerText = "Listening...";

  try {
    const result = await callAITutor(null);
    appendChatBubble('tutor', result.spoken_response, result.pedagogical_tip, result.grammar_explanation);
    speakText(result.spoken_response);
  } catch (err) {
    console.error(err);
    statusIndicator.innerText = "Error starting session. Try again.";
  }
}

startLessonBtn.addEventListener('click', startLesson);

// 11. PROCESAMIENTO DE VOZ
async function processUserSpeech(rawTranscript) {
  if (appState.isPaused) return;

  const transcript = cleanSTTNoise(rawTranscript);
  if (!transcript) return;

  appState.userInteractionsCount++;
  appendChatBubble('user', transcript);
  statusIndicator.innerText = 'Analyzing syntax & sports diction...';

  try {
    const result = await callAITutor(transcript);
    appendChatBubble('tutor', result.spoken_response, result.pedagogical_tip, result.grammar_explanation);

    if (result.is_lesson_finished || (result.assessment_card && appState.currentStep === 4)) {
      handleLessonCompletion(result.assessment_card);
    }

    speakText(result.spoken_response);
  } catch (error) {
    console.error("AI Error:", error);
    appendChatBubble('tutor', "I had a connection glitch. Could you please repeat that?");
    speakText("I had a connection glitch. Could you please repeat that?");
    resetMic();
  }
}

function handleLessonCompletion(card) {
  if (!card) return;
  const avg = ((card.fluency_score + card.grammar_score + card.vocab_score) / 3).toFixed(1);
  const passed = avg >= 7.0;

  scoreFluency.innerText = `${card.fluency_score || 7}/10`;
  scoreGrammar.innerText = `${card.grammar_score || 7}/10`;
  scoreVocab.innerText = `${card.vocab_score || 8}/10`;
  scoreSummary.innerText = card.summary || "Lesson finished!";

  if (passed) {
    passBadge.className = "pass-tag passed";
    passBadge.innerText = `PASSED (Avg: ${avg})`;
    const nextId = appState.selectedLessonId + 1;
    if (nextId <= 20) {
      appState.saveProgress(appState.selectedTrack, nextId);
      populateLessonsDropdown();
      btnNextLesson.style.display = 'block';
      btnNextLesson.onclick = () => {
        lessonSelect.value = nextId;
        startLesson();
      };
    } else {
      btnNextLesson.style.display = 'none';
      scoreSummary.innerText += " 🏆 Congratulations! You completed all 20 lessons!";
    }
  } else {
    passBadge.className = "pass-tag failed";
    passBadge.innerText = `RETRY NEEDED (Avg: ${avg})`;
    btnNextLesson.style.display = 'none';
  }

  assessmentCard.style.display = 'block';
  clearInterval(appState.timerInterval);
}

async function forceAssessment() {
  appState.currentStep = 4;
  statusIndicator.innerText = "Evaluating final speaking score...";
  try {
    const result = await callAITutor("Time expired. Provide the official final exam scorecard.");
    appendChatBubble('tutor', result.spoken_response, result.pedagogical_tip);
    handleLessonCompletion(result.assessment_card);
    speakText(result.spoken_response);
  } catch (e) {
    console.error(e);
  }
}

// 12. RECONOCIMIENTO Y SÍNTESIS DE VOZ CON AVATAR 3D
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let isListening = false;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onstart = () => {
    if (appState.isPaused) {
      recognition.stop();
      return;
    }
    isListening = true;
    statusIndicator.innerText = 'Listening to your voice...';
    micText.innerText = 'Listening...';
    toggleMicBtn.classList.add('active');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    processUserSpeech(transcript);
  };

  recognition.onerror = (e) => {
    if (e.error !== 'no-speech') {
      console.error("Speech Error:", e);
      statusIndicator.innerText = 'Audio capture error. Tap mic again.';
    }
    resetMic();
  };

  recognition.onend = () => {
    resetMic();
  };
}

function toggleRecording() {
  if (!recognition || !appState.lessonActive || appState.isPaused) return;
  if (!isListening) {
    recognition.start();
  } else {
    recognition.stop();
    resetMic();
  }
}

function startListeningAuto() {
  if (!recognition || !appState.lessonActive || appState.isPaused || isListening) return;
  try {
    recognition.start();
  } catch (e) {}
}

function resetMic() {
  isListening = false;
  statusIndicator.innerText = appState.isPaused ? 'Session Paused' : 'Ready • Tap or Speak';
  micText.innerText = 'Start Speaking';
  toggleMicBtn.classList.remove('active');
}

function speakText(text) {
  statusIndicator.innerText = 'Coach is speaking...';

  // Si el avatar 3D está cargado, él sincroniza labios y audio
  if (head && avatarLoaded) {
    try {
      head.speakText(text, {
        rate: 0.95,
        onEnd: () => {
          resetMic();
          if (appState.lessonActive && !appState.isPaused && appState.currentStep < 4) {
            setTimeout(startListeningAuto, 400);
          }
        }
      });
      return;
    } catch (err) {
      console.warn("Avatar TTS error:", err);
    }
  }

  // Fallback nativo
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.94;
  utterance.onend = () => {
    resetMic();
    if (appState.lessonActive && !appState.isPaused && appState.currentStep < 4) {
      setTimeout(startListeningAuto, 400);
    }
  };
  window.speechSynthesis.speak(utterance);
}

toggleMicBtn.addEventListener('click', toggleRecording);