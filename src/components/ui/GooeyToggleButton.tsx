// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';

// import './GooeyToggleButton.css'; // We'll extract CSS separately

// const GooeyToggleButton: React.FC<{
//   checked?: boolean;
//   onToggle?: (checked: boolean) => void;
// }> = ({ checked = false, onToggle }) => {
//   const checkboxRef = useRef<HTMLInputElement>(null);
//   const checkTimeline = useRef<GSAPTimeline>();
//   const uncheckTimeline = useRef<GSAPTimeline>();

//   const [isChecked, setIsChecked] = useState(checked);

//   useEffect(() => {
//     // Setup GSAP timelines
//     checkTimeline.current = gsap.timeline({ paused: true });
//     uncheckTimeline.current = gsap.timeline({ paused: true });

//     checkTimeline.current
//       .set('.ring', { opacity: 1 })
//       .set('.drops', { opacity: 0 })
//       .set('.ring0', { opacity: 0 })
//       .set('.drop', { opacity: 0, y: -32, scale: 0.4, x: 0, transformOrigin: '50% 0%' })
//       .set('.dropTop', { opacity: 1, scale: 0.2, transformOrigin: '50% 0%' })
//       .to('.ring', { duration: 0.17, scaleY: 0.95 }, 'sync')
//       .to('.dropTop', { duration: 0.1, scale: 1, y: 0.5 }, 'sync')
//       .to('.dropTop', { duration: 0.1, scale: 0.3 }, 'sync+=0.08')
//       .to('.dropTop', { duration: 0.08, scale: 0, transformOrigin: '50% 40%' }, 'sync+=0.181')
//       .set('.drop', { opacity: 1 }, 'sync')
//       .to('.drop', { duration: 0.17, y: 0 }, 'sync')
//       .to('.drop', { duration: 0.08, scale: 0.9 }, 'sync+=0.02')
//       .to('.ring', { duration: 2, scaleY: 1, ease: 'elastic.out(0.8, 0.1)' }, 'sync+=0.14')
//       .to('.drop', { duration: 1.8, scale: 1, transformOrigin: '50% 10%', ease: 'elastic.out(0.8, 0.14)' }, 'sync+=0.14');

//     uncheckTimeline.current
//       .set('.ring0', { opacity: 1 })
//       .set('.drop', { opacity: 0 })
//       .set('.ring', { opacity: 0 })
//       .set('.drops', { opacity: 1 })
//       .set('.drop0', { rotation: '40deg', transformOrigin: '50% 50%' })
//       .set('.drop1', { rotation: '112deg', transformOrigin: '50% 50%' })
//       .set('.drop2', { rotation: '175deg', transformOrigin: '50% 50%' })
//       .set('.drop3', { rotation: '-110deg', transformOrigin: '50% 50%' })
//       .set('.drop4', { rotation: '-35deg', transformOrigin: '50% 50%' })
//       .to('.drops', { duration: 0.2, scaleX: 0.5, scaleY: 0.3, transformOrigin: '50% 50%' })
//       .to(
//         ['.drop0', '.drop1', '.drop2', '.drop3', '.drop4'],
//         {
//           duration: 0.2,
//           stagger: 0.0184,
//           x: [45, 59, 14, -62, -35],
//           y: [-46, 29, 62, 15, -55],
//         },
//         'uncheck+=0.1'
//       )
//       .to('.ring0', { duration: 0.2, scale: 1.05, transformOrigin: '50% 50%' }, 'uncheck+=0.1')
//       .to('.ring0', { duration: 2, scale: 1, ease: 'elastic.out(0.8, 0.1)', transformOrigin: '50% 50%' }, 'last')
//       .to('.drops', { duration: 0.2, scaleX: 0.3, scaleY: 0.1 }, 'last+=0');

//     checkTimeline.current.timeScale(1.27);
//     uncheckTimeline.current.timeScale(1.14);
//   }, []);

//   const toggle = () => {
//     if (isChecked) {
//       uncheckTimeline.current?.play(0);
//     } else {
//       checkTimeline.current?.play(0);
//     }
//     const newValue = !isChecked;
//     setIsChecked(newValue);
//     onToggle?.(newValue);
//   };

//   return (
//     <div className="gooey-container">
//       <svg viewBox="0 0 800 600">
//         <defs>
//           <filter id="goo">
//             <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
//             <feColorMatrix
//               in="blur"
//               result="goo"
//               values="1 0 0 0 0  
//                       0 1 0 0 0  
//                       0 0 1 0 0  
//                       0 0 0 18 -7"
//             />
//             <feBlend in="SourceGraphic" in2="goo" />
//           </filter>
//           <linearGradient id="linearGradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#C25068" />
//             <stop offset="100%" stopColor="#9E3B5C" />
//           </linearGradient>
//         </defs>
//         <rect fill="url(#linearGradient-1)" width="800" height="600" />
//         <g className="gooey" transform="translate(330, 230)" fill="#FFF">
//           <circle className="dropTop" r="10" cx="70" cy="12" />
//           <circle className="drop" r="40" cx="70" cy="70" />
//           <circle className="drops drop0" r="40" cx="70" cy="70" />
//           <circle className="drops drop1" r="40" cx="70" cy="70" />
//           <circle className="drops drop2" r="40" cx="70" cy="70" />
//           <circle className="drops drop3" r="40" cx="70" cy="70" />
//           <circle className="drops drop4" r="40" cx="70" cy="70" />
//           <path
//             className="ring0"
//             d="M70,140 C31.3,140 0,108.6 0,70 C0,31.3 31.3,0 70,0 C108.6,0 140,31.3 140,70 C140,108.6 108.6,140 70,140 Z
//             M70,129.6 C102.9,129.6 129.6,102.9 129.6,70 C129.6,37.1 102.9,10.4 70,10.4 C37.1,10.4 10.4,37.1 10.4,70 C10.4,102.9 37.1,129.6 70,129.6 Z"
//           />
//           <path
//             className="ring"
//             d="M70,140 C31.3,140 0,108.6 0,70 C0,31.3 31.3,0 70,0 C108.6,0 140,31.3 140,70 C140,108.6 108.6,140 70,140 Z
//             M70,129.6 C102.9,129.6 129.6,102.9 129.6,70 C129.6,37.1 102.9,10.4 70,10.4 C37.1,10.4 10.4,37.1 10.4,70 C10.4,102.9 37.1,129.6 70,129.6 Z"
//           />
//           <circle className="toggler" fill="rgba(255,255,255,0)" r="120" cx="70" cy="70" onClick={toggle} />
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default GooeyToggleButton;



