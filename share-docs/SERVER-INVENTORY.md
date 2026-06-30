# Server Inventory - Telegram Bot Deployment

## 1. Thông tin hệ thống

| Thuộc tính          | Giá trị              |
| :-------------------| :------------------- |
| **Hệ điều hành**    | Ubuntu 24.04.4 LTS   |
| **Kernel**          | 6.8.0-106-generic    |
| **Kiến trúc**       | x86_64               |
| **Số CPU**          | 6 cores              |
| **Tổng RAM**        | 11Gi                 |
| **Docker Root Dir** | Dir:                 |
| **Hostname**        | vmi3391939           |

## 2. Docker Status

### 2.1. Phiên bản

- **Docker Engine:**: 29.6.1
- **Docker Compose:**: v5.2.0

### 2.2. Container đang chạy

| Tên Container | Image | Status | Ports | Network |
| :---------------- | :------------------------- | :---------------- | :------------------------- | :-------------- |
| **router**        | decolua/9router:latest     | Up 43 hours       | 127.0.0.1:20128->20128/tcp | ai-stack_ai-net |
| **crawl-service** | ai-stack-crawl-service     | Up 44 hours       | 127.0.0.1:3100->3000/tcp   | ai-stack_ai-net |
| **lightpanda**    | lightpanda/browser:nightly | Up 44 hours       | 9222/tcp                   | ai-stack_ai-net |
| **redis**         | redis:7-alpine             | Up 45 hours       | 6379/tcp                   | ai-stack_ai-net |
| **qdrant**        | qdrant/qdrant:latest       | Up 45 hours       | 6333-6334/tcp              | ai-stack_ai-net |
| **mongodb**       | mongo:7                    | Up 45 hours       | 27017/tcp                  | ai-stack_ai-net |

### 2.3. Docker network

| Tên Network | Driver |
| :------------------ | :----- |
| **ai-stack_ai-net** | bridge |
| **bridge**          | bridge |
| **host**            | host   |
| **none**            | null   |

## 3. Project hiện tại

### 3.1. AI Stack Project
- **Đường dẫn:** `/root/vps-phase1/ai-stack/`
- **File cấu hình:** `/root/vps-phase1/ai-stack/docker-compose.yml`
- **Các service chính:**
  - **router:** Cổng kết nối AI (Port 20128)
  - **crawl-service:** Service crawl dữ liệu (Port 3100)
  - **redis:** Cache và queue (Port 6379)
  - **mongodb:** Database NoSQL (Port 27017)

### 3.2. User
- **User hiện tại:**: root
- **User khác:**: `vuonghieu` (UID: 1000, GID: 1000)
  - Groups: `vuonghieu`, `sudo`, `users`  

## 4. TÀI NGUYÊN VÀ PORT

### 4.1. Port đang được sử dụng

| Port                  | Service                                                   | Trạng thái | Ghi chú              |
| :-------------------- | :-------------------------------------------------------- | :--------- | :------------------- |
| **127.0.0.53%lo:53**  | users:(("systemd-resolve",pid=10894,fd=15))               | Đang dùng  | 
| **127.0.0.54:53**     | users:(("systemd-resolve",pid=10894,fd=17))               | Đang dùng  | 
| **127.0.0.1:20128**   | users:(("docker-proxy",pid=46456,fd=8))                   | Đang dùng  | 
| **127.0.0.1:3100**    | users:(("docker-proxy",pid=45591,fd=8))                   | Đang dùng  | 
| **0.0.0.0:22**        | users:(("sshd",pid=20018,fd=3),("systemd",pid=1,fd=121))  | Đang dùng  | 
| **[::]:22**           | users:(("sshd",pid=20018,fd=4),("systemd",pid=1,fd=122))  | Đang dùng  |   

