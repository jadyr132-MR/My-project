// ==========================================================================
// 1. CONFIGURACIÓN E INICIALIZACIÓN DE FIREBASE
// ==========================================================================
const firebaseConfig = {
    apiKey: "AIzaSyDR4ndz8lznxVBlYoxRcM8GpDCVu4lOD0A",
    authDomain: "my-personal-proyect-22b35.firebaseapp.com",
    projectId: "my-personal-proyect-22b35",
    storageBucket: "my-personal-proyect-22b35.firebasestorage.app",
    messagingSenderId: "847312630186",
    appId: "1:847312630186:web:027198580a397c52dffbd3",
    measurementId: "G-EB8YJS6PJ8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let currentRole = 'guest';
let currentTrainee = null;

// Datos de prueba iniciales para gestión de aprendices
function initDefaultData() {
    if (!localStorage.getItem('mrjad_students')) {
        const sampleStudents = [
            { id: '1098765432', name: 'Carlos Mendoza', module: 'Entrenamiento Deportivo (Sports Training)' },
            { id: '1098765433', name: 'Laura Gómez', module: 'Administración en Salud' }
        ];
        localStorage.setItem('mrjad_students', JSON.stringify(sampleStudents));
    }
}
initDefaultData();

// ==========================================================================
// 2. CONTROL DE VISTAS Y MODALES
// ==========================================================================
function showWelcomeScreen() {
    document.getElementById('welcome-screen').classList.remove('hidden');
}

function hideWelcomeScreen() {
    document.getElementById('welcome-screen').classList.add('hidden');
}

function openModal(modalId) {
    if (modalId === 'modal-register') resetRegistrationModal();
    if (modalId === 'modal-forgot-password') resetForgotModal();
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    openModal(openId);
}

function openResetPasswordModal(sourceModalId) {
    closeModal(sourceModalId);
    openModal('modal-forgot-password');
}

function handleOutsideModalClick(e, modalId) {
    if (e.target.id === modalId) closeModal(modalId);
}

function resetRegistrationModal() {
    document.getElementById('registrationForm').classList.remove('hidden');
    document.getElementById('registrationStatus').classList.remove('active');
    document.getElementById('registrationStatus').innerHTML = '';
}

function resetForgotModal() {
    document.getElementById('resetPasswordForm').classList.remove('hidden');
    document.getElementById('resetStatus').classList.remove('active');
    document.getElementById('resetStatus').innerHTML = '';
}

// ==========================================================================
// 3. AUTENTICACIÓN Y SERVICIOS CON FIREBASE
// ==========================================================================

// Registro con confirmación por correo electrónico
async function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const role = document.getElementById('registerRole').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    const status = document.getElementById('registrationStatus');

    if (password !== passwordConfirm) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.updateProfile({
            displayName: `${name} | ${role}`
        });

        await user.sendEmailVerification();

        document.getElementById('registrationForm').classList.add('hidden');
        status.innerHTML = `
            <strong>Verification email dispatched!</strong>
            We sent a confirmation link to <strong>${email}</strong>.<br><br>
            Please check your inbox or spam folder and verify your address to activate your ${role} account.
        `;
        status.classList.add('active');

    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('This email address is already registered.');
        } else if (error.code === 'auth/weak-password') {
            alert('Password should be at least 6 characters.');
        } else if (error.code === 'auth/invalid-email') {
            alert('Please enter a valid email address.');
        } else {
            alert('Registration error: ' + error.message);
        }
    }
}

// Inicio de sesión de Instructor (Email y Contraseña)
async function handleInstructorLogin(e) {
    e.preventDefault();
    const email = document.getElementById('instUser').value.trim();
    const password = document.getElementById('instPass').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            alert('Please verify your email address before signing in. Check your inbox.');
            await auth.signOut();
            return;
        }

        const profileInfo = (user.displayName || '').split('|');
        const name = profileInfo[0]?.trim() || 'Instructor';

        currentRole = 'instructor';
        updateNavRole(`Instructor: ${name}`);
        closeModal('modal-instructor');
        setSidebarVisibility();
        hideWelcomeScreen();
        switchView('view-instructor');
    } catch (error) {
        alert('Sign in failed: Incorrect email or password.');
    }
}

