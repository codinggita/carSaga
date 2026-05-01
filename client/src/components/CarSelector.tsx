import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import carDatabaseService from '../services/carDatabase.service';

interface CarSelectorData {
  make: string;
  model: string;
  year: number;
  brandImage: string;
}

interface CarSelectorProps {
  onSelect: (data: CarSelectorData) => void;
  disabled?: boolean;
}

export const CarSelector = ({ onSelect, disabled }: CarSelectorProps) => {
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [generations, setGenerations] = useState<any[]>([]);
  
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedGen, setSelectedGen] = useState('');

  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isLoadingGens, setIsLoadingGens] = useState(false);

  useEffect(() => {
    setIsLoadingBrands(true);
    carDatabaseService.getBrands()
      .then((data) => setBrands(data.brands || []))
      .catch((err) => console.error('Failed to load brands', err))
      .finally(() => setIsLoadingBrands(false));
  }, []);

  useEffect(() => {
    if (!selectedBrand) {
      setModels([]);
      setSelectedModel('');
      setGenerations([]);
      setSelectedGen('');
      return;
    }
    setIsLoadingModels(true);
    setSelectedModel('');
    setGenerations([]);
    setSelectedGen('');
    carDatabaseService.getModels(selectedBrand)
      .then((data) => setModels(data.models || []))
      .catch((err) => console.error('Failed to load models', err))
      .finally(() => setIsLoadingModels(false));
  }, [selectedBrand]);

  useEffect(() => {
    if (!selectedModel) {
      setGenerations([]);
      setSelectedGen('');
      return;
    }
    setIsLoadingGens(true);
    setSelectedGen('');
    carDatabaseService.getGenerations(selectedModel)
      .then((data) => setGenerations(data.generations || []))
      .catch((err) => console.error('Failed to load generations', err))
      .finally(() => setIsLoadingGens(false));
  }, [selectedModel]);

  // Memoized callback for selection
  const emitSelection = useCallback(() => {
    if (selectedBrand && selectedModel) {
      const brandObj = brands.find(b => b.id === selectedBrand);
      const modelObj = models.find(m => m.id === selectedModel);
      const genObj = generations.find(g => g.id === selectedGen);
      
      onSelect({
        make: brandObj?.name || 'Unknown',
        model: modelObj?.name || 'Unknown',
        year: genObj ? parseInt(genObj.year_begin) || 2023 : 2023,
        brandImage: brandObj?.image || '',
      });
    }
  }, [selectedBrand, selectedModel, selectedGen, brands, models, generations, onSelect]);

  useEffect(() => {
    emitSelection();
  }, [emitSelection]);

  const selectClass = "w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all disabled:opacity-50 appearance-none";

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-sm font-extrabold text-[#0f172a]">Vehicle Selection</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Brand Dropdown */}
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            disabled={disabled || isLoadingBrands}
            className={selectClass}
          >
            <option value="">Select Make...</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          {isLoadingBrands && <Loader2 size={14} className="absolute right-3 top-3.5 animate-spin text-gray-400" />}
        </div>

        {/* Model Dropdown */}
        <div className="relative">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={disabled || !selectedBrand || isLoadingModels}
            className={selectClass}
          >
            <option value="">Select Model...</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          {isLoadingModels && <Loader2 size={14} className="absolute right-3 top-3.5 animate-spin text-gray-400" />}
        </div>

        {/* Generation Dropdown */}
        <div className="relative">
          <select
            value={selectedGen}
            onChange={(e) => setSelectedGen(e.target.value)}
            disabled={disabled || !selectedModel || isLoadingGens}
            className={selectClass}
          >
            <option value="">Select Generation...</option>
            {generations.map((g) => (
              <option key={g.id} value={g.id}>{g.name} ({g.year_begin} - {g.year_end || 'Present'})</option>
            ))}
          </select>
          {isLoadingGens && <Loader2 size={14} className="absolute right-3 top-3.5 animate-spin text-gray-400" />}
        </div>
      </div>
    </div>
  );
};
