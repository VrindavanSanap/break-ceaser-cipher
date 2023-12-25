const chars = "abcdefghijklmnopqrstuvwxyz";

export const stoi = {};
export const itos = {};
for (let i = 0; i < chars.length; i++) {
  const ch = chars[i];
  stoi[ch] = i;
  itos[i] = ch;
}
export function ceaser_cipher(string, n = 0){
  string = string.replace(/[^a-zA-Z]/g, '').toLowerCase();
  let result = "";
  for (let i = 0; i < string.length; i++) {
    let c = string[i];
    result +=  itos[(stoi[c] + n) % 26]
  }
  return result;
}

