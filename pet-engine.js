// ==============================================================================
// 📟 MOTOR JUKEBOX PET V9.6: EDICIÓN LABORAL COMPLETA AISLADA (pet-engine.js)
// ==============================================================================
let petState = {
    isHatched: false, eggClicks: 0, age: 0, weight: 0, manna:0,
    energy: 100, clean: 100, happy: 100, sleep: 100,
    isSleeping: false, isSick: false, lastUpdate: Date.now(),
    discoUnlocked: false,
    consecutiveDataCount: 0,
    isGameFinished: false // 🟢 NUEVO: Interruptor rígido de Fin de Juego
    
};


// ==============================================================================
// 🕹️ CATALOGO DE CARTUCHOS ARCADE ZONE V29.0
// ==============================================================================
let arcadeGamesList = [
    { id: "guess", name: "🏒 AIR HOCKEY" },
    { id: "jet", name: "🚀 STAR JET PRO" },
    { id: "combat", name: "🛸 SPACE COMBAT" }
];
let currentSelectedGameIndex = 0; // Apunta al primer juego por defecto
let isArcadeMenuDisplayActive = false; // Controla si la pantalla muestra el menú o la granja
// 🟢 LA LLAVE MAESTRA ABSOLUTA: Controla la cúpula de pausa de todo el universo virtual.
// Si está en true (el cajón de 80px está abajo), ¡el Tamagotchi se congela al milisegundo!
let isArcadeZoneActive = false; 

// 🟢 NUEVO CANDADO DE RENDER: Bandera de control para congelar emojis premium
let isEmojiDisplayLocked = false;
// 🟢 NUEVO: Recordatorio lógico en la RAM para encolar la popó durante la graduación
let poopWaitingInQueue = false;
let frameTick = 0;
let margoX = 110; // Centrado inicial frente a la cerca de madera
let walkDir = 1;

// ==============================================================================
// 🎨 REPOSITORIO DE MATRICES VECTORIALES PURAS A COLOR DE ALTA FIDELIDAD
// ==============================================================================
const SHADOW_EGG = "24px 8px #0f0f0f, 28px 8px #0f0f0f, 20px 12px #0f0f0f, 24px 12px #e3e6c9, 28px 12px #ffffff, 32px 12px #0f0f0f, 16px 16px #0f0f0f, 20px 16px #e3e6c9, 24px 16px #e3e6c9, 28px 16px #e3e6c9, 32px 16px #4f4f34, 36px 16px #0f0f0f, 16px 20px #0f0f0f, 20px 20px #e3e6c9, 24px 20px #e3e6c9, 28px 20px #e3e6c9, 32px 20px #e3e6c9, 36px 20px #0f0f0f, 20px 24px #0f0f0f, 24px 24px #4f4f34, 28px 24px #4f4f34, 32px 24px #0f0f0f, 24px 28px #0f0f0f, 28px 28px #0f0f0f";

// 🐣 ETAPA 1: POLLITO BEBÉ TRIDIMENSIONAL FOTORREALISTA (DÍA 0 A 1)
const SHADOW_MARGO_FRAME_A = "16px 0 #0f0f0f, 20px 0 #0f0f0f, 24px 0 #0f0f0f, 12px 4px #0f0f0f, 16px 4px #fdd432, 20px 4px #fdd432, 24px 4px #fdd432, 28px 4px #0f0f0f, 8px 8px #0f0f0f, 12px 8px #fdd432, 16px 8px #fdd432, 20px 8px #fdd432, 24px 8px #fdd432, 28px 8px #fdd432, 32px 8px #0f0f0f, 4px 12px #0f0f0f, 8px 12px #fdd432, 12px 12px #fdd432, 16px 12px #fdd432, 20px 12px #0f0f0f, 24px 12px #ffffff, 28px 12px #fdd432, 32px 12px #fdd432, 36px 12px #0f0f0f, 0px 16px #0f0f0f, 4px 16px #fdd432, 8px 16px #fdd432, 12px 16px #fdd432, 16px 16px #fdd432, 20px 16px #0f0f0f, 24px 16px #0f0f0f, 28px 16px #e84b30, 32px 16px #e84b30, 36px 16px #fdd432, 40px 16px #0f0f0f, 0px 20px #0f0f0f, 4px 20px #fdd432, 8px 20px #fdd432, 12px 20px #fdd432, 16px 20px #fdd432, 20px 20px #fdd432, 24px 20px #fdd432, 28px 20px #e84b30, 32px 20px #fdd432, 36px 20px #fdd432, 40px 20px #0f0f0f, 0px 24px #0f0f0f, 4px 24px #dd963b, 8px 24px #fdd432, 12px 24px #fdd432, 16px 24px #fdd432, 20px 24px #fdd432, 24px 24px #fdd432, 28px 24px #fdd432, 32px 24px #fdd432, 36px 24px #fdd432, 40px 24px #0f0f0f, 0px 28px #0f0f0f, 4px 28px #dd963b, 8px 28px #dd963b, 12px 28px #fdd432, 16px 28px #fdd432, 20px 28px #fdd432, 24px 28px #fdd432, 28px 28px #fdd432, 32px 28px #fdd432, 36px 28px #dd963b, 40px 28px #0f0f0f, 4px 32px #0f0f0f, 8px 32px #dd963b, 12px 32px #dd963b, 16px 32px #dd963b, 20px 32px #fdd432, 24px 32px #fdd432, 28px 32px #fdd432, 32px 32px #dd963b, 36px 32px #0f0f0f, 8px 36px #0f0f0f, 12px 36px #dd963b, 16px 36px #dd963b, 20px 36px #dd963b, 24px 36px #dd963b, 28px 36px #0f0f0f, 12px 40px #0f0f0f, 16px 40px #e84b30, 20px 40px #0f0f0f, 24px 40px #e84b30, 28px 40px #0f0f0f, 16px 44px #0f0f0f, 24px 44px #0f0f0f";
const SHADOW_MARGO_FRAME_B = "16px 0 #0f0f0f, 20px 0 #0f0f0f, 24px 0 #0f0f0f, 12px 4px #0f0f0f, 16px 4px #fdd432, 20px 4px #fdd432, 24px 4px #fdd432, 28px 4px #0f0f0f, 8px 8px #0f0f0f, 12px 8px #fdd432, 16px 8px #fdd432, 20px 8px #fdd432, 24px 8px #fdd432, 28px 8px #fdd432, 32px 8px #0f0f0f, 4px 12px #0f0f0f, 8px 12px #fdd432, 12px 12px #fdd432, 16px 12px #fdd432, 20px 12px #0f0f0f, 24px 12px #ffffff, 28px 12px #fdd432, 32px 12px #fdd432, 36px 12px #0f0f0f, 0px 16px #0f0f0f, 4px 16px #fdd432, 8px 16px #fdd432, 12px 16px #fdd432, 16px 16px #fdd432, 20px 16px #0f0f0f, 24px 16px #0f0f0f, 28px 16px #e84b30, 32px 16px #e84b30, 36px 16px #fdd432, 40px 16px #0f0f0f, 0px 20px #0f0f0f, 4px 20px #fdd432, 8px 20px #fdd432, 12px 20px #fdd432, 16px 20px #fdd432, 20px 20px #fdd432, 24px 20px #fdd432, 28px 20px #e84b30, 32px 20px #fdd432, 36px 20px #fdd432, 40px 20px #0f0f0f, 0px 24px #0f0f0f, 4px 24px #fdd432, 8px 24px #fdd432, 12px 24px #fdd432, 16px 24px #fdd432, 20px 24px #fdd432, 24px 24px #fdd432, 28px 24px #fdd432, 32px 24px #fdd432, 36px 24px #fdd432, 40px 24px #0f0f0f, 0px 28px #0f0f0f, 4px 28px #dd963b, 8px 28px #fdd432, 12px 28px #fdd432, 16px 28px #fdd432, 20px 28px #fdd432, 24px 28px #fdd432, 28px 28px #fdd432, 32px 28px #dd963b, 36px 28px #dd963b, 40px 28px #0f0f0f, 4px 32px #0f0f0f, 8px 32px #dd963b, 12px 32px #dd963b, 16px 32px #dd963b, 20px 32px #dd963b, 24px 32px #fdd432, 28px 32px #dd963b, 32px 32px #dd963b, 36px 32px #0f0f0f, 8px 36px #0f0f0f, 12px 36px #dd963b, 16px 36px #dd963b, 20px 36px #dd963b, 24px 36px #dd963b, 28px 36px #0f0f0f, 12px 40px #0f0f0f, 16px 40px #e84b30, 20px 40px #e84b30, 24px 40px #0f0f0f, 12px 44px #0f0f0f, 24px 44px #0f0f0f";

// 🐔 ETAPA 2: POLLITO GIGANTE ADOLESCENTE "TEEN CHICK" RE-ESCALADO (+35% REALISMO)
const SHADOW_TEEN_A = "24px 0 #0f0f0f, 28px 0 #0f0f0f, 20px 4px #0f0f0f, 24px 4px #fdd432, 28px 4px #fdd432, 32px 4px #0f0f0f, 24px 8px #0f0f0f, 28px 8px #fdd432, 32px 8px #fdd432, 36px 8px #0f0f0f, 16px 12px #0f0f0f, 20px 12px #fdd432, 24px 12px #fdd432, 28px 12px #fdd432, 32px 12px #fdd432, 36px 12px #fdd432, 40px 12px #0f0f0f, 12px 16px #0f0f0f, 16px 16px #fdd432, 20px 16px #fdd432, 24px 16px #fdd432, 28px 16px #fdd432, 32px 16px #0f0f0f, 36px 16px #ffffff, 40px 16px #ffffff, 44px 16px #0f0f0f, 8px 20px #0f0f0f, 12px 20px #fdd432, 16px 20px #fdd432, 20px 20px #fdd432, 24px 20px #fdd432, 28px 20px #0f0f0f, 32px 20px #ffffff, 36px 20px #0f0f0f, 40px 20px #0f0f0f, 44px 20px #fdd432, 48px 20px #0f0f0f, 4px 24px #0f0f0f, 8px 24px #fdd432, 12px 24px #fdd432, 16px 24px #fdd432, 20px 24px #fdd432, 24px 24px #fdd432, 28px 24px #fdd432, 32px 24px #fdd432, 36px 24px #e84b30, 40px 24px #e84b30, 44px 24px #e84b30, 48px 24px #fdd432, 52px 24px #0f0f0f, 0px 28px #0f0f0f, 4px 28px #dd963b, 8px 28px #fdd432, 12px 28px #fdd432, 16px 28px #fdd432, 20px 28px #fdd432, 24px 28px #fdd432, 28px 28px #fdd432, 32px 28px #fdd432, 36px 28px #fdd432, 40px 28px #fdd432, 44px 28px #fdd432, 48px 28px #fdd432, 52px 28px #0f0f0f, 0px 32px #0f0f0f, 4px 32px #dd963b, 8px 32px #dd963b, 12px 32px #fdd432, 16px 32px #fdd432, 20px 32px #fdd432, 24px 32px #fdd432, 28px 32px #fdd432, 32px 32px #fdd432, 36px 32px #fdd432, 40px 32px #fdd432, 44px 32px #dd963b, 48px 32px #dd963b, 52px 32px #0f0f0f, 4px 36px #0f0f0f, 8px 36px #dd963b, 12px 36px #dd963b, 16px 36px #dd963b, 20px 36px #dd963b, 24px 36px #fdd432, 28px 36px #fdd432, 32px 36px #fdd432, 36px 36px #fdd432, 40px 36px #dd963b, 44px 36px #dd963b, 48px 36px #0f0f0f, 8px 40px #0f0f0f, 12px 40px #dd963b, 16px 40px #dd963b, 20px 40px #dd963b, 24px 40px #dd963b, 28px 40px #dd963b, 32px 40px #dd963b, 36px 40px #dd963b, 44px 40px #0f0f0f, 12px 44px #0f0f0f, 16px 44px #0f0f0f, 20px 44px #0f0f0f, 24px 44px #0f0f0f, 28px 44px #0f0f0f, 32px 44px #0f0f0f, 12px 48px #0f0f0f, 16px 48px #e84b30, 20px 48px #e84b30, 24px 48px #0f0f0f, 28px 48px #e84b30, 32px 48px #e84b30, 36px 48px #0f0f0f, 12px 52px #0f0f0f, 16px 52px #0f0f0f, 24px 52px #0f0f0f, 28px 52px #0f0f0f, 36px 52px #0f0f0f";
const SHADOW_TEEN_B = "24px 4px #0f0f0f, 28px 4px #0f0f0f, 20px 8px #0f0f0f, 24px 8px #fdd432, 28px 8px #fdd432, 32px 8px #0f0f0f, 24px 12px #0f0f0f, 28px 12px #fdd432, 32px 12px #fdd432, 36px 12px #0f0f0f, 16px 16px #0f0f0f, 20px 16px #fdd432, 24px 16px #fdd432, 28px 16px #fdd432, 32px 16px #fdd432, 36px 16px #fdd432, 40px 16px #0f0f0f, 12px 20px #0f0f0f, 16px 20px #fdd432, 20px 20px #fdd432, 24px 20px #fdd432, 28px 20px #fdd432, 32px 20px #0f0f0f, 36px 20px #ffffff, 40px 20px #ffffff, 44px 20px #0f0f0f, 8px 24px #0f0f0f, 12px 24px #fdd432, 16px 24px #fdd432, 20px 24px #fdd432, 24px 24px #fdd432, 28px 24px #0f0f0f, 32px 24px #ffffff, 36px 24px #0f0f0f, 40px 24px #0f0f0f, 44px 24px #fdd432, 48px 24px #0f0f0f, 4px 28px #0f0f0f, 8px 28px #fdd432, 12px 28px #fdd432, 16px 28px #fdd432, 20px 28px #fdd432, 24px 28px #fdd432, 28px 28px #fdd432, 32px 28px #fdd432, 36px 28px #e84b30, 40px 28px #e84b30, 44px 28px #e84b30, 48px 28px #fdd432, 52px 28px #0f0f0f, 0px 32px #0f0f0f, 4px 32px #dd963b, 8px 32px #fdd432, 12px 32px #fdd432, 16px 32px #fdd432, 20px 32px #fdd432, 24px 32px #fdd432, 28px 32px #fdd432, 32px 32px #fdd432, 36px 32px #fdd432, 40px 32px #fdd432, 44px 32px #fdd432, 48px 32px #fdd432, 52px 32px #0f0f0f, 0px 36px #0f0f0f, 4px 36px #dd963b, 8px 36px #dd963b, 12px 36px #dd963b, 16px 36px #fdd432, 20px 36px #fdd432, 24px 36px #fdd432, 28px 36px #fdd432, 32px 36px #fdd432, 36px 36px #fdd432, 40px 36px #fdd432, 44px 36px #dd963b, 48px 36px #dd963b, 52px 36px #0f0f0f, 4px 40px #0f0f0f, 8px 40px #dd963b, 12px 40px #dd963b, 16px 40px #dd963b, 20px 40px #dd963b, 24px 40px #dd963b, 28px 40px #fdd432, 32px 40px #fdd432, 36px 40px #fdd432, 40px 40px #dd963b, 44px 40px #dd963b, 48px 40px #0f0f0f, 8px 44px #0f0f0f, 12px 44px #dd963b, 16px 44px #dd963b, 20px 44px #dd963b, 24px 44px #dd963b, 28px 44px #dd963b, 32px 44px #0f0f0f, 12px 48px #0f0f0f, 16px 48px #0f0f0f, 20px 48px #e84b30, 24px 48px #e84b30, 28px 48px #0f0f0f, 32px 48px #e84b30, 36px 48px #e84b30, 40px 48px #0f0f0f, 16px 52px #0f0f0f, 36px 52px #0f0f0f";


