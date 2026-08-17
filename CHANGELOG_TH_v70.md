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

---

## 13. v71 — รอบรีวิวจากเจ้าของ (คอมเมนต์ 4 ภาพ)

หน้า Profile เท่านั้น ไฟล์ใหม่ `assets/css/v71-profile-review.css` โหลดต่อจาก v70 ไม่แก้ v34–v70

### ภาพ 1 — Experience
ปีในแต่ละคอลัมน์ ("2013–2014" ฯลฯ) จาก 12px → **15px** พร้อมเพิ่มน้ำหนักเป็น 600
แถบหมวด FORM / DESIGN / PRODUCTION / LEADERSHIP จาก 9px น้ำหนัก 500 → **11px ตัวหนา 700**
(อ้างอิงขนาดเดียวกับ label "eyebrow" ที่ใช้ทั่วเว็บ) เพิ่มระยะห่างใต้แถบหมวดเล็กน้อยไม่ให้ชนกับการ์ดด้านล่าง

### ภาพ 2 — Education
**"Art → Design → Management"** ล็อกให้อยู่บรรทัดเดียวด้วย `white-space: nowrap` ร่วมกับลดขนาดฟอนต์
จาก clamp(46,4.8vw,78) → clamp(40,4.3vw,66) เฉพาะช่วงจอ ≥981px (จุดเดิมอยู่ที่ขอบพอดี 886px ข้อความ = 886px กรอบ
จึงตกบรรทัดใหม่ได้ง่ายเมื่อ font metrics ต่างกันเล็กน้อยระหว่างเครื่อง) ทดสอบแล้วไม่ล้นบรรทัดตั้งแต่ 700px ถึง 1920px

ชื่อสถาบัน (NIDA · BANGKOK ฯลฯ) เป็น **ตัวหนา** ตามที่ขอ ชื่อหลักสูตร/วุฒิ ขยายจาก
clamp(20,1.8vw,29) → **clamp(24,2.15vw,34)**

วันที่ NIDA แก้จาก "2024–Present" เป็น **"2024–2026"**

### ภาพ 3 — หัวข้อ Hero
"& design leadership." จากตัวโปร่ง (outline) → **ตัวทึบสีเดียวกับบรรทัดแรก**

### ภาพ 4 — Hero quickfacts และรูปโปรไฟล์

| จุด | เดิม | ใหม่ |
|---|---|---|
| Based | Samut Prakan, Thailand | **Bangkok, Thailand** |
| ฟิลด์ใหม่ | — | **Corporate: D.H.A. Siamwalla Co., Ltd.** |
| SKU ที่ดูแล | 50+ | **200+** (แก้ครบทั้ง 3 จุดในหน้า ไม่ใช่แค่ quickfact) |
| รูปโปรไฟล์ | placeholder "Photo coming soon" | **รูปจริงที่ส่งมา** เต็มกรอบโค้ง |

> **ข้อสังเกตที่ต้องแจ้ง:** การเปลี่ยน "Based" กลับเป็น Bangkok ในจุดนี้ทำให้เกิดความขัดแย้งกับ
> การตัดสินใจก่อนหน้านี้ที่ให้ใช้ Samut Prakan ทั้งเว็บ — footer ทุกหน้ารวมถึงฟิลด์ Corporate
> ที่เพิ่มใหม่ในบรรทัดเดียวกันยังคงอ้างอิง Samut Prakan อยู่ ผมทำตามที่สั่งแล้วแต่ไม่ปรับที่อื่นให้
> เพราะคำสั่งนี้ระบุเจาะจงเฉพาะฟิลด์นี้ในภาพที่ 4 ถ้าต้องการให้สอดคล้องกันทั้งหมด แจ้งได้ว่าจะให้ยึด
> Bangkok หรือ Samut Prakan เป็นค่าหลัก

