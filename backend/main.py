from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
from botocore.exceptions import ClientError


app = FastAPI(
    title="CloudIAM Backend",
    description="Backend API for AWS IAM User Management",
    version="1.0.0"
)


# --------------------------------
# Allow React frontend
# --------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------
# User Request Model
# --------------------------------
class UserCreate(BaseModel):
    username: str
    service: str
    permission: str


# --------------------------------
# AWS IAM Policy Mapping
# --------------------------------
POLICIES = {
    "IAM": {
        "Read Only": "arn:aws:iam::aws:policy/IAMReadOnlyAccess",
        "Full Access": "arn:aws:iam::aws:policy/IAMFullAccess",
    },

    "EC2": {
        "Read Only": "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess",
        "Full Access": "arn:aws:iam::aws:policy/AmazonEC2FullAccess",
    },

    "S3": {
        "Read Only": "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
        "Full Access": "arn:aws:iam::aws:policy/AmazonS3FullAccess",
    },

    "Lambda": {
        "Read Only": "arn:aws:iam::aws:policy/AWSLambda_ReadOnlyAccess",
        "Full Access": "arn:aws:iam::aws:policy/AWSLambda_FullAccess",
    },

    "CloudWatch": {
        "Read Only": "arn:aws:iam::aws:policy/CloudWatchReadOnlyAccess",
        "Full Access": "arn:aws:iam::aws:policy/CloudWatchFullAccessV2",
    },
}


# --------------------------------
# Home API
# --------------------------------
@app.get("/")
def home():
    return {
        "message": "CloudIAM Backend is running successfully!"
    }


# --------------------------------
# Health Check
# --------------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# --------------------------------
# AWS Connection Test
# --------------------------------
@app.get("/aws-test")
def aws_test():

    sts = boto3.client("sts")

    response = sts.get_caller_identity()

    return {
        "message": "AWS connection successful!",
        "arn": response["Arn"]
    }


# --------------------------------
# Create Real AWS IAM User
# --------------------------------
@app.post("/users")
def create_user(user: UserCreate):

    # Check service
    if user.service not in POLICIES:
        return {
            "success": False,
            "message": f"Unsupported AWS service: {user.service}"
        }

    # Check permission
    if user.permission not in POLICIES[user.service]:
        return {
            "success": False,
            "message": f"Unsupported permission: {user.permission}"
        }

    # Get correct AWS policy ARN
    policy_arn = POLICIES[user.service][user.permission]

    # Connect to IAM
    iam = boto3.client("iam")

    try:

        # Create IAM user
        iam.create_user(
            UserName=user.username
        )

        # Attach selected policy
        iam.attach_user_policy(
            UserName=user.username,
            PolicyArn=policy_arn
        )

        return {
            "success": True,
            "message": "AWS IAM user created successfully!",
            "username": user.username,
            "service": user.service,
            "permission": user.permission,
            "policy_arn": policy_arn
        }

    except ClientError as error:

        error_code = error.response["Error"]["Code"]

        if error_code == "EntityAlreadyExists":
            return {
                "success": False,
                "message": f"User '{user.username}' already exists in AWS IAM."
            }

        return {
            "success": False,
            "message": error.response["Error"]["Message"]
        }
# --------------------------------
# Get AWS IAM Users with Policies
# --------------------------------
@app.get("/users")
def get_users():

    iam = boto3.client("iam")

    try:
        response = iam.list_users()

        users = []

        for user in response["Users"]:

            username = user["UserName"]

            # Get policies attached to this user
            policy_response = iam.list_attached_user_policies(
                UserName=username
            )

            policies = policy_response["AttachedPolicies"]

            # Default values
            service = "AWS IAM"
            permission = "Read Only"

            # Check attached policies
            for policy in policies:

                policy_name = policy["PolicyName"]

                # Detect service
                if "S3" in policy_name:
                    service = "S3"

                elif "EC2" in policy_name:
                    service = "EC2"

                elif "Lambda" in policy_name:
                    service = "Lambda"

                elif "CloudWatch" in policy_name:
                    service = "CloudWatch"

                elif "IAM" in policy_name:
                    service = "IAM"

                # Detect permission
                if "FullAccess" in policy_name:
                    permission = "Full Access"

                elif "ReadOnly" in policy_name:
                    permission = "Read Only"

            users.append({
                "username": username,
                "user_id": user["UserId"],
                "arn": user["Arn"],
                "created": str(user["CreateDate"]),
                "service": service,
                "permission": permission,
                "status": "Active"
            })

        return {
            "success": True,
            "users": users
        }

    except ClientError as error:

        return {
            "success": False,
            "message": error.response["Error"]["Message"]
        }
    