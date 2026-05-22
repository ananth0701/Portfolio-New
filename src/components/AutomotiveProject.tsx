import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, ExternalLink, BarChart3, Database, 
  RefreshCw, Layers, FileText, CheckCircle2,
  Filter, Info, TrendingUp, Code2
} from 'lucide-react';
import { carData } from './automotiveData';

const AutomotiveProject: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'insights' | 'live'>('dashboard');
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'typescript' | 'tableau'>('python');
  
  // Dashboard Filters
  const [fuelFilter, setFuelFilter] = useState<string>('All');
  const [transFilter, setTransFilter] = useState<string>('All');
  const [sellerFilter, setSellerFilter] = useState<string>('All');
  const [ownerFilter, setOwnerFilter] = useState<string>('All');
  const [yearMin, setYearMin] = useState<number>(1994);
  const [yearMax, setYearMax] = useState<number>(2023);

  // Live Tableau Embed url state
  const [tableauUrl, setTableauUrl] = useState<string>(() => localStorage.getItem('portfolio_tableau_url') || '');
  const [inputUrl, setInputUrl] = useState<string>('');

  // Tooltip tracking state
  const [hoveredItem, setHoveredItem] = useState<{
    sheetId: string;
    x: number;
    y: number;
    title: string;
    details: { label: string; value: string }[];
  } | null>(null);

  const getTableauEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('?:showVizHome=no')) return url;
    const match = url.match(/public\.tableau\.com\/views\/([^/?]+)\/([^/?]+)/);
    if (match) {
      return `https://public.tableau.com/views/${match[1]}/${match[2]}?:showVizHome=no&:embed=true`;
    }
    return url;
  };

  const handleBackToHome = () => {
    window.location.hash = '#projects';
  };

  // Format currency in Indian standard (Lakhs and Crores)
  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`;
    } else {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(val);
    }
  };

  const formatKm = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K km`;
    }
    return `${val} km`;
  };

  // Reset all filters
  const resetFilters = () => {
    setFuelFilter('All');
    setTransFilter('All');
    setSellerFilter('All');
    setOwnerFilter('All');
    setYearMin(1994);
    setYearMax(2023);
  };

  // Filter the dataset in real-time
  const filteredRecords = useMemo(() => {
    return carData.filter(car => {
      if (fuelFilter !== 'All' && car.f !== fuelFilter) return false;
      if (transFilter !== 'All' && car.t !== transFilter) return false;
      if (sellerFilter !== 'All' && car.s !== sellerFilter) return false;
      if (ownerFilter !== 'All' && car.o !== ownerFilter) return false;
      if (car.y < yearMin || car.y > yearMax) return false;
      return true;
    });
  }, [fuelFilter, transFilter, sellerFilter, ownerFilter, yearMin, yearMax]);

  // Aggregate stats from filtered records
  const dashboardStats = useMemo(() => {
    const totalRecords = filteredRecords.length;
    const totalSalesVolume = filteredRecords.reduce((sum, car) => sum + car.p, 0);
    
    // Sheet 1: Selling price of dealer by year (sums of Individual, Dealer, Trustmark Dealer for each year in the range)
    const yearsList: number[] = [];
    for (let yr = yearMin; yr <= yearMax; yr++) {
      yearsList.push(yr);
    }
    const sheet1Data = yearsList.map(yr => {
      const yrRecs = filteredRecords.filter(car => car.y === yr);
      
      const individualSum = yrRecs.filter(car => car.s === 'Individual').reduce((sum, car) => sum + car.p, 0);
      const dealerSum = yrRecs.filter(car => car.s === 'Dealer').reduce((sum, car) => sum + car.p, 0);
      const trustmarkSum = yrRecs.filter(car => car.s === 'Trustmark Dealer').reduce((sum, car) => sum + car.p, 0);
      const totalSum = individualSum + dealerSum + trustmarkSum;

      const individualCount = yrRecs.filter(car => car.s === 'Individual').length;
      const dealerCount = yrRecs.filter(car => car.s === 'Dealer').length;
      const trustmarkCount = yrRecs.filter(car => car.s === 'Trustmark Dealer').length;

      return {
        year: yr,
        individualSum,
        dealerSum,
        trustmarkSum,
        totalSum,
        individualCount,
        dealerCount,
        trustmarkCount,
        totalCount: yrRecs.length
      };
    });

    // Sheet 5: Average Selling Price by Fuel Type
    const fuelsList = ['Diesel', 'Petrol', 'CNG', 'LPG', 'Electric'];
    const sheet5Data = fuelsList.map(fuel => {
      const fuelRecs = filteredRecords.filter(car => car.f === fuel);
      const avg = fuelRecs.length > 0 ? fuelRecs.reduce((acc, car) => acc + car.p, 0) / fuelRecs.length : 0;
      return { fuel, avg, count: fuelRecs.length };
    });

    // Sheet 8: Ownership Share
    const ownerTypes = ['First Owner', 'Second Owner', 'Third Owner', 'Fourth & Above Owner', 'Test Drive Car'];
    const sheet8Data = ownerTypes.map(owner => {
      const count = filteredRecords.filter(car => car.o === owner).length;
      const pct = totalRecords > 0 ? (count / totalRecords) * 100 : 0;
      return { owner, count, pct };
    });

    // Sheet 3: Seller Type Distribution
    const sellerTypes = ['Individual', 'Dealer', 'Trustmark Dealer'];
    const sheet3Data = sellerTypes.map(seller => {
      const count = filteredRecords.filter(car => car.s === seller).length;
      const pct = totalRecords > 0 ? (count / totalRecords) * 100 : 0;
      return { seller, count, pct };
    });

    // Sheet 12: Average Kilometers Driven by Fuel & Transmission
    const kmFuels = ['Diesel', 'Petrol', 'CNG', 'LPG', 'Electric'];
    const sheet12Data = kmFuels.map(fuel => {
      const mRecs = filteredRecords.filter(car => car.f === fuel && car.t === 'Manual');
      const aRecs = filteredRecords.filter(car => car.f === fuel && car.t === 'Automatic');
      const manualAvg = mRecs.length > 0 ? mRecs.reduce((acc, car) => acc + car.k, 0) / mRecs.length : 0;
      const autoAvg = aRecs.length > 0 ? aRecs.reduce((acc, car) => acc + car.k, 0) / aRecs.length : 0;
      return { fuel, manualAvg, autoAvg, manualCount: mRecs.length, autoCount: aRecs.length };
    });

    // Sheet 7: Fuel Volume Distribution (Counts)
    const sheet7Data = fuelsList.map(fuel => {
      const count = filteredRecords.filter(car => car.f === fuel).length;
      const pct = totalRecords > 0 ? (count / totalRecords) * 100 : 0;
      return { fuel, count, pct };
    });

    // Sheet 6: Avg Selling Price by Gearbox
    const transmissions = ['Automatic', 'Manual'];
    const sheet6Data = transmissions.map(trans => {
      const transRecs = filteredRecords.filter(car => car.t === trans);
      const avg = transRecs.length > 0 ? transRecs.reduce((acc, car) => acc + car.p, 0) / transRecs.length : 0;
      return { transmission: trans, avg, count: transRecs.length };
    });

    // Sheet 4: Transmission Share (Counts)
    const sheet4Data = transmissions.map(trans => {
      const count = filteredRecords.filter(car => car.t === trans).length;
      const pct = totalRecords > 0 ? (count / totalRecords) * 100 : 0;
      return { transmission: trans, count, pct };
    });

    return {
      totalRecords,
      totalSalesVolume,
      sheet1Data,
      sheet5Data,
      sheet8Data,
      sheet3Data,
      sheet12Data,
      sheet7Data,
      sheet6Data,
      sheet4Data
    };
  }, [filteredRecords, yearMin, yearMax]);

  // Insights Data (Sheet 10 & Sheet 11) computed from global clean dataset
  const topPowerCars = useMemo(() => {
    return carData
      .filter(car => ['282 bhp', '296.3bhp', '400 bhp'].includes(car.hp))
      .sort((a, b) => {
        const aVal = parseFloat(a.hp) || 0;
        const bVal = parseFloat(b.hp) || 0;
        return bVal - aVal;
      });
  }, []);

  const topMileageCars = useMemo(() => {
    const matching = carData.filter(car => 
      ['33.0 km/kg', '33.44 km/kg', '42.0 kmpl'].includes(car.m) && 
      car.n !== 'Maruti Alto 800 CNG LXI Optional'
    );
    const manual = matching
      .filter(car => car.t === 'Manual')
      .sort((a, b) => {
        const aVal = parseFloat(a.m) || 0;
        const bVal = parseFloat(b.m) || 0;
        return bVal - aVal;
      });
    const automatic = matching
      .filter(car => car.t === 'Automatic')
      .sort((a, b) => {
        const aVal = parseFloat(a.m) || 0;
        const bVal = parseFloat(b.m) || 0;
        return bVal - aVal;
      });
    return { manual, automatic };
  }, []);

  // Max bounds for visualization calculations
  const sheet1Max = useMemo(() => {
    return Math.max(...dashboardStats.sheet1Data.map(d => d.totalSum), 1);
  }, [dashboardStats.sheet1Data]);

  const sheet5Max = useMemo(() => {
    return Math.max(...dashboardStats.sheet5Data.map(d => d.avg), 1);
  }, [dashboardStats.sheet5Data]);

  const sheet6Max = useMemo(() => {
    return Math.max(...dashboardStats.sheet6Data.map(d => d.avg), 1);
  }, [dashboardStats.sheet6Data]);

  const sheet12Max = useMemo(() => {
    return Math.max(...dashboardStats.sheet12Data.map(d => Math.max(d.manualAvg, d.autoAvg)), 1);
  }, [dashboardStats.sheet12Data]);

  // Generate Year drop downs to prevent invalid ranges dynamically
  const fromYears = useMemo(() => {
    return Array.from({ length: yearMax - 1994 + 1 }, (_, i) => 1994 + i);
  }, [yearMax]);

  const toYears = useMemo(() => {
    return Array.from({ length: 2023 - yearMin + 1 }, (_, i) => yearMin + i);
  }, [yearMin]);

  // SVG stacked area path utilities for Sheet 1
  const getSvgY = (val: number) => 170 - (val / sheet1Max) * 145;

  const getIndividualPath = () => {
    const len = dashboardStats.sheet1Data.length;
    if (len <= 1) return '';
    const topPoints = dashboardStats.sheet1Data.map((d, i) => {
      const x = 50 + (i / (len - 1)) * 420;
      const y = getSvgY(d.individualSum);
      return `${x},${y}`;
    });
    return `M 50,170 ${topPoints.map(p => `L ${p}`).join(' ')} L 470,170 Z`;
  };

  const getDealerPath = () => {
    const len = dashboardStats.sheet1Data.length;
    if (len <= 1) return '';
    const topPoints = dashboardStats.sheet1Data.map((d, i) => {
      const x = 50 + (i / (len - 1)) * 420;
      const y = getSvgY(d.individualSum + d.dealerSum);
      return `${x},${y}`;
    });
    const basePoints = [...dashboardStats.sheet1Data].reverse().map((d, i) => {
      const origIdx = len - 1 - i;
      const x = 50 + (origIdx / (len - 1)) * 420;
      const y = getSvgY(d.individualSum);
      return `${x},${y}`;
    });
    const firstTopY = getSvgY(dashboardStats.sheet1Data[0].individualSum + dashboardStats.sheet1Data[0].dealerSum);
    return `M 50,${firstTopY} ${topPoints.map(p => `L ${p}`).join(' ')} ${basePoints.map(p => `L ${p}`).join(' ')} Z`;
  };

  const getTrustmarkPath = () => {
    const len = dashboardStats.sheet1Data.length;
    if (len <= 1) return '';
    const topPoints = dashboardStats.sheet1Data.map((d, i) => {
      const x = 50 + (i / (len - 1)) * 420;
      const y = getSvgY(d.totalSum);
      return `${x},${y}`;
    });
    const basePoints = [...dashboardStats.sheet1Data].reverse().map((d, i) => {
      const origIdx = len - 1 - i;
      const x = 50 + (origIdx / (len - 1)) * 420;
      const y = getSvgY(d.individualSum + d.dealerSum);
      return `${x},${y}`;
    });
    const firstTopY = getSvgY(dashboardStats.sheet1Data[0].totalSum);
    return `M 50,${firstTopY} ${topPoints.map(p => `L ${p}`).join(' ')} ${basePoints.map(p => `L ${p}`).join(' ')} Z`;
  };

  const getIndividualLine = () => {
    const len = dashboardStats.sheet1Data.length;
    if (len <= 1) return '';
    return dashboardStats.sheet1Data.map((d, i) => {
      const x = 50 + (i / (len - 1)) * 420;
      const y = getSvgY(d.individualSum);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  const getDealerLine = () => {
    const len = dashboardStats.sheet1Data.length;
    if (len <= 1) return '';
    return dashboardStats.sheet1Data.map((d, i) => {
      const x = 50 + (i / (len - 1)) * 420;
      const y = getSvgY(d.individualSum + d.dealerSum);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  const getTrustmarkLine = () => {
    const len = dashboardStats.sheet1Data.length;
    if (len <= 1) return '';
    return dashboardStats.sheet1Data.map((d, i) => {
      const x = 50 + (i / (len - 1)) * 420;
      const y = getSvgY(d.totalSum);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  // Get segment coordinate offsets for SVG donut chart (Sheet 3)
  const donutCoordinates = useMemo(() => {
    let accumulatedAngle = 0;
    return dashboardStats.sheet3Data.map(d => {
      const angle = (d.pct / 100) * 360;
      const startAngle = accumulatedAngle;
      accumulatedAngle += angle;
      return {
        ...d,
        startAngle,
        endAngle: accumulatedAngle
      };
    });
  }, [dashboardStats.sheet3Data]);

  return (
    <div 
      className="pt-24 pb-20 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 min-h-screen text-gray-100 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.04) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.03) 0%, transparent 40%),
          radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 24px 24px',
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 group animate-fade-in"
          >
            <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" /> Back to Portfolio
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl bg-slate-900/20 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-900/5 to-slate-950/10 z-0"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 inline-block">
              Business Intelligence & Tableau Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Exploring Trends in the Automotive Industry
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8">
              An interactive high-fidelity replica of the Tableau dashboard evaluating market valuations, fuel types, 
              gears, and ownership splits over 8,148 records. Analyze trends, filter metrics, and explore sheets 
              exactly as designed in Tableau.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/ananth0701/Tableau"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <BarChart3 size={18} className="mr-2" /> Explore Tableau Repository
              </a>
            </div>
          </div>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { metric: '8,148 Vehicles', label: 'Raw Catalog Data Size', icon: Database, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5' },
            { metric: '7,927 Cleaned', label: 'Processed Catalog Baseline', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5' },
            { metric: '₹1.03B Volume', label: 'Peak Sales Volume (2019)', icon: TrendingUp, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5' },
            { metric: 'Tableau BI', label: 'Interactive React Grid', icon: BarChart3, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 shadow-indigo-500/5' },
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

        {/* Section 1: Preprocessing & Data Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* Data Cleansing Details */}
          <div className="flex flex-col justify-between glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/10 group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h2 className="text-2xl font-bold text-white">Data Cleansing & ETL Pipeline</h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                The raw automotive dataset contains 8,148 listings. To construct a high-integrity, comparative dashboard of standard consumer vehicles, we applied a strict <b>Extract, Transform, and Load (ETL)</b> sequence.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Key data quality rules applied to the catalog:
              </p>
              <ul className="space-y-2.5 text-xs text-gray-400 mb-6">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><b>Null Seats and Capacity Filtering</b>: Identified and filtered out 221 records where the vehicle capacity was either undefined (null) or lay outside the 2 to 14 seats threshold. This removed noise and commercial outliers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><b>Whitespace Stripping</b>: Cleaned trailing and leading spaces in the <code>transmission</code> column (converting entries like <code>' Manual'</code> or <code>'Automatic '</code>) to prevent duplication in gearbox filters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span><b>Resulting Baseline</b>: Retained a standardized database of exactly <b>7,927 valid records</b>.</span>
                </li>
              </ul>
            </div>
            
            {/* Custom SVG Pipeline Funnel */}
            <div className="bg-[#080d1a]/85 border border-gray-800/80 rounded-2xl p-6 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>ETL Data Funnel</span>
                <span className="text-[10px] text-gray-500 font-normal">Raw &rarr; Filtered Baseline</span>
              </h4>
              <div className="w-full h-40 relative">
                <svg className="w-full h-full" viewBox="0 0 350 150">
                  {/* Funnel Section 1 (Raw Data) */}
                  <polygon 
                    points="30,15 320,15 280,55 70,55" 
                    fill="rgba(59, 130, 246, 0.08)" 
                    stroke="rgba(59, 130, 246, 0.4)" 
                    strokeWidth="1.5" 
                  />
                  <text x="175" y="32" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Raw Catalog Source (8,148 records)</text>

                  {/* Funnel Section 2 (Filters) */}
                  <polygon 
                    points="70,55 280,55 240,95 110,95" 
                    fill="rgba(239, 68, 68, 0.05)" 
                    stroke="rgba(239, 68, 68, 0.3)" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  />
                  <text x="175" y="72" fill="#fca5a5" fontSize="8" textAnchor="middle">Filter 221 invalid seat listings & trim text</text>

                  {/* Funnel Section 3 (Clean Baseline) */}
                  <polygon 
                    points="110,95 240,95 210,135 140,135" 
                    fill="rgba(16, 185, 129, 0.12)" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                  />
                  <text x="175" y="113" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Cleaned Dataset (7,927)</text>
                  <text x="175" y="125" fill="#6ee7b7" fontSize="7" textAnchor="middle">State Store / Tableau Source</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Workbook Sheet Mapping & Directory */}
          <div className="flex flex-col justify-between glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/10 group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h2 className="text-2xl font-bold text-white">Workbook Sheet Reference</h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                The visual layout replicates the exact layout dimensions of the workbook sheets from the Tableau Desktop package:
              </p>
              
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {[
                  { sheet: 'Sheet 1', metric: 'SUM(Selling Price)', desc: 'Stacked Area representing annual valuations per reseller channel, peaking in 2019 at ₹1.03B.' },
                  { sheet: 'Sheet 3', metric: 'CNT(Seller Type)', desc: 'Donut Chart showing the distribution of resellers (Individual, Dealer, Trustmark).' },
                  { sheet: 'Sheet 4', metric: 'CNT(Transmission)', desc: 'Horizontal progress percentage splitting automatic vs manual count volume.' },
                  { sheet: 'Sheet 5', metric: 'AVG(Selling Price)', desc: 'Vertical bars comparing average pricing per fuel type, showing Electric & Diesel dominance.' },
                  { sheet: 'Sheet 6', metric: 'AVG(Selling Price)', desc: 'Bar chart proving Automatic gearbox valuations are double manual models.' },
                  { sheet: 'Sheet 7', metric: 'CNT(Fuel Type)', desc: 'Horizontal volumes of fuel configurations in the catalog.' },
                  { sheet: 'Sheet 8', metric: 'CNT(Owner Stages)', desc: 'Horizontal representation showing the breakdown of ownership segments.' },
                  { sheet: 'Sheet 12', metric: 'AVG(Km Driven)', desc: 'Dual-bar usage statistics of distance driven grouped by transmission and fuel.' },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-slate-950/50 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all duration-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white font-mono">{item.sheet}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] text-blue-400 font-bold font-mono">{item.metric}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Summary */}
        <div className="relative bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#1e1b4b] rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden mb-12">
          {/* Background radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Database size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Tableau Project Dashboard</h2>
                <p className="text-xs text-gray-400 mt-0.5">Explore worksheets and live embedded links</p>
              </div>
            </div>
            
            {/* Tab selector */}
            <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 self-start lg:self-center backdrop-blur-md">
              {([
                { id: 'dashboard', label: 'Interactive Dashboard 1', icon: Layers },
                { id: 'insights', label: 'Workbook Sheets (Insights)', icon: FileText },
                { id: 'live', label: 'Live Tableau Embed', icon: ExternalLink }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setHoveredItem(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: INTERACTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              
              {/* Sidebar Filters */}
              <div className="glass-panel border border-white/10 rounded-3xl p-6 space-y-6 lg:col-span-1 self-start transition-all duration-300 card-glow-blue">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Filter size={14} className="text-blue-500" /> Filters
                  </span>
                  <button 
                    onClick={resetFilters}
                    className="text-[10px] font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-all"
                  >
                    <RefreshCw size={10} /> Reset
                  </button>
                </div>

                {/* Years Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">Year Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-gray-500 block mb-1">From</span>
                      <select 
                        value={yearMin}
                        onChange={(e) => setYearMin(Number(e.target.value))}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      >
                        {fromYears.map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block mb-1">To</span>
                      <select 
                        value={yearMax}
                        onChange={(e) => setYearMax(Number(e.target.value))}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      >
                        {toYears.map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Fuel Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400">Fuel Type</label>
                  <select 
                    value={fuelFilter}
                    onChange={(e) => setFuelFilter(e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  >
                    <option value="All">All Fuels</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="CNG">CNG</option>
                    <option value="LPG">LPG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* Transmission Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">Transmission</label>
                  <div className="grid grid-cols-3 gap-1">
                    {['All', 'Manual', 'Automatic'].map(trans => (
                      <button
                        key={trans}
                        onClick={() => setTransFilter(trans)}
                        className={`py-2 rounded-xl text-[10px] font-bold border text-center transition-all duration-350 ${
                          transFilter === trans
                            ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-sm'
                            : 'bg-slate-900 border-white/5 text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {trans}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seller Type Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400">Seller Type</label>
                  <select 
                    value={sellerFilter}
                    onChange={(e) => setSellerFilter(e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  >
                    <option value="All">All Sellers</option>
                    <option value="Individual">Individual</option>
                    <option value="Dealer">Dealer</option>
                    <option value="Trustmark Dealer">Trustmark Dealer</option>
                  </select>
                </div>

                {/* Owner Stage Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400">Ownership Stage</label>
                  <select 
                    value={ownerFilter}
                    onChange={(e) => setOwnerFilter(e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  >
                    <option value="All">All Ownership Stages</option>
                    <option value="First Owner">First Owner</option>
                    <option value="Second Owner">Second Owner</option>
                    <option value="Third Owner">Third Owner</option>
                    <option value="Fourth & Above Owner">Fourth & Above Owner</option>
                    <option value="Test Drive Car">Test Drive Car</option>
                  </select>
                </div>

                <div className="text-[10px] text-gray-500 pt-3 border-t border-white/10 leading-relaxed">
                  <p className="font-semibold text-gray-400 mb-1">About Tableau Dashboard 1</p>
                  This layout mirrors the workbook coordinates. Filters slice the 7,927 valid records from the dataset locally.
                </div>
              </div>

              {/* Main Visualization Panel */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Active Filter Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass-panel border border-white/10 p-5 rounded-3xl">
                  <div className="text-center md:text-left">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Filtered records</div>
                    <div className="text-xl md:text-2xl font-black text-blue-400 mt-1">
                      {dashboardStats.totalRecords.toLocaleString()} / 8,148
                    </div>
                  </div>
                  <div className="text-center md:text-left border-l border-white/10 pl-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total sales volume</div>
                    <div className="text-xl md:text-2xl font-black text-emerald-400 mt-1">
                      {formatCurrency(dashboardStats.totalSalesVolume)}
                    </div>
                  </div>
                  <div className="text-center md:text-left border-l border-white/10 pl-4 col-span-2 md:col-span-2">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Current filter bounds</div>
                    <div className="text-[11px] text-gray-300 mt-2 font-mono truncate">
                      Years: {yearMin}-{yearMax} | Fuel: {fuelFilter} | Trans: {transFilter}
                    </div>
                  </div>
                </div>

                {/* Dashboard Empty State */}
                {dashboardStats.totalRecords === 0 ? (
                  <div className="glass-panel border border-white/10 rounded-3xl p-16 text-center">
                    <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center rounded-xl mx-auto mb-4">
                      <Info size={24} />
                    </div>
                    <h4 className="text-base font-bold text-white">No Matching Catalog Records</h4>
                    <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                      Your current filter criteria returned 0 cars. Click "Reset" in the filters panel to clear selection.
                    </p>
                  </div>
                ) : (
                  /* Tableau Grid Layout (Responsive) */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    
                    {/* Tooltip Overlay */}
                    {hoveredItem && (
                      <div 
                        className="absolute z-50 bg-slate-950/95 border border-white/10 p-4 rounded-2xl shadow-2xl text-left text-[11px] font-mono leading-relaxed min-w-[220px] pointer-events-none transition-all duration-150 backdrop-blur-md"
                        style={{
                          left: `${Math.min(hoveredItem.x, 380)}px`,
                          top: `${hoveredItem.y}px`,
                        }}
                      >
                        <div className="font-black text-white border-b border-white/10 pb-2 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span> {hoveredItem.title}
                        </div>
                        <div className="space-y-1.5 text-gray-300">
                          {hoveredItem.details.map((detail, idx) => (
                            <div key={idx} className="flex justify-between gap-4">
                              <span className="text-gray-500">{detail.label}:</span>
                              <span className="font-semibold text-gray-200">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sheet 1: Selling price of dealer by year */}
                    <div className="md:col-span-2 glass-panel border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative group/card transition-all duration-300 card-glow-blue">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 1: Selling price of dealer by year</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] text-gray-500 font-mono">SUM(Selling Price)</span>
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] text-blue-400 font-bold uppercase">Stacked Area</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">
                        Evaluates combined seller type aggregates dynamically, peaking in 2019 at ₹1.03B.
                      </p>
                      
                      {/* SVG Line/Area Chart */}
                      <div className="h-44 w-full relative pt-2">
                        <svg className="w-full h-full" viewBox="0 0 500 200">
                          <defs>
                            <linearGradient id="area-individual" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
                              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
                            </linearGradient>
                            <linearGradient id="area-dealer" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.75" />
                              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
                            </linearGradient>
                            <linearGradient id="area-trustmark" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0.15" />
                            </linearGradient>
                          </defs>

                          {/* Grid Lines */}
                          <line x1="50" y1="170" x2="470" y2="170" stroke="#334155" strokeWidth="1" />
                          <line x1="50" y1="25" x2="470" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
                          <line x1="50" y1="97.5" x2="470" y2="97.5" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />

                          {/* X-axis labels */}
                          {dashboardStats.sheet1Data.map((d, idx) => {
                            const len = dashboardStats.sheet1Data.length;
                            const x = len > 1 ? 50 + (idx / (len - 1)) * 420 : 260;
                            
                            // Decimate year labels if there are too many
                            const shouldShowLabel = 
                              len <= 10 || 
                              idx === 0 || 
                              idx === len - 1 || 
                              idx === Math.floor(len / 2) ||
                              idx === Math.floor(len / 4) ||
                              idx === Math.floor((3 * len) / 4);

                            if (!shouldShowLabel) return null;

                            return (
                              <text key={d.year} x={x} y="190" fill="#64748b" fontSize="8" textAnchor="middle">{d.year}</text>
                            );
                          })}

                          {/* Y-axis Labels */}
                          <text x="42" y="30" fill="#64748b" fontSize="8" textAnchor="end">{formatCurrency(sheet1Max)}</text>
                          <text x="42" y="100" fill="#64748b" fontSize="8" textAnchor="end">{formatCurrency(sheet1Max / 2)}</text>
                          <text x="42" y="173" fill="#64748b" fontSize="8" textAnchor="end">₹0</text>

                          {/* Stacked Areas (Only if data exists and length > 1) */}
                          {dashboardStats.sheet1Data.length > 1 && sheet1Max > 1 && (
                            <>
                              <path d={getIndividualPath()} fill="url(#area-individual)" />
                              <path d={getDealerPath()} fill="url(#area-dealer)" />
                              <path d={getTrustmarkPath()} fill="url(#area-trustmark)" />

                              {/* Edge lines */}
                              <path d={getIndividualLine()} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                              <path d={getDealerLine()} fill="none" stroke="#6366f1" strokeWidth="1.5" />
                              <path d={getTrustmarkLine()} fill="none" stroke="#10b981" strokeWidth="1.5" />
                            </>
                          )}

                          {/* Stacked Columns Fallback for N = 1 */}
                          {dashboardStats.sheet1Data.length === 1 && sheet1Max > 1 && (
                            <>
                              {/* Individual rect */}
                              <rect
                                x="245"
                                y={getSvgY(dashboardStats.sheet1Data[0].individualSum)}
                                width="30"
                                height={170 - getSvgY(dashboardStats.sheet1Data[0].individualSum)}
                                fill="url(#area-individual)"
                                stroke="#3b82f6"
                                strokeWidth="1"
                              />
                              {/* Dealer rect */}
                              <rect
                                x="245"
                                y={getSvgY(dashboardStats.sheet1Data[0].individualSum + dashboardStats.sheet1Data[0].dealerSum)}
                                width="30"
                                height={getSvgY(dashboardStats.sheet1Data[0].individualSum) - getSvgY(dashboardStats.sheet1Data[0].individualSum + dashboardStats.sheet1Data[0].dealerSum)}
                                fill="url(#area-dealer)"
                                stroke="#6366f1"
                                strokeWidth="1"
                              />
                              {/* Trustmark rect */}
                              <rect
                                x="245"
                                y={getSvgY(dashboardStats.sheet1Data[0].totalSum)}
                                width="30"
                                height={getSvgY(dashboardStats.sheet1Data[0].individualSum + dashboardStats.sheet1Data[0].dealerSum) - getSvgY(dashboardStats.sheet1Data[0].totalSum)}
                                fill="url(#area-trustmark)"
                                stroke="#10b981"
                                strokeWidth="1"
                              />
                            </>
                          )}

                          {/* Interactive Invisible Hover Rectangles */}
                          {dashboardStats.sheet1Data.map((d, idx) => {
                            const len = dashboardStats.sheet1Data.length;
                            const x = len > 1 ? 50 + (idx / (len - 1)) * 420 : 260;
                            const width = len > 1 ? 420 / (len - 1) : 60;
                            const xStart = x - width / 2;

                            return (
                              <rect
                                key={d.year}
                                x={xStart}
                                y="20"
                                width={width}
                                height="150"
                                fill="transparent"
                                className="cursor-pointer hover:fill-white/5 transition-all"
                                onMouseEnter={() => {
                                  // Tooltip position offsets
                                  const relativeX = len > 1 ? (idx / (len - 1)) * 360 : 200;
                                  const relativeY = 30; // standard top offset
                                  setHoveredItem({
                                    sheetId: 'sheet1',
                                    x: relativeX,
                                    y: relativeY,
                                    title: `Year ${d.year}`,
                                    details: [
                                      { label: 'Individual Sales', value: `${formatCurrency(d.individualSum)} (${d.individualCount} cars)` },
                                      { label: 'Dealer Sales', value: `${formatCurrency(d.dealerSum)} (${d.dealerCount} cars)` },
                                      { label: 'Trustmark Dealer Sales', value: `${formatCurrency(d.trustmarkSum)} (${d.trustmarkCount} cars)` },
                                      { label: 'Total Sales Volume', value: `${formatCurrency(d.totalSum)} (${d.totalCount} cars)` }
                                    ]
                                  });
                                }}
                                onMouseLeave={() => setHoveredItem(null)}
                              />
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    {/* Sheet 5: Selling price by Car Fuel type */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative group/card transition-all duration-300 card-glow-blue">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 5: Selling price by Car Fuel type</span>
                        <span className="text-[9px] text-gray-500 font-mono">AVG(Selling Price)</span>
                      </div>
                      
                      <div className="h-44 flex items-end justify-between px-2 pt-6">
                        {dashboardStats.sheet5Data.map((d, idx) => {
                          const heightPct = (d.avg / sheet5Max) * 100;
                          return (
                            <div 
                              key={idx} 
                              className="flex flex-col items-center gap-2 flex-1 cursor-pointer group/bar"
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                                const x = rect.left - (cardRect?.left || 0) - 40;
                                const y = rect.top - (cardRect?.top || 0) - 95;
                                setHoveredItem({
                                  sheetId: 'sheet5',
                                  x,
                                  y,
                                  title: `${d.fuel} fuel`,
                                  details: [
                                    { label: 'AVG(Selling Price)', value: formatCurrency(d.avg) },
                                    { label: 'Record Count', value: `${d.count} listings` }
                                  ]
                                });
                              }}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <div className="text-[9px] font-mono text-gray-400 font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                {formatCurrency(d.avg)}
                              </div>
                              <div className="w-8 bg-slate-950/80 rounded-xl overflow-hidden border border-white/10 flex items-end h-32">
                                <div 
                                  className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-b-md transition-all duration-500 group-hover/bar:from-blue-500 group-hover/bar:to-indigo-400"
                                  style={{ height: `${heightPct}%` }}
                                ></div>
                              </div>
                              <span className="text-[9px] font-bold text-gray-400 mt-1">{d.fuel}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sheet 8: Type of owners */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative group/card transition-all duration-300 card-glow-blue">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 8: Type of owners</span>
                        <span className="text-[9px] text-gray-500 font-mono">CNT(Owner)</span>
                      </div>
                      
                      <div className="space-y-3.5 pt-2">
                        {dashboardStats.sheet8Data.map((d, idx) => (
                          <div 
                            key={idx} 
                            className="text-xs cursor-pointer group/row"
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                              const x = rect.left - (cardRect?.left || 0) + 120;
                              const y = rect.top - (cardRect?.top || 0) - 95;
                              setHoveredItem({
                                  sheetId: 'sheet8',
                                  x,
                                  y,
                                  title: d.owner,
                                  details: [
                                    { label: 'Count', value: `${d.count} cars` },
                                    { label: 'Percentage', value: `${d.pct.toFixed(2)}%` }
                                  ]
                                });
                            }}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                              <span className="font-semibold group-hover/row:text-blue-400 transition-colors">{d.owner}</span>
                              <span className="text-gray-500 font-mono">{d.count} ({d.pct.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" 
                                style={{ width: `${d.pct}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sheet 3: Count of cars per type of dealer */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col relative group/card transition-all duration-300 card-glow-emerald">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 3: Count of cars per type of dealer</span>
                        <span className="text-[9px] text-gray-500 font-mono">CNT(Seller Type)</span>
                      </div>
                      
                      <div className="flex-1 flex flex-row items-center justify-around gap-6 py-6">
                        {/* Donut Chart SVG */}
                        <div className="w-44 h-44 relative shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#090d16" strokeWidth="12" />
                            {donutCoordinates.map((d, idx) => {
                              const r = 40;
                              const c = 2 * Math.PI * r;
                              const strokeDash = (d.pct / 100) * c;
                              let accumulatedOffset = 0;
                              for (let i = 0; i < idx; i++) {
                                accumulatedOffset += (donutCoordinates[i].pct / 100) * c;
                              }
                              
                              const colors = ['#3b82f6', '#6366f1', '#10b981'];
                              
                              return (
                                <circle 
                                  key={idx}
                                  cx="50" 
                                  cy="50" 
                                  r={r} 
                                  fill="none" 
                                  stroke={colors[idx % colors.length]} 
                                  strokeWidth={d.pct > 0 ? "12" : "0"} 
                                  strokeDasharray={`${strokeDash} ${c}`}
                                  strokeDashoffset={-accumulatedOffset}
                                  className="cursor-pointer transition-all duration-300 hover:stroke-[14]"
                                  onMouseEnter={(e) => {
                                    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                                    const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                                    const x = (rect?.left || 0) - (cardRect?.left || 0) + 10;
                                    const y = (rect?.top || 0) - (cardRect?.top || 0) - 95;
                                    setHoveredItem({
                                      sheetId: 'sheet3',
                                      x,
                                      y,
                                      title: d.seller,
                                      details: [
                                        { label: 'Count', value: `${d.count} listings` },
                                        { label: 'Percentage', value: `${d.pct.toFixed(2)}%` }
                                      ]
                                    });
                                  }}
                                  onMouseLeave={() => setHoveredItem(null)}
                                />
                              );
                            })}
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Total</span>
                            <span className="text-xl font-black text-white mt-0.5">{dashboardStats.totalRecords.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-3.5 text-[11px] pl-4">
                          {dashboardStats.sheet3Data.map((d, idx) => {
                            const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-emerald-500'];
                            return (
                              <div key={idx} className="flex items-center gap-3">
                                <span className={`w-3.5 h-3.5 rounded-md shrink-0 ${colors[idx % colors.length]}`}></span>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-gray-200 leading-none">{d.seller}</span>
                                  <span className="text-[10px] text-gray-500 font-mono mt-1">{d.count.toLocaleString()} ({d.pct.toFixed(1)}%)</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Sheet 12: Avg Kilometers driven by Fuel/Tramission car types */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative group/card transition-all duration-300 card-glow-blue">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 12: Avg Kilometers driven by Fuel/Tramission</span>
                        <span className="text-[9px] text-gray-500 font-mono">AVG(Km Driven)</span>
                      </div>
                      
                      <div className="space-y-4 pt-1">
                        {dashboardStats.sheet12Data.map((d, idx) => {
                          const mPct = (d.manualAvg / sheet12Max) * 100;
                          const aPct = (d.autoAvg / sheet12Max) * 100;
                          return (
                            <div key={idx} className="space-y-1.5">
                              <span className="text-[10px] font-bold text-gray-400">{d.fuel}</span>
                              <div className="space-y-1">
                                {/* Manual bar */}
                                {d.manualCount > 0 && (
                                  <div 
                                    className="flex items-center gap-2 cursor-pointer group/row"
                                    onMouseEnter={(e) => {
                                      const rect = e.currentTarget.getBoundingClientRect();
                                      const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                                      const x = rect.left - (cardRect?.left || 0) + 120;
                                      const y = rect.top - (cardRect?.top || 0) - 95;
                                      setHoveredItem({
                                        sheetId: 'sheet12',
                                        x,
                                        y,
                                        title: `${d.fuel} (Manual)`,
                                        details: [
                                          { label: 'AVG(Km Driven)', value: `${d.manualAvg.toLocaleString(undefined, {maximumFractionDigits:0})} km` },
                                          { label: 'Record Count', value: `${d.manualCount} cars` }
                                        ]
                                      });
                                    }}
                                    onMouseLeave={() => setHoveredItem(null)}
                                  >
                                    <span className="text-[8px] font-mono text-gray-500 w-10">Manual</span>
                                    <div className="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                      <div 
                                        className="h-full bg-blue-500 rounded-full group-hover/row:bg-blue-400 transition-all duration-300"
                                        style={{ width: `${mPct}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-[9px] font-mono text-gray-400 w-12 text-right">{formatKm(d.manualAvg)}</span>
                                  </div>
                                )}

                                {/* Auto bar */}
                                {d.autoCount > 0 && (
                                  <div 
                                    className="flex items-center gap-2 cursor-pointer group/row"
                                    onMouseEnter={(e) => {
                                      const rect = e.currentTarget.getBoundingClientRect();
                                      const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                                      const x = rect.left - (cardRect?.left || 0) + 120;
                                      const y = rect.top - (cardRect?.top || 0) - 95;
                                      setHoveredItem({
                                        sheetId: 'sheet12',
                                        x,
                                        y,
                                        title: `${d.fuel} (Automatic)`,
                                        details: [
                                          { label: 'AVG(Km Driven)', value: `${d.autoAvg.toLocaleString(undefined, {maximumFractionDigits:0})} km` },
                                          { label: 'Record Count', value: `${d.autoCount} cars` }
                                        ]
                                      });
                                    }}
                                    onMouseLeave={() => setHoveredItem(null)}
                                  >
                                    <span className="text-[8px] font-mono text-gray-500 w-10">Auto</span>
                                    <div className="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                      <div 
                                        className="h-full bg-indigo-500 rounded-full group-hover/row:bg-indigo-400 transition-all duration-300"
                                        style={{ width: `${aPct}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-[9px] font-mono text-gray-400 w-12 text-right">{formatKm(d.autoAvg)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sheet 7: Count of Cars by Fuel Type */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative group/card transition-all duration-300 card-glow-emerald">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 7: Count of Cars by Fuel Type</span>
                        <span className="text-[9px] text-gray-500 font-mono">CNT(Fuel)</span>
                      </div>
                      
                      <div className="space-y-3.5 pt-1">
                        {dashboardStats.sheet7Data.map((d, idx) => (
                          <div 
                            key={idx} 
                            className="text-xs cursor-pointer group/row"
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                              const x = rect.left - (cardRect?.left || 0) + 120;
                              const y = rect.top - (cardRect?.top || 0) - 95;
                              setHoveredItem({
                                sheetId: 'sheet7',
                                x,
                                y,
                                title: `${d.fuel} variant`,
                                details: [
                                  { label: 'Count', value: `${d.count} cars` },
                                  { label: 'Percentage', value: `${d.pct.toFixed(2)}%` }
                                ]
                              });
                            }}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                              <span className="font-semibold group-hover/row:text-emerald-400 transition-colors">{d.fuel}</span>
                              <span className="text-gray-500 font-mono">{d.count} ({d.pct.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" 
                                style={{ width: `${d.pct}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sheet 6: Avg Selling price of Automatic & Manual Cars */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative group/card transition-all duration-300 card-glow-blue">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 6: Avg Selling price of Automatic & Manual Cars</span>
                        <span className="text-[9px] text-gray-500 font-mono">AVG(Selling Price)</span>
                      </div>
                      
                      <div className="flex items-end justify-around h-44 pt-6 pb-2">
                        {dashboardStats.sheet6Data.map((d, idx) => {
                          const heightPct = (d.avg / sheet6Max) * 100;
                          const colors = ['bg-indigo-500', 'bg-blue-500'];
                          return (
                            <div 
                              key={idx} 
                              className="flex flex-col items-center gap-2 flex-1 max-w-[80px] cursor-pointer group/bar"
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                                const x = rect.left - (cardRect?.left || 0) - 40;
                                const y = rect.top - (cardRect?.top || 0) - 95;
                                setHoveredItem({
                                  sheetId: 'sheet6',
                                  x,
                                  y,
                                  title: d.transmission,
                                  details: [
                                    { label: 'AVG(Selling Price)', value: formatCurrency(d.avg) },
                                    { label: 'Record Count', value: `${d.count} cars` }
                                  ]
                                });
                              }}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <span className="text-[9px] font-mono text-gray-400 font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                {formatCurrency(d.avg)}
                              </span>
                              <div className="w-10 bg-slate-950/80 rounded-xl overflow-hidden border border-white/10 flex items-end h-28">
                                <div 
                                  className={`w-full ${colors[idx]} rounded-b-md transition-all duration-500 group-hover/bar:opacity-90`}
                                  style={{ height: `${heightPct}%` }}
                                ></div>
                              </div>
                              <span className="text-[9px] font-bold text-gray-400 mt-1">{d.transmission}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sheet 4: Count of Automatic & Manual cars */}
                    <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative group/card transition-all duration-300 card-glow-blue">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 4: Count of Automatic & Manual cars</span>
                        <span className="text-[9px] text-gray-500 font-mono">CNT(Transmission)</span>
                      </div>
                      
                      <div className="space-y-4 pt-4">
                        {dashboardStats.sheet4Data.map((d, idx) => (
                          <div 
                            key={idx} 
                            className="text-xs cursor-pointer group/row"
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const cardRect = e.currentTarget.closest('.group\\/card')?.getBoundingClientRect();
                              const x = rect.left - (cardRect?.left || 0) + 120;
                              const y = rect.top - (cardRect?.top || 0) - 95;
                              setHoveredItem({
                                sheetId: 'sheet4',
                                x,
                                y,
                                title: `${d.transmission} transmission`,
                                details: [
                                  { label: 'Count', value: `${d.count} listings` },
                                  { label: 'Percentage', value: `${d.pct.toFixed(2)}%` }
                                ]
                              });
                            }}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                              <span className="font-semibold group-hover/row:text-indigo-400 transition-colors">{d.transmission}</span>
                              <span className="text-gray-500 font-mono">{d.count} ({d.pct.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                              <div 
                                className={`h-full ${d.transmission === 'Manual' ? 'bg-blue-500' : 'bg-indigo-500'} rounded-full transition-all duration-500`} 
                                style={{ width: `${d.pct}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: WORKBOOK SHEETS (INSIGHTS) */}
          {activeTab === 'insights' && (
            <div className="space-y-8 relative z-10 animate-fade-in">
              <div className="glass-panel border border-white/10 p-5 rounded-3xl text-xs text-gray-300 leading-relaxed flex items-start gap-3">
                <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  These sheets are defined in the Tableau workbook XML (`Sheet 10` and `Sheet 11`) but were not dragged into the visual `Dashboard 1` grid. They provide detailed listings of the top records in the catalog.
                </div>
              </div>

              {/* Grid with 2 sheets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Sheet 10: Top 3 max power cars */}
                <div className="glass-panel border border-white/10 rounded-3xl p-6 relative transition-all duration-300 card-glow-blue">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 10: Top 3 max power cars</span>
                    <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[9px] text-blue-400 font-bold uppercase tracking-wider">Max Horsepower</span>
                  </div>
                  
                  {topPowerCars.length === 0 ? (
                    <div className="text-center text-xs text-gray-500 py-8">No cars in current filters</div>
                  ) : (
                    <div className="space-y-4">
                      {topPowerCars.map((car, idx) => (
                        <div key={idx} className="bg-slate-950/50 p-4 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all duration-300 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-white leading-snug">{car.n}</div>
                            <div className="flex flex-wrap gap-2 text-[10px] text-gray-400">
                              <span>Year: {car.y}</span>
                              <span>•</span>
                              <span className="capitalize">{car.f}</span>
                              <span>•</span>
                              <span className="capitalize">{car.t}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-black text-indigo-400">{car.hp}</div>
                            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">{formatCurrency(car.p)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sheet 11: Top 3 Mileage cars by transmission */}
                <div className="glass-panel border border-white/10 rounded-3xl p-6 relative transition-all duration-300 card-glow-blue">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Sheet 11: Top 3 Mileage cars by transmission</span>
                    <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[9px] text-blue-400 font-bold uppercase tracking-wider">Efficiency (km/l or km/kg)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Manual column */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Manual Transmission</h4>
                      {topMileageCars.manual.length === 0 ? (
                        <div className="text-center text-xs text-gray-500 py-4">No manual cars</div>
                      ) : (
                        <div className="space-y-3">
                          {topMileageCars.manual.map((car, idx) => (
                            <div key={idx} className="bg-slate-950/50 p-4 border border-white/5 rounded-2xl text-[11px] transition-all hover:border-blue-500/25">
                              <div className="font-bold text-white truncate" title={car.n}>{car.n}</div>
                              <div className="flex justify-between items-center mt-2.5 text-[10px]">
                                <span className="text-blue-400 font-bold">{car.m}</span>
                                <span className="text-emerald-400 font-semibold">{formatCurrency(car.p)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Automatic column */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Automatic Transmission</h4>
                      {topMileageCars.automatic.length === 0 ? (
                        <div className="text-center text-xs text-gray-500 py-4">No automatic cars</div>
                      ) : (
                        <div className="space-y-3">
                          {topMileageCars.automatic.map((car, idx) => (
                            <div key={idx} className="bg-slate-950/50 p-4 border border-white/5 rounded-2xl text-[11px] transition-all hover:border-blue-500/25">
                              <div className="font-bold text-white truncate" title={car.n}>{car.n}</div>
                              <div className="flex justify-between items-center mt-2.5 text-[10px]">
                                <span className="text-indigo-400 font-bold">{car.m}</span>
                                <span className="text-emerald-400 font-semibold">{formatCurrency(car.p)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: LIVE TABLEAU EMBED */}
          {activeTab === 'live' && (
            <div className="glass-panel border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 card-glow-blue animate-fade-in relative z-10">
              {tableauUrl ? (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full flex items-center justify-between mb-4 bg-slate-950/60 p-4 rounded-2xl border border-white/10">
                    <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-emerald-400" /> Live Tableau Dashboard Connected
                    </span>
                    <button
                      onClick={() => {
                        setTableauUrl('');
                        localStorage.removeItem('portfolio_tableau_url');
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-all"
                    >
                      Disconnect Dashboard
                    </button>
                  </div>
                  <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                    <iframe
                      src={getTableauEmbedUrl(tableauUrl)}
                      width="100%"
                      height="100%"
                      title="Automotive Industry Tableau Dashboard"
                      className="border-none"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div className="max-w-xl text-center py-8">
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400">
                    <ExternalLink size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Connect Your Live Tableau Dashboard</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    Tableau packaged workbooks (.twbx) are desktop-based and cannot run directly in browser code. To embed your live dashboard:
                  </p>
                  <ol className="text-xs text-gray-300 text-left space-y-2 mb-8 bg-slate-950/60 p-6 rounded-2xl border border-white/5 leading-relaxed list-decimal list-inside">
                    <li>Publish your workbook to the free <a href="https://public.tableau.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-bold">Tableau Public</a> portal.</li>
                    <li>Copy your dashboard URL (e.g., <code>https://public.tableau.com/views/...</code>).</li>
                    <li>Paste the link below to embed it into your live portfolio dashboard.</li>
                  </ol>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <input
                      type="text"
                      placeholder="Paste Tableau Public link (e.g. https://public.tableau.com/views/...)"
                      className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all flex-1"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (inputUrl) {
                          const embed = getTableauEmbedUrl(inputUrl);
                          setTableauUrl(embed);
                          localStorage.setItem('portfolio_tableau_url', embed);
                        }
                      }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 shadow-lg shadow-blue-500/20 whitespace-nowrap"
                    >
                      Connect viz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Project Source Code & XML Integration */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/10 mb-12 group">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
            <h2 className="text-2xl font-bold text-white">Project Source Code & XML Integration</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Review the source code and configuration pipelines that power this implementation, from the Python ETL preprocessor to the real-time TypeScript aggregator and the native Tableau XML metadata model.
          </p>

          <div className="flex border-b border-gray-800 mb-6 gap-2">
            {([
              { id: 'python', label: 'Python (ETL Script)' },
              { id: 'typescript', label: 'TypeScript (React Aggregation)' },
              { id: 'tableau', label: 'Tableau XML (Workbook Metadata)' },
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id)}
                className={`pb-3 text-sm font-semibold border-b-2 px-3 transition-colors duration-200 ${
                  activeCodeTab === tab.id 
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
                {activeCodeTab === 'python' ? 'generate_data.py' : activeCodeTab === 'typescript' ? 'AutomotiveProject.tsx' : 'workbook_schema.twb'}
              </div>
              <div className="w-12"></div>
            </div>

            {/* Code Content Editor Area */}
            <div className="p-6 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto bg-[#030712] max-h-[500px]">
              {activeCodeTab === 'python' && (
                <pre className="text-[12px] font-mono leading-6">
                  <code>
                    <span className="text-gray-500"># ----------------------------------------------------</span>{"\n"}
                    <span className="text-gray-500"># PANDAS ETL SCRIPT - VEHICLE CAPACITY CLEANING & DATA PREPARATION</span>{"\n"}
                    <span className="text-gray-500"># ----------------------------------------------------</span>{"\n"}
                    <span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd{"\n"}
                    <span className="text-purple-400">import</span> json{"\n"}
                    {"\n"}
                    csv_path = <span className="text-emerald-400">"Exploring Trends in the Automotive Industry.csv"</span>{"\n"}
                    df = pd.<span className="text-blue-400">read_csv</span>(csv_path){"\n"}
                    {"\n"}
                    <span className="text-gray-500"># 1. Clean transmission whitespace to prevent key duplication</span>{"\n"}
                    df[<span className="text-emerald-400">'transmission'</span>] = df[<span className="text-emerald-400">'transmission'</span>].str.<span className="text-blue-400">strip</span>(){"\n"}
                    {"\n"}
                    <span className="text-gray-500"># 2. Filter seats: keep only valid numbers (2 to 14), excluding Nulls</span>{"\n"}
                    <span className="text-gray-500"># This filters out exactly 221 records (8,148 -&gt; 7,927)</span>{"\n"}
                    df_clean = df[df[<span className="text-emerald-400">'seats'</span>].<span className="text-blue-400">notna</span>() &amp; (df[<span className="text-emerald-400">'seats'</span>] &gt;= <span className="text-amber-400">2</span>) &amp; (df[<span className="text-emerald-400">'seats'</span>] &lt;= <span className="text-amber-400">14</span>)].<span className="text-blue-400">copy</span>(){"\n"}
                    {"\n"}
                    <span className="text-gray-500"># 3. Build optimized JSON records mapping to short property keys</span>{"\n"}
                    records = []{"\n"}
                    <span className="text-purple-400">for</span> idx, row <span className="text-purple-400">in</span> df_clean.<span className="text-blue-400">iterrows</span>():{"\n"}
                    {"    "}records.<span className="text-blue-400">append</span>({"{"}{"\n"}
                    {"        "}<span className="text-emerald-400">'n'</span>: <span className="text-blue-400">str</span>(row[<span className="text-emerald-400">'Name'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'y'</span>: <span className="text-blue-400">int</span>(row[<span className="text-emerald-400">'year'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'p'</span>: <span className="text-blue-400">int</span>(row[<span className="text-emerald-400">'selling_price'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'k'</span>: <span className="text-blue-400">int</span>(row[<span className="text-emerald-400">'km_driven'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'f'</span>: <span className="text-blue-400">str</span>(row[<span className="text-emerald-400">'fuel'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'s'</span>: <span className="text-blue-400">str</span>(row[<span className="text-emerald-400">'seller_type'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'t'</span>: <span className="text-blue-400">str</span>(row[<span className="text-emerald-400">'transmission'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'o'</span>: <span className="text-blue-400">str</span>(row[<span className="text-emerald-400">'owner'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'m'</span>: <span className="text-blue-400">str</span>(row[<span className="text-emerald-400">'mileage'</span>]),{"\n"}
                    {"        "}<span className="text-emerald-400">'hp'</span>: <span className="text-blue-400">str</span>(row[<span className="text-emerald-400">'max_power'</span>]){"\n"}
                    {"    "}{"}"}){"\n"}
                    {"\n"}
                    <span className="text-gray-500"># Write to TypeScript component module</span>{"\n"}
                    <span className="text-purple-400">with</span> <span className="text-blue-400">open</span>(<span className="text-emerald-400">"automotiveData.ts"</span>, <span className="text-emerald-400">"w"</span>) <span className="text-purple-400">as</span> f:{"\n"}
                    {"    "}f.<span className="text-blue-400">write</span>(<span className="text-emerald-400">"export const carData = "</span> + json.<span className="text-blue-400">dumps</span>(records) + <span className="text-emerald-400">";"</span>)
                  </code>
                </pre>
              )}

              {activeCodeTab === 'typescript' && (
                <pre className="text-[12px] font-mono leading-6">
                  <code>
                    <span className="text-gray-500">// ----------------------------------------------------</span>{"\n"}
                    <span className="text-gray-500">// CLIENT-SIDE REACT STATE AGGREGATOR</span>{"\n"}
                    <span className="text-gray-500">// ----------------------------------------------------</span>{"\n"}
                    <span className="text-purple-400">import</span> {"{"} useMemo {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">'react'</span>;{"\n"}
                    <span className="text-purple-400">import</span> {"{"} carData {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">'./automotiveData'</span>;{"\n"}
                    {"\n"}
                    <span className="text-gray-500">// Dynamic client-side filtering matching Tableau parameters</span>{"\n"}
                    <span className="text-purple-400">const</span> filteredRecords = <span className="text-blue-400">useMemo</span>(() =&gt; {"{"}{"\n"}
                    {"  "}<span className="text-purple-400">return</span> carData.<span className="text-blue-400">filter</span>(car =&gt; {"{"}{"\n"}
                    {"    "}<span className="text-purple-400">if</span> (fuelFilter !== <span className="text-emerald-400">'All'</span> &amp;&amp; car.f !== fuelFilter) <span className="text-purple-400">return</span> <span className="text-purple-400">false</span>;{"\n"}
                    {"    "}<span className="text-purple-400">if</span> (transFilter !== <span className="text-emerald-400">'All'</span> &amp;&amp; car.t !== transFilter) <span className="text-purple-400">return</span> <span className="text-purple-400">false</span>;{"\n"}
                    {"    "}<span className="text-purple-400">if</span> (sellerFilter !== <span className="text-emerald-400">'All'</span> &amp;&amp; car.s !== sellerFilter) <span className="text-purple-400">return</span> <span className="text-purple-400">false</span>;{"\n"}
                    {"    "}<span className="text-purple-400">if</span> (ownerFilter !== <span className="text-emerald-400">'All'</span> &amp;&amp; car.o !== ownerFilter) <span className="text-purple-400">return</span> <span className="text-purple-400">false</span>;{"\n"}
                    {"    "}<span className="text-purple-400">if</span> (car.y &lt; yearMin || car.y &gt; yearMax) <span className="text-purple-400">return</span> <span className="text-purple-400">false</span>;{"\n"}
                    {"    "}<span className="text-purple-400">return</span> <span className="text-purple-400">true</span>;{"\n"}
                    {"  "}{"}"});{"\n"}
                    {"}"}, [fuelFilter, transFilter, sellerFilter, ownerFilter, yearMin, yearMax]);{"\n"}
                    {"\n"}
                    <span className="text-gray-500">// Real-time grid aggregator (equivalent to Tableau sheets)</span>{"\n"}
                    <span className="text-purple-400">const</span> dashboardStats = <span className="text-blue-400">useMemo</span>(() =&gt; {"{"}{"\n"}
                    {"  "}<span className="text-purple-400">const</span> totalRecords = filteredRecords.length;{"\n"}
                    {"  "}<span className="text-purple-400">const</span> totalSalesVolume = filteredRecords.<span className="text-blue-400">reduce</span>((sum, car) =&gt; sum + car.p, <span className="text-amber-400">0</span>);{"\n"}
                    {"\n"}
                    {"  "}<span className="text-gray-500">// Sheet 3: Count of cars per type of dealer</span>{"\n"}
                    {"  "}<span className="text-purple-400">const</span> sellerTypes = [<span className="text-emerald-400">'Individual'</span>, <span className="text-emerald-400">'Dealer'</span>, <span className="text-emerald-400">'Trustmark Dealer'</span>];{"\n"}
                    {"  "}<span className="text-purple-400">const</span> sheet3Data = sellerTypes.<span className="text-blue-400">map</span>(seller =&gt; {"{"}{"\n"}
                    {"    "}<span className="text-purple-400">const</span> count = filteredRecords.<span className="text-blue-400">filter</span>(car =&gt; car.s === seller).length;{"\n"}
                    {"    "}<span className="text-purple-400">const</span> pct = totalRecords &gt; <span className="text-amber-400">0</span> ? (count / totalRecords) * <span className="text-amber-400">100</span> : <span className="text-amber-400">0</span>;{"\n"}
                    {"    "}<span className="text-purple-400">return</span> {"{"} seller, count, pct {"}"};{"\n"}
                    {"  "}{"}"});{"\n"}
                    {"\n"}
                    {"  "}<span className="text-purple-400">return</span> {"{"} totalRecords, totalSalesVolume, sheet3Data {"}"};{"\n"}
                    {"}"}, [filteredRecords]);
                  </code>
                </pre>
              )}

              {activeCodeTab === 'tableau' && (
                <pre className="text-[12px] font-mono leading-6">
                  <code>
                    <span className="text-gray-500">&lt;!-- ---------------------------------------------------- --&gt;</span>{"\n"}
                    <span className="text-gray-500">&lt;!-- TABLEAU PACKAGED WORKBOOK SHEET DEFINITION SCHEMA --&gt;</span>{"\n"}
                    <span className="text-gray-500">&lt;!-- ---------------------------------------------------- --&gt;</span>{"\n"}
                    &lt;<span className="text-blue-400">workbook</span> version='18.1'&gt;{"\n"}
                    {"  "}&lt;<span className="text-blue-400">sheets</span>&gt;{"\n"}
                    {"    "}<span className="text-gray-500">&lt;!-- Sheet 3: Donut chart of seller type counts --&gt;</span>{"\n"}
                    {"    "}&lt;<span className="text-blue-400">sheet</span> name='Sheet 3'&gt;{"\n"}
                    {"      "}&lt;<span className="text-blue-400">datasource</span> caption='Automotive Catalog' name='federated.1a2b3c'&gt;{"\n"}
                    {"        "}&lt;<span className="text-blue-400">column</span> aggregation='Count' name='[seller_type]' role='dimension' type='nominal' /&gt;{"\n"}
                    {"        "}&lt;<span className="text-blue-400">column</span> aggregation='Sum' name='[selling_price]' role='measure' type='quantitative' /&gt;{"\n"}
                    {"      "}&lt;/<span className="text-blue-400">datasource</span>&gt;{"\n"}
                    {"      "}&lt;<span className="text-blue-400">layout</span>&gt;{"\n"}
                    {"        "}&lt;<span className="text-blue-400">shelf-sorts</span>&gt;{"\n"}
                    {"          "}&lt;<span className="text-blue-400">shelf-sort-direction</span> shelf='rows' direction='descending' /&gt;{"\n"}
                    {"        "}&lt;/<span className="text-blue-400">shelf-sorts</span>&gt;{"\n"}
                    {"      "}&lt;/<span className="text-blue-400">layout</span>&gt;{"\n"}
                    {"    "}&lt;/<span className="text-blue-400">sheet</span>&gt;{"\n"}
                    {"    "}{"\n"}
                    {"    "}<span className="text-gray-500">&lt;!-- Sheet 12: Average Kilometers driven by Fuel &amp; Transmission --&gt;</span>{"\n"}
                    {"    "}&lt;<span className="text-blue-400">sheet</span> name='Sheet 12'&gt;{"\n"}
                    {"      "}&lt;<span className="text-blue-400">datasource</span> caption='Automotive Catalog' name='federated.1a2b3c'&gt;{"\n"}
                    {"        "}&lt;<span className="text-blue-400">column</span> aggregation='Average' name='[km_driven]' role='measure' type='quantitative' /&gt;{"\n"}
                    {"        "}&lt;<span className="text-blue-400">column</span> name='[fuel]' role='dimension' type='nominal' /&gt;{"\n"}
                    {"        "}&lt;<span className="text-blue-400">column</span> name='[transmission]' role='dimension' type='nominal' /&gt;{"\n"}
                    {"      "}&lt;/<span className="text-blue-400">datasource</span>&gt;{"\n"}
                    {"    "}&lt;/<span className="text-blue-400">sheet</span>&gt;{"\n"}
                    {"  "}&lt;/<span className="text-blue-400">sheets</span>&gt;{"\n"}
                    &lt;/<span className="text-blue-400">workbook</span>&gt;
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
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

export default AutomotiveProject;
