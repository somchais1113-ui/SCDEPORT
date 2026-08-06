/*
  PROJECT DATA
  - category: use an id from data/categories.js
  - cover: image shown on the homepage
  - gallery: images shown on the project page
  - slug: unique project id used in project.html?id=<slug>
  - brand / brandLabel: optional brand grouping inside a category
  - *Th fields: Thai copy used when the language toggle is set to TH
*/

window.PORTFOLIO_PROJECTS = [
  {
    slug: "urban-signals",
    order: 1,
    category: "advertising",
    title: "Urban Signals",
    sector: "Advertising",
    sectorTh: "งานโฆษณา",
    year: "2026",
    cover: "assets/images/projects/advertising/urban-signals/cover-1200x900.webp",
    coverAlt: "Advertising system with poster, billboard and digital screen on a white background",
    summary: "An adaptable advertising system built to stay recognisable across print, outdoor and digital formats.",
    summaryTh: "ระบบโฆษณาที่ยืดหยุ่น แต่ยังรักษาภาพจำเดียวกันได้ทั้งสื่อสิ่งพิมพ์ สื่อนอกบ้าน และดิจิทัล",
    challenge: "Create a bold campaign language that can hold attention at different scales without relying on dense messaging.",
    challengeTh: "สร้างภาษาแคมเปญที่โดดเด่นพอจะดึงความสนใจได้ในทุกขนาดสื่อ โดยไม่ต้องพึ่งข้อความจำนวนมาก",
    solution: "High-contrast colour, repeated geometry and generous space create one clear visual rhythm from poster to screen.",
    solutionTh: "ใช้สีคอนทราสต์สูง รูปทรงเรขาคณิตที่ซ้ำอย่างมีจังหวะ และพื้นที่ว่างที่เพียงพอ เพื่อสร้างจังหวะภาพเดียวกันตั้งแต่โปสเตอร์จนถึงหน้าจอ",
    scope: ["Art direction", "Advertising system", "Digital and OOH", "Campaign toolkit"],
    scopeTh: ["กำกับศิลป์", "ระบบงานโฆษณา", "สื่อดิจิทัลและสื่อนอกบ้าน", "ชุดเครื่องมือแคมเปญ"],
    direction: "Direct / Graphic / Scalable",
    directionTh: "ตรงประเด็น / กราฟิกชัด / ขยายต่อได้",
    gallery: [
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-01-1440x1080.webp",
        alt: "Urban Signals overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-02-1100x825.webp",
        alt: "Urban Signals detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-03-1100x825.webp",
        alt: "Urban Signals detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-04-1400x1100.webp",
        alt: "Urban Signals detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-05-1400x1100.webp",
        alt: "Urban Signals detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-06-1400x1100.webp",
        alt: "Urban Signals system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-07-1600x900.webp",
        alt: "Urban Signals wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-08-1600x900.webp",
        alt: "Urban Signals wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-09-1400x1100.webp",
        alt: "Urban Signals detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/advertising/urban-signals/gallery-10-1200x1500.webp",
        alt: "Urban Signals portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "good-daily",
    order: 2,
    category: "packaging-design",
    title: "Good Daily",
    sector: "Packaging",
    sectorTh: "บรรจุภัณฑ์",
    year: "2026",
    cover: "assets/images/projects/packaging-design/good-daily/cover-1200x900.webp",
    coverAlt: "A coordinated packaging family in white, cobalt, red and lime",
    summary: "A modular packaging family designed for clarity, shelf recognition and consistent range growth.",
    summaryTh: "ระบบบรรจุภัณฑ์แบบโมดูลาร์ที่อ่านง่าย โดดเด่นบนชั้นวาง และพร้อมเติบโตไปกับกลุ่มสินค้า",
    challenge: "Build a broad product family that feels energetic while remaining easy to scan and organise at retail.",
    challengeTh: "สร้างกลุ่มสินค้าที่กว้างและดูมีพลัง แต่ยังอ่านง่ายและจัดเรียงบนชั้นวางได้อย่างเป็นระบบ",
    solution: "A restrained base, strong colour blocks and shared graphic rules connect different formats without making them identical.",
    solutionTh: "วางพื้นฐานให้เรียบ ใช้บล็อกสีที่ชัดเจน และกติกากราฟิกร่วมกัน เพื่อเชื่อมบรรจุภัณฑ์หลายรูปแบบเข้าด้วยกันโดยไม่ทำให้เหมือนกันไปหมด",
    scope: ["Packaging design", "Range architecture", "Identity system", "Art direction"],
    scopeTh: ["ออกแบบบรรจุภัณฑ์", "วางโครงสร้างกลุ่มสินค้า", "ระบบอัตลักษณ์", "กำกับศิลป์"],
    direction: "Clear / Energetic / Systematic",
    directionTh: "ชัดเจน / มีพลัง / เป็นระบบ",
    gallery: [
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-01-1440x1080.webp",
        alt: "Good Daily overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-02-1100x825.webp",
        alt: "Good Daily detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-03-1100x825.webp",
        alt: "Good Daily detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-04-1400x1100.webp",
        alt: "Good Daily detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-05-1400x1100.webp",
        alt: "Good Daily detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-06-1400x1100.webp",
        alt: "Good Daily system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-07-1600x900.webp",
        alt: "Good Daily wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-08-1600x900.webp",
        alt: "Good Daily wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-09-1400x1100.webp",
        alt: "Good Daily detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/packaging-design/good-daily/gallery-10-1200x1500.webp",
        alt: "Good Daily portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "everyday-forms",
    order: 3,
    category: "product-design",
    title: "Everyday Forms",
    sector: "Product",
    sectorTh: "ผลิตภัณฑ์",
    year: "2026",
    cover: "assets/images/projects/product-design/everyday-forms/cover-1200x900.webp",
    coverAlt: "A family of writing and lifestyle products on a clean white background",
    summary: "A compact collection of useful everyday objects shaped by one calm, recognisable form language.",
    summaryTh: "กลุ่มผลิตภัณฑ์ในชีวิตประจำวันที่ใช้งานง่าย เชื่อมกันด้วยภาษารูปทรงที่สงบและจดจำได้",
    challenge: "Give small daily objects a shared personality without reducing the usefulness of each individual item.",
    challengeTh: "ทำให้ของใช้ชิ้นเล็กในชีวิตประจำวันมีบุคลิกร่วมกัน โดยไม่ลดทอนประโยชน์ใช้สอยของแต่ละชิ้น",
    solution: "Rounded proportions, precise colour accents and a consistent material approach create a clear product family.",
    solutionTh: "ใช้สัดส่วนโค้งมน สีเน้นที่แม่นยำ และแนวทางวัสดุที่สอดคล้องกัน เพื่อสร้างกลุ่มผลิตภัณฑ์ที่อ่านออกว่าเป็นครอบครัวเดียวกัน",
    scope: ["Product concept", "Form language", "CMF direction", "Visualisation"],
    scopeTh: ["แนวคิดผลิตภัณฑ์", "ภาษารูปทรง", "แนวทาง CMF", "งานภาพจำลอง"],
    direction: "Useful / Calm / Distinctive",
    directionTh: "ใช้งานได้จริง / สงบ / มีเอกลักษณ์",
    gallery: [
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-01-1440x1080.webp",
        alt: "Everyday Forms overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-02-1100x825.webp",
        alt: "Everyday Forms detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-03-1100x825.webp",
        alt: "Everyday Forms detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-04-1400x1100.webp",
        alt: "Everyday Forms detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-05-1400x1100.webp",
        alt: "Everyday Forms detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-06-1400x1100.webp",
        alt: "Everyday Forms system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-07-1600x900.webp",
        alt: "Everyday Forms wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-08-1600x900.webp",
        alt: "Everyday Forms wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-09-1400x1100.webp",
        alt: "Everyday Forms detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/product-design/everyday-forms/gallery-10-1200x1500.webp",
        alt: "Everyday Forms portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "signature-system",
    order: 4,
    category: "ci-design",
    title: "Signature System",
    sector: "CI Design",
    sectorTh: "ออกแบบอัตลักษณ์องค์กร",
    year: "2026",
    cover: "assets/images/projects/ci-design/signature-system/cover-1200x900.webp",
    coverAlt: "Corporate identity system with logo sheet, stationery and signage on a clean white background",
    summary: "A corporate identity system that holds one brand voice across documents, signage, uniforms and digital touchpoints.",
    summaryTh: "ระบบอัตลักษณ์องค์กรที่รักษาเสียงของแบรนด์ให้เป็นหนึ่งเดียว ตั้งแต่งานเอกสาร ป้าย เครื่องแบบ ไปจนถึงสื่อดิจิทัล",
    challenge: "Unify a growing organisation whose materials had drifted apart, without making day-to-day application harder for internal teams.",
    challengeTh: "รวมภาพลักษณ์ขององค์กรที่เติบโตขึ้นและเริ่มกระจัดกระจายให้กลับมาเป็นระบบเดียวกัน โดยที่ทีมภายในยังนำไปใช้งานประจำวันได้ง่าย",
    solution: "One logo construction, a documented clear-space and colour system, and ready-made templates make correct usage the easiest option.",
    solutionTh: "กำหนดโครงสร้างโลโก้เพียงชุดเดียว ระบุพื้นที่ว่างและระบบสีอย่างชัดเจน พร้อมเทมเพลตสำเร็จรูป เพื่อให้การใช้งานที่ถูกต้องเป็นทางเลือกที่ง่ายที่สุด",
    scope: ["Logo system", "Brand guideline", "Stationery and signage", "Digital application"],
    scopeTh: ["ระบบโลโก้", "คู่มืออัตลักษณ์", "งานเอกสารและป้าย", "การใช้งานบนสื่อดิจิทัล"],
    direction: "Consistent / Documented / Practical",
    directionTh: "สม่ำเสมอ / มีคู่มือชัดเจน / ใช้งานได้จริง",
    gallery: [
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-01-1440x1080.webp",
        alt: "Signature System overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-02-1100x825.webp",
        alt: "Signature System detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-03-1100x825.webp",
        alt: "Signature System detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-04-1400x1100.webp",
        alt: "Signature System detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-05-1400x1100.webp",
        alt: "Signature System detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-06-1400x1100.webp",
        alt: "Signature System system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-07-1600x900.webp",
        alt: "Signature System wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-08-1600x900.webp",
        alt: "Signature System wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-09-1400x1100.webp",
        alt: "Signature System detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/ci-design/signature-system/gallery-10-1200x1500.webp",
        alt: "Signature System portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "quantum-display-system",
    order: 5,
    category: "display-retail",
    brand: "quantum",
    brandLabel: "Quantum",
    brandLabelTh: "ควอนตัม",
    brandOrder: 1,
    title: "Quantum Display System",
    sector: "Display & Retail",
    sectorTh: "ดิสเพลย์และพื้นที่ขาย",
    year: "2026",
    cover: "assets/images/projects/display-retail/quantum/quantum-display-system/cover-1200x900.webp",
    coverAlt: "Quantum modular retail display system on a clean white background",
    summary: "A structured display system developed specifically for the Quantum brand and its retail environment.",
    summaryTh: "ระบบดิสเพลย์ที่พัฒนาสำหรับแบรนด์ Quantum โดยเฉพาะ เพื่อให้ภาพลักษณ์และการใช้งานในพื้นที่ขายมีความชัดเจน",
    challenge: "Create a recognisable display language for Quantum while keeping product presentation clear, flexible and easy to expand.",
    challengeTh: "สร้างภาษาดิสเพลย์ที่จดจำได้สำหรับ Quantum โดยยังนำเสนอสินค้าได้ชัดเจน ยืดหยุ่น และขยายต่อได้ง่าย",
    solution: "A modular fixture system, controlled visual hierarchy and consistent brand cues keep every Quantum touchpoint connected.",
    solutionTh: "ใช้ระบบชั้นวางแบบโมดูลาร์ ควบคุมลำดับการมองเห็น และคงสัญญะของแบรนด์ให้ต่อเนื่องในทุกจุดสัมผัสของ Quantum",
    scope: ["Retail concept", "Display design", "Brand application", "Fixture direction"],
    scopeTh: ["แนวคิดพื้นที่ขาย", "ออกแบบดิสเพลย์", "การใช้งานอัตลักษณ์แบรนด์", "แนวทางโครงสร้างชั้นวาง"],
    direction: "Structured / Modular / Quantum",
    directionTh: "เป็นระบบ / โมดูลาร์ / ตัวตน Quantum",
    gallery: [
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-01-1440x1080.webp",
        alt: "Quantum Display System overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-02-1100x825.webp",
        alt: "Quantum Display System detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-03-1100x825.webp",
        alt: "Quantum Display System detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-04-1400x1100.webp",
        alt: "Quantum Display System detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-05-1400x1100.webp",
        alt: "Quantum Display System detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-06-1400x1100.webp",
        alt: "Quantum Display System system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-07-1600x900.webp",
        alt: "Quantum Display System wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-08-1600x900.webp",
        alt: "Quantum Display System wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-09-1400x1100.webp",
        alt: "Quantum Display System detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-10-1200x1500.webp",
        alt: "Quantum Display System portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-11-1400x1100.webp",
        alt: "Quantum Display System detail view 06",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/quantum/quantum-display-system/gallery-12-1200x1500.webp",
        alt: "Quantum Display System portrait detail 02",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "kioku-display-system",
    order: 6,
    category: "display-retail",
    brand: "kioku",
    brandLabel: "Kioku",
    brandLabelTh: "คิโอคุ",
    brandOrder: 2,
    title: "Kioku Display System",
    sector: "Display & Retail",
    sectorTh: "ดิสเพลย์และพื้นที่ขาย",
    year: "2026",
    cover: "assets/images/projects/display-retail/kioku/kioku-display-system/cover-1200x900.webp",
    coverAlt: "Kioku branded retail display system on a clean white background",
    summary: "A distinct display direction developed for Kioku, separated clearly from the Quantum retail system.",
    summaryTh: "แนวทางดิสเพลย์ที่พัฒนาสำหรับแบรนด์ Kioku โดยแยกอัตลักษณ์และชุดภาพออกจากระบบของ Quantum อย่างชัดเจน",
    challenge: "Build a dedicated retail presentation for Kioku without blending its visual identity with other display brands.",
    challengeTh: "สร้างการนำเสนอในพื้นที่ขายเฉพาะของ Kioku โดยไม่ให้อัตลักษณ์ปะปนกับแบรนด์ดิสเพลย์อื่น",
    solution: "A separate project structure, brand-specific hierarchy and focused image set keep the Kioku presentation independent and easy to manage.",
    solutionTh: "แยกโครงสร้างโปรเจกต์ ลำดับการมองเห็นเฉพาะแบรนด์ และชุดภาพของตัวเอง เพื่อให้งานของ Kioku เป็นอิสระและดูแลต่อได้ง่าย",
    scope: ["Retail concept", "Display design", "Brand application", "Fixture direction"],
    scopeTh: ["แนวคิดพื้นที่ขาย", "ออกแบบดิสเพลย์", "การใช้งานอัตลักษณ์แบรนด์", "แนวทางโครงสร้างชั้นวาง"],
    direction: "Focused / Distinct / Kioku",
    directionTh: "เฉพาะเจาะจง / แตกต่างชัด / ตัวตน Kioku",
    gallery: [
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-01-1440x1080.webp",
        alt: "Kioku Display System overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-02-1100x825.webp",
        alt: "Kioku Display System detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-03-1100x825.webp",
        alt: "Kioku Display System detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-04-1400x1100.webp",
        alt: "Kioku Display System detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-05-1400x1100.webp",
        alt: "Kioku Display System detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-06-1400x1100.webp",
        alt: "Kioku Display System system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-07-1600x900.webp",
        alt: "Kioku Display System wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-08-1600x900.webp",
        alt: "Kioku Display System wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-09-1400x1100.webp",
        alt: "Kioku Display System detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-10-1200x1500.webp",
        alt: "Kioku Display System portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-11-1400x1100.webp",
        alt: "Kioku Display System detail view 06",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/display-retail/kioku/kioku-display-system/gallery-12-1200x1500.webp",
        alt: "Kioku Display System portrait detail 02",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "open-floor",
    order: 7,
    category: "exhibition-design",
    title: "Open Floor",
    sector: "Exhibition",
    sectorTh: "นิทรรศการ",
    year: "2026",
    cover: "assets/images/projects/exhibition-design/open-floor/cover-1200x900.webp",
    coverAlt: "Exhibition booth design with modular panels, signage and product display on a clean white background",
    summary: "A modular exhibition layout built around a clear visitor route, readable graphics and reusable structures.",
    summaryTh: "ผังนิทรรศการแบบโมดูลาร์ที่วางจากเส้นทางการเดินชมที่ชัดเจน กราฟิกที่อ่านง่าย และโครงสร้างที่ถอดประกอบนำกลับมาใช้ใหม่ได้",
    challenge: "Tell a full brand story inside a limited booth footprint while keeping the space open enough for visitors to move and talk.",
    challengeTh: "เล่าเรื่องของแบรนด์ให้ครบภายในพื้นที่บูธที่จำกัด แต่ยังเปิดโล่งพอให้ผู้ชมเดินชมและพูดคุยได้สะดวก",
    solution: "One circulation line, layered sightlines and a set of repeatable panel modules keep the build fast, flexible and easy to re-stage.",
    solutionTh: "กำหนดเส้นทางเดินหลักเพียงเส้นเดียว จัดระดับการมองเห็นเป็นชั้น และใช้แผงโมดูลที่ซ้ำได้ ทำให้ติดตั้งเร็ว ปรับเปลี่ยนง่าย และนำไปจัดซ้ำในงานอื่นได้",
    scope: ["Exhibition concept", "Spatial layout", "Graphic application", "Fabrication direction"],
    scopeTh: ["แนวคิดนิทรรศการ", "ผังการใช้พื้นที่", "การวางกราฟิกในพื้นที่", "แนวทางงานผลิตและติดตั้ง"],
    direction: "Open / Modular / Reusable",
    directionTh: "โปร่ง / โมดูลาร์ / ใช้ซ้ำได้",
    gallery: [
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-01-1440x1080.webp",
        alt: "Open Floor overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-02-1100x825.webp",
        alt: "Open Floor detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-03-1100x825.webp",
        alt: "Open Floor detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-04-1400x1100.webp",
        alt: "Open Floor detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-05-1400x1100.webp",
        alt: "Open Floor detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-06-1400x1100.webp",
        alt: "Open Floor system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-07-1600x900.webp",
        alt: "Open Floor wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-08-1600x900.webp",
        alt: "Open Floor wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-09-1400x1100.webp",
        alt: "Open Floor detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/exhibition-design/open-floor/gallery-10-1200x1500.webp",
        alt: "Open Floor portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "make-it-move",
    order: 8,
    category: "campaign",
    title: "Make It Move",
    sector: "Campaign",
    sectorTh: "แคมเปญ",
    year: "2026",
    cover: "assets/images/projects/campaign/make-it-move/cover-1200x900.webp",
    coverAlt: "Campaign toolkit with poster, laptop, printed matter and event pass",
    summary: "A connected campaign toolkit designed to stay coherent from digital launch to physical event.",
    summaryTh: "ชุดเครื่องมือแคมเปญที่รักษาภาพจำเดียวกัน ตั้งแต่การเปิดตัวออนไลน์ไปจนถึงกิจกรรมจริง",
    challenge: "Translate one energetic idea across digital, print and event formats without losing clarity or becoming repetitive.",
    challengeTh: "แปลไอเดียเดียวที่มีพลังให้ทำงานได้ทั้งบนสื่อดิจิทัล สิ่งพิมพ์ และงานอีเวนต์ โดยไม่เสียความชัดเจนและไม่ซ้ำจนน่าเบื่อ",
    solution: "Scale shifts, cropped forms and a controlled palette give each output variety while preserving one campaign voice.",
    solutionTh: "เปลี่ยนสเกล ครอปรูปทรง และคุมชุดสีให้อยู่ในกรอบเดียวกัน ทำให้แต่ละสื่อมีความหลากหลายแต่ยังพูดด้วยเสียงเดียวกัน",
    scope: ["Campaign identity", "Key visual", "Digital toolkit", "Event collateral"],
    scopeTh: ["อัตลักษณ์แคมเปญ", "คีย์วิชวล", "ชุดสื่อดิจิทัล", "สื่อประกอบงานอีเวนต์"],
    direction: "Connected / Energetic / Flexible",
    directionTh: "เชื่อมโยงกัน / มีพลัง / ยืดหยุ่น",
    gallery: [
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-01-1440x1080.webp",
        alt: "Make It Move overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-02-1100x825.webp",
        alt: "Make It Move detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-03-1100x825.webp",
        alt: "Make It Move detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-04-1400x1100.webp",
        alt: "Make It Move detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-05-1400x1100.webp",
        alt: "Make It Move detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-06-1400x1100.webp",
        alt: "Make It Move system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-07-1600x900.webp",
        alt: "Make It Move wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-08-1600x900.webp",
        alt: "Make It Move wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-09-1400x1100.webp",
        alt: "Make It Move detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/campaign/make-it-move/gallery-10-1200x1500.webp",
        alt: "Make It Move portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  },
  {
    slug: "margins-and-matter",
    order: 9,
    category: "editorial-design",
    title: "Margins & Matter",
    sector: "Editorial Design",
    sectorTh: "ออกแบบสื่อบรรณาธิการ",
    year: "2026",
    cover: "assets/images/projects/editorial-design/margins-and-matter/cover-1200x900.webp",
    coverAlt: "Editorial design presentation with magazine cover and spreads on a clean white background",
    summary: "A restrained editorial identity built around architectural photography, quiet typography and clear spatial rhythm.",
    summaryTh: "งานออกแบบสื่อบรรณาธิการที่วางโครงด้วยภาพสถาปัตยกรรม จังหวะของพื้นที่ว่าง และระบบตัวอักษรที่นิ่งแต่ชัดเจน",
    challenge: "Create a printed editorial system that feels premium and thoughtful without becoming visually heavy.",
    challengeTh: "สร้างระบบสิ่งพิมพ์เชิงบรรณาธิการที่ดูพรีเมียมและมีความคิด โดยไม่ทำให้หน้ากระดาษดูหนักเกินไป",
    solution: "A calm palette, modular page architecture and carefully paced image-to-type relationships shape a consistent editorial experience.",
    solutionTh: "ใช้ชุดสีที่นิ่ง วางโครงหน้าแบบโมดูลาร์ และคุมจังหวะระหว่างภาพกับตัวอักษร เพื่อให้ประสบการณ์การอ่านต่อเนื่องเป็นหนึ่งเดียว",
    scope: ["Editorial design", "Art direction", "Publication system", "Print mockup"],
    scopeTh: ["ออกแบบสื่อบรรณาธิการ", "กำกับศิลป์", "ระบบรูปเล่ม", "งานจำลองสิ่งพิมพ์"],
    direction: "Quiet / Structured / Refined",
    directionTh: "เรียบนิ่ง / เป็นระบบ / ประณีต",
    gallery: [
      {
        src: "assets/images/projects/editorial-design/margins-and-matter/gallery-01-1440x1080.webp",
        alt: "Margins & Matter overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/editorial-design/margins-and-matter/gallery-02-1100x825.webp",
        alt: "Margins & Matter detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/editorial-design/margins-and-matter/gallery-04-1400x1100.webp",
        alt: "Margins & Matter detail view 02",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/editorial-design/margins-and-matter/gallery-07-1600x900.webp",
        alt: "Margins & Matter studio wall presentation",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/editorial-design/margins-and-matter/gallery-10-1200x1500.webp",
        alt: "Margins & Matter portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      },
      {
        src: "assets/images/projects/editorial-design/margins-and-matter/gallery-11-1200x900.webp",
        alt: "Margins & Matter print mockup detail",
        layout: "half",
        width: 1200,
        height: 900
      }
    ],
    demo: true
  },
  {
    slug: "pocket-parade",
    order: 10,
    category: "character-design",
    title: "Pocket Parade",
    sector: "Character Design",
    sectorTh: "ออกแบบคาแรกเตอร์",
    year: "2026",
    cover: "assets/images/projects/character-design/pocket-parade/cover-1200x900.webp",
    coverAlt: "Character design lineup with a family of original illustrated characters",
    summary: "An original character family developed through lineup, expressions, world-building and prop studies.",
    summaryTh: "ชุดคาแรกเตอร์ต้นฉบับที่พัฒนาตั้งแต่ไลน์อัปตัวละคร อารมณ์ สีประจำโลก และรายละเอียดของพร็อปประกอบ",
    challenge: "Build a distinct cast with individual personalities while keeping the entire world coherent and approachable.",
    challengeTh: "สร้างกลุ่มตัวละครที่มีบุคลิกเฉพาะตัว แต่ยังคงโลกทั้งใบให้กลมกลืนและเข้าถึงง่าย",
    solution: "Shared colour logic, rounded forms and role-specific props create a memorable ensemble with strong visual harmony.",
    solutionTh: "ใช้ตรรกะของสีร่วมกัน รูปทรงโค้งมน และพร็อปที่บอกบทบาทของแต่ละตัว เพื่อสร้างกลุ่มตัวละครที่จดจำได้และอยู่ร่วมกันอย่างกลมกลืน",
    scope: ["Character design", "World building", "Expression study", "Visual development"],
    scopeTh: ["ออกแบบคาแรกเตอร์", "สร้างโลกของเรื่อง", "ศึกษาอารมณ์และท่าทาง", "พัฒนางานภาพ"],
    direction: "Warm / Playful / Cohesive",
    directionTh: "อบอุ่น / สนุก / กลมกลืน",
    gallery: [
      {
        src: "assets/images/projects/character-design/pocket-parade/gallery-01-1440x1080.webp",
        alt: "Pocket Parade overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/character-design/pocket-parade/gallery-04-1400x1100.webp",
        alt: "Pocket Parade pose studies",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/character-design/pocket-parade/gallery-10-1200x1500.webp",
        alt: "Pocket Parade poster detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      },
      {
        src: "assets/images/projects/character-design/pocket-parade/gallery-07-1600x900.webp",
        alt: "Pocket Parade world building board",
        layout: "wide",
        width: 1600,
        height: 900
      }
    ],
    demo: true
  },
  {
    slug: "off-grid-studies",
    order: 11,
    category: "other-creative",
    title: "Off Grid Studies",
    sector: "Other Creative",
    sectorTh: "งานสร้างสรรค์",
    year: "2026",
    cover: "assets/images/projects/other-creative/off-grid-studies/cover-1200x900.webp",
    coverAlt: "Editorial, material and paper-form experiments on a white background",
    summary: "Editorial, material and form experiments collected into one open-ended creative study.",
    summaryTh: "การทดลองด้านบรรณาธิการ วัสดุ และรูปทรง ที่รวมกันเป็นพื้นที่ศึกษาความคิดสร้างสรรค์แบบเปิด",
    challenge: "Create a useful home for exploratory work that does not belong to one commercial design discipline.",
    challengeTh: "สร้างพื้นที่รองรับงานทดลองที่ไม่ได้อยู่ในศาสตร์การออกแบบเชิงพาณิชย์สาขาใดสาขาหนึ่ง",
    solution: "A flexible study format lets different materials and approaches coexist while shared colour creates continuity.",
    solutionTh: "ใช้รูปแบบการนำเสนอที่ยืดหยุ่น ให้วัสดุและวิธีคิดที่ต่างกันอยู่ร่วมกันได้ โดยมีชุดสีร่วมเป็นตัวเชื่อม",
    scope: ["Creative direction", "Editorial", "Material studies", "Form exploration"],
    scopeTh: ["กำกับความคิดสร้างสรรค์", "งานบรรณาธิการ", "ศึกษาวัสดุ", "สำรวจรูปทรง"],
    direction: "Curious / Material / Experimental",
    directionTh: "ช่างสงสัย / เน้นวัสดุ / เชิงทดลอง",
    gallery: [
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-01-1440x1080.webp",
        alt: "Off Grid Studies overview",
        layout: "hero",
        width: 1440,
        height: 1080
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-02-1100x825.webp",
        alt: "Off Grid Studies detail view 01",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-03-1100x825.webp",
        alt: "Off Grid Studies detail view 02",
        layout: "half",
        width: 1100,
        height: 825
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-04-1400x1100.webp",
        alt: "Off Grid Studies detail view 03",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-05-1400x1100.webp",
        alt: "Off Grid Studies detail view 04",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-06-1400x1100.webp",
        alt: "Off Grid Studies system view",
        layout: "wide",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-07-1600x900.webp",
        alt: "Off Grid Studies wide view 01",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-08-1600x900.webp",
        alt: "Off Grid Studies wide view 02",
        layout: "wide",
        width: 1600,
        height: 900
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-09-1400x1100.webp",
        alt: "Off Grid Studies detail view 05",
        layout: "half",
        width: 1400,
        height: 1100
      },
      {
        src: "assets/images/projects/other-creative/off-grid-studies/gallery-10-1200x1500.webp",
        alt: "Off Grid Studies portrait detail",
        layout: "portrait",
        width: 1200,
        height: 1500
      }
    ],
    demo: true
  }
];