// Inicio de sesión de Aprendiz (Email y Contraseña)
async function handleTraineeLogin(e) {
    e.preventDefault();
    const email = document.getElementById('traineeUser').value.trim();
    const password = document.getElementById('traineePass').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            alert('Please verify your email address before signing in. Check your inbox.');
            await auth.signOut();
            return;
        }

        const profileInfo = (user.displayName || '').split('|');
        const name = profileInfo[0]?.trim() || 'Trainee';

        currentRole = 'trainee';
        currentTrainee = {
            name: name,
            id: user.uid.substring(0, 8).toUpperCase(),
            module: 'Entrenamiento Deportivo (Sports Training)'
        };

        updateNavRole(`Trainee: ${name}`);
        closeModal('modal-trainee');
        setSidebarVisibility();
        loadTraineeData();
        hideWelcomeScreen();
        switchView('view-trainee');
    } catch (error) {
        alert('Sign in failed: Incorrect email or password.');
    }
}

// Recuperación de contraseña por correo
async function handlePasswordReset(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value.trim().toLowerCase();
    const status = document.getElementById('resetStatus');

    try {
        await auth.sendPasswordResetEmail(email);
        document.getElementById('resetPasswordForm').classList.add('hidden');
        status.innerHTML = `
            <strong>Reset link sent!</strong>
            Instructions to reset your password have been sent to <strong>${email}</strong>. Check your inbox to proceed.
        `;
        status.classList.add('active');
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            alert('No registered account found with that email address.');
        } else if (error.code === 'auth/invalid-email') {
            alert('Please provide a valid email format.');
        } else {
            alert('Error: ' + error.message);
        }
    }
}

// ==========================================================================
// 4. LÓGICA DE ROLES Y NAVEGACIÓN EN EL DASHBOARD
// ==========================================================================
function loginAsGuest() {
    currentRole = 'guest';
    updateNavRole('Mode: Demo');
    setSidebarVisibility();
    hideWelcomeScreen();
    switchView('view-modules');
}

function updateNavRole(text) {
    document.getElementById('navRoleBadge').innerText = text;
}

function setSidebarVisibility() {
    const btnInst = document.getElementById('btn-side-instructor');
    const btnRes = document.getElementById('btn-side-resources');
    const btnTra = document.getElementById('btn-side-trainee');

    if (currentRole === 'guest') {
        btnInst.style.display = 'none';
        btnRes.style.display = 'none';
        btnTra.style.display = 'block';
    } else if (currentRole === 'instructor') {
        btnInst.style.display = 'block';
        btnRes.style.display = 'block';
        btnTra.style.display = 'none';
    } else if (currentRole === 'trainee') {
        btnInst.style.display = 'none';
        btnRes.style.display = 'none';
        btnTra.style.display = 'block';
    }
}

function loadTraineeData() {
    if (!currentTrainee) return;
    document.getElementById('traineeDisplayName').innerText = currentTrainee.name;
    document.getElementById('traineeDisplayId').innerText = currentTrainee.id;
    document.getElementById('traineeActiveModule').innerHTML = `Assigned Module: <span style="color:var(--accent-mint);">${currentTrainee.module}</span>`;
    
    const completed = 1;
    const total = 3;
    const pct = ((completed / total) * 100).toFixed(1);
    const remainingPct = (100 - pct).toFixed(1);

    document.getElementById('progressPercentage').innerText = `${pct}%`;
    document.getElementById('progressRemainingText').innerText = `You have ${remainingPct}% remaining to complete your program`;
    document.getElementById('progressBarFill').style.width = `${pct}%`;
}

