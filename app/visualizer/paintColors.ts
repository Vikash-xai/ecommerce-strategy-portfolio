export type PaintColor = {
  name: string;
  code?: string;
  hex: string;
};

export type PaintColorFamily = {
  family: string;
  colors: PaintColor[];
};

export const paintColorFamilies: PaintColorFamily[] = [
  {
    family: "Whites & Neutrals",
    colors: [
      { name: "Ivory", code: "315", hex: "#e9d0a9" },
      { name: "Pale Ivory", code: "7892", hex: "#f2ead3" },
      { name: "Mirage White", hex: "#f2efea" },
      { name: "Snow Princess", hex: "#f8f7f3" },
      { name: "Solitude", hex: "#ecede8" },
    ],
  },
  {
    family: "Beige & Brown",
    colors: [
      { name: "12 Marble", hex: "#e6dcc8" },
      { name: "African Desert", hex: "#c9a97e" },
      { name: "Almond Kiss", hex: "#e2c7a4" },
    ],
  },
  {
    family: "Grey",
    colors: [
      { name: "Aluminium", hex: "#b7bab9" },
      { name: "Antimony", hex: "#6e6e6e" },
      { name: "Ash Grey", hex: "#c3c4c0" },
    ],
  },
  {
    family: "Orange & Yellow",
    colors: [
      { name: "Apricot Illusion", hex: "#f0b27a" },
      { name: "Canyon Sun", hex: "#d2793f" },
    ],
  },
  {
    family: "Pink & Red",
    colors: [
      { name: "Azalea", hex: "#e8a0ae" },
      { name: "Baby Blush", hex: "#f3d1d6" },
      { name: "Burgundy Plus", hex: "#6e2436" },
    ],
  },
  {
    family: "Blue",
    colors: [
      { name: "Sky Mimic", hex: "#afcbe0" },
      { name: "Winter Morn", hex: "#c7d6de" },
      { name: "Fairytale", hex: "#d7e3ec" },
      { name: "Caribbean Sky", hex: "#4fa9d8" },
      { name: "Placid Blue", code: "N", hex: "#6c93b5" },
      { name: "Pigeon Blue", code: "0122", hex: "#7d97a8" },
      { name: "Scuba Blue", hex: "#1d6e8c" },
      { name: "Naval Club", code: "N", hex: "#24405c" },
      { name: "Sharp Navy", code: "N", hex: "#1f3a5f" },
      { name: "Ink Blue", hex: "#16283e" },
      { name: "Deep Sea Blue", code: "9159", hex: "#123a52" },
    ],
  },
  {
    family: "Green",
    colors: [
      { name: "Ivory Coast", code: "3165", hex: "#d9dab0" },
      { name: "Sea Breeze", hex: "#a9cfc0" },
      { name: "Teal Blast", code: "7503", hex: "#157a6e" },
      { name: "Emerald Sea", code: "9739 N", hex: "#1f6e52" },
    ],
  },
];
