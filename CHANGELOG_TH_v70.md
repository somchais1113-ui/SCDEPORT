# CHANGELOG v70 — Alignment Unify & QA Fixes

อ้างอิงจากการตรวจสอบ v69 ทั้งชุด โดยรันเว็บจริงผ่าน headless browser วัดค่าตำแหน่งพิกเซล
ทดสอบทั้งโหมด EN/TH ที่ความกว้าง 1440 / 1024 / 390px

---

## สรุปผลก่อน–หลัง

ค่าขอบซ้ายของเนื้อหา (หน่วย px) ที่ viewport 1440

| หน้า | ก่อน (header / breadcrumb / content / footer) | หลัง |
|---|---|---|
| home | 43.2 / – / 43.2 / 43.2 | **46.1 ทุกจุด** |
| profile | 43.2 / 46.1 / 46.1 / 43.2 | **46.1 ทุกจุด** |
| craft | 43.2 / 56.0 / 56.0 / 43.2 | **46.1 ทุกจุด** |
| craft-detail | 43.2 / 56.0 / 56.0 / 43.2 | **46.1 ทุกจุด** |
| object-study | 43.2 / 46.1 / 43.2 / 43.2 | **46.1 ทุกจุด** |
| project | 43.2 / 46.1 / **80.0** / 43.2 | **46.1 ทุกจุด** |
| category | 43.2 / 46.1 / 43.2 / 43.2 | **46.1 ทุกจุด** |

ที่ 1024px ตรงกันที่ 32.8 ทุกจุด และที่ 390px ตรงกันที่ 24 ทุกจุด

---

## 1. Alignment — รวม gutter เหลือระบบเดียว

เดิมมีระบบระยะขอบแข่งกันอยู่ 4 ระบบ

| แหล่ง | ค่า | ปัญหา |
|---|---|---|
| `.site-header` / `footer` | `3vw` | ไม่มี min/max เหลือ 11.7px ที่จอ 390 |
| `.shell` | `clamp(24px, 3.2vw, 56px)` | ค่ามาตรฐาน |
| `.craft-page .shell` | `clamp(28px, 6vw, 56px)` | หน้า craft กว้างกว่าเพื่อนเกือบ 13px |
| `.project-shell` | `min(100%, 1280px)` centred | เนื้อหา case ร่นเข้า 80px |

**ไฟล์ใหม่:** `assets/css/v70-alignment-unify.css` โหลดเป็นลำดับสุดท้ายทุกหน้า
ไม่แก้ v34–v69 เดิมแม้แต่บรรทัดเดียว จึงย้อนกลับได้ง่ายเพียงลบ `<link>` ออก

```css
:root {
  --gutter: clamp(24px, 3.2vw, 56px);   /* จุดเดียวที่ต้องแก้ถ้าจะปรับระยะขอบทั้งเว็บ */
  --content-max: 1680px;
}
```

ครอบคลุม 8 กลุ่ม

1. `.site-header`, `footer`, `.portfolio-footer`
2. `.shell`, `.craft-page .shell`
3. `.project-shell` เปลี่ยนจาก centred-fixed เป็น `max-width` + gutter ร่วม
4. `.profile-page` ชี้ `--profile-pad` มาที่ `--gutter`
5. `@supports` guard ให้ `-webkit-text-stroke`
6. หัวกลุ่มแบรนด์รองรับชื่อแบรนด์
7. section ที่มี `3vw` ฝังอยู่เอง (`.hero`, `.work-section`, `.about-section`, `.project-hero`, `.next-project`, `.pen-preview-section`, `.intro-strip p`, `.approach-title`, `.craft-entry`, `.leadership-workflow`)
8. selector เฉพาะหน้าที่ specificity สูงกว่า (`.home-page footer`, `.object-study-page .study-*`, `.category-page .category-page-shell`)

> **หมายเหตุ:** หน้า `index.html` (Landing) ตั้งใจเว้นไว้ไม่แตะ เพราะเป็นหน้าปกเต็มจอ
> ที่มีจังหวะ optical margin ของตัวเอง ไม่ใช่หน้าเนื้อหา

---

## 2. บั๊กที่แก้แล้ว

**`home.html` footer ขาด class** — เป็นหน้าเดียวที่ `<footer id="contact">` ไม่มี
`portfolio-footer` และ `<div class="footer-bottom">` ไม่มี `portfolio-footer__bottom`
ทำให้ที่จอ 390px footer ใช้ padding 11.7px ขณะที่ header ใช้ 20px แก้แล้ว

