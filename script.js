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