// 🐓 ETAPA 3 ORIGINAL DE ALTA DENSIDAD: EL GALLO DE PELEA CYBER-ROOSTER (V10.0)
const SHADOW_ROOSTER_A = "16px -8px #e84b30, 20px -8px #e84b30, 12px -4px #e84b30, 16px -4px #0f0f0f, 20px -4px #0f0f0f, 24px -4px #e84b30, 12px 0px #0f0f0f, 16px 0px #fdd432, 20px 0px #fdd432, 24px 0px #fdd432, 28px 0px #0f0f0f, 8px 4px #0f0f0f, 12px 4px #fdd432, 16px 4px #fdd432, 20px 4px #0f0f0f, 24px 4px #ffffff, 28px 4px #ffffff, 32px 4px #0f0f0f, 4px 8px #0f0f0f, 8px 8px #fdd432, 12px 8px #fdd432, 16px 8px #fdd432, 20px 8px #fdd432, 24px 8px #0f0f0f, 28px 8px #ffffff, 32px 8px #0f0f0f, 36px 8px #e84b30, 40px 8px #0f0f0f, 0px 12px #0f0f0f, 4px 12px #fdd432, 8px 12px #fdd432, 12px 12px #fdd432, 16px 12px #fdd432, 20px 12px #fdd432, 24px 12px #fdd432, 28px 12px #fdd432, 32px 12px #e84b30, 36px 12px #e84b30, 40px 12px #0f0f0f, 0px 16px #0f0f0f, 4px 16px #fdd432, 8px 16px #fdd432, 12px 16px #dd963b, 16px 16px #dd963b, 20px 16px #dd963b, 24px 16px #fdd432, 28px 16px #fdd432, 32px 16px #fdd432, 36px 16px #fdd432, 40px 16px #fdd432, 44px 16px #0f0f0f, 0px 20px #0f0f0f, 4px 20px #dd963b, 8px 20px #dd963b, 12px 20px #dd963b, 16px 20px #4f4f34, 20px 20px #4f4f34, 24px 20px #dd963b, 28px 20px #fdd432, 32px 20px #fdd432, 36px 20px #fdd432, 40px 20px #fdd432, 44px 20px #0f0f0f, 4px 24px #0f0f0f, 8px 24px #dd963b, 12px 24px #dd963b, 16px 24px #dd963b, 20px 24px #4f4f34, 24px 24px #4f4f34, 28px 24px #dd963b, 32px 24px #dd963b, 36px 24px #fdd432, 40px 24px #fdd432, 44px 24px #0f0f0f, 4px 28px #0f0f0f, 8px 28px #dd963b, 12px 28px #dd963b, 16px 28px #dd963b, 20px 28px #dd963b, 24px 28px #dd963b, 28px 28px #dd963b, 32px 28px #dd963b, 36px 28px #dd963b, 40px 28px #0f0f0f, 8px 32px #0f0f0f, 12px 32px #dd963b, 16px 32px #dd963b, 20px 32px #dd963b, 24px 32px #dd963b, 28px 32px #dd963b, 32px 32px #0f0f0f, 12px 36px #0f0f0f, 16px 36px #0f0f0f, 20px 36px #0f0f0f, 24px 36px #0f0f0f, 28px 36px #0f0f0f, 32px 36px #0f0f0f, 12px 40px #0f0f0f, 16px 40px #e84b30, 20px 40px #e84b30, 24px 40px #0f0f0f, 28px 40px #e84b30, 32px 40px #e84b30, 36px 40px #0f0f0f, 4px 44px #87ffff, 8px 44px #87ffff, 12px 44px #0f0f0f, 16px 44px #0f0f0f, 32px 44px #0f0f0f, 36px 44px #87ffff, 40px 44px #87ffff, 12px 48px #0f0f0f, 32px 48px #0f0f0f";
const SHADOW_ROOSTER_B = "16px -4px #e84b30, 20px -4px #e84b30, 12px 0px #e84b30, 16px 0px #0f0f0f, 20px 0px #0f0f0f, 24px 0px #e84b30, 12px 4px #0f0f0f, 16px 4px #fdd432, 20px 4px #fdd432, 24px 4px #fdd432, 28px 4px #0f0f0f, 8px 8px #0f0f0f, 12px 8px #fdd432, 16px 8px #fdd432, 20px 8px #0f0f0f, 24px 8px #ffffff, 28px 8px #ffffff, 32px 8px #0f0f0f, 4px 12px #0f0f0f, 8px 12px #fdd432, 12px 12px #fdd432, 16px 12px #fdd432, 20px 12px #fdd432, 24px 12px #0f0f0f, 28px 12px #ffffff, 32px 12px #0f0f0f, 36px 12px #e84b30, 40px 12px #0f0f0f, 0px 16px #0f0f0f, 4px 16px #fdd432, 8px 16px #fdd432, 12px 16px #fdd432, 16px 16px #fdd432, 20px 16px #fdd432, 24px 16px #fdd432, 28px 16px #fdd432, 32px 16px #e84b30, 36px 16px #e84b30, 40px 16px #0f0f0f, 0px 20px #0f0f0f, 4px 20px #fdd432, 8px 20px #fdd432, 12px 20px #dd963b, 16px 20px #dd963b, 20px 20px #dd963b, 24px 20px #fdd432, 28px 20px #fdd432, 32px 20px #fdd432, 36px 20px #fdd432, 40px 20px #fdd432, 44px 20px #0f0f0f, 0px 24px #0f0f0f, 4px 24px #dd963b, 8px 24px #dd963b, 12px 24px #dd963b, 16px 24px #4f4f34, 20px 24px #4f4f34, 24px 24px #dd963b, 28px 24px #fdd432, 32px 24px #fdd432, 36px 24px #fdd432, 40px 24px #fdd432, 44px 24px #0f0f0f, 0px 28px #0f0f0f, 4px 28px #dd963b, 8px 28px #dd963b, 12px 28px #dd963b, 16px 28px #4f4f34, 20px 28px #4f4f34, 24px 28px #dd963b, 28px 28px #dd963b, 32px 28px #fdd432, 36px 28px #fdd432, 40px 28px #0f0f0f, 4px 32px #0f0f0f, 8px 32px #dd963b, 12px 32px #dd963b, 16px 32px #dd963b, 20px 32px #dd963b, 24px 32px #dd963b, 28px 32px #dd963b, 32px 32px #dd963b, 36px 32px #dd963b, 40px 32px #0f0f0f, 8px 36px #0f0f0f, 12px 36px #dd963b, 16px 36px #dd963b, 20px 36px #dd963b, 24px 36px #dd963b, 28px 36px #dd963b, 32px 36px #0f0f0f, 12px 40px #0f0f0f, 16px 40px #0f0f0f, 20px 40px #0f0f0f, 24px 40px #0f0f0f, 28px 40px #0f0f0f, 32px 40px #0f0f0f, 12px 44px #0f0f0f, 16px 44px #e84b30, 24px 44px #e84b30, 28px 44px #0f0f0f, 4px 48px #87ffff, 8px 48px #87ffff, 16px 48px #0f0f0f, 32px 48px #0f0f0f, 36px 48px #87ffff, 40px 48px #87ffff, 20px 52px #0f0f0f, 28px 52px #0f0f0f";

// 🪐 ENCUADRE DE PAISAJE PREMIUM V10.0: GRANERO, CERCA, SOL GIGANTE, 2 NUBES DOBLES Y VACAS
// Mantiene intacta tu cerca y granero, pero escala las nubes al doble, inyecta un sol masivo de 16x16 arriba
// y proyecta una parejita de vacas pixeladas a color (cuerpo blanco/negro #ffffff, manchas #0f0f0f, ubre rosa #d83ca4) pastando.
const SCENE_DAYTIME = "60px 8px #ffffff, 64px 8px #ffffff, 68px 8px #ffffff, 72px 8px #ffffff, 76px 8px #ffffff, 80px 8px #ffffff, 56px 12px #ffffff, 60px 12px #ffffff, 64px 12px #ffffff, 68px 12px #ffffff, 72px 12px #ffffff, 76px 12px #ffffff, 80px 12px #ffffff, 84px 12px #ffffff, 140px 12px #ffffff, 144px 12px #ffffff, 148px 12px #ffffff, 152px 12px #ffffff, 156px 12px #ffffff, 160px 12px #ffffff, 136px 16px #ffffff, 140px 16px #ffffff, 144px 16px #ffffff, 148px 16px #ffffff, 152px 16px #ffffff, 156px 16px #ffffff, 160px 16px #ffffff, 164px 16px #ffffff, 184px 8px #ffdf00, 188px 8px #ffdf00, 192px 8px #ffdf00, 196px 8px #ffdf00, 180px 12px #ffdf00, 184px 12px #ffdf00, 188px 12px #ffdf00, 192px 12px #ffdf00, 196px 12px #ffdf00, 200px 12px #ffdf00, 180px 16px #ffdf00, 184px 16px #ffdf00, 188px 16px #ffdf00, 192px 16px #ffdf00, 196px 16px #ffdf00, 200px 16px #ffdf00, 184px 20px #ffdf00, 188px 20px #ffdf00, 192px 20px #ffdf00, 196px 20px #ffdf00, 0px 105px #dd963b, 4px 105px #dd963b, 8px 105px #dd963b, 12px 105px #dd963b, 16px 105px #dd963b, 20px 105px #dd963b, 24px 105px #dd963b, 28px 105px #dd963b, 32px 105px #dd963b, 36px 105px #dd963b, 40px 105px #dd963b, 44px 105px #dd963b, 48px 105px #dd963b, 52px 105px #dd963b, 56px 105px #dd963b, 60px 105px #dd963b, 64px 105px #dd963b, 68px 105px #dd963b, 72px 105px #dd963b, 76px 105px #dd963b, 80px 105px #dd963b, 84px 105px #dd963b, 88px 105px #dd963b, 92px 105px #dd963b, 96px 105px #dd963b, 100px 105px #dd963b, 104px 105px #dd963b, 108px 105px #dd963b, 112px 105px #dd963b, 116px 105px #dd963b, 120px 105px #dd963b, 124px 105px #dd963b, 128px 105px #dd963b, 132px 105px #dd963b, 136px 105px #dd963b, 140px 105px #dd963b, 144px 105px #dd963b, 148px 105px #dd963b, 152px 105px #dd963b, 156px 105px #dd963b, 160px 105px #dd963b, 164px 105px #dd963b, 168px 105px #dd963b, 172px 105px #dd963b, 176px 105px #dd963b, 180px 105px #dd963b, 184px 105px #dd963b, 188px 105px #dd963b, 192px 105px #dd963b, 196px 105px #dd963b, 200px 105px #dd963b, 204px 105px #dd963b, 208px 105px #dd963b, 212px 105px #dd963b, 216px 105px #dd963b, 220px 105px #dd963b, 224px 105px #dd963b, 228px 105px #dd963b, 232px 105px #dd963b, 236px 105px #dd963b, 16px 65px #e84b30, 20px 65px #e84b30, 12px 69px #e84b30, 16px 69px #e84b30, 20px 69px #e84b30, 24px 69px #e84b30, 8px 73px #e84b30, 12px 73px #e84b30, 16px 73px #e84b30, 20px 73px #e84b30, 24px 73px #e84b30, 28px 73px #e84b30, 4px 77px #e84b30, 8px 77px #e84b30, 12px 77px #e84b30, 16px 77px #e84b30, 20px 77px #e84b30, 24px 77px #e84b30, 28px 77px #e84b30, 32px 77px #e84b30, 0px 81px #e84b30, 4px 81px #e84b30, 8px 81px #e84b30, 12px 81px #e84b30, 16px 81px #e84b30, 20px 81px #e84b30, 24px 81px #e84b30, 28px 81px #e84b30, 32px 81px #e84b30, 36px 81px #e84b30, 4px 85px #0f0f0f, 8px 85px #dd963b, 12px 85px #dd963b, 16px 85px #dd963b, 20px 85px #dd963b, 24px 85px #dd963b, 28px 85px #dd963b, 32px 85px #dd963b, 4px 90px #0f0f0f, 8px 90px #dd963b, 12px 90px #dd963b, 16px 90px #0f0f0f, 20px 90px #0f0f0f, 24px 90px #dd963b, 28px 90px #dd963b, 32px 90px #0f0f0f, 4px 95px #0f0f0f, 8px 95px #dd963b, 12px 95px #dd963b, 16px 95px #0f0f0f, 20px 95px #0f0f0f, 24px 95px #dd963b, 28px 95px #dd963b, 32px 95px #0f0f0f, 4px 100px #0f0f0f, 8px 100px #dd963b, 12px 100px #dd963b, 16px 100px #dd963b, 20px 100px #dd963b, 24px 100px #dd963b, 28px 100px #dd963b, 32px 100px #0f0f0f, 40px 85px #0f0f0f, 40px 90px #0f0f0f, 40px 95px #0f0f0f, 40px 100px #0f0f0f, 40px 105px #0f0f0f, 90px 85px #0f0f0f, 90px 90px #0f0f0f, 90px 95px #0f0f0f, 90px 100px #0f0f0f, 90px 105px #0f0f0f, 150px 85px #0f0f0f, 150px 90px #0f0f0f, 150px 95px #0f0f0f, 150px 100px #0f0f0f, 150px 105px #0f0f0f, 32px 93px #0f0f0f, 36px 93px #0f0f0f, 44px 93px #0f0f0f, 48px 93px #0f0f0f, 52px 93px #0f0f0f, 56px 93px #0f0f0f, 60px 93px #0f0f0f, 64px 93px #0f0f0f, 68px 93px #0f0f0f, 72px 93px #0f0f0f, 76px 93px #0f0f0f, 80px 93px #0f0f0f, 84px 93px #0f0f0f, 94px 93px #0f0f0f, 98px 93px #0f0f0f, 102px 93px #0f0f0f, 106px 93px #0f0f0f, 112px 93px #0f0f0f, 116px 93px #0f0f0f, 120px 93px #0f0f0f, 124px 93px #0f0f0f, 128px 93px #0f0f0f, 132px 93px #0f0f0f, 136px 93px #0f0f0f, 140px 93px #0f0f0f, 144px 93px #0f0f0f, 148px 93px #0f0f0f, 154px 93px #0f0f0f, 158px 93px #0f0f0f, 64px 85px #ffffff, 68px 85px #ffffff, 72px 85px #ffffff, 76px 85px #0f0f0f, 60px 89px #ffffff, 64px 89px #0f0f0f, 68px 89px #ffffff, 72px 89px #ffffff, 76px 89px #ffffff, 60px 93px #ffffff, 64px 93px #ffffff, 68px 93px #0f0f0f, 72px 93px #ffffff, 76px 93px #ffffff, 60px 97px #ffffff, 64px 97px #ffffff, 68px 97px #ffffff, 72px 97px #ffffff, 76px 97px #d83ca4, 64px 101px #0f0f0f, 72px 101px #0f0f0f";

// ==============================================================================
// 💤 MARGO DURMIENDO CLÁSICO CON BANDANA AZUL ESTILO CRESTA INTEGRADA V11.9
// ==============================================================================
// Eliminamos el gorro flotante de arriba. Ahora el pollito bebé amarillo (#fdd432)
// lleva una bandana elástica azul neón (#87ffff) soldada a su frente que baja 
// de forma impecable casi hasta el nivel de su ojito cerrado.
const SHADOW_MARGO_SLEEP_A = "16px -4px #87ffff, 20px -4px #87ffff, 24px -4px #87ffff, 12px 0px #87ffff, 16px 0px #87ffff, 20px 0px #87ffff, 24px 0px #87ffff, 28px 0px #ffffff, 8px 4px #87ffff, 12px 4px #0f0f0f, 16px 4px #0f0f0f, 20px 4px #0f0f0f, 24px 4px #87ffff, 28px 4px #0f0f0f, 4px 8px #0f0f0f, 8px 8px #fdd432, 12px 8px #fdd432, 16px 8px #fdd432, 20px 8px #fdd432, 24px 8px #fdd432, 28px 8px #fdd432, 32px 8px #0f0f0f, 0px 12px #0f0f0f, 4px 12px #fdd432, 8px 12px #fdd432, 12px 12px #fdd432, 16px 12px #fdd432, 20px 12px #0f0f0f, 24px 12px #ffffff, 28px 12px #fdd432, 32px 12px #fdd432, 36px 12px #0f0f0f, 0px 16px #0f0f0f, 4px 16px #fdd432, 8px 16px #fdd432, 12px 16px #fdd432, 16px 16px #fdd432, 20px 16px #0f0f0f, 24px 16px #0f0f0f, 28px 16px #e84b30, 32px 16px #e84b30, 36px 16px #fdd432, 40px 16px #0f0f0f, 0px 20px #0f0f0f, 4px 20px #fdd432, 8px 20px #fdd432, 12px 20px #fdd432, 16px 20px #fdd432, 20px 20px #fdd432, 24px 20px #fdd432, 28px 20px #e84b30, 32px 20px #fdd432, 36px 20px #fdd432, 40px 20px #0f0f0f, 0px 24px #0f0f0f, 4px 24px #dd963b, 8px 24px #fdd432, 12px 24px #fdd432, 16px 24px #fdd432, 20px 24px #fdd432, 24px 24px #fdd432, 28px 24px #fdd432, 32px 24px #fdd432, 36px 24px #fdd432, 40px 24px #0f0f0f, 0px 28px #0f0f0f, 4px 28px #dd963b, 8px 28px #dd963b, 12px 28px #fdd432, 16px 28px #fdd432, 20px 28px #fdd432, 24px 28px #fdd432, 28px 28px #fdd432, 32px 28px #fdd432, 36px 28px #dd963b, 40px 28px #0f0f0f, 4px 32px #0f0f0f, 8px 32px #dd963b, 12px 32px #dd963b, 16px 32px #dd963b, 20px 32px #fdd432, 24px 32px #fdd432, 28px 32px #fdd432, 32px 32px #dd963b, 36px 32px #0f0f0f, 8px 36px #0f0f0f, 12px 36px #dd963b, 16px 36px #dd963b, 20px 36px #dd963b, 24px 36px #dd963b, 28px 36px #0f0f0f, 12px 40px #0f0f0f, 16px 40px #e84b30, 20px 40px #0f0f0f, 24px 40px #e84b30, 28px 40px #0f0f0f, 16px 44px #0f0f0f, 24px 44px #0f0f0f";

// Fotograma B: Comprime todo el chasis amarillo y la bandana 1px hacia abajo (Respiración sutil)
const SHADOW_MARGO_SLEEP_B = "16px -3px #87ffff, 20px -3px #87ffff, 24px -3px #87ffff, 12px 1px #87ffff, 16px 1px #87ffff, 20px 1px #87ffff, 24px 1px #87ffff, 28px 1px #ffffff, 8px 5px #87ffff, 12px 5px #0f0f0f, 16px 5px #0f0f0f, 20px 5px #0f0f0f, 24px 5px #87ffff, 28px 5px #0f0f0f, 4px 9px #0f0f0f, 8px 9px #fdd432, 12px 9px #fdd432, 16px 9px #fdd432, 20px 9px #fdd432, 24px 9px #fdd432, 28px 9px #fdd432, 32px 9px #0f0f0f, 0px 13px #0f0f0f, 4px 13px #fdd432, 8px 13px #fdd432, 12px 13px #fdd432, 16px 13px #fdd432, 20px 13px #0f0f0f, 24px 13px #ffffff, 28px 13px #fdd432, 32px 13px #fdd432, 36px 13px #0f0f0f, 0px 17px #0f0f0f, 4px 17px #fdd432, 8px 17px #fdd432, 12px 17px #fdd432, 16px 17px #fdd432, 20px 17px #0f0f0f, 24px 17px #0f0f0f, 28px 17px #e84b30, 32px 17px #e84b30, 36px 17px #fdd432, 40px 17px #0f0f0f, 0px 21px #0f0f0f, 4px 21px #fdd432, 8px 21px #fdd432, 12px 21px #fdd432, 16px 21px #fdd432, 20px 21px #fdd432, 24px 21px #fdd432, 28px 21px #e84b30, 32px 21px #fdd432, 36px 21px #fdd432, 40px 21px #0f0f0f, 0px 25px #0f0f0f, 4px 25px #dd963b, 8px 25px #fdd432, 12px 25px #fdd432, 16px 25px #fdd432, 20px 25px #fdd432, 24px 25px #fdd432, 28px 25px #fdd432, 32px 25px #fdd432, 36px 25px #fdd432, 40px 25px #0f0f0f, 0px 29px #0f0f0f, 4px 29px #dd963b, 8px 29px #dd963b, 12px 29px #fdd432, 16px 29px #fdd432, 20px 29px #fdd432, 24px 29px #fdd432, 28px 29px #fdd432, 32px 29px #fdd432, 36px 29px #dd963b, 40px 29px #0f0f0f, 4px 33px #0f0f0f, 8px 33px #dd963b, 12px 33px #dd963b, 16px 33px #dd963b, 20px 33px #fdd432, 24px 33px #fdd432, 28px 33px #fdd432, 32px 33px #dd963b, 36px 33px #0f0f0f, 8px 37px #0f0f0f, 12px 37px #dd963b, 16px 37px #dd963b, 20px 37px #dd963b, 24px 37px #dd963b, 28px 37px #0f0f0f, 12px 41px #0f0f0f, 16px 41px #e84b30, 20px 41px #0f0f0f, 24px 41px #e84b30, 28px 41px #0f0f0f, 16px 45px #0f0f0f, 24px 45px #0f0f0f";

