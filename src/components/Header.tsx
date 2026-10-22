import React, { useState, useRef } from 'react';
import { useTournament } from '../context/TournamentContext';
import { useAuth } from '../context/AuthContext';
import { UGentLogo } from './UGentLogo';
import {
  Printer,
  AlertTriangle,
  ShieldCheck,
  LogOut,
  Download,
  Upload,
  Lock,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeSport,
    setActiveSport,
    activeView,
    setActiveView,
    resetScores,
    resetToDefault,
    exportData,
    importData,
  } = useTournament();

  const { isAdmin, logout, openLoginModal } = useAuth();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetType, setResetType] = useState<'scores' | 'all'>('scores');
  const [importError, setImportError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleOpenReset = () => {
    if (!isAdmin) {
      openLoginModal('Admin login required to reset scores or manage tournament data.');
      return;
    }
    setResetType('scores');
    setShowResetConfirm(true);
  };

  const handleResetExecute = () => {
    if (resetType === 'scores') {
      resetScores(activeSport);
    } else {
      resetToDefault();
    }
    setShowResetConfirm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importData(content);
        if (res.success) {
          setShowResetConfirm(false);
        } else {
          setImportError(res.error || 'Failed to import JSON data.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Zone 1: Ghent University Department of Chemistry Logo Lockup */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveView('groups');
              }}
              className="flex items-center gap-2 group"
            >
              <UGentLogo />
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold">
            <button
              onClick={() => {
                setActiveSport('foosball');
                setActiveView('groups');
              }}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeSport === 'foosball' && activeView === 'groups'
                  ? 'text-[#1E64C8] border-b-2 border-[#1E64C8]'
                  : 'text-slate-600 hover:text-[#1E64C8]'
              }`}
            >
              Department Cup Foosball
            </button>
            <button
              onClick={() => {
                setActiveSport('darts');
                setActiveView('groups');
              }}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeSport === 'darts' && activeView === 'groups'
                  ? 'text-[#1E64C8] border-b-2 border-[#1E64C8]'
                  : 'text-slate-600 hover:text-[#1E64C8]'
              }`}
            >
              Department Cup Darts
            </button>
            <button
              onClick={() => setActiveView('knockout')}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeView === 'knockout'
                  ? 'text-[#1E64C8] border-b-2 border-[#1E64C8]'
                  : 'text-slate-600 hover:text-[#1E64C8]'
              }`}
            >
              Knockout Brackets
            </button>
            <button
              onClick={() => setActiveView('teams')}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeView === 'teams'
                  ? 'text-[#1E64C8] border-b-2 border-[#1E64C8]'
                  : 'text-slate-600 hover:text-[#1E64C8]'
              }`}
            >
              Teams &amp; Rosters
            </button>
            <button
              onClick={() => setActiveView('rules')}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeView === 'rules'
                  ? 'text-[#1E64C8] border-b-2 border-[#1E64C8]'
                  : 'text-slate-600 hover:text-[#1E64C8]'
              }`}
            >
              Tournament Rules
            </button>
          </nav>

          {/* Zone 3: Primary action & utilities */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                {/* Reset Scores Button */}
                <button
                  onClick={handleOpenReset}
                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-md border border-amber-300 transition-colors cursor-pointer shrink-0"
                  title="Reset tournament scores or export backup"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Reset Scores</span>
                </button>

                {/* Explicit Admin Log Out Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-md border border-rose-200 transition-colors cursor-pointer shrink-0"
                  title="Log out from Admin mode"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openLoginModal()}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1E64C8] hover:bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 transition-colors cursor-pointer shrink-0"
                title="Admin Login"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              title="Print standings & bracket"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors no-print cursor-pointer shrink-0"
              aria-label="Print tournament"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary & Mobile Navigation Row */}
      <div className="xl:hidden border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2 bg-slate-50">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setActiveSport('foosball');
              setActiveView('groups');
            }}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeSport === 'foosball' && activeView === 'groups'
                ? 'bg-[#1E64C8] text-white'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cup Foosball
          </button>
          <button
            onClick={() => {
              setActiveSport('darts');
              setActiveView('groups');
            }}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeSport === 'darts' && activeView === 'groups'
                ? 'bg-[#1E64C8] text-white'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cup Darts
          </button>
          <button
            onClick={() => setActiveView('knockout')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeView === 'knockout' ? 'bg-[#1E64C8] text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Bracket
          </button>
          <button
            onClick={() => setActiveView('teams')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeView === 'teams' ? 'bg-[#1E64C8] text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Teams
          </button>
          <button
            onClick={() => setActiveView('rules')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeView === 'rules' ? 'bg-[#1E64C8] text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Rules
          </button>
        </div>

        {/* Mobile Admin Controls */}
        {isAdmin && (
          <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-300">
            <button
              onClick={handleOpenReset}
              className="px-2.5 py-1 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded border border-amber-300 whitespace-nowrap flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3 text-amber-600" /> Reset
            </button>
            <button
              onClick={logout}
              className="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 whitespace-nowrap flex items-center gap-1"
            >
              <LogOut className="w-3 h-3 text-rose-600" /> Log Out
            </button>
          </div>
        )}
      </div>

      {/* Confirmation & Backup Modal for Admin */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold text-slate-900">Tournament Management &amp; Backup</h3>
            </div>
            <p className="text-xs text-slate-600">
              Manage scores or backup/restore data for live server deployment.
            </p>

            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="resetOption"
                  checked={resetType === 'scores'}
                  onChange={() => setResetType('scores')}
                  className="mt-1 text-[#1E64C8] focus:ring-[#1E64C8]"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Reset match scores only</div>
                  <div className="text-xs text-slate-500">
                    Clears all results for {activeSport === 'foosball' ? 'Foosball' : 'Darts'} but keeps custom team names.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="resetOption"
                  checked={resetType === 'all'}
                  onChange={() => setResetType('all')}
                  className="mt-1 text-[#1E64C8] focus:ring-[#1E64C8]"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Full tournament factory reset</div>
                  <div className="text-xs text-slate-500">
                    Restores all Ghent University chemistry labs, rosters, and scores to default.
                  </div>
                </div>
              </label>
            </div>

            {/* Export & Import Backup Tools */}
            <div className="pt-3 border-t border-slate-200">
              <span className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider mb-2">
                Live Server Backup / Transfer
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={exportData}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-50 text-[#1E64C8] border border-blue-200 hover:bg-blue-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import JSON</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {importError && (
                <p className="text-xs text-rose-600 mt-2">{importError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetExecute}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
