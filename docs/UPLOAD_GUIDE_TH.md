# คู่มือเพิ่มหมวด โปรเจกต์ และรูปผลงาน

เว็บไซต์ใช้โครงสร้างเรียบง่าย:

```text
กดหมวดบนหน้าแรก → เลือกโปรเจกต์ → ดูรูปเพิ่มเติมในหน้าโปรเจกต์
```

## เพิ่มรูปให้โปรเจกต์เดิม

ตัวอย่างโปรเจกต์ Packaging:

```text
assets/images/projects/packaging-design/good-daily/
├── cover-1200x900.webp
├── gallery-01-1440x1080.webp
├── gallery-02-1100x825.webp
└── gallery-03-1100x825.webp
```

1. เตรียมรูปเป็น `.webp` กว้างประมาณ 1600–2000 px
2. นำรูปไปวางในโฟลเดอร์โปรเจกต์
3. เปิด `data/projects.js`
4. เพิ่มข้อมูลรูปใน `gallery`

```javascript
gallery: [
  {
    src: "assets/images/projects/packaging-design/good-daily/gallery-01-1440x1080.webp",
    alt: "Good Daily packaging family overview"
  },
  {
    src: "assets/images/projects/packaging-design/good-daily/gallery-02-1100x825.webp",
    alt: "Close view of Good Daily cartons and containers"
  }
]
```

ใส่รูปเพิ่มได้ไม่จำกัดจำนวน หน้าโปรเจกต์จะเรียงรูปต่อกันอัตโนมัติ และแต่ละรูปควรมี `alt` ที่อธิบายภาพนั้นโดยตรง

## เพิ่มโปรเจกต์ใหม่

1. สร้างโฟลเดอร์ใหม่ เช่น:

```text
assets/images/projects/advertising/new-campaign/
```

2. ใส่ `cover-1200x900.webp` และรูป `gallery-01-1440x1080.webp`, `gallery-02-1100x825.webp` เป็นต้น
3. เปิด `data/projects.js`
4. คัดลอกข้อมูลโปรเจกต์หนึ่งชุด แล้วเปลี่ยน:

- `slug` ต้องไม่ซ้ำ
- `order` ใช้กำหนดลำดับ
- `category` ใช้ id จาก `data/categories.js`
- `title`, `sector`, `year`
- `cover` และ `coverAlt`
- `gallery` พร้อม `src` และ `alt` ของแต่ละภาพ
- `summary`, `challenge`, `solution`, `scope`, `direction`

ตัวอย่าง:

```javascript
{
  slug: "new-campaign",
  order: 7,
  category: "advertising",
  title: "New Campaign",
  sector: "Advertising",
  year: "2026",
  cover: "assets/images/projects/advertising/new-campaign/cover-1200x900.webp",
  coverAlt: "New Campaign advertising system overview",
  summary: "Project summary",
  challenge: "Project challenge",
  solution: "Design solution",
  scope: ["Art direction", "Advertising"],
  direction: "Clear / Bold / Flexible",
  gallery: [
    {
      src: "assets/images/projects/advertising/new-campaign/gallery-01-1440x1080.webp",
      alt: "New Campaign project overview"
    }
  ],
  demo: false
}
```

## เพิ่มหมวดใหม่

เปิด `data/categories.js` แล้วเพิ่มข้อมูลเพียงจุดเดียว:

```javascript
{ id: "editorial", label: "Editorial Design", folder: "editorial" }
```

จากนั้นใน `data/projects.js` ใช้:

```javascript
category: "editorial"
```

ปุ่ม Filter และรายการใน `PREVIEW.html` จะสร้างตามข้อมูลใหม่อัตโนมัติ ไม่ต้องแก้ปุ่มใน `home.html`

## ลิงก์ตรงไปยังหมวด

ระบบรองรับ URL สำหรับแชร์หมวด เช่น:

```text
home.html?category=packaging-design#work
home.html?category=campaign#work
```

## อัปโหลดผ่าน GitHub

1. เปิด Repository
2. เข้าโฟลเดอร์ปลายทาง
3. กด **Add file → Upload files**
4. ลากรูปเข้าไปและกด **Commit changes**
5. แก้ `data/projects.js` แล้ว Commit อีกครั้ง

GitHub Pages จะอัปเดตเว็บอัตโนมัติหลัง Workflow ทำงานเสร็จ

> เว็บไซต์นี้เป็น Static Site จึงไม่มีหน้า Admin แต่สามารถเพิ่มรูปและโปรเจกต์ผ่านโฟลเดอร์ GitHub ได้โดยไม่ต้องใช้ฐานข้อมูล
