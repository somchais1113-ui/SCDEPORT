# ภาพรวมโค้ดฉบับจัดระเบียบ

## หลักการ

หน้าตาของเว็บไซต์ยังคงใช้ Layout เวอร์ชันแรก แต่แยกหน้าที่ของแต่ละไฟล์ให้ชัดเจนขึ้น:

```text
index.html ─→ Landing Page ─→ home.html
                              ↓
categories.js  ─┐             motion.js ─→ Animation ทุกหน้า
                ├─→ shared.js ─→ app.js ─→ หน้ารวมผลงาน
projects.js    ─┘             └→ project.js ─→ หน้าโปรเจกต์
```

## หน้าที่ของแต่ละส่วน

### `data/categories.js`

เก็บชื่อหมวดเพียงจุดเดียว ปุ่ม Filter และ Preview อ่านข้อมูลจากไฟล์นี้อัตโนมัติ

```javascript
{ id: "packaging-design", label: "Packaging Design", folder: "packaging-design" }
```

### `data/projects.js`

เก็บข้อความและพาธรูปทั้งหมดของแต่ละโปรเจกต์ โดยอ้างอิงหมวดผ่าน `category` id

```javascript
{
  slug: "good-daily",
  category: "packaging-design",
  title: "Good Daily",
  cover: "assets/images/projects/packaging-design/good-daily/cover-1200x900.webp",
  gallery: [
    {
      src: "assets/images/projects/packaging-design/good-daily/gallery-01-1440x1080.webp",
      alt: "Good Daily packaging family overview"
    }
  ]
}
```

### `assets/js/shared.js`

เป็นศูนย์กลางสำหรับ:

- เรียงลำดับโปรเจกต์
- ค้นหาหมวดและโปรเจกต์จาก id
- ป้องกันข้อความที่นำไปสร้าง HTML
- เปลี่ยน Title และ Description ของหน้าโปรเจกต์

### `assets/js/motion.js`

ควบคุม Animation หลักของเว็บไซต์:

- Intro และ Landing Page Reveal
- Scroll Reveal ของ Section และ Project Card
- Page Transition ระหว่างหน้าภายใน
- Motion แบบลดลงเมื่อผู้ใช้เปิด `prefers-reduced-motion`

### `assets/js/app.js`

ควบคุมหน้าแรก:

- สร้างปุ่ม Filter จาก `categories.js`
- กรอง Project Grid
- เก็บหมวดไว้ใน URL เพื่อแชร์ลิงก์ได้
- เปิดและปิดเมนูมือถือ รวมถึงปุ่ม Escape

### `assets/js/project.js`

ควบคุมหน้าโปรเจกต์:

- อ่าน `?id=project-slug`
- สร้างรายละเอียดและ Gallery
- ใช้คำอธิบาย `alt` แยกตามภาพ
- กดภาพเพื่อเปิดไฟล์ขนาดเต็ม
- เชื่อมไปยังโปรเจกต์ถัดไป

## สิ่งที่ปรับปรุงแล้ว

1. ไม่ต้องพิมพ์ชื่อหมวดซ้ำใน HTML และ Project Data
2. ลดฟังก์ชัน JavaScript ที่ซ้ำกัน
3. ป้องกันชื่อหมวดใน Filter ไม่ตรงกับข้อมูล
4. แชร์ลิงก์ตรงไปยังหมวดได้
5. Preview เพิ่มโปรเจกต์ใหม่ตาม Data ให้อัตโนมัติ
6. แต่ละรูปมีคำอธิบายเฉพาะของตัวเอง
7. หน้าโปรเจกต์เปลี่ยน Meta Description ตามโปรเจกต์

## สิ่งที่ยังควรทำเมื่อมีผลงานจริง

1. เปลี่ยน Concept Mockup และข้อความ Demo เป็นผลงานจริง
2. ส่งออก Thumbnail แยกจากภาพ Gallery เพื่อลดขนาดโหลดหน้าแรก
3. เตรียมภาพ Open Graph 1200 × 630 px สำหรับแชร์บน Social Media
4. เพิ่มภาษาไทยเฉพาะกรณีที่กลุ่มลูกค้าหลักต้องอ่านสองภาษา
5. เพิ่มระบบ CMS ภายหลังเมื่อจำนวนโปรเจกต์มากและต้องอัปเดตบ่อย
