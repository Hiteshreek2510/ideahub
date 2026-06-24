"use client";

import { useState } from "react";
import { 
  Users, 
  MoreVertical, 
  Video, 
  Phone, 
  GitBranch, 
  Shield, 
  Send, 
  Search,
  FileLock
} from "lucide-react";

export default function Community() {
  const [activeGroup, setActiveGroup] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  const groups: any[] = [];

  const currentGroup = groups.find(g => g.id === activeGroup);

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Left Sidebar - Group List */}
      <div className="w-full md:w-80 border-r border-white/5 bg-[#070710] flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Community</h2>
          <div className="relative opacity-50 pointer-events-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search groups..." 
              className="w-full bg-[#121221] border border-white/5 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
              disabled
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-[#1a1a2e] rounded-full flex items-center justify-center mb-3 border border-white/5">
            <Users className="w-5 h-5 text-slate-600" />
          </div>
          <p className="text-slate-300 text-sm font-medium mb-1">No groups yet</p>
          <p className="text-slate-500 text-xs">Join a project to start collaborating with others.</p>
        </div>
      </div>

      {/* Right Content - Chat Area */}
      {currentGroup ? (
        <div className="hidden md:flex flex-col flex-1 bg-[#0a0a14]">
          {/* Chat Header */}
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0c0c1a]">
            <div className="flex items-center gap-3">
              <img src={currentGroup.avatar} alt="" className="w-8 h-8 rounded-lg object-cover border border-white/10" />
              <div>
                <h2 className="font-semibold text-white text-sm">{currentGroup.name}</h2>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {currentGroup.members} members
                </span>
              </div>
            </div>

            {/* 3 Dots Menu Container */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#121221] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white text-left">
                    <Video className="w-4 h-4 text-teal-400" />
                    Video Call
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white text-left">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    Voice Call
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white text-left">
                    <GitBranch className="w-4 h-4 text-slate-100" />
                    GitHub Collab
                  </button>

                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <button 
                    onClick={() => alert("Private document access granted to this user. They can now decrypt and view it!")}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 text-left"
                  >
                    <FileLock className="w-4 h-4" />
                    Share Private Document
                  </button>
                  
                  {/* Admin Only Option */}
                  {currentGroup.isAdmin && (
                    <>
                      <div className="h-px bg-white/10 my-1 mx-2" />
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-left">
                        <Shield className="w-4 h-4" />
                        Update Permissions
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <div className="self-center bg-white/5 text-slate-400 text-xs px-3 py-1 rounded-full mb-4">
              Today
            </div>
            
            <div className="flex gap-3">
              <img src="https://i.pravatar.cc/150?u=5" className="w-8 h-8 rounded-full border border-white/5" alt="user" />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-medium text-purple-400">David</span>
                  <span className="text-[10px] text-slate-500">10:42 AM</span>
                </div>
                <div className="bg-[#1a1a2e] text-slate-200 p-3 rounded-2xl rounded-tl-sm text-sm border border-white/5">
                  Does everyone have access to the new repo?
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <img src="https://i.pravatar.cc/150?u=my_user" className="w-8 h-8 rounded-full border border-white/5" alt="me" />
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                  <span className="text-sm font-medium text-teal-400">You</span>
                  <span className="text-[10px] text-slate-500">10:45 AM</span>
                </div>
                <div className="bg-purple-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-lg shadow-purple-600/20">
                  Yes, just cloned it. Going through the documentation now.
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/5 bg-[#070710]">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder={`Message ${currentGroup.name}...`}
                className="w-full bg-[#121221] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
              />
              <button className="absolute right-2 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-lg shadow-purple-600/20">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#0a0a14]">
          <div className="text-center">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300">Select a community group</h3>
            <p className="text-sm text-slate-500 mt-1">Choose a project team to start collaborating</p>
          </div>
        </div>
      )}

    </div>
  );
}
