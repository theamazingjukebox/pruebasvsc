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
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  let username = "";
  
  function showUsernameModal() {
    const usernameModal = document.getElementById("username-modal");
    usernameModal.style.display = "block";
  }
  
  function closeUsernameModal() {
    const usernameModal = document.getElementById("username-modal");
    usernameModal.style.display = "none";
  }
  
  function setUsername() {
    const usernameInput = document.getElementById("username-input");
    username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter a valid username.");
        return;
    }

    const usernameModal = document.getElementById("username-modal");
    usernameModal.style.display = "none"; // Oculta la ventana emergente

    const welcomeMessage = "Bienvenido, " + username + "!";
    
    // Crear la colección en la base de datos y enviar los datos para el mensaje de bienvenida
    const timestamp = Date.now();
    const welcomeMessageData = {
        username: "",
        message: welcomeMessage,
    };

    // Verificar si el mensaje ya existe en la base de datos antes de agregarlo
    const messagesRef = db.ref("messages/");
    messagesRef.orderByChild("message").equalTo(welcomeMessage).once("value", snapshot => {
        const existingMessages = snapshot.val();
        if (!existingMessages) {
            messagesRef.child(timestamp).set(welcomeMessageData);
        }
    });

    // Mostrar el mensaje de bienvenida en el chat localmente
    

    // Puedes realizar otras acciones después de establecer el nombre de usuario, si es necesario
    // Además, puedes descomentar la siguiente línea si deseas redirigir al usuario después de establecer el nombre de usuario
    // window.location.href = "tu_pagina.html";
}


  
  // Agrega esta función para seleccionar un emoji
  function selectEmoji(emoji) {
      const messageInput = document.getElementById("message-input");
      messageInput.value += emoji;
  
      // También puedes cerrar el contenedor de emojis si es necesario
      const emojiContainer = document.getElementById("emoji-container");
      emojiContainer.style.display = "none"; // Oculta el contenedor de emojis después de seleccionar uno
  }
  
  // Actualiza la función toggleEmojiPicker para mostrar/ocultar el contenedor de emojis
  function toggleEmojiPicker() {
      const emojiContainer = document.getElementById("emoji-container");
      emojiContainer.style.display = emojiContainer.style.display === "none" ? "flex" : "none";
  }
  
  
  
  // Función para mostrar un mensaje en el chat
  // Función para mostrar un mensaje en el chat
  function displayMessage(sender, message) {
    console.log("displayMessage called with sender:", sender, "and message:", message);

    const timestamp = Date.now();
    let displaySender = sender ? sender + ":" : ""; // Mostrar el sender solo si está presente
    const systemMessage = `<li class="system">${message} ${sender}</li>`;
  
    // Anexar el mensaje en la página
    document.getElementById("messages").innerHTML += systemMessage;
  
    // Desplazarse automáticamente hacia abajo
    // Desplazarse automáticamente hacia el último mensaje
  const messagesContainer = document.getElementById("messages");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Manejo del evento submit del formulario
document.getElementById("message-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendMessage();
});