รูปที่ใช้: แปลงจาก PNG ต้นฉบับ (1093×1918) เป็น `somchai-headshot.webp` (121 KB)
วางด้วย `object-fit: cover` และ `object-position: 50% 22%` เพื่อไม่ให้ตัดหน้าตอนเฟรมบีบที่จอแคบ

### ผลตรวจ

```
console error / HTTP 404 / horizontal overflow : 0  (ทุกหน้า ทุก breakpoint)
ขอบซ้าย header/breadcrumb/เนื้อหา/footer          : 46.1 / 32.8 / 24  (ไม่เปลี่ยนจาก v70)
"Art → Design → Management" ล้นบรรทัด             : ไม่พบ ตั้งแต่ 700px–1920px
ข้อความที่ไม่มีคำแปลไทย                            : 0
```

---

## 14. v72 — รอบรีวิวจากเจ้าของ รอบที่ 3 (คอมเมนต์ 6 ภาพ + ข้อสังเกตภาพรวม)

หน้า Profile เท่านั้นสำหรับ 6 ข้อแรก ไฟล์ใหม่ `assets/css/v72-profile-review-3.css`

### ภาพ 1 — Responsibilities
เปลี่ยนจาก accordion (ต้องกด "+" เพื่อเปิด) เป็น**แสดงรายละเอียดทันทีทุกช่อง** — ใส่ attribute
`open` ให้ `<details>` ทั้ง 4 จุดในไฟล์ HTML และซ่อนไอคอน "+" ด้วย CSS
ชื่อบริษัท (D.H.A. SIAMWALLA CO., LTD. ฯลฯ) ขยายจาก **9px → 12px** พร้อมตัวหนา

### ภาพ 2 — ตัด "(EMBA)"
เหลือ "Executive Master of Business Administration" ทั้งสองภาษา

### ภาพ 3 — ฟอนต์ label เล็ก
"Years experience / Designers led / SKUs managed / End-to-end scope" จาก 9.5px → 11.5px
แถบทักษะ "Brand Identity · Packaging · ..." จาก 10px → 12px

### ภาพ 4 — จุดวงกลมไม่ตรงกัน
**สาเหตุที่แท้จริง** (ยืนยันด้วยการวัดพิกัดจริง ไม่ใช่แค่ดูตา): จุดแถวบน (FORM/DESIGN/
PRODUCTION/LEADERSHIP) อยู่ที่ตำแหน่ง `left:0` ของแต่ละคอลัมน์เสมอมา แต่จุดแถวล่าง
(ปีในแต่ละงาน) ถูก v69 เลื่อนไปที่ `left:22px` เพื่อชนกับ padding ของข้อความ ทำให้สอง
แถวห่างกันคงที่ 22px ทุกคอลัมน์ แก้โดยให้จุดแถวล่างกลับมาที่ `left:0` เหมือนแถวบน

### ภาพ 5 — Selected Learning เล็กและไม่สื่อความหมาย
เปลี่ยนหัวข้อเป็น **"Certifications & continuing education"** และเพิ่มคำอธิบายสั้น 1 บรรทัด
ใต้ชื่อคอร์สแต่ละอัน (ตีความจากชื่อคอร์สเอง ไม่ได้เพิ่มข้อมูลที่ไม่มีอยู่จริง) ขยายฟอนต์จาก
9.5–10px เป็น 11–14px และจัดเป็นการ์ด 2 คอลัมน์แทนแถบ inline เดิม

### ภาพ 6 — Heading ปิดท้ายไม่ชิดซ้าย + wrap เกิน 2 บรรทัด
**สาเหตุที่แท้จริง**: heading เดิมอยู่คนละ grid column กับ label "WHAT I TAKE ON"
(คั่นด้วยคอลัมน์กว้าง ≥180px) จึงไม่ชิดขอบซ้ายเหมือนหัวข้อ section อื่นทั้งหมดในหน้านี้
ปรับโครงสร้าง HTML ให้ label กับ heading อยู่ใน wrapper เดียวกัน ชิดซ้ายแบบเดียวกับทุก
section แล้วปรับ font-size ให้พอดี **ยืนยันด้วยการวัดจริงว่าเหลือ 2 บรรทัดพอดีที่ทุกความกว้าง
จอ 1280–1920px และชิดซ้ายตรงกับขอบเว็บ 46.1px ที่ 1440px**

