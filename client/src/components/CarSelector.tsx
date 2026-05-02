import { useState } from 'react';

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

const CAR_DATA: Record<string, { models: string[]; image: string }> = {
  'Maruti Suzuki': { image: 'https://www.carlogos.org/car-logos/maruti-suzuki-logo.png', models: ['Swift', 'Baleno', 'Dzire', 'Vitara Brezza', 'Ertiga', 'Alto', 'Wagon R', 'Celerio', 'S-Cross', 'Grand Vitara'] },
  'Hyundai': { image: 'https://www.carlogos.org/car-logos/hyundai-logo.png', models: ['Creta', 'i20', 'Venue', 'Verna', 'Tucson', 'Alcazar', 'Exter', 'Aura', 'i10 Nios', 'Ioniq 5'] },
  'Tata Motors': { image: 'https://www.carlogos.org/car-logos/tata-logo.png', models: ['Nexon', 'Harrier', 'Safari', 'Punch', 'Altroz', 'Tiago', 'Tigor', 'Curvv', 'Nexon EV', 'Punch EV'] },
  'Mahindra': { image: 'https://www.carlogos.org/car-logos/mahindra-logo.png', models: ['XUV700', 'Thar', 'Scorpio N', 'XUV400', 'Bolero', 'BE 6e', 'XEV 9e', 'Marazzo', 'KUV100', 'Alturas G4'] },
  'Toyota': { image: 'https://www.carlogos.org/car-logos/toyota-logo.png', models: ['Innova Crysta', 'Fortuner', 'Glanza', 'Urban Cruiser', 'Camry', 'Vellfire', 'Hilux', 'Rumion', 'Land Cruiser', 'Hyryder'] },
  'Honda': { image: 'https://www.carlogos.org/car-logos/honda-logo.png', models: ['City', 'Amaze', 'Elevate', 'Jazz', 'WR-V', 'CR-V', 'Accord', 'BR-V', 'HR-V', 'Pilot'] },
  'Kia': { image: 'https://www.carlogos.org/car-logos/kia-logo.png', models: ['Seltos', 'Sonet', 'Carens', 'EV6', 'Carnival', 'Stinger', 'Sportage', 'Telluride', 'Sorento', 'Niro'] },
  'MG Motor': { image: 'https://www.carlogos.org/car-logos/mg-logo.png', models: ['Hector', 'Gloster', 'ZS EV', 'Comet EV', 'Astor', 'Hector Plus', 'Windsor EV', 'Cyberster'] },
  'Volkswagen': { image: 'https://www.carlogos.org/car-logos/volkswagen-logo.png', models: ['Taigun', 'Virtus', 'Polo', 'Vento', 'Tiguan', 'T-Roc', 'ID.4', 'Passat', 'Touareg'] },
  'Skoda': { image: 'https://www.carlogos.org/car-logos/skoda-logo.png', models: ['Kushaq', 'Slavia', 'Octavia', 'Superb', 'Kodiaq', 'Karoq', 'Enyaq', 'Rapid'] },
  'BMW': { image: 'https://www.carlogos.org/car-logos/bmw-logo.png', models: ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', '2 Series', 'M3', 'i4'] },
  'Mercedes-Benz': { image: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png', models: ['C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'A-Class', 'EQB', 'EQS'] },
  'Audi': { image: 'https://www.carlogos.org/car-logos/audi-logo.png', models: ['A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'RS5', 'TT'] },
  'Jeep': { image: 'https://www.carlogos.org/car-logos/jeep-logo.png', models: ['Compass', 'Meridian', 'Wrangler', 'Grand Cherokee', 'Cherokee', 'Renegade'] },
  'Ford': { image: 'https://www.carlogos.org/car-logos/ford-logo.png', models: ['EcoSport', 'Endeavour', 'Figo', 'Aspire', 'Mustang', 'Bronco', 'F-150', 'Explorer'] },
};

const YEARS = Array.from({ length: 20 }, (_, i) => 2025 - i);

const selectClass = "w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-semibold text-[#0f172a] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all disabled:opacity-50 cursor-pointer";

export const CarSelector = ({ onSelect, disabled }: CarSelectorProps) => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState(2023);

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel('');
    if (make) {
      onSelect({ make, model: '', year: selectedYear, brandImage: CAR_DATA[make]?.image || '' });
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    if (selectedMake && model) {
      onSelect({ make: selectedMake, model, year: selectedYear, brandImage: CAR_DATA[selectedMake]?.image || '' });
    }
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    if (selectedMake && selectedModel) {
      onSelect({ make: selectedMake, model: selectedModel, year, brandImage: CAR_DATA[selectedMake]?.image || '' });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-sm font-extrabold text-[#0f172a]">
        Vehicle Selection <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Make */}
        <select
          value={selectedMake}
          onChange={(e) => handleMakeChange(e.target.value)}
          disabled={disabled}
          className={selectClass}
        >
          <option value="">Select Make...</option>
          {Object.keys(CAR_DATA).map((make) => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>

        {/* Model */}
        <select
          value={selectedModel}
          onChange={(e) => handleModelChange(e.target.value)}
          disabled={disabled || !selectedMake}
          className={selectClass}
        >
          <option value="">Select Model...</option>
          {selectedMake && CAR_DATA[selectedMake]?.models.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        {/* Year */}
        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          disabled={disabled || !selectedModel}
          className={selectClass}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {selectedMake && (
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <span className="text-xs font-bold text-[var(--color-primary)]">
            {selectedMake}{selectedModel ? ` · ${selectedModel}` : ''}{selectedModel ? ` · ${selectedYear}` : ''}
          </span>
        </div>
      )}
    </div>
  );
};
