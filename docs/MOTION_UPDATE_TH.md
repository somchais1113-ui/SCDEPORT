# สรุปการปรับ Landing Page และ Animation

## โครงสร้างหน้าใหม่

- `index.html` เป็น Landing Page เต็มหน้าจอ
- ปุ่ม **Enter portfolio** เชื่อมไปยัง `home.html`
- `home.html` คือหน้ารวมผลงานเดิม
- หน้า Project และลิงก์ย้อนกลับเชื่อมตรงไปยัง `home.html#work`

## รูปแบบ Animation

ระบบใช้แนวทาง **Editorial Reveal** เพื่อให้ภาพสินค้าและโปสเตอร์ยังเป็นพระเอก:

1. ตัวอักษรบน Landing เปิดขึ้นจาก Baseline
2. ภาพเปิดด้วย Mask จากซ้ายไปขวา
3. เส้นกรอบและเส้น Grid ค่อย ๆ วาดขึ้น
4. ปุ่ม Enter ใช้การเติมสี Graphite แบบเรียบ ไม่ใช้สี Accent สด
5. หน้า Home เปิด Header, Headline และ Hero Image ตามลำดับ
6. Section และ Project Card ปรากฏเมื่อเลื่อนถึงตำแหน่ง
7. Filter ใช้ Fade-out / Fade-in แทนการกระโดดเปลี่ยนทันที
8. ลิงก์ภายในใช้ Page Wipe สั้น ๆ ระหว่างหน้า
9. Mobile Menu เปิดด้วย Mask และ Fade

## ไฟล์ควบคุม

- Timing และ JavaScript: `assets/js/motion.js`
- รูปแบบภาพเคลื่อนไหว: ช่วง `Landing page and editorial motion system` ด้านล่างของ `assets/css/main.css`
- Animation ตอนกรอง Project: `assets/js/app.js`

## การลด Motion

เว็บไซต์ตรวจ `prefers-reduced-motion` จากระบบของผู้ใช้โดยอัตโนมัติ หากเปิด Reduce Motion:

- ปิด Page Transition
- ปิดการเลื่อนและ Loop Animation
- แสดงข้อความและภาพทันที

## หลักการใช้งาน

ไม่แนะนำให้เพิ่ม Animation ที่เปลี่ยน Hue, Saturation, Overlay สี หรือ Gradient ขนาดใหญ่บนรูปผลงาน เพราะจะทำให้สีของสินค้าและโปสเตอร์ไม่ตรงกับงานจริง