**`404.html` พังบน GitHub Pages** — GitHub Pages เสิร์ฟไฟล์นี้กับทุก path ที่ไม่พบ
รวมถึง path ลึกอย่าง `/SCDEPORT/work/abc` ทำให้ relative path `assets/css/main.css`
resolve ผิดและหน้า 404 ไม่มี CSS เลย

แก้โดยเขียนใหม่ทั้งหน้าให้ self-contained
- inline critical CSS ทั้งหมด ไม่พึ่ง external stylesheet
- ลิงก์ออกคำนวณจาก `SITE_BASE` ที่ตรวจจับ repo name อัตโนมัติ (แก้เป็น hard-code ได้ถ้าเปลี่ยนชื่อ repo)
- เพิ่ม `<meta name="description">`, `theme-color`, `robots: noindex` ที่ขาดไป

**`-webkit-text-stroke` เสี่ยงข้อความหาย** — `.profile-editorial-hero h1 em`,
`.hero-name-line--outline` และ `.landing-title-line.serif` ใช้ `color: transparent`
คู่กับ stroke ถ้า engine ไม่รองรับจะกลายเป็นโปร่งใสล้วน = หายทั้งบรรทัด
เพิ่ม `@supports` guard พร้อม `-webkit-text-fill-color` ให้มองเห็นได้เสมอ

**`v37` / `v39` / `v40` แข่งกันเอง** — เป็น 3 implementation ของ component เดียวกัน
ประกาศ selector ชุดเดียวกัน แต่ index/project/object-study/404 โหลด v37 ส่วน
home/category โหลด v40 ทำให้หน้าตา brand group ต่างกันโดยไม่ตั้งใจ
ตอนนี้ทุกหน้าโหลด `v40` เหมือนกัน และลบ `v39` (ไม่มีหน้าไหนเรียกใช้) ออก

**`motion.js` reveal selector ตายแล้ว** — v69 เปลี่ยน markup เป็น
`.profile-work-timeline__item` และ `.profile-education__grid` แต่ motion.js ยังชี้ไปที่
`.profile-timeline__item` / `.profile-compact-timeline__item` ของเดิม
ทำให้ section เหล่านี้ไม่มี scroll reveal เพิ่ม selector ใหม่แล้ว

---

## 3. Site version — เหลือแหล่งเดียว

เดิม hard-code เลขไว้ 6 footer และทุก `<meta build-version>` จึงเพี้ยนกันในรีลีสเดียว
(home = 64, profile = 69, category/project = 61, craft = 56, object-study = 63,
index = v55)

**ไฟล์ใหม่:** `assets/js/site-version.js` โหลด **ก่อน** `motion.js` ทุกหน้า
เพราะ motion.js อ่านค่าจาก `data-i18n-*` ทุกครั้งที่สลับภาษา จึงต้องเขียนทับที่ attribute
ไม่ใช่ที่ `textContent` เฉย ๆ

```js
var SITE_VERSION = 70;
var BUILD_NAME = "v70-alignment-unify";
```

แก้ 2 บรรทัดนี้ที่เดียว แล้วให้ตรงกับ `BUILD_VERSION.txt` พอ

---

## 4. คำผิดและความไม่สอดคล้อง

| เดิม | แก้เป็น | เหตุผล |
|---|---|---|
| `Second-Class Honors` | `Second-Class Honours` | เว็บใช้ British English เป็นหลัก (colour, recognisable, organise) |
| `heritage redesign programs` | `heritage redesign programmes` | เหตุผลเดียวกัน |
| `Others Display` | `Other Displays` | เดิมผิดหลักไวยากรณ์ |
| `Other Display` (fallback) | `Other Displays` | เดิมมี 2 สำนวนในไฟล์เดียวกัน |
| `ดิสเพลย์อื่น ๆ` / `งานดิสเพลย์อื่น ๆ` | `งานดิสเพลย์อื่น ๆ` | เดิมมี 2 คำแปลสำหรับสิ่งเดียวกัน |
| `t("Quantum", "ควอนตัม")` | `"Quantum"` | ชื่อแบรนด์เป็นวิสามานยนาม ห้ามทับศัพท์ |
| `t("Kioku", "คิโอคุ")` | `"Kioku"` | เหตุผลเดียวกัน |

