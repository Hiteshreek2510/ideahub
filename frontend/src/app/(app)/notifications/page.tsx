"use client";

import { Bell } from "lucide-react";

export default function Notifications() {
  const notifications: any[] = [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Notifications</h1>
        <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors opacity-50 cursor-not-allowed">
          Mark all as read
        </button>
      </div>

      <div className="bg-[#121221] border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 min-h-[300px] flex items-center justify-center flex-col">
        {notifications.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-16 h-16 bg-[#1a1a2e] rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
              <Bell className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No notifications yet</h3>
            <p className="text-sm text-slate-400">When you receive requests, comments, or likes, they will appear here.</p>
          </div>
        ) : (
          notifications.map((notif, idx) => (
            // ... (rest of old render if needed, but not needed since it's 0)
            <div key={notif.id}></div>
          ))
        )}
      </div>
    </div>
  );
}