const SCENE_NIGHT_A = "64px 85px #ffffff, 68px 85px #ffffff, 72px 85px #ffffff, 76px 85px #0f0f0f, 60px 89px #ffffff, 64px 89px #0f0f0f, 68px 89px #ffffff, 72px 89px #ffffff, 76px 89px #ffffff, 60px 93px #ffffff, 64px 93px #ffffff, 68px 93px #0f0f0f, 72px 93px #ffffff, 76px 93px #ffffff, 60px 97px #ffffff, 64px 97px #ffffff, 68px 97px #ffffff, 72px 97px #ffffff, 76px 97px #d83ca4, 64px 101px #0f0f0f, 72px 101px #0f0f0f, 0px 105px #dd963b, 4px 105px #dd963b, 8px 105px #dd963b, 12px 105px #dd963b, 16px 105px #dd963b, 20px 105px #dd963b, 24px 105px #dd963b, 28px 105px #dd963b, 32px 105px #dd963b, 36px 105px #dd963b, 40px 105px #dd963b, 44px 105px #dd963b, 48px 105px #dd963b, 52px 105px #dd963b, 56px 105px #dd963b, 60px 105px #dd963b, 64px 105px #dd963b, 68px 105px #dd963b, 72px 105px #dd963b, 76px 105px #dd963b, 80px 105px #dd963b, 84px 105px #dd963b, 88px 105px #dd963b, 92px 105px #dd963b, 96px 105px #dd963b, 100px 105px #dd963b, 104px 105px #dd963b, 108px 105px #dd963b, 112px 105px #dd963b, 116px 105px #dd963b, 120px 105px #dd963b, 124px 105px #dd963b, 128px 105px #dd963b, 132px 105px #dd963b, 136px 105px #dd963b, 140px 105px #dd963b, 144px 105px #dd963b, 148px 105px #dd963b, 152px 105px #dd963b, 156px 105px #dd963b, 160px 105px #dd963b, 164px 105px #dd963b, 168px 105px #dd963b, 172px 105px #dd963b, 176px 105px #dd963b, 180px 105px #dd963b, 184px 105px #dd963b, 188px 105px #dd963b, 192px 105px #dd963b, 196px 105px #dd963b, 200px 105px #dd963b, 204px 105px #dd963b, 208px 105px #dd963b, 212px 105px #dd963b, 216px 105px #dd963b, 220px 105px #dd963b, 224px 105px #dd963b, 228px 105px #dd963b, 232px 105px #dd963b, 236px 105px #dd963b, 16px 65px #e84b30, 20px 65px #e84b30, 12px 69px #e84b30, 16px 69px #e84b30, 20px 69px #e84b30, 24px 69px #e84b30, 8px 73px #e84b30, 12px 73px #e84b30, 16px 73px #e84b30, 20px 73px #e84b30, 24px 73px #e84b30, 28px 73px #e84b30, 4px 77px #e84b30, 8px 77px #e84b30, 12px 77px #e84b30, 16px 77px #e84b30, 20px 77px #e84b30, 24px 77px #e84b30, 28px 77px #e84b30, 32px 77px #e84b30, 0px 81px #e84b30, 4px 81px #e84b30, 8px 81px #e84b30, 12px 81px #e84b30, 16px 81px #e84b30, 20px 81px #e84b30, 24px 81px #e84b30, 28px 81px #e84b30, 32px 81px #e84b30, 36px 81px #e84b30, 4px 85px #0f0f0f, 8px 85px #dd963b, 12px 85px #dd963b, 16px 85px #dd963b, 20px 85px #dd963b, 24px 85px #dd963b, 28px 85px #dd963b, 32px 85px #dd963b, 4px 90px #0f0f0f, 8px 90px #dd963b, 12px 90px #dd963b, 16px 90px #0f0f0f, 20px 90px #0f0f0f, 24px 90px #dd963b, 28px 90px #dd963b, 32px 90px #0f0f0f, 4px 95px #0f0f0f, 8px 95px #dd963b, 12px 95px #dd963b, 16px 95px #0f0f0f, 20px 95px #0f0f0f, 24px 95px #dd963b, 28px 95px #dd953b, 32px 95px #0f0f0f, 4px 100px #0f0f0f, 8px 100px #dd963b, 12px 100px #dd963b, 16px 100px #dd963b, 20px 100px #dd963b, 24px 100px #dd963b, 28px 100px #dd963b, 32px 100px #0f0f0f, 40px 85px #0f0f0f, 40px 90px #0f0f0f, 40px 95px #0f0f0f, 40px 100px #0f0f0f, 40px 105px #0f0f0f, 90px 85px #0f0f0f, 90px 90px #0f0f0f, 90px 95px #0f0f0f, 90px 100px #0f0f0f, 90px 105px #0f0f0f, 150px 85px #0f0f0f, 150px 90px #0f0f0f, 150px 95px #0f0f0f, 150px 100px #0f0f0f, 150px 105px #0f0f0f, 32px 93px #0f0f0f, 36px 93px #0f0f0f, 44px 93px #0f0f0f, 48px 93px #0f0f0f, 52px 93px #0f0f0f, 56px 93px #0f0f0f, 60px 93px #0f0f0f, 64px 93px #0f0f0f, 68px 93px #0f0f0f, 72px 93px #0f0f0f, 76px 93px #0f0f0f, 80px 93px #0f0f0f, 84px 93px #0f0f0f, 94px 93px #0f0f0f, 98px 93px #0f0f0f, 102px 93px #0f0f0f, 106px 93px #0f0f0f, 112px 93px #0f0f0f, 116px 93px #0f0f0f, 120px 93px #0f0f0f, 124px 93px #0f0f0f, 128px 93px #0f0f0f, 132px 93px #0f0f0f, 136px 93px #0f0f0f, 140px 93px #0f0f0f, 144px 93px #0f0f0f, 148px 93px #0f0f0f, 154px 93px #0f0f0f, 158px 93px #0f0f0f, 184px 8px #ffffff, 188px 8px #ffffff, 192px 8px #ffffff, 180px 12px #ffffff, 184px 12px #87ffff, 188px 12px #87ffff, 176px 16px #ffffff, 180px 16px #87ffff, 176px 20px #ffffff, 180px 20px #87ffff, 180px 24px #ffffff, 184px 24px #87ffff, 188px 24px #87ffff, 184px 28px #ffffff, 188px 28px #ffffff, 192px 28px #ffffff, 24px 20px #ffffff, 120px 16px #ffffff, 80px 40px #ffffff";

const SCENE_NIGHT_B = "64px 85px #ffffff, 68px 85px #ffffff, 72px 85px #ffffff, 76px 85px #0f0f0f, 60px 89px #ffffff, 64px 89px #0f0f0f, 68px 89px #ffffff, 72px 89px #ffffff, 76px 89px #ffffff, 60px 93px #ffffff, 64px 93px #ffffff, 68px 93px #0f0f0f, 72px 93px #ffffff, 76px 93px #ffffff, 60px 97px #ffffff, 64px 97px #ffffff, 68px 97px #ffffff, 72px 97px #ffffff, 76px 97px #d83ca4, 64px 101px #0f0f0f, 72px 101px #0f0f0f, 0px 105px #dd963b, 4px 105px #dd963b, 8px 105px #dd963b, 12px 105px #dd963b, 16px 105px #dd963b, 20px 105px #dd963b, 24px 105px #dd963b, 28px 105px #dd963b, 32px 105px #dd963b, 36px 105px #dd963b, 40px 105px #dd963b, 44px 105px #dd963b, 48px 105px #dd963b, 52px 105px #dd963b, 56px 105px #dd963b, 60px 105px #dd963b, 64px 105px #dd963b, 68px 105px #dd963b, 72px 105px #dd963b, 76px 105px #dd963b, 80px 105px #dd963b, 84px 105px #dd963b, 88px 105px #dd963b, 92px 105px #dd963b, 96px 105px #dd963b, 100px 105px #dd963b, 104px 105px #dd963b, 108px 105px #dd963b, 112px 105px #dd963b, 116px 105px #dd963b, 120px 105px #dd963b, 124px 105px #dd963b, 128px 105px #dd963b, 132px 105px #dd963b, 136px 105px #dd963b, 140px 105px #dd963b, 144px 105px #dd963b, 148px 105px #dd963b, 152px 105px #dd963b, 156px 105px #dd963b, 160px 105px #dd963b, 164px 105px #dd963b, 168px 105px #dd963b, 172px 105px #dd963b, 176px 105px #dd963b, 180px 105px #dd963b, 184px 105px #dd963b, 188px 105px #dd963b, 192px 105px #dd963b, 196px 105px #dd963b, 200px 105px #dd963b, 204px 105px #dd963b, 208px 105px #dd963b, 212px 105px #dd963b, 216px 105px #dd963b, 220px 105px #dd963b, 224px 105px #dd963b, 228px 105px #dd963b, 232px 105px #dd963b, 236px 105px #dd963b, 16px 65px #e84b30, 20px 65px #e84b30, 12px 69px #e84b30, 16px 69px #e84b30, 20px 69px #e84b30, 24px 69px #e84b30, 8px 73px #e84b30, 12px 73px #e84b30, 16px 73px #e84b30, 20px 73px #e84b30, 24px 73px #e84b30, 28px 73px #e84b30, 4px 77px #e84b30, 8px 77px #e84b30, 12px 77px #e84b30, 16px 77px #e84b30, 20px 77px #e84b30, 24px 77px #e84b30, 28px 77px #e84b30, 32px 77px #e84b30, 0px 81px #e84b30, 4px 81px #e84b30, 8px 81px #e84b30, 12px 81px #e84b30, 16px 81px #e84b30, 20px 81px #e84b30, 24px 81px #e84b30, 28px 81px #e84b30, 32px 81px #e84b30, 36px 81px #e84b30, 4px 85px #0f0f0f, 8px 85px #dd963b, 12px 85px #dd963b, 16px 85px #dd963b, 20px 85px #dd963b, 24px 85px #dd963b, 28px 85px #dd963b, 32px 85px #dd963b, 4px 90px #0f0f0f, 8px 90px #dd963b, 12px 90px #dd963b, 16px 90px #0f0f0f, 20px 90px #0f0f0f, 24px 90px #dd963b, 28px 90px #dd963b, 32px 90px #0f0f0f, 4px 95px #0f0f0f, 8px 95px #dd963b, 12px 95px #dd963b, 16px 95px #0f0f0f, 20px 95px #0f0f0f, 24px 95px #dd963b, 28px 95px #dd953b, 32px 95px #0f0f0f, 4px 100px #0f0f0f, 8px 100px #dd963b, 12px 100px #dd963b, 16px 100px #dd963b, 20px 100px #dd963b, 24px 100px #dd963b, 28px 100px #dd963b, 32px 100px #0f0f0f, 40px 85px #0f0f0f, 40px 90px #0f0f0f, 40px 95px #0f0f0f, 40px 100px #0f0f0f, 40px 105px #0f0f0f, 90px 85px #0f0f0f, 90px 90px #0f0f0f, 90px 95px #0f0f0f, 90px 100px #0f0f0f, 90px 105px #0f0f0f, 150px 85px #0f0f0f, 150px 90px #0f0f0f, 150px 95px #0f0f0f, 150px 100px #0f0f0f, 150px 105px #0f0f0f, 32px 93px #0f0f0f, 36px 93px #0f0f0f, 44px 93px #0f0f0f, 48px 93px #0f0f0f, 52px 93px #0f0f0f, 56px 93px #0f0f0f, 60px 93px #0f0f0f, 64px 93px #0f0f0f, 68px 93px #0f0f0f, 72px 93px #0f0f0f, 76px 93px #0f0f0f, 80px 93px #0f0f0f, 84px 93px #0f0f0f, 94px 93px #0f0f0f, 98px 93px #0f0f0f, 102px 93px #0f0f0f, 106px 93px #0f0f0f, 112px 93px #0f0f0f, 116px 93px #0f0f0f, 120px 93px #0f0f0f, 124px 93px #0f0f0f, 128px 93px #0f0f0f, 132px 93px #0f0f0f, 136px 93px #0f0f0f, 140px 93px #0f0f0f, 144px 93px #0f0f0f, 148px 93px #0f0f0f, 154px 93px #0f0f0f, 158px 93px #0f0f0f, 184px 8px #ffffff, 188px 8px #ffffff, 192px 8px #ffffff, 180px 12px #ffffff, 184px 12px #0c1220, 188px 12px #0c1220, 176px 16px #ffffff, 180px 16px #0c1220, 176px 20px #ffffff, 180px 20px #0c1220, 180px 24px #ffffff, 184px 24px #0c1220, 188px 24px #0c1220, 184px 28px #ffffff, 188px 28px #ffffff, 192px 28px #ffffff, 24px 20px #02040a, 120px 16px #02040a, 80px 40px #02040a";


// ==============================================================================
// 💩 CAPA DE CONTAMINACIÓN FLOTANTE PREMIUM V12.0 (EMOJI NATIVO RETRO)
// ==============================================================================
let hasPoop = false; // Mantiene el control lógico del suelo

// Limpiamos el string viejo para que no choque por detrás del granero
const SCENE_POOP_ELEMENTS = "";


