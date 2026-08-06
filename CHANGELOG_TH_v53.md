# บันทึกการแก้ไข v53

## 1. เพิ่มหมวดหมู่ใหม่ 2 หมวด

แก้ที่ `data/categories.js` (จาก 8 เป็น 10 หมวด) โดยจัดลำดับให้อยู่ใกล้ศาสตร์ที่เกี่ยวข้อง

| ลำดับ | id | label | labelTh |
| --- | --- | --- | --- |
| 4 | `ci-design` | CI Design | ออกแบบอัตลักษณ์องค์กร |
| 6 | `exhibition-design` | Exhibition Design | ออกแบบนิทรรศการ |

และเพิ่มโปรเจกต์ตั้งต้นให้แต่ละหมวด (วิธีเดียวกับหมวดเดิมทุกประการ) ใน `data/projects.js`

| หมวด | slug | ชื่อโปรเจกต์ | โฟลเดอร์ภาพ | จำนวนภาพ |
| --- | --- | --- | --- | --- |
| CI Design | `signature-system` | Signature System | `assets/images/projects/ci-design/signature-system/` | cover + 10 |
| Exhibition Design | `open-floor` | Open Floor | `assets/images/projects/exhibition-design/open-floor/` | cover + 10 |

> ชื่อโปรเจกต์ทั้งสองเป็นชื่อชั่วคราว หากต้องการเปลี่ยน ให้ดูหัวข้อ "วิธีเปลี่ยนชื่อโปรเจกต์" ด้านล่าง

## 2. เพิ่มภาพในกลุ่ม Display

เพิ่มกลุ่มละ 2 ภาพ ทั้ง Quantum และ Kioku (จาก 10 เป็น 12 ภาพต่อโปรเจกต์)

```text
gallery-11-1400x1100.webp   layout: half
gallery-12-1200x1500.webp   layout: portrait
```

## 3. ภาพ Placeholder

สร้างไฟล์ Placeholder รวม 26 ไฟล์ เพื่อให้หน้าเว็บแสดงผลครบตั้งแต่วันนี้
ทุกไฟล์เป็นพื้นสีเดียวกับเว็บ พร้อมระบุชื่อสล็อตและขนาดไว้บนภาพ

เมื่อมีผลงานจริงแล้ว ให้อัปโหลดทับด้วย **ชื่อไฟล์เดิมทุกตัวอักษร** โดยไม่ต้องแก้โค้ด
รายชื่อไฟล์ทั้งหมดอยู่ใน `UPLOAD-NAMES.txt` ของแต่ละโฟลเดอร์

## 4. แก้ปัญหาปุ่มแปล ไทย/อังกฤษ

### สาเหตุ

ระบบสลับภาษาอยู่ในฟังก์ชัน `setupLanguageToggle()` ของ `assets/js/motion.js`
ซึ่งจะทำงาน **ก็ต่อเมื่อหน้านั้นมีปุ่ม `[data-language]` อยู่จริง**

| หน้า | เดิมมีปุ่ม TH/EN | เดิมแปลได้ |
| --- | --- | --- |
| `index.html`, `home.html`, `craft.html`, `craft-detail.html`, `object-study.html` | มี | ได้ |
| `category.html` | **ไม่มี** | **ไม่ได้** |
| `project.html` | **ไม่มี** | **ไม่ได้** |

นอกจากนี้ `category.js` และ `project.js` ยังฝังข้อความอังกฤษไว้ในโค้ดโดยตรง
(`View case`, `Brand group`, `Challenge`, `Solution`, `Scope`, `Next project` ฯลฯ)
และไม่ได้ดักฟัง event `portfolio:languagechange` เหมือน `app.js` จึงไม่เรนเดอร์ใหม่เมื่อสลับภาษา

### สิ่งที่แก้

- เพิ่มปุ่ม TH/EN ในส่วนหัวของ `category.html` และ `project.html` (วางไว้ใน `.project-nav`
  เพราะ `.site-header` เป็น grid 2 คอลัมน์ การเพิ่มลูกตัวที่สามจะทำให้ตกบรรทัด)
- เขียน `assets/js/category.js` และ `assets/js/project.js` ใหม่ให้รองรับสองภาษา
  และเรนเดอร์ใหม่ทุกครั้งที่เกิด event `portfolio:languagechange`