ระหว่างแก้พบบั๊กแฝง: กฎ CSS เก่าจาก v66 (`.profile-close h2 { font-size: clamp(56px,
6.5vw,108px) }`) เคยถูกซ่อนไว้ด้วยโครงสร้าง HTML เดิม พอเปลี่ยนโครงสร้างใหม่มันโผล่กลับมา
ทำให้ font-size พุ่งเป็น 93px โดยไม่ตั้งใจ แก้ด้วยการเพิ่ม specificity ของ selector ให้ชนะ

---

## 15. v73 — ฟอนต์เล็กทั้งเว็บ (ตามข้อสังเกตภาพรวม)

ไฟล์ใหม่ `assets/css/v73-legibility.css` โหลดเป็นลำดับสุดท้ายทุกหน้า (เหมือน v70)

**สำรวจทั้งเว็บพบ 100+ จุดที่ font-size ≤10.5px** ครอบคลุมทุกไฟล์ CSS ตัดสินใจแก้แบบ
เลือกเฉพาะจุด ไม่ใช่ทุกจุด ด้วยหลักการนี้

**แก้ (ข้อความที่ต้องอ่านจริง):**
- ปุ่มสลับภาษา TH/EN (**8px → 12px** — เดิมเล็กที่สุดในเว็บทั้งที่เป็นปุ่มกดใช้งานจริง)
- Breadcrumb "HOME / WORK / ..." (9–11px → 12px)
- ปุ่ม "Back to homepage" (11px → 12px)
- Footer: ลิขสิทธิ์, NAME/STUDIO/EMAIL/WORKING AREA labels (9–11px → 10.5–12px)
- Eyebrow label ("01 / PROFILE" ทุกหน้า) (11px → 11.5px)
- หน้า Home: filter summary, project card meta, hero carousel caption,
  ป้ายชื่อแบรนด์ในการ์ด, แดชบอร์ด "Five connected stages" (9–11px → 11–12px)
- หน้า Craft: spec labels, caption (10px → 11.5px)
- หน้า Object Study: label การโต้ตอบทั้งหมดที่เป็นเนื้อหาหลัก ไม่ใช่ป้ายประดับ (9–10px → 11px)
- หน้า Profile: label ที่เหลือจากรอบก่อน (CURRENT/BASED/CORPORATE, outcome card meta,
  principles strip) (8.5–9px → 10.5–11.5px)

**ไม่แตะ (มีเหตุผล):**
- **หน้า Landing (index.html)** — ตัวอักษรขนาดเล็กมาก (7–9px) ของหน้านี้เป็นงาน
  editorial cover เดี่ยวที่จงใจออกแบบมาแบบนั้น ไม่ใช่หน้าที่คนอ่านทีละบรรทัดแบบหน้าอื่น
  เหมือนหน้าปกนิตยสารที่ colophon เล็กกว่าเนื้อหาปกติเป็นเรื่องปกติ
- ป้ายตัวเลขเดี่ยว ๆ ("01", "SS") และ `<small>` รองที่อยู่คู่กับ label หลักที่ใหญ่กว่าอยู่แล้ว
  — การขยายจุดพวกนี้มีแนวโน้มทำให้ลำดับความสำคัญของสายตาสับสนมากกว่าช่วย

**ผลการทดสอบ**

```
Overflow sweep: 10 หน้า x 12 ขนาดจอ (320–1920px) x 2 ภาษา = 240 ชุดทดสอบ
  → พบ overflow: 0

Alignment: header/breadcrumb/เนื้อหา/footer
  → 46.1 / 32.8 / 24  เหมือนเดิมทุกจุด ไม่เปลี่ยนจาก v70

console error / HTTP 404: 0 ทุกหน้า
```

