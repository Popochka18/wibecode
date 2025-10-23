import React, { useState } from 'react';
import { DND_RACES, DND_CLASSES, DND_ALIGNMENTS } from '../constants';
import { generateCharacter, generatePortrait } from '../services/geminiService';
import { Character, DnDRace, DnDClass, DnDAlignment } from '../types';
import { Button } from './Button';
import { Select } from './Select';
import { CharacterSheet } from './CharacterSheet';
import { Loader } from './Loader';
import { WandIcon } from './Icons';

type GenerationStatus = 'idle' | 'generating_text' | 'generating_portrait' | 'success' | 'error';

const CharacterGenerator: React.FC = () => {
  const [race, setRace] = useState<DnDRace>('Human');
  const [dndClass, setDndClass] = useState<DnDClass>('Fighter');
  const [alignment, setAlignment] = useState<DnDAlignment>('True Neutral');
  const [character, setCharacter] = useState<Character | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setStatus('generating_text');
    setError(null);
    setCharacter(null);
    try {
      const charData = await generateCharacter(race, dndClass, alignment);
      
      setStatus('generating_portrait');
      const portraitUrl = await generatePortrait(charData.portraitDescription);
      
      setCharacter({
        ...charData,
        race,
        dndClass: dndClass,
        alignment,
        portraitUrl,
      });
      setStatus('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(errorMessage);
      setStatus('error');
    }
  };

  const isLoading = status === 'generating_text' || status === 'generating_portrait';
  
  const getLoadingMessage = () => {
    if (status === 'generating_text') return 'Forging character saga...';
    if (status === 'generating_portrait') return 'Summoning character portrait...';
    return '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-slate-800/50 p-6 rounded-lg border border-amber-800/50 shadow-lg">
        <h2 className="text-2xl font-cinzel font-bold mb-6 text-amber-200">Character Parameters</h2>
        <div className="space-y-6">
          <Select label="Race" value={race} onChange={(e) => setRace(e.target.value as DnDRace)}>
            {DND_RACES.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
          <Select label="Class" value={dndClass} onChange={(e) => setDndClass(e.target.value as DnDClass)}>
            {DND_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select label="Alignment" value={alignment} onChange={(e) => setAlignment(e.target.value as DnDAlignment)}>
            {DND_ALIGNMENTS.map((a) => <option key={a} value={a}>{a}</option>)}
          </Select>
        </div>
        <div className="mt-8">
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
            <WandIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating...' : 'Generate Character'}
          </Button>
        </div>
      </div>
      
      <div className="lg:col-span-2 min-h-[600px] bg-slate-800/50 p-6 rounded-lg border border-amber-800/50 shadow-lg flex items-center justify-center">
        {isLoading && <Loader message={getLoadingMessage()} />}
        {status === 'error' && (
          <div className="text-center text-red-400">
            <h3 className="text-xl font-bold mb-2">Generation Failed</h3>
            <p>{error}</p>
          </div>
        )}
        {status === 'success' && character && <CharacterSheet character={character} />}
        {status === 'idle' && (
          <div className="text-center text-amber-300/70">
            <p className="text-lg">Your generated character will appear here.</p>
            <p>Select your parameters and begin the adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterGenerator;
