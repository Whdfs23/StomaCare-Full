import React from 'react';
import { motion } from 'motion/react';
import { Info, Heart, Activity, Shield, Users, Mail, Phone, MapPin, User } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-stoma-dark mb-6"
          >
            Tentang <span className="text-stoma-green">StomaCare</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Misi kami adalah membantu setiap keluarga Indonesia memahami dan menjaga kesehatan lambung melalui teknologi yang mudah digunakan.
          </motion.p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Visi & Misi */}
          <section className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-stoma-pale rounded-2xl flex items-center justify-center text-stoma-green">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-stoma-dark">Visi & Misi Kami</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-bold text-stoma-green mb-3">Visi</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Menjadi platform kesehatan pencernaan nomor satu di Indonesia yang mengedepankan edukasi dan pencegahan dini.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-stoma-green mb-3">Misi</h3>
                <ul className="text-gray-500 text-sm space-y-2 list-none p-0">
                  <li>• Menyediakan alat pemantauan kesehatan yang akurat.</li>
                  <li>• Memberikan edukasi medis yang mudah dipahami.</li>
                  <li>• Membangun komunitas sadar kesehatan lambung.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tim Kami */}
          <section className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-stoma-pale rounded-2xl flex items-center justify-center text-stoma-green">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-stoma-dark">Tim Pengembang</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              StomaCare dikembangkan oleh tim yang peduli dengan kesehatan masyarakat, menggabungkan keahlian teknologi dan wawasan medis.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <TeamMember name="Danar Husain" role="Lead Developer" />
              <TeamMember name="Kelompok StomaCare" role="Product Design" />
              <TeamMember name="Rombel 2" role="Research & Data" />
            </div>
          </section>

          {/* Kontak */}
          <section className="bg-stoma-dark rounded-[40px] p-10 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8">Hubungi Kami</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <ContactItem icon={<Mail className="w-5 h-5" />} label="Email" value="danarhusain@gmail.com" />
                <ContactItem icon={<Phone className="w-5 h-5" />} label="Telepon" value="+62 812-3456-7890" />
                <ContactItem icon={<MapPin className="w-5 h-5" />} label="Lokasi" value="Jakarta, Indonesia" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TeamMember({ name, role }: { name: string, role: string }) {
  return (
    <div className="text-center p-6 rounded-3xl bg-gray-50 border border-gray-100">
      <div className="w-16 h-16 bg-stoma-light/30 rounded-full mx-auto mb-4 flex items-center justify-center">
        <User className="w-8 h-8 text-stoma-green" />
      </div>
      <div className="font-bold text-stoma-dark text-sm">{name}</div>
      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{role}</div>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
