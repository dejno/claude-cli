// Flower pack data with SVG illustrations
const flowerPacks = {
    'northern-california': {
        name: 'Northern California',
        flowers: [
            {
                name: 'California Poppy',
                info: 'The state flower of California, known for its vibrant orange petals and drought tolerance.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Stem -->
                        <line x1="0" y1="20" x2="0" y2="80" stroke="#2d5016" stroke-width="4"/>
                        <!-- Leaves -->
                        <ellipse cx="-15" cy="50" rx="8" ry="15" fill="#4a7c59" transform="rotate(-30)"/>
                        <ellipse cx="15" cy="60" rx="6" ry="12" fill="#4a7c59" transform="rotate(30)"/>
                        <!-- Petals -->
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff6b35" transform="rotate(0)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff8c42" transform="rotate(45)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff6b35" transform="rotate(90)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff8c42" transform="rotate(135)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff6b35" transform="rotate(180)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff8c42" transform="rotate(225)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff6b35" transform="rotate(270)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="25" fill="#ff8c42" transform="rotate(315)"/>
                        <!-- Center -->
                        <circle cx="0" cy="0" r="8" fill="#2d5016"/>
                    </g>
                </svg>`
            },
            {
                name: 'Lavender',
                info: 'Aromatic herb with purple flower spikes, perfect for adding fragrance to arrangements.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Stems -->
                        <line x1="-20" y1="20" x2="-20" y2="80" stroke="#2d5016" stroke-width="3"/>
                        <line x1="0" y1="15" x2="0" y2="85" stroke="#2d5016" stroke-width="3"/>
                        <line x1="20" y1="25" x2="20" y2="75" stroke="#2d5016" stroke-width="3"/>
                        <!-- Flower spikes -->
                        <ellipse cx="-20" cy="-15" rx="4" ry="20" fill="#8e44ad"/>
                        <ellipse cx="0" cy="-20" rx="4" ry="25" fill="#9b59b6"/>
                        <ellipse cx="20" cy="-10" rx="4" ry="18" fill="#8e44ad"/>
                        <!-- Small flowers on spikes -->
                        <circle cx="-20" cy="-25" r="2" fill="#dda0dd"/>
                        <circle cx="-20" cy="-15" r="2" fill="#dda0dd"/>
                        <circle cx="-20" cy="-5" r="2" fill="#dda0dd"/>
                        <circle cx="0" cy="-35" r="2" fill="#dda0dd"/>
                        <circle cx="0" cy="-25" r="2" fill="#dda0dd"/>
                        <circle cx="0" cy="-15" r="2" fill="#dda0dd"/>
                        <circle cx="0" cy="-5" r="2" fill="#dda0dd"/>
                        <circle cx="20" cy="-20" r="2" fill="#dda0dd"/>
                        <circle cx="20" cy="-10" r="2" fill="#dda0dd"/>
                        <circle cx="20" cy="0" r="2" fill="#dda0dd"/>
                        <!-- Leaves -->
                        <ellipse cx="-30" cy="40" rx="3" ry="15" fill="#4a7c59"/>
                        <ellipse cx="30" cy="45" rx="3" ry="12" fill="#4a7c59"/>
                    </g>
                </svg>`
            },
            {
                name: 'Eucalyptus',
                info: 'Silvery-green foliage that adds texture and a fresh scent to floral arrangements.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Main branch -->
                        <line x1="0" y1="20" x2="0" y2="80" stroke="#8b4513" stroke-width="4"/>
                        <!-- Side branches -->
                        <line x1="0" y1="30" x2="-30" y2="20" stroke="#8b4513" stroke-width="2"/>
                        <line x1="0" y1="45" x2="25" y2="35" stroke="#8b4513" stroke-width="2"/>
                        <line x1="0" y1="60" x2="-20" y2="55" stroke="#8b4513" stroke-width="2"/>
                        <!-- Eucalyptus leaves -->
                        <ellipse cx="0" cy="-10" rx="8" ry="15" fill="#a8b8a0" transform="rotate(15)"/>
                        <ellipse cx="-8" cy="5" rx="6" ry="12" fill="#9da89a" transform="rotate(-20)"/>
                        <ellipse cx="10" cy="20" rx="7" ry="14" fill="#a8b8a0" transform="rotate(30)"/>
                        <ellipse cx="-25" cy="15" rx="5" ry="10" fill="#9da89a"/>
                        <ellipse cx="20" cy="30" rx="6" ry="11" fill="#a8b8a0"/>
                        <ellipse cx="-15" cy="50" rx="4" ry="8" fill="#9da89a"/>
                        <!-- More leaves scattered -->
                        <ellipse cx="-35" cy="10" rx="4" ry="8" fill="#b8c5b0"/>
                        <ellipse cx="30" cy="25" rx="5" ry="9" fill="#b8c5b0"/>
                        <ellipse cx="-25" cy="45" rx="3" ry="6" fill="#b8c5b0"/>
                    </g>
                </svg>`
            },
            {
                name: 'Sunflower',
                info: 'Large, cheerful yellow flowers that follow the sun and symbolize loyalty and adoration.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Stem -->
                        <line x1="0" y1="25" x2="0" y2="80" stroke="#2d5016" stroke-width="6"/>
                        <!-- Large leaves -->
                        <ellipse cx="-20" cy="50" rx="10" ry="20" fill="#4a7c59" transform="rotate(-15)"/>
                        <ellipse cx="25" cy="60" rx="8" ry="16" fill="#4a7c59" transform="rotate(15)"/>
                        <!-- Outer petals -->
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(0)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(20)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(40)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(60)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(80)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(100)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(120)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(140)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(160)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(180)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(200)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(220)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(240)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(260)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(280)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(300)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffd700" transform="rotate(320)"/>
                        <ellipse cx="0" cy="-35" rx="8" ry="20" fill="#ffed4e" transform="rotate(340)"/>
                        <!-- Center -->
                        <circle cx="0" cy="0" r="18" fill="#8b4513"/>
                        <circle cx="0" cy="0" r="12" fill="#654321"/>
                    </g>
                </svg>`
            },
            {
                name: 'California Lilac',
                info: 'Clusters of tiny blue or purple flowers that bloom in spring, native to California.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Branches -->
                        <line x1="0" y1="20" x2="0" y2="80" stroke="#654321" stroke-width="3"/>
                        <line x1="0" y1="10" x2="-25" y2="-5" stroke="#654321" stroke-width="2"/>
                        <line x1="0" y1="15" x2="20" y2="0" stroke="#654321" stroke-width="2"/>
                        <!-- Flower clusters -->
                        <ellipse cx="0" cy="-25" rx="12" ry="20" fill="#6a5acd"/>
                        <ellipse cx="-20" cy="-15" rx="8" ry="15" fill="#7b68ee"/>
                        <ellipse cx="15" cy="-10" rx="10" ry="18" fill="#6a5acd"/>
                        <!-- Individual tiny flowers -->
                        <circle cx="-2" cy="-35" r="1.5" fill="#e6e6fa"/>
                        <circle cx="3" cy="-30" r="1.5" fill="#e6e6fa"/>
                        <circle cx="-5" cy="-25" r="1.5" fill="#e6e6fa"/>
                        <circle cx="8" cy="-28" r="1.5" fill="#e6e6fa"/>
                        <circle cx="0" cy="-20" r="1.5" fill="#e6e6fa"/>
                        <circle cx="-15" cy="-20" r="1.5" fill="#e6e6fa"/>
                        <circle cx="-25" cy="-10" r="1.5" fill="#e6e6fa"/>
                        <circle cx="20" cy="-15" r="1.5" fill="#e6e6fa"/>
                        <circle cx="10" cy="-5" r="1.5" fill="#e6e6fa"/>
                        <!-- Leaves -->
                        <ellipse cx="-15" cy="30" rx="5" ry="12" fill="#228b22"/>
                        <ellipse cx="18" cy="40" rx="4" ry="10" fill="#228b22"/>
                        <ellipse cx="-8" cy="55" rx="3" ry="8" fill="#228b22"/>
                    </g>
                </svg>`
            },
            {
                name: 'Manzanita',
                info: 'Distinctive red bark and bell-shaped flowers, endemic to the western United States.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Twisted branches -->
                        <path d="M 0 20 Q -10 30 -5 50 Q 5 70 0 80" stroke="#a0522d" stroke-width="4" fill="none"/>
                        <path d="M -5 35 Q -20 25 -15 10" stroke="#a0522d" stroke-width="3" fill="none"/>
                        <path d="M 0 45 Q 15 40 20 25" stroke="#a0522d" stroke-width="3" fill="none"/>
                        <!-- Bell-shaped flowers -->
                        <ellipse cx="0" cy="-15" rx="3" ry="6" fill="#ffb6c1"/>
                        <ellipse cx="-12" cy="-5" rx="2.5" ry="5" fill="#ffc0cb"/>
                        <ellipse cx="15" cy="15" rx="3" ry="6" fill="#ffb6c1"/>
                        <ellipse cx="-8" cy="0" rx="2" ry="4" fill="#ffc0cb"/>
                        <ellipse cx="8" cy="5" rx="2.5" ry="5" fill="#ffb6c1"/>
                        <!-- Flower clusters -->
                        <circle cx="2" cy="-18" r="1" fill="#ff69b4"/>
                        <circle cx="-2" cy="-12" r="1" fill="#ff69b4"/>
                        <circle cx="-15" cy="-8" r="1" fill="#ff69b4"/>
                        <circle cx="18" cy="12" r="1" fill="#ff69b4"/>
                        <!-- Small oval leaves -->
                        <ellipse cx="-18" cy="15" rx="4" ry="8" fill="#556b2f"/>
                        <ellipse cx="25" cy="35" rx="3" ry="6" fill="#556b2f"/>
                        <ellipse cx="-10" cy="50" rx="3" ry="7" fill="#556b2f"/>
                        <ellipse cx="8" cy="55" rx="2" ry="5" fill="#556b2f"/>
                    </g>
                </svg>`
            },
            {
                name: 'Protea',
                info: 'Exotic South African flower with unique crown-like appearance, popular in modern arrangements.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Stem -->
                        <line x1="0" y1="25" x2="0" y2="80" stroke="#2d5016" stroke-width="5"/>
                        <!-- Outer bracts (spiky) -->
                        <polygon points="0,-30 -8,-15 -5,0" fill="#dc143c"/>
                        <polygon points="0,-30 8,-15 5,0" fill="#dc143c"/>
                        <polygon points="-15,-25 -20,-10 -15,5" fill="#b22222"/>
                        <polygon points="15,-25 20,-10 15,5" fill="#b22222"/>
                        <polygon points="-25,-15 -25,0 -20,10" fill="#dc143c"/>
                        <polygon points="25,-15 25,0 20,10" fill="#dc143c"/>
                        <polygon points="-20,-20 -30,-5 -25,5" fill="#b22222"/>
                        <polygon points="20,-20 30,-5 25,5" fill="#b22222"/>
                        <!-- Inner crown -->
                        <circle cx="0" cy="-10" r="12" fill="#ff1744"/>
                        <circle cx="0" cy="-10" r="8" fill="#ffebcd"/>
                        <!-- Fuzzy center texture -->
                        <circle cx="-3" cy="-12" r="1" fill="#8b4513"/>
                        <circle cx="4" cy="-8" r="1" fill="#8b4513"/>
                        <circle cx="0" cy="-6" r="1" fill="#8b4513"/>
                        <circle cx="-2" cy="-15" r="1" fill="#8b4513"/>
                        <circle cx="3" cy="-13" r="1" fill="#8b4513"/>
                        <!-- Thick leaves at base -->
                        <ellipse cx="-12" cy="30" rx="6" ry="18" fill="#2e8b57"/>
                        <ellipse cx="15" cy="35" rx="5" ry="15" fill="#2e8b57"/>
                        <ellipse cx="-5" cy="45" rx="4" ry="12" fill="#2e8b57"/>
                    </g>
                </svg>`
            },
            {
                name: 'Jasmine',
                info: 'Fragrant white star-shaped flowers, often used in bridal bouquets and perfumes.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Vine-like stems -->
                        <path d="M 0 20 Q -15 35 -10 55 Q 0 70 10 80" stroke="#228b22" stroke-width="3" fill="none"/>
                        <path d="M -10 40 Q -25 30 -30 15" stroke="#228b22" stroke-width="2" fill="none"/>
                        <path d="M 5 50 Q 20 45 25 30" stroke="#228b22" stroke-width="2" fill="none"/>
                        <!-- Star-shaped white flowers -->
                        <g transform="translate(0,-20)">
                            <polygon points="0,-8 -2,-2 -8,-2 -3,2 -5,8 0,4 5,8 3,2 8,-2 2,-2" fill="white" stroke="#f0f8ff" stroke-width="0.5"/>
                            <circle cx="0" cy="0" r="2" fill="#fffacd"/>
                        </g>
                        <g transform="translate(-20,10)">
                            <polygon points="0,-6 -1.5,-1.5 -6,-1.5 -2.5,1.5 -4,6 0,3 4,6 2.5,1.5 6,-1.5 1.5,-1.5" fill="white" stroke="#f0f8ff" stroke-width="0.5"/>
                            <circle cx="0" cy="0" r="1.5" fill="#fffacd"/>
                        </g>
                        <g transform="translate(18,25)">
                            <polygon points="0,-7 -1.5,-1.5 -7,-1.5 -3,2 -4,7 0,4 4,7 3,2 7,-1.5 1.5,-1.5" fill="white" stroke="#f0f8ff" stroke-width="0.5"/>
                            <circle cx="0" cy="0" r="1.8" fill="#fffacd"/>
                        </g>
                        <g transform="translate(-25,5)">
                            <polygon points="0,-5 -1,-1 -5,-1 -2,1.5 -3,5 0,3 3,5 2,1.5 5,-1 1,-1" fill="white" stroke="#f0f8ff" stroke-width="0.5"/>
                            <circle cx="0" cy="0" r="1.2" fill="#fffacd"/>
                        </g>
                        <!-- Small green leaves -->
                        <ellipse cx="-8" cy="35" rx="3" ry="8" fill="#32cd32" transform="rotate(-15)"/>
                        <ellipse cx="12" cy="45" rx="2.5" ry="6" fill="#32cd32" transform="rotate(20)"/>
                        <ellipse cx="-15" cy="55" rx="2" ry="5" fill="#32cd32"/>
                        <ellipse cx="20" cy="65" rx="2.5" ry="7" fill="#32cd32"/>
                    </g>
                </svg>`
            }
        ]
    },
    'florida': {
        name: 'Florida',
        flowers: [
            {
                name: 'Hibiscus',
                info: 'Large, tropical flowers with prominent stamens, Florida\'s state flower.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Stem -->
                        <line x1="0" y1="25" x2="0" y2="80" stroke="#2d5016" stroke-width="4"/>
                        <!-- Large hibiscus petals -->
                        <ellipse cx="0" cy="-30" rx="15" ry="25" fill="#ff1744" transform="rotate(0)"/>
                        <ellipse cx="0" cy="-30" rx="15" ry="25" fill="#e91e63" transform="rotate(72)"/>
                        <ellipse cx="0" cy="-30" rx="15" ry="25" fill="#ff1744" transform="rotate(144)"/>
                        <ellipse cx="0" cy="-30" rx="15" ry="25" fill="#e91e63" transform="rotate(216)"/>
                        <ellipse cx="0" cy="-30" rx="15" ry="25" fill="#ff1744" transform="rotate(288)"/>
                        <!-- Prominent stamen -->
                        <line x1="0" y1="0" x2="0" y2="-25" stroke="#ffeb3b" stroke-width="3"/>
                        <circle cx="0" cy="-25" r="3" fill="#ff9800"/>
                        <!-- Center -->
                        <circle cx="0" cy="0" r="6" fill="#ffeb3b"/>
                        <!-- Large tropical leaves -->
                        <ellipse cx="-25" cy="40" rx="8" ry="20" fill="#1b5e20" transform="rotate(-20)"/>
                        <ellipse cx="30" cy="50" rx="10" ry="25" fill="#2e7d32" transform="rotate(15)"/>
                        <ellipse cx="-10" cy="65" rx="6" ry="15" fill="#1b5e20"/>
                    </g>
                </svg>`
            },
            {
                name: 'Bird of Paradise',
                info: 'Striking orange and blue flowers that resemble a tropical bird in flight.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Thick stem -->
                        <line x1="0" y1="20" x2="0" y2="80" stroke="#2d5016" stroke-width="6"/>
                        <!-- Main flower structure -->
                        <ellipse cx="-10" cy="-15" rx="25" ry="8" fill="#ff6600" transform="rotate(-10)"/>
                        <!-- Blue petals (wings) -->
                        <ellipse cx="5" cy="-25" rx="8" ry="15" fill="#1976d2" transform="rotate(45)"/>
                        <ellipse cx="10" cy="-20" rx="6" ry="12" fill="#2196f3" transform="rotate(60)"/>
                        <ellipse cx="15" cy="-15" rx="4" ry="10" fill="#1976d2" transform="rotate(75)"/>
                        <!-- Orange sepals -->
                        <ellipse cx="-20" cy="-10" rx="12" ry="5" fill="#ff8f00"/>
                        <ellipse cx="-15" cy="-20" rx="10" ry="4" fill="#ff6f00"/>
                        <!-- Pointed beak-like structure -->
                        <polygon points="-35,-15 -25,-8 -30,-5" fill="#ff5722"/>
                        <!-- Large paddle-shaped leaves -->
                        <ellipse cx="-40" cy="45" rx="12" ry="35" fill="#1b5e20"/>
                        <ellipse cx="35" cy="50" rx="15" ry="40" fill="#2e7d32"/>
                        <!-- Leaf veins -->
                        <line x1="-40" y1="20" x2="-40" y2="70" stroke="#0d4e14" stroke-width="1"/>
                        <line x1="35" y1="20" x2="35" y2="80" stroke="#1a5025" stroke-width="1"/>
                    </g>
                </svg>`
            },
            {
                name: 'Bougainvillea',
                info: 'Vibrant papery bracts in purple, pink, or red that surround small white flowers.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Thorny vine stems -->
                        <path d="M 0 20 Q -20 30 -15 50 Q 0 65 15 75" stroke="#654321" stroke-width="3" fill="none"/>
                        <path d="M -10 35 Q -25 25 -20 10" stroke="#654321" stroke-width="2" fill="none"/>
                        <path d="M 8 45 Q 25 35 30 20" stroke="#654321" stroke-width="2" fill="none"/>
                        <!-- Thorns -->
                        <polygon points="-8,40 -5,37 -5,43" fill="#8b4513"/>
                        <polygon points="12,50 15,47 15,53" fill="#8b4513"/>
                        <!-- Papery bracts -->
                        <ellipse cx="0" cy="-20" rx="8" ry="12" fill="#8e24aa" transform="rotate(15)"/>
                        <ellipse cx="-10" cy="-15" rx="6" ry="10" fill="#9c27b0" transform="rotate(-20)"/>
                        <ellipse cx="8" cy="-25" rx="7" ry="11" fill="#8e24aa" transform="rotate(45)"/>
                        <ellipse cx="-15" cy="0" rx="5" ry="8" fill="#ab47bc"/>
                        <ellipse cx="20" cy="15" rx="6" ry="9" fill="#9c27b0" transform="rotate(30)"/>
                        <ellipse cx="-18" cy="-8" rx="4" ry="7" fill="#8e24aa" transform="rotate(-45)"/>
                        <!-- Small white true flowers -->
                        <circle cx="0" cy="-18" r="1.5" fill="white"/>
                        <circle cx="-8" cy="-12" r="1" fill="white"/>
                        <circle cx="15" cy="10" r="1.5" fill="white"/>
                        <!-- Heart-shaped leaves -->
                        <path d="M -20 30 Q -25 25 -20 20 Q -15 25 -15 30 Q -17.5 35 -20 30" fill="#228b22"/>
                        <path d="M 25 40 Q 30 35 25 30 Q 20 35 20 40 Q 22.5 45 25 40" fill="#228b22"/>
                        <path d="M -5 55 Q -10 50 -5 45 Q 0 50 0 55 Q -2.5 60 -5 55" fill="#228b22"/>
                    </g>
                </svg>`
            },
            {
                name: 'Plumeria',
                info: 'Fragrant five-petaled flowers commonly used in Hawaiian leis, also known as frangipani.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Thick succulent stem -->
                        <line x1="0" y1="20" x2="0" y2="80" stroke="#654321" stroke-width="5"/>
                        <!-- Five rounded petals -->
                        <ellipse cx="0" cy="-25" rx="12" ry="18" fill="#fff8dc" transform="rotate(0)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="18" fill="#fffaf0" transform="rotate(72)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="18" fill="#fff8dc" transform="rotate(144)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="18" fill="#fffaf0" transform="rotate(216)"/>
                        <ellipse cx="0" cy="-25" rx="12" ry="18" fill="#fff8dc" transform="rotate(288)"/>
                        <!-- Yellow center gradient -->
                        <circle cx="0" cy="0" r="8" fill="#ffd700"/>
                        <circle cx="0" cy="0" r="5" fill="#ffff99"/>
                        <!-- Pink/red edges on petals -->
                        <ellipse cx="0" cy="-35" rx="3" ry="8" fill="#ffb6c1" transform="rotate(0)"/>
                        <ellipse cx="0" cy="-35" rx="3" ry="8" fill="#ffb6c1" transform="rotate(72)"/>
                        <ellipse cx="0" cy="-35" rx="3" ry="8" fill="#ffb6c1" transform="rotate(144)"/>
                        <ellipse cx="0" cy="-35" rx="3" ry="8" fill="#ffb6c1" transform="rotate(216)"/>
                        <ellipse cx="0" cy="-35" rx="3" ry="8" fill="#ffb6c1" transform="rotate(288)"/>
                        <!-- Thick succulent leaves -->
                        <ellipse cx="-20" cy="45" rx="8" ry="25" fill="#2e7d32"/>
                        <ellipse cx="25" cy="50" rx="6" ry="20" fill="#388e3c"/>
                        <ellipse cx="-5" cy="65" rx="5" ry="15" fill="#2e7d32"/>
                    </g>
                </svg>`
            },
            {
                name: 'Ixora',
                info: 'Clusters of small four-petaled flowers in bright coral, red, or yellow colors.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Stem -->
                        <line x1="0" y1="15" x2="0" y2="80" stroke="#2d5016" stroke-width="4"/>
                        <!-- Flower cluster center -->
                        <circle cx="0" cy="-15" r="18" fill="#ff4500"/>
                        <!-- Individual four-petaled flowers -->
                        <g transform="translate(-8,-25)">
                            <ellipse cx="0" cy="-3" rx="2" ry="4" fill="#ff6347"/>
                            <ellipse cx="0" cy="3" rx="2" ry="4" fill="#ff6347"/>
                            <ellipse cx="-3" cy="0" rx="4" ry="2" fill="#ff6347"/>
                            <ellipse cx="3" cy="0" rx="4" ry="2" fill="#ff6347"/>
                            <circle cx="0" cy="0" r="1" fill="#ffff99"/>
                        </g>
                        <g transform="translate(10,-20)">
                            <ellipse cx="0" cy="-3" rx="2" ry="4" fill="#ff4500"/>
                            <ellipse cx="0" cy="3" rx="2" ry="4" fill="#ff4500"/>
                            <ellipse cx="-3" cy="0" rx="4" ry="2" fill="#ff4500"/>
                            <ellipse cx="3" cy="0" rx="4" ry="2" fill="#ff4500"/>
                            <circle cx="0" cy="0" r="1" fill="#ffff99"/>
                        </g>
                        <g transform="translate(5,-5)">
                            <ellipse cx="0" cy="-3" rx="2" ry="4" fill="#ff6347"/>
                            <ellipse cx="0" cy="3" rx="2" ry="4" fill="#ff6347"/>
                            <ellipse cx="-3" cy="0" rx="4" ry="2" fill="#ff6347"/>
                            <ellipse cx="3" cy="0" rx="4" ry="2" fill="#ff6347"/>
                            <circle cx="0" cy="0" r="1" fill="#ffff99"/>
                        </g>
                        <g transform="translate(-12,-10)">
                            <ellipse cx="0" cy="-3" rx="2" ry="4" fill="#ff4500"/>
                            <ellipse cx="0" cy="3" rx="2" ry="4" fill="#ff4500"/>
                            <ellipse cx="-3" cy="0" rx="4" ry="2" fill="#ff4500"/>
                            <ellipse cx="3" cy="0" rx="4" ry="2" fill="#ff4500"/>
                            <circle cx="0" cy="0" r="1" fill="#ffff99"/>
                        </g>
                        <!-- Glossy leaves -->
                        <ellipse cx="-18" cy="35" rx="6" ry="18" fill="#1b5e20"/>
                        <ellipse cx="20" cy="40" rx="5" ry="15" fill="#2e7d32"/>
                        <ellipse cx="-8" cy="60" rx="4" ry="12" fill="#1b5e20"/>
                        <ellipse cx="12" cy="65" rx="3" ry="10" fill="#2e7d32"/>
                    </g>
                </svg>`
            },
            {
                name: 'Firebush',
                info: 'Tubular orange-red flowers that attract butterflies and hummingbirds.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Multiple stems -->
                        <line x1="0" y1="20" x2="0" y2="80" stroke="#2d5016" stroke-width="4"/>
                        <line x1="0" y1="30" x2="-15" y2="10" stroke="#2d5016" stroke-width="3"/>
                        <line x1="0" y1="40" x2="18" y2="25" stroke="#2d5016" stroke-width="3"/>
                        <!-- Tubular flowers -->
                        <ellipse cx="0" cy="-20" rx="3" ry="12" fill="#ff4500" transform="rotate(10)"/>
                        <ellipse cx="-8" cy="-15" rx="2.5" ry="10" fill="#ff6347" transform="rotate(-15)"/>
                        <ellipse cx="6" cy="-25" rx="3" ry="11" fill="#ff4500" transform="rotate(25)"/>
                        <ellipse cx="-12" cy="-5" rx="2" ry="8" fill="#ff6347" transform="rotate(-30)"/>
                        <ellipse cx="15" cy="15" rx="2.5" ry="9" fill="#ff4500" transform="rotate(40)"/>
                        <!-- Flower openings -->
                        <circle cx="0" cy="-30" r="2" fill="#ff8c00"/>
                        <circle cx="-10" cy="-23" r="1.5" fill="#ff8c00"/>
                        <circle cx="8" cy="-35" r="2" fill="#ff8c00"/>
                        <circle cx="-15" cy="-12" r="1" fill="#ff8c00"/>
                        <circle cx="18" cy="8" r="1.5" fill="#ff8c00"/>
                        <!-- Stamens protruding -->
                        <line x1="0" y1="-30" x2="0" y2="-35" stroke="#ffff00" stroke-width="1"/>
                        <line x1="-10" y1="-23" x2="-10" y2="-27" stroke="#ffff00" stroke-width="1"/>
                        <line x1="8" y1="-35" x2="8" y2="-40" stroke="#ffff00" stroke-width="1"/>
                        <!-- Oval leaves -->
                        <ellipse cx="-20" cy="35" rx="5" ry="15" fill="#228b22"/>
                        <ellipse cx="25" cy="45" rx="4" ry="12" fill="#32cd32"/>
                        <ellipse cx="-10" cy="60" rx="3" ry="10" fill="#228b22"/>
                        <ellipse cx="15" cy="65" rx="4" ry="11" fill="#32cd32"/>
                    </g>
                </svg>`
            },
            {
                name: 'Coontie',
                info: 'Native cycad with feathery fronds, an ancient plant that predates flowering plants.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Central trunk -->
                        <ellipse cx="0" cy="60" rx="8" ry="25" fill="#654321"/>
                        <!-- Feathery fronds -->
                        <path d="M 0 20 Q -30 10 -35 -10 Q -30 0 -25 10 Q -20 5 -15 15 Q -10 10 -5 20"
                              stroke="#2e7d32" stroke-width="2" fill="#388e3c"/>
                        <path d="M 0 15 Q 25 5 30 -15 Q 25 -5 20 5 Q 15 0 10 10 Q 5 5 0 15"
                              stroke="#2e7d32" stroke-width="2" fill="#388e3c"/>
                        <path d="M -5 25 Q -35 15 -40 -5 Q -35 5 -30 15 Q -25 10 -20 20 Q -15 15 -10 25"
                              stroke="#1b5e20" stroke-width="2" fill="#2e7d32"/>
                        <path d="M 5 20 Q 30 10 35 -10 Q 30 0 25 10 Q 20 5 15 15 Q 10 10 5 20"
                              stroke="#1b5e20" stroke-width="2" fill="#2e7d32"/>
                        <!-- Individual leaflets -->
                        <ellipse cx="-25" cy="0" rx="2" ry="6" fill="#4caf50" transform="rotate(-30)"/>
                        <ellipse cx="-30" cy="-5" rx="1.5" ry="5" fill="#4caf50" transform="rotate(-45)"/>
                        <ellipse cx="-20" cy="8" rx="2" ry="6" fill="#4caf50" transform="rotate(-15)"/>
                        <ellipse cx="20" cy="2" rx="2" ry="6" fill="#4caf50" transform="rotate(30)"/>
                        <ellipse cx="25" cy="-8" rx="1.5" ry="5" fill="#4caf50" transform="rotate(45)"/>
                        <ellipse cx="15" cy="10" rx="2" ry="6" fill="#4caf50" transform="rotate(15)"/>
                        <!-- More fronds in background -->
                        <path d="M -8 30 Q -25 25 -30 5 Q -25 15 -20 25 Q -15 20 -10 30"
                              stroke="#1b5e20" stroke-width="1.5" fill="#2e7d32" opacity="0.7"/>
                        <path d="M 8 28 Q 25 23 30 3 Q 25 13 20 23 Q 15 18 10 28"
                              stroke="#1b5e20" stroke-width="1.5" fill="#2e7d32" opacity="0.7"/>
                    </g>
                </svg>`
            },
            {
                name: 'Firespike',
                info: 'Tall spikes of small tubular red flowers that bloom continuously in warm weather.',
                svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100,100)">
                        <!-- Tall stems -->
                        <line x1="0" y1="25" x2="0" y2="80" stroke="#2d5016" stroke-width="4"/>
                        <line x1="-15" y1="30" x2="-15" y2="75" stroke="#2d5016" stroke-width="3"/>
                        <line x1="12" y1="35" x2="12" y2="70" stroke="#2d5016" stroke-width="3"/>
                        <!-- Flower spikes -->
                        <ellipse cx="0" cy="-25" rx="4" ry="30" fill="#dc143c"/>
                        <ellipse cx="-15" cy="-15" rx="3" ry="25" fill="#b22222"/>
                        <ellipse cx="12" cy="-10" rx="3" ry="20" fill="#dc143c"/>
                        <!-- Individual tubular flowers -->
                        <ellipse cx="0" cy="-45" rx="1.5" ry="4" fill="#ff6347"/>
                        <ellipse cx="-2" cy="-35" rx="1.5" ry="4" fill="#ff6347"/>
                        <ellipse cx="2" cy="-25" rx="1.5" ry="4" fill="#ff6347"/>
                        <ellipse cx="0" cy="-15" rx="1.5" ry="4" fill="#ff6347"/>
                        <ellipse cx="-1" cy="-5" rx="1.5" ry="4" fill="#ff6347"/>
                        <ellipse cx="-15" cy="-30" rx="1" ry="3" fill="#ff4500"/>
                        <ellipse cx="-13" cy="-20" rx="1" ry="3" fill="#ff4500"/>
                        <ellipse cx="-17" cy="-10" rx="1" ry="3" fill="#ff4500"/>
                        <ellipse cx="12" cy="-25" rx="1" ry="3" fill="#ff6347"/>
                        <ellipse cx="14" cy="-15" rx="1" ry="3" fill="#ff6347"/>
                        <ellipse cx="10" cy="-5" rx="1" ry="3" fill="#ff6347"/>
                        <!-- Narrow leaves -->
                        <ellipse cx="-25" cy="40" rx="3" ry="20" fill="#228b22"/>
                        <ellipse cx="25" cy="45" rx="2.5" ry="18" fill="#32cd32"/>
                        <ellipse cx="-8" cy="55" rx="2" ry="15" fill="#228b22"/>
                        <ellipse cx="18" cy="60" rx="2.5" ry="16" fill="#32cd32"/>
                        <!-- Additional smaller spikes -->
                        <ellipse cx="-25" cy="10" rx="2" ry="15" fill="#b22222"/>
                        <ellipse cx="25" cy="15" rx="2" ry="12" fill="#dc143c"/>
                    </g>
                </svg>`
            }
        ]
    }
};

