# API Testing Commands

## Test the new Users API endpoint

### Get all users (page 1)
curl http://localhost:4000/api/users

### Get users with pagination
curl "http://localhost:4000/api/users?page=1&limit=10"

### Get specific user
curl http://localhost:4000/api/user/johndoe2025

### Get leaderboard
curl http://localhost:4000/api/leaderboard

### Create new user (POST)
curl -X POST http://localhost:4000/api/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'

### Add donation to user
curl -X PUT http://localhost:4000/api/user/johndoe2025/donate \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}'

## Expected Response Format for /api/users:
```json
{
  "users": [
    {
      "name": "John Doe",
      "referralCode": "johndoe2025",
      "totalDonations": 1234,
      "email": "john@example.com",
      "createdAt": "2025-01-20T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalUsers": 6,
    "hasNext": false,
    "hasPrev": false
  }
}
```
