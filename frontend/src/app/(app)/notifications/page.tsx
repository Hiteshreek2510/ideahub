"use client";

import { Heart, MessageCircle, UserPlus, CheckCircle2 } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?u=4",
      content: "liked your idea 'Decentralized Identity Protocol'",
      time: "10 minutes ago",
      icon: Heart,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-500/10",
      unread: true
    },
    {
      id: 2,
      type: "comment",
      user: "David Kumar",
      avatar: "https://i.pravatar.cc/150?u=3",
      content: "commented on 'AI-Powered Visual Navigation Tool': This is brilliant! Have you considered...",
      time: "1 hour ago",
      icon: MessageCircle,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
      unread: true
    },
    {
      id: 3,
      type: "request",
      user: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=2",
      content: "requested to join your team for 'CarbonTrace'",
      time: "3 hours ago",
      icon: UserPlus,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/10",
      unread: false
    },
    {
      id: 4,
      type: "accepted",
      user: "Alex Morgan",
      avatar: "https://i.pravatar.cc/150?u=1",
      content: "accepted your collaboration request for 'NeuroNav'",
      time: "1 day ago",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      unread: false
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Notifications</h1>
        <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="bg-[#121221] border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        {notifications.map((notif, idx) => (
          <div 
            key={notif.id} 
            className={`p-5 flex items-start gap-4 transition-colors ${notif.unread ? 'bg-[#1a1a2e]/50' : 'hover:bg-white/5'} ${idx !== notifications.length - 1 ? 'border-b border-white/5' : ''}`}
          >
            <div className="relative shrink-0 mt-1">
              <img src={notif.avatar} alt={notif.user} className="w-12 h-12 rounded-full object-cover border border-white/10" />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#121221] ${notif.iconBg}`}>
                <notif.icon className={`w-3 h-3 ${notif.iconColor}`} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300 leading-snug">
                <span className="font-semibold text-white">{notif.user}</span> {notif.content}
              </p>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">{notif.time}</p>
              
              {/* Actions for collaboration requests */}
              {notif.type === "request" && (
                <div className="flex gap-2 mt-3">
                  <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-purple-600/20">
                    Accept
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-white/10">
                    Decline
                  </button>
                </div>
              )}
            </div>

            {notif.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
