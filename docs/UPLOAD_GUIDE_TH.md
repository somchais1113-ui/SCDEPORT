# คู่มือเพิ่มผลงานและอัปโหลดรูป

เว็บไซต์ชุดนี้ออกแบบเป็นลำดับดังนี้:

```text
หน้าแรก → หมวดหมู่ → โปรเจกต์ → แกลเลอรีหลายภาพ
```

ตัวอย่าง: ผู้ชมกด **Packaging Design** → เห็นรายชื่อโปรเจกต์ในหมวด → กดโปรเจกต์ → เห็นรายละเอียดและรูปเพิ่มเติม

## 1. เตรียมรูปก่อนอัปโหลด

แนะนำให้ใช้ไฟล์ `.webp` เพื่อให้หน้าเว็บโหลดเร็ว

- รูปปกโปรเจกต์: อัตราส่วน 4:3 ขนาดประมาณ 1600 × 1200 px
- รูปแกลเลอรีแนวนอน: กว้างประมาณ 1600–2000 px
- ขนาดไฟล์ที่เหมาะสม: ประมาณ 150–400 KB ต่อภาพ
- ใช้ชื่อไฟล์ภาษาอังกฤษ ตัวพิมพ์เล็ก และไม่เว้นวรรค

ตัวอย่างชื่อไฟล์:

```text
cover.webp
gallery-01.webp
gallery-02.webp
gallery-03.webp
```

## 2. สร้างโฟลเดอร์ของโปรเจกต์

เลือกหมวดงาน แล้วสร้างโฟลเดอร์โปรเจกต์ภายในหมวดนั้น เช่น งาน Packaging ชื่อ Coffee House:

```text
assets/images/projects/packaging-design/coffee-house/
├── cover.webp
├── gallery-01.webp
├── gallery-02.webp
└── gallery-03.webp
```

ชื่อหมวดที่ใช้ได้ในระบบ:

```text
advertising
packaging-design
product-design
display-retail
campaign
other-creative
```

## 3. เพิ่มข้อมูลโปรเจกต์

เปิดไฟล์ `data/projects.js` แล้วคัดลอกโปรเจกต์ตัวอย่างหนึ่งชุด จากนั้นแก้ข้อมูลและพาธรูปให้ตรงกับโฟลเดอร์ใหม่

ตัวอย่างโครงสร้าง:

```javascript
{
  id: "coffee-house",
  category: "packaging-design",
  title: "Coffee House",
  subtitle: "คำอธิบายสั้นของโปรเจกต์",
  year: "2026",
  location: "Bangkok / Europe",
  client: "Client name",
  cover: "assets/images/projects/packaging-design/coffee-house/cover.webp",
  coverAlt: "คำอธิบายภาพปกสำหรับผู้ใช้ screen reader",
  gallery: [
    {
      src: "assets/images/projects/packaging-design/coffee-house/gallery-01.webp",
      alt: "คำอธิบายรูปที่หนึ่ง",
      caption: "ข้อความใต้ภาพที่หนึ่ง"
    },
    {
      src: "assets/images/projects/packaging-design/coffee-house/gallery-02.webp",
      alt: "คำอธิบายรูปที่สอง",
      caption: "ข้อความใต้ภาพที่สอง"
    }
  ],
  services: ["Packaging Design", "Art Direction"],
  challenge: "โจทย์ของงาน",
  solution: "แนวคิดและวิธีแก้โจทย์",
  note: ""
}
```

ข้อสำคัญ:

- `id` ต้องไม่ซ้ำกับโปรเจกต์อื่น
- `category` ต้องตรงกับชื่อหมวดในรายการด้านบน
- ใส่รูปใน `gallery` ได้กี่ภาพก็ได้
- ระหว่างโปรเจกต์แต่ละชุดต้องมีเครื่องหมายจุลภาค `,`

## 4. เพิ่มหมวดหมู่ใหม่

หากต้องการหมวดนอกเหนือจาก 6 หมวดเดิม:

1. สร้างรูปปกที่ `assets/images/categories/ชื่อหมวด/cover.webp`
2. เปิด `data/categories.js`
3. คัดลอกหมวดตัวอย่างและแก้ `id`, `number`, `name`, คำอธิบาย และพาธรูป
4. ใน `data/projects.js` ใช้ค่า `category` ให้ตรงกับ `id` ของหมวดใหม่

## 5. อัปโหลดผ่านหน้าเว็บ GitHub

1. เปิด Repository ของเว็บไซต์
2. เข้าโฟลเดอร์ปลายทาง เช่น `assets/images/projects/packaging-design/coffee-house/`
3. กด **Add file → Upload files**
4. ลากรูปทั้งหมดเข้าหน้าเว็บ แล้วกด **Commit changes**
5. แก้ `data/projects.js` และ Commit อีกครั้ง
6. GitHub Pages จะอัปเดตเว็บไซต์อัตโนมัติหลัง Workflow ทำงานเสร็จ

## 6. เช็กลิสต์ก่อนเผยแพร่

- กดทุกหมวดแล้วเปิดได้
- กดโปรเจกต์แล้วเห็นรูปครบ
- กดรูปแล้ว Lightbox เปิดและปิดได้
- ตรวจชื่อโปรเจกต์ ปี ลูกค้า และอีเมล
- ทดลองบนมือถือ
- ลบหรือแก้ข้อความ `Concept project` เมื่อใส่ผลงานจริงแล้ว

> เว็บไซต์นี้เป็น Static Site จึงไม่มีหน้า Admin สำหรับอัปโหลดรูปโดยตรง แต่เพิ่มรูปผ่านโฟลเดอร์ GitHub ได้ง่ายและไม่ต้องมีฐานข้อมูล
