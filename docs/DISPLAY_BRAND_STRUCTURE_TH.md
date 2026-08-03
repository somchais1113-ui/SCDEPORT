# โครงสร้างหมวด Display — Quantum และ Kioku

เวอร์ชัน v37 แยกงาน Display ตามแบรนด์อย่างชัดเจน โดยยังคงอยู่ในหมวดหลักเดียวกันคือ `Display`.

## โครงสร้างโฟลเดอร์

```text
assets/images/projects/display-retail/
├── quantum/
│   └── quantum-display-system/
└── kioku/
    └── kioku-display-system/
```

หนึ่งโฟลเดอร์โปรเจกต์ยังคงใช้ภาพ 10 ภาพตามระบบเดิม:

```text
cover-1200x900.webp
gallery-01-1440x1080.webp
gallery-02-1100x825.webp
gallery-03-1100x825.webp
gallery-04-1400x1100.webp
gallery-05-1400x1100.webp
gallery-06-1400x1100.webp
gallery-07-1600x900.webp
gallery-08-1600x900.webp
gallery-09-1400x1100.webp
gallery-10-1200x1500.webp
```

## ข้อมูลที่ต้องใส่ใน `data/projects.js`

```javascript
{
  category: "display-retail",
  brand: "quantum",
  brandLabel: "Quantum",
  brandLabelTh: "ควอนตัม",
  brandOrder: 1
}
```

สำหรับ Kioku ใช้:

```javascript
{
  category: "display-retail",
  brand: "kioku",
  brandLabel: "Kioku",
  brandLabelTh: "คิโอคุ",
  brandOrder: 2
}
```

## พฤติกรรมบนเว็บไซต์

- เมื่อเลือกหมวด Display บนหน้า Home ระบบจะแยก Quantum และ Kioku เป็นคนละ Brand Group
- หน้า Category ของ Display มีเมนูเลือกแบรนด์และ Section แยกกัน
- หน้า Project Detail แสดงชื่อแบรนด์ใน breadcrumb และ eyebrow
- โครงสร้างพร้อมรองรับหลายโปรเจกต์ต่อหนึ่งแบรนด์ โดยเพิ่มข้อมูลและโฟลเดอร์ภายใต้แบรนด์เดิม

ภาพในสองโปรเจกต์ปัจจุบันเป็น Demo Placeholder จากโครงเดิม ควรแทนที่ด้วยภาพจริงของแต่ละแบรนด์ก่อนเผยแพร่เว็บไซต์.
