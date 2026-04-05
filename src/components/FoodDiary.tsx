import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Utensils, GlassWater, Info, Trash2, Check, RotateCcw, Sun, CloudSun, Moon, Cookie, ClipboardCheck, History } from 'lucide-react';
import { clsx } from 'clsx';
import { mockService } from '../services/mockService';
import { FoodLog, MealTime, UserProfile } from '../types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface FoodDiaryProps {
  user: UserProfile | null;
}

const NYERI_LABELS = [
  "Tidak ada nyeri",
  "Sangat ringan",
  "Ringan",
  "Ringan–Sedang",
  "Sedang",
  "Sedang–Berat",
  "Berat",
  "Berat sekali",
  "Sangat Berat",
  "Hampir Tak Tertahankan",
  "Tak Tertahankan"
];

const GEJALA_OPTIONS = [
  { label: 'Nyeri Ulu Hati', emoji: '🔥' },
  { label: 'Mual', emoji: '🤢' },
  { label: 'Heartburn', emoji: '💢' },
  { label: 'Kembung', emoji: '🫧' },
  { label: 'Mulas', emoji: '😣' },
  { label: 'Tidak Ada Gejala', emoji: '✅' },
];

export default function FoodDiary({ user }: FoodDiaryProps) {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [waktu, setWaktu] = useState<MealTime | ''>('');
  const [tanggal, setTanggal] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [makanan, setMakanan] = useState('');
  const [minuman, setMinuman] = useState('');
  const [porsi, setPorsi] = useState('');
  const [gejala, setGejala] = useState<string[]>([]);
  const [nyeri, setNyeri] = useState(0);
  const [kondisi, setKondisi] = useState('');
  const [catatan, setCatatan] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSaved, setLastSaved] = useState<FoodLog | null>(null);

  useEffect(() => {
    if (user?.uid) {
      mockService.getLogs(user.uid).then(setLogs);
    }
  }, [user]);

  const toggleGejala = (label: string) => {
    setGejala(prev => 
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!waktu) newErrors.waktu = 'Pilih waktu makan terlebih dahulu.';
    if (!tanggal) newErrors.tanggal = 'Tanggal tidak boleh kosong.';
    if (!makanan.trim()) newErrors.makanan = 'Masukkan makanan yang dikonsumsi.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const newLog = await mockService.saveLog({
      userId: user?.uid || 'guest',
      tanggal,
      waktu: waktu as MealTime,
      makanan,
      minuman,
      porsi,
      gejala: gejala.length > 0 ? gejala : ['Tidak Ada Gejala'],
      nyeri,
      kondisi,
      catatan,
    });

    setLogs(prev => [...prev, newLog]);
    setLastSaved(newLog);
    resetForm();
    
    // Scroll to result
    setTimeout(() => {
      document.getElementById('hasilCard')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = async (id: string) => {
    await mockService.deleteLog(id);
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  const resetForm = () => {
    setWaktu('');
    setMakanan('');
    setMinuman('');
    setPorsi('');
    setGejala([]);
    setNyeri(0);
    setKondisi('');
    setCatatan('');
    setErrors({});
  };

  const getNyeriColor = (val: number) => {
    if (val <= 2) return { bg: 'bg-green-100', text: 'text-green-800' };
    if (val <= 5) return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    if (val <= 7) return { bg: 'bg-orange-100', text: 'text-orange-800' };
    return { bg: 'bg-red-100', text: 'text-red-800' };
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Strip */}
      <div className="bg-stoma-dark pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Calendar className="w-3 h-3" />
            {format(new Date(), 'EEEE, d MMMM yyyy', { locale: id })}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Jurnal Makan Harian</h1>
          <p className="text-white/60 text-sm md:text-base max-w-lg">
            Catat setiap asupan makanan dan minumanmu, pantau gejala setelah makan, dan kenali pola lambungmu setiap hari.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8">
        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-4">
            <div className="w-10 h-10 bg-stoma-pale rounded-xl flex items-center justify-center text-stoma-green">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-stoma-dark">Catat Makan Baru</h2>
              <p className="text-xs text-gray-400">Isi form di bawah lalu klik Simpan Catatan</p>
            </div>
          </div>

          <div className="p-8">
            {/* Waktu Makan */}
            <div className="mb-8">
              <label className="block text-[11px] font-extrabold text-stoma-dark uppercase tracking-wider mb-4">
                Waktu Makan <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                <WaktuPill 
                  active={waktu === 'Pagi'} 
                  onClick={() => setWaktu('Pagi')}
                  icon={<Sun className="w-4 h-4 text-yellow-500" />}
                  label="Pagi"
                />
                <WaktuPill 
                  active={waktu === 'Siang'} 
                  onClick={() => setWaktu('Siang')}
                  icon={<CloudSun className="w-4 h-4 text-orange-500" />}
                  label="Siang"
                />
                <WaktuPill 
                  active={waktu === 'Malam'} 
                  onClick={() => setWaktu('Malam')}
                  icon={<Moon className="w-4 h-4 text-indigo-500" />}
                  label="Malam"
                />
                <WaktuPill 
                  active={waktu === 'Camilan'} 
                  onClick={() => setWaktu('Camilan')}
                  icon={<Cookie className="w-4 h-4 text-pink-500" />}
                  label="Camilan"
                />
              </div>
              {errors.waktu && <p className="text-red-500 text-[11px] font-bold mt-2">{errors.waktu}</p>}
            </div>

            <div className="space-y-6">
              {/* Tanggal */}
              <FormField label="Tanggal" required error={errors.tanggal}>
                <div className="relative">
                  <input 
                    type="date" 
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className={clsx("f-input", errors.tanggal && "border-red-500")}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stoma-light" />
                </div>
              </FormField>

              {/* Makanan */}
              <FormField label="Makanan" required error={errors.makanan}>
                <div className="relative">
                  <input 
                    type="text" 
                    value={makanan}
                    onChange={(e) => setMakanan(e.target.value)}
                    placeholder="Contoh: Nasi goreng, tempe bacem, sup bayam…"
                    className={clsx("f-input", errors.makanan && "border-red-500")}
                  />
                  <Utensils className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stoma-light" />
                </div>
              </FormField>

              {/* Minuman */}
              <FormField label="Minuman">
                <div className="relative">
                  <input 
                    type="text" 
                    value={minuman}
                    onChange={(e) => setMinuman(e.target.value)}
                    placeholder="Contoh: Air putih, teh hangat tanpa gula…"
                    className="f-input"
                  />
                  <GlassWater className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stoma-light" />
                </div>
              </FormField>

              {/* Porsi */}
              <FormField label="Porsi">
                <select 
                  value={porsi}
                  onChange={(e) => setPorsi(e.target.value)}
                  className="f-input appearance-none"
                >
                  <option value="">— Pilih Porsi —</option>
                  <option>Sedikit (¼ porsi)</option>
                  <option>Setengah (½ porsi)</option>
                  <option>Normal (1 porsi)</option>
                  <option>Banyak (1½ porsi)</option>
                  <option>Sangat Banyak (2+ porsi)</option>
                </select>
              </FormField>

              {/* Gejala */}
              <FormField label="Gejala Setelah Makan">
                <div className="grid grid-cols-2 gap-2">
                  {GEJALA_OPTIONS.map((opt) => (
                    <div 
                      key={opt.label}
                      onClick={() => toggleGejala(opt.label)}
                      className={clsx(
                        "gejala-item",
                        gejala.includes(opt.label) && "checked"
                      )}
                    >
                      <span className="text-lg">{opt.emoji}</span>
                      <span className="text-xs font-bold">{opt.label}</span>
                    </div>
                  ))}
                </div>
              </FormField>

              {/* Nyeri */}
              <FormField label="Tingkat Nyeri">
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400">
                    <span>0 – Tidak Nyeri</span>
                    <span>5 – Sedang</span>
                    <span>10 – Parah</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={nyeri}
                    onChange={(e) => setNyeri(parseInt(e.target.value))}
                    className="nyeri-slider"
                  />
                  <div className="flex items-center gap-3">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-xs font-extrabold min-w-[36px] text-center",
                      getNyeriColor(nyeri).bg,
                      getNyeriColor(nyeri).text
                    )}>
                      {nyeri}
                    </span>
                    <span className="text-sm font-semibold text-stoma-dark">
                      {NYERI_LABELS[nyeri]}
                    </span>
                  </div>
                </div>
              </FormField>

              {/* Kondisi */}
              <FormField label="Kondisi Lambung">
                <select 
                  value={kondisi}
                  onChange={(e) => setKondisi(e.target.value)}
                  className="f-input appearance-none"
                >
                  <option value="">— Pilih Kondisi —</option>
                  <option>Sangat Baik 😊</option>
                  <option>Baik 🙂</option>
                  <option>Netral 😐</option>
                  <option>Kurang Nyaman 😕</option>
                  <option>Tidak Nyaman / Sakit 😣</option>
                </select>
              </FormField>

              {/* Catatan */}
              <FormField label="Catatan">
                <textarea 
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tambahkan catatan, misal: makan terlalu cepat, makan sambil rebahan, dll…"
                  className="f-input min-h-[100px] py-3"
                />
                <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Opsional. Catatan membantu kamu mengidentifikasi pemicu gejala.
                </p>
              </FormField>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <button 
                onClick={handleSave}
                className="bg-stoma-dark text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg btn-hover"
              >
                <Check className="w-4 h-4" /> Simpan Catatan
              </button>
              <button 
                onClick={resetForm}
                className="bg-white border-2 border-stoma-light/40 text-gray-400 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Last Saved Result */}
        <AnimatePresence>
          {lastSaved && (
            <motion.div 
              id="hasilCard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border-2 border-stoma-green/20"
            >
              <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-4 bg-stoma-pale/20">
                <div className="w-10 h-10 bg-stoma-green text-white rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-stoma-dark">Catatan Berhasil Disimpan!</h2>
                  <p className="text-xs text-gray-400">Berikut ringkasan data yang baru saja kamu masukkan.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-px bg-gray-50">
                <ResultCell label="Waktu Makan" value={`${lastSaved.waktu} — ${format(new Date(lastSaved.tanggal), 'd MMM yyyy', { locale: id })}`} bold />
                <ResultCell label="Porsi" value={lastSaved.porsi || '—'} />
                <ResultCell label="Makanan" value={lastSaved.makanan} full />
                <ResultCell label="Minuman" value={lastSaved.minuman || '—'} full />
                <ResultCell label="Gejala" value={
                  <div className="flex flex-wrap gap-1 mt-1">
                    {lastSaved.gejala.map(g => <span key={g} className="px-2 py-0.5 bg-stoma-pale text-stoma-green border border-stoma-light/40 rounded-md text-[10px] font-bold">{g}</span>)}
                  </div>
                } full />
                <ResultCell label="Tingkat Nyeri" value={
                  <span className={clsx(
                    "px-3 py-1 rounded-full text-[10px] font-extrabold",
                    getNyeriColor(lastSaved.nyeri).bg,
                    getNyeriColor(lastSaved.nyeri).text
                  )}>
                    {lastSaved.nyeri}/10 — {NYERI_LABELS[lastSaved.nyeri]}
                  </span>
                } />
                <ResultCell label="Kondisi Lambung" value={lastSaved.kondisi || '—'} />
                {lastSaved.catatan && <ResultCell label="Catatan" value={lastSaved.catatan} full />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-stoma-pale rounded-xl flex items-center justify-center text-stoma-green">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-stoma-dark flex items-center gap-2">
                  Riwayat Catatan
                  <span className="bg-stoma-green text-white text-[10px] px-2 py-0.5 rounded-full">{logs.length}</span>
                </h2>
                <p className="text-xs text-gray-400">Semua catatan yang sudah kamu simpan.</p>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-50">
            {logs.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Belum ada catatan. Mulai catat makanmu hari ini!</p>
              </div>
            ) : (
              logs.slice().reverse().map((log) => (
                <div key={log.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className={clsx(
                    "px-3 py-1 rounded-full text-[10px] font-extrabold shrink-0",
                    log.waktu === 'Pagi' && "bg-yellow-100 text-yellow-800",
                    log.waktu === 'Siang' && "bg-green-100 text-green-800",
                    log.waktu === 'Malam' && "bg-indigo-100 text-indigo-800",
                    log.waktu === 'Camilan' && "bg-pink-100 text-pink-800",
                  )}>
                    {log.waktu}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-stoma-dark truncate">{log.makanan}</div>
                    <div className="text-[10px] text-gray-400 truncate">
                      {format(new Date(log.tanggal), 'd MMM yyyy')} · Gejala: {log.gejala.join(', ')}
                    </div>
                  </div>
                  <div className={clsx(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0",
                    getNyeriColor(log.nyeri).bg,
                    getNyeriColor(log.nyeri).text
                  )}>
                    Nyeri {log.nyeri}/10
                  </div>
                  <button 
                    onClick={() => handleDelete(log.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WaktuPill({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <div 
      onClick={onClick}
      className={clsx("waktu-pill", active && "active")}
    >
      {icon} {label}
    </div>
  );
}

function FormField({ label, required, error, children }: { label: string, required?: boolean, error?: string, children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[150px_1fr] gap-4 items-start">
      <label className="text-[11px] font-extrabold text-stoma-dark uppercase tracking-wider pt-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full">
        {children}
        {error && <p className="text-red-500 text-[11px] font-bold mt-1">{error}</p>}
      </div>
    </div>
  );
}

function ResultCell({ label, value, bold, full }: { label: string, value: React.ReactNode, bold?: boolean, full?: boolean }) {
  return (
    <div className={clsx("bg-white p-5", full && "col-span-full")}>
      <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={clsx("text-sm text-stoma-dark", bold ? "font-extrabold" : "font-semibold")}>
        {value}
      </div>
    </div>
  );
}
