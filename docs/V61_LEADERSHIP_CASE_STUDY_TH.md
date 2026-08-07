# V61 — Leadership Case Study

## เป้าหมาย
เพิ่มหมวดหมู่ผลงานใหม่สำหรับกรณีศึกษาด้านการบริหารทีมและกระบวนการทำงาน (Trello / Team Operating System) แยกออกจากงานคราฟต์เดิม พร้อม Signpost ให้ผู้ชมแยกแยะได้ทันทีว่าเป็นเนื้อหาคนละประเภท ตามที่คุยกันไว้ในแชท

## การเปลี่ยนแปลงหลัก
- เพิ่มหมวดหมู่ `leadership-case-study` ใน `data/categories.js`
- เพิ่มโปรเจกต์ตัวอย่าง `team-workflow-web-platform` ใน `data/projects.js` (สถานะ `demo: true` — ยังเป็นเนื้อหาตัวอย่าง ต้องแทนที่ด้วยข้อมูลจริงก่อนเผยแพร่)
- เพิ่มฟิลด์ใหม่ `impact` (array ของ label / value) สำหรับใส่ตัวเลขผลลัพธ์ทางธุรกิจ เช่น Conversion, CSAT, Revenue
- เพิ่ม Section "Impact" ในหน้า `project.html` (แสดงเมื่อโปรเจกต์มีฟิลด์ `impact`)
- เพิ่ม Badge "Leadership Case Study" มุมซ้ายบนของภาพปก ทั้งในหน้า Home และหน้า Category เพื่อแยกเคสนี้จากงานออกแบบคราฟต์อื่น ๆ อย่างชัดเจน
- เพิ่ม `assets/css/v61-leadership-case-study.css` (Badge + Impact block styling)
- ปรับข้อความจำนวนสาขางาน "Ten focused disciplines" เป็น "Eleven..." ใน `home.html`
- สร้างภาพประกอบชั่วคราวเป็น SVG แบบ Abstract Line Art (โทนสีเดียวกับเว็บ) แทนภาพถ่ายจริง เนื่องจากยังไม่มีภาพจริงจากโปรเจกต์

## สิ่งที่ต้องทำต่อ (ก่อนเผยแพร่จริง)
- แทนที่ข้อความ placeholder ทั้งหมดในโปรเจกต์ `team-workflow-web-platform` (ชื่อโปรเจกต์ โจทย์ แนวทางแก้ ตัวเลข Impact) ด้วยข้อมูลจริง
- แทนที่ภาพ SVG ชั่วคราวด้วยภาพจริง (สกรีนช็อต Trello, ภาพเว็บที่ทำจริง ฯลฯ) แล้วเปลี่ยน `demo: false`
