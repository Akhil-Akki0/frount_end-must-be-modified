import React, { useState, useEffect } from 'react';
import { usePlatform, LIGHT_THEMES } from '../../context/PlatformContext';
import { PageId, LightThemeId } from '../../types';
import { CfdLogo } from '../common/CfdLogo';
import { Tooltip } from '../common/Tooltip';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  LayoutDashboard,
  FolderKanban,
  Shapes,
  Settings,
  PlayCircle,
  BarChart3,
  Brain,
  FileSpreadsheet,
  Volume2,
  VolumeX,
  Palette,
  Check,
  TrendingUp,
  BookOpen,
  ListOrdered,
  FolderArchive,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    page,
    setPage,
    soundEnabled,
    toggleSound,
    lightTheme,
    setLightTheme,
    activeThemeConfig,
    themeMode,
    toggleThemeMode,
    queue,
    setIsQueueOpen,
    setIsOpenFoamModalOpen,
  } = usePlatform();

  const [showThemePicker, setShowThemePicker] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [optimisticPage, setOptimisticPage] = useState<PageId | null>(null);

  useEffect(() => {
    setOptimisticPage(null);
  }, [page]);

  const runningJobsCount = queue.filter((j) => j.status === 'running').length;

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: 'Landing', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'geometry', label: 'Geometry', icon: Shapes },
    { id: 'setup', label: 'Setup', icon: Settings },
    { id: 'runner', label: 'Run', icon: PlayCircle },
    { id: 'sweeps', label: 'Sweeps & Polars', icon: TrendingUp },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'ai', label: 'AI Analysis', icon: Brain },
    { id: 'reporting', label: 'Reports', icon: FileSpreadsheet },
    { id: 'docs', label: 'Documentation', icon: BookOpen },
  ];

  // Close mobile menu whenever the active page changes
  const handleNavClick = (id: PageId) => {
    setOptimisticPage(id);
    setPage(id);
    setMobileMenuOpen(false);
  };

  const activePage = optimisticPage || page;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="glass-surface bg-white/95 dark:bg-slate-950/95 h-14 px-3 sm:px-5 flex items-center justify-between select-none z-40 shrink-0 sticky top-0 transition-colors w-full">
        {/* Brand & Official Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('landing')}
            className="group text-left transition-transform active:scale-95 flex items-center min-h-[44px] min-w-[44px] py-1"
            title="CFD Platform — Home"
            aria-label="CFD Platform Home"
          >
            <CfdLogo size="sm" showText={true} />
          </button>

          <div className="h-5 w-px bg-[#E2E8F0] dark:bg-slate-700 hidden xl:block mx-1"></div>

          {/* Live CFD Engine Badge */}
          <div className="hidden 2xl:flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-medium shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>Live CFD Engine</span>
          </div>
        </div>

        {/* Center Navigation Links (Desktop - lg and above) */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-none py-1 max-w-[55vw] xl:max-w-[60vw]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap relative cursor-pointer min-h-[36px] ${
                  isActive
                    ? 'text-[#0284C7] bg-[#E0F2FE] dark:bg-sky-950/60 dark:text-sky-300 font-bold shadow-xs border border-[#BAE6FD] dark:border-sky-800'
                    : 'text-[#334155] dark:text-slate-200 hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0284C7] dark:text-sky-300' : 'text-[#64748B] dark:text-slate-400'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#0284C7] dark:bg-sky-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Simulation Queue Button */}
          <Tooltip content="Open the simulation queue and terminal logs." position="bottom" className="shrink-0">
            <button
              onClick={() => setIsQueueOpen(true)}
              title="Open Simulation Queue & Terminal Logs"
              aria-label="Simulation Queue"
              className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] rounded-lg border border-[#BAE6FD] bg-[#F0F9FF] dark:bg-slate-800 dark:border-slate-700 hover:bg-[#E0F2FE] text-[#0284C7] dark:text-cyan-400 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
              <span className="hidden md:inline font-mono">Queue</span>
              {runningJobsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0284C7] text-white text-[10px] flex items-center justify-center font-mono animate-pulse">
                  {runningJobsCount}
                </span>
              )}
            </button>
          </Tooltip>

          {/* Desktop Theme Picker (Hidden on small mobile) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              title="Change Light Background Theme"
              aria-label="Theme Picker"
              className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] rounded-lg border border-[#BAE6FD] bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0369A1] text-xs font-medium transition-all shadow-2xs cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="hidden xl:inline font-sans">{activeThemeConfig.badge}</span>
              <span
                className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs"
                style={{ backgroundColor: activeThemeConfig.accentColor }}
              />
            </button>

            {showThemePicker && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowThemePicker(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border border-[#BAE6FD] dark:border-slate-700 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold text-[#0369A1] dark:text-sky-400 px-2 py-1 flex items-center justify-between border-b border-[#F1F5F9] dark:border-slate-700 mb-1">
                    <span>Bright Light Colors</span>
                  </div>
                  <div className="space-y-1">
                    {(Object.keys(LIGHT_THEMES) as LightThemeId[]).map((themeKey) => {
                      const theme = LIGHT_THEMES[themeKey];
                      const isSelected = lightTheme === themeKey;
                      return (
                        <button
                          key={themeKey}
                          onClick={() => {
                            setLightTheme(themeKey);
                            setShowThemePicker(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#E0F2FE] dark:bg-slate-700 text-[#0284C7] dark:text-sky-300 font-semibold'
                              : 'hover:bg-[#F8FAFC] dark:hover:bg-slate-700/50 text-[#334155] dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                              style={{ backgroundColor: theme.accentColor }}
                            />
                            <span>{theme.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#0284C7]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* OpenFOAM Export Quick Button (Desktop) */}
          <Tooltip content="Export the current case as a production OpenFOAM ZIP." position="bottom" className="hidden shrink-0 xl:inline-flex">
            <button
              onClick={() => setIsOpenFoamModalOpen(true)}
              title="Export Production OpenFOAM Case ZIP"
              aria-label="Export OpenFOAM Case"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>OpenFOAM</span>
            </button>
          </Tooltip>

          {/* Dark / Light Mode Toggle */}
          <Tooltip content={themeMode === 'dark' ? 'Switch to the light theme.' : 'Switch to the dark theme.'} position="bottom" className="shrink-0">
            <button
              onClick={toggleThemeMode}
              title={themeMode === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme Mode"
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </Tooltip>

          {/* Sound Effects Toggle (Hidden on very small mobile, available in mobile drawer) */}
          <Tooltip content={soundEnabled ? 'Mute interface sounds.' : 'Enable interface sounds.'} position="bottom" className="hidden shrink-0 sm:inline-flex">
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
              aria-label="Toggle Sound"
              className={`p-2.5 min-h-[44px] min-w-[44px] hidden sm:flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD] dark:bg-slate-800 dark:border-slate-700 dark:text-cyan-400'
                  : 'bg-white text-[#94A3B8] border-[#E2E8F0] dark:bg-slate-800 dark:border-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </Tooltip>

          {/* Quick Simulation CTA on Desktop */}
          {activePage !== 'runner' && (
            <button
              onClick={() => handleNavClick('runner')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 text-white" />
              <span>Workbench</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle Button (lg:hidden) */}
          <Tooltip content={mobileMenuOpen ? 'Close navigation menu.' : 'Open navigation menu.'} position="bottom" className="shrink-0 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              className="flex lg:hidden items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-lg border border-[#BAE6FD] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0284C7] dark:text-cyan-400 shadow-2xs hover:bg-[#F0F9FF] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </Tooltip>
        </div>
      </header>

      {/* Mobile Slide-in Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="glass-surface fixed inset-y-0 right-0 w-[85vw] max-w-sm shadow-2xl z-50 flex flex-col lg:hidden border-l border-[#BAE6FD] dark:border-slate-800 pt-safe pb-safe"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between bg-[#F8FAFC] dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <CfdLogo size="sm" showText={true} />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation drawer"
                  className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links Scrollable List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                  Navigation
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] cursor-pointer ${
                        isActive
                          ? 'bg-[#E0F2FE] dark:bg-sky-950/60 text-[#0284C7] dark:text-sky-300 font-bold border border-[#BAE6FD] dark:border-sky-800'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#0284C7]' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}

                {/* Additional Quick Controls in Mobile Drawer */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    Utilities & Environment
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsQueueOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 min-h-[44px]"
                  >
                    <div className="flex items-center gap-3">
                      <ListOrdered className="w-5 h-5 text-[#0284C7]" />
                      <span>Open Simulation Queue</span>
                    </div>
                    {runningJobsCount > 0 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[#0284C7] text-white font-mono">
                        {runningJobsCount} running
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsOpenFoamModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 min-h-[44px]"
                  >
                    <div className="flex items-center gap-3">
                      <FolderArchive className="w-5 h-5 text-[#0284C7]" />
                      <span>Export OpenFOAM Case</span>
                    </div>
                  </button>

                  <button
                    onClick={toggleSound}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 min-h-[44px]"
                  >
                    <div className="flex items-center gap-3">
                      {soundEnabled ? (
                        <Volume2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-slate-400" />
                      )}
                      <span>Sound Effects</span>
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      {soundEnabled ? 'ENABLED' : 'MUTED'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950 text-center text-xs text-slate-500">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px]">OpenFOAM v2606 Engine</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  DEVELOPED by Akhil.A
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