import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './GooeyToggleButton.css';

type GooeyToggleButtonProps = {
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
};

const GooeyToggleButton: React.FC<GooeyToggleButtonProps> = ({ 
  checked = false, 
  onToggle 
}) => {
  const checkTimeline = useRef<gsap.core.Timeline>();
  const uncheckTimeline = useRef<gsap.core.Timeline>();
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    checkTimeline.current = gsap.timeline({ paused: true });
    uncheckTimeline.current = gsap.timeline({ paused: true });

    // Check animation timeline
    checkTimeline.current
      .set('.ring', { opacity: 1 })
      .set('.drops', { opacity: 0 })
      .set('.ring0', { opacity: 0 })
      .set('.drop', { opacity: 0, y: -32, scale: 0.4 })
      .set('.dropTop', { opacity: 1, scale: 0.2 })
      .to('.ring', { duration: 0.17, scaleY: 0.95 })
      .to('.dropTop', { duration: 0.1, scale: 1, y: 0.5 }, '<')
      .to('.dropTop', { duration: 0.1, scale: 0.3 }, '+=0.08')
      .to('.dropTop', { duration: 0.08, scale: 0 }, '+=0.1')
      .set('.drop', { opacity: 1 })
      .to('.drop', { duration: 0.17, y: 0 })
      .to('.drop', { duration: 0.08, scale: 0.9 }, '-=0.05')
      .to('.ring', { 
        duration: 2, 
        scaleY: 1, 
        ease: 'elastic.out(0.8, 0.1)' 
      }, '-=1.8');

    // Uncheck animation timeline
    uncheckTimeline.current
      .set('.ring0', { opacity: 1 })
      .set('.drop', { opacity: 0 })
      .set('.ring', { opacity: 0 })
      .set('.drops', { opacity: 1 })
      .to('.drops', { duration: 0.2, scale: 0.5 })
      .to('.drop0, .drop1, .drop2, .drop3, .drop4', {
        duration: 0.2,
        x: (i) => [45, 59, 14, -62, -35][i],
        y: (i) => [-46, 29, 62, 15, -55][i],
        stagger: 0.0184
      }, '+=0.1')
      .to('.ring0', { 
        duration: 2, 
        scale: 1, 
        ease: 'elastic.out(0.8, 0.1)' 
      }, '<');

  }, []);

  useEffect(() => {
    if (isChecked) {
      checkTimeline.current?.play();
      uncheckTimeline.current?.progress(0).pause();
    } else {
      uncheckTimeline.current?.play();
      checkTimeline.current?.progress(0).pause();
    }
  }, [isChecked]);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle?.(newState);
  };

  return (
    <div className="gooey-container" onClick={handleToggle}>
      <svg viewBox="0 0 800 600">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              result="goo"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 18 -7"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <linearGradient id="linearGradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C25068" />
            <stop offset="100%" stopColor="#9E3B5C" />
          </linearGradient>
        </defs>
        <rect fill="url(#linearGradient-1)" width="800" height="600" />
        <g className="gooey" transform="translate(330, 230)" fill="#FFF">
          <circle className="dropTop" r="10" cx="70" cy="12" />
          <circle className="drop" r="40" cx="70" cy="70" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} className={`drops drop${i}`} r="40" cx="70" cy="70" />
          ))}
          <path
            className="ring0"
            d="M70,140 C31.3,140 0,108.6 0,70 C0,31.3 31.3,0 70,0 C108.6,0 140,31.3 140,70 C140,108.6 108.6,140 70,140 Z
            M70,129.6 C102.9,129.6 129.6,102.9 129.6,70 C129.6,37.1 102.9,10.4 70,10.4 C37.1,10.4 10.4,37.1 10.4,70 C10.4,102.9 37.1,129.6 70,129.6 Z"
          />
          <path
            className="ring"
            d="M70,140 C31.3,140 0,108.6 0,70 C0,31.3 31.3,0 70,0 C108.6,0 140,31.3 140,70 C140,108.6 108.6,140 70,140 Z
            M70,129.6 C102.9,129.6 129.6,102.9 129.6,70 C129.6,37.1 102.9,10.4 70,10.4 C37.1,10.4 10.4,37.1 10.4,70 C10.4,102.9 37.1,129.6 70,129.6 Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default GooeyToggleButton;