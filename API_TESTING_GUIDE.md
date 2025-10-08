# Craft Mosul API - Complete cURL Testing Guide

## 🔐 Authentication Flow (Start Here)

### 🚀 FIRST: Create Admin User (Public endpoint)

### 0. Create Admin User (rheem/rheem123)
```bash
curl -X POST http://localhost:3000/auth/seed-admin \
  -H "Content-Type: application/json"
```

### 1. Login as Admin (EMAIL & PASSWORD)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rheem@admin.com",
    "password": "rheem123"
  }'
```

### Alternative: Login as Admin (PHONE & PASSWORD)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "07700000000",
    "password": "rheem123"
  }'
```

### 🏢 Create Basic Data (With Admin Token)

### 2. Create Neighborhood (Use admin token)
```bash
curl -X POST http://localhost:3000/neighborhoods \
  -H "Content-Type: application/json" \
  -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInBob25lIjoiMDc3MDAwMDAwMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTk5NDg5MDAsImV4cCI6MTc2MDU1MzcwMH0.n-QHAau9pkIJxXeZcEFmiWz5aIMCbcqilKHKMvMfClM" \
  -d '{
    "name": "الكرامة",
    "area": "الساحل الأيمن" 
  }'
```

### 3. Create Profession (Use admin token)
```bash
curl -X POST http://localhost:3000/professions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE" \
  -d '{
    "name": "كهربائي",
    "description": "إصلاح وصيانة الأجهزة الكهربائية"
  }'
```

### 4. Register a Client User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "password": "password123",
    "phone": "07901234567",
    "role": "client",
    "neighborhood_id": 1
  }'
```

### 5. Register a Worker User (Include profession_id for worker)
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mohammed Hassan",
    "email": "mohammed@example.com",
    "password": "password123",
    "phone": "07901234568",
    "role": "worker",
    "neighborhood_id": 1,
    "profession_id": 1,
    "bio": "كهربائي محترف مع خبرة 5 سنوات",
    "experience_years": 5
  }'
```

### 6. Login as Client (EMAIL & PASSWORD)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

### 7. Login as Worker (EMAIL & PASSWORD)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mohammed@example.com",
    "password": "password123"
  }'
```

### 8. Get User Profile (Use client token)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE"
```

---

## 🏢 Neighborhoods & Professions (Setup Data)

### 6. Create Neighborhood (Admin only - for testing, use any token)
```bash
curl -X POST http://localhost:3000/neighborhoods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "الكرامة",
    "area": "الأيمن"
  }'
```

### 7. Get All Neighborhoods
```bash
curl -X GET http://localhost:3000/neighborhoods
```

### 8. Create Profession (Admin only)
```bash
curl -X POST http://localhost:3000/professions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "كهربائي",
    "description": "إصلاح وصيانة الأجهزة الكهربائية"
  }'
```

### 9. Get All Professions
```bash
curl -X GET http://localhost:3000/professions
```

---

## 👷 Workers Management

### 10. Create Worker Profile (Use worker token)
```bash
curl -X POST http://localhost:3000/workers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WORKER_TOKEN_HERE" \
  -d '{
    "user_id": 2,
    "profession_id": 1,
    "bio": "كهربائي محترف مع خبرة 5 سنوات",
    "experience_years": 5,
    "contact_phone": "07901234568",
    "whatsapp_number": "07901234568"
  }'
```

### 11. Upload Worker Profile Image (Use worker token)
```bash
curl -X POST http://localhost:3000/workers/1/upload-profile-image \
  -H "Authorization: Bearer YOUR_WORKER_TOKEN_HERE" \
  -F "image=@/path/to/your/image.jpg"
```

### 12. Get All Workers (No filters)
```bash
curl -X GET http://localhost:3000/workers
```

### 13. Get Workers with Filters (Test the advanced filtering)
```bash
curl -X GET "http://localhost:3000/workers?profession_id=1&area=الأيمن&min_rating=0&sort=recent&order=DESC&page=1&limit=5"
```

### 14. Get Workers with Search
```bash
curl -X GET "http://localhost:3000/workers?search=كهربائي&sort=rating&order=DESC"
```

### 15. Get Single Worker
```bash
curl -X GET http://localhost:3000/workers/1
```

---

## 📋 Requests Lifecycle

### 16. Create Service Request (Use client token)
```bash
curl -X POST http://localhost:3000/requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE" \
  -d '{
    "worker_id": 1,
    "problem_description": "مشكلة في الكهرباء بالمطبخ"
  }'
```

### 17. Get All Requests
```bash
curl -X GET http://localhost:3000/requests
```

### 18. Get Request by ID
```bash
curl -X GET http://localhost:3000/requests/1
```

