import React, { useState } from 'react';
import { Icon } from './Icon';
import { PORTFOLIO_OWNER, OWNER_ROLE, OWNER_BIO, SOCIALS, MILESTONES } from '../constants';

const CardWrapper: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  noPadding?: boolean;
}> = ({ children, className = "", noPadding = false }) => (
  // Light Liquid Glass: High translucency white, soft white border, soft colored shadow
  <div className={`backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl overflow-hidden hover:bg-white/60 hover:border-white/80 transition-all duration-500 relative ${className}`}>
     <div className={`h-full w-full ${noPadding ? '' : 'p-8'}`}>
      {children}
     </div>
  </div>
);

export const BentoGrid: React.FC = () => {
  const linkedIn = SOCIALS.find(s => s.platform === 'LinkedIn');
  const [isNameHovered, setIsNameHovered] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* 1. Hero / Intro Card */}
      <CardWrapper className="col-span-1 md:col-span-3 min-h-[260px] flex items-center relative overflow-hidden group">
        
        {/* Internal Decorative Glass Layers for Depth */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl mix-blend-multiply transition-transform duration-1000 group-hover:scale-110 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-200/40 rounded-full blur-3xl mix-blend-multiply transition-transform duration-1000 group-hover:-translate-x-10 pointer-events-none"></div>

        <div className="relative z-10 w-full px-2 md:px-4">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/60 text-xs font-medium text-slate-600 mb-6 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Working on the next thing...
            </div>

            <h1 
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-3 drop-shadow-sm leading-tight w-fit cursor-help relative"
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
                {/* Overlapping grid to stack text perfectly for diffusion effect */}
                <div className="grid grid-cols-1 grid-rows-1">
                  {/* Default Name: Addison Wang */}
                  <span 
                    className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${
                      isNameHovered 
                        ? 'opacity-0 blur-md scale-105 pointer-events-none' 
                        : 'opacity-100 blur-0 scale-100'
                    }`}
                  >
                    Addison Wang
                  </span>
                  
                  {/* Hover Name: Chunwen Wang (PORTFOLIO_OWNER) */}
                  <span 
                    className={`col-start-1 row-start-1 text-purple-900 transition-all duration-700 ease-in-out ${
                      isNameHovered 
                        ? 'opacity-100 blur-0 scale-100' 
                        : 'opacity-0 blur-md scale-95 pointer-events-none'
                    }`}
                  >
                    {PORTFOLIO_OWNER}
                  </span>
                </div>
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-5 tracking-tight">
                {OWNER_ROLE}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg font-light max-w-2xl">
                {OWNER_BIO}
            </p>
        </div>
      </CardWrapper>

      {/* 2. Milestones - 3 Individual Cards */}
      <div id="milestones" className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        {MILESTONES.map((milestone) => (
            <CardWrapper key={milestone.id} className="flex flex-col justify-between group h-full">
            <div className="flex flex-col gap-5">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 flex items-center justify-center text-slate-700 shadow-sm border border-white/60 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <Icon name={milestone.icon} size={26} />
                </div>
                <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{milestone.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">{milestone.description}</p>
                </div>
            </div>
            </CardWrapper>
        ))}
      </div>

      {/* 3. Socials Block */}
      {linkedIn && (
        <a href={linkedIn.url} target="_blank" rel="noopener noreferrer" className="block group col-span-1 md:col-span-3">
            <CardWrapper className="flex items-center justify-center py-8 group-hover:bg-white/70 transition-all duration-500">
                <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="text-lg font-medium text-slate-500">Find me on</span>
                    <div className="flex items-center gap-2 text-slate-800">
                        <Icon name="Linkedin" size={24} />
                        <span className="text-lg font-bold">LinkedIn</span>
                    </div>
                </div>
            </CardWrapper>
        </a>
      )}

    </div>
  );
};