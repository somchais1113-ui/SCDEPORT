# V57 — Object Study Visual Refine

เวอร์ชันนี้ปรับการนำเสนอ Object Study ตามภาพคอมเมนต์ล่าสุด โดยยังรักษาโครงสร้างข้อมูลและ interaction เดิมไว้

## 1. Main Page / Object Study Preview

- ลดความสูงของพื้นที่แสดงปากกาบน Desktop และ Tablet
- ลดระยะห่างก่อนเข้าสู่ภาพสินค้า
- รักษารูปแบบปากกาแนวตั้งบน Mobile เพื่อไม่ให้จุด Hotspot ชนกัน

## 2. Visual Category Selector

เพิ่มหมวดภาพ 3 กลุ่มก่อนเข้าสู่พื้นที่ Explore

1. Form & Proportion
2. Anatomy & Structure
3. Colour, Material & Finish

แต่ละหมวดใช้ภาพสินค้าเป็นองค์ประกอบหลักแทนวงกลมเปล่า และเชื่อมกับโหมด Overview, Anatomy และ Colour System ตามลำดับ

## 3. Overview 2.5D

- เพิ่มระนาบพื้นแบบ Perspective
- เพิ่มเงาสัมผัสและระยะลอยของสินค้า
- เพิ่มการเอียงและ Depth ของภาพสินค้าโดยไม่เปลี่ยนสัดส่วนไฟล์ต้นฉบับ
- ระบบลากและปุ่มลูกศรยังทำงานเหมือนเดิม

## 4. Colour System

- เปลี่ยนจากแถว Swatch แบบแบนเป็น CMF Runway
- แยก Product Preview และชุดควบคุมสีให้ชัดเจน
- Swatch แสดงแบบ Material Chip มีเงาและสถานะ Active
- สีที่เลือกจะเปลี่ยน Tint, Glow และบรรยากาศของ Product Preview

## ไฟล์หลักที่แก้ไข

- `home.html`
- `object-study.html`
- `assets/js/pen-study.js`
- `assets/css/v57-object-study-visual-refine.css`
- `BUILD_VERSION.txt`

## การเปลี่ยนเป็นภาพสินค้าจริงในรอบถัดไป

ตำแหน่งภาพชั่วคราวใช้ไฟล์:

`assets/images/object-study/neutral-grey-ballpoint-transparent.png`

สามารถแทนที่ด้วยภาพสินค้าจริงพื้นหลังโปร่งใส โดยควรรักษาพื้นที่ Canvas รอบสินค้าให้พอดีและไม่ตัดเงา แนะนำภาพแนวนอนประมาณ 1600–2200 px เพื่อรองรับจอ Desktop ความละเอียดสูง
