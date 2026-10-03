import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/Auth/AuthModal';
import { Navbar } from './components/Navigation/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GeometryPage } from './pages/GeometryPage';
import { SimulationSetupPage } from './pages/SimulationSetupPage';
import { SimulationRunnerPage } from './pages/SimulationRunnerPage';
import { CfdWorkbenchView } from './components/CfdWorkbenchView';
import { AIAnalysisPage } from './pages/AIAnalysisPage';
import { ReportingPage } from './pages/ReportingPage';
import { ParametricSweepsPage } from './pages/ParametricSweepsPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { SimulationQueueDrawer } from './components/SimulationQueue/SimulationQueueDrawer';
import { OpenFoamExportModal } from './components/common/OpenFoamExportModal';
import { PageSkeleton } from './components/common/PageSkeleton';
import { StartupVideoOverlay } from './components/common/StartupVideoOverlay';
import { CloudShader } from './components/ui/cloud-shader';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const {
    page,
    themeMode,
    isQueueOpen,
    setIsQueueOpen,
    isOpenFoamModalOpen,
    setIsOpenFoamModalOpen,
    geometries,
    currentGeometryId,
    simConfig,
    projects,
    currentProjectId,
  } = usePlatform();

  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const [showStartupVideo, setShowStartupVideo] = React.useState(true);

  React.useEffect(() => {
    setIsPageLoading(true);
    const timeout = window.setTimeout(() => setIsPageLoading(false), 260);
    return () => window.clearTimeout(timeout);
  }, [page]);

  const currentGeom = geometries.find((g) => g.id === currentGeometryId) || geometries[0];
  const currentProj = projects.find((p) => p.projectId === currentProjectId) || projects[0];

  const themeBgClass = themeMode === 'dark' ? 'bg-transparent text-slate-100' : 'bg-transparent text-[#17211f]';

  return (
    <div className={`flex flex-col min-h-[100dvh] h-[100dvh] w-full max-w-[100vw] ${themeBgClass} font-sans antialiased overflow-hidden select-none relative transition-colors duration-300`}>
      <CloudShader className="z-0 opacity-60" />

      {/* Global Application Header with Full Navigation & Sound Controls */}
      <Navbar />

      {/* Main Screen Container with Fluid Animated Transitions */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 flex flex-col overflow-hidden h-full w-full"
          >
            {isPageLoading ? <PageSkeleton /> : (
              <>
                {page === 'landing' && <LandingPage />}
                {page === 'dashboard' && <DashboardPage />}
                {page === 'projects' && <ProjectsPage />}
                {page === 'geometry' && <GeometryPage />}
                {page === 'setup' && <SimulationSetupPage />}
                {page === 'runner' && <SimulationRunnerPage />}
                {page === 'sweeps' && <ParametricSweepsPage />}
                {page === 'results' && <CfdWorkbenchView />}
                {page === 'ai' && <AIAnalysisPage />}
                {page === 'reporting' && <ReportingPage />}
                {page === 'docs' && <DocumentationPage />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Application Footer */}
      <footer className="glass-surface bg-white/95 dark:bg-slate-950/95 py-2 sm:py-0 sm:h-7 px-3 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-700 dark:text-slate-300 z-20 shrink-0 select-none pb-safe">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span className="font-mono text-[10px] whitespace-nowrap">OpenFOAM v2606 Engine Status: Ready</span>
        </div>
        <div className="font-medium tracking-wide text-[10px] sm:text-[11px] text-center sm:text-right">
          DEVELOPED by Akhil.A gmail :- akkedu01@gmail.com
        </div>
      </footer>

      {/* Authentication & Security Modal */}
      <AuthModal />

      {/* Simulation Queue Drawer */}
      <SimulationQueueDrawer
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        onOpenOpenFoamModal={() => {
          setIsQueueOpen(false);
          setIsOpenFoamModalOpen(true);
        }}
      />

      {/* Full OpenFOAM Case ZIP Exporter Modal */}
      {currentGeom && (
        <OpenFoamExportModal
          isOpen={isOpenFoamModalOpen}
          onClose={() => setIsOpenFoamModalOpen(false)}
          geometry={currentGeom}
          simConfig={simConfig}
          projectName={currentProj?.name || currentGeom.name}
        />
      )}

      {showStartupVideo && (
        <StartupVideoOverlay onComplete={() => setShowStartupVideo(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PlatformProvider>
        <AppContent />
      </PlatformProvider>
    </AuthProvider>
  );
}