ลบ field `brandLabelTh` ออกจาก `data/projects.js` ทั้ง 2 รายการ
(โค้ดที่อ่าน field นี้เป็น optional fallback อยู่แล้ว จึงไม่กระทบการทำงาน)

**หัวกลุ่มแบรนด์ไม่แสดงชื่อแบรนด์** — `app.js` ฟังก์ชัน `groupedDisplayMarkup()`
ใส่ `group.label` ไว้แค่ใน `aria-label` ผู้ใช้ที่มองเห็นจึงเจอ
"01 / Brand group", "02 / Brand group", "03 / Brand group" เรียงกันโดยไม่รู้ว่ากลุ่มไหนคือแบรนด์อะไร
ตอนนี้แสดงเป็น "01 / Brand group · Quantum" พร้อมสไตล์รองรับใน v70

**หน้า craft แปลไม่ครบ** — `craft.html` และ `craft-detail.html` มีปุ่มสลับภาษา
แต่ nav, skip-link และ breadcrumb ไม่มี `data-i18n-*` เลย กด TH แล้วยังเป็นอังกฤษครึ่งหน้า
เพิ่มครบแล้ว รวมถึงคำว่า "Home" ใน breadcrumb ซึ่งเดิมไม่มีคำแปลในทุกหน้า

---

## 5. ทำความสะอาด repo

| ลบออก | ขนาด |
|---|---|
| `Archive.zip` | 9.4 MB |
| `.bak` / `.pre39` / `.pre40` / `.pre52` รวม 10 ไฟล์ | ~78 KB |
| `v39-display-brand-groups-3col.css` (ไม่มีหน้าไหนเรียกใช้) | 9.6 KB |

แนะนำเพิ่ม `.gitignore` ดังนี้เพื่อไม่ให้ไฟล์ประเภทนี้กลับเข้ามาอีก

```gitignore
*.bak
*.pre*
Archive.zip
.DS_Store
```

---

## 6. ผลการทดสอบ

- JavaScript error: **0** ทุกหน้า ทั้ง EN และ TH
- HTTP 404 / request ล้มเหลว: **0**
- Horizontal overflow: **0** ที่ 1440 และ 390
- `node --check` ผ่านทุกไฟล์ JS
- ขอบซ้ายตรงกันทุกหน้า: 46.1 (1440) / 32.8 (1024) / 24 (390)

---

## 7. สิ่งที่ยังไม่ได้แก้ — ต้องให้เจ้าของตัดสินใจ

รายการเหล่านี้เป็นเรื่องเนื้อหา ไม่ใช่โค้ด ผมจึงไม่เดาแทน

**A. Placeholder ยังหลุดขึ้นเว็บจริง**
`data/projects.js` โปรเจกต์ลำดับ 12 (`product-packaging-team-system`) ยังเป็น template เปล่า
และแสดงผลอยู่บน Work grid จริง

- `title:` `"[ชื่อโปรเจกต์ผลิตภัณฑ์ / บรรจุภัณฑ์ของคุณ / ...]"`
- `challenge` / `solution` ขึ้นต้นด้วย `"[ใส่โจทย์จริงของคุณ..."`
- `impact` ทั้ง 3 ค่ายังเป็น `"[ใส่ตัวเลขจริง เช่น 2.1% → 3.4%..."`

**B. แบนเนอร์ demo ขึ้นทุกโปรเจกต์**
ทั้ง 12/12 โปรเจกต์ตั้ง `demo: true` ทำให้ทุกหน้า case study แสดงข้อความ
"เนื้อหาชุดตัวอย่าง กรุณาแทนที่ข้อมูลและภาพทั้งหมดด้วยผลงานจริงก่อนเผยแพร่"
ต้องเปลี่ยนเป็น `demo: false` เฉพาะโปรเจกต์ที่เป็นผลงานจริงแล้ว

**C. ที่ตั้งไม่ตรงกัน**

| ตำแหน่ง | ข้อความปัจจุบัน |
|---|---|
| `index.html` meta + พิกัด 13°45′N/100°30′E | Bangkok |
| footer ทุกหน้ายกเว้น profile | Bangkok, Thailand |
| `profile.html` hero + footer | Samut Prakan, Thailand |
| `profile.html` timeline ทุกบรรทัด | · BANGKOK |

**D. จำนวนปีประสบการณ์**
หน้า Profile เขียน "11+ years" แต่ timeline เริ่มที่ 2013 ซึ่งนับถึง 2026 = 13 ปี

