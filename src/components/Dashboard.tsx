import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Utensils, Heart, AlertCircle, ChevronRight, Plus, Calendar } from 'lucide-react';
import { mockService } from '../services/mockService';
import { FoodLog, UserProfile } from '../types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface DashboardProps {
  user: UserProfile | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [stats, setStats] = useState({
    todayLogs: 0,
    avgNyeri: 0,
    mostCommonGejala: 'Tidak Ada',
  });

  useEffect(() => {
    if (user?.uid) {
      mockService.getLogs(user.uid).then(allLogs => {
        setLogs(allLogs);
        
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayLogs = allLogs.filter(l => l.tanggal === today);
        
        const avgNyeri = todayLogs.length > 0 
          ? todayLogs.reduce((acc, curr) => acc + curr.nyeri, 0) / todayLogs.length 
          : 0;

        // Simple most common gejala logic
        const gejalaCounts: Record<string, number> = {};
        todayLogs.forEach(l => {
          l.gejala.forEach(g => {
            if (g !== 'Tidak Ada Gejala') {
              gejalaCounts[g] = (gejalaCounts[g] || 0) + 1;
            }
          });
        });
        
        const mostCommon = Object.entries(gejalaCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Tidak Ada';

        setStats({
          todayLogs: todayLogs.length,
          avgNyeri: Math.round(avgNyeri * 10) / 10,
          mostCommonGejala: mostCommon,
        });
      });
    }
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Welcome Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <img 
            src="/fluent_shape-organic-16-filled%20(1).png" 
            alt="" 
            className="absolute top-[-100px] right-[-100px] w-64 h-64 object-contain opacity-20 pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-stoma-dark mb-2">
              Halo, <span className="text-stoma-green">{user?.displayName || 'Keluarga StomaCare'}</span>
            </h1>
            <p className="text-gray-400 font-medium">Bagaimana kondisi lambungmu hari ini?</p>
          </div>
          <Link 
            to="/diary"
            className="bg-stoma-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl btn-hover no-underline z-10"
          >
            <Plus className="w-5 h-5" /> Catat Makan Baru
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={<Utensils className="w-6 h-6" />} 
            label="Makan Hari Ini" 
            value={`${stats.todayLogs} Kali`} 
            color="bg-stoma-pale text-stoma-green"
          />
          <StatCard 
            icon={<Activity className="w-6 h-6" />} 
            label="Rata-rata Nyeri" 
            value={`${stats.avgNyeri}/10`} 
            color="bg-orange-50 text-orange-600"
          />
          <StatCard 
            icon={<AlertCircle className="w-6 h-6" />} 
            label="Gejala Terbanyak" 
            value={stats.mostCommonGejala} 
            color="bg-red-50 text-red-600"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Recent Activity */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stoma-dark flex items-center gap-2">
              <Calendar className="w-5 h-5 text-stoma-light" /> Aktivitas Terakhir
            </h2>
            
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="bg-white rounded-[32px] p-12 text-center border border-gray-100 shadow-sm">
                  <p className="text-gray-400">Belum ada aktivitas tercatat.</p>
                </div>
              ) : (
                logs.slice().reverse().slice(0, 5).map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 bg-stoma-pale rounded-2xl flex items-center justify-center text-stoma-green shrink-0">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-stoma-green bg-stoma-pale px-2 py-0.5 rounded-md">
                          {log.waktu}
                        </span>
                        <span className="text-[10px] font-bold text-gray-300">
                          {format(new Date(log.tanggal), 'd MMM yyyy')}
                        </span>
                      </div>
                      <h3 className="font-bold text-stoma-dark truncate">{log.makanan}</h3>
                      <p className="text-xs text-gray-400 truncate">Gejala: {log.gejala.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-stoma-dark">{log.nyeri}/10</div>
                      <div className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Nyeri</div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {logs.length > 5 && (
              <Link to="/diary" className="text-stoma-green font-bold text-sm flex items-center gap-1 hover:underline no-underline justify-center">
                Lihat Semua Riwayat <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Health Tips / Family Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stoma-dark flex items-center gap-2">
              <Heart className="w-5 h-5 text-stoma-light" /> Tips Sehat
            </h2>
            
            <div className="bg-stoma-dark rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="font-bold mb-4 relative z-10">Pola Makan 3J</h3>
              <ul className="space-y-4 text-sm text-white/70 list-none p-0 relative z-10">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-stoma-green rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                  <span><strong>Jadwal:</strong> Makan tepat waktu setiap hari.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-stoma-green rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                  <span><strong>Jumlah:</strong> Porsi kecil tapi sering lebih baik.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-stoma-green rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
                  <span><strong>Jenis:</strong> Hindari makanan pedas, asam, dan berlemak.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-stoma-dark mb-4">Butuh Bantuan?</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Jika gejala berlanjut atau nyeri semakin parah, segera konsultasikan dengan dokter spesialis penyakit dalam.
              </p>
              <Link 
                to="/about"
                className="text-stoma-green font-bold text-sm flex items-center gap-1 hover:underline no-underline"
              >
                Pelajari Gejala <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex items-center gap-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-extrabold text-gray-300 uppercase tracking-wider mb-1">{label}</div>
        <div className="text-2xl font-bold text-stoma-dark">{value}</div>
      </div>
    </div>
  );
}
