
import React from 'react';
import { FileText, BookOpen, Target, Clock, ArrowUpRight } from 'lucide-react';
import { storageService } from '../services/storageService';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const docs = storageService.getDocuments();
  const sets = storageService.getFlashcardSets();
  const activities = storageService.getActivities();

  const stats = [
    { label: 'Documents', value: docs.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Study Sets', value: sets.length, icon: BookOpen, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Daily Goal', value: '75%', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Time Spent', value: '2.4h', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Welcome back, Scholar</h1>
          <p className="text-slate-500 mt-1 font-medium text-lg">Continue your learning journey where you left off.</p>
        </div>
        <Link to="/documents" className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all">
          Upload New Material
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Recent Activity</h2>
          <div className="space-y-6">
            {activities.length > 0 ? activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start p-4 hover:bg-slate-50 rounded-2xl transition-all">
                <div className="mt-1 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800 leading-tight">{activity.description}</p>
                  <p className="text-xs text-slate-400 mt-1 font-black uppercase tracking-widest">{new Date(activity.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            )) : (
              <p className="text-center py-10 text-slate-400 font-bold">No recent activities found.</p>
            )}
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="text-2xl font-black mb-4 relative z-10">Smart Progress</h2>
          <p className="text-slate-400 mb-10 relative z-10 font-medium">Keep going! You're in the top 10% of active scholars this week.</p>
          
          <div className="space-y-6 relative z-10">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Next Lesson</h4>
                  <p className="text-xs text-slate-400">Mastering React Hooks</p>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-slate-500 group-hover:text-white transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
