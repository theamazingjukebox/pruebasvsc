// ==============================================================================
// 📟 MOTOR JUKEBOX PET V9.6: EDICIÓN LABORAL COMPLETA AISLADA (pet-engine.js)
// ==============================================================================
let petState = {
    isHatched: false, eggClicks: 0, age: 0, weight: 1,
    energy: 100, clean: 100, happy: 100, sleep: 100,
    isSleeping: false, isSick: false, lastUpdate: Date.now()
};

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
    // Inicialización nativa directa aislada al 100% libre de cuotas externas
    petState.isHatched = false;
    petState.eggClicks = 0;
    petState.age = 0;
    petState.isSleeping = false;
    // EL RELOJ REFRESH EN VIVO (Cada 500ms redibuja y avanza los fotogramas)
    setInterval(() => {
        frameTick = (frameTick + 1) % 2;
         if (petState.isHatched) {
            // ⏰ CRONÓMETRO DE PRECISIÓN SÍNCRO: Revisa el reloj de tu PC al milisegundo
            const ahora = Date.now();
            const transcurridoMilisegundos = ahora - petState.lastUpdate;

            // Cada 2 minutos reales de oficina (120,000 ms), Margo cumple de inmediato 1 Año de edad
            if (transcurridoMilisegundos >= 25000) {
                petState.age += 1;
                petState.lastUpdate = ahora;
                updatePetInterface(); // Pinta la nueva edad en el HTML al instante
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
                margoX += (walkDir * 4);
                let maxCol = (petState.age < 1) ? 200 : 165;
                if (margoX >= maxCol) { margoX = maxCol; walkDir = -1; }
                if (margoX <= 60) { margoX = 60; walkDir = 1; }
            }
        }

            // ⌨️ ESCUCHADOR DE TECLADO PC EN TIEMPO REAL (ARCADE DETECTOR)
    window.addEventListener("keydown", (e) => {
        if (!petState.isHatched || !window.isArcadeModeActive) return;
        
        // Evitamos que las flechas y el Tab muevan la página web de la oficina hacia abajo
        if (["ArrowUp", "ArrowDown", "Tab", " "].includes(e.key)) e.preventDefault();
        
        if (e.key === "ArrowUp") moveArcadePlayer(-12);   // Sube el avión en el cielo
        if (e.key === "ArrowDown") moveArcadePlayer(12);  // Baja el avión al pasto
        if (e.key === "Tab" || e.key === " ") fireArcadeLaser(); // 🚀 ¡FUEGO EN LA MATRIZ!
    });



        renderMargoDisplay();
    }, 500);

    // ==============================================================================
    // 🧠 ZONA 1: SENSOR EVOLUTIVO AUTOMÁTICO POR TIEMPO Y PESO EN GB (RELOJ CENTRAL)
    // ==============================================================================
    // DEGRADACIÓN DE SIGNOS VITALES LOCAL Y EVENTOS ALEATORIOS (Cada 30s)
    setInterval(() => {
        if (petState.isHatched) {
            

            // 🧠 SENSOR GRÁFICO AUTOMÁTICO PASIVO (Respaldo del reloj)
            
            // Desgaste de signos vitales
            if (petState.isSleeping) {
                let poopPenalty = hasPoop ? 8 : 0;
                petState.sleep = Math.min(100, petState.sleep + 3);
                petState.clean = Math.max(0, petState.clean - poopPenalty);
            } else {
                let poopPenalty = hasPoop ? 8 : 1;
                petState.energy = Math.max(0, petState.energy - 1);
                petState.clean = Math.max(0, petState.clean - poopPenalty);
                petState.happy = Math.max(0, petState.happy - 1);
                petState.sleep = Math.max(0, petState.sleep - 1);
                                // 💩 PROBABILIDAD DE EVENTO ALEATORIO (25% de probabilidad por ciclo de 30s)
                if (!hasPoop && Math.random() < 0.25) {
                    hasPoop = true;
                    document.getElementById("pet-status-bubble").innerText = "⚠️ WARNING: CIRCUIT OBSTRUCTION DETECTED [💩]";
                    
                    // Restamos de golpe -15% a la barra rosa para reflejar el impacto al instante
                    petState.clean = Math.max(0, petState.clean - 15);
                    
                    // Inyección flotante inmediata en tu nueva coordenada perfecta (left: 95px)
                    const overlay = document.getElementById("matrix-emoji-overlay");
                    if (overlay) {
                        overlay.innerHTML = `<span id="pixel-poop-sprite" class="matrix-item-emoji" style="left: 235px; top: 100px; filter: drop-shadow(0 0 2px rgba(135,255,255,0.4)); animation: none;">💩</span>`;
                    }
                    
                    // 🟢 COMPRESIÓN SÍNCRONA: Forzamos el redibujado visual en este mismo instante
                    updatePetInterface();
                    savePetState();
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
    if ((petState.weight >= 250 || petState.age >= 1) && petState.evolutionStage < 1) {
        petState.evolutionStage = 1; // Bloquea la alerta para que no se repita en bucle
        
        // Sincroniza la telemetría visual de forma forzada al milisegundo
        if (petState.age < 1) petState.age = 1; 
        
        // 💥 DISPARADOR DE ALERTA INSTANTÁNEO POR TIEMPO/PESO
        document.getElementById("pet-status-bubble").innerText = "⚡ VOLTAGE OVERLOAD! TEEN MUTATION ACTIVE.";
        changed = true;
    }
    
    // 🟢 REGLA ETAPA 3 (CYBER-ROOSTER): Al cruzar 500 GB o 3 Años de edad por tiempo
    if ((petState.weight >= 500 || petState.age >= 3) && petState.evolutionStage < 2) {
        petState.evolutionStage = 2; // Bloquea la alerta
        
        // Sincroniza la telemetría visual de forma forzada al milisegundo
        if (petState.age < 3) petState.age = 3; 
        
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

        // ☀️ MODO DÍA COMPLETO: Restaura el fondo brillante de fábrica
        containerEl.style.background = "linear-gradient(to bottom, #87ffff 0%, #87ffff 55%, #39ff14 55%, #39ff14 100%)";
        margoEl.style.left = margoX + "px";

        // 🟢 REGISTRO LIMPIO: Dejamos el escenario diurno puro que tanto te gusta
        sceneryEl.style.boxShadow = SCENE_DAYTIME;

        // Árbol evolutivo diurno de 3 niveles intacto
        if (petState.age < 1) {
            margoEl.style.boxShadow = (frameTick === 0) ? SHADOW_MARGO_FRAME_A : SHADOW_MARGO_FRAME_B;
        } else if (petState.age >= 1 && petState.age < 3) {
            margoEl.style.boxShadow = (frameTick === 0) ? SHADOW_TEEN_A : SHADOW_TEEN_B;
        } else if (petState.age >= 3) {
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
    if (!petState.isHatched || petState.isSleeping) return;



     // 🟢 EL ESCUDO QUIRÚRGICO: Si hay una popó en el suelo, bloqueamos todo el menú.
    // El sistema arroja una advertencia en la burbuja y aborta la alimentación al milisegundo.
    if (hasPoop) {
        document.getElementById("pet-status-bubble").innerText = "❌ ACTION DENIED: PURIFY CIRCUITS BEFORE FEEDING!";
        return; // Candado rígido de parada absoluta
    }


    const selector = document.getElementById("pet-food-selector");
    const food = selector.value;

    if (food === "data") {
        // 💾 EL DISQUETE: Sube 20% de Energía y suma 1 GB de peso real
        petState.energy = Math.min(100, petState.energy + 5);
        petState.weight += 1;
        triggerVisualEmoji("💾");
    } else if (food === "icecream") {
        // 🍦 EL HELADO: Sube 35% de Felicidad, ensucia -5% el circuito y suma 2 GB
        petState.happy = Math.min(100, petState.happy + 10);
        petState.clean = Math.max(0, petState.clean - 5);
        petState.weight += 2;
        triggerVisualEmoji("🍦");
    } else if (food === "voltage") {
        // ⚡ JOLT VOLTAGE: Ya no fuerza las etapas por código.
        // Se convierte en una súper inyección que aporta +40% de energía y añade +8 GB directos de peso.
        // El usuario descubrirá que al abusar del voltaje, el peso estalla y detona la mutación secreta.
        petState.energy = Math.min(100, petState.energy + 7);
        petState.sleep = Math.max(0, petState.sleep - 15);
        petState.weight += 8; // 🟢 El acelerador definitivo de Gigabytes

        triggerVisualEmoji("⚡");

        // Refresco síncrono del monitor
        checkEvolutionRules(); 
        updatePetInterface();
        renderMargoDisplay();
        savePetState();
        return;
    } else if (food === "burger") {
        // 🍔 LA CYBER-BURGER: Sube 50% de Energía sólida y suma 4 GB de peso imponente
        petState.energy = Math.min(100, petState.energy + 10);
        petState.weight += 4;
        triggerVisualEmoji("🍔");
    }

    // 🟢 REFRESH SÍNCRONO SEGURO: Actualiza la pantalla antes de guardar en el disco de tu PC
    checkEvolutionRules();
    updatePetInterface();
    renderMargoDisplay();
    savePetState();
}

// ==============================================================================
// 📟 ZONA 1: AUTO-DESVANECIMIENTO DE NUTRICIÓN DIGITAL (EVITA CONGELAMIENTO)
// ==============================================================================
function triggerVisualEmoji(emoji) {
    const overlay = document.getElementById("matrix-emoji-overlay");
    if (!overlay) return;

    // Proyectamos el alimento flotando arriba a la derecha del personaje
    overlay.innerHTML = `<span class="matrix-item-emoji" style="left:${margoX + 28}px; top:40px;">${emoji}</span>`;

    // 🟢 EL CINCEL DE CORTE: Después de exactamente 1500 milisegundos (1.5 segundos),
    // el script limpia el contenedor a vacío para que el emoji desaparezca por completo.
    setTimeout(() => {
        overlay.innerHTML = "";
    }, 1500);
}

function interactWithPet(action) {
    if (!petState.isHatched) return;
    if (petState.isSleeping && action !== 'sleep') return;

     // 🟢 CANDADO DE JUEGO MIENTRAS HAY SUCIEADAD:
    // Si hay popó, bloqueamos la acción de jugar ('play'), pero dejamos libre la ducha ('clean') para poder salvarlo
    if (hasPoop && action === 'play') {
        document.getElementById("pet-status-bubble").innerText = "❌ ACTION DENIED: REACTION INHIBITED BY CONTAMINATION!";
        return;
    }

    if (action === 'clean') {
        if (petState.isSick) {
            petState.clean = Math.min(100, petState.clean + 1); // 🟢 Penalización por enfermedad
            petState.happy = Math.min(100, petState.happy + 1);
        } else {
            petState.clean = Math.min(100, petState.clean + 15); // Rango normal diurno
            petState.happy = Math.min(100, petState.happy + 5);
        }
        
        

        if (hasPoop) {
            hasPoop = false;
            document.getElementById("pet-status-bubble").innerText = "🚿 ECO-FLUSH COMPLETED. CIRCUITS PURIFIED.";

            // 🟢 EVAPORACIÓN DE SUCIEDAD: Borramos físicamente el emoji de la popó de la pantalla
            const poopSprite = document.getElementById("pixel-poop-sprite");
            if (poopSprite) poopSprite.remove();
        }

        if (petState.clean > 40) petState.isSick = false;
        triggerVisualEmoji("🚿");
    
    
    } else if (action === 'play') {
        const gamePanel = document.getElementById("pet-minigame-controls");
        if (gamePanel) gamePanel.style.display = (gamePanel.style.display === "block") ? "none" : "block";
        return;
    } else if (action === 'sleep') {
        petState.isSleeping = !petState.isSleeping;
    }
    checkEvolutionRules();
updatePetInterface();
renderMargoDisplay();
savePetState();
}
function playMinigameTurn(userChoice) {
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
    const stageEl = document.getElementById("txt-evolution-stage");
    if (stageEl) {
        if (!petState.isHatched) stageEl.innerText = "EGG CORE";
        else if (petState.age < 2) stageEl.innerText = "3D-CHICK (BABY)";
        else if (petState.age >= 2 && petState.age < 3) stageEl.innerText = "TEEN-CHICK (ADOLESCENTE)";
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
