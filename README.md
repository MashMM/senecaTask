# Seneca Task
This readme file contains Assumptions, API Documentation, Installation Guide and a Deployment Guide.
## Assumptions
- If a record exists for the specified userId, courseId, and sessionId, the service should update the existing stats; otherwise, it will create a new record.

## API Endpoints
These endpoints allow you to use the stats service.

- [POST /courses/{courseId}](#post-coursescourseid)
- [GET /courses/{courseId}](#get-coursescourseid)
- [GET /courses/{courseId}/sessions/{sessionId}](#get-coursescourseidsessionssessionid)

### POST /courses/{courseId}
Stores study session event data, or updates it if study session already exists.
#### Request:

| Request Parameters     | In     | Type   | Description                                 |
|---------------|--------|--------|---------------------------------------------|
| `X-User-Id`   | Header | string | Identifies the user (UUID)                 |
| `courseId`    | Path   | string | Identifies the course (UUID)               |
| `sessionId`   | Body   | string | Unique identifier for the session (UUID)   |
| `totalModulesStudied`       | Body   | number | Total number of modules studied             |
| `averageScore`              | Body   | number | Average score achieved during the session   |
| `timeStudied`               | Body   | number | Total time spent studying  |


### GET /courses/{courseId}
Fetches aggregated course data.

#### Request:

| Parameters     | In     | Type   | Description                                 |
|---------------|--------|--------|---------------------------------------------|
| `X-User-Id`   | Header | string | Identifies the user (UUID)                 |
| `courseId`    | Path   | string | Identifies the course (UUID)               |
| `sessionId`   | Path   | string | Identifies the study session (UUID)        |


### GET /courses/{courseId}/sessions/{sessionId}
Fetches study session data.
#### Request:

| Parameter     | In     | Type   | Description                                 |
|---------------|--------|--------|---------------------------------------------|
| `X-User-Id`   | Header | string | Identifies the user (UUID)                 |
| `courseId`    | Path   | string | Identifies the course (UUID)               |
| `sessionId`   | Path   | string | Identifies the study session (UUID)        |


## How to Run the Start Service Locally
### 1. Install Dependencies

Navigate to the root directory and install dependencies:

```bash
npm install
```

### 2. Run the Stat Service

```bash
npm run build
```
The Stat Service will be accessible at `http://localhost:3000`.

### Optional: Run the Jest Test Cases

```bash
npm test
```

## How to Deploy the Stats Service on an EC2 Instance

### Example of deployment:
[http://13.60.232.213:3000/](http://13.60.232.213:3000/)

###  1. Ensure Docker is Installed

Before proceeding, make sure Docker is installed on an Amazon EC2 instance. 

### 2. Pull the Docker Image

```bash
docker pull mashmm/seneca-task:latest
```

### 3. Run the Docker Image

```bash
docker run -p 80:3000 mashmm/seneca-task:latest
```
The Stat Service will be accessible at `http://<EC2-public-ip>`. Ensure that inbound connections are permitted on port 80 in your security group settings.
