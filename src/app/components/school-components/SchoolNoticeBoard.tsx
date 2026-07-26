export default function SchoolNoticeBoard() {
  // 🚀 Dummy Notices (Future mein ye Database se aayenge)
  const notices = [
    { id: 1, date: "24 July", title: "Admissions Open for Session 2026-27", type: "Important" },
    { id: 2, date: "20 July", title: "PTM Scheduled for Classes 1 to 5", type: "Event" },
    { id: 3, date: "15 July", title: "School closed on account of heavy rain", type: "Alert" },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          📢 Notice Board
        </h2>
        <button className="text-sm font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
            {/* Date Badge */}
            <div className="bg-slate-100 text-slate-600 rounded-lg p-2 text-center min-w-[70px] h-max group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="block text-xs font-bold uppercase">{notice.date.split(' ')[1]}</span>
              <span className="block text-xl font-black leading-none">{notice.date.split(' ')[0]}</span>
            </div>
            
            {/* Notice Content */}
            <div className="flex-grow">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded ${
                notice.type === 'Alert' ? 'bg-red-100 text-red-700' : 
                notice.type === 'Important' ? 'bg-blue-100 text-blue-700' : 
                'bg-emerald-100 text-emerald-700'
              }`}>
                {notice.type}
              </span>
              <h3 className="font-bold text-slate-800 mt-2 group-hover:text-blue-600 transition-colors">
                {notice.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}