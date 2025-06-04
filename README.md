## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/dhanuja-ranshaka/technical-assessment-nextjs.git
cd technical-assessment-nextjs
```

### 2. Set Up Environment Variables

```
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379 OR REDIS_URL=redis://redis:6379
SECURE_WORD_EXPIRY_SECONDS=60
SECURE_WORD_REQUEST_GAP_SECONDS=10
MFA_MAX_ATTEMPTS=3
```

### 3. Run the project
Make sure Docker and Docker compose is installed on your machine

Run:
```
docker-compose up --build
```


Mock user details:
```
username: john
password: 123
```

For the MFA code, please check the server logs.
```
ex: [DEBUG] MFA Code for john: 230010
```
