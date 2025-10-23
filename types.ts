export type DnDRace = "Human" | "Elf" | "Dwarf" | "Halfling" | "Dragonborn" | "Gnome" | "Half-Elf" | "Half-Orc" | "Tiefling";
export type DnDClass = "Barbarian" | "Bard" | "Cleric" | "Druid" | "Fighter" | "Monk" | "Paladin" | "Ranger" | "Rogue" | "Sorcerer" | "Warlock" | "Wizard";
export type DnDAlignment = "Lawful Good" | "Neutral Good" | "Chaotic Good" | "Lawful Neutral" | "True Neutral" | "Chaotic Neutral" | "Lawful Evil" | "Neutral Evil" | "Chaotic Evil";

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character {
  name: string;
  race: DnDRace;
  dndClass: DnDClass;
  alignment: DnDAlignment;
  stats: CharacterStats;
  backstory: string;
  appearance: string;
  portraitUrl: string;
}

export interface GeneratedCharacterData {
  name: string;
  stats: CharacterStats;
  backstory: string;
  appearance: string;
  portraitDescription: string;
}
