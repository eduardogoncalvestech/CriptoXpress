from Crypto.Cipher import AES
import base64
import hashlib

def pad(text):
    return text + (16 - len(text) % 16) * chr(16 - len(text) % 16)

def unpad(text):
    return text[:-ord(text[-1])]

def gerar_chave(chave):
    return hashlib.sha256(chave.encode()).digest()

def criptografar(texto, chave):
    cipher = AES.new(gerar_chave(chave), AES.MODE_ECB)
    texto_preenchido = pad(texto)
    criptografado = cipher.encrypt(texto_preenchido.encode())
    return base64.b64encode(criptografado).decode()

def descriptografar(texto_cripto, chave):
    cipher = AES.new(gerar_chave(chave), AES.MODE_ECB)
    decodificado = base64.b64decode(texto_cripto)
    texto = cipher.decrypt(decodificado).decode()
    return unpad(texto)

# Exemplo de uso:
texto = input("Texto: ")
chave = input("Chave (16+ caracteres): ")

modo = input("Digite C para criptografar ou D para descriptografar: ").upper()

if modo == "C":
    print("Criptografado:", criptografar(texto, chave))
elif modo == "D":
    print("Descriptografado:", descriptografar(texto, chave))
else:
    print("Modo inválido.")
