const output = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const inputLine = document.getElementById('input-line');
const keypressSound = document.getElementById('keypress-sound');

let currentState = 'loading';
const PASSWORD = 'ILOVEYOU';

// Matrix Rain Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
        drops[i]++;
    }
}
setInterval(drawMatrix, 30);

async function simulateLoading() {
    const progressBar = document.getElementById('boot-progress');
    const loadingText = document.getElementById('loading-text');

    const steps = [
        { progress: 20, text: 'Loading kernel...', delay: 500 },
        { progress: 50, text: 'Mounting memory files...', delay: 800 },
        { progress: 75, text: 'Bypassing security protocols...', delay: 600 },
        { progress: 100, text: 'System ready.', delay: 400 }
    ];

    for (const step of steps) {
        progressBar.style.width = step.progress + '%';
        loadingText.innerText = step.text;
        await new Promise(resolve => setTimeout(resolve, step.delay));
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    document.getElementById('loading-screen').classList.remove('active');
    document.getElementById('terminal').classList.remove('hidden');
    updateBackground('assets/images/photo1.jpg'); // Set initial background
    currentState = 'login';
    showSequence(messages.login);
}

const ASCII_ART = `
██████╗ ███████╗███████╗
██╔══██╗██╔════╝██╔════╝
██████╔╝█████╗  █████╗  
██╔══██╗██╔══╝  ██╔══╝  
██████╔╝███████╗███████╗
╚═════╝ ╚══════╝╚══════╝
`;

const messages = {
    login: [
        `<div class="ascii-art" style="white-space: pre; font-family: monospace; color: var(--text-color); text-shadow: 0 0 5px var(--glow-color); line-height: 1.2;">${ASCII_ART}</div>`,
        "MENGIKUTI AKSES SISTEM RAHASIA...",
        "MEMUAT FILE MEMORI...",
        "SELAMAT DATANG DI SERVER ULANG TAHUN RAHASIA",
        "MASUKKAN KATA SANDI UNTUK MELANJUTKAN"
    ],
    granted: [
        "AKSES DIIZINKAN",
        "SELAMAT DATANG DI FILE RAHASIA",
        "MENDETEKSI TANGGAL ISTIMEWA..."
    ],
    denied: [
        "AKSES DITOLAK",
        "COBA LAGI"
    ],
    scanner: [
        "SCANNING HEART...",
        "ANALYZING EMOTIONS...",
        "LOVE LEVEL: 100%",
        "STATUS: FOREVER",
        "MEMBUKA LOVE DATABASE..."
    ],
    databaseMenu: [
        "LOVE DATABASE",
        "",
        "[1] FIRST DATE",
        "[2] BEST MOMENTS",
        "[3] FAVORITE MEMORIES",
        "[4] SECRET MESSAGE",
        "[5] SECRET MISSIONS",
        "",
        "PILIH NOMOR FILE (1-5):"
    ]
};

// Days together counter (e.g. from an arbitrary date like Jan 1, 2023)
const startDate = new Date("January 17, 2026 00:00:00").getTime();
function getDaysTogether() {
    return Math.floor((new Date().getTime() - startDate) / (1000 * 60 * 60 * 24));
}

async function typeWriter(text, speed = 50) {
    const p = document.createElement('div');
    output.appendChild(p);

    if (text.startsWith('<') && text.endsWith('>')) {
        p.innerHTML = text;
        output.scrollTop = output.scrollHeight;
        return;
    }

    for (let i = 0; i < text.length; i++) {
        p.textContent += text.charAt(i);
        try {
            keypressSound.currentTime = 0;
            keypressSound.play().catch(() => { });
        } catch (e) { }
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    output.scrollTop = output.scrollHeight;
}

async function showSequence(sequence) {
    inputLine.classList.add('hidden');
    for (const line of sequence) {
        await typeWriter(line);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (currentState === 'login' || currentState === 'denied' || currentState === 'database_menu') {
        inputLine.classList.remove('hidden');
        commandInput.type = "text";
        commandInput.focus();
    }
}


async function proceedToCountdown() {
    await showSequence(messages.granted);
    // Transition to Countdown UI here
    await typeWriter("MENGHITUNG MUNDUR MENUJU KEJUTAN...");
    startCountdown();
}

function startCountdown() {
    // Placeholder for countdown logic
    output.innerHTML += '<div id="countdown-timer"></div>';
    const timerDiv = document.getElementById('countdown-timer');

    // Set target date (e.g., 2026-03-22)
    const targetDate = new Date("March 10, 2026 00:00:00").getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDiv.innerHTML = `
            <div class="countdown-item">BIRTHDAY UNLOCK IN</div>
            <div class="countdown-time">${days} HARI ${hours} JAM ${minutes} MENIT ${seconds} DETIK</div>
        `;

        if (distance < 0) {
            clearInterval(interval);
            timerDiv.innerHTML = `
                <div class="days-together">BERSAMA SELAMA: ${getDaysTogether()} HARI</div>
                <button id="unlock-btn">BUKA KEJUTAN</button>
            `;
            document.getElementById('unlock-btn').addEventListener('click', startScanner);
        }
    }, 1000);
}

// Extended Modules state handling
async function startScanner() {
    output.innerHTML = '';
    inputLine.classList.add('hidden');
    currentState = 'scanning';

    // Simulate Love Meter Scanner
    for (const msg of messages.scanner) {
        if (msg.includes("100%")) {
            // make text blink or look special
            const div = document.createElement('div');
            div.className = 'glitch';
            div.dataset.text = msg;
            div.textContent = msg;
            output.appendChild(div);
        } else {
            await typeWriter(msg);
        }
        await new Promise(resolve => setTimeout(resolve, 800));
    }

    setTimeout(showDatabaseMenu, 1000);
}

async function showDatabaseMenu() {
    output.innerHTML = '';
    currentState = 'database_menu';
    await showSequence(messages.databaseMenu);
}

const missions = [
    {
        question: "MISI 1: DI MANA KITA PERTAMA KALI BERTEMU?",
        answer: "SEKOLAH",
        memory: "assets/images/5.jpg"
    },
    {
        question: "MISI 2: APA MAKANAN FAVORIT KITA BERDUA?",
        answer: "SATE",
        memory: "assets/images/memory2.jpg"
    }
];

let currentMissionIndex = 0;

function handleInput(e) {
    if (e.key === 'Enter') {
        const input = commandInput.value.toUpperCase().trim();
        commandInput.value = '';

        if (input === 'CLEAR') {
            output.innerHTML = '';
            inputLine.classList.remove('hidden');
            return;
        }

        if (currentState === 'login' || currentState === 'denied') {
            if (input === PASSWORD) {
                currentState = 'granted';
                proceedToCountdown();
            } else if (input === 'HELP') {
                typeWriter("COMMANDS: HELP, CLEAR, HINT");
            } else if (input === 'HINT') {
                typeWriter("HINT: KATA AJAIB UNTUK MENGUNGKAPKAN PERASAAN KITA (TANPA SPASI)");
            } else {
                currentState = 'denied';
                showSequence(messages.denied);
            }
        } else if (currentState === 'database_menu') {
            handleDatabaseSelection(input);
        } else if (currentState === 'reading_database') {
            // press any key (mapped to enter here) to go back to menu
            showDatabaseMenu();
        } else if (currentState.startsWith('mission')) {
            checkMissionAnswer(input);
        }
    }
}

let databaseCompletion = { 1: false, 2: false, 3: false };

function updateBackground(src) {
    const bg = document.getElementById('dynamic-bg');
    if (src) {
        bg.style.backgroundImage = `url('${src}')`;
        bg.style.opacity = "0.4";
    } else {
        bg.style.backgroundImage = 'none';
    }
}

async function handleDatabaseSelection(choice) {
    currentState = 'reading_database';
    output.innerHTML = '';

    if (choice === '1' || choice === '2' || choice === '3') {
        databaseCompletion[choice] = true;
        const memoryIndex = parseInt(choice) - 1;

        // Show simulated memory decrypt
        await typeWriter(`ACCESSING FILE [${choice}]...`);
        output.innerHTML += '<div class="progress-container progress-inline"><div class="progress-bar" id="decrypt-progress"></div></div>';
        const pBar = document.getElementById('decrypt-progress');
        for (let i = 0; i <= 100; i += 20) {
            pBar.style.width = i + '%';
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        await typeWriter("DEKRIPSI SELESAI.");

        const photoArr = ['5.jpeg', '2.jpeg', 'memory2.jpeg'];
        const photoSrc = `assets/images/${photoArr[memoryIndex]}`;
        updateBackground(photoSrc);
        await showMemory(photoSrc);
        await typeWriter("\n-- TEKAN ENTER UNTUK KEMBALI KE MENU --\n");
    } else if (choice === '4') {
        await showSecretMessage();
    } else if (choice === '5') {
        startMissions();
    } else {
        await typeWriter("INVALID SELECTION. RETURNING TO MENU...");
        setTimeout(showDatabaseMenu, 1500);
    }
}

async function showSecretMessage() {
    output.innerHTML = '';
    document.body.classList.add('romantic');

    await typeWriter("SYSTEM MESSAGE:", 100);
    await typeWriter("SELAMAT ULANG TAHUN SAYANG ❤️", 100);
    await typeWriter("TERIMA KASIH TELAH DATANG KE HIDUPKU", 50);
    await typeWriter("KAMU ADALAH MEMORI TERBAIKKU", 50);
    await typeWriter("DAN MASA DEPANKU YANG PALING INDAH", 50);

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    updateBackground('assets/images/3.jpeg'); // Set a nice romantic background
    const bg = document.getElementById('dynamic-bg');
    bg.style.opacity = "0.6";
    bg.style.filter = "blur(3px) brightness(0.7)";

    // Play "Tunggal Eka" from the chorus (approx. 1:20 or 80 seconds in)
    try {
        const music = document.getElementById('romantic-music');
        music.src = "assets/sounds/DENNY CAKNAN - TUNGGAL EKA  (Official Music Video) (320).mp3";
        music.currentTime = 80; // Start at the reff/chorus
        music.volume = 0.5;
        music.play().catch(() => { });
    } catch (e) { }

    createFloatingHearts();
    showFinalGallery();

    await typeWriter("\n-- TEKAN ENTER UNTUK KEMBALI KE MENU --\n");
    currentState = 'reading_database';
}

async function checkMissionAnswer(answer) {
    const mission = missions[currentMissionIndex];
    if (answer === mission.answer) {
        await typeWriter("MISI BERHASIL!");
        await typeWriter("MENGAKSES FILE MEMORI...");

        // Fake progress bar
        output.innerHTML += '<div class="progress-container progress-inline"><div class="progress-bar" id="decrypt-progress"></div></div>';
        const pBar = document.getElementById('decrypt-progress');
        for (let i = 0; i <= 100; i += 20) {
            pBar.style.width = i + '%';
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        await typeWriter("DEKRIPSI SELESAI.");

        await showMemory(mission.memory);

        currentMissionIndex++;
        if (currentMissionIndex < missions.length) {
            setTimeout(() => {
                startNextMission();
            }, 3000);
        } else {
            typeWriter("SEMUA MISI SELESAI! MENGAKSES VIDEO RAHASIA...");
            setTimeout(() => {
                showMissionVideo();
            }, 3000);
        }
    } else {
        await typeWriter("AKSES DITOLAK. DATA SALAH.");
    }
}

async function showMemory(src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'memory-photo fade-in decrypting';
    img.alt = "Kenangan";
    output.appendChild(img);
    output.scrollTop = output.scrollHeight;

    // Remove decrypting effect after delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    img.classList.remove('decrypting');
}
function startNextMission() {
    const nextMission = missions[currentMissionIndex];
    currentState = `mission${currentMissionIndex + 1}`;
    typeWriter(nextMission.question);
}

function startMissions() {
    output.innerHTML = '';

    // Clear the countdown interval if it's still running
    // and make sure we remove the input hidden class
    inputLine.classList.remove('hidden');
    commandInput.type = "text";
    commandInput.focus();

    currentState = 'mission1';
    currentMissionIndex = 0;
    typeWriter(missions[currentMissionIndex].question);
}

async function showMissionVideo() {
    output.innerHTML = '';

    const videoDiv = document.createElement('div');
    videoDiv.className = 'video-container';
    videoDiv.innerHTML = `
        <video controls autoplay width="100%">
            <source src="assets/videos/AW.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    output.appendChild(videoDiv);
    output.scrollTop = output.scrollHeight;

    await typeWriter("\n-- TEKAN ENTER UNTUK KEMBALI KE MENU --\n");
    currentState = 'reading_database';
}

function createFloatingHearts() {
    setInterval(() => {
        if (!document.body.classList.contains('romantic')) return;
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

function showFinalGallery() {
    const gallery = document.createElement('div');
    gallery.id = 'final-gallery';
    gallery.innerHTML = `
        <div class="heart-animation">❤️</div>
        <div class="gallery-grid">
            <img src="assets/images/1.jpeg" alt="Photo 1">
            <img src="assets/images/2.jpeg" alt="Photo 2">
            <img src="assets/images/3.jpeg" alt="Photo 3">
            <img src="assets/images/4.jpeg" alt="Photo 4">
            <img src="assets/images/5.jpeg" alt="Photo 5">
            <img src="assets/images/6.jpeg" alt="Photo 6">
            <img src="assets/images/7.jpeg" alt="Photo 7">
            <img src="assets/images/8.jpeg" alt="Photo 8">
        </div>
    `;
    output.appendChild(gallery);
    output.scrollTop = output.scrollHeight;
}

commandInput.addEventListener('keydown', handleInput);
// Start the Matrix loading sequence
simulateLoading();