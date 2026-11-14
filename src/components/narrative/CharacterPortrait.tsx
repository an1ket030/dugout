/**
 * Character Portrait Component — Graphic Novel Illustrated Art
 * Renders stylized, painterly portraits with expressive mood states,
 * dramatic rim lighting, halftones, and textured badge collars.
 */

export type CharacterId = 'eddie' | 'arthur' | 'terry' | 'maya' | 'narrator'
export type CharacterMood = 'neutral' | 'stern' | 'skeptical' | 'furious' | 'relieved' | 'smirking'

interface CharacterPortraitProps {
  characterId: string
  mood?: CharacterMood
  size?: 'sm' | 'md' | 'lg' | 'hero'
  className?: string
}

export default function CharacterPortrait({
  characterId,
  mood = 'neutral',
  size = 'hero',
  className = '',
}: CharacterPortraitProps) {
  const normId = characterId.toLowerCase()

  const dimensions = {
    sm: 'w-16 h-20',
    md: 'w-28 h-36',
    lg: 'w-44 h-56',
    hero: 'w-64 h-84 md:w-80 md:h-[420px]',
  }[size]

  if (normId.includes('eddie')) {
    return <EddiePortrait mood={mood} dimensions={dimensions} className={className} />
  }
  if (normId.includes('arthur') || normId.includes('pendelton')) {
    return <ArthurPortrait mood={mood} dimensions={dimensions} className={className} />
  }
  if (normId.includes('terry') || normId.includes('moss')) {
    return <TerryPortrait mood={mood} dimensions={dimensions} className={className} />
  }
  if (normId.includes('maya') || normId.includes('higgins')) {
    return <MayaPortrait mood={mood} dimensions={dimensions} className={className} />
  }

  // Fallback narrator shadow
  return (
    <div className={`relative ${dimensions} ${className} flex items-end justify-center overflow-hidden`}>
      <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="narratorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2722" />
            <stop offset="60%" stopColor="#0e1310" />
            <stop offset="100%" stopColor="#060907" />
          </linearGradient>
        </defs>
        {/* Silhouette */}
        <path d="M50 280 C50 210, 65 190, 80 180 C70 170, 65 150, 65 125 C65 85, 80 70, 100 70 C120 70, 135 85, 135 125 C135 150, 130 170, 120 180 C135 190, 150 210, 150 280 Z" fill="url(#narratorGrad)" />
      </svg>
    </div>
  )
}

