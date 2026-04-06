'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Phase {
  id: string;
  title: string;
  color: string;
  tasks: string[];
  daysFromReport: { min: number; max: number };
}

const PHASES: Phase[] = [
  {
    id: '6mo',
    title: '6 Months Out',
    color: '#4A90D9',
    daysFromReport: { min: -210, max: -180 },
    tasks: [
      'Receive PCS orders and verify reporting date',
      'Submit VA loan pre-approval application',
      'Request Certificate of Eligibility (COE) from VA.gov',
      'Research Dayton neighborhoods and WPAFB proximity',
      'Calculate BAH for your pay grade and dependency status',
      'Contact Chris Jurgens — start your home search early',
      'Contact WPAFB Housing Office about on-base availability',
    ],
  },
  {
    id: '3mo',
    title: '3 Months Out',
    color: '#F5A623',
    daysFromReport: { min: -120, max: -90 },
    tasks: [
      'Lock in VA lender and get pre-approval letter',
      'Schedule house-hunting trip to Dayton (military travel orders)',
      'Research schools for your children\'s grade levels',
      'Arrange for professional military movers (contact TMO/PPM)',
      'Begin decluttering — less weight = lower cost on DITY moves',
      'Notify current landlord or start home sale process',
      'Update beneficiaries and address on military records',
    ],
  },
  {
    id: '60d',
    title: '60 Days Out',
    color: '#E8A317',
    daysFromReport: { min: -75, max: -55 },
    tasks: [
      'Make an offer on your home (or finalize rental agreement)',
      'Schedule home inspection',
      'Request school records for transfer',
      'Begin SCRA protections — notify current lenders of PCS orders',
      'Arrange pet quarantine / vet records if applicable',
      'Update Tricare enrollment for new region',
    ],
  },
  {
    id: '30d',
    title: '30 Days Out',
    color: '#D0021B',
    daysFromReport: { min: -35, max: -25 },
    tasks: [
      'Confirm moving company schedule and inventory list',
      'Pack non-essential items and label boxes by room',
      'Arrange utility shutoff at current home',
      'Close on home purchase or receive keys',
      'Set up utilities at new Dayton home (gas, electric, internet)',
      'Schedule Ohio driver\'s license (within 30 days of arrival)',
    ],
  },
  {
    id: 'arrival',
    title: 'Arrival Week',
    color: '#7ED321',
    daysFromReport: { min: 0, max: 14 },
    tasks: [
      'Report to WPAFB and complete in-processing checklist',
      'Receive household goods delivery and do damage inspection',
      'Register vehicle in Ohio (within 30 days)',
      'Enroll children in school',
      'Set up new bank account if needed (Wright-Patt Credit Union recommended)',
      'Locate nearest commissary, BX/PX, and gym on base',
      'Introduce yourself to neighbors — Dayton is a welcoming community',
    ],
  },
  {
    id: 'first30',
    title: 'First 30 Days',
    color: '#417505',
    daysFromReport: { min: 1, max: 30 },
    tasks: [
      'File Ohio state income tax registration if needed',
      'Get Ohio driver\'s license (BMV — bring PCS orders)',
      'Apply for Ohio homestead exemption if you own your home',
      'Find a local mechanic and healthcare providers',
      'Join WPAFB spouse/family support groups',
      'Explore your neighborhood — check the Things To Do guide',
    ],
  },
];

