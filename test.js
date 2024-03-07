
const chars_lower = "abcdefghijklmnopqrstuvwxyz";
const chars_upper = chars_lower.toUpperCase();

export const stoi = {};
export const itos = {};
for (let i = 0; i < 52; i += 2) {
  const ch_l = chars_lower[i / 2];
  const ch_u = chars_upper[i / 2];
  stoi[ch_l] = i;
  stoi[ch_u] = i + 1;
  itos[i] = ch_l;
  itos[i + 1] = ch_u;
}


function ceaser_cipher(string, n, keep_spaces = true, keep_non_alpha = true) {

  let result = "";
  n *= 2;
  for (let i = 0; i < string.length; i++) {
    let c = string[i];
    if (c == " ") {
      result += " "
      continue
    }
    let ri = itos[(stoi[c] + n) % 52]
    if (ri !== undefined) {
      result += ri;
    } else {
      result += c;
    }
  }
  if (!keep_spaces) {
    result = result.replace(/\s/g, '');
  }
  if (!keep_non_alpha) {
    result = result.replace(/[^A-Za-z]/g, '');
  }

  return result;
}
let msg = "iylhrjlhzlyjp1 woly";
let res = ceaser_cipher(msg,19);
console.log(res);


