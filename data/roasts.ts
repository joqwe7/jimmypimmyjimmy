import { AttackType, Roast } from '../types';

export const ROAST_DATABASE: Record<AttackType, Roast[]> = {
  [AttackType.ULKONAKO]: [
    { text: "Naamasi on syy, miksi sokeat hymyilevät.", baseDamage: 20, critChance: 0.2 },
    { text: "Näytät siltä kuin olisit syttynyt tuleen ja joku olisi sammuttanut sinut lapiolla.", baseDamage: 25, critChance: 0.3 },
    { text: "Peilisi tekee itsemurhan joka aamu.", baseDamage: 18, critChance: 0.1 },
    { text: "Oletko käynyt lääkärissä? Tuo naama ei voi olla parannettavissa.", baseDamage: 22, critChance: 0.25 },
    { text: "Muistutat minua varpaankynnestä. Hyödytön ja ruma.", baseDamage: 15, critChance: 0.1 }
  ],
  [AttackType.ALYKKYYS]: [
    { text: "Jos aivosi olisivat dynamiittia, et saisi edes hattua päästäsi.", baseDamage: 30, critChance: 0.4 },
    { text: "Olet elävä todiste siitä, että ihminen voi elää ilman aivotoimintaa.", baseDamage: 28, critChance: 0.3 },
    { text: "Älykkyysosamääräsi on pienempi kuin kengännumerosi.", baseDamage: 20, critChance: 0.1 },
    { text: "Olet niin tyhmä, että yrität aakkostaa M&M-karkkeja.", baseDamage: 15, critChance: 0.05 },
    { text: "Hapen tuhlaaja. Kasvi tekisi työsi paremmin.", baseDamage: 35, critChance: 0.5 }
  ],
  [AttackType.PERSOONA]: [
    { text: "Kukaan ei pidä sinusta. Ei edes äitisi.", baseDamage: 25, critChance: 0.3 },
    { text: "Olet ihmisvastine märälle sukalle.", baseDamage: 18, critChance: 0.15 },
    { text: "Persoonallisuutesi on kuin tyhjä huone: pimeä ja kylmä.", baseDamage: 22, critChance: 0.2 },
    { text: "Olet vain geneettinen virhe.", baseDamage: 40, critChance: 0.6 },
    { text: "Synnyitkö vahingossa vai oliko se kosto?", baseDamage: 30, critChance: 0.4 }
  ],
  [AttackType.SERVAUS]: [
    { text: "Mene roskiin, minne kuulutkin.", baseDamage: 35, critChance: 0.5 },
    { text: "Olet turha.", baseDamage: 45, critChance: 0.4 },
    { text: "Maailma olisi parempi paikka ilman sinua.", baseDamage: 50, critChance: 0.7 },
    { text: "Itke itsesi uneen, luuseri.", baseDamage: 30, critChance: 0.3 }
  ],
  [AttackType.VASARA]: [
    { text: "*BONK* Vasara osui suoraan tyhjään kalloon!", baseDamage: 50, critChance: 0.8 },
    { text: "*RÄJÄHDYS* Polvilumpiot murskattu!", baseDamage: 45, critChance: 0.7 },
    { text: "RAAKAA VÄKIVALTAA! Vasara litisti nenän.", baseDamage: 55, critChance: 0.9 }
  ]
};

export const JIMMY_RETORTS = [
  "Au! Miksi teet näin?!",
  "Äiti! Tule hakemaan minut!",
  "Lopeta! Minä murenen!",
  "*Nyyhkytystä*",
  "Minä en ole... *niisk*... tyhmä...",
  "Tämä on kiusaamista!",
  "Sattuu sieluun... ja naamaan..."
];

export const JIMMY_DEFEAT_MESSAGES = [
  "Jimmy vietiin paareilla pois.",
  "Jimmy muutti nimensä ja pakeni maasta.",
  "Jimmy luovutti ja ryömi kiven alle.",
  "FATAALI VIRHE: Jimmyn ego tuhoutui täysin."
];