// ==============================================================================
// 🪐 NUEVA ESTRUCTURA AISLADA V11.8: GRANJA REDIBUJADA DE NOCHE + CERCA CLARA
// Redibuja de forma nativa tu granero rojo original, la vaquita con ubre rosa,
// la cerca en color ocre claro visible (#dd963b) y tu hermosa luna creciente blanca.
// ==============================================================================
const SCENE_NIGHT_FARM_A = "60px 8px #ffffff, 64px 8px #ffffff, 68px 8px #ffffff, 72px 8px #ffffff, 76px 8px #ffffff, 80px 8px #ffffff, 56px 12px #ffffff, 60px 12px #ffffff, 64px 12px #ffffff, 68px 12px #ffffff, 72px 12px #ffffff, 76px 12px #ffffff, 80px 12px #ffffff, 84px 12px #ffffff, 140px 12px #ffffff, 144px 12px #ffffff, 148px 12px #ffffff, 152px 12px #ffffff, 156px 12px #ffffff, 160px 12px #ffffff, 136px 16px #ffffff, 140px 16px #ffffff, 144px 16px #ffffff, 148px 16px #ffffff, 152px 16px #ffffff, 156px 16px #ffffff, 160px 16px #ffffff, 164px 16px #ffffff, 184px 8px #ffffff, 188px 8px #ffffff, 192px 8px #ffffff, 196px 8px #ffffff, 180px 12px #ffffff, 184px 12px #0c1220, 188px 12px #0c1220, 192px 12px #0c1220, 196px 12px #0c1220, 200px 12px #ffffff, 180px 16px #ffffff, 184px 16px #0c1220, 188px 16px #0c1220, 192px 16px #0c1220, 196px 16px #0c1220, 200px 16px #ffffff, 184px 20px #ffffff, 188px 20px #ffffff, 192px 20px #ffffff, 196px 20px #ffffff, 0px 105px #dd963b, 4px 105px #dd963b, 8px 105px #dd963b, 12px 105px #dd963b, 16px 105px #dd963b, 20px 105px #dd963b, 24px 105px #dd963b, 28px 105px #dd963b, 32px 105px #dd963b, 36px 105px #dd963b, 40px 105px #dd963b, 44px 105px #dd963b, 48px 105px #dd963b, 52px 105px #dd963b, 56px 105px #dd963b, 60px 105px #dd963b, 64px 105px #dd963b, 68px 105px #dd963b, 72px 105px #dd963b, 76px 105px #dd963b, 80px 105px #dd963b, 84px 105px #dd963b, 88px 105px #dd963b, 92px 105px #dd963b, 96px 105px #dd963b, 100px 105px #dd963b, 104px 105px #dd963b, 108px 105px #dd963b, 112px 105px #dd963b, 116px 105px #dd963b, 120px 105px #dd963b, 124px 105px #dd963b, 128px 105px #dd963b, 132px 105px #dd963b, 136px 105px #dd963b, 140px 105px #dd963b, 144px 105px #dd963b, 148px 105px #dd963b, 152px 105px #dd963b, 156px 105px #dd963b, 160px 105px #dd963b, 164px 105px #dd963b, 168px 105px #dd963b, 172px 105px #dd963b, 176px 105px #dd963b, 180px 105px #dd963b, 184px 105px #dd963b, 188px 105px #dd963b, 192px 105px #dd963b, 196px 105px #dd963b, 200px 105px #dd963b, 204px 105px #dd963b, 208px 105px #dd963b, 212px 105px #dd963b, 216px 105px #dd963b, 220px 105px #dd963b, 224px 105px #dd963b, 228px 105px #dd963b, 232px 105px #dd963b, 236px 105px #dd963b, 16px 65px #e84b30, 20px 65px #e84b30, 12px 69px #e84b30, 16px 69px #e84b30, 20px 69px #e84b30, 24px 69px #e84b30, 8px 73px #e84b30, 12px 73px #e84b30, 16px 73px #e84b30, 20px 73px #e84b30, 24px 73px #e84b30, 28px 73px #e84b30, 4px 77px #e84b30, 8px 77px #e84b30, 12px 77px #e84b30, 16px 77px #e84b30, 20px 77px #e84b30, 24px 77px #e84b30, 28px 77px #e84b30, 32px 77px #e84b30, 0px 81px #e84b30, 4px 81px #e84b30, 8px 81px #e84b30, 12px 81px #e84b30, 16px 81px #e84b30, 20px 81px #e84b30, 24px 81px #e84b30, 28px 81px #e84b30, 32px 81px #e84b30, 36px 81px #e84b30, 4px 85px #0f0f0f, 8px 85px #dd963b, 12px 85px #dd963b, 16px 85px #dd963b, 20px 85px #dd963b, 24px 85px #dd963b, 28px 85px #dd963b, 32px 85px #dd963b, 4px 90px #0f0f0f, 8px 90px #dd963b, 12px 90px #dd963b, 16px 90px #0f0f0f, 20px 90px #0f0f0f, 24px 90px #dd963b, 28px 90px #dd963b, 32px 90px #0f0f0f, 4px 95px #0f0f0f, 8px 95px #dd963b, 12px 95px #dd953b, 16px 95px #0f0f0f, 20px 95px #0f0f0f, 24px 95px #dd963b, 28px 95px #dd953b, 32px 95px #0f0f0f, 4px 100px #0f0f0f, 8px 100px #dd963b, 12px 100px #dd963b, 16px 100px #dd963b, 20px 100px #dd963b, 24px 100px #dd963b, 28px 100px #dd963b, 32px 100px #0f0f0f, 40px 85px #0f0f0f, 40px 90px #0f0f0f, 40px 95px #0f0f0f, 40px 100px #0f0f0f, 40px 105px #0f0f0f, 90px 85px #0f0f0f, 90px 90px #0f0f0f, 90px 95px #0f0f0f, 90px 100px #0f0f0f, 90px 105px #0f0f0f, 150px 85px #0f0f0f, 150px 90px #0f0f0f, 150px 95px #0f0f0f, 150px 100px #0f0f0f, 150px 105px #0f0f0f, 32px 93px #0f0f0f, 36px 93px #0f0f0f, 44px 93px #0f0f0f, 48px 93px #0f0f0f, 52px 93px #0f0f0f, 56px 93px #0f0f0f, 60px 93px #0f0f0f, 64px 93px #0f0f0f, 68px 93px #0f0f0f, 72px 93px #0f0f0f, 76px 93px #0f0f0f, 80px 93px #0f0f0f, 84px 93px #0f0f0f, 94px 93px #0f0f0f, 98px 93px #0f0f0f, 102px 93px #0f0f0f, 106px 93px #0f0f0f, 112px 93px #0f0f0f, 116px 93px #0f0f0f, 120px 93px #0f0f0f, 124px 93px #0f0f0f, 128px 93px #0f0f0f, 132px 93px #0f0f0f, 136px 93px #0f0f0f, 140px 93px #0f0f0f, 144px 93px #0f0f0f, 148px 93px #0f0f0f, 154px 93px #0f0f0f, 158px 93px #0f0f0f, 48px 48px #ffffff, 160px 32px #ffffff, 92px 44px #87ffff";

const SCENE_NIGHT_FARM_B = "60px 8px #ffffff, 64px 8px #ffffff, 68px 8px #ffffff, 72px 8px #ffffff, 76px 8px #ffffff, 80px 8px #ffffff, 56px 12px #ffffff, 60px 12px #ffffff, 64px 12px #ffffff, 68px 12px #ffffff, 72px 12px #ffffff, 76px 12px #ffffff, 80px 12px #ffffff, 84px 12px #ffffff, 140px 12px #ffffff, 144px 12px #ffffff, 148px 12px #ffffff, 152px 12px #ffffff, 156px 12px #ffffff, 160px 12px #ffffff, 136px 16px #ffffff, 140px 16px #ffffff, 144px 16px #ffffff, 148px 16px #ffffff, 152px 16px #ffffff, 156px 16px #ffffff, 160px 16px #ffffff, 164px 16px #ffffff, 184px 8px #ffffff, 188px 8px #ffffff, 192px 8px #ffffff, 196px 8px #ffffff, 180px 12px #ffffff, 184px 12px #0c1220, 188px 12px #0c1220, 192px 12px #0c1220, 196px 12px #0c1220, 200px 12px #ffffff, 180px 16px #ffffff, 184px 16px #0c1220, 188px 16px #0c1220, 192px 16px #0c1220, 196px 16px #0c1220, 200px 16px #ffffff, 184px 20px #ffffff, 188px 20px #ffffff, 192px 20px #ffffff, 196px 20px #ffffff, 0px 105px #dd963b, 4px 105px #dd963b, 8px 105px #dd963b, 12px 105px #dd963b, 16px 105px #dd963b, 20px 105px #dd963b, 24px 105px #dd963b, 28px 105px #dd963b, 32px 105px #dd963b, 36px 105px #dd963b, 40px 105px #dd963b, 44px 105px #dd963b, 48px 105px #dd963b, 52px 105px #dd963b, 56px 105px #dd963b, 60px 105px #dd963b, 64px 105px #dd963b, 68px 105px #dd963b, 72px 105px #dd963b, 76px 105px #dd963b, 80px 105px #dd963b, 84px 105px #dd963b, 88px 105px #dd963b, 92px 105px #dd963b, 96px 105px #dd963b, 100px 105px #dd963b, 104px 105px #dd963b, 108px 105px #dd963b, 112px 105px #dd963b, 116px 105px #dd963b, 120px 105px #dd963b, 124px 105px #dd963b, 128px 105px #dd963b, 132px 105px #dd963b, 136px 105px #dd963b, 140px 105px #dd963b, 144px 105px #dd963b, 148px 105px #dd963b, 152px 105px #dd963b, 156px 105px #dd963b, 160px 105px #dd963b, 164px 105px #dd963b, 168px 105px #dd963b, 172px 105px #dd963b, 176px 105px #dd963b, 180px 105px #dd963b, 184px 105px #dd963b, 188px 105px #dd963b, 192px 105px #dd963b, 196px 105px #dd963b, 200px 105px #dd963b, 204px 105px #dd963b, 208px 105px #dd963b, 212px 105px #dd963b, 216px 105px #dd963b, 220px 105px #dd963b, 224px 105px #dd963b, 228px 105px #dd963b, 232px 105px #dd963b, 236px 105px #dd963b, 16px 65px #e84b30, 20px 65px #e84b30, 12px 69px #e84b30, 16px 69px #e84b30, 20px 69px #e84b30, 24px 69px #e84b30, 8px 73px #e84b30, 12px 73px #e84b30, 16px 73px #e84b30, 20px 73px #e84b30, 24px 73px #e84b30, 28px 73px #e84b30, 4px 77px #e84b30, 8px 77px #e84b30, 12px 77px #e84b30, 16px 77px #e84b30, 20px 77px #e84b30, 24px 77px #e84b30, 28px 77px #e84b30, 32px 77px #e84b30, 0px 81px #e84b30, 4px 81px #e84b30, 8px 81px #e84b30, 12px 81px #e84b30, 16px 81px #e84b30, 20px 81px #e84b30, 24px 81px #e84b30, 28px 81px #e84b30, 32px 81px #e84b30, 36px 81px #e84b30, 4px 85px #0f0f0f, 8px 85px #dd963b, 12px 85px #dd963b, 16px 85px #dd963b, 20px 85px #dd963b, 24px 85px #dd963b, 28px 85px #dd963b, 32px 85px #dd963b, 4px 90px #0f0f0f, 8px 90px #dd963b, 12px 90px #dd963b, 16px 90px #0f0f0f, 20px 90px #0f0f0f, 24px 90px #dd963b, 28px 90px #dd963b, 32px 90px #0f0f0f, 4px 95px #0f0f0f, 8px 95px #dd963b, 12px 95px #dd953b, 16px 95px #0f0f0f, 20px 95px #0f0f0f, 24px 95px #dd963b, 28px 95px #dd953b, 32px 95px #0f0f0f, 4px 100px #0f0f0f, 8px 100px #dd963b, 12px 100px #dd963b, 16px 100px #dd963b, 20px 100px #dd963b, 24px 100px #dd963b, 28px 100px #dd963b, 32px 100px #0f0f0f, 40px 85px #0f0f0f, 40px 90px #0f0f0f, 40px 95px #0f0f0f, 40px 100px #0f0f0f, 40px 105px #0f0f0f, 90px 85px #0f0f0f, 90px 90px #0f0f0f, 90px 95px #0f0f0f, 90px 100px #0f0f0f, 90px 105px #0f0f0f, 150px 85px #0f0f0f, 150px 90px #0f0f0f, 150px 95px #0f0f0f, 150px 100px #0f0f0f, 150px 105px #0f0f0f, 32px 93px #0f0f0f, 36px 93px #0f0f0f, 44px 93px #0f0f0f, 48px 93px #0f0f0f, 52px 93px #0f0f0f, 56px 93px #0f0f0f, 60px 93px #0f0f0f, 64px 93px #0f0f0f, 68px 93px #0f0f0f, 72px 93px #0f0f0f, 76px 93px #0f0f0f, 80px 93px #0f0f0f, 84px 93px #0f0f0f, 94px 93px #0f0f0f, 98px 93px #0f0f0f, 102px 93px #0f0f0f, 106px 93px #0f0f0f, 112px 93px #0f0f0f, 116px 93px #0f0f0f, 120px 93px #0f0f0f, 124px 93px #0f0f0f, 128px 93px #0f0f0f, 132px 93px #0f0f0f, 136px 93px #0f0f0f, 140px 93px #0f0f0f, 144px 93px #0f0f0f, 148px 93px #0f0f0f, 154px 93px #0f0f0f, 158px 93px #0f0f0f, 52px 48px #ffffff, 164px 36px #ffffff, 96px 44px #87ffff";



function initVirtualPet() {

      var firebaseConfig = {
    apiKey: "AIzaSyD69EJwLEA2zQpGeUXK2XHRg69Ca-fTpzc",
    authDomain: "the-amazing-jukebox.firebaseapp.com",
    databaseURL: "https://the-amazing-jukebox-default-rtdb.firebaseio.com",
    projectId: "the-amazing-jukebox",
    storageBucket: "the-amazing-jukebox.appspot.com",
    messagingSenderId: "778454163688",
    appId: "1:778454163688:web:f7198448fb38dee2cb695d",
    measurementId: "G-G2E58RL3ZG"
  };

    // Levantamos el puente con Google si las librerías de la Zona 1 ya están despiertas
    if (window.firebase && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        window.db = firebase.database(); // Declaramos la variable global en la RAM de tu PC
        console.log("✅ CLOUD INTERFACE: CONEXIÓN EN VIVO LOGRADA DESDE LIVE SERVER LOCAL.");
    }

    
     // 🚨 BOTÓN DE AUTODESTRUCCIÓN TEMPORAL: Fuerza al navegador a borrar los datos viejos corruptos
    localStorage.clear(); 
    // Inicialización nativa directa aislada al 100% libre de cuotas externas
    petState.isHatched = false;
    petState.eggClicks = 0;
    petState.age = 0;
    petState.isSleeping = false;
    petState.isGameFinished = false; // Candado absoluto de inicio
    
    // EL RELOJ REFRESH EN VIVO (Cada 500ms redibuja y avanza los fotogramas)
    setInterval(() => {

         // 🛑 ESCUDO PASIVO DE LA CÚPULA ARCADE:
        // Si la zona arcade está activa, este candado congela de forma rígida el andar 
        // de Margo y las nubes de la granja, pero SIN alterar ni re-escribir tus lonas,
        // garantizando que tus iniciales y tus juegos corran estables en segundo plano.
        if (isArcadeZoneActive === true) {
            return; // Parada de emergencia limpia del bucle ordinario de la granja
        }

        frameTick = (frameTick + 1) % 2;
                                   if (petState.isHatched) {
            // 🛑 ESCUDO DE PARADA ABSOLUTA: Si el juego ya está ganado, congelamos el hilo
            if (petState.isGameFinished === true) {
                triggerEndgameProtocol();
                return;
            }

            const ahora = Date.now();
            const transcurridoMilisegundos = ahora - petState.lastUpdate;

            // Reloj síncrono base por tiempo de la oficina
            if (transcurridoMilisegundos >= 1800000) {
                petState.age += 1;
                petState.lastUpdate = ahora;
                updatePetInterface();
            }

            // 🟢 EL BOOST CUÁNTICO ADITIVO DE GIGABYTES (CORREGIDO):
            // Si el peso de Margo rompe los 1,000 GB de voltaje, calculamos de forma directa los bloques 
            // de 500 GB excedentes. Al usar "+= añosExtraPorGB", el script RESPETA la edad biológica 
            // que ya tenías (ej. 4 años) y le SUMA la bonificación del voltaje al instante en la RAM.
            if (petState.weight >= 1000) {
                // Creamos una bandera interna temporal para que solo sume el año en el milisegundo del rebase
                if (window.lastProcessedWeightBlock === undefined) window.lastProcessedWeightBlock = 1000;
                
                if (petState.weight >= window.lastProcessedWeightBlock) {
                    petState.age += 1; // Suma 1 año extra aditivo a lo que ya tenías
                    window.lastProcessedWeightBlock += 500; // Recalibra el siguiente umbral a los 1500, 2000, etc.
                    updatePetInterface();
                }
            }

            // 🏆 DETECTOR DE FIN DE JUEGO ADAPTADO A TUS 9 AÑOS DE VELOCIDAD
            if (petState.age >= 39) {
                petState.isGameFinished = true;
                triggerEndgameProtocol();
                return;
            }



            // 🟢 LÓGICA EN TIEMPO REAL: Evaluamos edad y peso 2 veces por segundo
            checkEvolutionRules();


              if (petState.isSick && petState.clean >= 20) {
                petState.isSick = false;
                document.getElementById("pet-status-bubble").innerText = "🟢 SYSTEM STABLE. CIRCUITS CORE ALIGNED.";
                
                // Forzamos el refresco y guardado inmediato en tu PC
                updatePetInterface();
                savePetState();
            }

            if (!petState.isSleeping) {
                margoX += (walkDir * 2.5); 
                let maxCol = (petState.age < 1) ? 200 : 165;
                if (margoX >= maxCol) { margoX = maxCol; walkDir = -1; }
                if (margoX <= 60) { margoX = 60; walkDir = 1; }
            }
        }

        



        renderMargoDisplay();
    }, 500);

    // ==============================================================================
    // 🧠 ZONA 1: SENSOR EVOLUTIVO AUTOMÁTICO POR TIEMPO Y PESO EN GB (RELOJ CENTRAL)
    // ==============================================================================
    // DEGRADACIÓN DE SIGNOS VITALES LOCAL Y EVENTOS ALEATORIOS (Cada 30s)
    setInterval(() => {

        // 🛑 CÚPULA DE PAUSA MAESTRA (SANITARIA Y SIGNOS VITALES):
        // Mientras estés metido en la zona recreativa, las barras se congelan 
        // y los dados de la popó se apagan al 100% en background de forma automática.
        if (isArcadeZoneActive === true) return; 

        if (petState.isHatched) {
            

            // 🧠 SENSOR GRÁFICO AUTOMÁTICO PASIVO (Respaldo del reloj)
            
            // Desgaste de signos vitales
            if (petState.isSleeping) {
                let poopPenalty = hasPoop ? 8 : 0;
                petState.sleep = Math.min(100, petState.sleep + 33);
                petState.clean = Math.max(0, petState.clean - poopPenalty);
                // 🟢 RE-PINTADO NOCTURNO AUTOMÁTICO:
                // Cada 30 segundos que transcurran de noche, obligamos al motor a redibujar 
                // las barras en la pantalla, permitiendo que veas avanzar el progreso en vivo.
                updatePetInterface();
            } else {
                let poopPenalty = hasPoop ? 8 : 1;
                petState.energy = Math.max(0, petState.energy - 1);
                petState.clean = Math.max(0, petState.clean - poopPenalty);
                petState.happy = Math.max(0, petState.happy - 1);
                petState.sleep = Math.max(0, petState.sleep - 1);
                                // 💩 PROBABILIDAD DE EVENTO ALEATORIO (Cada 30s)
                if (!hasPoop && Math.random() < 0.25) {
                    // 🟢 EL FILTRO DE RETENCIÓN DE HARDWARE:
                    // Si la pantalla de la PC está congelada por la científica (true), 
                    // la popó se guarda en background ('poopWaitingInQueue = true') y se queda en pausa,
                    // impidiendo que rompa el clímax visual. Si la pantalla está libre, cae de golpe normal.
                    if (isEmojiDisplayLocked) {
                        poopWaitingInQueue = true; // Se va a la cola de espera de la RAM
                    } else {
                        // Comportamiento normal estándar diurno si Margo está paseando relajado
                        hasPoop = true;
                        document.getElementById("pet-status-bubble").innerText = "⚠️ WARNING: CIRCUIT OBSTRUCTION DETECTED [💩]";
                        petState.clean = Math.max(0, petState.clean - 15);
                        
                        const overlay = document.getElementById("matrix-emoji-overlay");
                        if (overlay) {
                            overlay.innerHTML = `<span id="pixel-poop-sprite" class="matrix-item-emoji" style="left: 235px; top: 100px; filter: drop-shadow(0 0 2px rgba(135, 255, 255, 0.4)); animation: none;">💩</span>`;
                        }
                        updatePetInterface();
                        savePetState();
                    }
                }

            }
            
            // 🟢 ZONA 2: DETECTOR DE ENFERMEDAD (SICK STATE ACTIVE)
            // Si la barra cae por debajo de 20%, el sistema se infecta al instante
            if (petState.clean < 20) {
                if (!petState.isSick) {
                    petState.isSick = true;
                    document.getElementById("pet-status-bubble").innerText = "☢️ RADIOACTIVITY DETECTED! PURIFY CIRCUITS IMMEDIATELY";
                }
            }
            
            // Refresco pasivo de fin de ciclo normal cada 30s
            savePetState();
            updatePetInterface();
            renderMargoDisplay(); // Forzamos al motor gráfico a revisar si debe pintar la calavera
        }
    }, 30000);

      // PERSISTENCIA CORES DISCO REFORZADA FUERA DE RENDER
    if (petState.discoUnlocked) {
        const discoBall = document.getElementById("gotchi-disco-ball");
        const discoStrobe = document.getElementById("gotchi-disco-strobe");
        if (discoBall) discoBall.className = "disco-active";
        if (discoStrobe) discoStrobe.className = "disco-active";
    }


        const saved = localStorage.getItem('jukebox_pet_v65_data');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            
            // 🟢 EL CINCEL DE LIBERACIÓN DE ARRANQUE:
            // Si el archivo guardado en el disco de tu PC dice que el juego ya fue ganado,
            // forzamos un reseteo instantáneo de variables para que el usuario pueda volver 
            // a jugar desde cero al refrescar, en lugar de quedarse atrapado en la victoria.
            if (parsed.isGameFinished === true) {
                localStorage.removeItem('jukebox_pet_v65_data'); // Borra el caché de campeón viejo
                petState.isGameFinished = false; // Apaga el interruptor
                petState.age = 0;
                petState.weight = 1;
                petState.isHatched = false;
            } else {
                petState = parsed;
                aplicarDesgastePorTiempo();
            }
        } catch(e) { console.error("Error leyendo caché local"); }
    }

        // ==============================================================================
    // 🚦 OSCILADOR DEDICADO DEL LED CON DIAGNÓSTICO DE CRISIS EN VIVO V37.0
    // ==============================================================================
    var ledStateFrame = 0;
    var ledTimerId = null;

    function ejecutarPulsoElectromagneticoLed() {
        var hardwareLedEl = document.querySelector(".cyber-hardware-led");
        if (!hardwareLedEl) return;

        // 🧠 SENSOR DE CONDICIONES CRÍTICAS (AUDITORÍA DE HARDWARE EN CALIENTE):
        // Evaluamos al milisegundo si el sistema sufre: Infección de virus (isSick), 
        // obstrucción de basura (hasPoop) o si las barras bajan del 20% crítico.
        var estaEnCrisis = (
            petState.isSick === true || 
            hasPoop === true || 
            petState.energy < 20 || 
            petState.happy < 20 ||
            petState.clean < 25 ||  
            petState.sleep < 20
        );

        // Limpiamos los estilos viejos para que no se queden colores encimados en la lona
        hardwareLedEl.classList.remove("led-on", "led-danger-on");

        if (ledStateFrame === 0) {
            // 🛑 FASE ENCENDIDO: Evaluamos qué color inyectar según el estatus médico
            if (estaEnCrisis) {
                hardwareLedEl.classList.add("led-danger-on"); // Estalla el neón rojo de alarma
            } else {
                hardwareLedEl.classList.add("led-on"); // Destella el verde pasto estable del chat
            }
        } else {
            // FASE APAGADO: Ambos regresan síncronos al verde esmerilado pasivo del molde
        }

        // Alternamos el interruptor binario y calculamos el ritmo del siguiente cuadro
        ledStateFrame = (ledStateFrame + 1) % 2;
        
        // 📐 EL DINAMISMO SOBRE LA MARCHA: Si está en crisis, la ráfaga se acelera de forma visible 
        // a 350ms (militar rápido); si está estable, regresa a su latido calmo de 1200ms (1.2 segundos).
        var siguienteIntervaloMs = estaEnCrisis ? 555 : 2950;
        
        // El bucle se re-invoca a sí mismo de forma elástica heredando el ritmo en tiempo real
        ledTimerId = setTimeout(ejecutarPulsoElectromagneticoLed, siguienteIntervaloMs);
    }

    // Disparo inicial del primer latido al cargar la nebulosa del huevo
    ledTimerId = setTimeout(ejecutarPulsoElectromagneticoLed, 2950);


    const displayEl = document.getElementById("t-matrix-display");
    if (displayEl) displayEl.onclick = crackMargoEgg;
    updatePetInterface();
}
// ==============================================================================
// 🧬 SENSOR DE ALERTAS Y METAMORFOSIS SÍNCRONA EN TIEMPO REAL V12.2
// ==============================================================================
function checkEvolutionRules() {
    if (!petState.isHatched) return;
    let changed = false;

    // Inicializamos la propiedad de etapa si no existe en tu caché para evitar errores
    if (petState.evolutionStage === undefined) petState.evolutionStage = 0;

    // 🟢 REGLA ETAPA 2 (ADOLESCENTE): Al cruzar 250 GB o 1 Año de edad por tiempo
    if ((petState.weight >= 5000 || petState.age >= 7) && petState.evolutionStage < 1) {
        petState.evolutionStage = 1; // Bloquea la alerta para que no se repita en bucle
        
        // Sincroniza la telemetría visual de forma forzada al milisegundo
        if (petState.age < 7) petState.age = 7; 
        
        // 💥 DISPARADOR DE ALERTA INSTANTÁNEO POR TIEMPO/PESO
        document.getElementById("pet-status-bubble").innerText = "⚡ VOLTAGE OVERLOAD! TEEN MUTATION ACTIVE.";
        changed = true;
    }
    
    // 🟢 REGLA ETAPA 3 (CYBER-ROOSTER): Al cruzar 500 GB o 3 Años de edad por tiempo
    if ((petState.weight >= 10000 || petState.age >= 18) && petState.evolutionStage < 2) {
        petState.evolutionStage = 2; // Bloquea la alerta
        
        // Sincroniza la telemetría visual de forma forzada al milisegundo
        if (petState.age < 18) petState.age = 18; 
        
        // 💥 DISPARADOR DE ALERTA INSTANTÁNEO POR TIEMPO/PESO
        document.getElementById("pet-status-bubble").innerText = "⚡ HYPER VOLTAGE! CYBER-ROOSTER UNLOCKED.";
        changed = true;
    }

    if (changed) {
        updatePetInterface();
        renderMargoDisplay();
        savePetState();
    }
}