- เพิ่ม `data-i18n-en` / `data-i18n-th` ให้ข้อความคงที่ในสองหน้านี้
- เพิ่มฟิลด์ภาษาไทยครบทุกโปรเจกต์ใน `data/projects.js`

  | ฟิลด์อังกฤษ | ฟิลด์ไทย | สถานะเดิม |
  | --- | --- | --- |
  | `sector` | `sectorTh` | มีอยู่แล้ว |
  | `summary` | `summaryTh` | มีอยู่แล้ว |
  | `brandLabel` | `brandLabelTh` | มีอยู่แล้ว |
  | `challenge` | `challengeTh` | **เพิ่มใหม่** |
  | `solution` | `solutionTh` | **เพิ่มใหม่** |
  | `scope` | `scopeTh` | **เพิ่มใหม่** |
  | `direction` | `directionTh` | **เพิ่มใหม่** |

หากโปรเจกต์ใดไม่มีฟิลด์ไทย ระบบจะถอยกลับไปใช้ข้อความอังกฤษให้อัตโนมัติ
การเพิ่มโปรเจกต์ใหม่จึงไม่ทำให้ปุ่มแปลพัง

### หมายเหตุทางเทคนิค

`project.js` เดิมผูก event ของ Lightbox กับปุ่มแต่ละใบโดยตรง เมื่อมีการเรนเดอร์ใหม่
ปุ่มเดิมจะถูกทิ้งไปพร้อม event ทั้งหมด จึงเปลี่ยนมาใช้ event delegation ที่ `#project-view`
แทน ทำให้ Lightbox ยังทำงานได้หลังสลับภาษาไม่จำกัดจำนวนครั้ง

## 5. แก้ปัญหาฟอนต์หน้า Landing

### สาเหตุ (วัดจากไฟล์ฟอนต์จริง)

`assets/fonts/SpecialGothicExpandedOne-Regular.ttf` เป็นฟอนต์แบบ Expanded
วัดค่าจริงที่ unitsPerEm 1000 ได้ความกว้างของคำดังนี้

```text
SOMCHAI  5.937 em   หัก letter-spacing -0.014em แล้วเหลือ  5.839 em
SOMPIEW  6.115 em   หัก letter-spacing -0.004em แล้วเหลือ  6.087 em
```

เทียบกับความกว้างคอลัมน์ที่ `.landing-stage` จัดสรรให้จริงในแต่ละ breakpoint
พบว่าข้อความล้นกรอบเกือบทุกความกว้างจอ

| Viewport | font-size ที่ใช้จริง | พื้นที่คอลัมน์ | ความกว้าง SOMPIEW | ส่วนที่ล้น |
| --- | --- | --- | --- | --- |
| 360 px | 53 px | 316 px | 336 px | 19 px |
| 390 px | 57 px | 346 px | 363 px | 17 px |
| 480–700 px | 68 px | 436–656 px | 434–441 px | ปกติ |
| 768 px | 77 px | 401 px | 497 px | **96 px** |
| 900 px | 90 px | 473 px | 583 px | **110 px** |
| 980 px | 90 px | 516 px | 585 px | **69 px** |
| 1024 px | 65 px | 409 px | 430 px | 21 px |
| 1440 px | 91 px | 575 px | 605 px | 30 px |
| 1920 px | 118 px | 784 px | 775 px | ปกติ |

เนื่องจาก `.landing-title-line` ตั้ง `overflow: hidden` ไว้ (ใช้กับอนิเมชันเลื่อนตัวอักษรขึ้น)
ส่วนที่ล้นจึงถูกตัด และไปเบียดคอลัมน์ภาพด้านขวา ช่วง **701–999 px (tablet) เสียหายหนักที่สุด**

> ส่วนแกนตั้งตรวจแล้วไม่มีปัญหา ระยะหมึกจริงของฟอนต์อยู่ที่ -0.013 ถึง 0.722 em
> ยังอยู่ในกรอบ line-height 0.86 พอดี ปัญหาจึงเป็นแกนนอนล้วน ๆ

### สิ่งที่แก้

เพิ่มไฟล์ `assets/css/v53-landing-type-fit.css` (โหลดเป็นไฟล์สุดท้ายใน `index.html`)

1. เพิ่มสัดส่วนคอลัมน์ซ้ายจาก `0.95fr` เป็น `1.15fr` (และ `1.2fr` ที่ ≤980 px)
2. ผูกขนาดตัวอักษรกับความกว้างคอลัมน์จริงด้วย Container Query
   `font-size: min(clamp(...), 15.2cqw)` โดยเพดาน 15.2cqw คำนวณจาก 96cqw ÷ 6.174em
   ซึ่งเป็นบรรทัด SOMPIEW ที่กว้างที่สุด เผื่อ safety margin ไว้ประมาณ 2%
