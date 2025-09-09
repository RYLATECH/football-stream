# تلویزیون زنده پرسپولیس

این پروژه یک تلویزیون اینترنتی برای پخش زنده بازی‌های پرسپولیس است که با FastAPI بک‌اند و React فرانت ساخته شده و از OBS و RTMP/Nginx برای استریم زنده استفاده می‌کند.

## قابلیت‌ها
- ایجاد لینک RTMP و HLS برای هر پخش زنده
- نمایش ویدیو و صدا (شامل صدای هواداران)
- پنل ساده مدیریت استریم
- آماده برای افزودن هوش مصنوعی برای تشخیص گل، خطا، آفساید و ...

## نصب و اجرا

### 1. کانفیگ Nginx + RTMP
- نصب Nginx با RTMP module
- قرار دادن فایل `nginx.conf` در مسیر مناسب
- اجرای Nginx

### 2. بک‌اند
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. فرانت
```bash
cd frontend
npm install
npm start
```

### 4. OBS
- استریم به RTMP server: `rtmp://your-server/live/{stream_key}`
- کلید استریم: همان که بک‌اند ایجاد می‌کند