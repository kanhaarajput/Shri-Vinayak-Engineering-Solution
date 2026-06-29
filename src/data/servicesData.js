import gallery1 from '@assets/gallery_1.png'
import gallery2 from '@assets/gallery_2.png'
import gallery3 from '@assets/gallery_3.png'
import aboutImg from '@assets/about_workshop.png'
import engImg from '@assets/svc_engraving.png'
import vmcImg from '@assets/svc_vmc.png'
import wirecutImg from '@assets/svc_wirecut.png'
import tigImg from '@assets/svc_tig.png'
import argonImg from '@assets/svc_argon.png'

export const INITIAL_SERVICES = [
  { 
    id: 'laser-welding', 
    title: 'Laser Welding', 
    desc: 'High precision laser welding for dies, moulds, and intricate repairing work.', 
    iconName: 'HiStar', 
    image: gallery1,
    color: '#fbbf24' // amber-400
  },
  { 
    id: 'laser-engraving', 
    title: 'Laser Engraving', 
    desc: 'Permanent industrial engraving for logos, serial numbers, and part marking.', 
    iconName: 'HiPencil', 
    image: engImg,
    color: '#38bdf8' // sky-400
  },
  { 
    id: 'vmc-machining', 
    title: 'VMC Machining', 
    desc: 'Precision Vertical Machining Center services for complex industrial parts.', 
    iconName: 'HiCog', 
    image: vmcImg,
    color: '#a78bfa' // violet-400
  },
  { 
    id: 'wirecut', 
    title: 'Wirecut Machining', 
    desc: 'Precision wirecut cutting for hard metals and intricate industrial designs.', 
    iconName: 'HiScissors', 
    image: wirecutImg,
    color: '#34d399' // emerald-400
  },
  { 
    id: 'tig-welding', 
    title: 'TIG Welding', 
    desc: 'Clean and precise TIG welding for stainless steel, aluminum, and fabrication.', 
    iconName: 'HiFire', 
    image: tigImg,
    color: '#fb923c' // orange-400
  },
  { 
    id: 'argon-welding', 
    title: 'Argon Welding', 
    desc: 'High-quality argon gas welding for durable and oxidation-protected industrial joints.', 
    iconName: 'HiBeaker', 
    image: argonImg,
    color: '#f43f5e' // rose-400
  },
  { 
    id: 'die-mould', 
    title: 'Die & Mould Repair', 
    desc: 'Repairing damaged industrial dies and moulds with precision restoration.', 
    iconName: 'FaWrench', 
    image: gallery3,
    color: '#fbbf24'
  },
  { 
    id: 'manufacturing', 
    title: 'Manufacturing', 
    desc: 'Custom industrial manufacturing and structural fabrication solutions.', 
    iconName: 'HiCubeTransparent', 
    image: aboutImg,
    color: '#38bdf8'
  },
  { 
    id: 'industrial-repairing', 
    title: 'Industrial Repairing', 
    desc: 'Complete repair solutions for heavy industrial components and machinery.', 
    iconName: 'HiShieldCheck', 
    image: gallery2,
    color: '#a78bfa'
  },
];
