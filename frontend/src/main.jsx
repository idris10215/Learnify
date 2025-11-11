import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';

// import config from './amplifyconfiguration.json';
// Amplify.configure(config);

const amplifyConfig = {
  // General AWS project region
  "aws_project_region": import.meta.env.VITE_AWS_PROJECT_REGION,

  // Cognito User Pool and Identity Pool configuration
  "aws_cognito_identity_pool_id": import.meta.env.VITE_AWS_COGNITO_IDENTITY_POOL_ID,
  "aws_cognito_region": import.meta.env.VITE_AWS_PROJECT_REGION, // Often same as project region
  "aws_user_pools_id": import.meta.env.VITE_AWS_USER_POOLS_ID,
  "aws_user_pools_web_client_id": import.meta.env.VITE_AWS_USER_POOLS_WEB_CLIENT_ID,

  // OAuth (if configured, you might need more complex object if used)
  "oauth": {},

  // Cognito User Attributes and Sign-up/Sign-in settings
  "aws_cognito_username_attributes": [ "EMAIL" ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [ "EMAIL" ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [ "SMS" ],
  "aws_cognito_password_protection_settings": {
    "passwordPolicyMinLength": 8,
    "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [ "EMAIL" ],

  // S3 User Files configuration
  "aws_user_files_s3_bucket": import.meta.env.VITE_AWS_USER_FILES_S3_BUCKET,
  "aws_user_files_s3_bucket_region": import.meta.env.VITE_AWS_USER_FILES_S3_BUCKET_REGION
};

console.log("--- DEBUG: Starting Amplify Configuration (from Env Vars in object) ---");
console.log("--- DEBUG: Constructed amplifyConfig:", amplifyConfig);

try {
  Amplify.configure(amplifyConfig);
  console.log("--- DEBUG: Amplify.configure() called SUCCESSFULLY with Env Var object config. ---");
} catch (error) {
  console.error("--- DEBUG: Error calling Amplify.configure() with Env Var object config:", error);
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);