# V63 — Eyebrow overlap fix (object-study.html)

## บั๊กที่พบ
บนหน้าจอมือถือ ข้อความ eyebrow ("Object Study 01 / Ballpoint Pen", "Visual index" ฯลฯ) ในหน้า `object-study.html` ซ้อนทับกับหัวข้อใหญ่ด้านล่าง ("One object. Five clear parts." และ "One object. Different details.")

## สาเหตุ
กฎ CSS `.eyebrow span { width:6px; height:6px; border-radius:50%; ... }` ใน `main.css` ถูกออกแบบให้จับเฉพาะ `<span>` ว่างที่เป็นจุดกลมตกแต่งหน้า eyebrow เท่านั้น ส่วน `<span>` ที่ใส่ข้อความจริงต้องมี class `eyebrow-copy` กำกับเพื่อ Reset ค่ากลับ (ตามที่ `ui-controls.css` เตรียมไว้ และมีคอมเมนต์อธิบายไว้ใน `assets/js/craft.js` อยู่แล้ว)

หน้า `object-study.html` มี eyebrow 4 จุดที่ใส่ข้อความในทีี่ `<span>` โดยไม่มี class `eyebrow-copy` กำกับ ทำให้ข้อความถูกบีบเข้าไปในกล่องขนาด 6×6px และล้นออกมาทับเนื้อหาถัดไปแทนที่จะดันเนื้อหาลง

## จุดที่แก้
เพิ่ม `class="eyebrow-copy"` ให้ `<span>` ข้อความทั้ง 4 จุดใน `object-study.html`:
- "Object Study 01 / Ballpoint Pen" (บรรทัด 71)
- "Visual index" (บรรทัด 86)
- "External anatomy" (บรรทัด 257)
- "Inside the barrel" (บรรทัด 271)

## หมายเหตุ
ตรวจสอบไฟล์ HTML และ JS อื่นทั้งหมดในเว็บแล้ว (`home.html`, `project.html`/`project.js`, `category.html`/`category.js`, `craft.html`/`craft.js`, `404.html`) ไม่พบ eyebrow จุดอื่นที่ขาด class นี้ บั๊กนี้จำกัดอยู่เฉพาะ `object-study.html` เท่านั้น
