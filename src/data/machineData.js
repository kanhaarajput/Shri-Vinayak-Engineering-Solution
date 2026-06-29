import vmcImg from '@assets/svc_vmc.png';
import laserWeldingImg from '@assets/gallery_1.png';
import wirecutImg from '@assets/svc_wirecut.png';
import engravingImg from '@assets/svc_engraving.png';
import tigImg from '@assets/svc_tig.png';
import argonImg from '@assets/svc_argon.png';
import dieRepairImg from '@assets/die_after.png';

export const MACHINE_DATA = [
  {
    id: 1,
    name: "VMC Machine",
    description: "High-precision CNC vertical machining center for complex part manufacturing.",
    image: vmcImg,
  },
  {
    id: 2,
    name: "Laser Welding Machine",
    description: "State-of-the-art laser system for flawless, micron-level welding accuracy.",
    image: laserWeldingImg,
  },
  {
    id: 3,
    name: "Wirecut Machine",
    description: "Advanced Wire EDM technology for intricate and precise material cutting.",
    image: wirecutImg,
  },
  {
    id: 4,
    name: "Laser Engraving Machine",
    description: "High-speed laser marking and deep engraving on all industrial metals.",
    image: engravingImg,
  },
  {
    id: 5,
    name: "TIG Welding Machine",
    description: "Specialized TIG setups for robust and clean industrial metal joining.",
    image: tigImg,
  },
  {
    id: 6,
    name: "Argon Welding Setup",
    description: "Heavy-duty argon shielding for strong, contamination-free welds.",
    image: argonImg,
  },
  {
    id: 7,
    name: "Die Repair Machine",
    description: "Precision tools for complete die and mould restoration and maintenance.",
    image: dieRepairImg,
  },
];
