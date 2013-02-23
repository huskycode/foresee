1. ต้อง sign in Travis ด้วย account github
2. เพิ่มไฟล์ .travis.yml เข้าไปใน repository (ไว้ใน root project) ดูด้านล่าง
3. commit & push ขึ้น github
4. setup service hook
    1. ไปที่ repository
    2. ไปที่ tab Settings
    3. เลือก Service Hooks
    4. กดเลือก Travis จากรายการ แล้ว scroll กลับขึ้นไปด้านบน
    5. Enable repository ในหน้า https://travis-ci.org/profile
    6. ใส่ Token โดยเข้าที่ https://travis-ci.org/profile เลือก tab Profile
    7. เลือก Active
    8. กด Update settings

Travis.yml:

    language: node_js
    node_js: # node version support
        - 0.8
    script: "npm test"
    notifications:
        email:
        recipients:
            - email@email.com
    on_success: never 
    on_failure: always # default: always

by @winggyplus