3. เปลี่ยนระยะเยื้องของบรรทัด SOMPIEW และแถบสาขางานให้อิงคอลัมน์เดียวกัน (`4cqw`)

ผลลัพธ์หลังแก้ ตรวจด้วยการคำนวณซ้ำทุก breakpoint แล้วพอดีกรอบทั้งหมด
โดยเหลือระยะเผื่ออย่างน้อย 5% เสมอ

| Viewport | font-size ใหม่ | พื้นที่คอลัมน์ | ระยะเผื่อ |
| --- | --- | --- | --- |
| 390 px | 52 px | 331 px | 5.2% |
| 768 px | 60 px | 397 px | 6.6% |
| 900 px | 71 px | 467 px | 6.6% |
| 1024 px | 76 px | 498 px | 6.6% |
| 1440 px | 106 px | 700 px | 6.6% |
| 1920 px | 130 px | 953 px | 15.7% |

**ความเข้ากันได้** Container query รองรับใน Chrome 105+, Safari 16+, Firefox 110+
โค้ดส่วนนี้ครอบด้วย `@supports (container-type: inline-size)` เบราว์เซอร์เก่าจะย้อนไปใช้ค่าเดิมโดยไม่พัง

**การปรับค่า** แก้ที่ตัวแปร `--landing-title-cap` ค่าเดียวในไฟล์ CSS ดังกล่าว

### สิ่งที่ยังตรวจไม่ได้

`.landing-counter` (พิกัด 13°45′N / 100°30′E) วางแบบ `position: absolute` ที่มุมขวาล่าง
ซึ่งอยู่ในแถบเดียวกับปุ่ม Craft & Process ผมใส่ระยะกันชนไว้ให้แล้ว (`margin-right` ของรายการสุดท้ายใน footer)
แต่ยังไม่ได้ยืนยันด้วยภาพจริง หากยังเห็นการทับกันตรงจุดนี้ รบกวนส่งภาพหน้าจอพร้อมความกว้างจอมาครับ

## 6. อื่น ๆ

- `home.html` แก้ข้อความ "Eight focused disciplines" เป็น "Ten focused disciplines" (และฉบับภาษาไทย)
- อัปเดต cache-busting เป็น `?v=53` ใน `index.html`, `home.html`, `category.html`, `project.html`
- อัปเดต `STRUCTURE.md` เพิ่มหัวข้อระบบสองภาษา

---

## วิธีเปลี่ยนชื่อโปรเจกต์ที่เพิ่มใหม่

ตัวอย่าง เปลี่ยน `open-floor` เป็น `siam-expo-2026`

1. เปลี่ยนชื่อโฟลเดอร์
   `assets/images/projects/exhibition-design/open-floor/`
   เป็น `assets/images/projects/exhibition-design/siam-expo-2026/`
2. เปิด `data/projects.js` หาบล็อกที่มี `slug: "open-floor"` แล้วแก้
   - `slug` เป็น `"siam-expo-2026"`
   - `title` เป็นชื่อที่ต้องการแสดง
   - path ของ `cover` และ `gallery` ทุกบรรทัด (แทนที่ `open-floor` ด้วยชื่อใหม่)
3. ไม่ต้องแก้ `data/categories.js` เพราะหมวดหมู่ไม่ได้ผูกกับชื่อโปรเจกต์

## วิธีเพิ่มหมวดหมู่ใหม่ในอนาคต

1. เพิ่ม 1 บรรทัดใน `data/categories.js` (ต้องมีครบทั้ง `id`, `label`, `labelTh`, `folder`)
2. สร้างโฟลเดอร์ `assets/images/projects/<folder>/<slug>/` แล้วใส่รูป
3. เพิ่ม object โปรเจกต์ใน `data/projects.js` โดยตั้ง `category` ให้ตรงกับ `id` ในขั้นตอนที่ 1
4. ปุ่มกรองบนหน้าแรกและหน้าหมวดหมู่จะขึ้นเองอัตโนมัติ ไม่ต้องแก้ HTML

---

# บันทึกการแก้ไข v53.1 (แก้ผลข้างเคียงของ v53)

## ปัญหา

หน้า Landing บนมือถือเสียหาย ตัวหนังสือกับรูปเบียดกันเป็น 2 คอลัมน์
มีช่องว่างขาวขนาดใหญ่ด้านบน และปุ่ม Enter portfolio กลายเป็นบล็อกสีดำสูงผิดปกติ

## สาเหตุ (เป็นความผิดพลาดที่เกิดจาก v53 เอง)

