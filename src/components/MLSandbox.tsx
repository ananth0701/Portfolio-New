import React, { useState, useEffect } from 'react';
import { Activity, Brain, RefreshCw, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface PatientData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  dpf: number;
  age: number;
}

const SCALER_MEAN = [3.84505208, 120.89453125, 69.10546875, 20.53645833, 79.79947917, 31.99257812, 0.4718763, 33.24088542];
const SCALER_SCALE = [3.36738361, 31.95179591, 19.34320163, 15.94182863, 115.16894926, 7.87902573, 0.33111282, 11.75257265];
const SVM_WEIGHTS = [0.30692731, 1.00994568, -0.21146783, 0.00036572, -0.16754678, 0.61658273, 0.25516051, 0.07388959];
const SVM_BIAS = -0.73820656;

const PRESETS = [
  {
    name: 'Normal / Healthy Profile',
    data: { pregnancies: 1, glucose: 85, bloodPressure: 66, skinThickness: 23, insulin: 0, bmi: 23.3, dpf: 0.3, age: 24 },
    description: 'Typical low-risk values'
  },
  {
    name: 'User Test Profile (Diabetic)',
    data: { pregnancies: 5, glucose: 166, bloodPressure: 72, skinThickness: 19, insulin: 175, bmi: 25.8, dpf: 0.587, age: 51 },
    description: 'Diabetic profile from python code'
  },
  {
    name: 'High Risk Profile',
    data: { pregnancies: 8, glucose: 183, bloodPressure: 84, skinThickness: 40, insulin: 140, bmi: 38.2, dpf: 0.85, age: 48 },
    description: 'Multiple high indicators'
  }
];