**E. ตำแหน่งงานสองภาษาไม่ตรงกัน**
`profile.html` hero ใส่ `data-i18n-th="Brand & Packaging Development Supervisor"`
(ทิ้งภาษาอังกฤษไว้) แต่ footer หน้าเดียวกันแปลเป็น "หัวหน้าฝ่ายพัฒนาแบรนด์และบรรจุภัณฑ์"

**F. เรื่องเล่าของแบรนด์ขัดกัน**
`index.html` และ `home.html` วางตัวเป็น "Independent design practice / สตูดิโอออกแบบอิสระ"
แต่ `profile.html` วางตัวเป็นพนักงานประจำระดับ Supervisor ที่มองหาตำแหน่ง Design Manager

**G. รูปในการ์ด Outcome ถูก crop เสียหาย**
`production-collaboration.webp` เป็นภาพแนวตั้ง 1044×1918 แต่กรอบเรนเดอร์ที่ 665×288
(อัตราส่วน 2.31:1) เมื่อ `object-fit: cover` จึงเหลือเห็นเพียงแถบแนวนอนบาง ๆ กลางภาพ
ควรเตรียมไฟล์ crop แนวนอนใหม่

---

## 8. หนี้ทางเทคนิคที่ยังเหลือ (ไม่เร่งด่วน)

ตัวเลขจากการวิเคราะห์ selector ซ้ำในโค้ดชุดปัจจุบัน

```
main.css        : .landing-page .landing-role            ประกาศซ้ำ 18 ครั้ง
main.css        : .landing-page .landing-title-wrap h1     ซ้ำ 18 ครั้ง
main.css        : .landing-page .landing-stage             ซ้ำ 16 ครั้ง
ui-controls.css : .home-page .hero-name-title              ซ้ำ 13 ครั้ง
v64-profile     : .profile-outcome-card                    ซ้ำ  6 ครั้ง
```

รวม 2,905 rules ใน 24 ไฟล์ CSS และมี `!important` 63 จุด
ปกติ selector หนึ่งควรมี 1 rule บวก responsive variant อีก 2–3 rule
การซ้ำ 16–18 ครั้งแปลว่าโค้ดถูกทับซ้อนสะสมมาหลายเวอร์ชันโดยไม่ได้ล้างของเก่า

แนวทางเมื่อมีเวลา
1. รวม `v56`–`v70` ที่แตะ component เดียวกันเข้าเป็นไฟล์เดียวต่อ component
2. ย้ายค่าที่ซ้ำ (สี ระยะ ขนาดตัวอักษร) ขึ้นเป็น CSS custom property ที่ `:root`
3. ตั้งกติกาว่ารีลีสถัดไปต้อง **แก้ไฟล์เดิม** ไม่ใช่เพิ่มไฟล์ override ใหม่

**หมายเหตุด้านฟอนต์**
`main.css:1675–1680` บังคับ `.landing-*` กลับไปใช้ Arial แม้อยู่โหมด TH
ทำให้หน้า Landing ใช้ฟอนต์ไทยคนละตัวกับหน้าอื่นทั้งเว็บ
และ `profile.html` preload `Prompt-Regular.ttf` ทุกครั้งแม้อยู่โหมด EN
ขณะที่ `home.html` / `index.html` ไม่ preload เลย ทำให้เห็นฟอนต์กระพริบตอนสลับภาษา
ควรทำนโยบาย preload ให้เหมือนกันทุกหน้า

**หมายเหตุด้าน a11y**
lightbox ใน `project.html` ใส่ `aria-modal="true"` แต่ไม่มี focus trap
กด Tab แล้วโฟกัสหลุดออกไปหลัง overlay ได้

**หมายเหตุด้าน image protection**
`image-protection.js` ติดตั้ง `MutationObserver` บน `document.documentElement`
แบบ `subtree: true` ตลอดอายุหน้าเว็บ และบล็อกได้แค่ contextmenu กับ dragstart
ใครเปิด DevTools หรือ View Source ก็ยังโหลดไฟล์ต้นฉบับได้ตามปกติ
ถ้าต้องการป้องกันจริงจังต้องใช้ watermark หรือเสิร์ฟภาพความละเอียดต่ำแทน

---

## 9. v70.1 — ลบโปรเจกต์ลำดับ 12 ออกทั้งหมด

ตามที่ตัดสินใจ ผลงานชิ้นนี้ยังเป็น template เปล่าจึงถอดออกจากเว็บ ไม่ใช่แค่ซ่อน

