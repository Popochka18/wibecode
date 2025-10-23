import React from 'react';
import { Character, CharacterStats } from '../types';

interface CharacterSheetProps {
  character: Character;
}

const StatBox: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="bg-slate-900/50 p-3 rounded-md text-center border border-amber-900/50">
        <div className="text-xs text-amber-200 uppercase tracking-wider">{label}</div>
        <div className="text-2xl font-bold font-cinzel text-amber-50">{value}</div>
    </div>
);

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ character }) => {
  return (
    <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto p-1 pr-4 text-amber-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img 
            src={character.portraitUrl} 
            alt={`Portrait of ${character.name}`} 
            className="w-full aspect-square object-cover rounded-lg shadow-lg border-2 border-amber-800/50"
          />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-4xl font-cinzel font-bold text-amber-200">{character.name}</h2>
          <p className="text-lg text-amber-300/90 mb-4">{`${character.race} ${character.dndClass} | ${character.alignment}`}</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
              <StatBox label="STR" value={character.stats.strength} />
              <StatBox label="DEX" value={character.stats.dexterity} />
              <StatBox label="CON" value={character.stats.constitution} />
              <StatBox label="INT" value={character.stats.intelligence} />
              <StatBox label="WIS" value={character.stats.wisdom} />
              <StatBox label="CHA" value={character.stats.charisma} />
          </div>
        </div>
        <div className="md:col-span-3 space-y-4">
            <div>
                <h3 className="text-xl font-cinzel font-bold border-b-2 border-amber-800/50 pb-1 mb-2 text-amber-200">Appearance</h3>
                <p className="text-amber-100/90 whitespace-pre-wrap">{character.appearance}</p>
            </div>
            <div>
                <h3 className="text-xl font-cinzel font-bold border-b-2 border-amber-800/50 pb-1 mb-2 text-amber-200">Backstory</h3>
                <p className="text-amber-100/90 whitespace-pre-wrap">{character.backstory}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
