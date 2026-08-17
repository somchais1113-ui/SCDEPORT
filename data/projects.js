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
    summary: "An advertising system designed to stay consistent across print, outdoor and digital formats.",
    summaryTh: "ระบบงานโฆษณาที่รักษาภาพเดียวกันได้ทั้งสื่อสิ่งพิมพ์ สื่อนอกบ้าน และดิจิทัล",
    challenge: "Create a campaign style that works at different sizes without depending on long or dense copy.",
    challengeTh: "สร้างรูปแบบแคมเปญที่ทำงานได้ในหลายขนาดสื่อ โดยไม่ต้องพึ่งข้อความจำนวนมาก",
    solution: "High-contrast colour, repeated geometry and open space keep the visual style consistent from posters to screens.",
    solutionTh: "ใช้สีคอนทราสต์สูง รูปทรงเรขาคณิตซ้ำ และพื้นที่ว่าง เพื่อให้รูปแบบภาพสอดคล้องกันตั้งแต่โปสเตอร์จนถึงหน้าจอ",
    scope: ["Art direction", "Advertising system", "Digital and OOH", "Campaign toolkit"],
    scopeTh: ["กำกับศิลป์", "ระบบงานโฆษณา", "สื่อดิจิทัลและสื่อนอกบ้าน", "ชุดเครื่องมือแคมเปญ"],
    direction: "Graphic / High contrast / Scalable",
    directionTh: "กราฟิก / คอนทราสต์สูง / ขยายต่อได้",
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
    ]
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
    summary: "A modular packaging range designed for easy shelf recognition and consistent expansion across products.",
    summaryTh: "ระบบบรรจุภัณฑ์แบบโมดูลาร์ที่ช่วยให้มองเห็นสินค้าได้ง่ายบนชั้นวาง และขยายต่อไปยังสินค้าในกลุ่มเดียวกันได้",
    challenge: "Build a broad product range that feels energetic while staying easy to scan and organise on shelf.",
    challengeTh: "สร้างกลุ่มสินค้าที่มีหลายรายการและดูมีพลัง แต่ยังอ่านง่ายและจัดเรียงบนชั้นวางได้ดี",
    solution: "A simple base, strong colour blocks and shared graphic rules keep different pack formats in the same range without making them identical.",
    solutionTh: "ใช้พื้นฐานที่เรียบ บล็อกสีเด่น และกติกากราฟิกร่วมกัน เพื่อให้บรรจุภัณฑ์หลายรูปแบบอยู่ในกลุ่มเดียวกันโดยไม่ต้องเหมือนกันทั้งหมด",
    scope: ["Packaging design", "Range architecture", "Identity system", "Art direction"],
    scopeTh: ["ออกแบบบรรจุภัณฑ์", "วางโครงสร้างกลุ่มสินค้า", "ระบบอัตลักษณ์", "กำกับศิลป์"],
    direction: "Modular / Colour / Retail",
    directionTh: "โมดูลาร์ / ใช้สีเป็นหลัก / สำหรับพื้นที่ขาย",
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
    ]
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
    summary: "A compact collection of everyday products built around one consistent form language.",
    summaryTh: "กลุ่มผลิตภัณฑ์ในชีวิตประจำวันที่ใช้ภาษารูปทรงเดียวกัน เพื่อให้แต่ละชิ้นอยู่ในกลุ่มเดียวกัน",
    challenge: "Give small everyday products a shared visual character without affecting how each item is used.",
    challengeTh: "ทำให้ผลิตภัณฑ์ชิ้นเล็กในชีวิตประจำวันมีลักษณะร่วมกัน โดยไม่กระทบการใช้งานของแต่ละชิ้น",
    solution: "Rounded proportions, small colour accents and a consistent material approach keep the products in the same family.",
    solutionTh: "ใช้สัดส่วนโค้งมน สีเน้นบางจุด และแนวทางวัสดุที่สอดคล้องกัน เพื่อให้ผลิตภัณฑ์ทั้งหมดอยู่ในกลุ่มเดียวกัน",
    scope: ["Product concept", "Form language", "CMF direction", "Visualisation"],
    scopeTh: ["แนวคิดผลิตภัณฑ์", "ภาษารูปทรง", "แนวทาง CMF", "งานภาพจำลอง"],
    direction: "Functional / Compact / Consistent",
    directionTh: "ใช้งานได้ / กระชับ / สอดคล้องกัน",
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
    ]
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
    summary: "A corporate identity system used across documents, signage, uniforms and digital applications.",
    summaryTh: "ระบบอัตลักษณ์องค์กรสำหรับใช้งานบนเอกสาร ป้าย เครื่องแบบ และสื่อดิจิทัล",
    challenge: "Bring inconsistent brand materials back into one system without making day-to-day use harder for internal teams.",
    challengeTh: "จัดสื่อแบรนด์ที่เริ่มไม่สอดคล้องกันให้กลับมาอยู่ในระบบเดียว โดยที่ทีมภายในยังใช้งานในแต่ละวันได้ง่าย",
    solution: "One logo construction, documented spacing and colour rules, and ready-made templates make the identity easier to use correctly.",
    solutionTh: "กำหนดโครงสร้างโลโก้ชุดเดียว กติกาพื้นที่ว่างและสี พร้อมเทมเพลตสำเร็จรูป เพื่อให้ทีมใช้อัตลักษณ์ได้ถูกต้องและง่ายขึ้น",
    scope: ["Logo system", "Brand guideline", "Stationery and signage", "Digital application"],
    scopeTh: ["ระบบโลโก้", "คู่มืออัตลักษณ์", "งานเอกสารและป้าย", "การใช้งานบนสื่อดิจิทัล"],
    direction: "Consistent / Documented / Easy to use",
    directionTh: "สม่ำเสมอ / มีคู่มือ / ใช้งานง่าย",
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
    ]
  },
  {
    slug: "quantum-display-system",
    order: 5,
    category: "display-retail",
    brand: "quantum",
    brandLabel: "Quantum",
    brandOrder: 1,
    title: "Quantum Display",
    sector: "Display & Retail",
    sectorTh: "ดิสเพลย์และพื้นที่ขาย",
    year: "2026",
    cover: "assets/images/projects/display-retail/quantum/quantum-display-system/cover-1200x900.webp",
    coverAlt: "Quantum modular retail display system on a clean white background",
    summary: "A display system developed for Quantum and adapted to its retail environment.",
    summaryTh: "ระบบดิสเพลย์ที่พัฒนาสำหรับ Quantum โดยคำนึงถึงทั้งภาพลักษณ์แบรนด์และการใช้งานในพื้นที่ขาย",
    challenge: "Create a recognisable display style for Quantum while keeping product presentation easy to read, flexible and expandable.",
    challengeTh: "สร้างรูปแบบดิสเพลย์ที่จดจำได้สำหรับ Quantum โดยยังจัดสินค้าให้อ่านง่าย ปรับเปลี่ยนได้ และขยายต่อได้",
    solution: "A modular fixture system, controlled visual hierarchy and consistent brand elements keep each Quantum display related to the same brand.",
    solutionTh: "ใช้ระบบชั้นวางแบบโมดูลาร์ ควบคุมลำดับการมอง และใช้องค์ประกอบแบรนด์ร่วมกัน เพื่อให้ดิสเพลย์ของ Quantum อยู่ในรูปแบบเดียวกัน",
    scope: ["Retail concept", "Display design", "Brand application", "Fixture direction"],
    scopeTh: ["แนวคิดพื้นที่ขาย", "ออกแบบดิสเพลย์", "การใช้งานอัตลักษณ์แบรนด์", "แนวทางโครงสร้างชั้นวาง"],
    direction: "Modular / Branded / Retail",
    directionTh: "โมดูลาร์ / แบรนด์ / พื้นที่ขาย",
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
    ]
  },
  {
    slug: "kioku-display-system",
    order: 6,
    category: "display-retail",
    brand: "kioku",
    brandLabel: "Kioku",
    brandOrder: 2,
    title: "Kioku Display",
    sector: "Display & Retail",
    sectorTh: "ดิสเพลย์และพื้นที่ขาย",
    year: "2026",
    cover: "assets/images/projects/display-retail/kioku/kioku-display-system/cover-1200x900.webp",
    coverAlt: "Kioku branded retail display system on a clean white background",
    summary: "A separate display direction developed for Kioku, with its own visual approach apart from Quantum.",
    summaryTh: "แนวทางดิสเพลย์สำหรับ Kioku ที่ใช้รูปแบบภาพของตัวเอง แยกจากระบบของ Quantum",
    challenge: "Build a retail presentation for Kioku without mixing its visual identity with the other display brands.",
    challengeTh: "สร้างการนำเสนอในพื้นที่ขายของ Kioku โดยไม่ให้อัตลักษณ์ปะปนกับแบรนด์ดิสเพลย์อื่น",
    solution: "A separate project structure, brand-specific hierarchy and its own image set keep the Kioku work independent and easier to manage.",
    solutionTh: "แยกโครงสร้างโปรเจกต์ ลำดับการมองเฉพาะแบรนด์ และชุดภาพของตัวเอง เพื่อให้งาน Kioku แยกเป็นอิสระและจัดการต่อได้ง่าย",
    scope: ["Retail concept", "Display design", "Brand application", "Fixture direction"],
    scopeTh: ["แนวคิดพื้นที่ขาย", "ออกแบบดิสเพลย์", "การใช้งานอัตลักษณ์แบรนด์", "แนวทางโครงสร้างชั้นวาง"],
    direction: "Independent / Branded / Retail",
    directionTh: "แยกอิสระ / แบรนด์ / พื้นที่ขาย",
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
    ]
  },
  {
    slug: "open-floor",
    order: 7,
    category: "exhibition-design",
    title: "Open Floor",
    sector: "Exhibition Design",
    sectorTh: "นิทรรศการ",
    year: "2026",
    cover: "assets/images/projects/exhibition-design/open-floor/cover-1200x900.webp",
    coverAlt: "Exhibition booth design with modular panels, signage and product display on a clean white background",
    summary: "A modular exhibition layout based on an easy visitor route, readable graphics and reusable structures.",
    summaryTh: "ผังนิทรรศการแบบโมดูลาร์ที่วางจากเส้นทางเดินชมที่เข้าใจง่าย กราฟิกที่อ่านได้สะดวก และโครงสร้างที่นำกลับมาใช้ใหม่ได้",
    challenge: "Present the brand within a limited booth area while keeping enough open space for visitors to move and talk.",
    challengeTh: "นำเสนอแบรนด์ภายในพื้นที่บูธที่จำกัด โดยยังเหลือพื้นที่เปิดให้ผู้ชมเดินชมและพูดคุยได้สะดวก",
    solution: "One main circulation route, layered sightlines and repeatable panel modules make the booth faster to build, easier to adjust and possible to use again.",
    solutionTh: "กำหนดเส้นทางเดินหลัก จัดระดับการมองเป็นชั้น และใช้แผงโมดูลซ้ำ เพื่อให้ติดตั้งเร็ว ปรับเปลี่ยนง่าย และนำกลับไปใช้ในงานอื่นได้",
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
    ]
  },
  {
    slug: "make-it-move",
    order: 8,
    category: "campaign",
    title: "Make It Move",
    sector: "Campaign > License Products",
    sectorTh: "แคมเปญ > สินค้าลิขสิทธิ์",
    sectorNote: "License Characters",
    sectorNoteTh: "คาแรกเตอร์ลิขสิทธิ์",
    year: "2026",
    cover: "assets/images/projects/campaign/make-it-move/cover-1200x900.webp",
    coverAlt: "Campaign toolkit with poster, laptop, printed matter and event pass",
    summary: "A campaign toolkit designed for use from digital launch materials to physical events.",
    summaryTh: "ชุดสื่อแคมเปญที่ใช้ต่อเนื่องตั้งแต่การเปิดตัวออนไลน์ไปจนถึงงานอีเวนต์",
    challenge: "Apply one energetic idea across digital, print and event formats without making every output look the same.",
    challengeTh: "นำไอเดียเดียวไปใช้กับสื่อดิจิทัล สิ่งพิมพ์ และงานอีเวนต์ โดยไม่ทำให้ทุกชิ้นดูซ้ำกัน",
    solution: "Changes in scale, cropped forms and a controlled palette give each format some variation while keeping the campaign consistent.",
    solutionTh: "ปรับสเกล ครอปรูปทรง และคุมชุดสี เพื่อให้แต่ละสื่อแตกต่างกันได้ แต่ยังอยู่ในแคมเปญเดียวกัน",
    scope: ["Campaign identity", "Key visual", "Digital toolkit", "Event collateral"],
    scopeTh: ["อัตลักษณ์แคมเปญ", "คีย์วิชวล", "ชุดสื่อดิจิทัล", "สื่อประกอบงานอีเวนต์"],
    direction: "Energetic / Flexible / Cross-format",
    directionTh: "มีพลัง / ยืดหยุ่น / ใช้ได้หลายสื่อ",
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
    ]
  },
  {
    slug: "margins-and-matter",
    order: 9,
    category: "editorial-design",
    title: "Margins & Matter",
    sector: "Catalogue & Print",
    sectorTh: "แคตตาล็อกและสื่อสิ่งพิมพ์",
    year: "2026",
    cover: "assets/images/projects/editorial-design/margins-and-matter/cover-1200x900.webp",
    coverAlt: "Editorial design presentation with magazine cover and spreads on a clean white background",
    summary: "An editorial system built around architectural photography, restrained typography and measured use of space.",
    summaryTh: "งานออกแบบสื่อบรรณาธิการที่ใช้ภาพสถาปัตยกรรม ตัวอักษรที่เรียบ และการจัดพื้นที่ว่างเป็นองค์ประกอบหลัก",
    challenge: "Create a printed editorial system that feels premium without making the pages visually heavy.",
    challengeTh: "สร้างระบบสิ่งพิมพ์เชิงบรรณาธิการที่ดูพรีเมียม โดยไม่ทำให้หน้ากระดาษดูหนัก",
    solution: "A restrained palette, modular page structure and consistent spacing between image and type keep the publication visually consistent.",
    solutionTh: "ใช้ชุดสีที่เรียบ โครงหน้าแบบโมดูลาร์ และระยะระหว่างภาพกับตัวอักษรที่สม่ำเสมอ เพื่อให้ทั้งเล่มอยู่ในรูปแบบเดียวกัน",
    scope: ["Editorial design", "Art direction", "Publication system", "Print mockup"],
    scopeTh: ["ออกแบบสื่อบรรณาธิการ", "กำกับศิลป์", "ระบบรูปเล่ม", "งานจำลองสิ่งพิมพ์"],
    direction: "Editorial / Structured / Restrained",
    directionTh: "บรรณาธิการ / มีโครงสร้าง / เรียบ",
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
    ]
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
    summary: "An original character family developed through lineup, expression, world and prop studies.",
    summaryTh: "ชุดคาแรกเตอร์ต้นฉบับที่พัฒนาผ่านไลน์อัป สีหน้า โลกของตัวละคร และการศึกษาพร็อป",
    challenge: "Build a cast with individual personalities while keeping the characters and their world visually related.",
    challengeTh: "สร้างกลุ่มตัวละครที่มีบุคลิกต่างกัน แต่ยังให้ตัวละครและโลกของเรื่องอยู่ในรูปแบบภาพเดียวกัน",
    solution: "Shared colour rules, rounded forms and role-specific props give the characters individual roles while keeping them in the same family.",
    solutionTh: "ใช้กติกาสีร่วมกัน รูปทรงโค้งมน และพร็อปที่บอกบทบาท เพื่อให้แต่ละตัวมีหน้าที่ต่างกันแต่ยังอยู่ในกลุ่มเดียวกัน",
    scope: ["Character design", "World building", "Expression study", "Visual development"],
    scopeTh: ["ออกแบบคาแรกเตอร์", "สร้างโลกของเรื่อง", "ศึกษาอารมณ์และท่าทาง", "พัฒนางานภาพ"],
    direction: "Warm / Playful / Rounded",
    directionTh: "อบอุ่น / สนุก / รูปทรงโค้งมน",
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
    ]
  },
  {
    slug: "off-grid-studies",
    order: 11,
    category: "other-creative",
    title: "Off Grid Studies",
    sector: "Offgrid Study > Other Design",
    sectorTh: "Offgrid Study > งานออกแบบอื่น ๆ",
    year: "2026",
    cover: "assets/images/projects/other-creative/off-grid-studies/cover-1200x900.webp",
    coverAlt: "Editorial, material and paper-form experiments on a white background",
    summary: "Editorial, material and form experiments collected as an ongoing design study.",
    summaryTh: "การทดลองด้านงานบรรณาธิการ วัสดุ และรูปทรง ที่รวบรวมไว้เป็นงานศึกษาด้านการออกแบบต่อเนื่อง",
    challenge: "Create a place for experimental work that does not fit into one commercial design category.",
    challengeTh: "สร้างพื้นที่สำหรับงานทดลองที่ไม่ได้อยู่ในหมวดงานออกแบบเชิงพาณิชย์เพียงหมวดเดียว",
    solution: "A flexible study format allows different materials and approaches to sit together, with shared colour used as a common link.",
    solutionTh: "ใช้รูปแบบการนำเสนอที่ยืดหยุ่น เพื่อให้วัสดุและวิธีคิดที่ต่างกันอยู่ร่วมกันได้ โดยใช้ชุดสีร่วมเป็นตัวเชื่อม",
    scope: ["Creative direction", "Editorial", "Material studies", "Form exploration"],
    scopeTh: ["กำกับความคิดสร้างสรรค์", "งานบรรณาธิการ", "ศึกษาวัสดุ", "สำรวจรูปทรง"],
    direction: "Material / Editorial / Experimental",
    directionTh: "วัสดุ / บรรณาธิการ / เชิงทดลอง",
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
    ]
  }
];
