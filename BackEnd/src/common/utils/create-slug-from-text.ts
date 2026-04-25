import { generateRandomSuffix } from './generate-random-suffix';
import { slugify } from './slugify';

export function createSlugFromText(text: string) {
  const safeText = text || '';
  const slug = slugify(safeText);
  return `${slug}-${generateRandomSuffix()}`;
}