Site version bump เป็น **73** (จาก 70) สะท้อนงานสะสมตั้งแต่รอบที่แล้ว แก้ที่ไฟล์เดียว
(`assets/js/site-version.js`) ตามระบบที่วางไว้ตั้งแต่ v70

---

## 16. v74 — ปรับขนาดตัวอักษรทั้งเว็บ (ไม่ใช่แค่จุดเล็กที่สุด)

รอบ v73 แก้เฉพาะจุดที่เล็กที่สุด (≤10.5px) รอบนี้เป็นคำสั่งที่กว้างกว่านั้นมาก:
**ปรับขนาดตัวอักษรทั้งหมด** โดยคิดถึงผู้อ่านอายุ 35-45 ปี และเพิ่มความหนาในจุดที่ควรหนา

ไฟล์ใหม่ `assets/css/v74-type-scale.css` โหลดเป็นลำดับสุดท้ายทุกหน้า

### ขอบเขตและหลักการ

สำรวจทั้งเว็บ (ไม่รวมไฟล์ profile รุ่นเก่าที่เลิกใช้แล้ว — v64/v66/v67/v68 ซึ่งเป็น layout
ที่ถูกแทนที่ด้วย `--editorial` ไปแล้ว ไม่มีผลกับหน้าเว็บจริง) พบ **147 จุด** ที่ font-size
อยู่ระหว่าง 11–15.5px ปรับทั้งหมดขึ้น 1 ขั้นบนสเกล (~1.5–2px) ให้บรรจบกันเป็นสเกลเดียว
ที่ใหญ่ขึ้น ส่วนที่ 16px ขึ้นไปไม่แตะ เพราะเป็นขนาดพื้นฐานที่ WCAG แนะนำสำหรับข้อความ
อ่านสบายอยู่แล้ว และหัวข้อใหญ่ (18px+) ไม่ใช่จุดที่มีปัญหาตั้งแต่แรก

**"จุดไหนควรหนาก็หนา"** — label สั้น ๆ ที่แต่เดิมไม่มีการกำหนด font-weight เลย (เช่น
ป้าย meta, ตัวเลขปี) ได้ font-weight 500 เพิ่มเข้าไปด้วย เพราะตัวหนาคือสิ่งที่ทำให้ label
ตัวเล็กอ่านง่ายขึ้นจริง ๆ ในการกวาดสายตา — ไม่ใส่กับข้อความ paragraph เพราะการทำ
เนื้อหายาว ๆ เป็นตัวหนาจะทำให้อ่านยากขึ้นไม่ใช่ง่ายขึ้น

**ไม่แตะ:** โลโก้ไซต์ (`.wordmark` / `.landing-wordmark` — "SOMCHAI / SOMPIEW" ที่หัวเว็บ
และหน้า Landing) เพราะเป็นตราสัญลักษณ์ ไม่ใช่เนื้อหาที่ต้องอ่าน การขยายอาจทำให้สมดุลกับ
เมนูข้าง ๆ เพี้ยนไป

**เปลี่ยนจากรอบก่อน:** v73 ตั้งใจไม่แตะหน้า Landing (index.html) เพราะมองว่าเป็นหน้าปก
ที่จงใจออกแบบตัวเล็ก แต่รอบนี้คุณระบุชัดว่าต้องการ "ทั้งหมดเลย" จึงรวมหน้า Landing เข้ามา
ด้วยในรอบนี้ (ยกเว้นโลโก้ตามเหตุผลข้างต้น)

### จุดที่ต้องระวังเป็นพิเศษ — Media query

