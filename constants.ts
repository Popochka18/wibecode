import { DnDRace, DnDClass, DnDAlignment } from './types';

export const DND_RACES: DnDRace[] = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"];
export const DND_CLASSES: DnDClass[] = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
export const DND_ALIGNMENTS: DnDAlignment[] = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"];

export const MODELS = {
  PRO: 'gemini-2.5-pro',
  FLASH: 'gemini-2.5-flash',
  IMAGEN: 'imagen-4.0-generate-001',
  FLASH_IMAGE: 'gemini-2.5-flash-image',
};
