# คู่มือเพิ่มผลงานและอัปโหลดรูป

## วิธีเพิ่มโปรเจกต์ใหม่

สมมติชื่อโปรเจกต์คือ `Ocean Pen Collection`

### 1. ตั้งชื่อ Slug

ใช้ภาษาอังกฤษตัวพิมพ์เล็กและขีดกลางแทนช่องว่าง:

```text
ocean-pen-collection
```

ห้ามใช้ช่องว่าง เครื่องหมายพิเศษ หรือชื่อซ้ำกับโปรเจกต์เดิม

### 2. สร้างโฟลเดอร์รูป

สร้างโฟลเดอร์นี้ใน GitHub:

```text
assets/images/projects/ocean-pen-collection/
```

จากนั้นอัปโหลดรูป โดยแนะนำชื่อดังนี้:

```text
cover.webp
gallery-01.webp
gallery-02.webp
gallery-03.webp
```

ข้อแนะนำสำหรับรูป:

- ใช้ WebP เพื่อให้เว็บไซต์โหลดเร็ว
- ภาพ Cover แนะนำอัตราส่วน 4:3
- ความกว้างประมาณ 1,400–1,800 px
- ขนาดไฟล์เป้าหมายไม่เกิน 300 KB ต่อภาพ
- ชื่อไฟล์ใช้ภาษาอังกฤษตัวพิมพ์เล็ก ไม่มีช่องว่าง

### 3. เพิ่มข้อมูลใน `data/projects.js`

คัดลอก Object ด้านล่างไปวางก่อน `];` แล้วแก้ข้อมูล:

```js
{
  slug: "ocean-pen-collection",
  order: 4,
  title: "Ocean Pen Collection",
  sector: "Writing Instrument",
  year: "2026",
  categories: ["Packaging", "Identity"],
  cover: "assets/images/projects/ocean-pen-collection/cover.webp",
  alt: "Blue writing instrument packaging arranged on a clean studio background",
  summary: "คำสรุปโปรเจกต์สั้น ๆ",
  challenge: "โจทย์หรือปัญหาที่ต้องแก้",
  solution: "แนวทางออกแบบที่ใช้แก้โจทย์",
  scope: ["Packaging design", "Art direction", "Production guide"],
  direction: "Precise / Contemporary / Useful",
  gallery: [
    "assets/images/projects/ocean-pen-collection/cover.webp",
    "assets/images/projects/ocean-pen-collection/gallery-01.webp",
    "assets/images/projects/ocean-pen-collection/gallery-02.webp"
  ],
  demo: false
}
```

อย่าลืมใส่เครื่องหมายจุลภาค `,` ระหว่าง Object แต่ละโปรเจกต์

### 4. อัปโหลดขึ้น GitHub

1. เปิด Repository
2. เลือก **Add file → Upload files**
3. ลากไฟล์หรือโฟลเดอร์ที่แก้ไขแล้วเข้าไป
4. กด **Commit changes**
5. รอ GitHub Actions ทำงานประมาณ 1–3 นาที
6. เปิด URL ของ GitHub Pages เพื่อตรวจสอบ

## วิธีแก้ชื่อและอีเมล

ค้นหาคำต่อไปนี้ใน `index.html` และ `project.html`:

```text
Somchai Sompiew
Somchai.s1113@gmail.com
```

จากนั้นแทนที่ด้วยข้อมูลใหม่ทั้งหมด

## สิ่งที่ GitHub Pages ทำไม่ได้

เว็บไซต์ HTML แบบ Static ไม่สามารถรับรูปจากหน้า Upload แล้วบันทึกเข้า GitHub ได้โดยตรงอย่างปลอดภัย เพราะไม่ควรใส่ GitHub Token ไว้ใน JavaScript ฝั่งผู้ชม

หากต้องการหน้า Admin สำหรับอัปโหลดรูปโดยตรง ควรเชื่อมระบบจัดเก็บ เช่น Supabase หรือ Cloudinary และเก็บ Secret Key ไว้ฝั่ง Server เท่านั้น
