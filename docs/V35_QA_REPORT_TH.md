# V35 QA Summary

ตรวจและแก้ไขรอบ Production Repair แล้ว:

- แก้หน้า Category ให้มี JavaScript และ Header ที่ตรงกับระบบปัจจุบัน
- Gallery ของทั้ง 6 โปรเจกต์อ้างอิงไฟล์จริงครบโปรเจกต์ละ 10 ภาพ
- ลบระบบสร้างชื่อ Gallery fallback แบบเก่าที่ทำให้ path ผิด
- แก้ responsive ของ Entrance, Home, Approach, Project และ Category สำหรับ Desktop / Tablet / Mobile
- Tablet breakpoint ครอบคลุมหน้าจอแนวตั้งถึง 1100px
- Approach card: Hover/Focus/Click เป็นเทาเข้มและอักษรขาว พร้อม animation เดิม
- แก้ selector ที่พิมพ์ผิดจากรอบ v34
- เพิ่มการป้องกันการลาก/คลิกขวาให้ Hero Carousel และ Category images
- อัปเดต Build และ cache-bust เป็น v35
