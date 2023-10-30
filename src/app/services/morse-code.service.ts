import { Injectable } from '@angular/core';

export const MORSE_CODE: { [key: string]: string } = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
  '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
  '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
  '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
  '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3',
  '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
  '----.': '9', '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'",
  '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&',
  '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+', '-....-': '-',
  '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@'
};

@Injectable({
  providedIn: 'root'
})
export class MorseCodeService {

  constructor() { }

  decodeBits(bits: string): string {
    const trimmedBits = bits.replace(/^0+|0+$/g, '');

    const timeUnit = Math.min(
      ...trimmedBits.split(/0|1/).filter(s => s.length > 0).map(s => s.length)
    );

    return trimmedBits
      .split(new RegExp(`0{${7 * timeUnit}}`, 'g'))
      .join('   ')
      .split(new RegExp(`0{${3 * timeUnit}}`, 'g'))
      .join(' ')
      .replace(new RegExp(`1{1,${2 * timeUnit}}`, 'g'), '.')
      .replace(new RegExp(`1{${3 * timeUnit},}`, 'g'), '-');
  }

  decodeMorse(morseCode: string): string {
    const cleanedMorse = morseCode.trim().replace(/ +/g, ' ');

    return cleanedMorse
        .split('   ')
        .map(word => word
            .split(' ')
            .map(character => this.decode(character) || '')
            .join(''))
        .join(' ');
}


  decode(character: string): string | null {
    return MORSE_CODE[character] || null;
  }
}
