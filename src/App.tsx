import React from 'react';
import { TournamentProvider, useTournament } from './context/TournamentContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { SportDashboard } from './components/SportDashboard';
import { TeamSetupView } from './components/TeamSetupView';
import { RulesView } from './components/RulesView';
import { AdminLoginModal } from './components/AdminLoginModal';

const TournamentAppContent: React.FC = () => {
  const { activeView } = useTournament();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden selection:bg-blue-600/20 selection:text-blue-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeView === 'teams' ? (
          <TeamSetupView />
        ) : activeView === 'rules' ? (
          <RulesView />
        ) : (
          <SportDashboard />
        )}
      </main>

      {/* Ghent University Academic Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1E64C8]">Ghent University</span>
            <span>·</span>
            <span>Faculty of Sciences</span>
            <span>·</span>
            <span className="font-semibold text-slate-700">Department of Chemistry</span>
          </div>
          <span className="font-mono text-slate-400">
            Foosball &amp; Darts Department Cup 2026
          </span>
        </div>
      </footer>

      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TournamentProvider>
        <TournamentAppContent />
      </TournamentProvider>
    </AuthProvider>
  );
}