ในบรรดา 147 จุด มี **33 จุด** ที่เป็นค่าเฉพาะตอนจอแคบ (เช่น `@media (max-width: 680px)`)
ซึ่งเป็นค่าที่ตั้งใจให้เล็กกว่าปกติเมื่อจอเล็กลงอยู่แล้ว ถ้า override แบบไม่แยก media query
จะทำให้ค่าที่ควรใช้เฉพาะจอมือถือไปทับค่าจอใหญ่โดยไม่ตั้งใจ (หรือกลับกัน) จึงเขียนให้ทุก
override เฉพาะจอแคบยังอยู่ใน `@media` เดียวกับต้นฉบับ ไม่ทำให้ scale ที่ตอบสนองต่อขนาด
จอเพี้ยนไป

### ผลการทดสอบ

```
Overflow sweep: 10 หน้า x 12 ขนาดจอ (320–1920px) x 2 ภาษา = 240 ชุดทดสอบ
  → พบ overflow: 0

Alignment: header/breadcrumb/เนื้อหา/footer
  → 46.1 / 32.8 / 24  เหมือนเดิมทุกจุด ไม่เปลี่ยนจาก v70

console error / HTTP 404: 0 ทุกหน้า
brace balance ของไฟล์ CSS ใหม่: ตรวจสอบแล้วถูกต้อง (157 เปิด / 157 ปิด)
```

Site version bump เป็น **74**

---

## 17. v75 — รอบรีวิวจากเจ้าของ รอบที่ 4

ไฟล์ใหม่ `assets/css/v75-review-round-4.css` โหลดเป็นลำดับสุดท้ายทุกหน้า

### คำถามที่ขอความเห็น — แถบ "Clear enough / Distinct enough / Practical enough"

ไม่ได้แก้ไขโค้ด เพราะเป็นคำถามที่รอคำตอบ ให้ความเห็นไว้ในแชทว่าแถบนี้ไม่มีหัวข้อกำกับ
ข้อความค่อนข้างเป็น marketing-speak ทั่วไป และซ้ำซ้อนกับ hero statement ด้านบนที่พูด
เนื้อหาคล้ายกันอยู่แล้ว รอการตัดสินใจว่าจะตัดออกหรือปรับปรุง

### ชื่อโปรเจกต์ — ตัดคำท้าย
- "Quantum Display System" → **"Quantum Display"** (แก้ที่ `data/projects.js` และ hero carousel
  ในหน้า Home ที่มี attribute ชื่อโปรเจกต์ซ้ำอยู่)
- "Kioku Display System" → **"Kioku Display"**

### หมวดหมู่โปรเจกต์ — ปรับ label ให้เจาะจงขึ้น

| โปรเจกต์ | เดิม | ใหม่ |
|---|---|---|
| Open Floor | Exhibition | **Exhibition Design** |
| Make It Move | Campaign | **Campaign > License Products** + บรรทัดที่สอง **License Characters** |
| Margins & Matter | Editorial Design | **Catalogue & Print** |
| Off Grid Studies | Other Creative | **Offgrid Study > Other Design** |

**Make It Move** เป็นจุดสำคัญ — โปรเจกต์นี้คือที่ตั้งข้อสังเกตเรื่องลิขสิทธิ์ Marvel
(Captain America / Iron Man / Spider-Man) ไว้ตั้งแต่รอบตรวจสอบแรก การติด label ชัดเจนว่า
"License Products" และ "License Characters" คือการแก้ปัญหานั้นอย่างตรงประเด็น — ระบุให้
ผู้ชมรู้ทันทีว่านี่คืองานสินค้าลิขสิทธิ์ ไม่ใช่ตัวละครต้นฉบับที่ออกแบบเอง

เพิ่มฟิลด์ใหม่ `sectorNote` / `sectorNoteTh` ใน `data/projects.js` (ใช้เฉพาะโปรเจกต์ที่
ต้องการบรรทัดที่สอง ไม่กระทบโปรเจกต์อื่น) พร้อมแก้ `assets/js/app.js` ให้ render บรรทัดนี้
เมื่อมีข้อมูล และเพิ่มสไตล์ `.project-meta-note` (ตัวเอียง สีเทา เล็กกว่าบรรทัดหลัก)

