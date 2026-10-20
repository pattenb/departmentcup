import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { useAuth } from '../context/AuthContext';
import { Team } from '../types/tournament';
import { Edit2, Check, X, Building2, FlaskConical, Lock, Users, Mail, User } from 'lucide-react';

export const TeamSetupView: React.FC = () => {
  const {
    activeSport,
    setActiveSport,
    foosballTeams,
    dartsTeams,
    updateTeamInfo,
  } = useTournament();

  const { isAdmin, openLoginModal } = useAuth();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editLab, setEditLab] = useState<string>('');
  const [editPlayer1, setEditPlayer1] = useState<string>('');
  const [editPlayer2, setEditPlayer2] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');

  const teams = activeSport === 'foosball' ? foosballTeams : dartsTeams;

  const handleStartEdit = (team: Team) => {
    if (!isAdmin) {
      openLoginModal('Admin login required to customize team or roster info.');
      return;
    }
    setEditingId(team.id);
    setEditName(team.name);
    setEditLab(team.lab || '');
    setEditPlayer1(team.player1 || '');
    setEditPlayer2(team.player2 || '');
    setEditEmail(team.email || '');
  };

  const handleSave = (teamId: string) => {
    if (!isAdmin) {
      openLoginModal('Admin login required to customize team or roster info.');
      return;
    }
    updateTeamInfo(activeSport, teamId, editName, editLab, editPlayer1, editPlayer2, editEmail);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const pouleGroups = teams.reduce<Record<string, Team[]>>((acc, t) => {
    if (!acc[t.pouleId]) acc[t.pouleId] = [];
    acc[t.pouleId].push(t);
    return acc;
  }, {});

  const pouleKeys = Object.keys(pouleGroups).sort();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title & Sport Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E64C8]">
            <FlaskConical className="w-4 h-4" />
            <span>Ghent University · Department of Chemistry</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            Registered Teams &amp; Tournament Rosters
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            View player names, team names, and contact information. Updates propagate immediately into standings, fixtures, and brackets.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveSport('foosball')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeSport === 'foosball'
                ? 'bg-[#1E64C8] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Department Cup Foosball (18 Teams)
          </button>
          <button
            onClick={() => setActiveSport('darts')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeSport === 'darts'
                ? 'bg-[#1E64C8] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Department Cup Darts (11 Players)
          </button>
        </div>
      </div>

      {!isAdmin && (
        <div className="bg-slate-100 border border-slate-300 rounded-xl p-3.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700">
            <Lock className="w-4 h-4 text-[#1E64C8] shrink-0" />
            <span>
              Team and roster customization is locked for general viewers. Log in as organizer admin (<strong>admincup</strong>) to edit rosters.
            </span>
          </div>
          <button
            onClick={() => openLoginModal('Admin login required to customize team or roster info.')}
            className="px-3.5 py-1.5 rounded bg-[#1E64C8] hover:bg-[#154fa1] text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Log In as Admin
          </button>
        </div>
      )}

      {/* Roster Cards by Poule */}
      <div className="space-y-6">
        {pouleKeys.map((pouleId) => {
          const pouleTeams = pouleGroups[pouleId];
          const pouleTitle =
            activeSport === 'foosball'
              ? `Group ${pouleId} (6 Teams)`
              : pouleId === 'G1'
              ? 'Group A (6 Players)'
              : 'Group B (5 Players)';

          return (
            <div
              key={pouleId}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs border-t-4 border-t-[#1E64C8]"
            >
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 font-sans">{pouleTitle}</span>
                <span className="text-xs text-slate-500 font-mono">
                  {pouleTeams.length} Registered Teams
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {pouleTeams.map((team, idx) => {
                  const isEditing = editingId === team.id;

                  return (
                    <div
                      key={team.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      {isEditing ? (
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-mono text-slate-500 mb-1">
                              Team Name
                            </label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full bg-white border border-[#1E64C8] rounded px-3 py-1.5 text-sm text-slate-900 focus:outline-none"
                              autoFocus
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-slate-500 mb-1">
                              Contact Email
                            </label>
                            <input
                              type="text"
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:border-[#1E64C8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-slate-500 mb-1">
                              Player 1
                            </label>
                            <input
                              type="text"
                              value={editPlayer1}
                              onChange={(e) => setEditPlayer1(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:border-[#1E64C8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-slate-500 mb-1">
                              Player 2
                            </label>
                            <input
                              type="text"
                              value={editPlayer2}
                              onChange={(e) => setEditPlayer2(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:border-[#1E64C8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono text-slate-500 mb-1">
                              Research Group / Lab (Optional)
                            </label>
                            <input
                              type="text"
                              value={editLab}
                              onChange={(e) => setEditLab(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:border-[#1E64C8]"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 font-mono text-xs text-[#1E64C8] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            #{idx + 1}
                          </span>
                          <div className="min-w-0 space-y-1">
                            <div className="text-sm font-bold text-slate-900 truncate">{team.name}</div>
                            
                            {/* Players */}
                            {(team.player1 || team.player2) && (
                              <div className="text-xs text-slate-700 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-medium">
                                  <Users className="w-3 h-3 text-[#1E64C8]" />
                                  {[team.player1, team.player2].filter(Boolean).join(' & ')}
                                </span>
                              </div>
                            )}

                            {/* Contact email & lab */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                              {team.email && (
                                <div className="flex items-center gap-1 text-slate-600">
                                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                                  <a href={`mailto:${team.email}`} className="hover:underline text-[#1E64C8]">
                                    {team.email}
                                  </a>
                                </div>
                              )}
                              {team.lab && (
                                <div className="flex items-center gap-1 text-slate-500">
                                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{team.lab}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(team.id)}
                              className="px-3.5 py-1.5 text-xs font-bold rounded bg-[#1E64C8] hover:bg-[#154fa1] text-white flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Check className="w-3.5 h-3.5" /> Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(team)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#1E64C8] hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            {!isAdmin ? <Lock className="w-3.5 h-3.5 text-slate-400" /> : <Edit2 className="w-3.5 h-3.5" />}
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