// ==============================================================================
// 🐣 ZONA 2: RITUAL DE NACIMIENTO CON SIGNOS VITALES MEDIOS INTERACTIVOS
// ==============================================================================
function crackMargoEgg() {
    if (petState.isHatched) return;
    petState.eggClicks++;
    if (petState.eggClicks >= 3) {
        petState.isHatched = true;
        petState.age = 0;

        // 🟢 CALIBRACIÓN INTERACTIVA DE ARRANQUE:
        // Nace con hambre, sucio y con ganas de jugar para obligar al usuario
        // a interactuar con los comandos táctiles de VSCode de inmediato.
        petState.energy = 35;  // 35% de Batería/Energía Digital
        petState.clean = 45;   // 40% de Limpieza de Circuitos
        petState.happy = 40;   // 45% de Logs/Felicidad
        petState.sleep = 70;   // 70% de Descanso

        document.getElementById("pet-status-bubble").innerText = "CORE OPEN! SIGNALS ALIGNED.";

        // Guardamos y actualizamos la interfaz superior en el acto
        updatePetInterface();
        renderMargoDisplay();
        savePetState();
    } else {
        document.getElementById("pet-status-bubble").innerText = `TOUCH EGG 3 TIMES TO PLOP... [${petState.eggClicks}/3]`;
    }
}

// ==============================================================================
// 📺 ZONA 1: PROYECTOR DE FONDOS Y AVATARES DINÁMICOS COMPILADOS V10.8
// ==============================================================================
function renderMargoDisplay() {
    
    // 🛑 ESCUDO GRÁFICO MAESTRO: Si la cúpula arcade está encendida en la RAM,
    // el proyector de la granja diurna tiene prohibido por software tocar el cristal.
    if (isArcadeZoneActive === true) {
        return; 
    }

    const margoEl = document.getElementById("margo-core");
    const sceneryEl = document.getElementById("matrix-scenery-back");
    const containerEl = document.getElementById("t-matrix-display");
    if (!margoEl || !sceneryEl || !containerEl) return;

    if (walkDir === -1 && !petState.isSleeping && petState.isHatched) {
        margoEl.style.transform = "scaleX(-1)";
    } else {
        margoEl.style.transform = "scaleX(1)";
    }

    if (!petState.isHatched) {
        margoEl.style.boxShadow = SHADOW_EGG;
        margoEl.style.left = "42px";
        // 🪐 LA GALAXIA DEL HUEVO: Sustituimos el fondo plano viejo por una nebulosa pixelada.
        // Espacio profundo negro (#03010a) que transiciona suavemente hacia un morado cósmico (#32145a),
        // un violeta neón (#51187d) y remata en un hermoso azul digital holográfico (#12255e) abajo.
        containerEl.style.background = "linear-gradient(135deg, #03010a 0%, #32145a 35%, #51187d 70%, #12255e 100%)";
        
        // 🟢 ESTRELLAS CÓSMICAS RETRO: Proyectamos un set de constelaciones fijas 
        // alrededor del huevo en color cian neón (#87ffff) y blanco (#ffffff) usando las sombras traseras
        sceneryEl.style.boxShadow = "12px 16px #87ffff, 160px 24px #ffffff, 90px 12px #87ffff, 32px 48px #ffffff, 180px 56px #87ffff, 140px 40px #ffffff, 75px 60px #ffffff";
        

    } else if (petState.isSleeping) {
        // Cielo Medianoche Profundo (#0c1220) y Pasto Verde Esmerilado Oscuro (#1b5e20)
        containerEl.style.background = "linear-gradient(to bottom, #0c1220 0%, #0c1220 55%, #1b5e20 55%, #1b5e20 100%)";

        // Cerca ocre claro brillante, vaca y granero estables. Alterna el titileo de las estrellas de fábrica
        sceneryEl.style.boxShadow = (frameTick === 0) ? SCENE_NIGHT_A : SCENE_NIGHT_B;

        // 🟢 PERSISTENCIA NOCTURNA MAESTRA:
        // En lugar de borrar a ciegas todo el overlay, el script valida si la popó 
        // está activa en memoria. Si existe, la clava en su sitio exacto de noche; si no, limpia.
        const overlay = document.getElementById("matrix-emoji-overlay");
        if (overlay) {
            if (hasPoop) {
                overlay.innerHTML = `<span id="pixel-poop-sprite" class="matrix-item-emoji" style="left: 235px; top: 100px; filter: drop-shadow(0 0 2px rgba(135,255,255,0.4)); animation: none;">💩</span>`;
            } else {
                overlay.innerHTML = "";
            }
        }

        // Margo amarillo con su bandana elástica azul neón respirando
        margoEl.style.boxShadow = (frameTick === 0) ? SHADOW_MARGO_SLEEP_A : SHADOW_MARGO_SLEEP_B;

        margoEl.style.left = margoX + "px";
        margoEl.style.top = "auto";
     } else {
        // ☀️ MODO INTERACTIVO DIURNO / DISCO CYBERPUNK COMPILADO
        // Si el Easter Egg está activo (petState.discoUnlocked es true), forzamos el cielo nocturno profundo 
        // para que las luces neón destaquen con un contraste espectacular. Si no, corre tu día brillante normal.
        if (petState.discoUnlocked) {
            // Cielo Medianoche Profundo (#0c1220) y Pasto Verde Esmerilado Oscuro (#1b5e20)
            containerEl.style.background = "linear-gradient(to bottom, #0c1220 0%, #0c1220 55%, #1b5e20 55%, #1b5e20 100%)";
            
            // Proyectamos tu hermosa noche original con las estrellas titilando y el granero estable
            sceneryEl.style.boxShadow = (frameTick === 0) ? SCENE_NIGHT_A : SCENE_NIGHT_B;
        } else {
            // Fondo brillante normal diurno de fábrica si Margo está sano y relajado
            containerEl.style.background = "linear-gradient(to bottom, #87ffff 0%, #87ffff 55%, #39ff14 55%, #39ff14 100%)";
            sceneryEl.style.boxShadow = SCENE_DAYTIME;
        }

        margoEl.style.left = margoX + "px";

        // 🟢 EL CANDADO GRÁFICO INDESTRUCTIBLE:
        // Si el usuario intentó alimentar a Margo en el micro-segundo de caída y el render
        // diurno se activa, este escudo revisa la memoria RAM. Si hasPoop es true,
        // re-inyectamos el sprite de la popó de forma forzada en tu coordenada (left: 235px)
        // impidiendo que la comida o el voltaje lo borren de la lona.
        const overlay = document.getElementById("matrix-emoji-overlay");
        if (overlay) {
            if (hasPoop) {
                overlay.innerHTML = `<span id="pixel-poop-sprite" class="matrix-item-emoji" style="left: 235px; top: 100px; filter: drop-shadow(0 0 2px rgba(135,255,255,0.4)); animation: none;">💩</span>`;
            }
        }


        // Árbol evolutivo diurno de 3 niveles intacto
        if (petState.age < 7) {
            margoEl.style.boxShadow = (frameTick === 0) ? SHADOW_MARGO_FRAME_A : SHADOW_MARGO_FRAME_B;
        } else if (petState.age >= 7 && petState.age < 18) {
            margoEl.style.boxShadow = (frameTick === 0) ? SHADOW_TEEN_A : SHADOW_TEEN_B;
        } else if (petState.age >= 18) {
            margoEl.style.boxShadow = (frameTick === 0) ? SHADOW_ROOSTER_A : SHADOW_ROOSTER_B;
        }
    }
    // ==============================================================================
    // ☢️💀 PROYECTOR DE RADIOACTIVIDAD FLOTANTE EN TIEMPO REAL (ZONA EMITIDA SICK)
    // ==============================================================================
    const overlay = document.getElementById("matrix-emoji-overlay");
    if (overlay && petState.isSick && !petState.isSleeping) {
        // Si está enfermo y despierto, forzamos que aparezca una calavera retro pixelada 
        // parpadeando al lado de su cabeza (X: margoX + 45px) sin borrar la popó del suelo
        const poopHtml = hasPoop ? `<span id="pixel-poop-sprite" class="matrix-item-emoji" style="left: 235px; top: 100px; filter: drop-shadow(0 0 2px rgba(135,255,255,0.4)); animation: none;">💩</span>` : "";
        overlay.innerHTML = poopHtml + `<span class="matrix-item-emoji" style="left:${margoX + 40}px; top:20px; animation: emojiFloat 1s infinite alternate; filter: drop-shadow(0 0 4px #ff0055);">☢️</span>`;
    }
}


