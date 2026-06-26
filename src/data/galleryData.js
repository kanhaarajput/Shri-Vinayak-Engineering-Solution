import gallery1 from '@assets/gallery_1.png'
import gallery2 from '@assets/gallery_2.png'
import gallery3 from '@assets/gallery_3.png'
import aboutWorkshop from '@assets/about_workshop.png'
import svcVmc from '@assets/svc_vmc.png'
import svcWirecut from '@assets/svc_wirecut.png'
import svcEngraving from '@assets/svc_engraving.png'
import svcTig from '@assets/svc_tig.png'
import svcArgon from '@assets/svc_argon.png'
import laserHero from '@assets/laser_welding_hero.png'

export const CATEGORIES = [
  'All',
  'Laser Welding',
  'Laser Engraving',
  'VMC Machining',
  'Wirecut Machining',
  'TIG Welding',
  'Argon Welding',
  'Die & Mould Repair',
  'Manufacturing',
]

export const PROJECTS = [
  // Laser Welding
  { id: 1, category: 'Laser Welding', title: 'Die Crack Repair', desc: 'Precision repair of micro-cracks in industrial die.', image: laserHero },
  { id: 2, category: 'Laser Welding', title: 'Mold Surface Restoration', desc: 'Restoring damaged mold surfaces without thermal distortion.', image: gallery1 },
  { id: 3, category: 'Laser Welding', title: 'Tool Edge Welding', desc: 'Rebuilding worn tool edges using ultra-fine laser welding.', image: gallery3 },

  // Laser Engraving
  { id: 4, category: 'Laser Engraving', title: 'Logo Engraving', desc: 'High-contrast logo engraving on stainless steel parts.', image: svcEngraving },
  { id: 5, category: 'Laser Engraving', title: 'Serial Number Marking', desc: 'Deep permanent serial numbering for traceability.', image: svcEngraving },
  { id: 6, category: 'Laser Engraving', title: 'Industrial Part Branding', desc: 'Custom branding on mass-produced mechanical parts.', image: svcEngraving },

  // VMC Machining
  { id: 7, category: 'VMC Machining', title: 'Precision Milling', desc: 'High-speed precision milling of aluminum blocks.', image: svcVmc },
  { id: 8, category: 'VMC Machining', title: 'Custom Component Cutting', desc: '3-axis CNC machining for complex automotive parts.', image: gallery2 },
  { id: 9, category: 'VMC Machining', title: 'Slot Machining', desc: 'Accurate deep slot machining on hard steel.', image: svcVmc },

  // Wirecut Machining
  { id: 10, category: 'Wirecut Machining', title: 'Punch Die Cutting', desc: 'Intricate punch die cutting with tight tolerances.', image: svcWirecut },
  { id: 11, category: 'Wirecut Machining', title: 'Precision Profile Cutting', desc: 'Flawless profile cutting using EDM wire technology.', image: svcWirecut },
  { id: 12, category: 'Wirecut Machining', title: 'Tool Shape Cutting', desc: 'Extracting complex tool shapes from hardened blocks.', image: svcWirecut },

  // TIG Welding
  { id: 13, category: 'TIG Welding', title: 'Stainless Steel Fabrication', desc: 'Clean TIG welding for heavy stainless steel structures.', image: svcTig },
  { id: 14, category: 'TIG Welding', title: 'Pipe Welding', desc: 'Leak-proof precision TIG pipe welding for fluid systems.', image: svcTig },
  { id: 15, category: 'TIG Welding', title: 'Sheet Metal Joining', desc: 'Thin sheet metal joining without burn-through.', image: svcTig },

  // Argon Welding
  { id: 16, category: 'Argon Welding', title: 'Aluminum Joint Welding', desc: 'High-strength argon welding on structural aluminum.', image: svcArgon },
  { id: 17, category: 'Argon Welding', title: 'Industrial Gas Welding', desc: 'Heavy-duty industrial repair using protected gas welding.', image: svcArgon },

  // Die & Mould Repair
  { id: 18, category: 'Die & Mould Repair', title: 'Complete Die Overhaul', desc: 'Full restoration and polishing of damaged die.', image: gallery3 },

  // Manufacturing
  { id: 19, category: 'Manufacturing', title: 'Large Scale Fabrication', desc: 'Custom fabrication work in our main workshop floor.', image: aboutWorkshop },
]

export const VIDEOS = [
  { id: 1, title: 'Laser Welding Process', thumbnail: laserHero },
  { id: 2, title: 'VMC Machining in Action', thumbnail: svcVmc },
  { id: 3, title: 'Wirecut EDM Precision', thumbnail: svcWirecut },
  { id: 4, title: 'TIG Welding Techniques', thumbnail: svcTig },
  { id: 5, title: 'Argon Welding Showcase', thumbnail: svcArgon },
]
