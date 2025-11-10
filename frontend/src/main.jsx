import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';

import config from './amplifyconfiguration.json';

Amplify.configure(config);

console.log("--- DEBUG: Starting Amplify Configuration (simple import config) ---");
console.log("--- DEBUG: Contents of config (from amplifyconfiguration.json):", config);
console.log("--- DEBUG: aws_user_pools_id present:", !!config.aws_user_pools_id);
console.log("--- DEBUG: aws_user_pools_web_client_id present:", !!config.aws_user_pools_web_client_id);
console.log("--- DEBUG: aws_cognito_identity_pool_id present:", !!config.aws_cognito_identity_pool_id);

try {
  Amplify.configure(config); // Use the directly imported config
  console.log("--- DEBUG: Amplify.configure() called SUCCESSFULLY with simple config. ---");
} catch (error) {
  console.error("--- DEBUG: Error calling Amplify.configure() with simple config:", error);
}
console.log("--- DEBUG: Amplify Configuration attempt finished. ---");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);