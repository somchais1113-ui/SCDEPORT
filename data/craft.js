/*
  CRAFT & PROCESS DATA
  --------------------------------------------------------------------------
  One editable file for the whole Craft & Process section.

  - code      : two-letter mark used in the index and on the image badge
  - cover     : image on the craft.html list row
  - examples  : 4 work examples shown on craft-detail.html?id=<slug>
  - spec      : the four production parameters shown as evidence

  IMPORTANT - the figures in `spec` are general industry reference points,
  NOT confirmed production data. Check every one of them against real shop
  experience before setting `draft: false` and publishing.

  Image files live in assets/images/craft/<slug>/ and carry their pixel size
  in the filename. To swap an image, overwrite the file and keep the name.
*/

window.PORTFOLIO_CRAFT = [
  {
    slug: "offset",
    order: 1,
    code: "OF",
    title: "Offset",
    titleTh: "ออฟเซ็ต",
    subtitle: "Plate & Blanket Litho",
    subtitleTh: "เพลทและผ้ายาง",
    quote: "Sharp, consistent colour across the full print run.",
    quoteTh: "งานพิมพ์คมชัดและควบคุมสีให้สม่ำเสมอตลอดรอบผลิต",
    close: "Useful when brand colour needs to stay consistent across longer runs.",
    closeTh: "เหมาะกับงานที่ต้องควบคุมสีแบรนด์ให้สม่ำเสมอในรอบผลิตที่ยาวขึ้น",
    spec: [
      {
        label: "Mechanism", labelTh: "กลไก",
        value: "Aluminium plate → rubber blanket → paper",
        valueTh: "เพลทอะลูมิเนียม → ผ้ายาง → กระดาษ"
      },
      {
        label: "Resolution", labelTh: "ความละเอียด",
        value: "175–300 LPI", valueTh: "175–300 LPI"
      },
      {
        label: "Substrate", labelTh: "วัสดุ",
        value: "Coated paper, folding carton board",
        valueTh: "กระดาษเคลือบผิว, กล่องบรรจุภัณฑ์"
      },
      {
        label: "Run sweet spot", labelTh: "จุดคุ้มทุน Run",
        value: "Cost-efficient from ~3,000 sheets",
        valueTh: "คุ้มทุนตั้งแต่ ~3,000 แผ่นขึ้นไป"
      }
    ],
    cover: "assets/images/craft/offset/cover-1400x1050.webp",
    coverAlt: "Offset litho process overview",
    examples: [
      { src: "assets/images/craft/offset/example-01-1400x1050.webp", width: 1400, height: 1050, caption: "Plate making", captionTh: "การทำเพลท", alt: "Offset plate making" },
      { src: "assets/images/craft/offset/example-02-1400x1050.webp", width: 1400, height: 1050, caption: "Press sheet / colour bar", captionTh: "ชีทตรวจสี / แถบควบคุมสี", alt: "Offset press sheet with colour bar" },
      { src: "assets/images/craft/offset/example-03-1400x1050.webp", width: 1400, height: 1050, caption: "Ink key adjustment", captionTh: "ปรับคีย์หมึกบนแท่นพิมพ์", alt: "Offset ink key adjustment" },
      { src: "assets/images/craft/offset/example-04-1400x1050.webp", width: 1400, height: 1050, caption: "Finished carton", captionTh: "กล่องสำเร็จ", alt: "Finished offset printed carton" }
    ],
    draft: true
  },
  {
    slug: "gravure",
    order: 2,
    code: "GR",
    title: "Gravure",
    titleTh: "กราเวียร์",
    subtitle: "Engraved Cylinder",
    subtitleTh: "ทรงกระบอกแกะสลัก",
    quote: "Even ink coverage for long, high-speed runs.",
    quoteTh: "ให้ชั้นหมึกสม่ำเสมอ เหมาะกับ Run ที่ยาวและใช้ความเร็วสูง",
    close: "Well suited to colour consistency across long runs.",
    closeTh: "เหมาะกับงานที่ต้องรักษาความสม่ำเสมอของสีใน Run ยาว",
    spec: [
      {
        label: "Mechanism", labelTh: "กลไก",
        value: "Engraved copper/chrome cylinder + doctor blade",
        valueTh: "ทรงกระบอกทองแดง/โครเมียม + ใบมีดปาดหมึก"
      },
      {
        label: "Resolution", labelTh: "ความละเอียด",
        value: "Set by cell depth, not screen ruling",
        valueTh: "กำหนดโดยความลึกเซลล์ ไม่ใช่ Line screen"
      },
      {
        label: "Substrate", labelTh: "วัสดุ",
        value: "Flexible film, foil laminate",
        valueTh: "ฟิล์มยืดหยุ่น, ลามิเนตฟอยล์"
      },
      {
        label: "Run sweet spot", labelTh: "จุดคุ้มทุน Run",
        value: "Built for very long, high-speed runs",
        valueTh: "เหมาะกับ Run ยาวมากและความเร็วสูง"
      }
    ],
    cover: "assets/images/craft/gravure/cover-1400x1050.webp",
    coverAlt: "Gravure process overview",
    examples: [
      { src: "assets/images/craft/gravure/example-01-1400x1050.webp", width: 1400, height: 1050, caption: "Engraved cylinder", captionTh: "ทรงกระบอกแกะสลัก", alt: "Gravure engraved cylinder" },
      { src: "assets/images/craft/gravure/example-02-1400x1050.webp", width: 1400, height: 1050, caption: "Doctor blade setting", captionTh: "การตั้งใบมีดปาดหมึก", alt: "Gravure doctor blade setting" },
      { src: "assets/images/craft/gravure/example-03-1400x1050.webp", width: 1400, height: 1050, caption: "Film web on press", captionTh: "ฟิล์มบนแท่นพิมพ์", alt: "Gravure film web running on press" },
      { src: "assets/images/craft/gravure/example-04-1400x1050.webp", width: 1400, height: 1050, caption: "Laminated pouch", captionTh: "ซองลามิเนตสำเร็จ", alt: "Finished gravure printed laminated pouch" }
    ],
    draft: true
  },
  {
    slug: "flexo",
    order: 3,
    code: "FL",
    title: "Flexo",
    titleTh: "เฟล็กโซ",
    subtitle: "Photopolymer Plate",
    subtitleTh: "เพลทโฟโต้พอลิเมอร์",
    quote: "Fast, flexible printing across a wide range of packaging materials.",
    quoteTh: "พิมพ์ได้รวดเร็วและรองรับวัสดุบรรจุภัณฑ์ได้หลายประเภท",
    close: "A practical option for mid-volume runs with good print quality.",
    closeTh: "เป็นตัวเลือกที่เหมาะกับ Run ขนาดกลาง โดยยังรักษาคุณภาพงานพิมพ์ได้ดี",
    spec: [
      {
        label: "Mechanism", labelTh: "กลไก",
        value: "Anilox roller meters ink to a photopolymer plate",
        valueTh: "ลูกกลิ้งอนิล็อกซ์กะปริมาณหมึกให้เพลทโฟโต้พอลิเมอร์"
      },
      {
        label: "Resolution", labelTh: "ความละเอียด",
        value: "100–175 LPI", valueTh: "100–175 LPI"
      },
      {
        label: "Substrate", labelTh: "วัสดุ",
        value: "Labels, corrugated, flexible film",
        valueTh: "ฉลาก, กระดาษลูกฟูก, ฟิล์มยืดหยุ่น"
      },
      {
        label: "Run sweet spot", labelTh: "จุดคุ้มทุน Run",
        value: "Efficient at mid-size runs, die-cut inline",
        valueTh: "คุ้มค่าที่ Run ขนาดกลาง ตัดไดคัทอินไลน์ได้"
      }
    ],
    cover: "assets/images/craft/flexo/cover-1400x1050.webp",
    coverAlt: "Flexo process overview",
    examples: [
      { src: "assets/images/craft/flexo/example-01-1400x1050.webp", width: 1400, height: 1050, caption: "Photopolymer plate", captionTh: "เพลทโฟโต้พอลิเมอร์", alt: "Flexo photopolymer plate" },
      { src: "assets/images/craft/flexo/example-02-1400x1050.webp", width: 1400, height: 1050, caption: "Anilox roller", captionTh: "ลูกกลิ้งอนิล็อกซ์", alt: "Flexo anilox roller" },
      { src: "assets/images/craft/flexo/example-03-1400x1050.webp", width: 1400, height: 1050, caption: "Label web in register", captionTh: "ฉลากบนสายพานที่เข้าตำแหน่ง", alt: "Flexo label web in register" },
      { src: "assets/images/craft/flexo/example-04-1400x1050.webp", width: 1400, height: 1050, caption: "Die-cut label roll", captionTh: "ม้วนฉลากไดคัทสำเร็จ", alt: "Finished flexo die-cut label roll" }
    ],
    draft: true
  },
  {
    slug: "silkscreen",
    order: 4,
    code: "SC",
    title: "Silkscreen",
    titleTh: "สกรีน",
    subtitle: "Mesh & Squeegee",
    subtitleTh: "ตาข่ายและยางปาด",
    quote: "Opaque colour on glass, plastic, ceramic and other rigid surfaces.",
    quoteTh: "ให้สีทึบแสงบนแก้ว พลาสติก เซรามิก และพื้นผิวแข็งอื่น ๆ",
    close: "Useful when the brand needs to print directly onto rigid materials.",
    closeTh: "เหมาะกับงานที่ต้องพิมพ์แบรนด์ลงบนวัสดุแข็งโดยตรง",
    spec: [
      {
        label: "Mechanism", labelTh: "กลไก",
        value: "Squeegee forces ink through a mesh screen",
        valueTh: "ยางปาดดันหมึกผ่านตาข่ายสกรีน"
      },
      {
        label: "Resolution", labelTh: "ความละเอียด",
        value: "Coarser detail, thick ink deposit",
        valueTh: "รายละเอียดหยาบกว่า แต่ชั้นหมึกหนากว่าระบบอื่น"
      },
      {
        label: "Substrate", labelTh: "วัสดุ",
        value: "Glass, rigid plastic, ceramic",
        valueTh: "แก้ว, พลาสติกแข็ง, เซรามิก"
      },
      {
        label: "Run sweet spot", labelTh: "จุดคุ้มทุน Run",
        value: "Efficient at short to mid-size runs",
        valueTh: "คุ้มค่าที่ Run น้อยถึงขนาดกลาง"
      }
    ],
    cover: "assets/images/craft/silkscreen/cover-1400x1050.webp",
    coverAlt: "Silkscreen process overview",
    examples: [
      { src: "assets/images/craft/silkscreen/example-01-1400x1050.webp", width: 1400, height: 1050, caption: "Mesh screen exposure", captionTh: "การฉายแสงบล็อกสกรีน", alt: "Silkscreen mesh screen exposure" },
      { src: "assets/images/craft/silkscreen/example-02-1400x1050.webp", width: 1400, height: 1050, caption: "Squeegee pass", captionTh: "จังหวะปาดยาง", alt: "Silkscreen squeegee pass" },
      { src: "assets/images/craft/silkscreen/example-03-1400x1050.webp", width: 1400, height: 1050, caption: "Ink opacity build", captionTh: "การสร้างความทึบของหมึก", alt: "Silkscreen ink opacity build-up" },
      { src: "assets/images/craft/silkscreen/example-04-1400x1050.webp", width: 1400, height: 1050, caption: "Printed rigid surface", captionTh: "พื้นผิวแข็งที่พิมพ์เสร็จ", alt: "Finished silkscreen printed rigid surface" }
    ],
    draft: true
  },
  {
    slug: "engraving",
    order: 5,
    code: "EN",
    title: "Engraving",
    titleTh: "แกะสลัก",
    subtitle: "Direct Die Cut",
    subtitleTh: "แม่พิมพ์สลักโดยตรง",
    quote: "Fine detail with a tactile finish.",
    quoteTh: "รายละเอียดคมและมีผิวสัมผัสที่รับรู้ได้",
    close: "Often used for premium cards and limited packaging.",
    closeTh: "มักใช้กับการ์ดพรีเมียมและบรรจุภัณฑ์ผลิตจำนวนจำกัด",
    spec: [
      {
        label: "Mechanism", labelTh: "กลไก",
        value: "Die cut directly into the surface",
        valueTh: "แม่พิมพ์สลักลงบนพื้นผิวโดยตรง"
      },
      {
        label: "Resolution", labelTh: "ความละเอียด",
        value: "Micron-level line precision",
        valueTh: "ความละเอียดระดับไมครอน"
      },
      {
        label: "Substrate", labelTh: "วัสดุ",
        value: "Premium card stock, rigid board",
        valueTh: "กระดาษการ์ดพรีเมียม, บอร์ดแข็ง"
      },
      {
        label: "Run sweet spot", labelTh: "จุดคุ้มทุน Run",
        value: "Built for short, premium runs",
        valueTh: "เหมาะกับ Run สั้น งานพรีเมียม"
      }
    ],
    cover: "assets/images/craft/engraving/cover-1400x1050.webp",
    coverAlt: "Engraving process overview",
    examples: [
      { src: "assets/images/craft/engraving/example-01-1400x1050.webp", width: 1400, height: 1050, caption: "Die tooling", captionTh: "การทำแม่พิมพ์", alt: "Engraving die tooling" },
      { src: "assets/images/craft/engraving/example-02-1400x1050.webp", width: 1400, height: 1050, caption: "Depth / relief test", captionTh: "ทดสอบความลึกและนูน", alt: "Engraving depth and relief test" },
      { src: "assets/images/craft/engraving/example-03-1400x1050.webp", width: 1400, height: 1050, caption: "Registration on stock", captionTh: "การเข้าตำแหน่งบนกระดาษ", alt: "Engraving registration on card stock" },
      { src: "assets/images/craft/engraving/example-04-1400x1050.webp", width: 1400, height: 1050, caption: "Finished premium card", captionTh: "การ์ดพรีเมียมสำเร็จ", alt: "Finished engraved premium card" }
    ],
    draft: true
  }
];