**ที่ลบออก**

| รายการ | รายละเอียด |
|---|---|
| `data/projects.js` | entry `product-packaging-team-system` ทั้งบล็อก (3,926 ตัวอักษร) |
| `data/categories.js` | หมวด `leadership-case-study` ซึ่งเหลือ 0 ผลงานหลังลบโปรเจกต์ |
| `assets/images/projects/leadership-case-study/` | ไฟล์ SVG placeholder 4 ไฟล์ |

**ที่แก้ตาม**

- `home.html` — "Eleven focused disciplines" → **"Ten focused disciplines"**
  และ "สิบเอ็ดศาสตร์การออกแบบที่เราถนัด" → **"สิบศาสตร์การออกแบบที่เราถนัด"**
  (จำนวนหมวดลดจาก 11 เหลือ 10 ตัวเลขในข้อความจึงต้องตรงกัน)

**ที่เก็บไว้**

`assets/css/v61-leadership-case-study.css` ยังคงอยู่ เพราะ selector ข้างในถูกอ้างถึงโดย
`app.js`, `category.js` และ `project.js` อยู่ (`.project-format-badge`, `.case-impact`,
`.category-project-card__image`) ถ้าเพิ่มโปรเจกต์ที่มี `cardTag` หรือ `impact` ในอนาคต
สไตล์จะทำงานทันทีโดยไม่ต้องเขียนใหม่

**ผลการตรวจหลังลบ**

```
categories       : 10
projects         : 11
order            : 1,2,3,4,5,6,7,8,9,10,11  (ไม่มีช่องว่าง)
orphan projects  : none   (ไม่มีผลงานที่ชี้ไปหมวดที่ถูกลบ)
empty categories : none   (ไม่มีปุ่มกรองที่กดแล้วว่างเปล่า)
ภาพที่อ้างถึงแต่ไม่มีไฟล์ : 0
```

URL เก่าที่อาจถูกแชร์ไปแล้วยัง fallback ได้อย่างสุภาพ ไม่ทำให้หน้าพัง

| URL เดิม | ผลลัพธ์ EN | ผลลัพธ์ TH |
|---|---|---|
| `project.html?id=product-packaging-team-system` | Project not found / Nothing on this shelf. | ไม่พบโปรเจกต์นี้ / ยังไม่มีผลงานในหน้านี้ |
| `category.html?category=leadership-case-study` | Category not found | ไม่พบหมวดหมู่นี้ |

การวนโปรเจกต์ถัดไปยังทำงานถูกต้อง ผลงานชิ้นสุดท้าย (Off Grid Studies) วนกลับไป Urban Signals

---

## 10. v70.2 — ปิดแบนเนอร์ demo ทั้งหมด

ยืนยันแล้วว่าผลงานที่เหลือทั้ง 11 ชิ้นเป็นงานจริง จึงถอด flag `demo` ออกจาก
`data/projects.js` ทั้งหมด (ลบ field ทิ้ง ไม่ใช่ตั้งเป็น `false` เพื่อให้ไฟล์ข้อมูลสะอาด)

**ก่อน**

```js
    ],
    demo: true
  },
```

**หลัง**

```js
    ]
  },
```

`project.js` เช็คด้วย `project.demo` แบบ truthy อยู่แล้ว การลบ field จึงให้ผลเหมือนกับ
`demo: false` ทุกประการ และถ้าวันหลังต้องการเปิดแบนเนอร์เฉพาะโปรเจกต์ใดก็เพิ่ม
`demo: true` กลับเข้าไปได้ตามเดิม ตรรกะในโค้ดไม่ถูกแตะต้อง

**ผลการตรวจ 11 หน้า case study**

| slug | แบนเนอร์ demo | หัวเรื่อง | ภาพในแกลเลอรี |
|---|---|---|---|
| urban-signals | 0 | Urban Signals | 10 |
| good-daily | 0 | Good Daily | 10 |
| everyday-forms | 0 | Everyday Forms | 10 |
| signature-system | 0 | Signature System | 10 |
| quantum-display-system | 0 | Quantum Display System | 12 |
| kioku-display-system | 0 | Kioku Display System | 12 |
| open-floor | 0 | Open Floor | 10 |
| make-it-move | 0 | Make It Move | 10 |
| margins-and-matter | 0 | Margins & Matter | 6 |
| pocket-parade | 0 | Pocket Parade | 4 |
| off-grid-studies | 0 | Off Grid Studies | 10 |

