# โครงสร้างการอัปโหลดภาพ Gallery

ทุกโปรเจกต์รองรับภาพตั้งแต่ `gallery-01-1440x1080.webp` ถึง `gallery-10-1200x1500.webp` แล้ว

ตัวอย่าง:

```text
assets/images/projects/display-retail/open-shelf/
├── cover-1200x900.webp
├── gallery-01-1440x1080.webp
├── gallery-02-1100x825.webp
├── gallery-03-1100x825.webp
├── gallery-04-1400x1100.webp
├── gallery-05-1400x1100.webp
├── gallery-06-1400x1100.webp
├── gallery-07-1600x900.webp
├── gallery-08-1600x900.webp
├── gallery-09-1400x1100.webp
└── gallery-10-1200x1500.webp
```

ลำดับการจัดวางมาตรฐาน:

1. `gallery-01-1440x1080.webp` — Hero 16:9
2. `gallery-02-1100x825.webp` — Half
3. `gallery-03-1100x825.webp` — Half
4. `gallery-04-1400x1100.webp` — Medium
5. `gallery-05-1400x1100.webp` — Third
6. `gallery-06-1400x1100.webp` — Third
7. `gallery-07-1600x900.webp` — Third
8. `gallery-08-1600x900.webp` — Wide
9. `gallery-09-1400x1100.webp` — Half
10. `gallery-10-1200x1500.webp` — Half / Portrait

ภาพที่ยังไม่ได้อัปโหลดจะถูกข้ามอัตโนมัติ จึงไม่แสดงไอคอนภาพเสียและไม่ทำให้ Layout พัง

ใช้ชื่อไฟล์และนามสกุล `.webp` ตามนี้โดยตรง เพื่อให้อัปโหลดแทนที่ได้โดยไม่ต้องแก้โค้ด
