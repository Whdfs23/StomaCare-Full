import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Plus, Activity, Heart, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-visible">
        <div className="absolute top-0 right-0 w-[52vw] max-w-[780px] h-full pointer-events-none overflow-hidden z-1">
          {/* Green Blob Asset */}
          <img 
            src="/fluent_shape-organic-16-filled%20(1).png" 
            alt="Organic Shape" 
            className="corner-blob absolute top-[-10%] right-[-20%] w-[150%] h-auto object-contain opacity-40"
            referrerPolicy="no-referrer"
          />
          
          {/* Stomach Silhouette Asset */}
          <img 
            src="/Vector%20(1).png" 
            alt="Stomach Silhouette" 
            className="corner-stomach absolute top-[15%] right-[10%] w-[70%] h-auto object-contain opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="container mx-auto px-6 md:px-20 z-10">
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-bold leading-tight mb-6"
            >
              Sayangi Lambungmu,<br />
              <span className="text-stoma-light brightness-90">Hidup Lebih Nyaman</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            >
              Pelajari cara menjaga kesehatan lambung, kenali gejala awalnya, dan temukan pola hidup sehat bersama StomaCare.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link 
                to="/login"
                className="bg-stoma-green text-white px-8 py-4 rounded-2xl font-bold text-lg btn-hover shadow-lg no-underline inline-flex items-center justify-center gap-2"
              >
                Mulai Jurnal Makan <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-20 py-32 bg-gray-50 rounded-t-[50px]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-2">Kenali Masalah Lambungmu</h2>
            <h2 className="text-4xl font-bold text-stoma-light brightness-90">Lebih Dalam</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Gastritis Card */}
            <div className="relative group">
              <div className="absolute top-[-14px] right-[-14px] w-full h-full bg-stoma-green rounded-[32px] opacity-10 z-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"></div>
              <div className="layered-card">
                <div className="card-icon">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-2xl mb-4 text-stoma-dark">Gastritis (Maag)</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    Gastritis adalah peradangan pada dinding lambung. Ini bisa terjadi secara tiba-tiba (akut) atau perlahan seiring waktu (kronis).
                  </p>
                  <ul className="flex-1 space-y-2 text-xs text-gray-400 list-none p-0">
                    <li className="flex items-center gap-2">• Nyeri menusuk atau panas di ulu hati.</li>
                    <li className="flex items-center gap-2">• Perut terasa penuh setelah makan.</li>
                    <li className="flex items-center gap-2">• Mual dan muntah (terkadang berdarah jika parah).</li>
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link 
                      to="/about"
                      className="bg-stoma-green text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 btn-hover text-sm no-underline"
                    >
                      Pelajari Lebih Lanjut <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* GERD Card */}
            <div className="relative group md:mt-12">
              <div className="absolute bottom-[14px] left-[14px] w-full h-full bg-stoma-green rounded-[32px] opacity-10 z-0 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-300"></div>
              <div className="layered-card">
                <div className="card-icon">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-2xl mb-4 text-stoma-dark">GERD</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    GERD terjadi ketika asam lambung berulang kali naik ke kerongkongan karena katup perut melemah.
                  </p>
                  <ul className="flex-1 space-y-2 text-xs text-gray-400 list-none p-0">
                    <li className="flex items-center gap-2">• Sensasi terbakar di dada (heartburn) menjalar ke leher.</li>
                    <li className="flex items-center gap-2">• Rasa asam atau pahit di belakang mulut.</li>
                    <li className="flex items-center gap-2">• Batuk kronis atau kesulitan menelan.</li>
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link 
                      to="/about"
                      className="bg-stoma-green text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 btn-hover text-sm no-underline"
                    >
                      Pelajari Lebih Lanjut <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="px-6 md:px-20 py-24 bg-white">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -inset-1 bg-stoma-light/15 rounded-[3rem] -z-10 blur-sm"></div>
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-stoma-light/30 border-t-4 border-t-stoma-green shadow-xl">
            <div className="flex items-center gap-3 mb-10">
              <h3 className="text-2xl font-bold text-stoma-dark">Referensi & Wawasan Medis</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <a 
                href="https://ayosehat.kemkes.go.id/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 rounded-3xl bg-stoma-pale/20 border border-gray-50 hover:bg-stoma-pale/40 transition-all no-underline"
              >
                <ExternalLink className="w-5 h-5 text-stoma-light mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-stoma-green text-lg">Kementerian Kesehatan RI</h4>
                  <p className="text-xs text-gray-500">Panduan Pencegahan dan Pengendalian Penyakit Pencernaan.</p>
                </div>
              </a>
              <a 
                href="https://www.mayoclinic.org/diseases-conditions/gerd/symptoms-causes/syc-20361940" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 rounded-3xl bg-stoma-pale/20 border border-gray-50 hover:bg-stoma-pale/40 transition-all no-underline"
              >
                <ExternalLink className="w-5 h-5 text-stoma-light mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-stoma-green text-lg">Mayo Clinic (Gastroenterology)</h4>
                  <p className="text-xs text-gray-500">Diagnosis dan Perawatan Terkini untuk Asam Lambung & GERD.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-6xl mx-auto bg-stoma-light rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-stoma-dark mb-6">Mulai Pantau Kondisi Lambungmu Hari Ini!</h2>
            <p className="text-stoma-dark/60 text-lg mb-12 max-w-2xl mx-auto">
              Akses fitur eksklusif: Pengecekan Gejala, Pengingat Jadwal Makan & Obat, serta Ensiklopedia Makanan yang aman untuk lambung.
            </p>
            <Link 
              to="/login"
              className="bg-white text-stoma-dark px-12 py-4 rounded-full font-bold shadow-md btn-hover no-underline inline-block"
            >
              Daftar Gratis Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