export default function PCSTimelineTracker() {
  const [reportDate, setReportDate] = useState<string>('');
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pcs-timeline-checked');
    const savedDate = localStorage.getItem('pcs-timeline-report-date');
    if (saved) setCheckedTasks(new Set(JSON.parse(saved)));
    if (savedDate) setReportDate(savedDate);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('pcs-timeline-checked', JSON.stringify([...checkedTasks]));
  }, [checkedTasks]);

  useEffect(() => {
    localStorage.setItem('pcs-timeline-report-date', reportDate);
  }, [reportDate]);

  const toggleTask = (taskId: string) => {
    const newChecked = new Set(checkedTasks);
    newChecked.has(taskId) ? newChecked.delete(taskId) : newChecked.add(taskId);
    setCheckedTasks(newChecked);
  };

  const totalTasks = PHASES.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = checkedTasks.size;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const formatPhaseDate = (phase: Phase): string => {
    if (!reportDate) return '';
    const reportDateTime = new Date(reportDate).getTime();
    const minDate = new Date(reportDateTime + phase.daysFromReport.min * 86400000);
    const maxDate = new Date(reportDateTime + phase.daysFromReport.max * 86400000);
    return `${minDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${maxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">PCS Timeline Tracker</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Stay organized through your military relocation to Dayton. Track 39 essential tasks across 6 phases.
          </p>
        </div>

        {/* Reporting Date Input */}
        <div className="bg-white rounded-lg border border-gray-300 p-6 mb-10">
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Reporting Date (optional – shows phase windows)
          </label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg border border-gray-300 p-6 mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-charcoal">
              {completedTasks} of {totalTasks} tasks complete
            </span>
            <span className="text-lg font-bold text-gold">{progressPercent}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-6">
          {PHASES.map((phase) => {
            const phaseCompletedCount = phase.tasks.filter((_, idx) =>
              checkedTasks.has(`${phase.id}-${idx}`)
            ).length;

            return (
              <div
                key={phase.id}
                className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition"
              >
                {/* Phase Header */}
                <button
                  onClick={() => {
                    const element = document.getElementById(`phase-content-${phase.id}`);
                    if (element) element.classList.toggle('hidden');
                  }}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-charcoal">{phase.title}</h3>
                      {reportDate && (
                        <p className="text-sm text-gray-600">{formatPhaseDate(phase)}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: `${phase.color}22`,
                        color: phase.color,
                      }}
                    >
                      {phaseCompletedCount}/{phase.tasks.length}
                    </div>
                  </div>
                </button>

                {/* Phase Content */}
                <div id={`phase-content-${phase.id}`} className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-3">
                    {phase.tasks.map((task, idx) => {
                      const taskId = `${phase.id}-${idx}`;
                      const isChecked = checkedTasks.has(taskId);

                      return (
                        <label
                          key={taskId}
                          className="flex items-start gap-3 cursor-pointer hover:bg-white p-2 rounded transition"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleTask(taskId)}
                            className="mt-1 w-5 h-5 accent-gold"
                          />
                          <span
                            className={`text-sm ${
                              isChecked
                                ? 'line-through text-gray-500'
                                : 'text-charcoal'
                            }`}
                          >
                            {task}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resources Section */}
        <div className="mt-16 bg-charcoal text-cream rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gold mb-6">Resources & References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.wpafb.af.mil/Units/88th-Air-Base-Wing/Directorates/Housing/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-charcoal border border-gold rounded-lg hover:bg-opacity-80 transition"
            >
              <span className="font-semibold">WPAFB Housing Office</span>
              <span className="text-gold">→</span>
            </a>
            <a
              href="https://www.defensetravel.dod.mil/site/bahCalc.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-charcoal border border-gold rounded-lg hover:bg-opacity-80 transition"
            >
              <span className="font-semibold">DFAS BAH Calculator</span>
              <span className="text-gold">→</span>
            </a>
            <a
              href="https://www.militaryonesource.mil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-charcoal border border-gold rounded-lg hover:bg-opacity-80 transition"
            >
              <span className="font-semibold">Military OneSource</span>
              <span className="text-gold">→</span>
            </a>
            <a
              href="https://www.va.gov/housing-assistance/home-loans/apply-for-coe-form-26-1880/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-charcoal border border-gold rounded-lg hover:bg-opacity-80 transition"
            >
              <span className="font-semibold">VA COE Application</span>
              <span className="text-gold">→</span>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-charcoal mb-4">Questions About Your Move?</h3>
          <p className="text-gray-700 mb-8">
            Chris Jurgens specializes in military PCS relocations to Dayton and the Wright-Patterson Air Force Base area.
          </p>
          <Link
            href="/contact"
            className="btn-gold inline-block"
          >
            Contact Chris
          </Link>
        </div>
      </div>
    </main>
  );
}