// ==============================================================================
// 🔋 ZONA 1: MOTOR DE CYBER-DIET CORREGIDO (ENERGÍA Y PESO ALINEADOS)
// ==============================================================================
function executeFeeding() {
    // 🛑 REGLA UNIVERSAL: Si la zona recreativa está abierta, se anula la cyber-dieta al fotograma cero
    if (isArcadeZoneActive === true) return; 

    if (!petState.isHatched || petState.isSleeping) return;
      // Candado estricto de campeonato: Bloquea comidas y voltajes al ganar
    if (petState.isGameFinished === true) return; 



     // 🟢 EL ESCUDO QUIRÚRGICO: Si hay una popó en el suelo, bloqueamos todo el menú.
    // El sistema arroja una advertencia en la burbuja y aborta la alimentación al milisegundo.
    if (hasPoop) {
        document.getElementById("pet-status-bubble").innerText = "❌ ACTION DENIED: PURIFY CIRCUITS BEFORE FEEDING!";
        return; // Candado rígido de parada absoluta
    }

      if (!petState.isHatched || petState.isSleeping) return;

        const selector = document.getElementById("pet-food-selector");
    const food = selector.value;

    if (food === "data") {
        // 💾 EL DISQUETE: Sube 5% de Energía y suma 1 GB de peso real
        petState.energy = Math.min(100, petState.energy + 1);
        petState.weight += 1;
        
        // 🟢 REGISTRO DE SABIDURÍA: Sumamos 1 ración consecutiva
        petState.consecutiveDataCount += 1;
        triggerVisualEmoji("💾");

                        // 💥 DISPARADOR DEL EASTER EGG REFORZADO (15 Raciones Consecutivas completadas)
        if (petState.consecutiveDataCount >= 23) {
            petState.consecutiveDataCount = 0; // Reseteamos el contador de raciones
            
            isEmojiDisplayLocked = true;
            
            const overlay = document.getElementById("matrix-emoji-overlay");
            if (overlay) {
                // 🟢 LÍNEA DE TAMAÑO MODIFICADA: Cambiado de 26px a 32px para hacer el emoji mucho más grande
                overlay.innerHTML = `<span id="pixel-poop-sprite" class="matrix-item-emoji" style="left:${margoX + 15}px; top:25px; font-size: 36px; animation: none; filter: drop-shadow(0 0 6px #87ffff);">👩‍🔬💾</span>`;
            }
            
            document.getElementById("pet-status-bubble").innerText = "🏆 WISDOM ACHIEVEMENT UNLOCKED! CORES RESTORED 100%";
            
            // Restauración total de hardware al 100% de fábrica al instante
            petState.energy = 100;
            petState.clean = 100;
            petState.happy = 100;
            petState.sleep = 100;
            petState.weight += 500;
            petState.isSick = false;

            // ⏰ EL DETONADOR DEL RELOJ: Modificado a 10000ms (10 segundos reales)
            setTimeout(() => {
                isEmojiDisplayLocked = false;
                
                // 🟢 LA LLAVE MAESTRA DE COLA DE EVENTOS:
                // Al terminar los 10 segundos, el script revisa si cayó una popó en background.
                // Si la variable de espera es verdadera, inyecta la popó y desata la alerta en el acto.
                if (poopWaitingInQueue) {
                    poopWaitingInQueue = false;
                    hasPoop = true; // Se enciende formalmente el estado en background
                    
                    document.getElementById("pet-status-bubble").innerText = "⚠️ WARNING: CIRCUIT OBSTRUCTION DETECTED [💩]";
                    petState.clean = Math.max(0, petState.clean - 15); // Castigo síncrono
                    
                    if (overlay) {
                        overlay.innerHTML = `<span id="pixel-poop-sprite" class="matrix-item-emoji" style="left: 235px; top: 100px; filter: drop-shadow(0 0 2px rgba(135, 255, 255, 0.4)); animation: none;">💩</span>`;
                    }
                    updatePetInterface();
                    savePetState();
                } else {
                    // Si no hubo popó en la fila, la pantalla se limpia normal y líquida
                    if (overlay) overlay.innerHTML = "";
                    document.getElementById("pet-status-bubble").innerText = "🟢 CIRCUITS RE-CALIBRATED BY WISDOM ANCHOR.";
                }
            }, 9000); // 🚨 Cambiado de 5000 a 10000ms (10 segundos a tu gusto exacto)
        }



    } else {
        // ❌ ESCUDO DE INTERRUPCIÓN: Si Margo consume helado, burger o voltaje, 
        // la cadena consecutiva se rompe y el contador vuelve a cero en background
        petState.consecutiveDataCount = 0;

        if (food === "icecream") {
            petState.happy = Math.min(100, petState.happy + 10);
            petState.clean = Math.max(0, petState.clean - 5);
            petState.weight += 2;
            triggerVisualEmoji("🍦");
        } else if (food === "voltage") {
            petState.energy = Math.min(100, petState.energy + 7);
            petState.sleep = Math.max(0, petState.sleep - 15);
            petState.weight += 8;
            triggerVisualEmoji("⚡");
            checkEvolutionRules(); 
            updatePetInterface();
            renderMargoDisplay();
            savePetState();
            return;
        } else if (food === "burger") {
            petState.energy = Math.min(100, petState.energy + 10);
            petState.weight += 4;
            triggerVisualEmoji("🍔");
        } else if (food === "song") {
            // Tu lógica de la canción/Manna cíclica de 333 se queda idéntica aquí...
            petState.energy = Math.min(100, petState.energy + 3);
            petState.happy = Math.min(100, petState.happy + 3);
            petState.manna += 9; 
            triggerVisualEmoji("🎶");

            if (petState.manna % 333 < 9 && petState.manna >= 333 && !petState.discoUnlocked && !petState.isSleeping) {
                petState.discoUnlocked = true;
                document.getElementById("pet-status-bubble").innerText = "💃 DANCEFLOOR ACTIVATED! DISCO MODE UNLOCKED.";
                const discoBall = document.getElementById("gotchi-disco-ball");
                const discoStrobe = document.getElementById("gotchi-disco-strobe");
                if (discoBall) discoBall.className = "disco-active";
                if (discoStrobe) discoStrobe.className = "disco-active";
            }
        }
    }

    // Refresco síncrono del monitor y guardado en tu disco de fábrica
    checkEvolutionRules();
    updatePetInterface();
    renderMargoDisplay();
    savePetState();
}

// ==============================================================================
// 📟 PROYECTOR DE NUTRICIÓN DIGITAL CON ESCUDO DE PERSISTENCIA ANTI-LAG V24.0
// ==============================================================================
function triggerVisualEmoji(emoji) {
    // 🟢 EL ESCUDO QUIRÚRGICO: Si el candado de la científica está activo (true),
    // el script ignora cualquier disquete o helado extra, dejando el logro fijo.
    if (isEmojiDisplayLocked) return;

    const overlay = document.getElementById("matrix-emoji-overlay");
    if (!overlay) return;

    // Proyectamos el alimento flotando arriba a la derecha del personaje
    overlay.innerHTML = `<span class="matrix-item-emoji" style="left:${margoX + 28}px; top:40px;">${emoji}</span>`;

    // Limpieza estándar a los 1.5 segundos para la comida normal
    setTimeout(() => {
        if (!isEmojiDisplayLocked) { // Solo limpia si no se ha activado un logro en ese inter
            overlay.innerHTML = "";
        }
    }, 1500);
}

function interactWithPet(action) {
     // 🛑 REGLA UNIVERSAL: Si la zona arcade está abierta y el usuario intenta limpiar o dormir, se congela el clic
    if (isArcadeZoneActive === true && action !== 'play') return;

    if (!petState.isHatched) return;
    if (petState.isSleeping && action !== 'sleep') return;
    // Candado estricto de campeonato: Bloquea juegos, sueño y duchas al ganar
    if (petState.isGameFinished === true) return; 


        // 🟢 ESCUDO DE INTERACCIÓN INTEGRADO: CANDADO DE JUEGO Y COMIDA ANTICIPADO
    // Si la PC ya decidió que hay obstrucción (hasPoop es true) y el usuario intenta 
    // jugar ('play') o ejecutar el acto de comer ('eat'), congelamos la acción al milisegundo.
    // Dejamos el camino 100% libre si la acción es la ducha ('clean') para poder purificarlo.
    if (hasPoop && (action === 'play' || action === 'eat')) {
        document.getElementById("pet-status-bubble").innerText = "❌ ACTION DENIED: REACTION INHIBITED BY CONTAMINATION!";
        return; // Parada rígida absoluta
    }



    if (action === 'clean') {
        if (petState.isSick) {
            petState.clean = Math.min(100, petState.clean + 1); // 🟢 Penalización por enfermedad
            petState.happy = Math.min(100, petState.happy + 1);
        } else {
            petState.clean = Math.min(100, petState.clean + 15); // Rango normal diurno
            petState.happy = Math.min(100, petState.happy + 5);
        }
        
        

         // 💩 EVAPORACIÓN SANITARIA DE LA POPÓ
        if (hasPoop) {
            hasPoop = false;
            
            // 🟢 EL CINCEL DE PRIORIDAD NUCLEAR CRÍTICA:
            // Validamos si el virus está activo en la memoria RAM. Si Margo sigue enfermo,
            // bloqueamos por completo el mensaje de "circuits purified" y forzamos a que se 
            // mantenga el letrero nuclear intacto. Si está sano, corre tu mensaje normal.
            if (petState.isSick) {
                document.getElementById("pet-status-bubble").innerText = "☢️ RADIOACTIVITY DETECTED! PURIFY CIRCUITS IMMEDIATELY";
            } else {
                document.getElementById("pet-status-bubble").innerText = "🚿 ECO-FLUSH COMPLETED. CIRCUITS PURIFIED.";
            }

            // Borramos físicamente el sprite de la popó del pasto en tu coordenada 235px
            const poopSprite = document.getElementById("pixel-poop-sprite");
            if (poopSprite) poopSprite.remove();
        }

        // Si la barra se recupera por encima de 40 pasivamente, apaga el estado enfermo (Regla nativa)
        if (petState.clean > 40) petState.isSick = false;
        
        triggerVisualEmoji("🚿");
    
    
                            } else if (action === 'play') {
        const gamePanel = document.getElementById("pet-minigame-controls");
        if (!gamePanel) return;

        // 🔄 SWITCH DE ENERGÍA MAESTRO UNIVERSAL CON RESET ÓPTICO REAL V35.0
        if (isArcadeZoneActive === false) {
            // 🟢 MODO ENCENDIDO: Energiza la Cúpula Arcade de golpe
            isArcadeZoneActive = true; 
            isArcadeMenuDisplayActive = true; 
            
            // Fijamos rígidamente tu letrero premium en la burbuja y nadie más lo altera
            document.getElementById("pet-status-bubble").innerText = "🕹️ ARCADE ZONE ACTIVATED...";
            
            // RESET DE CAPAS DE TRACCIÓN EN CALIENTE:
            // Cada vez que se presione el botón, obligamos al script a esconder el cartucho de Hockey
            const hockeyLayer = document.getElementById("gotchi-hockey-cartridge");
            if (hockeyLayer) {
                hockeyLayer.style.setProperty("display", "none", "important");
                hockeyLayer.style.setProperty("opacity", "0", "important");
                hockeyLayer.className = "hockey-layer-hidden";
            }

            // Encendemos y traemos al frente absoluto la lona negra del menú general
            const arcadeLayer = document.getElementById("gotchi-arcade-menu-layer");
            if (arcadeLayer) {
                arcadeLayer.style.setProperty("display", "flex", "important");
                arcadeLayer.style.setProperty("opacity", "1", "important");
                arcadeLayer.style.setProperty("visibility", "visible", "important");
                arcadeLayer.classList.add("arcade-layer-active");
            }
            
            gamePanel.classList.add("active-pad"); // El cajón de 80px se desliza hacia abajo
            renderArcadeMenuOnScreen(); // Invoca al proyector gráfico del catálogo SELECT GAME
        } else {
            // 🔴 MODO APAGADO UNIVERSAL CON RE-DIRECCIÓN DE RETORNO AL MENÚ PRINCIPAL (REPARADO V35.0)
            // No importa si cierras el panel por error de dedo desde el catálogo limpio, en la tabla 
            // de récords o en pleno partido; este bloque apaga la energía general de la RAM.
            isArcadeZoneActive = false; 
            isArcadeMenuDisplayActive = false;
            
            // Detenemos los dos bucles de tiempo de los minijuegos de forma nominal y segura
            if (hockeyInterval) { clearInterval(hockeyInterval); hockeyInterval = null; }
            if (keyboardPhysicsInterval) { clearInterval(keyboardPhysicsInterval); keyboardPhysicsInterval = null; }
            
            // Reseteamos de forma rígida las variables del cartucho al estado de fábrica
            if (typeof hockeyState !== "undefined" && hockeyState) {
                hockeyState.currentStage = "welcome";
                hockeyState.activeCharIndex = 0;
                hockeyState.nameChars = ["A", "A", "A", "A", "A"];
            }
            
            isButtonDebounceActive = false;
            keysPressed = {};
            userPaddleVelocity = 0;

            gamePanel.classList.remove("active-pad"); // El chasis se guarda hacia arriba de inmediato
            
            // 🧱 LA LLAVE MAESTRA ÓPTICA (EL FIN DE LA CAPA FANTASMA):
            // Apagamos y removemos la clase activa de la lona del menú de forma obligatoria.
            // Esto le ordena al CSS desvanecer el fondo negro hacia la transparencia,
            // eliminando por completo el color atorado y mostrando tu granja con total nitidez.
            const arcadeLayer = document.getElementById("gotchi-arcade-menu-layer");
            if (arcadeLayer) {
                arcadeLayer.classList.remove("arcade-layer-active");
                arcadeLayer.style.setProperty("display", "none", "important");
                arcadeLayer.style.setProperty("opacity", "0", "important");
            }

            const hockeyLayer = document.getElementById("gotchi-hockey-cartridge");
            if (hockeyLayer) {
                hockeyLayer.style.setProperty("display", "none", "important");
                hockeyLayer.style.setProperty("opacity", "0", "important");
                hockeyLayer.className = "hockey-layer-hidden";
            }
            
            // Limpiamos los emojis flotantes normales y devolvemos la cadena base de la granja
            document.getElementById("matrix-emoji-overlay").innerHTML = "";
            document.getElementById("pet-status-bubble").innerText = "READY FOR BITSTREAM...";
            
            // El procesador re-pinta la granja diurna y reanuda el caminar de Margo al milisegundo
            updatePetInterface();
            renderMargoDisplay();
        }
        return; 
    } else if (action === 'sleep') {



        petState.isSleeping = !petState.isSleeping;

         if (petState.isSleeping) {
            // 🟢 EL SENSOR DETECTOR DE FIESTA ACTIVA:
            // Revisamos si el modo disco estaba encendido en la memoria RAM antes de apagar la luz.
            // Guardamos el veredicto en una variable temporal antes de resetear el candado.
            const estabaDeFiesta = petState.discoUnlocked;
            
            petState.discoUnlocked = false; // Reseteamos el candado para el próximo ciclo de 333
            
            const discoBall = document.getElementById("gotchi-disco-ball");
            const discoStrobe = document.getElementById("gotchi-disco-strobe");
            if (discoBall) discoBall.className = "disco-hidden";
            if (discoStrobe) discoStrobe.className = "disco-hidden";
            
            // 📊 TRIPLE INTERRUPTOR TEXTUAL DE PRECISIÓN:
            if (estabaDeFiesta) {
                // Estado 1: Feedback premium de inhibición de antro cyberpunk
                document.getElementById("pet-status-bubble").innerText = "💤 LIGHTS OUT. DISCO MODE INHIBITED.";
            } else {
                // Estado 2: Noche normal estándar de recarga de batería
                document.getElementById("pet-status-bubble").innerText = "💤 TIME TO SLEEP... ENERGIZING CIRCUITS.";
            }
        } else {
            // Estado 3: Amanecer unificado simétrico para ambos casos al despertar a Margo
            document.getElementById("pet-status-bubble").innerText = "☀️ LIGHTS ON. CIRCUITS AWAKE.";
        }

    }
    checkEvolutionRules();
updatePetInterface();
renderMargoDisplay();
savePetState();
}
// ==============================================================================
// 🕹️ PAD CONTROL BLINDADO: ESCUDO SANITARIO ANTI-PULSACIONES DE JUEGO V27.9
// ==============================================================================
function playMinigameTurn(userChoice) {
    // 🟢 EL CANDADO ABSOLUTO: Si la variable hasPoop está activa en la RAM,
    // este escudo congela de golpe las pulsaciones de [LEFT] y [RIGHT].
    // El sistema aborta el hilo en background, protegiendo los letreros de radioactividad.
    if (hasPoop) {
        document.getElementById("pet-status-bubble").innerText = "❌ ACTION DENIED: REACTION INHIBITED BY CONTAMINATION!";
        // Escondemos el panel para que el usuario no intente seguir cliqueando de forma elástica
        document.getElementById("pet-minigame-controls").style.display = "none";
        return; // Parada rígida inmediata
    }
    const sides = ['left', 'right']; const botChoice = sides[Math.floor(Math.random() * 2)];
    if (userChoice === botChoice) {
        petState.happy = Math.min(100, petState.happy + 15);
        document.getElementById("pet-status-bubble").innerText = `[ MATCH ] MARGO LOOKED ${botChoice.toUpperCase()}.`;
        triggerVisualEmoji("❤️");
    } else {
        document.getElementById("pet-status-bubble").innerText = `[ MISMATCH ] MARGO LOOKED ${botChoice.toUpperCase()}.`;
        triggerVisualEmoji("💢");
    }
    document.getElementById("pet-minigame-controls").style.display = "none";
    updatePetInterface();
}
function updatePetInterface() {
     // 🟢 EL CANDADO ANTI-ERRORES DE FONDO: 
    // Si el menú arcade está activo en el cristal, congelamos la actualización de textos
    // en background. Esto evita que los errores de variables rotas tiren el hilo gráfico,
    // eliminando por completo las caídas a negro y el parpadeo en tu monitor.
    if (isArcadeMenuDisplayActive === true) return;
    if (document.getElementById("bar-energy")) document.getElementById("bar-energy").style.width = petState.energy + "%";
    if (document.getElementById("bar-clean")) document.getElementById("bar-clean").style.width = petState.clean + "%";
    if (document.getElementById("bar-happy")) document.getElementById("bar-happy").style.width = petState.happy + "%";
    if (document.getElementById("bar-sleep")) document.getElementById("bar-sleep").style.width = petState.sleep + "%";
    document.getElementById("txt-energy").innerText = petState.energy + "%";
    document.getElementById("txt-clean").innerText = petState.clean + "%";
    document.getElementById("txt-happy").innerText = petState.happy + "%";
    document.getElementById("txt-sleep").innerText = petState.sleep + "%";
    document.getElementById("txt-age").innerText = petState.age;
    document.getElementById("txt-weight").innerText = petState.weight;
    document.getElementById("txt-manna").innerText = petState.manna;
    const stageEl = document.getElementById("txt-evolution-stage");
    if (stageEl) {
        if (!petState.isHatched) stageEl.innerText = "EGG CORE";
        else if (petState.age < 7) stageEl.innerText = "3D-CHICK (BABY)";
        else if (petState.age >= 7 && petState.age < 18) stageEl.innerText = "TEEN-CHICK (ADOLESCENTE)";
        else stageEl.innerText = "CYBER-ROOSTER (ADULTO MAX)"; // 🟢 Agregado
    }
}
function aplicarDesgastePorTiempo() {
    const ahora = Date.now(); const transcurrido = (ahora - petState.lastUpdate) / (1000 * 60 * 60);
    if (transcurrido > 0 && petState.isHatched) {
        const puntos = Math.floor(transcurrido * 4);
        if (petState.isSleeping) { petState.sleep = Math.min(100, petState.sleep + (puntos * 2)); }
        else {
            petState.energy = Math.max(0, petState.energy - puntos); petState.clean = Math.max(0, petState.clean - puntos);
            petState.happy = Math.max(0, petState.happy - puntos); petState.sleep = Math.max(0, petState.sleep - puntos);
        }
        if (petState.clean < 20) petState.isSick = true;
        petState.lastUpdate = ahora; savePetState();
    }
}
// 🟢 ANCLAJE DE ALCANCE MAESTRO: Declaración al fondo absoluto para la consola F12
function toggleVirtualPet() {
    const pop = document.getElementById("virtual-pet-popup"); if (!pop) return;
    pop.style.display = (pop.style.display === "block") ? "none" : "block";
    if (pop.style.display === "block") { updatePetInterface(); renderMargoDisplay(); }
}
window.toggleVirtualPet = toggleVirtualPet;
window.onload = function () {
    initVirtualPet();
};