// Game state
let currentPack = null;
let currentCardIndex = 0;
let isFlipped = false;

// DOM elements
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const completionModal = document.getElementById('completion-modal');
const flashcard = document.getElementById('flashcard');
const flowerSvg = document.getElementById('flower-svg');
const flowerName = document.getElementById('flower-name');
const flowerInfo = document.getElementById('flower-info');
const currentCardSpan = document.getElementById('current-card');
const totalCardsSpan = document.getElementById('total-cards');
const themeNameSpan = document.getElementById('theme-name');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const exitBtn = document.getElementById('exit-btn');
const homeBtn = document.getElementById('home-btn');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Pack selection
    document.querySelectorAll('.select-pack-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const packCard = this.closest('.pack-card');
            const theme = packCard.dataset.theme;
            startPack(theme);
        });
    });

    // Pack card click
    document.querySelectorAll('.pack-card').forEach(card => {
        card.addEventListener('click', function() {
            const theme = this.dataset.theme;
            startPack(theme);
        });
    });

    // Flashcard flip
    flashcard.addEventListener('click', function() {
        flipCard();
    });

    // Navigation buttons
    prevBtn.addEventListener('click', previousCard);
    nextBtn.addEventListener('click', nextCard);
    exitBtn.addEventListener('click', exitToHome);
    homeBtn.addEventListener('click', exitToHome);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (gameScreen.classList.contains('active')) {
            switch(e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    flipCard();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (!prevBtn.disabled) previousCard();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (!nextBtn.disabled) nextCard();
                    break;
                case 'Escape':
                    exitToHome();
                    break;
            }
        }
    });
});

