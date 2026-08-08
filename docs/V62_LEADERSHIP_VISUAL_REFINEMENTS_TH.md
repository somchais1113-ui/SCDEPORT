# V62 — Leadership visual refinements

## เป้าหมาย
แก้ Feedback รอบสองจากผู้ใช้ 4 ข้อ: แก้บริบทเคสศึกษาให้ตรงกับงานออกแบบผลิตภัณฑ์/บรรจุภัณฑ์ (ไม่ใช่เว็บ), ลดความรกของ Section "Good work needs a clear system", ทำให้เลข 01–05 ใน Team Operating System เด่นขึ้นพร้อมสีตามสถานะ, และเปลี่ยน Production Knowledge เป็นภาพประกอบ

## การเปลี่ยนแปลงหลัก

### 1. แก้บริบทเคสศึกษา (data/projects.js)
- เปลี่ยน slug จาก `team-workflow-web-platform` เป็น `product-packaging-team-system`
- เปลี่ยนชื่อโฟลเดอร์ภาพให้ตรงกัน
- แก้ข้อความ title / challenge / solution / scope / direction ทั้งหมดจากบริบท "เว็บแพลตฟอร์ม" เป็นบริบท "งานออกแบบผลิตภัณฑ์และบรรจุภัณฑ์" ยังคงโครงเรื่อง Trello 5 ขั้นตอนไว้เหมือนเดิม

### 2. Section "Good work needs a clear system"
- เอา Mock Dashboard เดิม (ตัวอย่างรหัสงาน BR-014 / PK-021 ฯลฯ, Progress bar, Score bar) ออกทั้ง 3 การ์ด เพราะทำให้งง
- แทนที่ด้วยกรอบภาพประกอบแบบเส้นประ (Placeholder) พร้อมข้อความ "Add a photo or illustration here" ให้ผู้ใช้ใส่ภาพจริงเองภายหลัง

### 3. Team Operating System (workflow-rail)
- ขยายเลข 01–05 จาก 10px เป็น clamp(26px–36px) และเพิ่มน้ำหนักตัวอักษรเป็น 800
- เพิ่มสีประจำสถานะให้แต่ละขั้น (แถบสีบนขอบบนของปุ่ม + สีตัวเลข): Brief = เทาอมฟ้า, Assignment = เหลืองทอง, Design Review = ม่วง, Production = ส้มอิฐ, Delivery = เขียวมะกอก

### 4. Section "Production Knowledge" (craft-entry)
- เอา 5 Tile เดิม (Offset / Gravure / Flexo / Silkscreen / Engraving ที่ลิงก์ไป craft.html) ออก
- แทนที่ด้วยกรอบภาพประกอบเดียวขนาดใหญ่ พร้อมคำแนะนำให้ใส่ภาพที่สื่อถึงกระบวนการผลิตทั้ง 5 อย่างที่อธิบายไว้ในเนื้อหาข้างเคียงอยู่แล้ว
- ปุ่ม CTA เดิม "See how design reaches production" ที่ลิงก์ไป craft.html ยังอยู่ในฝั่งข้อความเหมือนเดิม

## ไฟล์ใหม่
- `assets/images/leadership/icon-placeholder.svg` — ไอคอนกลางสำหรับกรอบภาพ Placeholder ทั้งหมด
- `assets/css/v62-leadership-visual-refinements.css`

## สิ่งที่ต้องทำต่อ
- ใส่ภาพจริงแทนกรอบ Placeholder ทั้ง 4 จุด (3 การ์ดใน Section Leadership + 1 ภาพใน Production Knowledge)
- กรอกข้อมูลจริงในเคสศึกษา `product-packaging-team-system` ตามที่ทำเครื่องหมาย `[...]` ไว้