### 19. Worker Accepts Request (Use worker token)
```bash
curl -X PATCH http://localhost:3000/requests/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WORKER_TOKEN_HERE" \
  -d '{
    "status": "accepted"
  }'
```

### 20. Worker Rejects Request (Use worker token)
```bash
curl -X PATCH http://localhost:3000/requests/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WORKER_TOKEN_HERE" \
  -d '{
    "status": "rejected",
    "rejected_reason": "غير متوفر في الوقت المحدد"
  }'
```

### 21. Worker Completes Request (Use worker token)
```bash
curl -X PATCH http://localhost:3000/requests/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WORKER_TOKEN_HERE" \
  -d '{
    "status": "completed"
  }'
```

### 22. Client Cancels Request (Use client token)
```bash
curl -X PATCH http://localhost:3000/requests/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE" \
  -d '{
    "status": "cancelled"
  }'
```

---

## ⭐ Reviews System

### 23. Create Review (Only after request is completed - Use client token)
```bash
curl -X POST http://localhost:3000/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE" \
  -d '{
    "request_id": 1,
    "rating": 5,
    "comment": "عمل ممتاز وسريع"
  }'
```

### 24. Get All Reviews
```bash
curl -X GET http://localhost:3000/reviews
```

### 25. Get Reviews by Worker ID
```bash
curl -X GET http://localhost:3000/reviews/worker/1
```

### 26. Update Review (Use client token who created it)
```bash
curl -X PATCH http://localhost:3000/reviews/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE" \
  -d '{
    "rating": 4,
    "comment": "عمل جيد"
  }'
```

---

## ❤️ Favorites System

### 27. Add Worker to Favorites (Use client token)
```bash
curl -X POST http://localhost:3000/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE" \
  -d '{
    "worker_id": 1
  }'
```

### 28. Add Same Worker Again (Test idempotency)
```bash
curl -X POST http://localhost:3000/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE" \
  -d '{
    "worker_id": 1
  }'
```

### 29. Get Client's Favorites
```bash
curl -X GET http://localhost:3000/favorites/client/1 \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE"
```

### 30. Remove from Favorites
```bash
curl -X DELETE http://localhost:3000/favorites/client/1/worker/1 \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE"
```

---

## 🖼️ Worker Portfolio

### 31. Upload Portfolio Image (Use worker token)
```bash
curl -X POST http://localhost:3000/worker-portfolio/upload-with-image \
  -H "Authorization: Bearer YOUR_WORKER_TOKEN_HERE" \
  -F "image=@/path/to/portfolio/image.jpg" \
  -F "worker_id=1" \
  -F "title=عمل سابق" \
  -F "description=مشروع كهرباء منزلي"
```

### 32. Get Worker's Portfolio
```bash
curl -X GET http://localhost:3000/worker-portfolio/worker/1
```

---

## 🔧 Testing Error Cases

### 33. Test Invalid Status Transition
```bash
curl -X PATCH http://localhost:3000/requests/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WORKER_TOKEN_HERE" \
  -d '{
    "status": "completed"
  }'
```

### 34. Test Review Without Completed Request
```bash
curl -X POST http://localhost:3000/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLIENT_TOKEN_HERE" \
  -d '{
    "request_id": 2,
    "rating": 5,
    "comment": "تقييم لطلب غير مكتمل"
  }'
```

### 35. Test Unauthorized Access
```bash
curl -X POST http://localhost:3000/workers \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "profession_id": 1
  }'
```

---

## 📊 Advanced Filtering Tests

### 36. Test Pagination
```bash
curl -X GET "http://localhost:3000/workers?page=1&limit=2"
```

### 37. Test Multiple Filters
```bash
curl -X GET "http://localhost:3000/workers?profession_id=1&is_available=true&min_rating=4&sort=experience&order=DESC"
```

### 38. Test Search with Special Characters
```bash
curl -X GET "http://localhost:3000/workers?search=محمد"
```

---

## 💡 Tips for Testing:

1. **Save Tokens**: After login, save the JWT tokens to use in subsequent requests
2. **Replace IDs**: Update user_id, worker_id, request_id based on your actual data
3. **File Paths**: Update image file paths to actual files on your system
4. **Order Matters**: Some tests depend on previous data (e.g., reviews need completed requests)
5. **Check Responses**: Each request will return data that you can use in subsequent tests

## 🔍 Expected Response Formats:

- **Success**: Status 200/201 with data
- **Validation Error**: Status 400 with error details
- **Unauthorized**: Status 401 for missing/invalid tokens
- **Forbidden**: Status 403 for insufficient permissions
- **Not Found**: Status 404 for missing resources