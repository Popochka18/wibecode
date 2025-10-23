import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';
import { Button } from './Button';
import { Loader } from './Loader';
import { UploadIcon, SparklesIcon } from './Icons';

const fileToDataUrl = (file: File): Promise<{ dataUrl: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve({ dataUrl: reader.result, mimeType: file.type });
            } else {
                reject(new Error('Failed to read file as data URL.'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const ImageEditor: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<{ dataUrl: string; mimeType: string } | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setEditedImage(null);
            setError(null);
            try {
                const { dataUrl, mimeType } = await fileToDataUrl(file);
                setOriginalImage({ dataUrl, mimeType });
            } catch (err) {
                setError('Failed to load image.');
            }
        }
    };

    const handleEdit = async () => {
        if (!originalImage || !prompt) {
            setError('Please upload an image and enter an editing prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const base64Data = originalImage.dataUrl.split(',')[1];
            const newImage = await editImage(base64Data, originalImage.mimeType, prompt);
            setEditedImage(newImage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during editing.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-800/50 shadow-lg">
                <h2 className="text-2xl font-cinzel font-bold mb-4 text-amber-200">Image Magic</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="prompt-input" className="block text-sm font-medium text-amber-100 mb-2">Editing Prompt</label>
                        <input
                            id="prompt-input"
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., Add a retro filter, make it look like a watercolor painting..."
                            className="w-full bg-slate-700 border border-amber-700/50 rounded-md shadow-sm py-2 px-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        />
                    </div>
                    <div className="flex flex-col justify-end gap-4 sm:flex-row md:flex-col">
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button onClick={() => fileInputRef.current?.click()} className="w-full justify-center">
                            <UploadIcon className="w-5 h-5 mr-2" />
                            Upload Image
                        </Button>
                        <Button onClick={handleEdit} disabled={isLoading || !originalImage} className="w-full justify-center">
                            <SparklesIcon className="w-5 h-5 mr-2"/>
                            {isLoading ? 'Applying...' : 'Apply Magic'}
                        </Button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md shadow-lg" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-cinzel font-bold mb-4">Original</h3>
                    <div className="w-full aspect-square bg-slate-800/50 rounded-lg border-2 border-dashed border-amber-800/50 flex items-center justify-center">
                        {originalImage ? (
                            <img src={originalImage.dataUrl} alt="Original" className="object-contain max-w-full max-h-full rounded-md" />
                        ) : (
                            <p className="text-amber-300/70">Upload an image to begin</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-cinzel font-bold mb-4">Edited</h3>
                     <div className="w-full aspect-square bg-slate-800/50 rounded-lg border-2 border-dashed border-amber-800/50 flex items-center justify-center">
                        {isLoading ? (
                            <Loader message="Altering reality..." />
                        ) : editedImage ? (
                            <img src={editedImage} alt="Edited" className="object-contain max-w-full max-h-full rounded-md" />
                        ) : (
                            <p className="text-amber-300/70">Your edited image will appear here</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageEditor;