### ระยะห่างหัวข้อ "One team. / Five connected stages."

**สาเหตุที่แท้จริง** (ยืนยันด้วยการวัดจริง): ตัวอักษรที่ใช้มี leading (พื้นที่ว่างในตัวฟอนต์เอง)
เยอะกว่าปกติ การตั้ง `line-height` ต่ำกว่า 1 ไม่สามารถบีบพื้นที่นี้ได้ทั้งหมด ทำให้มีช่องว่างที่
"มองไม่เห็นในโค้ด" อยู่ถึง ~80px ระหว่างสองบรรทัด ทั้งที่ margin ที่ตั้งไว้จริงมีแค่ ~4px

แก้ด้วยการดึงบรรทัดที่สองขึ้นด้วยค่า margin ติดลบที่คำนวณเป็นสัดส่วนกับขนาดตัวอักษรของ
บรรทัดนั้นเอง (ไม่ใช่ค่าคงที่) เพื่อให้ปรับตามขนาดจอได้ถูกต้อง

```
ผลวัดจริงหลังแก้:  1024px → เหลือ 18px  |  1440px → เหลือ 25px  |  1920px → เหลือ 31px
(จากเดิม 82px ที่ 1440px)
```

### รูปในหมวด Craft & Process ไม่เต็มเฟรม

**สาเหตุที่แท้จริง** (ยืนยันด้วยการวัดจริง ไม่ใช่แค่ดูตา): `.craft-row` และ `.craft-example-grid`
เป็น CSS Grid ซึ่ง**ยืดทุกช่องให้สูงเท่ากับช่องที่สูงที่สุดในแถวเดียวกันโดยอัตโนมัติ** (ค่าเริ่มต้น
ของ CSS Grid) เมื่อคอลัมน์ข้อความ (สเปกหรือคำอธิบาย) สูงกว่ารูปภาพ กรอบรูปก็ถูกยืดตามไป
ด้วย แต่ตัวรูปภาพเองยังคงสัดส่วนเดิม จึงเหลือพื้นที่ว่างด้านล่างรูป

ยืนยันด้วยการวัดพิกเซลจริงก่อนแก้: ช่องว่างมี 37–70px ในหน้า craft.html (ทั้ง 5 กระบวนการ)

แก้ด้วยการปิดพฤติกรรม "ยืดอัตโนมัติ" นี้ (`align-items: start`) ทั้งสองจุด และเพิ่ม
`aspect-ratio: 4/3` กับ `object-fit: cover` ให้ทุกรูปในหมวดนี้เป็นตัวกันสำรอง ในกรณีที่รูปใน
อนาคตมีสัดส่วนไม่ตรง 4:3 พอดี รูปจะ crop ให้เต็มกรอบแทนที่จะเหลือช่องว่างหรือมีแถบขาว

```
ผลวัดจริงหลังแก้:
  craft.html แถวรายการ (5 กระบวนการ)  → ช่องว่างเหลือ 2px (แค่เส้นขอบ) ทุกแถว
  craft-detail.html แกลเลอรีตัวอย่าง   → ส่วนต่างที่เหลือคือพื้นที่ caption จริง (48px)
                                          ไม่ใช่ช่องว่างที่อธิบายไม่ได้ (เหลือ 2px)
```

ครอบคลุมทั้ง 5 กระบวนการตามที่ขอ ("แก้ไขในหมวดนี้ทั้งหมด") ทั้งหน้ารายการรวมและหน้า
รายละเอียดแต่ละกระบวนการ

### ผลการทดสอบ

```
Overflow sweep: 10 หน้า x 12 ขนาดจอ (320–1920px) x 2 ภาษา = 240 ชุดทดสอบ
  → พบ overflow: 0

Alignment: 46.1 / 32.8 / 24  เหมือนเดิมทุกจุด
console error / HTTP 404: 0 ทุกหน้า
```

Site version bump เป็น **75**
