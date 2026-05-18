# Deployment Guide

This guide covers deploying the Employee Hub application to production environments.

## Prerequisites for Production

- MongoDB Atlas account (or self-hosted MongoDB)
- Git repository (GitHub, GitLab, etc.)
- Deployment platform account (Heroku, Railway, Render, etc.)

---

## 1. Database Setup - MongoDB Atlas

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Create a new project
4. Create a cluster (free tier available)
5. Create a database user with username and password
6. Whitelist your IP address or use 0.0.0.0/0

### Step 2: Get Connection String

1. Click "Connect" button
2. Choose "Connect your application"
3. Select "Node.js" driver
4. Copy the connection string

Connection string format:

```
mongodb+srv://username:password@cluster.mongodb.net/employeehub?retryWrites=true&w=majority
```

---

## 2. Backend Deployment - Heroku

### Prerequisites

- Install Heroku CLI
- GitHub repository with your code

### Step 1: Initialize Git Repository

```bash
cd EmployeeHub/server
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Create Heroku App

```bash
heroku login
heroku create your-app-name
```

### Step 3: Set Environment Variables

```bash
heroku config:set PORT=5000
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employeehub
heroku config:set NODE_ENV=production
```

### Step 4: Deploy

```bash
git push heroku main
# or
git push heroku master
```

### Step 5: Check Logs

```bash
heroku logs --tail
```

Your backend will be available at: `https://your-app-name.herokuapp.com`

---

## 3. Frontend Deployment - Vercel

### Step 1: Setup

```bash
npm install -g vercel
cd client
```

### Step 2: Create Vercel Project

```bash
vercel
```

### Step 3: Configure Environment Variables

Create `.env.production` in client directory:

```
REACT_APP_API_URL=https://your-backend-app.herokuapp.com/api
```

### Step 4: Update package.json

In `client/package.json`, update the proxy to production URL:

```json
{
  "proxy": "https://your-backend-app.herokuapp.com"
}
```

### Step 5: Build and Deploy

```bash
vercel --prod
```

Your frontend will be available at Vercel's provided URL.

---

## 4. Frontend Deployment - Netlify

### Alternative to Vercel

```bash
npm install -g netlify-cli
cd client
netlify deploy --prod --dir=build
```

---

## 5. Complete Deployment - Railway

### Simpler All-in-One Solution

1. Create account at https://railway.app
2. Connect GitHub repository
3. Create two services: Backend and Frontend
4. Add environment variables for each
5. Deploy with one click

---

## 6. Docker Deployment

### Create Docker Files

**Dockerfile for Backend:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**Dockerfile for Frontend:**

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
docker build -t employeehub-server -f server/Dockerfile ./server
docker build -t employeehub-client -f client/Dockerfile ./client

docker run -p 5000:5000 employeehub-server
docker run -p 3000:80 employeehub-client
```

---

## 7. Environment Variables for Production

### Backend `.env` (Production)

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employeehub
NODE_ENV=production
```

### Frontend Environment Variables

In deployment platform dashboard, add:

```
REACT_APP_API_URL=https://your-backend-url/api
```

---

## 8. Pre-Deployment Checklist

### Backend

- [ ] .env file not committed to git
- [ ] Error handling implemented
- [ ] CORS configured for your domain
- [ ] Database backups configured
- [ ] API rate limiting considered
- [ ] HTTPS enabled

### Frontend

- [ ] Build test: `npm run build`
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] API URL correctly set
- [ ] Responsive design tested
- [ ] Performance optimized

---

## 9. Post-Deployment

### Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor database usage
- Set up uptime monitoring (UptimeRobot)
- Monitor API response times

### Backup Strategy

- Enable MongoDB automated backups
- Regular database snapshots
- Version control backup

### Update Process

1. Test locally
2. Push to repository
3. Staging deployment (if available)
4. Production deployment
5. Monitor for errors

---

## 10. Common Issues & Solutions

### CORS Errors

**Problem:** Frontend can't reach backend

**Solution:** Update CORS in backend

```javascript
app.use(
  cors({
    origin: "https://your-frontend-url.com",
    credentials: true,
  }),
);
```

### Database Connection Issues

**Problem:** Can't connect to MongoDB Atlas

**Solution:**

- Verify connection string
- Check IP whitelist
- Test connection with MongoDB Compass
- Check firewall settings

### Slow Performance

**Problem:** App is running slow

**Solution:**

- Enable database indexing
- Optimize database queries
- Use CDN for static files
- Enable gzip compression

### Memory Issues

**Problem:** Backend crashes unexpectedly

**Solution:**

- Increase dyno size (Heroku)
- Profile memory usage
- Check for memory leaks
- Optimize large queries

---

## 11. Scaling for Growth

### As User Base Grows

1. **Database**
   - Upgrade MongoDB tier
   - Enable sharding
   - Optimize indexes

2. **Backend**
   - Horizontal scaling (multiple instances)
   - Load balancing
   - Caching (Redis)

3. **Frontend**
   - CDN distribution
   - Asset optimization
   - Lazy loading

4. **Monitoring**
   - Detailed logging
   - Performance metrics
   - Error tracking

---

## 12. Security Best Practices

- [ ] Use HTTPS/TLS everywhere
- [ ] Implement JWT authentication
- [ ] Validate all inputs (already done)
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] SQL injection prevention (Mongoose handles)
- [ ] Rate limiting
- [ ] CORS properly configured
- [ ] HTTPS redirects
- [ ] Security headers (helmet.js)

---

## Deployment Summary

| Platform          | Difficulty | Cost               | Setup Time |
| ----------------- | ---------- | ------------------ | ---------- |
| Heroku (Backend)  | Easy       | $7-50/mo           | 5 min      |
| Vercel (Frontend) | Easy       | Free-$20/mo        | 5 min      |
| Railway           | Easy       | Free-$5/mo         | 10 min     |
| AWS/Azure         | Hard       | Varies             | 1-2 hrs    |
| Docker            | Medium     | Platform dependent | 30 min     |

**Recommended for Beginners:** Heroku + Vercel or Railway

---

## Need Help?

- Heroku Docs: https://devcenter.heroku.com
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Docker: https://docs.docker.com