- ข้อความ placeholder ที่เหลือใน `data/projects.js`: **0**
- โปรเจกต์ที่ขาด field จำเป็น (`slug` / `title` / `cover` / `summary`): **0**
- console error / HTTP 404 / horizontal overflow: **0** ทุกหน้า ทั้ง EN และ TH

> เว็บพร้อมเผยแพร่แล้วในแง่โค้ด รายการที่เหลือใน §7 (ที่ตั้ง Bangkok/Samut Prakan,
> จำนวนปี 11+ เทียบกับ timeline ที่เริ่ม 2013, ตำแหน่งงานสองภาษา, เรื่องเล่าแบรนด์,
> รูป crop เสียในการ์ด Outcome) เป็นเรื่องเนื้อหาล้วน ไม่บล็อกการ deploy

---

## 11. v70.3 — แก้เนื้อหาส่วนที่ตัดสินได้จากข้อมูลในเว็บเอง

**ก. รูปในการ์ด Outcome**

ต้นเหตุที่แท้จริงไม่ใช่แค่สัดส่วนผิด แต่ `production-collaboration.webp` (1044×1918)
เป็น **คอลลาจ 5 ภาพเรียงแนวตั้ง** ไม่ใช่ภาพเดียว เมื่อถูกบีบเข้ากรอบ 665×288 (2.31:1)
จึงเหลือให้เห็นเพียงเสี้ยวกลางของคอลลาจ คือหน้าจอเครื่องวัดสีกับสมุด ซึ่งไม่สื่อความหมายใด

ตัดภาพแนวนอนใหม่จากพาเนลบนของคอลลาจ (ช่วงบรีฟทีมที่หน้าเครื่องพิมพ์)
เพราะตรงกับหัวข้อการ์ด "Keeping creative direction connected to the production floor"
มากที่สุด และเป็นภาพที่มีคนอยู่ในเฟรม อ่านเป็นเรื่องเล่าได้

| | เดิม | ใหม่ |
|---|---|---|
| ไฟล์ | `production-collaboration.webp` | `production-collaboration-wide.webp` |
| ขนาด | 1044×1918 (0.54:1) | 1044×451 (2.31:1) |
| น้ำหนักไฟล์ | 372 KB | 93 KB |
| ส่วนที่มองเห็นในการ์ด | ~25% ของภาพ | **100%** |
| `alt` | Vendor collaboration and printing production visits | Briefing the team on the press floor during a production run |

ไฟล์คอลลาจต้นฉบับยังเก็บไว้ที่เดิม ไม่ได้ลบ จึงตัดใหม่ได้ทุกเมื่อ
(อีกตัวเลือกที่ลองแล้วไม่เลือกคือช่วงแท่นพิมพ์ Heidelberg Speedmaster
ภาพสวยแต่ขอบขวาบนมีเศษกระเบื้องคอลลาจอีกใบปนเข้ามา และไม่มีคนอยู่ในเฟรม)

**ข. ตำแหน่งงานและชื่อวุฒิที่ไม่มีคำแปลไทย**

`profile.html` มีข้อความอังกฤษค้างอยู่ในโหมดไทย 6 จุด

| จุด | เดิมในโหมด TH | แก้เป็น |
|---|---|---|
| Quickfacts hero | `data-i18n-th` ใส่ข้อความอังกฤษไว้ | หัวหน้าฝ่ายพัฒนาแบรนด์และบรรจุภัณฑ์ |
| Timeline 2013–2014 | ไม่มี `data-i18n-*` เลย | ผู้ช่วยนักออกแบบผลิตภัณฑ์ |
| Timeline 2014–2016 | ไม่มี `data-i18n-*` เลย | นักออกแบบกราฟิก |
| Timeline 2016–2018 | ไม่มี `data-i18n-*` เลย | นักออกแบบกราฟิกอาวุโส |
| Timeline 2018–Present | ไม่มี `data-i18n-*` เลย | หัวหน้าฝ่ายพัฒนาแบรนด์และบรรจุภัณฑ์ |
| Education NIDA | ไม่มี `data-i18n-*` เลย | บริหารธุรกิจมหาบัณฑิต สำหรับผู้บริหาร (EMBA) |

คำแปลตำแหน่งปัจจุบันยึดตามที่ footer ของหน้าเดียวกันใช้อยู่แล้ว จึงตรงกันทั้งหน้า