function startPack(theme) {
    currentPack = flowerPacks[theme];
    currentCardIndex = 0;
    isFlipped = false;

    homeScreen.classList.remove('active');
    gameScreen.classList.add('active');

    themeNameSpan.textContent = currentPack.name;
    totalCardsSpan.textContent = currentPack.flowers.length;

    loadCard();
}

function loadCard() {
    const flower = currentPack.flowers[currentCardIndex];

    // Reset card flip state
    flashcard.classList.remove('flipped');
    isFlipped = false;

    // Load content
    flowerSvg.innerHTML = flower.svg;
    flowerName.textContent = flower.name;
    flowerInfo.textContent = flower.info;

    // Update progress
    currentCardSpan.textContent = currentCardIndex + 1;

    // Update navigation buttons
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === currentPack.flowers.length - 1;
}

function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        loadCard();
    }
}

function nextCard() {
    if (currentCardIndex < currentPack.flowers.length - 1) {
        currentCardIndex++;
        loadCard();
    } else {
        // Show completion modal
        showCompletionModal();
    }
}

function showCompletionModal() {
    completionModal.classList.add('active');
}

function exitToHome() {
    homeScreen.classList.add('active');
    gameScreen.classList.remove('active');
    completionModal.classList.remove('active');

    // Reset state
    currentPack = null;
    currentCardIndex = 0;
    isFlipped = false;
}