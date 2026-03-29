function criptografar() {
  const texto = document.getElementById("texto").value;
  const chave = document.getElementById("chave").value;
  const resultado = btoa(chave + "|" + texto); // base64 simples
  document.getElementById("resultado").textContent = resultado;
}

function descriptografar() {
  const entrada = document.getElementById("texto").value;
  const chave = document.getElementById("chave").value;
  try {
    const decodificado = atob(entrada);
    const [chaveOriginal, textoOriginal] = decodificado.split("|");
    if (chaveOriginal === chave) {
      document.getElementById("resultado").textContent = textoOriginal;
    } else {
      document.getElementById("resultado").textContent = "Chave incorreta!";
    }
  } catch {
    document.getElementById("resultado").textContent = "Texto inválido!";
  }
}

function copiarTexto() {
  const texto = document.getElementById("resultado").textContent;
  if (!texto || texto === "Texto inválido!" || texto === "Chave incorreta!") return;
  
  navigator.clipboard.writeText(texto).then(() => {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
  });
}

// Mecanismo de Defesa e Anti-Inspeção
document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
  // Bloqueia F12, Ctrl+Shift+I/J/C (DevTools) e Ctrl+U (Código Fonte)
  if (e.key === "F12" || 
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) || 
      (e.ctrlKey && e.key.toLowerCase() === "u")) {
    e.preventDefault();
    return false;
  }
});
