import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, MapPin, Search, ArrowLeft, CheckCircle, MessageSquare, Share2, Download, Eye, Loader2, FileWarning } from 'lucide-react'
import api from '../services/api'
import { getCarImage } from '../utils/imageUtils'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


export const ReportPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carData, setCarData] = useState<any>(null)
  const [reportData, setReportData] = useState<any>(null)
  const [mechanics, setMechanics] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f8fafc',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 16;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 8;

      pdf.addImage(imgData, 'PNG', 8, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 16);

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 8;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 8, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 16);
      }

      const fileName = carData 
        ? `CarSaga_Report_${carData.year}_${carData.make}_${carData.model}.pdf`
        : `CarSaga_Report.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('PDF export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the car
        const { data: car } = await api.get(`/cars/${id}`);
        setCarData(car);

        // Fetch the report for this car
        try {
          const { data: report } = await api.get(`/reports/car/${id}`);
          setReportData(report);
        } catch {
          // No report found
          setReportData(null);
        }

        // Fetch mechanics from API
        try {
          const { data: mechanicsData } = await api.get('/mechanics');
          setMechanics(mechanicsData);
        } catch {
          setMechanics([]);
        }
      } catch (err) {
        console.error('Failed to fetch car details', err);
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, navigate]);

  if (isLoading) {
    return <div className="min-h-screen bg-[var(--color-bg-deep)] flex items-center justify-center"><Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin" /></div>;
  }

  // Derive display data from live API responses
  const overallScore = reportData?.overallScore ?? 0;
  const issues = reportData?.issues || [];
  const maintenanceData = reportData?.maintenanceForecast?.map((f: any) => ({ year: f.year, cost: f.estimatedCost })) || [];
  const vehicleSpecs = reportData?.vehicleSpecs || {};
  const summary = reportData?.summary || '';
  const challan = reportData?.challanData || carData?.challanStatus;
  // Odometer: prefer report's AI estimate, fall back to the car's actual mileage field
  const odometerDisplay = vehicleSpecs.odometerEstimate || (carData?.mileage != null ? `${carData.mileage.toLocaleString('en-IN')} km` : 'N/A');

  const overviewStats = [
    { label: 'Condition', value: `${(overallScore / 10).toFixed(1)}/10`, color: overallScore >= 80 ? 'var(--color-emerald)' : overallScore >= 60 ? 'var(--color-warning)' : 'var(--color-primary)' },
    { label: 'Issues', value: issues.length.toString(), color: issues.length === 0 ? 'var(--color-emerald)' : 'var(--color-primary)' },
    { label: 'Risk', value: (carData?.riskLevel || 'low').toUpperCase(), color: carData?.riskLevel === 'low' ? 'var(--color-emerald)' : carData?.riskLevel === 'high' ? '#ef4444' : 'var(--color-warning)' },
  ];

  const findings = issues.map((issue: any) => ({
    label: `${issue.location}: ${issue.type}`,
    severity: issue.severity === 'critical' ? 'warning' : 'info',
    cost: issue.estimatedRepairCost > 0 ? `₹${issue.estimatedRepairCost.toLocaleString('en-IN')}` : 'Monitor',
  }));

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-[var(--color-border-glass)] px-4 sm:px-6 py-3 sm:py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#0f172a] transition-colors font-semibold">
              <ArrowLeft size={16} /> Dashboard
            </button>
            <div className="h-5 w-[1px] bg-gray-200" />
            <span className="text-sm font-extrabold text-[#0f172a]">Report #{id?.substring(0, 8) || '...'}</span>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto hide-scrollbar">
            <button onClick={() => navigate(`/chat?car=${id}`)} className="ghost-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0f172a] flex items-center gap-2 whitespace-nowrap shrink-0">
              <MessageSquare size={14} /> Ask Saga AI
            </button>
            <button className="ghost-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0f172a] flex items-center gap-2 whitespace-nowrap shrink-0">
              <Share2 size={14} /> Share
            </button>
            <button onClick={handleExportPDF} disabled={isExporting} className="liquid-glass-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-2 disabled:opacity-70 whitespace-nowrap shrink-0">
              {isExporting ? <><Loader2 size={14} className="animate-spin" /> Exporting...</> : <><Download size={14} /> Export PDF</>}
            </button>
          </div>
        </div>
      </nav>

      <main ref={reportRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        <div className="glow-orb w-[600px] h-[600px] bg-[var(--color-primary-light)] opacity-20 top-[10%] left-[-100px] absolute pointer-events-none" />
        
        {/* Left: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Overview Card */}
          <div className="glass-card p-8 relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-emerald)] to-transparent opacity-80" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`verified-badge px-3 py-1 text-xs font-extrabold flex items-center gap-1.5 ${
                    carData?.status === 'verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {carData?.status === 'verified' && <CheckCircle size={12} />} 
                    <span className="capitalize">{carData?.status || 'Pending'}</span>
                  </span>
                  <span className={`px-3 py-1 text-xs font-extrabold rounded-full capitalize ${
                    carData?.riskLevel === 'low' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : carData?.riskLevel === 'high' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {carData?.riskLevel || 'Medium'} Risk
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-[#0f172a]">{carData?.year} {carData?.make} {carData?.model}</h1>
                <p className="text-[var(--color-text-secondary)] text-sm font-mono font-medium drop-shadow-sm uppercase">Reg: {carData?.vin || 'N/A'}</p>
                {summary && <p className="text-xs text-[var(--color-text-muted)] mt-2 max-w-lg leading-relaxed">{summary}</p>}
              </div>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {overviewStats.map((stat, i) => (
                  <div key={i} className="kpi-card px-5 py-4 text-center min-w-[90px] bg-gray-50 border-gray-100 shadow-sm hover:border-gray-200">
                    <p className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Analysis */}
          <div className="glass-card p-6 relative overflow-hidden bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold flex items-center gap-2 text-[#0f172a]">
                <Eye size={18} className="text-[var(--color-primary)]" /> Visual Analysis
              </h3>
              <span className="text-xs text-[var(--color-text-secondary)] font-semibold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">AI-detected findings</span>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-gray-100 border border-gray-200 mb-6">
              <img src={getCarImage(carData?.make, carData?.model, carData?.brandImage)} className="w-full h-full object-cover opacity-90" alt="Car analysis" />

              {findings.length > 0 && (
                <>
                  <div className="absolute top-[25%] right-[30%]">
                    <div className="bg-amber-500 w-4 h-4 rounded-full animate-ping absolute" />
                    <div className="bg-amber-500 w-4 h-4 rounded-full relative z-10 border-2 border-white cursor-pointer shadow-lg" />
                  </div>
                  <div className="absolute bottom-[30%] left-[20%]">
                    <div className="bg-[var(--color-primary)] w-3 h-3 rounded-full animate-ping absolute opacity-60" />
                    <div className="bg-[var(--color-primary)] w-3 h-3 rounded-full relative z-10 border-2 border-white cursor-pointer shadow-lg" />
                  </div>
                </>
              )}

              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                <span className="text-xs text-gray-200 font-medium">Click hotspots for details</span>
                <span className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <AlertTriangle size={12} /> {findings.length} Issue{findings.length !== 1 ? 's' : ''} Found
                </span>
              </div>
            </div>

            {/* Findings List */}
            <div className="space-y-3">
              {findings.length === 0 ? (
                <div className="text-center text-sm text-[var(--color-text-muted)] py-4">No issues detected — vehicle is in excellent condition!</div>
              ) : findings.map((f: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${f.severity === 'warning' ? 'bg-amber-500' : 'bg-[var(--color-primary)]'} shadow-sm`} />
                    <span className="text-sm text-[#0f172a] font-bold">{f.label}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[var(--color-text-secondary)]">{f.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Cost Chart */}
          <div className="glass-card p-6 bg-white">
            <h3 className="text-lg font-extrabold mb-6 text-[#0f172a]">Projected Maintenance Cost</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceData}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FE654F" />
                      <stop offset="100%" stopColor="#FB7A6A" opacity={0.6}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="rgba(0,0,0,0.1)" tickLine={false} axisLine={false} dy={10} tick={{ fill: '#475569', fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'var(--color-border-glass)', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: '#FE654F', fontWeight: 'extrabold' }}
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Est. Cost']}
                  />
                  <Bar dataKey="cost" fill="url(#barGrad)" radius={[8, 8, 0, 0]} barSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Vehicle Specs */}
          <div className="glass-card p-6 bg-white">
            <h3 className="text-lg font-extrabold mb-5 text-[#0f172a]">Vehicle Specs</h3>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <dt className="text-[var(--color-text-secondary)] font-medium">Reg. No.</dt>
                <dd className="font-mono text-xs font-bold text-[#0f172a]">{carData?.vin || 'N/A'}</dd>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <dt className="text-[var(--color-text-secondary)] font-medium">Make / Model</dt>
                <dd className="font-extrabold text-[#0f172a]">{carData?.make} {carData?.model}</dd>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <dt className="text-[var(--color-text-secondary)] font-medium">Year</dt>
                <dd className="font-extrabold text-[#0f172a]">{carData?.year}</dd>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <dt className="text-[var(--color-text-secondary)] font-medium">Odometer</dt>
                <dd className="font-bold text-[#0f172a]">{odometerDisplay}</dd>
              </div>
              {vehicleSpecs.previousOwners != null && (
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <dt className="text-[var(--color-text-secondary)] font-medium">Previous Owners</dt>
                <dd className="font-bold text-[#0f172a]">{vehicleSpecs.previousOwners}</dd>
              </div>
              )}
              {carData?.location && (
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <dt className="text-[var(--color-text-secondary)] font-medium">Location</dt>
                  <dd className="font-bold text-[#0f172a]">{carData.location}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Challan Status */}
          {challan && (
            <div className="glass-card p-6 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <FileWarning size={18} className={challan.totalChallan > 0 ? 'text-red-500' : 'text-emerald-500'} />
                <h3 className="text-lg font-extrabold text-[#0f172a]">Challan Status</h3>
              </div>
              <div className={`p-4 rounded-xl border text-sm ${challan.totalChallan > 0 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
                <p className="font-bold">{challan.statusMessage || 'No data'}</p>
                {challan.totalChallan > 0 && (
                  <p className="text-xs mt-1">Found {challan.totalChallan} pending challan(s).</p>
                )}
              </div>
            </div>
          )}

          {/* Nearby Mechanics */}
          <div className="glass-card p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-[#0f172a]">Nearby Mechanics</h3>
              <Search size={16} className="text-[var(--color-text-secondary)]" />
            </div>
            <p className="text-[var(--color-text-secondary)] text-xs font-medium mb-4">Book an on-site inspection before purchasing.</p>

            <div className="w-full h-40 rounded-xl overflow-hidden relative bg-gray-100 border border-gray-200 mb-4 shadow-inner">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-multiply" alt="Map" />
              <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#FE654F] drop-shadow-xl animate-bounce" />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-white to-white/0 text-center text-[10px] font-bold text-gray-500">
                Map requires API key • Mock data shown
              </div>
            </div>

            <div className="space-y-2">
              {mechanics.length === 0 ? (
                <p className="text-xs text-center text-[var(--color-text-muted)] py-3">No mechanics found nearby.</p>
              ) : mechanics.map((shop: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 cursor-pointer transition-all">
                  <div>
                    <p className="text-sm font-extrabold text-[#0f172a]">{shop.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] font-bold">
                      {shop.address}
                      {shop.rating ? <> • <span className="text-amber-500">{shop.rating}★</span></> : null}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <MapPin size={14} className="text-[var(--color-primary)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