**ผลตรวจ**

```
โหมด EN — timeline: Assistant Product Designer / Junior Graphic Designer /
                    Senior Graphic Designer / Brand & Packaging Development Supervisor
โหมด TH — timeline: ผู้ช่วยนักออกแบบผลิตภัณฑ์ / นักออกแบบกราฟิก /
                    นักออกแบบกราฟิกอาวุโส / หัวหน้าฝ่ายพัฒนาแบรนด์และบรรจุภัณฑ์
การ์ด Outcome 02 — frame 665×288, natural 1044×451, มองเห็น 100% ของภาพ
console error / HTTP 404 / overflow: 0 ทุกหน้า
ภาพที่อ้างถึงแต่ไม่มีไฟล์: 0
```

**ยังเหลือ 3 ข้อที่ต้องให้เจ้าของยืนยัน** เพราะเป็นข้อเท็จจริงส่วนตัวที่เดาแทนไม่ได้
ได้แก่ ที่ตั้ง (Bangkok เทียบกับ Samut Prakan), จำนวนปีประสบการณ์
(11+ เทียบกับ timeline ที่เริ่ม 2013 = 13 ปี) และทิศทางการวางตัวของแบรนด์
(สตูดิโออิสระ เทียบกับ ผู้บริหารงานออกแบบในองค์กร)

---

## 12. v70.4 — ปรับตามการตัดสินใจของเจ้าของ

### ก. ที่ตั้ง → Samut Prakan ทั้งเว็บ

แก้ครบ 8 หน้า ทั้งโหมด EN และ TH

| จุด | เดิม | ใหม่ |
|---|---|---|
| footer "Studio / Address" ทุกหน้า | Bangkok, Thailand / กรุงเทพมหานคร ประเทศไทย | Samut Prakan, Thailand / สมุทรปราการ ประเทศไทย |
| footer "Working Area" ทุกหน้า | Bangkok · Worldwide / กรุงเทพฯ · ร่วมงานทั่วโลก | Samut Prakan · Worldwide / สมุทรปราการ · ร่วมงานทั่วโลก |
| `home.html` about | Bangkok · Working worldwide / กรุงเทพฯ · ร่วมงานได้ทั่วโลก | รวมเป็นสำนวนเดียวกับหน้าอื่น |
| `profile.html` footer | Bangkok area · Remote collaboration / พื้นที่กรุงเทพฯ · ทำงานร่วมกันทางไกล | รวมเป็นสำนวนเดียวกับหน้าอื่น |
| `index.html` meta description | practice in Bangkok | practice in Samut Prakan, Thailand |
| `index.html` พิกัดตกแต่ง | 13°45′N / 100°30′E (กรุงเทพฯ) | **13°36′N / 100°36′E** (สมุทรปราการ) |
| `profile.html` label "Based" (TH) | พื้นที่ | ฐานที่ตั้ง |

ระหว่างทางได้รวมสำนวนไทยที่เคยมี 3 แบบสำหรับความหมายเดียวกัน
(`ร่วมงานทั่วโลก` / `ร่วมงานได้ทั่วโลก` / `ทำงานร่วมกันทางไกล`) ให้เหลือแบบเดียว
และแก้ label `ที่อยู่` ที่เคยถูกใช้กับทั้ง "Studio / Address" และ "Location"

**ที่ตั้งใจไม่แก้** — บรรทัดที่อยู่ของบุคคลที่สามในหน้า Profile ยังคงเดิม
เพราะเป็นข้อเท็จจริงขององค์กร ไม่ใช่ที่ตั้งของเจ้าของเว็บ

```
ELEMENT 26 CO., LTD. · BANGKOK
D.H.A. SIAMWALLA CO., LTD. · BANGKOK   (x3)
NIDA · BANGKOK
KHON KAEN UNIVERSITY · KHON KAEN
```

> หากที่ทำงานจริงอยู่สมุทรปราการ (โรงงานย่านบางพลี) ควรแก้บรรทัด
> D.H.A. SIAMWALLA ทั้ง 3 จุดด้วย ส่วน NIDA อยู่กรุงเทพฯ จริง จึงไม่ควรแก้
> ผมไม่แก้ให้เองเพราะเป็นที่อยู่องค์กร ไม่ควรเดา

### ข. ทิศทางแบรนด์ → คงเป็นสตูดิโออิสระ ปรับ Profile ตาม