function shareCurrentSong() {
    if (currentVideoIndex >= 0 && currentVideoIndex < videos.length) {
        const currentSong = songInfo[videos[currentVideoIndex].src];
        if (currentSong) {
            const timestamp = Date.now();
            const message = `🎶 Listen to this one: <a href="#" onclick="playSongById(${currentSong.id}); return false;">${currentSong.name} by ${currentSong.artist}</a>`;
            
            // Guardar el mensaje en la base de datos
            db.ref("messages/" + timestamp).set({
                username,
                message,
            });
        }}}

        function playSongById(id) {
            // Encuentra el índice de la canción con el id proporcionado
            const index = videos.findIndex(video => songInfo[video.src].id === id);
        
            // Si se encontró la canción, cámbiala y reprodúcela
            if (index !== -1) {
                currentVideoIndex = index;
                videoPlayer.src = videos[currentVideoIndex].src;
                videoPlayer.load();
                videoPlayer.play();
                const likeButton = document.getElementById("like-button");
                likeButton.disabled = false; // Habilitar botón para cada nueva canción
            }
        }
    
        function generateSongLink(songSrc) {
            const encodedInfo = btoa(JSON.stringify({ songSrc: songSrc }));
            return window.location.origin + window.location.pathname + `?song=${encodedInfo}`;
        }
        
        const queryParams = new URLSearchParams(window.location.search);
            const encodedInfo = queryParams.get("song");
        
            if (encodedInfo) {
                try {
                    const decodedInfo = JSON.parse(atob(encodedInfo));
                    const songIndex = videos.findIndex(video => video.src === decodedInfo.songSrc);
        
                    if (songIndex !== -1) {
                        currentVideoIndex = songIndex;
                        playNextVideo();
                    }
                } catch (error) {
                    console.error("Error decoding song info from URL:", error);
                }
            }
        ;



function saveMessageToDatabase(sender, message) {
    const messagesRef = db.ref("messages"); // Referencia a la colección de mensajes
    const newMessageRef = messagesRef.push(); // Generar una nueva clave única
    newMessageRef.set({
        username: sender,
        message: message,
    });
}


  
  
  const MESSAGES_TO_LOAD = 1;
  // Referencia para el chat
  const fetchChat = db.ref("messages/");
  
  // Manejo del evento child_added
  
