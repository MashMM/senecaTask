# Seneca Task

## Table of Contents

- [Assumptions](#assumptions)
- [API Endpoints](#api-endpoints)
- [Local Deployment](#how-to-run-the-stats-service-locally)
- [AWS Deployment](#how-to-build-your-own-docker-image-and-deploy-on-an-ec2-instance-using-amazon-ecr)



## Assumptions
- If a record exists for the specified userId, courseId, and sessionId, the service should update the existing stats; otherwise, it will create a new record.
- If there are no stats found, 404 is to be returned.

## API Endpoints
These endpoints allow you to use the stats service.

- [POST /courses/{courseId}](#post-coursescourseid)
- [GET /courses/{courseId}](#get-coursescourseid)
- [GET /courses/{courseId}/sessions/{sessionId}](#get-coursescourseidsessionssessionid)

### POST /courses/{courseId}
Stores study session event data, or updates it if study session already exists.
#### Request:

| Request     | In     | Type   | Description                                 |
|---------------|--------|--------|---------------------------------------------|
| `X-User-Id`   | Header | string | Identifies the user (UUID)                 |
| `courseId`    | Path   | string | Identifies the course (UUID)               |
| `sessionId`   | Body   | string | Unique identifier for the session (UUID)   |
| `totalModulesStudied`       | Body   | number | Total number of modules studied             |
| `averageScore`              | Body   | number | Average score achieved during the session   |
| `timeStudied`               | Body   | number | Total time spent studying  |

Response = 
```yaml
{ message: 'OK' }
```

### GET /courses/{courseId}
Fetches aggregated course data.

#### Request:

| Parameters     | In     | Type   | Description                                 |
|---------------|--------|--------|---------------------------------------------|
| `X-User-Id`   | Header | string | Identifies the user (UUID)                 |
| `courseId`    | Path   | string | Identifies the course (UUID)               |
| `sessionId`   | Path   | string | Identifies the study session (UUID)        |

Response = 
```yaml
{
  totalModulesStudied: number;
  averageScore: number;
  timeStudied: number;
}
```


### GET /courses/{courseId}/sessions/{sessionId}
Fetches study session data.
#### Request:

| Parameter     | In     | Type   | Description                                 |
|---------------|--------|--------|---------------------------------------------|
| `X-User-Id`   | Header | string | Identifies the user (UUID)                 |
| `courseId`    | Path   | string | Identifies the course (UUID)               |
| `sessionId`   | Path   | string | Identifies the study session (UUID)        |

Response = 
```yaml
{
  sessionId: string;
  totalModulesStudied: Number;
  averageScore: Number;
  timeStudied: Number;
}
```

## How to Run the stats Service Locally
### 1. Install Dependencies

Navigate to the root directory and install dependencies:
```bash
npm install
```

### 2. Build the Stats Service
```bash
npm run build
```

### 2. Run the Stats Service
```bash
npm run serve
```
The Stats Service will be accessible at `http://localhost/` (port 80).

### Optional: Run the Jest Test Cases
```bash
npm test
```

## How to Build Your Own Docker Image and Deploy on an EC2 Instance Using Amazon ECR

### Example of deployment:
[Click here to view my deployment on an EC2 Instance](http://13.60.232.213/)

### Prerequisites
- Ensure you have an AWS account and have launched an Amazon EC2 instance.
- Ensure you have created an ECR repository.

### 1. Build Docker Image
Navigate to the directory containing your Dockerfile and run the following command to build your Docker image:
```bash
docker build -t your-image-name .
```

### 2. Install Docker on Your EC2 Instance
Connect to your EC2 instance via SSH and run the following commands to install Docker:
```bash
sudo yum update -y  # Update the package index
sudo amazon-linux-extras install docker -y  # Install Docker
sudo service docker start  # Start the Docker service
sudo usermod -aG docker ec2-user  # Add your user to the Docker group
```

### 3. Authenticate Docker to Your ECR
Run the following command to authenticate Docker to your ECR registry:
```bash
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
```
Replace your-region with the AWS region where your ECR repository is located and your-account-id with your AWS account ID.

### 4. Tag Your Docker Image for ECR
Tag your Docker image to match your ECR repository name:
```bash
docker tag your-image-name:latest your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

### 5. Push Your Docker Image to ECR
Push your tagged Docker image to your ECR repository:
``` bash
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

### 6. Pull Your Docker Image on EC2
Once your image is pushed to ECR, connect to your EC2 instance and run the authentication command again to authenticate with ECR. Then pull your image:
``` bash
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
docker pull your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

### 7. Run Your Docker Image on EC2
Run the Docker image you pulled, mapping the appropriate ports. If your application runs on port 3000 inside the container, you can map it to port 80 on the EC2 instance:
``` bash
docker run -p 80:80 your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

### 8. Configure Security Groups
Ensure that your EC2 instance's security group allows inbound traffic on port 80. You can do this in the AWS Management Console:

Go to the EC2 Dashboard.
Click on Instances, and select your instance.
Click on the Security tab, and then Security Groups.
Select the appropriate security group and click on Edit inbound rules.
Add a rule to allow HTTP traffic (port 80) from anywhere (0.0.0.0/0).

### 9. Access Your Application
Your application should now be accessible via the public IP address of your EC2 instance. Open a web browser and go to:
``` vbnet
http://<EC2-public-ip>
```

