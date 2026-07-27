import raw from "./pictures.json";

export type Picture = {
  url: string;
  caption: string;
  uploadedAt: string;
};

export const pictures: Picture[] = raw as Picture[];

export function sortedPictures(list: Picture[] = pictures): Picture[] {
  return [...list].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}
