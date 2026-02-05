import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShieldCheck, Zap, BarChart3, Search } from 'lucide-react';

const API_BASE = "https://ecotrack-ai.onrender.com/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: '', quantity: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    try {
      const res = await axios.post(`${API_BASE}/add`, formData);

      // Check your console to see if the server is actually sending the data
      console.log("Server Response:", res.data);

      if (res.data.ecoTip) {
        // ✅ SUCCESS: Add the AI-enriched data to the UI
        setItems((prev) => [res.data, ...prev]);
      } else {
        console.error("AI data missing in server response!");
      }

      setFormData({ name: '', category: '', quantity: '' });
    } catch (err) {
      console.error("Audit Failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error("Delete Failed:", err);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Zap className="text-emerald-400 fill-emerald-400" size={32} />
            </div>
            EcoTrack <span className="text-emerald-400">AI</span>
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest">Neural Sustainability Auditor V2.0</p>
        </motion.div>

        <div className="flex gap-4">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex flex-col items-center min-w-[100px] backdrop-blur-md">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter mb-1">Eco Pulse</span>
            <span className="text-2xl font-black text-emerald-400">100%</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex flex-col items-center min-w-[100px] backdrop-blur-md">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter mb-1">AI Analyzed</span>
            <span className="text-2xl font-black text-emerald-400">{items.length}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Form */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-2xl sticky top-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BarChart3 className="text-emerald-400" size={20} /> New Audit
              </h2>
              <ShieldCheck className="text-emerald-500/40" size={20} />
            </div>

            <form onSubmit={handleAdd} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest">Asset Name</label>
                <input
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 focus:border-emerald-500/50 outline-none transition-all font-medium placeholder:text-slate-800"
                  placeholder="e.g. MacBook Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest">Units</label>
                  <input
                    type="number"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 focus:border-emerald-500/50 outline-none"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block tracking-widest">Domain</label>
                  <input
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 focus:border-emerald-500/50 outline-none"
                    placeholder="Electronics"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${isAnalyzing
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-500 text-[#020617] hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]'
                  }`}
              >
                {isAnalyzing ? "Processing Neural Link..." : "Initialize Audit"}
              </button>
            </form>
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-8">
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
            <input
              className="w-full bg-slate-900/30 border border-slate-800/50 rounded-2xl py-5 pl-14 pr-6 focus:border-emerald-500/30 outline-none transition-all placeholder:text-slate-700 font-medium"
              placeholder="Search Neural Registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item._id}
                  className="bg-slate-900/20 border border-slate-800/60 p-6 rounded-[2rem] hover:border-emerald-500/30 transition-all group relative backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest block mb-1">{item.category}</span>
                      <h3 className="text-2xl font-black tracking-tight group-hover:text-emerald-400 transition-colors capitalize">{item.name}</h3>
                    </div>
                    <button onClick={() => handleDelete(item._id)} className="text-slate-700 hover:text-rose-500 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/50 mb-6 min-h-[80px] flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                      <Zap size={12} className="fill-emerald-400" /> AI Insight
                    </div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                      "{item.ecoTip || "Neural audit pending database synchronization..."}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      <span>Footprint Intensity</span>
                      {/* FIX: Ensure the label shows the score */}
                      <span className="text-emerald-500 text-sm">{item.carbonScore || 0}%</span>
                    </div>

                    <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-800/30">
                      <motion.div
                        initial={{ width: 0 }}
                        // FIX: Use inline style for dynamic width
                        animate={{ width: `${item.carbonScore || 0}%` }}
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      />
                    </div>

                    <div className="flex justify-end pt-2 border-t border-slate-800/40">
                      <span className="text-[10px] font-bold text-slate-600 uppercase">Units <span className="text-slate-200 ml-1 text-lg font-black">{item.quantity}</span></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;