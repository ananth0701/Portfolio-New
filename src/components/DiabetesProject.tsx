import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Github, Brain, Database, 
  TrendingUp, Activity, Award, Info, RefreshCw, CheckCircle, 
  AlertTriangle, Code2, LineChart, BookOpen 
} from 'lucide-react';

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

const DiabetesProject: React.FC = () => {
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
  const [activeTab, setActiveTab] = useState<'python' | 'javascript' | 'dataset'>('python');
  const [gender, setGender] = useState<'female' | 'male'>('female');

  // Run scaler & SVM prediction logic
  const calculatePrediction = (currentInputs: PatientData, currentGender: 'female' | 'male') => {
    const inputVec = [
      currentGender === 'male' ? 0 : currentInputs.pregnancies,
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
    calculatePrediction(inputs, gender);
  }, [inputs, gender]);

  const handleSliderChange = (name: keyof PatientData, value: number) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadPreset = (presetData: PatientData) => {
    setInputs(presetData);
    setGender('female');
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
    setGender('female');
  };

  const handleBackToHome = () => {
    window.location.hash = '#projects';
  };

  const scrollToSandbox = () => {
    document.getElementById('sandbox-lab')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div 
      className="pt-24 pb-20 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 min-h-screen text-gray-100 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 40%),
          radial-gradient(circle at 70% 60%, rgba(244, 63, 94, 0.03) 0%, transparent 40%),
          radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 24px 24px',
      }}
    >
      {/* Dynamic ambient background blobs */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-rose-500/5 rounded-full blur-[130px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Navigation Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 group"
          >
            <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" /> Back to Portfolio
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl bg-slate-900/20 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600/5 via-pink-900/5 to-indigo-950/10 z-0"></div>
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <span className="px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-6 inline-block animate-pulse">
              Healthcare Machine Learning Case Study
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Diabetes Risk Prediction Using Support Vector Machines
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8">
              A comprehensive analytical model built using the PIMA Indians Diabetes Dataset. Leveraging 
              StandardScaler preprocessing and linear SVM classification to evaluate genetic risk, physiological data, 
              and predict diabetic outcomes in real-time.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToSandbox}
                className="inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <Activity size={18} className="mr-2 animate-pulse" /> Launch Sandbox Lab
              </button>
              <a 
                href="https://github.com/ananth0701/Diabetes-Prediction-Using-Machine-Learning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3.5 bg-slate-900 border border-slate-700 text-gray-300 rounded-xl font-semibold hover:bg-slate-800 hover:border-blue-500/50 hover:text-white transition-all duration-300"
              >
                <Github size={18} className="mr-2" /> View GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { metric: '77.27% Accuracy', label: 'Out-of-sample Test Acc', icon: Award, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5' },
            { metric: '78.66% Accuracy', label: 'Model Training Score', icon: TrendingUp, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5' },
            { metric: 'Linear SVM', label: 'Hyperplane Kernel', icon: Brain, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5' },
            { metric: '768 Records', label: 'PIMA Indians Dataset', icon: Database, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5' },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="glass-panel border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 cursor-default group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-all duration-300 group-hover:scale-110 ${item.color}`}>
                <item.icon size={20} />
              </div>
              <div className="text-xl md:text-2xl font-extrabold text-white mb-1">{item.metric}</div>
              <div className="text-xs text-gray-400 font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Section 1: Preprocessing & Visual Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* EDA Content */}
          <div className="flex flex-col justify-between glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/10 group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h2 className="text-2xl font-bold text-white">Exploratory Data Analysis</h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                The Pima Indian Diabetes dataset contains 8 physiological parameters. During the Exploratory Data Analysis (EDA) phase, we discovered a key challenge: clinical values like <b>Blood Pressure</b>, <b>Insulin</b>, <b>Glucose</b>, and <b>BMI</b> contained zero values, which are physiologically impossible.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                To solve this, we performed <b>Imputation Preprocessing</b>:
              </p>
              <ul className="space-y-2.5 text-xs text-gray-400 mb-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><b>Zero Values</b>: Imputed with their respective feature medians conditional on the patient's class outcome.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><b>Feature Scaling</b>: Integrated a <b>StandardScaler</b> fit calculation because SVM relies on calculating support vector distances and is sensitive to unscaled parameters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><b>Correlation</b>: Identified Plasma Glucose, BMI, and Age as the three strongest predictors of diabetic outcome.</span>
                </li>
              </ul>
            </div>

            {/* Custom SVG Distribution Chart */}
            <div className="bg-[#080d1a]/85 border border-gray-800/80 rounded-2xl p-6 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Glucose Density Distribution</span>
                <span className="text-[10px] text-gray-500 font-normal">Normal vs Diabetic Outcome</span>
              </h4>
              <div className="w-full h-44 relative">
                <svg className="w-full h-full" viewBox="0 0 300 150">
                  <line x1="30" y1="120" x2="280" y2="120" stroke="#1e293b" strokeWidth="1" />
                  <line x1="30" y1="30" x2="280" y2="30" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="30" y1="75" x2="280" y2="75" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                  
                  <line x1="90" y1="120" x2="90" y2="125" stroke="#475569" strokeWidth="1" />
                  <line x1="150" y1="120" x2="150" y2="125" stroke="#475569" strokeWidth="1" />
                  <line x1="210" y1="120" x2="210" y2="125" stroke="#475569" strokeWidth="1" />
                  
                  <text x="30" y="135" fill="#475569" fontSize="8" textAnchor="middle">0</text>
                  <text x="90" y="135" fill="#475569" fontSize="8" textAnchor="middle">80 mg/dL</text>
                  <text x="150" y="135" fill="#475569" fontSize="8" textAnchor="middle">120 mg/dL</text>
                  <text x="210" y="135" fill="#475569" fontSize="8" textAnchor="middle">160 mg/dL</text>
                  <text x="270" y="135" fill="#475569" fontSize="8" textAnchor="middle">200</text>

                  <path 
                    d="M 30,120 C 60,118 80,40 120,40 C 160,40 180,120 280,120" 
                    fill="rgba(59, 130, 246, 0.12)" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                  />
                  
                  <path 
                    d="M 30,120 C 100,120 130,70 170,70 C 210,70 230,118 280,120" 
                    fill="rgba(244, 63, 94, 0.12)" 
                    stroke="#f43f5e" 
                    strokeWidth="2" 
                  />

                  <text x="105" y="32" fill="#60a5fa" fontSize="8" fontWeight="bold">Non-Diabetic (Peak ~110)</text>
                  <text x="190" y="62" fill="#fb7185" fontSize="8" fontWeight="bold">Diabetic (Peak ~145)</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Correlation Matrix & Heatmap */}
          <div className="flex flex-col justify-between glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/10 group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h2 className="text-2xl font-bold text-white">Feature Correlation Matrix</h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                The heatmap below visualizes the correlation strength (Pearson coefficient) between primary predictors and outcomes. Note how <b>Glucose</b> holds the strongest correlation coefficient with the target <b>Outcome</b> variable, followed closely by <b>BMI</b> and <b>Age</b>.
              </p>
            </div>

            {/* Bespoke SVG Correlation Matrix Grid */}
            <div className="bg-[#080d1a]/85 border border-gray-800/80 rounded-2xl p-6 flex flex-col items-center hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300">
              <svg className="w-full max-w-[320px] aspect-square" viewBox="0 0 160 160">
                <text x="54" y="12" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">Glucose</text>
                <text x="84" y="12" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">BMI</text>
                <text x="114" y="12" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">Age</text>
                <text x="144" y="12" fill="#475569" fontSize="6" fontWeight="bold" textAnchor="middle">Outcome</text>

                <text x="8" y="34" fill="#475569" fontSize="6" fontWeight="bold" dominantBaseline="middle">Glucose</text>
                <text x="8" y="64" fill="#475569" fontSize="6" fontWeight="bold" dominantBaseline="middle">BMI</text>
                <text x="8" y="94" fill="#475569" fontSize="6" fontWeight="bold" dominantBaseline="middle">Age</text>
                <text x="8" y="124" fill="#475569" fontSize="6" fontWeight="bold" dominantBaseline="middle">Outcome</text>

                {/* Row 1 (Glucose) */}
                <rect x="40" y="20" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 1)" />
                <text x="54" y="34" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">1.00</text>

                <rect x="70" y="20" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.4)" />
                <text x="84" y="34" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.22</text>

                <rect x="100" y="20" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.5)" />
                <text x="114" y="34" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.26</text>

                <rect x="130" y="20" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.8)" />
                <text x="144" y="34" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">0.47</text>

                {/* Row 2 (BMI) */}
                <rect x="40" y="50" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.4)" />
                <text x="54" y="64" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.22</text>

                <rect x="70" y="50" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 1)" />
                <text x="84" y="64" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">1.00</text>

                <rect x="100" y="50" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.2)" />
                <text x="114" y="64" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.04</text>

                <rect x="130" y="50" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.65)" />
                <text x="144" y="64" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">0.29</text>

                {/* Row 3 (Age) */}
                <rect x="40" y="80" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.5)" />
                <text x="54" y="94" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.26</text>

                <rect x="70" y="80" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.2)" />
                <text x="84" y="94" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.04</text>

                <rect x="100" y="80" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 1)" />
                <text x="114" y="94" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">1.00</text>

                <rect x="130" y="80" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.55)" />
                <text x="144" y="94" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.24</text>

                {/* Row 4 (Outcome) */}
                <rect x="40" y="110" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.8)" />
                <text x="54" y="124" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">0.47</text>

                <rect x="70" y="110" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.65)" />
                <text x="84" y="124" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">0.29</text>

                <rect x="100" y="110" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 0.55)" />
                <text x="114" y="124" fill="#ffffff" fontSize="6" textAnchor="middle" dominantBaseline="middle">0.24</text>

                <rect x="130" y="110" width="28" height="28" rx="4" fill="rgba(59, 130, 246, 1)" />
                <text x="144" y="124" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">1.00</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Section 2: Mathematical Foundation */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-12 hover:border-emerald-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/5 group">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" size={24} />
            <h2 className="text-2xl font-bold text-white">Support Vector Machine (SVM) Mathematics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-sm text-gray-300">
              <p>
                A linear SVM boundary works by projecting variables into high-dimensional space and seeking the optimal hyperplane that separates classes (Diabetic vs Non-Diabetic) with the largest possible margin.
              </p>
              <p>
                Because parameters range across different magnitudes (e.g. 2-Hour Insulin ranges up to 846, while DPF is a decimal scale less than 2.5), we normalize inputs into Z-scores prior to classification to prevent variable domination:
              </p>
              
              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-center font-mono relative overflow-hidden group/math hover:border-blue-500/30 transition-colors">
                <span className="text-blue-400 font-bold text-lg">z = (x - μ) / σ</span>
                <p className="text-[10px] text-gray-500 mt-1.5">x: raw input, μ: scaler mean, σ: scaler standard deviation</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <p>
                After calculating the scaled Z-vector, the model outputs the hyperplane decision value by taking the dot product of the input features and SVM coefficients, offset by the classifier's intercept (bias):
              </p>
              
              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-center font-mono relative overflow-hidden group/math hover:border-purple-500/30 transition-colors">
                <span className="text-purple-400 font-bold text-lg">f(x) = Σ (w<sub>i</sub> · z<sub>i</sub>) + b</span>
                <p className="text-[10px] text-gray-500 mt-1.5">w<sub>i</sub>: SVM weight vector, b: model intercept bias (-0.7382)</p>
              </div>

              <p>
                A positive score <code className="text-rose-400 font-bold">f(x) &ge; 0</code> assigns class **Diabetic (1)**, while a negative score assigns class **Non-Diabetic (0)**.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2.5: Model In-Depth Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* Feature Coefficients Panel */}
          <div className="flex flex-col justify-between glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/10 group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h2 className="text-2xl font-bold text-white">SVM Hyperplane Coefficients</h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6 text-justify">
                In a Linear SVM, the decision boundary is a hyperplane. The coefficients (weights) assigned to each standardized feature represent its relative impact on the risk score. Positive coefficients shift predictions toward <b>Diabetic</b>, while negative coefficients orient the hyperplane boundary away from it.
              </p>

              {/* Feature Weights Chart */}
              <div className="space-y-4 bg-[#080d1a]/85 border border-gray-800/80 rounded-2xl p-6">
                {[
                  { name: 'Plasma Glucose Concentration', weight: 1.0099, color: 'from-blue-500 to-indigo-500' },
                  { name: 'Body Mass Index (BMI)', weight: 0.6166, color: 'from-blue-500 to-indigo-500' },
                  { name: 'Pregnancies Count', weight: 0.3069, color: 'from-blue-500 to-indigo-500' },
                  { name: 'Diabetes Pedigree Function (DPF)', weight: 0.2552, color: 'from-blue-500 to-indigo-500' },
                  { name: 'Age of Patient', weight: 0.0739, color: 'from-blue-500 to-indigo-500' },
                  { name: 'Triceps Skin Fold Thickness', weight: 0.0004, color: 'from-slate-500 to-slate-400' },
                  { name: '2-Hour Serum Insulin', weight: -0.1675, color: 'from-rose-500 to-pink-500' },
                  { name: 'Diastolic Blood Pressure', weight: -0.2115, color: 'from-rose-500 to-pink-500' }
                ].map((feature, fIdx) => {
                  const widthPercent = Math.min(100, Math.round((Math.abs(feature.weight) / 1.0099) * 100));
                  const isPositive = feature.weight >= 0;
                  return (
                    <div key={fIdx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-300 font-medium">{feature.name}</span>
                        <span className={`font-mono font-bold ${isPositive ? 'text-blue-400' : 'text-rose-400'}`}>
                          {isPositive ? '+' : ''}{feature.weight.toFixed(4)}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-900/60 border border-white/5 rounded-full overflow-hidden flex">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${feature.color}`} 
                          style={{ width: `${widthPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clinical Model Evaluation Panel */}
          <div className="flex flex-col justify-between glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/10 group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h2 className="text-2xl font-bold text-white">Clinical Model Evaluation</h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6 text-justify">
                To evaluate the model's diagnostic utility in clinical settings, we measured its performance on an out-of-sample holdout test set of 154 patients. Below is the breakdown of the classification matrix and standard diagnostic metrics.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Confusion Matrix Visual Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confusion Matrix (N=154)</h4>
                  <div className="grid grid-cols-2 gap-2 font-mono text-center">
                    <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl">
                      <div className="text-lg font-bold text-emerald-400">89</div>
                      <div className="text-[9px] text-emerald-500">True Negative (TN)</div>
                      <div className="text-[8px] text-gray-500 font-sans mt-1">Healthy correctly identified</div>
                    </div>
                    <div className="bg-rose-950/20 border border-rose-500/10 p-3 rounded-xl">
                      <div className="text-lg font-bold text-rose-400/80">11</div>
                      <div className="text-[9px] text-rose-500/80">False Positive (FP)</div>
                      <div className="text-[8px] text-gray-500 font-sans mt-1">Healthy flagged at risk</div>
                    </div>
                    <div className="bg-rose-950/30 border border-rose-500/20 p-3 rounded-xl">
                      <div className="text-lg font-bold text-rose-400">24</div>
                      <div className="text-[9px] text-rose-500">False Negative (FN)</div>
                      <div className="text-[8px] text-gray-500 font-sans mt-1">Diabetic missed</div>
                    </div>
                    <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl">
                      <div className="text-lg font-bold text-emerald-400">30</div>
                      <div className="text-[9px] text-emerald-500">True Positive (TP)</div>
                      <div className="text-[8px] text-gray-500 font-sans mt-1">Diabetic correctly flagged</div>
                    </div>
                  </div>
                </div>

                {/* Classification Report Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Classification Report</h4>
                  <div className="bg-slate-950/50 border border-gray-800/80 rounded-xl p-4 space-y-2.5 text-xs">
                    <div className="flex justify-between border-b border-gray-800 pb-1.5 font-semibold text-gray-400">
                      <span>Metric</span>
                      <span className="w-12 text-right">Healthy</span>
                      <span className="w-12 text-right text-blue-400">Diabetic</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span className="font-semibold text-gray-400">Precision</span>
                      <span className="w-12 text-right font-mono">78.8%</span>
                      <span className="w-12 text-right font-mono text-blue-400 font-bold">73.2%</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span className="font-semibold text-gray-400">Recall</span>
                      <span className="w-12 text-right font-mono">89.0%</span>
                      <span className="w-12 text-right font-mono text-blue-400 font-bold">55.6%</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span className="font-semibold text-gray-400">F1-Score</span>
                      <span className="w-12 text-right font-mono">83.6%</span>
                      <span className="w-12 text-right font-mono text-blue-400 font-bold">63.2%</span>
                    </div>
                    <div className="flex justify-between text-gray-300 border-t border-gray-800 pt-1.5 font-bold">
                      <span className="text-gray-400">Test Accuracy</span>
                      <span className="font-mono text-emerald-400 text-xs">77.27%</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 mt-4 leading-relaxed text-justify">
                <b>Clinical Performance Summary</b>: The model prioritizes a balanced classification, showing high precision for diabetic positive cases (73.2%), indicating that positive risk alerts are highly reliable. However, the recall of 55.6% for diabetic patients suggests that some diabetic cases are harder to distinguish using clinical SVM boundaries alone, requiring secondary diagnostic support.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Interactive Sandbox Lab */}
        <div 
          id="sandbox-lab" 
          className={`scroll-mt-24 glass-panel rounded-3xl p-8 border mb-12 relative overflow-hidden transition-all duration-500 ${
            prediction === 1 
              ? 'border-rose-500/20 shadow-2xl shadow-rose-950/20' 
              : 'border-emerald-500/20 shadow-2xl shadow-emerald-950/20'
          }`}
        >
          {/* Dynamic background glow */}
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${
            prediction === 1 ? 'bg-rose-500/5' : 'bg-emerald-500/5'
          }`}></div>
          
          <div className="text-center mb-10">
            <div className={`inline-flex items-center px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-4 uppercase tracking-wider transition-colors duration-300 ${
              prediction === 1 
                ? 'bg-rose-500/10 border-rose-500/25 text-rose-400' 
                : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
            }`}>
              <Brain size={12} className="mr-2 animate-pulse" /> Model Sandbox
            </div>
            <h2 className="text-3xl font-extrabold text-white">Interactive Model Laboratory</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-3 mb-3"></div>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Simulate patient values in real-time. Drag sliders to witness automatic Z-score calculations and classification.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-sm font-semibold text-gray-400 self-center mr-1">Presets:</span>
            {PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => loadPreset(preset.data)}
                className="px-4 py-2.5 text-xs font-medium rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:bg-slate-800 hover:border-blue-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-black/25"
              >
                {preset.name}
              </button>
            ))}
            <button
              onClick={resetToDefault}
              className="p-2.5 text-xs font-medium rounded-xl bg-slate-900 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-all duration-300 flex items-center gap-1 hover:-translate-y-0.5 hover:shadow-lg"
              title="Reset"
            >
              <RefreshCw size={12} className="animate-spin-hover" />
            </button>
          </div>

          {/* Sandbox Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Sliders (7 columns) */}
            <div className="lg:col-span-7 bg-[#0b0f19]/60 border border-white/5 rounded-2xl p-6 relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                <Activity size={18} className="text-blue-500" /> Physiological Biomarkers
              </h3>

              <div className="space-y-5">
                {/* Gender Selection */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <span className="text-sm font-semibold text-gray-300 block mb-2.5">Biological Sex</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 px-4 rounded-xl font-semibold border text-center transition-all duration-200 flex items-center justify-center gap-2 text-xs focus:outline-none ${
                        gender === 'female'
                          ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-md shadow-blue-500/5'
                          : 'bg-slate-900/60 border-slate-800 text-gray-400 hover:border-slate-700 hover:text-gray-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
                      Female
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2.5 px-4 rounded-xl font-semibold border text-center transition-all duration-200 flex items-center justify-center gap-2 text-xs focus:outline-none ${
                        gender === 'male'
                          ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-md shadow-blue-500/5'
                          : 'bg-slate-900/60 border-slate-800 text-gray-400 hover:border-slate-700 hover:text-gray-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                      Male
                    </button>
                  </div>
                </div>

                {/* Pregnancies (Only shown for female) */}
                {gender === 'female' ? (
                  <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300 font-medium text-sm">Pregnancies</span>
                      <div className="flex items-center gap-2">
                        {inputs.pregnancies > 6 && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                            High Gestation
                          </span>
                        )}
                        <span className={`font-bold text-sm ${inputs.pregnancies > 6 ? 'text-amber-400' : 'text-blue-400'}`}>
                          {inputs.pregnancies}
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                      <span>Gestational history count</span>
                      <span>Normal: 0–4 (Non-pregnant: 0)</span>
                    </div>
                    <input
                      type="range" min="0" max="17" step="1"
                      value={inputs.pregnancies}
                      onChange={(e) => handleSliderChange('pregnancies', parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-slate-950/20 border border-slate-800/50 rounded-xl text-xs text-gray-500 flex items-center gap-2.5">
                    <Info size={16} className="text-slate-650 flex-shrink-0" />
                    <span>Pregnancies parameter is hidden and set to 0 for male profiles.</span>
                  </div>
                )}

                {/* Glucose */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium text-sm">Plasma Glucose Concentration</span>
                    <div className="flex items-center gap-2">
                      {inputs.glucose >= 140 && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse ${
                          inputs.glucose >= 200 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {inputs.glucose >= 200 ? 'Diabetic Level' : 'Impaired'}
                        </span>
                      )}
                      <span className={`font-bold text-sm ${
                        inputs.glucose >= 200 ? 'text-rose-400' : inputs.glucose >= 140 ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {inputs.glucose} mg/dL
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                    <span>2-Hour Oral Glucose Tolerance Test (OGTT)</span>
                    <span>Normal: &lt;140 mg/dL • Diabetes: &ge;200 mg/dL</span>
                  </div>
                  <input
                    type="range" min="0" max="200" step="1"
                    value={inputs.glucose}
                    onChange={(e) => handleSliderChange('glucose', parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Blood Pressure */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium text-sm">Diastolic Blood Pressure</span>
                    <div className="flex items-center gap-2">
                      {inputs.bloodPressure >= 90 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse">
                          Hypertension
                        </span>
                      )}
                      {inputs.bloodPressure > 0 && inputs.bloodPressure < 60 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Low BP
                        </span>
                      )}
                      <span className={`font-bold text-sm ${
                        inputs.bloodPressure >= 90 ? 'text-rose-400' : (inputs.bloodPressure > 0 && inputs.bloodPressure < 60) ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {inputs.bloodPressure} mmHg
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                    <span>Resting blood pressure in arteries</span>
                    <span>Normal: 60–80 mmHg • Hypertension: &ge;90 mmHg</span>
                  </div>
                  <input
                    type="range" min="0" max="130" step="1"
                    value={inputs.bloodPressure}
                    onChange={(e) => handleSliderChange('bloodPressure', parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Skin Thickness */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium text-sm">Triceps Skin Fold Thickness</span>
                    <span className="text-blue-400 font-bold text-sm">{inputs.skinThickness} mm</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                    <span>Subcutaneous fat layer thickness</span>
                    <span>Normal ({gender === 'female' ? 'Female' : 'Male'}): {gender === 'female' ? '15 – 30 mm (Avg: ~23.6)' : '10 – 20 mm (Avg: ~14.3)'}</span>
                  </div>
                  <input
                    type="range" min="0" max="99" step="1"
                    value={inputs.skinThickness}
                    onChange={(e) => handleSliderChange('skinThickness', parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Insulin */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium text-sm">2-Hour Serum Insulin</span>
                    <div className="flex items-center gap-2">
                      {inputs.insulin > 166 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Elevated
                        </span>
                      )}
                      <span className={`font-bold text-sm ${inputs.insulin > 166 ? 'text-amber-400' : 'text-blue-400'}`}>
                        {inputs.insulin} μU/mL
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                    <span>2-Hour post-glucose insulin level</span>
                    <span>Typical Range: 16 – 166 μU/mL</span>
                  </div>
                  <input
                    type="range" min="0" max="846" step="5"
                    value={inputs.insulin}
                    onChange={(e) => handleSliderChange('insulin', parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* BMI */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium text-sm">Body Mass Index (BMI)</span>
                    <div className="flex items-center gap-2">
                      {inputs.bmi >= 30 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse">
                          Obese Range
                        </span>
                      )}
                      {inputs.bmi >= 25 && inputs.bmi < 30 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Overweight
                        </span>
                      )}
                      <span className={`font-bold text-sm ${
                        inputs.bmi >= 30 ? 'text-rose-400' : inputs.bmi >= 25 ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {inputs.bmi} kg/m²
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                    <span>Weight-to-height ratio metric</span>
                    <span>Normal: 18.5 – 24.9 • Obese: &ge;30.0</span>
                  </div>
                  <input
                    type="range" min="0" max="67.5" step="0.1"
                    value={inputs.bmi}
                    onChange={(e) => handleSliderChange('bmi', parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* DPF */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium text-sm">Diabetes Pedigree Function (Genetic Risk)</span>
                    <div className="flex items-center gap-2">
                      {inputs.dpf >= 0.8 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse">
                          High Pedigree
                        </span>
                      )}
                      <span className={`font-bold text-sm ${inputs.dpf >= 0.8 ? 'text-rose-400' : 'text-blue-400'}`}>
                        {inputs.dpf.toFixed(3)}
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                    <span>Family history genetic risk score</span>
                    <span>Typical: 0.08 – 2.42 (Lower = lower risk)</span>
                  </div>
                  <input
                    type="range" min="0.08" max="2.42" step="0.001"
                    value={inputs.dpf}
                    onChange={(e) => handleSliderChange('dpf', parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Age */}
                <div className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 font-medium text-sm">Age</span>
                    <span className="text-blue-400 font-bold text-sm">{inputs.age} years</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-2 flex justify-between">
                    <span>Patient age in years</span>
                    <span>Study Cohort Focus: &ge;21 years</span>
                  </div>
                  <input
                    type="range" min="21" max="81" step="1"
                    value={inputs.age}
                    onChange={(e) => handleSliderChange('age', parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Predictions & Dial (5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Dial Gauge */}
              <div className={`bg-[#0b0f19]/60 border rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-500 flex-1 ${
                prediction === 1 
                  ? 'shadow-2xl shadow-rose-950/20 border-rose-500/20' 
                  : 'shadow-2xl shadow-emerald-950/20 border-emerald-500/20'
              }`}>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Standardized Prediction Dial</span>
                
                <div className="relative my-6 flex items-center justify-center">
                  {/* SVG Radial Gauge */}
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        {prediction === 1 ? (
                          <>
                            <stop offset="0%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#be123c" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#059669" />
                          </>
                        )}
                      </linearGradient>
                      <filter id="dialGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="7"
                    />

                    {/* Active Progress Path */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="7"
                      strokeDasharray="238.76"
                      strokeDashoffset={238.76 - (238.76 * riskPercent) / 100}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      filter="url(#dialGlow)"
                    />

                    {/* Glowing Pointer Dot */}
                    <g
                      style={{
                        transform: `rotate(${(riskPercent / 100) * 360}deg)`,
                        transformOrigin: '50px 50px',
                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <circle
                        cx="88"
                        cy="50"
                        r="4"
                        className={prediction === 1 ? 'fill-rose-300' : 'fill-emerald-300'}
                      />
                      <circle
                        cx="88"
                        cy="50"
                        r="8"
                        className={`animate-ping opacity-30 ${prediction === 1 ? 'fill-rose-500' : 'fill-emerald-500'}`}
                        style={{ transformOrigin: '88px 50px' }}
                      />
                    </g>
                  </svg>
                  
                  {/* Inside dial text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-white tracking-tight">{riskPercent}%</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Calculated Risk</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="w-full">
                  {prediction === 1 ? (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center gap-3 text-rose-400 shadow-lg shadow-rose-950/20">
                      <AlertTriangle size={20} className="flex-shrink-0 animate-pulse text-rose-400" />
                      <div className="text-left text-xs">
                        <p className="font-bold uppercase tracking-wider text-rose-300">Classification: Diabetic</p>
                        <p className="text-rose-400/80 mt-0.5 font-mono">Hyperplane f(x): {decisionVal.toFixed(4)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-3 text-emerald-400 shadow-lg shadow-emerald-950/20">
                      <CheckCircle size={20} className="flex-shrink-0 text-emerald-400" />
                      <div className="text-left text-xs">
                        <p className="font-bold uppercase tracking-wider text-emerald-300">Classification: Non-Diabetic</p>
                        <p className="text-emerald-400/80 mt-0.5 font-mono">Hyperplane f(x): {decisionVal.toFixed(4)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vector Debugger */}
              <div className="bg-[#0b0f19]/60 border border-white/5 rounded-2xl p-5 text-left text-[11px] text-gray-400 space-y-3.5">
                <h4 className="text-white font-semibold flex items-center gap-1.5 text-xs">
                  <Info size={14} className="text-blue-400" /> Vector Math Debugger
                </h4>
                
                <div className="p-4 bg-slate-950/90 border border-slate-900 rounded-xl space-y-2 font-mono">
                  <div className="text-gray-500"># 1. StandardScaler Normalize:</div>
                  <div className="break-all leading-relaxed">
                    z = [
                    {gender === 'male' ? 0 : inputs.pregnancies}, {inputs.glucose}, {inputs.bloodPressure}, {inputs.skinThickness}, {inputs.insulin}, {inputs.bmi}, {inputs.dpf.toFixed(3)}, {inputs.age}
                    ]<br />
                    - Mean Vector μ / Scale σ
                  </div>
                  <div className="text-gray-500 mt-2"># 2. Linear SVM Hyperplane:</div>
                  <div className="text-blue-400 font-bold text-xs bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10">
                    f(x) = Σ(w · z) + b = {decisionVal.toFixed(4)}
                  </div>
                </div>
                
                <p className="leading-relaxed">
                  As shown in the python code: a calculated score <code className="text-gray-300 font-bold">f(x) {decisionVal >= 0 ? '>= 0' : '< 0'}</code> classifies patient as <code className={prediction === 1 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{prediction === 1 ? 'Diabetic' : 'Non-Diabetic'}</code>.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Section 4: Implementation Code Pipeline */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Source Code & Integration Pipeline</h2>
          </div>

          {/* Code Tab Navigation */}
          <div className="flex border-b border-gray-800 mb-6 gap-2">
            {([
              { id: 'python', label: 'Python (Model Training)' },
              { id: 'javascript', label: 'JavaScript (Client Evaluation)' },
              { id: 'dataset', label: 'PIMA Dataset Schema' },
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-semibold border-b-2 px-3 transition-colors duration-200 ${
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* macOS Styled IDE Terminal Frame wrapper */}
          <div className="bg-[#050811] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header window bar */}
            <div className="bg-[#0b0f19] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block hover:opacity-100 transition-opacity"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:opacity-100 transition-opacity"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:opacity-100 transition-opacity"></span>
              </div>
              <div className="text-xs font-semibold text-gray-500 font-mono flex items-center gap-1.5 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-white/5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {activeTab === 'python' ? 'diabetes_svm_model.py' : activeTab === 'javascript' ? 'svm_predict.js' : 'pima_dataset_schema.csv'}
              </div>
              <div className="w-12"></div>
            </div>

            {/* Code Content Editor Area */}
            <div className="p-6 font-mono text-xs text-gray-350 leading-relaxed overflow-x-auto bg-[#030712] max-h-[500px]">
              {activeTab === 'python' && (
                <pre className="text-[12px] font-mono leading-6 text-gray-350">
                  <code>
                    <span className="text-gray-500"># ----------------------------------------------------</span>{"\n"}
                    <span className="text-gray-500"># SVM DIABETES PREDICTION TRAINING MODEL</span>{"\n"}
                    <span className="text-gray-500"># ----------------------------------------------------</span>{"\n"}
                    <span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np{"\n"}
                    <span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd{"\n"}
                    <span className="text-purple-400">from</span> sklearn.preprocessing <span className="text-purple-400">import</span> StandardScaler{"\n"}
                    <span className="text-purple-400">from</span> sklearn.model_selection <span className="text-purple-400">import</span> train_test_split{"\n"}
                    <span className="text-purple-400">from</span> sklearn <span className="text-purple-400">import</span> svm{"\n"}
                    <span className="text-purple-400">from</span> sklearn.metrics <span className="text-purple-400">import</span> accuracy_score{"\n"}
                    {"\n"}
                    <span className="text-gray-500"># Load data and fit parameters</span>{"\n"}
                    diabetes_dataset = pd.<span className="text-blue-400">read_csv</span>(<span className="text-emerald-400">'diabetes.csv'</span>){"\n"}
                    X = diabetes_dataset.<span className="text-blue-400">drop</span>(columns=<span className="text-emerald-400">'Outcome'</span>, axis=<span className="text-amber-400">1</span>){"\n"}
                    Y = diabetes_dataset[<span className="text-emerald-400">'Outcome'</span>]{"\n"}
                    {"\n"}
                    <span className="text-gray-500"># Fit the Standard Scaler</span>{"\n"}
                    scaler = <span className="text-blue-400">StandardScaler</span>(){"\n"}
                    scaler.<span className="text-blue-400">fit</span>(X){"\n"}
                    standardized_data = scaler.<span className="text-blue-400">transform</span>(X){"\n"}
                    {"\n"}
                    <span className="text-gray-500"># Define features and outcome labels</span>{"\n"}
                    X = standardized_data{"\n"}
                    Y = diabetes_dataset[<span className="text-emerald-400">'Outcome'</span>]{"\n"}
                    {"\n"}
                    <span className="text-gray-500"># Train-Test Split (80% Training, 20% Testing)</span>{"\n"}
                    X_train, X_test, Y_train, Y_test = <span className="text-blue-400">train_test_split</span>(X, Y, test_size=<span className="text-amber-400">0.2</span>, stratify=Y, random_state=<span className="text-amber-400">2</span>){"\n"}
                    {"\n"}
                    <span className="text-gray-500"># Fit SVM Linear Classifier</span>{"\n"}
                    classifier = svm.<span className="text-blue-400">SVC</span>(kernel=<span className="text-emerald-400">'linear'</span>){"\n"}
                    classifier.<span className="text-blue-400">fit</span>(X_train, Y_train){"\n"}
                    {"\n"}
                    <span className="text-gray-500"># Extract scaling configurations</span>{"\n"}
                    <span className="text-blue-400">print</span>(<span className="text-emerald-400">"Scaler Mean:"</span>, scaler.mean_){"\n"}
                    <span className="text-blue-400">print</span>(<span className="text-emerald-400">"Scaler Scale (Std Dev):"</span>, np.<span className="text-blue-400">sqrt</span>(scaler.var_)){"\n"}
                    <span className="text-blue-400">print</span>(<span className="text-emerald-400">"SVM Coefficients (Weights):"</span>, classifier.coef_[<span className="text-amber-400">0</span>]){"\n"}
                    <span className="text-blue-400">print</span>(<span className="text-emerald-400">"SVM Intercept (Bias):"</span>, classifier.intercept_[<span className="text-amber-400">0</span>])
                  </code>
                </pre>
              )}

              {activeTab === 'javascript' && (
                <pre className="text-[12px] font-mono leading-6 text-gray-355">
                  <code>
                    <span className="text-gray-500">// ----------------------------------------------------</span>{"\n"}
                    <span className="text-gray-500">// PORTED CLIENT-SIDE JS SVM EVALUATION MATH</span>{"\n"}
                    <span className="text-gray-500">// ----------------------------------------------------</span>{"\n"}
                    <span className="text-purple-400">const</span> <span className="text-blue-400">SCALER_MEAN</span> = [<span className="text-amber-400">3.84505208, 120.89453125, 69.10546875, 20.53645833, 79.79947917, 31.99257812, 0.4718763, 33.24088542</span>];{"\n"}
                    <span className="text-purple-400">const</span> <span className="text-blue-400">SCALER_SCALE</span> = [<span className="text-amber-400">3.36738361, 31.95179591, 19.34320163, 15.94182863, 115.16894926, 7.87902573, 0.33111282, 11.75257265</span>];{"\n"}
                    <span className="text-purple-400">const</span> <span className="text-blue-400">SVM_WEIGHTS</span> = [<span className="text-amber-400">0.30692731, 1.00994568, -0.21146783, 0.00036572, -0.16754678, 0.61658273, 0.25516051, 0.07388959</span>];{"\n"}
                    <span className="text-purple-400">const</span> <span className="text-blue-400">SVM_BIAS</span> = <span className="text-amber-400">-0.73820656</span>;{"\n"}
                    {"\n"}
                    <span className="text-purple-400">function</span> <span className="text-blue-400">predictDiabetes</span>(inputs) {"{"}{"\n"}
                    <span className="text-gray-500">  // inputs: [Pregnancies, Glucose, BP, SkinThickness, Insulin, BMI, DPF, Age]</span>{"\n"}
                    {"\n"}
                    <span className="text-gray-500">  // 1. Z-Score Standardization</span>{"\n"}
                    <span className="text-purple-400">  const</span> stdInputs = inputs.<span className="text-blue-400">map</span>((val, idx) =&gt; (val - <span className="text-blue-400">SCALER_MEAN</span>[idx]) / <span className="text-blue-400">SCALER_SCALE</span>[idx]);{"\n"}
                    {"\n"}
                    <span className="text-gray-500">  // 2. Compute decision value dot product: f(x) = sum(w * z) + b</span>{"\n"}
                    <span className="text-purple-400">  let</span> score = <span className="text-blue-400">SVM_BIAS</span>;{"\n"}
                    <span className="text-purple-400">  for</span> (<span className="text-purple-400">let</span> i = <span className="text-amber-400">0</span>; i &lt; stdInputs.length; i++) {"{"}{"\n"}
                    {"    "}score += stdInputs[i] * <span className="text-blue-400">SVM_WEIGHTS</span>[i];{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"\n"}
                    <span className="text-gray-500">  // 3. Output prediction category and probability approximation</span>{"\n"}
                    <span className="text-purple-400">  const</span> outcome = score &gt;= <span className="text-amber-400">0</span> ? <span className="text-amber-400">1</span> : <span className="text-amber-400">0</span>;{"\n"}
                    <span className="text-purple-400">  const</span> probability = <span className="text-amber-400">1</span> / (<span className="text-amber-400">1</span> + Math.<span className="text-blue-400">exp</span>(-score)); <span className="text-gray-500">// Sigmoid platt scaling</span>{"\n"}
                    {"\n"}
                    <span className="text-purple-400">  return</span> {"{"} outcome, score, riskPercentage: Math.<span className="text-blue-400">round</span>(probability * <span className="text-amber-400">100</span>) {"}"};{"\n"}
                    {"}"}
                  </code>
                </pre>
              )}

              {activeTab === 'dataset' && (
                <div className="space-y-4 font-sans text-xs">
                  <p className="text-gray-400 text-xs">
                    The dataset contains 768 rows representing clinical records of female patients of Pima Indian heritage. Below is the feature definition list:
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-gray-800 bg-slate-950/60 p-4">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400 font-semibold">
                          <th className="pb-2 font-bold uppercase text-[10px] tracking-wider">Feature Name</th>
                          <th className="pb-2 font-bold uppercase text-[10px] tracking-wider">Type</th>
                          <th className="pb-2 font-bold uppercase text-[10px] tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-900 text-gray-305">
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">Pregnancies</td>
                          <td className="py-2.5 font-mono text-gray-550">Integer</td>
                          <td className="py-2.5 text-gray-300">Number of times pregnant</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">Glucose</td>
                          <td className="py-2.5 font-mono text-gray-550">Integer</td>
                          <td className="py-2.5 text-gray-300">Plasma glucose concentration a 2 hours in an oral glucose tolerance test</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">BloodPressure</td>
                          <td className="py-2.5 font-mono text-gray-550">Integer</td>
                          <td className="py-2.5 text-gray-300">Diastolic blood pressure (mm Hg)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">SkinThickness</td>
                          <td className="py-2.5 font-mono text-gray-550">Integer</td>
                          <td className="py-2.5 text-gray-300">Triceps skin fold thickness (mm)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">Insulin</td>
                          <td className="py-2.5 font-mono text-gray-550">Integer</td>
                          <td className="py-2.5 text-gray-300">2-Hour serum insulin (mu U/ml)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">BMI</td>
                          <td className="py-2.5 font-mono text-gray-550">Float</td>
                          <td className="py-2.5 text-gray-300">Body mass index (weight in kg/(height in m)^2)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">DiabetesPedigreeFunction</td>
                          <td className="py-2.5 font-mono text-gray-550">Float</td>
                          <td className="py-2.5 text-gray-300">Genetic score mapping likelihood of diabetes based on family pedigree</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-blue-400 font-medium">Age</td>
                          <td className="py-2.5 font-mono text-gray-550">Integer</td>
                          <td className="py-2.5 text-gray-300">Patient age (years)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to Home Action */}
        <div className="text-center mt-12">
          <button
            onClick={handleBackToHome}
            className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-2xl font-semibold hover:bg-gray-800 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 shadow-xl shadow-black/30"
          >
            <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" /> Back to Portfolio Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default DiabetesProject;
