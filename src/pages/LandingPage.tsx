import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { CfdLogo } from '../components/common/CfdLogo';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  PlayCircle,
  Settings2,
  Wind,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

const accent = '#0f766e';

export const LandingPage: React.FC = () => {
  const { setPage } = usePlatform();

  const goTo = (page: Parameters<typeof setPage>[0]) => {
    sound.playClick();
    setPage(page);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-transparent text-[#17211f]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <section className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="glass-surface max-w-3xl rounded-2xl p-6 sm:p-8">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">CFD Platform</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#17211f] sm:text-6xl sm:leading-[1.05]">
              Run CFD cases, inspect the flow, and export the results.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-[#53605d]">
              This browser workbench connects geometry, OpenFOAM setup, solver output, visual inspection, and reporting in one place. It is built for checking a case from start to finish, not for showing a pretend dashboard.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => goTo('projects')}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0f766e] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#115e59]"
              >
                Open a project <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => goTo('docs')}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#c9d6d2] bg-white px-5 text-sm font-semibold text-[#25403b] transition-colors hover:border-[#0f766e] hover:text-[#0f766e]"
              >
                Read the workflow <BookOpen className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-5 text-sm leading-[1.6] text-[#6b7774]">Start with the included cylinder case or load your own geometry in the workbench.</p>
          </div>

          <div className="glass-surface rounded-2xl p-6 lg:mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7774]">What is included</p>
            <ul className="mt-5 divide-y divide-[#dce5e2] border-y border-[#dce5e2]">
              <li className="flex gap-4 py-4 text-sm leading-[1.6] text-[#3f4f4b]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f766e]" />OpenFOAM case setup and solver controls</li>
              <li className="flex gap-4 py-4 text-sm leading-[1.6] text-[#3f4f4b]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f766e]" />Mesh checks, residuals, and run logs</li>
              <li className="flex gap-4 py-4 text-sm leading-[1.6] text-[#3f4f4b]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f766e]" />3D results, coefficient plots, and exports</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-8 border-y border-[#c9d6d2] py-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">A real run</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#17211f]">The product has something to show.</h2>
            <p className="mt-4 text-base leading-[1.6] text-[#53605d]">
              The included cylinder example goes through mesh generation, a steady-state solve, telemetry extraction, and report export. These are the values the platform is designed to surface after a run.
            </p>
            <button onClick={() => goTo('results')} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">
              Inspect the results view <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="glass-surface p-6 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#dce5e2] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#6b7774]">Cylinder / simpleFoam</p>
                <h3 className="mt-2 text-lg font-semibold text-[#17211f]">Solver output summary</h3>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e5f2ef] px-3 py-1.5 text-xs font-semibold text-[#0f766e]"><span className="h-2 w-2 rounded-full bg-[#0f766e]" />Case ready</span>
            </div>
            <div className="grid gap-6 pt-6 sm:grid-cols-3">
              <div><p className="text-xs text-[#6b7774]">Mesh cells</p><p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#17211f]">38,000+</p><p className="mt-1 text-xs text-[#6b7774]">after snappyHexMesh</p></div>
              <div><p className="text-xs text-[#6b7774]">Drag coefficient</p><p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#17211f]">1.18</p><p className="mt-1 text-xs text-[#6b7774]">cylinder case result</p></div>
              <div><p className="text-xs text-[#6b7774]">Solver</p><p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#17211f]">500</p><p className="mt-1 text-xs text-[#6b7774]">target iterations</p></div>
            </div>
            <div className="mt-7 border border-[#dce5e2] bg-[#f6f8f7] p-4 font-mono text-xs leading-[1.7] text-[#53605d]">
              <p><span className="text-[#0f766e]">[mesh]</span> checkMesh passed</p>
              <p><span className="text-[#0f766e]">[solve]</span> simpleFoam residuals recorded</p>
              <p><span className="text-[#0f766e]">[export]</span> VTK and spreadsheet files available</p>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">From geometry to report</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#17211f]">A straightforward engineering workflow.</h2>
            <p className="mt-4 text-base leading-[1.6] text-[#53605d]">Each step has a place in the workbench, so you can see what was set, what ran, and what came out.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: '01', icon: Settings2, title: 'Set up geometry', text: 'Load a model, check the mesh, and choose the boundaries.' },
              { number: '02', icon: Wind, title: 'Set the physics', text: 'Choose the solver, inlet conditions, turbulence model, and run limits.' },
              { number: '03', icon: PlayCircle, title: 'Run the case', text: 'Watch residuals, logs, and runtime while the solver is working.' },
              { number: '04', icon: FileSpreadsheet, title: 'Review and export', text: 'Inspect fields and coefficients, then download the files you need.' },
            ].map(({ number, icon: Icon, title, text }) => (
              <div key={number} className="glass-surface p-5">
                <div className="flex items-center justify-between"><span className="font-mono text-xs font-semibold text-[#0f766e]">{number}</span><Icon className="h-5 w-5 text-[#0f766e]" /></div>
                <h3 className="mt-8 text-base font-semibold text-[#17211f]">{title}</h3>
                <p className="mt-2 text-sm leading-[1.6] text-[#53605d]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 border-t border-[#c9d6d2] pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CfdLogo size="sm" showText={true} />
            <p className="mt-4 max-w-xl text-sm leading-[1.6] text-[#6b7774]">A practical CFD workbench for setting up cases, checking solver behavior, and keeping the output together.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => goTo('runner')} className="inline-flex items-center gap-2 rounded-lg bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white hover:bg-[#115e59]"><BarChart3 className="h-4 w-4" />Open workbench</button>
            <button onClick={() => goTo('reporting')} className="inline-flex items-center gap-2 rounded-lg border border-[#c9d6d2] bg-white px-4 py-3 text-sm font-semibold text-[#25403b] hover:border-[#0f766e] hover:text-[#0f766e]"><FileSpreadsheet className="h-4 w-4" />View reports</button>
          </div>
        </section>
      </div>
    </div>
  );
};