/** EDDIE MARLOWE — 62, Kit Man, Flat Cap, Trench Coat, Stubble */
function EddiePortrait({ mood, dimensions, className }: { mood: CharacterMood; dimensions: string; className: string }) {
  const eyebrowLeft = mood === 'skeptical' ? 'M82 108 Q94 100 106 108' : mood === 'furious' ? 'M82 108 Q94 116 106 112' : 'M82 110 Q94 106 106 110'
  const eyebrowRight = mood === 'skeptical' ? 'M118 106 Q130 114 142 112' : mood === 'furious' ? 'M118 112 Q130 116 142 108' : 'M118 110 Q130 106 142 110'
  const mouthPath = mood === 'smirking' ? 'M98 165 Q110 162 126 168' : mood === 'stern' ? 'M98 168 Q112 168 126 168' : 'M98 166 Q112 164 124 166'

  return (
    <div className={`relative ${dimensions} ${className} flex items-end justify-center`}>
      <svg viewBox="0 0 220 300" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <radialGradient id="eddieRim" cx="20%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f0ad35" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#070908" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="woolCoat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2c3530" />
            <stop offset="50%" stopColor="#1a201c" />
            <stop offset="100%" stopColor="#0b0e0c" />
          </linearGradient>
          <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#434c46" />
            <stop offset="100%" stopColor="#1a211d" />
          </linearGradient>
          <linearGradient id="faceSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a37853" />
            <stop offset="70%" stopColor="#765236" />
            <stop offset="100%" stopColor="#483120" />
          </linearGradient>
        </defs>

        {/* Ambient rim light backplate */}
        <circle cx="110" cy="140" r="115" fill="url(#eddieRim)" />

        {/* Shoulders / Heavy Wool Coat with Upturned Collar */}
        <path d="M20 300 C25 240, 50 215, 80 200 L95 240 L125 240 L140 200 C170 215, 195 240, 200 300 Z" fill="url(#woolCoat)" stroke="#121614" strokeWidth="3" />
        {/* Collar Lapels */}
        <path d="M72 205 L95 250 L110 210 L125 250 L148 205" fill="#202722" stroke="#070908" strokeWidth="2.5" />
        {/* Scarf tucked in */}
        <path d="M98 220 L110 245 L122 220 Z" fill="#8b1e1e" />

        {/* Neck */}
        <path d="M94 180 L94 215 L126 215 L126 180 Z" fill="#6a492f" />

        {/* Head / Jaw */}
        <path d="M78 120 C76 175, 90 205, 110 205 C130 205, 144 175, 142 120 C142 85, 78 85, 78 120 Z" fill="url(#faceSkin)" stroke="#3a2517" strokeWidth="2" />

        {/* Stubble / 5 o'clock shadow */}
        <path d="M82 145 C82 185, 95 200, 110 200 C125 200, 138 185, 138 145 C130 160, 90 160, 82 145 Z" fill="#000000" opacity="0.18" />

        {/* Weathered Facial Wrinkles */}
        <path d="M92 135 Q110 142 128 135" stroke="#3d2616" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M86 122 Q82 128 86 134" stroke="#3d2616" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M134 122 Q138 128 134 134" stroke="#3d2616" strokeWidth="1.5" fill="none" opacity="0.7" />

        {/* Eyes & Eyebrows */}
        <path d={eyebrowLeft} stroke="#1b120a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d={eyebrowRight} stroke="#1b120a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="94" cy="118" r="4.5" fill="#1b120a" />
        <circle cx="126" cy="118" r="4.5" fill="#1b120a" />
        <circle cx="93" cy="116" r="1.5" fill="#f0ad35" />
        <circle cx="125" cy="116" r="1.5" fill="#f0ad35" />

        {/* Nose — weathered, slightly broken boxer bridge */}
        <path d="M110 112 L106 142 L116 144 L114 138" stroke="#3a2517" strokeWidth="2.5" fill="none" />

        {/* Mouth */}
        <path d={mouthPath} stroke="#2e1a0d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Cigarette tucked in corner */}
        <line x1="124" y1="166" x2="148" y2="160" stroke="#fdfbf7" strokeWidth="3" strokeLinecap="round" />
        <circle cx="148" cy="160" r="2" fill="#d4882b" className="animate-pulse" />
        {/* Cigarette smoke curl */}
        <path d="M150 156 Q156 140 150 130 T160 110" stroke="rgba(240, 173, 53, 0.3)" strokeWidth="1.5" fill="none" />

        {/* Flat Cap (Peaky Blinders style) */}
        <path d="M60 102 C60 55, 160 55, 160 102 C160 108, 60 108, 60 102 Z" fill="url(#capGrad)" stroke="#121614" strokeWidth="2.5" />
        {/* Cap Visor */}
        <path d="M64 100 Q110 115 156 100 Q110 92 64 100 Z" fill="#1a211d" stroke="#0a0d0b" strokeWidth="2" />
        <circle cx="110" cy="62" r="3" fill="#2d3730" />
      </svg>
    </div>
  )
}