// ==============================================================================
// 🚀 ARCADE ENGINE V2.0: MODO COMBATE ESPACIAL INTERESTELAR (PURA INGENIERÍA)
// ==============================================================================
window.isArcadeModeActive = false; // Estado del interruptor espacial
let arcadeInterval = null;
let playerY = 45; // Altura inicial del avión piloto
let meteorX = 200, meteorY = 45; // Coordenadas del peligro
let laserX = -10, laserY = 0; // Coordenadas del disparo láser
let arcadeScore = 0;

function startSpaceArcadeGame() {
    if (!petState.isHatched || petState.isSleeping || petState.isSick) return;
    
    window.isArcadeModeActive = true;
    arcadeScore = 0;
    meteorX = 200;
    meteorY = Math.floor(Math.random() * 70) + 15; // El meteorito aparece en una altura aleatoria
    laserX = -10; // Láser apagado inicialmente
    
    // Forzamos al motor gráfico a pintar la pantalla de negro absoluto
    document.getElementById("t-matrix-display").style.background = "#03010a";
    document.getElementById("matrix-scenery-back").style.boxShadow = "none"; // Apagamos la granja temporalmente
    document.getElementById("pet-status-bubble").innerText = "🕹️ ARCADE ACTIVE! [▲/▼] TO FLY | [TAB] TO FIRE!";
    
    // Bucle síncrono ultra-rápido de física espacial (Cada 80ms)
    arcadeInterval = setInterval(() => {
        meteorX -= 12; // El meteorito avanza velozmente hacia la izquierda
        
        // Si el láser está activo, avanza horizontalmente hacia la derecha
        if (laserX >= 0) laserX += 20;
        if (laserX > 220) laserX = -10; // Se apaga al salir del display
        
        // 💥 DETECTOR DE IMPACTO (El láser golpeó y destruyó el meteorito)
        if (laserX >= meteorX && laserX <= meteorX + 15 && Math.abs(laserY - meteorY) < 15) {
            meteorX = 200;
            meteorY = Math.floor(Math.random() * 70) + 15;
            laserX = -10; // Apagamos el láser usado
            arcadeScore += 25; // ¡Premio gordo por destrucción!
            document.getElementById("pet-status-bubble").innerText = "🎯 TARGET DESTROYED! SCORE: " + arcadeScore;
            triggerVisualEmoji("⭐");
        }
        
        // El meteorito rebasó al jugador sin chocar: ¡Punto de esquive!
        if (meteorX <= 0) {
            meteorX = 200;
            meteorY = Math.floor(Math.random() * 70) + 15;
            arcadeScore += 10;
        }
        
        // 💥 DETECTOR DE GAME OVER (El meteorito se estrelló contra el avión de Margo)
        if (meteorX >= 90 && meteorX <= 115 && Math.abs(playerY - meteorY) < 15) {
            closeSpaceArcade(); // Apagamos el arcade
            
            // Recompensa biológica: Bono masivo de felicidad por ganar el combate
            petState.happy = Math.min(100, petState.happy + 25);
            if (arcadeScore > petState.highScore) petState.highScore = arcadeScore;
            
            document.getElementById("pet-status-bubble").innerText = `💥 BOOM! JET CRASHED. SCORE: ${arcadeScore} [🏆 BEST: ${petState.highScore}]`;
            triggerVisualEmoji("💢");
            return;
        }
        
        refreshArcadeFrames();
    }, 80);
}

function moveArcadePlayer(delta) {
    playerY = Math.max(10, Math.min(85, playerY + delta)); // Límites del cristal
}

function fireArcadeLaser() {
    if (laserX >= 0) return; // Evita fuego repetido en ráfaga corrupta
    laserX = 115; // Nace justo en la punta del avión de Margo
    laserY = playerY + 20; // Alineado con su centro vertical
    triggerVisualEmoji("⚡");
}

function refreshArcadeFrames() {
    const margoEl = document.getElementById("margo-core");
    const sceneryEl = document.getElementById("matrix-scenery-back");
    if (!margoEl || !sceneryEl) return;
    
    margoEl.style.left = "110px";
    
    // 🟢 REFINAMIENTO ESTÉTICO: Cambiamos SHADOW_MARGO_FRAME_A por SHADOW_TEEN_A.
    // Al usar al adolescente, el pollito extenderá sus alas como alerones de caza 
    // espacial en medio del vacío negro, luciendo espectacular.
    margoEl.style.boxShadow = SHADOW_TEEN_A; 
    margoEl.style.transform = `translateY(${playerY - 45}px)`; 
    
    // Proyector de meteorito y láser neón intactos
    let meteorBit = ` ${meteorX}px ${meteorY}px #e84b30, ${meteorX+4}px ${meteorY}px #e84b30, ${meteorX}px ${meteorY+4}px #e84b30`;
    let laserBit = laserX >= 0 ? `, ${laserX}px ${laserY}px #87ffff, ${laserX+6}px ${laserY}px #87ffff` : "";
    sceneryEl.style.boxShadow = meteorBit + laserBit;
}


// ==============================================================================
// 🚀 CIERRE GRÁFICO PURIFICADO ANTI-CRASHES V2.2
// ==============================================================================
function closeSpaceArcade() {
    clearInterval(arcadeInterval);
    window.isArcadeModeActive = false;
    
    // Regresamos el chasis vertical a su eje base asentado
    document.getElementById("margo-core").style.transform = "translateY(0px)";
    
    // 🔥 LA SOLUCIÓN AL BUG: Sincronizamos los nombres exactos de guardado de fábrica
    if (typeof savePetState === "function") {
        savePetState(); 
    } else {
        localStorage.setItem('jukebox_pet_v65_data', JSON.stringify(petState));
    }
    
    // Restauramos la granja diurna, la cerca ocre claro y las vaquitas al instante
    updatePetInterface();
    renderMargoDisplay(); 
}


// ==============================================================================
// 🟢 CLEAN ARCHITECTURE: PUENTE SANITARIO DE CIERRE UNIFICADO V34.0
// ==============================================================================
function closeArcadeMenuAndRestoreFarm() {
    // 🟢 LA REGLA REDONDA AUTOMÁTICA: Si el usuario termina un juego y da flecha abajo o botón B,
    // invocamos al interruptor maestro 'play'. Al estar la cúpula activa, el switch ejecutará 
    // el borrado de capas ciego de la Zona 1, cerrando el Pad y restaurando la granja de inmediato.
    interactWithPet('play'); 
}


// ==============================================================================
// 🖥️ MOTOR DE MOVIMIENTO Y SCALED REAL AUTOMATIZADO V20.0 (SISTEMA DE ANCLAJE)
// Reactiva el arrastre fluido por la pantalla y el encogimiento simétrico real.
// ==============================================================================
function makeGotchiWindowDraggableAndResizable() {
    const container = document.getElementById("virtual-pet-popup");
    if (!container) return;

   // 🟢 EL DIBUJO VECTORIAL: Creamos el nodo real para el tirador de 3 líneas nítidas.
    // Usamos coordenadas exactas y un degradado estilizado que calca el look de tu captura.
    const resizeHandle = document.createElement("div");
    resizeHandle.style.cssText = `
        position: absolute; 
        bottom: 3px; 
        right: 4px; 
        width: 14px; 
        height: 14px; 
        
        cursor: se-resize; 
        z-index: 99999999;
        background: linear-gradient(135deg, 
            transparent 0%, transparent 40%, 
            rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.4) 45%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.7) 50%,
            transparent 50%, transparent 60%,
            rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.4) 65%, rgba(255,255,255,0.7) 65%, rgba(255,255,255,0.7) 70%,
            transparent 70%, transparent 80%,
            rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.4) 85%, rgba(255,255,255,0.7) 85%, rgba(255,255,255,0.7) 90%,
            transparent 90%
        );
        background-size: 100% 100%;
        opacity: 0.85;
    `;
    container.appendChild(resizeHandle);

    let isDragging = false, isResizing = false;
    let startX, startY, startScale = 1;

    // Forzamos a que el sistema inicie estrictamente al 100% de escala real (1.0)
    if (window.gotchiCurrentZoom === undefined) window.gotchiCurrentZoom = 1;

    // 🟢 ESCUCHADOR 1: DETECTOR DE RESIZE (ESQUINA INFERIOR)
    resizeHandle.addEventListener("mousedown", (e) => {
        isResizing = true;
        startX = e.clientX; startY = e.clientY;
        startScale = window.gotchiCurrentZoom;
        e.stopPropagation(); // Evita que el clic active el arrastre por error
        e.preventDefault();
    });

    // 🟢 ESCUCHADOR 2: DETECTOR DE ARRASTRE DE CARCASA MAGENTA
    container.addEventListener("mousedown", (e) => {
        if (isResizing) return;

        // El arrastre se activa al cliquear el plástico magenta, el panel o el logo PNG
        if (e.target === container || e.target.classList.contains("pet-logo-container") || e.target.tagName === "IMG" || e.target.classList.contains("pet-terminal-body") || e.target.classList.contains("pet-stats-panel")) {
            isDragging = true;
            startX = e.clientX - container.offsetLeft;
            startY = e.clientY - container.offsetTop;
            e.preventDefault();
        }
    });

    // 🟢 ESCUCHADOR 3: SISTEMA DE MOVIMIENTO FLUIDO POR TU MONITOR LOCAL
    window.addEventListener("mousemove", (e) => {
        if (isResizing) {
            const deltaX = e.clientX - startX;
            // Sensibilidad líquida calibrada al milisegundo al arrastrar
            let newZoom = startScale + (deltaX / 300);

            // 📐 LÍMITES BIEN REFORZADOS: Mínimo 0.45 (Diminuto) | Máximo 1.40 (Gigante)
            newZoom = Math.max(0.45, Math.min(1, newZoom));
            window.gotchiCurrentZoom = newZoom;

            // Zoom proporcional que encoge todo el aparato sin desarmar los botones
            container.style.transform = `scale(${newZoom})`;
        }

     
            
    });

    // 🟢 ESCUCHADOR 4: CIERRE DE CANAL DE RATÓN
    window.addEventListener("mouseup", () => {
        isDragging = false;
        isResizing = false;
        container.style.cursor = "default";
    });
}

// 🟢 DISPARADOR AUTOMÁTICO SEGURO: Modificado para asegurar que despierte al cargar la web
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", makeGotchiWindowDraggableAndResizable);
} else {
    makeGotchiWindowDraggableAndResizable();
}


// ==============================================================================
// 🏆 MASTER PROTOCOL: LOGO BADGE, DESPLIEGUE FLEX Y FANFARRÍA 8-BITS V27.7
// ==============================================================================
function triggerEndgameProtocol() {
    petState.isGameFinished = true;
    hasPoop = false; // Evapora cualquier popó del suelo al ganar el campeonato
    
    // Forzamos el relleno de los núcleos vitales al 100% de rendimiento
    petState.energy = 100; petState.clean = 100; petState.happy = 100; petState.sleep = 100;
    
    // Forzamos el display flex directo por software destruyendo el candado del CSS
    const victoryScreen = document.getElementById("gotchi-victory-screen");
    if (victoryScreen) {
        victoryScreen.style.setProperty("display", "flex", "important");
        victoryScreen.className = "victory-active";
    }
    
    // Cambiamos el estatus de la burbuja superior
    document.getElementById("pet-status-bubble").innerText = "🏆 SYSTEM SECURED. JUKEBOX MASTER PROTOCOL ACTIVE.";
    
    // 🔥 EL DETONADOR DE AUDIO INTEGRADO: Ejecuta la melodía con el permiso de los clics táctiles
    if (typeof playVictoryMelody === "function") {
        playVictoryMelody();
    }
    
    updatePetInterface();
}


// ==============================================================================
// 🎶 SINTETIZADOR DE AUDIO 8-BITS FORZADO: DESPERTA RESUME CONTEXT V27.8
// Derriba el candado de silencio del navegador y enciende las bocinas al ganar.
// ==============================================================================
function playVictoryMelody() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    
    // 🟢 EL GOLPE DE REACTIVACIÓN SÍNCRO:
    // Obligamos al navegador a despertar el canal de las bocinas pasándolo de
    // "suspended" a "running" de forma inmediata utilizando el permiso de tus clics.
    ctx.resume().then(() => {
        // Arpegio ascendente triunfal clásico de maquinitas arcade (Notas: C4, E4, G4, C5)
        const notes = [261.63, 329.63, 392.00, 523.25]; 
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = "square"; // Onda cuadrada pura estilo Nintendo GameBoy original
                osc.frequency.value = freq;
                
                // Calibramos el volumen al 15% para que se escuche con total nitidez en tu PC
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
            }, index * 150); // Ráfaga veloz de notas espaciadas a 150ms
        });
    }).catch(err => console.error("Error forzando el despertar del audio:", err));
}




// ==============================================================================
// 📺 PROYECTOR DE MENÚ RECREATIVO VECTORIAL LÍQUIDO (ANTI-FLASH V29.6)
// ==============================================================================
function renderArcadeMenuOnScreen() {
    const arcadeLayer = document.getElementById("gotchi-arcade-menu-layer");
    if (!arcadeLayer) return;

    if (!arcadeLayer.classList.contains("arcade-layer-active")) {
        arcadeLayer.classList.add("arcade-layer-active");
    }

    let menuHtml = '<p class="menu-arcade-header">SELECT GAME</p>';
    
    arcadeGamesList.forEach(function(game, index) {
        if (index === currentSelectedGameIndex) {
            menuHtml += '<p class="menu-game-row selected-row">► ' + game.name + '</p>';
        } else {
            menuHtml += '<p class="menu-game-row">  ' + game.name + '</p>';
        }
    });
    
    arcadeLayer.innerHTML = menuHtml;
    // 🟢 FIJO DE ACERO: Eliminamos cualquier alteración a pet-status-bubble de aquí.
    // ¡La burbuja se mantendrá inmutable gritando tu letrero universal de fábrica!
}


// ==============================================================================
// 🟢 CLEAN ARCHITECTURE: PUENTE SANITARIO DE CIERRE UNIFICADO V34.5
// ==============================================================================
function closeArcadeMenuAndRestoreFarm() {
    // 🟢 LA REGLA REDONDA AUTOMÁTICA: Si el usuario termina cualquier juego y da flecha abajo,
    // invocamos al interruptor maestro 'play'. Al estar la cúpula activa, el switch ejecutará 
    // el borrado de capas ciego de la Zona 1, cerrando el Pad y restaurando la granja de inmediato.
    interactWithPet('play'); 
}


// ==============================================================================
// 🏑 ENGINE ARCADE MAESTRO: INERCIA LÍQUIDA, IA MATEMÁTICA Y TOP 7 LEADERS V32.6
// ==============================================================================
let hockeyState = {
    currentStage: "welcome", // welcome -> hero_select -> register -> gameplay -> leaderboard
    selectedHero: "H",       
    nameChars: ["A", "A", "A"],
    activeCharIndex: 0,
    userScore: 0,
    userLives: 7
};

let isButtonDebounceActive = false;
let keysPressed = {};
let keyboardPhysicsInterval = null;
let userPaddleVelocity = 0;

function launchHockeyCartridgeEngine() {
    isArcadeMenuDisplayActive = false; 
        isArcadeZoneActive = true; // 🟢 Se mantiene encendida la cúpula, congelando la granja
            // 🟢 FIJO DE CAJÓN: El reloj de la lona se calibra en 45ms únicamente al meter el cartucho desde el menú
    currentHockeyRefreshMs = 45;


    const menuLayer = document.getElementById("gotchi-arcade-menu-layer");
    if (menuLayer) menuLayer.style.setProperty("display", "none", "important");

    const hockeyLayer = document.getElementById("gotchi-hockey-cartridge");
    if (hockeyLayer) {
        hockeyLayer.style.setProperty("display", "flex", "important");
        hockeyLayer.style.setProperty("opacity", "1", "important");
        hockeyLayer.style.setProperty("visibility", "visible", "important");
        hockeyLayer.style.setProperty("z-index", "99999", "important");
        hockeyLayer.className = "hockey-layer-active";
    }

    hockeyState.currentStage = "welcome";
    hockeyState.userScore = 0;
    hockeyState.userLives = 7;
    hockeyState.activeCharIndex = 0;
    hockeyState.nameChars = ["A", "A", "A", "A", "A"];

    // Reseteamos las clases de visibilidad impresas nativas
    document.getElementById("hockey-stage-welcome").className = "hockey-sub-stage hockey-sub-visible";
    document.getElementById("hockey-stage-hero-select").className = "hockey-sub-stage hockey-sub-hidden";
    document.getElementById("hockey-stage-register").className = "hockey-sub-stage hockey-sub-hidden";
    document.getElementById("hockey-stage-gameplay").className = "hockey-sub-stage hockey-sub-hidden";
    document.getElementById("hockey-stage-leaderboard").className = "hockey-sub-stage hockey-sub-hidden";

    document.getElementById("pet-status-bubble").innerText = "🕹️ ARCADE ZONE ACTIVATED...";
}