`v53-landing-type-fit.css` เขียนกฎสัดส่วนคอลัมน์ไว้แบบไม่มีขอบเขตล่าง

```css
.landing-page .landing-stage { grid-template-columns: 1.15fr 0.85fr; }
@media (max-width: 980px) { /* 2 คอลัมน์เหมือนกัน */ }
```

ขณะที่ `v35-production-fix.css` สั่งให้มือถือเป็นคอลัมน์เดียว

```css
@media (max-width: 700px) {
  .landing-page .landing-stage { grid-template-columns: 1fr; }
}
```

ทั้งสองกฎมี specificity เท่ากันคือ (0,0,3) แต่ `index.html` โหลด v53 ทีหลัง v35
กฎของ v53 จึงชนะ และ `@media (max-width: 980px)` ก็ครอบจอ 393px ด้วย

จากนั้นเกิดผลต่อเนื่องอีก 2 อาการ

| อาการ | กลไก |
| --- | --- |
| ช่องว่างขาวด้านบน | เนื้อหาหดสั้น + v35 ตั้ง `grid-template-rows: auto auto auto` บน `.landing` ซึ่ง `align-content` ค่าเริ่มต้นคือ `stretch` แถวทั้งสามจึงยืดเฉลี่ยกัน |
| บล็อกดำท้ายหน้า | `.landing-enter` (พื้นดำ) ถูก grid ยืดตามแถวท้ายที่พองขึ้น |

## สิ่งที่แก้

1. ครอบกฎ 2 คอลัมน์ทั้งหมดด้วย `@media (min-width: 701px)`
2. ประกาศ `grid-template-columns: 1fr` ที่ `<= 700px` ไว้ชัดเจน กันการทับซ้ำในอนาคต
3. เปลี่ยนแถวของ `.landing` บนมือถือเป็น `auto 1fr auto` ให้เฉพาะแถวกลางรับพื้นที่ที่เหลือ
4. ตั้ง `align-self: center` ให้ลูกของ `.landing-footer` กันปุ่มถูกยืด
5. ตั้ง `align-content: start` ให้ `.landing-stage` เนื้อหาจึงเริ่มจากด้านบนของแถว

## วิธีตรวจสอบที่ใช้ (และเหตุผลที่รอบก่อนตรวจไม่เจอ)

รอบก่อนผมทดสอบด้วย headless DOM ซึ่ง **ไม่ประมวลผล CSS** จึงจับ bug ประเภท cascade ไม่ได้

รอบนี้เขียนเครื่องมือตรวจ cascade ขึ้นมาโดยเฉพาะ อ่านลำดับการโหลด stylesheet
จาก `index.html` จริง แล้วไล่หาว่าประกาศใดชนะในแต่ละความกว้างจอ ผลลัพธ์

```text
.landing-page .landing-stage { grid-template-columns }
    360px  1fr                                    <- v53 (max-width:700px)
    700px  1fr                                    <- v53 (max-width:700px)
    701px  minmax(0,1.2fr) minmax(240px,0.8fr)    <- v53 (min-width:701px) and (max-width:980px)
   1440px  minmax(0,1.15fr) minmax(320px,0.85fr)  <- v53 (min-width:701px)
```

พร้อมตรวจการทับซ้อนระหว่าง v53 กับ v35 ที่ 390px ทุกประกาศ พบว่าทับกัน 9 จุด
และทั้ง 9 จุดเป็นการทับที่ตั้งใจ ไม่มีจุดใดหลุด

## ผลลัพธ์หลังแก้

| Viewport | ขนาดตัวอักษร | ความกว้างคอลัมน์ | ระยะเผื่อ |
| --- | --- | --- | --- |
| 320 px | 44 px | 284 px | 5.2% |
| 375 px | 53 px | 339 px | 5.2% |
| 390 px | 55 px | 354 px | 5.2% |
| 430 px | 61 px | 394 px | 5.2% |
| 700 px | 68 px | 664 px | 36.8% |
| 768 px | 60 px | 397 px | 6.6% |
| 900 px | 71 px | 467 px | 6.6% |
| 1440 px | 106 px | 700 px | 6.6% |
| 1920 px | 130 px | 953 px | 15.7% |

ตรวจครบ 22 ความกว้าง ตั้งแต่ 320 ถึง 1920 px ไม่มีจุดใดล้นกรอบ

## หมายเหตุเรื่องแคช

อัปเดต cache-busting เป็น `?v=531` และ `build-version` เป็น `v53.1-landing-mobile-fix`
หากเปิดแล้วยังเห็นของเดิม ให้ hard refresh หรือรอ CDN ของ Vercel อัปเดต