/** ARTHUR PENDELTON — 68, Chairman, Camel Coat, Pinstripes, Nervous/Arrogant */
function ArthurPortrait({ mood, dimensions, className }: { mood: CharacterMood; dimensions: string; className: string }) {
  const mouthPath = mood === 'furious' ? 'M96 174 Q110 162 124 174' : mood === 'skeptical' ? 'M98 168 Q110 172 122 166' : 'M98 166 Q110 168 122 166'

  return (
    <div className={`relative ${dimensions} ${className} flex items-end justify-center`}>
      <svg viewBox="0 0 220 300" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <radialGradient id="arthurRim" cx="80%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#bd2b26" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#070908" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="camelCoat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a37648" />
            <stop offset="60%" stopColor="#7a5530" />
            <stop offset="100%" stopColor="#4d331c" />
          </linearGradient>
        </defs>

        <circle cx="110" cy="140" r="115" fill="url(#arthurRim)" />

        {/* Heavy Camel Coat */}
        <path d="M15 300 C20 235, 45 210, 75 195 L95 245 L125 245 L145 195 C175 210, 200 235, 205 300 Z" fill="url(#camelCoat)" stroke="#2a1b0e" strokeWidth="3" />
        {/* Pinstripe waistcoat & Silk Tie */}
        <path d="M85 205 L110 255 L135 205 Z" fill="#1b241e" stroke="#c8842a" strokeWidth="1" />
        <path d="M106 205 L110 240 L114 205 Z" fill="#8b1e1e" />
        {/* Gold Pocket Watch Chain */}
        <path d="M115 245 Q125 255 135 248" stroke="#d4882b" strokeWidth="2" fill="none" />

        {/* Neck with Double Chin fold */}
        <path d="M92 175 L92 210 L128 210 L128 175 Z" fill="#a87d60" />
        <path d="M98 185 Q110 192 122 185" stroke="#785038" strokeWidth="2" fill="none" />

        {/* Head / Jowls */}
        <path d="M76 115 C72 170, 88 198, 110 198 C132 198, 148 170, 144 115 C144 75, 76 75, 76 115 Z" fill="#ba8c6c" stroke="#523420" strokeWidth="2" />

        {/* Thinning Slicked Grey Hair */}
        <path d="M74 105 C70 60, 150 60, 146 105 C142 85, 78 85, 74 105 Z" fill="#5c635f" stroke="#323835" strokeWidth="2" />
        <path d="M85 75 Q110 65 135 78" stroke="#8d9692" strokeWidth="1.5" fill="none" />

        {/* Eyes & Furrowed Brow */}
        <path d="M84 106 Q95 102 106 106" stroke="#2a180e" strokeWidth="2.5" fill="none" />
        <path d="M114 106 Q125 102 136 106" stroke="#2a180e" strokeWidth="2.5" fill="none" />
        <circle cx="95" cy="114" r="3.5" fill="#1b120a" />
        <circle cx="125" cy="114" r="3.5" fill="#1b120a" />
        {/* Eye Bags */}
        <path d="M88 120 Q95 125 102 120" stroke="#785038" strokeWidth="1.5" fill="none" />
        <path d="M118 120 Q125 125 132 120" stroke="#785038" strokeWidth="1.5" fill="none" />

        {/* Prominent Aquiline Nose */}
        <path d="M110 106 L107 138 L116 140 L113 134" stroke="#523420" strokeWidth="2" fill="none" />

        {/* Mouth */}
        <path d={mouthPath} stroke="#422514" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

/** TERRY MOSS — 33, Captain & Centre-back, Scarred Eyebrow, Calder Vale Kit */
function TerryPortrait({ mood, dimensions, className }: { mood: CharacterMood; dimensions: string; className: string }) {
  const browLeft = mood === 'furious' ? 'M80 115 L104 122' : 'M80 118 L104 116'
  const browRight = mood === 'furious' ? 'M138 115 L116 122' : 'M140 118 L116 116'

  return (
    <div className={`relative ${dimensions} ${className} flex items-end justify-center`}>
      <svg viewBox="0 0 220 300" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id="calderKit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a3a1a" />
            <stop offset="60%" stopColor="#102510" />
            <stop offset="100%" stopColor="#081408" />
          </linearGradient>
        </defs>

        {/* Muscular Shoulders / Muddy Calder Vale Jersey */}
        <path d="M10 300 C15 225, 45 200, 75 190 L95 235 L125 235 L145 190 C175 200, 205 225, 210 300 Z" fill="url(#calderKit)" stroke="#060e06" strokeWidth="3" />
        {/* Amber Jersey Trim */}
        <path d="M85 195 L110 220 L135 195" stroke="#d4882b" strokeWidth="4" fill="none" />
        {/* Mud stains */}
        <path d="M30 260 Q50 270 40 285" fill="#3d2a1b" opacity="0.6" />
        <path d="M170 250 Q185 265 175 280" fill="#3d2a1b" opacity="0.6" />

        {/* Thick Bull Neck */}
        <path d="M88 165 L88 205 L132 205 L132 165 Z" fill="#8c5d40" />

        {/* Chiseled Jawline */}
        <path d="M72 110 C70 165, 85 195, 110 195 C135 195, 150 165, 148 110 C148 70, 72 70, 72 110 Z" fill="#a67250" stroke="#482e1c" strokeWidth="2" />

        {/* Buzzcut Hair */}
        <path d="M72 105 C70 65, 150 65, 148 105 C146 75, 74 75, 72 105 Z" fill="#241a12" stroke="#100b07" strokeWidth="2" />

        {/* Eyebrows — Left has a prominent scar gap */}
        <path d={browLeft} stroke="#1b120a" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Eyebrow Scar Gap */}
        <line x1="90" y1="114" x2="92" y2="120" stroke="#a67250" strokeWidth="3" />
        <path d={browRight} stroke="#1b120a" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Intense Steely Eyes */}
        <circle cx="92" cy="122" r="4" fill="#0f1411" />
        <circle cx="128" cy="122" r="4" fill="#0f1411" />
        <circle cx="91" cy="120" r="1.5" fill="#ffffff" />
        <circle cx="127" cy="120" r="1.5" fill="#ffffff" />

        {/* Bandage across the bridge of nose */}
        <path d="M110 116 L108 144 L117 146" stroke="#482e1c" strokeWidth="2.5" fill="none" />
        <rect x="99" y="127" width="22" height="7" rx="2" fill="#d9cdb8" stroke="#8c7e68" strokeWidth="1" transform="rotate(-5 110 130)" />

        {/* Stern mouth */}
        <path d="M96 168 L124 168" stroke="#382113" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/** MAYA HIGGINS — 26, Lancashire Telegraph Journalist, Glasses, Trench Coat */
function MayaPortrait({ mood, dimensions, className }: { mood: CharacterMood; dimensions: string; className: string }) {
  return (
    <div className={`relative ${dimensions} ${className} flex items-end justify-center`}>
      <svg viewBox="0 0 220 300" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id="trenchCoat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4a5247" />
            <stop offset="100%" stopColor="#212620" />
          </linearGradient>
        </defs>

        {/* Trench Coat & Notebook Lapel */}
        <path d="M25 300 C30 235, 55 210, 80 200 L98 240 L122 240 L140 200 C165 210, 190 235, 195 300 Z" fill="url(#trenchCoat)" stroke="#141813" strokeWidth="3" />
        {/* Camera strap across chest */}
        <line x1="45" y1="210" x2="175" y2="300" stroke="#000000" strokeWidth="5" />

        {/* Head & Neck */}
        <path d="M96 170 L96 210 L124 210 L124 170 Z" fill="#9e7354" />
        <path d="M78 115 C76 165, 88 190, 110 190 C132 190, 144 165, 142 115 C142 75, 78 75, 78 115 Z" fill="#be9070" stroke="#503522" strokeWidth="2" />

        {/* Dark Bob Cut Hair */}
        <path d="M70 110 C68 60, 152 60, 150 110 C152 145, 138 160, 138 160 L136 120 C130 90, 90 90, 84 120 L82 160 C82 160, 68 145, 70 110 Z" fill="#1f1813" stroke="#0d0a08" strokeWidth="2" />
        {/* Pencil behind right ear */}
        <line x1="138" y1="95" x2="152" y2="80" stroke="#f0ad35" strokeWidth="3" strokeLinecap="round" />
        <polygon points="152,80 156,76 154,82" fill="#bd2b26" />

        {/* Sleek Spectacles */}
        <rect x="84" y="112" width="22" height="15" rx="3" fill="none" stroke="#d4882b" strokeWidth="2" />
        <rect x="114" y="112" width="22" height="15" rx="3" fill="none" stroke="#d4882b" strokeWidth="2" />
        <line x1="106" y1="118" x2="114" y2="118" stroke="#d4882b" strokeWidth="2" />
        {/* Eyes behind lenses */}
        <circle cx="95" cy="119" r="3.5" fill="#1a1410" />
        <circle cx="125" cy="119" r="3.5" fill="#1a1410" />

        {/* Nose & Cynical Smirk */}
        <path d="M110 115 L108 136 L114 137" stroke="#503522" strokeWidth="2" fill="none" />
        <path d="M100 158 Q112 158 122 154" stroke="#482518" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