function executeArcadeAction(buttonLetter) {
    if (hasPoop || petState.isGameFinished) return;

    // 🛑 FILTRO DE ANTIRREBOTE CENTRAL INTERACTIVO
    if (isButtonDebounceActive) return;
    isButtonDebounceActive = true;
    setTimeout(() => { isButtonDebounceActive = false; }, 250); 

    // ==========================================
    // ❌ ACCIONES DEL BOTÓN SECUNDARIO [ B ] (RETROCESO DE CASILLAS)
    // ==========================================
    if (buttonLetter === 'B') {
        if (hockeyState.currentStage === "register") {
            if (hockeyState.activeCharIndex > 0) {
                // Quitamos el parpadeo de la letra actual
                document.getElementById("name-char-" + hockeyState.activeCharIndex).classList.remove("char-active-giant");
                // Retrocedemos el índice en la RAM
                hockeyState.activeCharIndex--;
                // Encendemos con neón rosa la casilla anterior
                document.getElementById("name-char-" + hockeyState.activeCharIndex).classList.add("char-active-giant");
                triggerVisualEmoji("↩️");
            }
        }
        return; // Fin de la cadena del botón B
    }

    if (buttonLetter !== 'A') return;

    // ==========================================
    // 💮 ACCIONES DEL BOTÓN MAESTRO [ A ] (AVANCE)
    // ==========================================
    if (isArcadeMenuDisplayActive === true) {
        if (currentSelectedGameIndex === 0) {
            launchHockeyCartridgeEngine();
            return;
        }
        return;
    }

    if (hockeyState.currentStage === "welcome") {
        hockeyState.currentStage = "hero_select";
        document.getElementById("hockey-stage-welcome").className = "hockey-sub-stage hockey-sub-hidden";
        document.getElementById("hockey-stage-hero-select").className = "hockey-sub-stage hockey-sub-visible";
        return;
    }

    if (hockeyState.currentStage === "hero_select") {
        hockeyState.currentStage = "register";
        
        const frameEl = document.getElementById("hud-user-frame-type");
        if (frameEl) frameEl.innerText = (hockeyState.selectedHero === "H") ? "🦸‍♀️" : "🦸‍♂️";
        
        document.getElementById("hockey-stage-hero-select").className = "hockey-sub-stage hockey-sub-hidden";
        document.getElementById("hockey-stage-register").className = "hockey-sub-stage hockey-sub-visible";
        
        // 🟢 FIJO DE ILUMINACIÓN DE ORIGEN: Forzamos a que la primera letra (Casilla 0)
        // nazca brillando neón rosa desde el primer instante en que se abre la pantalla.
        document.getElementById("name-char-0").className = "char-active-giant";
        document.getElementById("name-char-1").className = "";
        document.getElementById("name-char-2").className = "";
        document.getElementById("name-char-3").className = "";
        document.getElementById("name-char-4").className = "";
        return;
    }

        if (hockeyState.currentStage === "register") {
        document.getElementById("name-char-" + hockeyState.activeCharIndex).classList.remove("char-active-giant");
        hockeyState.activeCharIndex++;
        
        if (hockeyState.activeCharIndex < 5) {
            document.getElementById("name-char-" + hockeyState.activeCharIndex).classList.add("char-active-giant");
            return;
        } else {
            // 🟢 TRANSICIÓN: Al confirmar la 3ra letra, saltamos primero a Instrucciones (Pantalla B3)
            hockeyState.currentStage = "instructions";
            document.getElementById("hockey-stage-register").className = "hockey-sub-stage hockey-sub-hidden";
            document.getElementById("hockey-stage-instructions").className = "hockey-sub-stage hockey-sub-visible";
            return;
        }
    }

    // 🟢 NUEVA CONDICIÓN DE ARRANQUE: De Instrucciones a Gameplay Real
    if (hockeyState.currentStage === "instructions") {
        hockeyState.currentStage = "gameplay";
        document.getElementById("hockey-stage-instructions").className = "hockey-sub-stage hockey-sub-hidden";
        document.getElementById("hockey-stage-gameplay").className = "hockey-sub-stage hockey-sub-visible";
        
        document.getElementById("hud-txt-name").innerText = hockeyState.nameChars.join("");
        
        updateHockeyHeartDisplay();
        startHockeyPhysicsLoop(); // ⚡ ¡SILBATAZO INICIAL! Arrancan los discos
        return;
    }

    }

let hockeyInterval = null; 
let puckX = 130, puckY = 51; 
let puckSpeedX = -4, puckSpeedY = 3; 
let userPaddleY = 44, margoPaddleY = 44; 

// 🟢 NUEVA VARIABLE UNIVERSAL DE TIEMPO (ZONA 1 BLINDADA):
// Almacena los milisegundos de refresco en la RAM. Nace en tus 45ms estables de pruebas.


function selectArcadeOption(direction) {
    if (hasPoop || petState.isGameFinished) return;
    
    if (isArcadeMenuDisplayActive) {
        if (direction === 'up') currentSelectedGameIndex = (currentSelectedGameIndex - 1 + arcadeGamesList.length) % arcadeGamesList.length;
        if (direction === 'down') currentSelectedGameIndex = (currentSelectedGameIndex + 1) % arcadeGamesList.length;
        renderArcadeMenuOnScreen();
        return;
    }

    if (hockeyState.currentStage === "hero_select") {
        if (direction === 'up') {
            hockeyState.selectedHero = "H";
            document.getElementById("hero-opt-H").className = "hero-avatar-pick-giant hero-selected";
            document.getElementById("hero-opt-M").className = "hero-avatar-pick-giant";
        } else if (direction === 'down') {
            hockeyState.selectedHero = "M";
            document.getElementById("hero-opt-M").className = "hero-avatar-pick-giant hero-selected";
            document.getElementById("hero-opt-H").className = "hero-avatar-pick-giant";
        }
        return;
    }

    if (hockeyState.currentStage === "register") {
        if (hockeyState.activeCharIndex < 5) {
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
            let charPos = chars.indexOf(hockeyState.nameChars[hockeyState.activeCharIndex]);
            if (direction === 'up') charPos = (charPos - 1 + chars.length) % chars.length;
            if (direction === 'down') charPos = (charPos + 1) % chars.length;
            
            hockeyState.nameChars[hockeyState.activeCharIndex] = chars[charPos];
            document.getElementById(`name-char-${hockeyState.activeCharIndex}`).innerText = chars[charPos];
        }
        return;
    }

      // 🕹️ INTERRUPTORES DE LA TABLA DE RECORDS DEL FINAL DEL JUEGO (REPARADO V35.5)
    if (hockeyState.currentStage === "leaderboard") {
        if (direction === 'up') {
            // 🟢 EL BYPASS DEL CAMPEÓN: Si el usuario presiona PLAY AGAIN,
            // NO limpiamos sus variables ni lo mandamos a registrarse de nuevo.
            // Recargamos sus 7 vidas, limpiamos el score de la sesión anterior
            // y lo metemos directo a la mesa de aire con su nombre F23 intacto en el HUD.
            currentHockeyRefreshMs = 45; 
            hockeyState.currentStage = "gameplay";
            hockeyState.userLives = 7;
            hockeyState.userScore = 0;
            
            // Apagamos la lona de records y encendemos el tablero de hockey en vivo
            document.getElementById("hockey-stage-leaderboard").className = "hockey-sub-stage hockey-sub-hidden";
            document.getElementById("hockey-stage-gameplay").className = "hockey-sub-stage hockey-sub-visible";
            
            // Actualizamos los corazones visuales y encendemos la física amortiguada
            updateHockeyHeartDisplay();
            document.getElementById("hud-score").innerText = "0000";
            
            startHockeyPhysicsLoop(); 
            
        } else if (direction === 'down') {
            // GO BACK TO FARM: Regresa de forma suave y líquida a la granja
            closeArcadeMenuAndRestoreFarm();
        }
        return;
    }


    if (hockeyState.currentStage === "gameplay") {
        if (direction === 'up') moveUserPaddle(-12);
        if (direction === 'down') moveUserPaddle(12);
    }
}


// ==============================================================================
// 🏑 ENGINE ARCADE MAESTRO: CONTROL EN BLOQUES Y DETECTOR FRONTAL REDONDO V34.0
// ==============================================================================

// ⌨️ EL ÚNICO Y ABSOLUTO ESCUCHADOR DE TECLADO PREMIUM DE TU PC
window.addEventListener("keydown", function(e) {
    if (!petState.isHatched || isArcadeZoneActive === false) return;
    
    // Bloqueamos el desplazamiento nativo del navegador de la oficina
    if (["ArrowUp", "ArrowDown", "Tab", " "].includes(e.key)) e.preventDefault();
    
    // 🟢 MOVIMIENTO EN BLOQUES DE ALTA FIDELIDAD:
    // Al presionar la flecha en tu teclado PC, avanzamos en muescas rígidas de 14px 
    // pasando de forma obligatoria por los puntos medios de la mesa, calcando el chasis.
    if (hockeyState.currentStage === "gameplay") {
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
            userPaddleY = Math.max(2, Math.min(86, userPaddleY - 14));
            var el = document.getElementById("hockey-paddle-user");
            if (el) el.style.top = userPaddleY + "px";
        }
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
            userPaddleY = Math.max(2, Math.min(86, userPaddleY + 14));
            var el = document.getElementById("hockey-paddle-user");
            if (el) el.style.top = userPaddleY + "px";
        }
    }
});

// Variable global de control de tiempo (Colócala justo arriba de la función si no la tienes)

let hockeyDifficultyTimer = null;

function startHockeyPhysicsLoop() {
    // 🧹 LIMPIEZA DE RELOJES DE CONTROL PREVIA AUTOMÁTICA
    if (hockeyInterval) clearInterval(hockeyInterval);
    if (hockeyDifficultyTimer) clearInterval(hockeyDifficultyTimer);
    
    puckX = 130; puckY = 51;
    window.margoWillMissNextBall = false; 

    // Tu velocidad de cajón original fija de fábrica
    var velocidadHorizontalBase = 4; 
    var velocidadVerticalBase = 3; 
    
    puckSpeedX = -velocidadHorizontalBase; 
    puckSpeedY = (Math.random() < 0.5 ? -velocidadVerticalBase : velocidadVerticalBase);

    // ⏱️ EL CRONÓMETRO ACELERADOR UNIVERSAL (CADA 15 SEGUNDOS CONSISTENTE)
    // Al haber removido el reseteo de aquí, este reloj le permite al disco heredar 
    // la velocidad acumulada entre goles de forma continua, manteniendo el ritmo.
    hockeyDifficultyTimer = setInterval(function() {
        if (hockeyState.currentStage === "gameplay") {
            // Resta 3ms cada 15 segundos clavándose en tu piso máximo de 20ms
            currentHockeyRefreshMs = Math.max(23, currentHockeyRefreshMs - 3);
            
            clearInterval(hockeyInterval);
            reencenderBucleFisico();
            
            console.log("🏎️ TIME OVERLOAD: El refresco de la lona bajó a " + currentHockeyRefreshMs + "ms");
        }
    }, 15000);

    // Función espejo síncrona encargada de mover el disco en el cristal
    function reencenderBucleFisico() {
        hockeyInterval = setInterval(function() {
            if (hockeyState.currentStage !== "gameplay") { 
                clearInterval(hockeyInterval); 
                clearInterval(hockeyDifficultyTimer); 
                return; 
            }

            // Detector de ancho dinámico de tu monitor local
            const canvasEl = document.getElementById("hockey-table-canvas");
            const anchoMesaReal = canvasEl ? canvasEl.clientWidth : 265;
            const paredDerechaGol = anchoMesaReal - 6; 
            const coordenadaMargoX = anchoMesaReal - 18; 

            puckX += puckSpeedX;
            puckY += puckSpeedY;

            // Rebotes obligatorios contra techo y suelo de la mesa
            if (puckY <= 2 || puckY >= 102) puckSpeedY = -puckSpeedY;

            // IA totalmente simétrica conectada al eje del disco
            margoPaddleY = puckY - 10; 
            margoPaddleY = Math.max(2, Math.min(86, margoPaddleY));
            const paddleMargoEl = document.getElementById("hockey-paddle-margo");
            if (paddleMargoEl) {
                paddleMargoEl.style.top = margoPaddleY + "px";
            }

            // 💥 DETECTOR DE IMPACTO IZQUIERDO (TU RAQUETA ROJA)
            if (puckX <= 15 && puckX >= 8) {
                if (puckY >= userPaddleY - 4 && puckY <= userPaddleY + 24) {
                    puckSpeedX = Math.abs(puckSpeedX); 
                    puckX = 16;
                    hockeyState.userScore += 15;
                    document.getElementById("hud-score").innerText = String(hockeyState.userScore).padStart(4, '0');
                }
            }

            // 💥 DETECTOR DE IMPACTO DERECHO (LA RAQUETA CIAN DE MARGO 100% INDESTRUCTIBLE)
            if (puckX >= coordenadaMargoX - 4 && puckX <= coordenadaMargoX + 2) {
                if (puckY >= margoPaddleY - 4 && puckY <= margoPaddleY + 24) {
                    puckSpeedX = -Math.abs(puckSpeedX); 
                    puckX = coordenadaMargoX - 5; 
                    triggerVisualEmoji("🎵"); 
                }
            }

            // 🥅 PORTERÍA IZQUIERDA DE DESCARTE TOTAL: GOL DE MARGO
            if (puckX <= 0) {
                hockeyState.userLives--;
                updateHockeyHeartDisplay();
                triggerVisualEmoji("🚿"); 
                
                if (hockeyState.userLives <= 0) {
                    // Cierre de la sesión de juego en Game Over real
                    hockeyState.currentStage = "leaderboard";
                    clearInterval(hockeyInterval);
                    clearInterval(hockeyDifficultyTimer);
                    if (keyboardPhysicsInterval) clearInterval(keyboardPhysicsInterval);
                    
                    petState.happy = Math.min(100, petState.happy + 15);
                    
                    // INYECCIÓN GRÁFICA INMEDIATA DE 250 GB
                    petState.weight += 250; 
                    var txtWeightEl = document.getElementById("txt-weight");
                    if (txtWeightEl) txtWeightEl.innerText = petState.weight;
                    
                    openHockeyLeaderboardScreen(); 
                } else {
                    startHockeyPhysicsLoop(); // Siguiente saque heredando la velocidad de la RAM
                }
            }

            // 🥅 PORTERÍA DERECHA DE DESCARTE TOTAL: GOLAZO EN LA RED DE MARGO
            if (puckX >= paredDerechaGol) {
                hockeyState.userScore += 15; 
                document.getElementById("hud-score").innerText = String(hockeyState.userScore).padStart(4, '0');
                
                triggerVisualEmoji("⭐");
                startHockeyPhysicsLoop(); // Siguiente saque heredando la velocidad de la RAM
            }

            // Renderizado del disco de bronce en la lona
            var puckEl = document.getElementById("hockey-puck");
            if (puckEl) {
                puckEl.style.left = puckX + "px";
                puckEl.style.top = puckY + "px";
            }
        }, currentHockeyRefreshMs); // Conserva y hereda los milisegundos variables de la RAM
    }

    // Encendido inicial del primer cuadro al arrancar la lona
    reencenderBucleFisico();
}


// ==============================================================================
// 🏆 REALTIME FIREBASE ENGINE: CONEXIÓN CLOUD DEL TOP 7 LEADERS GLOBAL V35.0
// ==============================================================================
function openHockeyLeaderboardScreen() {
    hockeyState.currentStage = "leaderboard";
    
    document.getElementById("hockey-stage-gameplay").className = "hockey-sub-stage hockey-sub-hidden";
    document.getElementById("hockey-stage-leaderboard").className = "hockey-sub-stage hockey-sub-visible";

    var playerTag = hockeyState.nameChars.join("");
    var currentScore = hockeyState.userScore;
    var timestamp = Date.now();

    // 🟢 LA ESCUDERÍA EN LA NUBE CLOUD: Si hay score, lo inyectamos usando window.db real
    if (currentScore > 0 && window.db) {
        window.db.ref("hockey_leaderboard/" + timestamp).set({
            name: playerTag,
            score: currentScore
        }).catch(function(err) { console.error("Error en base de datos local:", err); });
    }
    // 🟢 ACCIÓN 1: SUBIR EL RÉCORD ACTUAL A TU FIREBASE REAL
    // Si el score del usuario es mayor a cero, inyectamos el Tag (ej. F23) y los puntos 
    // directamente en una nueva llave única dentro de tu base de datos en la nube.
    if (currentScore > 0) {
        db.ref("hockey_leaderboard/" + timestamp).set({
            name: playerTag,
            score: currentScore
        }).catch(function(err) { console.error("Error subiendo record a Firebase:", err); });
    }

    // 🟢 ACCIÓN 2: DESCARGAR Y ORDENAR EL TOP 7 MUNDIAL EN TIEMPO REAL
    // Invocamos al nodo de Firebase, ordenamos los registros por la puntuación 'score' 
    // y limitamos la descarga a los últimos 20 renglones para optimizar la cuota.
    db.ref("hockey_leaderboard/").orderByChild("score").limitToLast(20).once("value", function(snapshot) {
        var cloudRecords = [];
        
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            cloudRecords.push({
                name: data.name || "AAAAA",
                score: parseInt(data.score) || 0
            });
        });

        // Como Firebase ordena de menor a mayor de forma nativa, invertimos el arreglo 
        // para colocar al campeón absoluto en la primera hilera de la lona
        cloudRecords.sort(function(a, b) { return b.score - a.score; });
        
        // Cortamos rígidamente a los 7 mejores del planeta para cuidar la simetría
        var top7Leaders = cloudRecords.slice(0, 7);

        // Renderizamos los renglones impresos de forma fotorrealista en el cristal
        var container = document.getElementById("hockey-records-list-container");
        if (container) {
            var htmlContent = "";
            for (var i = 0; i < top7Leaders.length; i++) {
                var rec = top7Leaders[i];
                // Marcamos con una flecha neón si este renglón de la nube te pertenece
                var isUser = (rec.name === playerTag && rec.score === currentScore);
                var rowClass = (i === 0) ? "hockey-record-row rank-first" : "hockey-record-row";
                var userIndicator = isUser ? " ◀" : "";
                var paddedScore = String(rec.score).padStart(4, '0');
                
                htmlContent += '<div class="' + rowClass + '">' +
                    '<span>0' + (i + 1) + '. ' + rec.name + userIndicator + '</span>' +
                    '<span>' + paddedScore + ' PTS</span>' +
                '</div>';
            }
            container.innerHTML = htmlContent;
        }
    });
}

function updateHockeyHeartDisplay() {
let hearts = "";
for (let i = 0; i < 7; i++) {
hearts += (i < hockeyState.userLives) ? "♥" : "♡";
}
document.getElementById("hud-lives").innerText = hearts;
}
window.selectArcadeOption = selectArcadeOption;
window.executeArcadeAction = executeArcadeAction;