// Cambia el manejo del evento child_added para que funcione con la nueva lógica
fetchChat.limitToLast(MESSAGES_TO_LOAD).on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${username === messages.username ? "sent" : "receive"}><span>${messages.username}: </span>${messages.message}</li>`;

    // Añade el mensaje al contenedor de mensajes
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML += message;

    // Desplázate automáticamente hacia abajo
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
  
  // Llama a la función para mostrar la ventana emergente
  showUsernameModal();
  
  // Función para enviar un mensaje
  function sendMessage() {
    // obtener valores a enviar
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // Limpiar el cuadro de entrada
    messageInput.value = "";
  
    // Desplazarse automáticamente hacia abajo
   
  
    // Crear la colección en la base de datos y enviar los datos
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }

  const toggleChatBtn = document.getElementById("toggle-chat-btn");
const toggleIcon = document.getElementById("toggle-icon");

// Agrega un evento para 'touchend' y 'click'
toggleChatBtn.addEventListener("touchend", function() {
    toggleIcon.classList.add('active');
    
    // Elimina la clase después de 900ms
    setTimeout(function() {
        toggleIcon.classList.remove('active');
    }, 600);
});

toggleChatBtn.addEventListener("click", function() {
    toggleIcon.classList.add('active');
    
    // Elimina la clase después de 900ms
    setTimeout(function() {
        toggleIcon.classList.remove('active');
    }, 600);
});


document.querySelectorAll('.custom-button').forEach(button => {
  button.addEventListener('touchstart', function() {
      // Agrega la clase para el efecto
      this.classList.add('active');
      
      // Elimina la clase después de 400ms para simular el "toque"
      setTimeout(() => {
          this.classList.remove('active');
      }, 600); // Ajusta el tiempo según la duración que quieras para el efecto
  });
  
  button.addEventListener('mousedown', function() {
      this.classList.add('active');
  });

  button.addEventListener('mouseup', function() {
      setTimeout(() => {
          this.classList.remove('active');
      }, 600);
  });
  
  button.addEventListener('mouseleave', function() {
      this.classList.remove('active');
  });
});


function toggleEmojiPicker() {
    const emojiButton = document.getElementById('emoji-button');
    const emojiContainer = document.getElementById('emoji-container');

    // Alternar la visibilidad del contenedor de emojis
    emojiContainer.style.display = emojiContainer.style.display === "none" ? "flex" : "none";

    // Agregar la clase 'active' para que se aplique el "salto"
    emojiButton.classList.add('active');

    // Después de 400ms (o el tiempo de la transición), quitar la clase 'active'
    setTimeout(() => {
        emojiButton.classList.remove('active');
    }, 400); // Asegúrate de que este tiempo coincida con la duración de la transición en el CSS
}

document.getElementById("message-btn").addEventListener("touchend", function() {
    this.blur(); // Remueve el foco del botón
});



document.querySelector('#like-button').addEventListener('touchstart', function() {
    this.style.transform = 'translate(-50%, -50%) scale(0.93)';
});

document.querySelector('#like-button').addEventListener('touchend', function() {
    this.style.transform = 'translate(-50%, -50%) scale(1)';
});


document.querySelector('#next-song-button').addEventListener('touchstart', function() {
    this.style.transform = 'translate(-50%, -50%) scale(0.95)';
});

document.querySelector('#next-song-button').addEventListener('touchend', function() {
    this.style.transform = 'translate(-50%, -50%) scale(1)';
});

document.querySelector('#liked-songs-button').addEventListener('touchstart', function() {
    this.style.transform = 'translate(-50%, -50%) scale(0.95)';
});

document.querySelector('#liked-songs-button').addEventListener('touchend', function() {
    this.style.transform = 'translate(-50%, -50%) scale(1)';
});





function toggleMenu(button) {
    var menu = document.getElementById('menu');
    menu.classList.toggle('show');
    
    // Cambiar entre hamburguesa (&#9776;) y X (&times;)
    if (menu.classList.contains('show')) {
        button.classList.add('active'); // Agregar clase active al mostrar el menú
    } else {
        button.classList.remove('active'); // Quitar clase active al ocultar el menú
        // Cerrar los cuadros de información si el menú se cierra
        closeAllInfoBoxes();
    }
}

document.getElementById('menu-toggle').addEventListener('click', function() {
    toggleMenu(this);
});

document.getElementById('about-us-link').addEventListener('click', function() {
    toggleInfoBox('about-us-content');
});

document.getElementById('contact-us-link').addEventListener('click', function() {
    toggleInfoBox('contact-us-content');
});

function toggleInfoBox(boxId) {
    var box = document.getElementById(boxId);
    box.classList.toggle('show');
    
    // Ocultar el otro cuadro si está activo
    var otherBox = boxId === 'about-us-content' ? 'contact-us-content' : 'about-us-content';
    document.getElementById(otherBox).classList.remove('show');
}

function closeAllInfoBoxes() {
    document.getElementById('about-us-content').classList.remove('show');
    document.getElementById('contact-us-content').classList.remove('show');
}


function toggleDiscoMode() {
    var discoGif = document.getElementById("disco-gif");
    var discoLabel = document.getElementById("disco-mode-label");
    var discoBackground = document.getElementById("disco-background");

    // Alterna la visibilidad del GIF
    if (discoGif.style.display === "none") {
        discoGif.style.display = "block"; // Muestra el GIF
        discoLabel.style.display = "block"; // Muestra la etiqueta
        discoBackground.style.display = "block"; // Muestra el fondo oscuro
    } else {
        discoGif.style.display = "none"; // Oculta el GIF
        discoLabel.style.display = "none"; // Oculta la etiqueta
        discoBackground.style.display = "none"; // Oculta el fondo oscuro
    }
}





function generateVerticalStars() {
    const discoBackground = document.getElementById('disco-background');
    
    for (let i = 0; i < 20; i++) { // Generar 135 estrellas
        const star = document.createElement('img');
        star.src = 'starlight3.png'; // Reemplaza con la ruta de tu nuevo PNG
        star.classList.add('vertical-star');

        // Posición inicial aleatoria
        setRandomPosition(star); 
        
        // Tamaño aleatorio para más variación
        const size = Math.random() * 11 + 5; // Tamaño entre 5px y 30px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Duración aleatoria para el efecto fade in/out
        const fadeDuration = Math.random() * -15 + 37; // Duración entre 22s y 37s
        star.style.animationDuration = `${fadeDuration}s`;

        // Retraso aleatorio para que no todas aparezcan al mismo tiempo
        const delay = Math.random() * 10; // Hasta 10 segundos de retraso
        star.style.animationDelay = `${delay}s`;

        // Añadir el movimiento en S
        star.style.animation += `, moveInSvert 5s ease-in-out infinite`; // Agrega el movimiento en S con duración de 5s

        // Cambiar posición en cada iteración de la animación
        star.addEventListener('animationiteration', () => {
            setRandomPosition(star); // Cambiar la posición en cada iteración
        });

        // Añadir la estrella al fondo
        discoBackground.appendChild(star);
    }
}

// Función para establecer una posición aleatoria
function setRandomPosition(star) {
    star.style.left = Math.random() * 100 + 'vw'; // Posición horizontal aleatoria
    star.style.top = Math.random() * 100 + 'vh'; // Posición vertical aleatoria
}

// Ejecutar la función una vez cargado el DOM
document.addEventListener('DOMContentLoaded', generateVerticalStars);



function generateHorizontalStars() {
    const discoBackground = document.getElementById('disco-background');

    for (let i = 0; i < 20; i++) { // Generar 135 estrellas
        const star = document.createElement('img');
        star.src = 'starlight3.png'; // Reemplaza con la ruta de tu nuevo PNG
        star.classList.add('horizontal-star');

        // Posición inicial aleatoria
        setRandomPosition(star); 
        
        // Tamaño aleatorio para más variación
        const size = Math.random() * 11 + 5; // Tamaño entre 15px y 25px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Duración aleatoria para el efecto fade in/out
        const fadeDuration = Math.random() * -15 + 37; // Duración entre 22s y 37s
        star.style.animationDuration = `${fadeDuration}s`;

        // Retraso aleatorio para que no todas aparezcan al mismo tiempo
        const delay = Math.random() * 10; // Hasta 10 segundos de retraso
        star.style.animationDelay = `${delay}s`;

        // Añadir el movimiento en S
        star.style.animation += `, moveInShor 5s ease-in-out infinite`; // Agrega el movimiento en S con duración de 5s

        // Cambiar posición en cada iteración de la animación
        star.addEventListener('animationiteration', () => {
            setRandomPosition(star); // Cambiar la posición en cada iteración
        });

        // Añadir la estrella al fondo
        discoBackground.appendChild(star);
    }
}

// Función para establecer una posición aleatoria
function setRandomPosition(star) {
    star.style.left = Math.random() * 100 + 'vw'; // Posición horizontal aleatoria
    star.style.top = Math.random() * 100 + 'vh'; // Posición vertical aleatoria
}

// Ejecutar la función una vez cargado el DOM
document.addEventListener('DOMContentLoaded', generateHorizontalStars);



function generateTwinklingStars() {
    const discoBackground = document.getElementById('disco-background');
    
    // Función para detectar si es una pantalla grande
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;

    for (let i = 0; i < 345; i++) { // Generar 345 estrellas
        const star = document.createElement('img');
        star.src = 'starlight2.png';
        star.classList.add('star');
        
        setRandomPosition(star);

        // Verificar si es pantalla grande y ajustar el tamaño
        let size;
        if (isLargeScreen) {
            size = Math.random() * 27 + 10; // Tamaño entre 10px y 30px en pantallas grandes
        } else {
            size = Math.random() * 17 + 5; // Tamaño entre 5px y 16px en pantallas pequeñas
        }
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Duración aleatoria para el efecto fade in/out
        const fadeDuration = Math.random() * -15 + 37; // Duración fija de 37 segundos
        star.style.animationDuration = `${fadeDuration}s`;

        // Retraso aleatorio para que no todas aparezcan al mismo tiempo
        const delay = Math.random() * 10; // Hasta 10 segundos de retraso
        star.style.animationDelay = `${delay}s`;

        // Selección aleatoria de una animación de oscilación
        const oscillateClass = `oscillate${Math.floor(Math.random() * 3) + 1}`; // Elige entre oscillate1, oscillate2 y oscillate3
        star.style.animation += `, ${oscillateClass} 4s ease-in-out infinite`; // Añadir la animación de oscilación aleatoria

        // Evento para cambiar posición al final de la animación
        star.addEventListener('animationiteration', () => {
            setRandomPosition(star); // Cambiar la posición en cada iteración
        });

        discoBackground.appendChild(star);
    }
}

// Función para establecer una posición aleatoria
function setRandomPosition(star) {
    star.style.left = Math.random() * 30 + 'vw'; // Posición horizontal aleatoria
    const minVH = 50;
const maxVH = 150;
star.style.top = (Math.random() * (maxVH - minVH) + minVH) + 'vh';
}

document.addEventListener('DOMContentLoaded', generateTwinklingStars);



let originalHeight = window.innerHeight; // Guardamos la altura original

function fixBackground() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        document.querySelector(".background-container").style.height = originalHeight * 2.25 + "px"; // 225vh en móviles
    } else {
        document.querySelector(".background-container").style.height = ""; // Restablece en escritorio
    }
}

window.addEventListener("resize", () => {
    setTimeout(() => {
        fixBackground();
    }, 100); // Pequeño delay para esperar el ajuste del teclado
});

window.addEventListener("load", fixBackground);


document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById("bg-video");

  if (!video) return;

  // Intenta reproducir tras cargar
  const tryPlay = () => {
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  // Reintenta poco después de carga
  setTimeout(tryPlay, 800);

  // Fuerza reproducción al primer toque o scroll (iOS workaround)
  document.addEventListener("touchstart", tryPlay, { once: true });
  document.addEventListener("scroll", tryPlay, { once: true });
});





document.addEventListener("DOMContentLoaded", () => {
  const vc = document.querySelector("#video-container");
  if (!vc) return;

  // --- Aseguramos posición base ---
  vc.style.position = "absolute";
  vc.style.zIndex = "10";
  vc.style.pointerEvents = "auto";

  // --- Creamos los controles de forma global ---
  const controls = document.createElement("div");
  controls.className = "custom-controls";
  controls.innerHTML = `
    <button class="playPauseBtn">⏯️</button>
    <button class="muteBtn">🔊</button>
  `;

  // Estilos en línea (para que no dependan de CSS externo)
  Object.assign(controls.style, {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: "9999",
    opacity: "0",
    transition: "opacity 0.3s ease",
    pointerEvents: "auto"
  });

  // Insertar los controles al final del video-container
  vc.appendChild(controls);

  // Mostrar/ocultar al pasar o tocar
  vc.addEventListener("mouseenter", () => controls.style.opacity = "1");
  vc.addEventListener("mouseleave", () => controls.style.opacity = "0");
  vc.addEventListener("click", () => {
    controls.style.opacity = controls.style.opacity === "1" ? "0" : "1";
  });

  // --- Acciones de los botones ---
  controls.querySelector(".playPauseBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    vc.querySelectorAll("video").forEach(v => {
      if (v.paused) v.play();
      else v.pause();
    });
  });

  controls.querySelector(".muteBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    vc.querySelectorAll("video").forEach(v => {
      v.muted = !v.muted;
    });
    e.target.textContent = vc.querySelector("video")?.muted ? "🔇" : "🔊";
  });

  // --- Refuerzo visual por si algo lo tapa ---
  setInterval(() => {
    controls.style.zIndex = "9999";
    controls.style.pointerEvents = "auto";
    vc.style.pointerEvents = "auto";
  }, 2000);

  console.log("✅ Controles personalizados añadidos correctamente");
});
