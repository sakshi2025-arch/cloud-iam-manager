# ☁️ CloudIAM Manager

### AWS IAM User Management Dashboard

CloudIAM Manager is a web-based application designed to simplify AWS Identity and Access Management (IAM) user management through a modern dashboard. It connects a React frontend to a FastAPI backend, which uses Boto3 to communicate with AWS IAM.

## 🚀 Features

* **Dashboard:** View IAM user statistics and backend health status.
* **Create IAM Users:** Create AWS IAM users through a web interface.
* **Permission Management:** Attach AWS managed policies for supported services.
* **Users List:** Retrieve and display real IAM users from AWS.
* **Service Badges:** Identify the AWS service associated with each user.
* **Permission Badges:** Visually distinguish Read Only and Full Access permissions.
* **Refresh Users:** Fetch the latest user list from AWS IAM.
* **API Integration:** Connect the frontend to the backend using REST APIs.

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* JavaScript

### Backend

* Python
* FastAPI
* Boto3
* Uvicorn

### Cloud

* AWS IAM
* AWS managed IAM policies

## 🏗️ Architecture

```text
React + Vite Frontend
         |
         | HTTP REST API
         v
FastAPI Backend
         |
         | Boto3
         v
      AWS IAM
         |
         v
IAM Users and Policies
```

## ⚙️ Run Locally

### Prerequisites

* Node.js and npm
* Python 3.13 or compatible version
* An AWS account
* AWS CLI configured with an IAM identity that has the required permissions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/cloud-iam-manager.git
cd cloud-iam-manager
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Start the backend

Create and activate a Python virtual environment if needed, then install the backend dependencies.

```bash
python -m venv venv
```

On Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the dependencies:

```bash
pip install fastapi uvicorn boto3
```

Configure AWS credentials securely using AWS CLI or environment variables. Never commit access keys or secret keys to GitHub.

Start the backend from the project root:

```bash
python -m uvicorn backend.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API health check:

```text
http://127.0.0.1:8000/health
```

### 3. Start the frontend

Open a second terminal in the project root:

```bash
npm install
npm run dev
```

Open the local frontend:

```text
http://localhost:5173
```

## 🔐 Security Notes

* Never publish AWS access keys, secret keys, passwords, or private credentials.
* Use an IAM identity with only the permissions required by the application.
* Avoid granting broad permissions such as full administrative access unless absolutely necessary.
* Do not expose AWS credentials in the React frontend.
* Before public deployment, configure the backend's AWS permissions and environment securely.

## ⚠️ Important

This project performs operations against a real AWS IAM account when configured with valid AWS credentials. Creating users and attaching policies changes the AWS account.

Review the permissions and potential security impact before using the application in a production environment.

## 🛣️ Future Improvements

* Deploy the frontend and backend to public hosting.
* Add user details and policy inspection.
* Add secure user deletion with confirmation.
* Improve permission management and audit logging.
* Add automated tests and deployment documentation.

## 👩‍💻 Author

**Sakshi Shivaji Chaugule**

T.Y. B.Tech Computer Science and Engineering Student

SVERI's College of Engineering, Pandharpur

---

⭐ If you find this project interesting, feel free to explore the repository.