interface MLSandboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const MLSandbox: React.FC<MLSandboxProps> = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState<PatientData>({
    pregnancies: 2,
    glucose: 110,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 80,
    bmi: 28.5,
    dpf: 0.45,
    age: 30
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [decisionVal, setDecisionVal] = useState<number>(0);
  const [riskPercent, setRiskPercent] = useState<number>(0);

  // Run scaler & SVM prediction logic
  const calculatePrediction = (currentInputs: PatientData) => {
    const inputVec = [
      currentInputs.pregnancies,
      currentInputs.glucose,
      currentInputs.bloodPressure,
      currentInputs.skinThickness,
      currentInputs.insulin,
      currentInputs.bmi,
      currentInputs.dpf,
      currentInputs.age
    ];

    // 1. Standardize (z = (x - mean) / scale)
    const stdVec = inputVec.map((val, idx) => (val - SCALER_MEAN[idx]) / SCALER_SCALE[idx]);

    // 2. Compute decision boundary: f(x) = sum(w * z) + b
    let score = SVM_BIAS;
    for (let i = 0; i < stdVec.length; i++) {
      score += stdVec[i] * SVM_WEIGHTS[i];
    }

    // 3. Classify: score >= 0 -> Diabetic (1), else Non-Diabetic (0)
    const pred = score >= 0 ? 1 : 0;

    // 4. Platt Scaling: map to probability using sigmoid: 1 / (1 + exp(-score))
    const prob = 1 / (1 + Math.exp(-score));

    setDecisionVal(score);
    setPrediction(pred);
    setRiskPercent(Math.round(prob * 100));
  };

  useEffect(() => {
    calculatePrediction(inputs);
  }, [inputs]);

  const handleSliderChange = (name: keyof PatientData, value: number) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadPreset = (presetData: PatientData) => {
    setInputs(presetData);
  };

  const resetToDefault = () => {
    setInputs({
      pregnancies: 2,
      glucose: 110,
      bloodPressure: 70,
      skinThickness: 20,
      insulin: 80,
      bmi: 28.5,
      dpf: 0.45,
      age: 30
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
      <section className="relative w-full max-w-6xl bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#1e1b4b] rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200 z-20"
        >
          <X size={24} />
        </button>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold mb-4 uppercase tracking-wider">
              <Brain size={12} className="mr-2 animate-pulse" /> Live Machine Learning Demo
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              SVM Diabetes Classifier Sandbox
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 mb-4"></div>
            <p className="text-sm text-gray-300 max-w-2xl mx-auto">
              Interact with the actual Support Vector Machine model. Drag the sliders to change inputs and witness real-time standardization and prediction outputs.
            </p>
          </div>

          {/* Preset profiles row */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-sm font-semibold text-gray-400 self-center mr-2">Load Preset Profiles:</span>
            {PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => loadPreset(preset.data)}
                className="px-4 py-2 text-xs font-medium rounded-full bg-slate-800 border border-slate-700 text-gray-300 hover:bg-slate-700 hover:border-blue-500 hover:text-white transition-all duration-300"
              >
                {preset.name}
              </button>
            ))}
            <button
              onClick={resetToDefault}
              className="p-2 text-xs font-medium rounded-full bg-slate-900 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300 flex items-center gap-1"
              title="Reset"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Sliders Container (7 columns) */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-white/10 hover:border-white/15 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity size={20} className="text-blue-500" /> Patient Biometric Parameters
              </h3>

              <div className="space-y-6">
                {/* Pregnancies */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">Pregnancies</span>
                    <span className="text-blue-400">{inputs.pregnancies}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="17"
                    step="1"
                    value={inputs.pregnancies}
                    onChange={(e) => handleSliderChange('pregnancies', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 0 - 17 pregnancies</span>
                </div>

                {/* Glucose */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">Plasma Glucose Concentration</span>
                    <span className="text-blue-400">{inputs.glucose} mg/dL</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="1"
                    value={inputs.glucose}
                    onChange={(e) => handleSliderChange('glucose', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 0 - 200 mg/dL (Normal Fasting: &lt; 100 mg/dL)</span>
                </div>

                {/* Blood Pressure */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">Diastolic Blood Pressure</span>
                    <span className="text-blue-400">{inputs.bloodPressure} mmHg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="130"
                    step="1"
                    value={inputs.bloodPressure}
                    onChange={(e) => handleSliderChange('bloodPressure', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 0 - 130 mmHg</span>
                </div>

                {/* Skin Thickness */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">Triceps Skin Fold Thickness</span>
                    <span className="text-blue-400">{inputs.skinThickness} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="99"
                    step="1"
                    value={inputs.skinThickness}
                    onChange={(e) => handleSliderChange('skinThickness', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 0 - 99 mm</span>
                </div>

                {/* Insulin */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">2-Hour Serum Insulin</span>
                    <span className="text-blue-400">{inputs.insulin} μU/mL</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="846"
                    step="5"
                    value={inputs.insulin}
                    onChange={(e) => handleSliderChange('insulin', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 0 - 846 μU/mL</span>
                </div>

                {/* BMI */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">Body Mass Index (BMI)</span>
                    <span className="text-blue-400">{inputs.bmi} kg/m²</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="67.5"
                    step="0.1"
                    value={inputs.bmi}
                    onChange={(e) => handleSliderChange('bmi', parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 0 - 67.5 (Overweight: &gt; 25, Obese: &gt; 30)</span>
                </div>

                {/* DPF */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">Diabetes Pedigree Function</span>
                    <span className="text-blue-400">{inputs.dpf.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.08"
                    max="2.42"
                    step="0.001"
                    value={inputs.dpf}
                    onChange={(e) => handleSliderChange('dpf', parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 0.08 - 2.42 (Calculates genetic risk score)</span>
                </div>

                {/* Age */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-300">Age</span>
                    <span className="text-blue-400">{inputs.age} years old</span>
                  </div>
                  <input
                    type="range"
                    min="21"
                    max="81"
                    step="1"
                    value={inputs.age}
                    onChange={(e) => handleSliderChange('age', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Range: 21 - 81 years</span>
                </div>
              </div>
            </div>

            {/* Model Output & Verification Gauge (5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Visual Gauge Panel */}
              <div className={`glass-panel rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-between text-center transition-all duration-500 flex-1 ${prediction === 1 ? 'card-glow-rose' : 'card-glow-emerald'}`}>
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Prediction Engine Output</span>
                
                <div className="relative my-8 flex items-center justify-center">
                  {/* SVG Radial Gauge */}
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={prediction === 1 ? '#f43f5e' : '#10b981'}
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * riskPercent) / 100}
                      style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                    />
                  </svg>
                  
                  {/* Text inside the circle */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-white tracking-tight">{riskPercent}%</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">Risk Score</span>
                  </div>
                </div>

                {/* Status Banner */}
                <div className="w-full">
                  {prediction === 1 ? (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center gap-3 text-rose-400">
                      <AlertTriangle size={24} className="animate-bounce" />
                      <div className="text-left">
                        <p className="text-sm font-bold uppercase">Classification: Diabetic</p>
                        <p className="text-xs text-rose-400/80">Support Vector machine output: Outcome 1</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-3 text-emerald-400">
                      <CheckCircle size={24} />
                      <div className="text-left">
                        <p className="text-sm font-bold uppercase">Classification: Non-Diabetic</p>
                        <p className="text-xs text-emerald-400/80">Support Vector machine output: Outcome 0</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Behind the Scenes / Mathematical details */}
              <div className="glass-panel rounded-3xl p-6 border border-white/10 text-left text-xs text-gray-400 space-y-4">
                <h4 className="text-white font-semibold flex items-center gap-1.5 text-sm">
                  <Info size={16} className="text-blue-500" /> Model Mathematics
                </h4>
                <p>
                  Inputs are standardized using your Python model's <b>StandardScaler</b> means and scales, then multiplied by the <b>SVM Linear Coefficients</b>:
                </p>
                <div className="p-3 bg-[#080d1a] border border-gray-800 rounded-xl space-y-1 text-[11px] font-mono leading-relaxed">
                  <div>Standardized Value (z) = (Input - Mean) / Scale</div>
                  <div>Decision boundary score f(x) = sum(w * z) + b</div>
                  <div className="text-blue-400 font-semibold mt-1">
                    Your Output: f(x) = {decisionVal.toFixed(4)}
                  </div>
                </div>
                <p className="text-[11px]">
                  Since output <b>f(x) {decisionVal >= 0 ? '>= 0' : '< 0'}</b>, the classifier yields <b>{'Outcome ' + prediction}</b> ({prediction === 1 ? 'Diabetic' : 'Non-Diabetic'}).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MLSandbox;
