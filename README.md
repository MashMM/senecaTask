# Seneca Task


### Example of deployment:
[Click here to view my deployment on an EC2 Instance](http://13.60.232.213/)

## Table of Contents

- [Assumptions](#assumptions)
- [API Endpoints](#api-endpoints)
- [Local Deployment](#how-to-run-the-stats-service-locally)
- [Build Docker Image & Push to ECR](#build-docker-image-and-push-to-ecr)
- [Deployment on E2 via CloudFormation](#deployment-on-e2-via-cloudformation)
- [Deploment on E2 via SSH](#deployment-on-e2-via-ssh)


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

## Build Docker Image and Push to ECR

### Prerequisites
- Ensure yo have installed Docker.
- Ensure you have an AWS account.
- Ensure you have created an ECR repository.

### 1. Build Docker Image
Navigate to the directory containing your Dockerfile and run the following command to build your Docker image:
```bash
docker build -t your-image-name .
```

### 2. Authenticate Docker to Your ECR
Run the following command to authenticate Docker to your ECR registry:
```bash
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
```
Replace your-region with the AWS region where your ECR repository is located and your-account-id with your AWS account ID.

### 3. Tag Your Docker Image for ECR
Tag your Docker image to match your ECR repository name:
```bash
docker tag your-image-name:latest your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

### 4. Push Your Docker Image to ECR
Push your tagged Docker image to your ECR repository:
``` bash
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

## Deployment on E2 via CloudFormation

### Prerequisites
- Ensure you have your docker image in ECR.

### 1. Create CloudFormation Stack
Navigate to the root directory containing the ec2-docker.yaml and run the following command to set up your EC2 instance and deploy the Docker image from ECR.

- **`<your-ecr-repo-uri>`**: The URI of your Amazon ECR repository.
- **`<your-vpc-id>`**: The ID of the VPC where you want to launch the EC2 instance, allowing access to the API.


Linux
``` bash
aws cloudformation create-stack --stack-name senecaTask \
    --template-body file://ec2-docker.yaml \
    --parameters ParameterKey=RepositoryUri,ParameterValue=<your-ecr-repo-uri> \
                 ParameterKey=VpcId,ParameterValue=<your-vpc-id> \
    --capabilities CAPABILITY_IAM \
&& aws cloudformation wait stack-create-complete --stack-name senecaTask \
&& aws cloudformation describe-stacks --stack-name senecaTask --query "Stacks[0].Outputs"
```

Windows
``` cmd
aws cloudformation create-stack --stack-name senecaTask `
    --template-body file://ec2-docker.yaml `
    --parameters ParameterKey=RepositoryUri,ParameterValue=<your-ecr-repo-uri> `
                 ParameterKey=VpcId,ParameterValue=<your-vpc-id> `
    --capabilities CAPABILITY_IAM; `
aws cloudformation wait stack-create-complete --stack-name senecaTask; `
aws cloudformation describe-stacks --stack-name senecaTask --query "Stacks[0].Outputs"
```
This may take some time so please wait for it to finish.
You can also view the stack on the AWS Management Console.

### 2. Access Your API

Once the stack creation process is complete, the public IP address of your EC2 instance will be displayed in the terminal output.
``` vbnet
http://<EC2-public-ip>
```

### Creating/Viewing CloudFormation Stack on the AWS Management Console.
You can also create/view the stack by searching for CloudFormation on the AWS Management Console.  
To create the stack on the AWS Management Console, upload the template file `ec2-docker.yaml`.  
Once the stack has been created, the public IP address of the EC2 instance will be displayed in "Outputs".

## Deployment on E2 via SSH

### Prerequisites
- Ensure you have created an EC2 Instance.
- Ensure you have your docker image in ECR.

### 1. Install Docker on Your EC2 Instance
Connect to your EC2 instance via SSH and run the following commands to install Docker:
```bash
sudo yum update -y  # Update the package index
sudo amazon-linux-extras install docker -y  # Install Docker
sudo service docker start  # Start the Docker service
sudo usermod -aG docker ec2-user  # Add your user to the Docker group
```

### 2. Pull Your Docker Image on EC2
Once your image is pushed to ECR, connect to your EC2 instance and run the authentication command again to authenticate with ECR. Then pull your image:
``` bash
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
docker pull your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

### 3. Run Your Docker Image on EC2
Run the Docker image you pulled, mapping the appropriate ports. If your application runs on port 3000 inside the container, you can map it to port 80 on the EC2 instance:
``` bash
docker run -p 80:80 your-account-id.dkr.ecr.your-region.amazonaws.com/your-repository-name:latest
```

### 4. Configure Security Groups
Ensure that your EC2 instance's security group allows inbound traffic on port 80. You can do this in the AWS Management Console:

Go to the EC2 Dashboard.
Click on Instances, and select your instance.
Click on the Security tab, and then Security Groups.
Select the appropriate security group and click on Edit inbound rules.
Add a rule to allow HTTP traffic (port 80) from anywhere (0.0.0.0/0).

### 5. Access Your API
Your API should now be accessible via the public IP address of your EC2 instance. Open a web browser and go to:
``` vbnet
http://<EC2-public-ip>
```