พบจุดที่วางตัวแบบ "กำลังหางาน" ทั้งหมด 4 จุด ปรับให้เป็นภาษาของสตูดิโอที่รับงาน

| ที่ | เดิม | ใหม่ |
|---|---|---|
| `profile.html` eyebrow ท้ายหน้า | What comes next / ก้าวต่อไป | What I take on / งานที่รับดูแล |
| `profile.html` หัวข้อท้ายหน้า | Design Manager. Creative Lead. Brand & Packaging Lead. | Brand direction. Packaging systems. Production oversight. / ทิศทางแบรนด์ ระบบบรรจุภัณฑ์ การกำกับงานผลิต |
| `profile.html` ประโยครอง | **Roles** where creative quality... | **Projects** where creative quality... |
| `profile.html` footer section 4 | Positioning: Design Manager · Creative Lead | Working Area: Samut Prakan · Worldwide (ใช้บล็อกเดียวกับหน้าอื่น) |
| `profile.html` footer ชื่อ | Brand & Packaging Development Supervisor | Independent Design Practice / สตูดิโอออกแบบอิสระ |
| `profile.html` footer อีเมล | Management · Brand · Packaging · Production | New projects · Collaboration · Production |
| `home.html` management block | Positioning: Design Manager · Creative Lead · Design Operations | Scope: Brand direction · Packaging systems · Design operations |

ตำแหน่งงานจริงยังปรากฏอยู่ครบใน Quickfacts ของ hero และใน Experience timeline
จึงไม่ได้สูญเสียข้อมูลใด เพียงย้ายน้ำหนักจาก "สมัครงาน" ไปเป็น "รับงาน"

หัวข้อ 2 จุดนี้เดิมมี `data-i18n-th` เท่ากับ `data-i18n-en` ทุกตัวอักษร
คือไม่เคยถูกแปลเลย ตอนนี้แปลแล้ว และการสแกนอัตโนมัติไม่พบข้อความที่ยังไม่ได้แปลเหลืออยู่

### ค. จำนวนปีประสบการณ์ — ยังไม่ได้แก้ ขอข้อมูลเพิ่ม

ผมไม่แก้ปีใน timeline ให้ เพราะการเปลี่ยนปีที่เข้า-ออกงานคือการแก้ข้อเท็จจริงในประวัติ
การทำงาน ซึ่งผมเดาแทนไม่ได้ และการเดาผิดบนเอกสารที่ใช้สมัครงานมีผลเสียจริง

ข้อมูลที่มีอยู่ตอนนี้สอดคล้องกันเองอยู่แล้วในทางคณิตศาสตร์

```
BFA ประติมากรรม   2009–2012   จบการศึกษา 2012
Element 26        2013–2014   เริ่มทำงาน 2013
D.H.A. Junior     2014–2016
D.H.A. Senior     2016–2018
D.H.A. Supervisor 2018–ปัจจุบัน

2013 → 2026 = 13 ปี
```

ข้อความ "11+ years" น่าจะเขียนไว้ราวปี 2024 แล้วไม่ได้อัปเดตตามเวลาที่ผ่านไป
ไม่ใช่ว่าปีใน timeline ผิด ทางเลือกที่แนะนำ

1. **แก้เป็น 13+ years** ตรงกับ timeline ทันที ไม่ต้องแตะประวัติ
2. **ให้คำนวณอัตโนมัติ** จากปีเริ่มงาน 2013 เพื่อไม่ให้ตัวเลขเก่าอีกในอนาคต
3. **ถ้าปีใน timeline ผิดจริง** โปรดระบุปีที่ถูกต้องมา แล้วผมแก้ให้ทันที

---

## ผลตรวจรวมหลัง v70.4

```
ขอบซ้าย header / breadcrumb / เนื้อหา / footer
  1440px : 46.1  ทุกหน้า ทุกจุด
  1024px : 32.8  ทุกหน้า ทุกจุด
   390px : 24.0  ทุกหน้า ทุกจุด

console error / HTTP 404 / horizontal overflow : 0
ข้อความที่มี data-i18n-en แต่ไม่มี data-i18n-th : 0
ข้อความที่ EN กับ TH เหมือนกันทุกตัวอักษร      : 0
ภาพที่อ้างถึงแต่ไม่มีไฟล์                        : 0
placeholder ที่หลงเหลือ                          : 0
ที่ตั้งของเจ้าของเว็บที่ยังเขียน Bangkok          : 0
```