function switchView(viewId) {
    document.querySelectorAll('.view-panel').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');

    const headings = {
        'view-modules': 'Technical English | Sports Training Cohort',
        'view-instructor': 'Instructor Panel | Trainee Management',
        'view-resources': 'Teacher Resources | Assessment Material',
        'view-trainee': 'Trainee Portal | Assignments & Gradebook'
    };
    document.getElementById('page-heading').innerText = headings[viewId] || 'Mr. Jad ESL';

    if (viewId === 'view-modules') document.getElementById('btn-side-modules').classList.add('active');
    if (viewId === 'view-instructor') {
        document.getElementById('btn-side-instructor').classList.add('active');
        renderStudentTable();
    }
    if (viewId === 'view-resources') {
        document.getElementById('btn-side-resources').classList.add('active');
        renderResourceFiles();
    }
    if (viewId === 'view-trainee') {
        document.getElementById('btn-side-trainee').classList.add('active');
        if (!currentTrainee) {
            currentTrainee = { name: 'Demo Trainee', id: '00000000', module: 'Entrenamiento Deportivo (Sports Training)' };
        }
        loadTraineeData();
    }
}

// ==========================================================================
// 5. GESTIÓN DE APRENDICES (LOCALSTORAGE)
// ==========================================================================
function getStoredStudents() {
    return JSON.parse(localStorage.getItem('mrjad_students') || '[]');
}

function handleRegisterStudent(e) {
    e.preventDefault();
    const list = getStoredStudents();
    list.push({
        name: document.getElementById('regName').value.trim(),
        id: document.getElementById('regId').value.trim(),
        module: document.getElementById('regModule').value
    });
    localStorage.setItem('mrjad_students', JSON.stringify(list));
    document.getElementById('studentForm').reset();
    renderStudentTable();
}

function removeStudent(index) {
    const list = getStoredStudents();
    list.splice(index, 1);
    localStorage.setItem('mrjad_students', JSON.stringify(list));
    renderStudentTable();
}

function renderStudentTable() {
    const list = getStoredStudents();
    const tbody = document.getElementById('studentTableBody');
    if (!list.length) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#94A3B8; padding:20px;">No registered trainees.</td></tr>';
        return;
    }
    tbody.innerHTML = list.map((s, idx) => `
        <tr>
            <td><strong>${s.id}</strong></td>
            <td>${s.name}</td>
            <td><span class="badge" style="background:#EEF2FF; color:var(--primary-indigo); font-weight:700;">${s.module}</span></td>
            <td><button onclick="removeStudent(${idx})" style="color:#DC2626; background:none; border:none; cursor:pointer; font-weight:700;">Delete</button></td>
        </tr>
    `).join('');
}

// ==========================================================================
// 6. RECURSOS DOCENTES Y DESCARGAS
// ==========================================================================
const courseResources = {
    sports: [
        { title: "Unit 1: Strength Coaching Terminology Assessment", file: "Unit1_Strength_Quiz" },
        { title: "Unit 2: Soccer Listening Assessment & Technical Decisions", file: "Soccer_VAR_Listening_Exam" }
    ],
    health: [
        { title: "Unit 1: Hospital Intake & Patient Records Questionnaire", file: "Hospital_Intake_Exam" }
    ],
    software: [
        { title: "Unit 1: Technical Requirement Gathering & SCRUM Quiz", file: "Software_Req_Quiz" }
    ]
};

function downloadWordDoc(title) {
    const content = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>${title}</title></head><body><h2>Mr. Jad ESL - EVALUATION</h2><h3>${title}</h3><p><strong>Student Name:</strong> ______________________ <strong>Date:</strong> _________</p><hr/><p>Complete the following questions based on technical class sessions:</p><ol><li>Technical vocabulary application...</li><li>Scenario analysis and decision...</li></ol></body></html>`;
    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.doc`;
    a.click();
    URL.revokeObjectURL(url);
}
function renderResourceFiles() {
    const mod = document.getElementById('resModuleSelect').value;
    const items = courseResources[mod] || [];
    const container = document.getElementById('resourcesListContainer');

    container.innerHTML = items.map(item => `
        <div class="res-item">
            <div>
                <strong>${item.title}</strong>
                <div style="font-size: 12px; color: #64748B; margin-top:2px;">Print-ready assessment guide for in-person evaluations.</div>
            </div>
            <div class="res-buttons">
                <a href="../Soccer_Listening_Assessment.pdf" target="_blank" rel="noopener noreferrer" class="btn-pdf">Open PDF</a>
                <button onclick="downloadWordDoc('${item.title}')" class="btn-word">Download Word (.doc)</button>
            </div>
        </div>
    `).join('');
}