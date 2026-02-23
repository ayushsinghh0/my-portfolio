# Resend API Setup Instructions

To get the contact form working in production and locally, please follow these steps:

### 1. Create a Resend Account
- Go to [Resend.com](https://resend.com/) and sign up.
- Navigate to the **API Keys** section in your dashboard.
- Create a new API key.
- *Note: For testing, Resend only allows sending to the email address you signed up with (`ayushraj4820@gmail.com`), unless you verify your own custom domain.*

### 2. Add Environment Variables
Create a file named `.env.local` in the root of your project directory (`d:\MY_protofolio\git-portfolio\my-portfolio\.env.local`). Add the API key you generated:

```env
RESEND_API_KEY=re_your_api_key_here
```

### 3. Running Locally
Run your development server as usual:
```bash
npm run dev
```
The contact form will now send real emails using the API route and your Resend key.

### 4. Deploying on Vercel
When you deploy this site to Vercel:
- Go to your Project Dashboard on Vercel.
- Navigate to **Settings > Environment Variables**.
- Add a new variable:
  - **Key**: `RESEND_API_KEY`
  - **Value**: `re_your_api_key_here`
- Save and redeploy your project.

### Security Note
The API route securely calls the Resend API on the server side. The `RESEND_API_KEY` is completely hidden from the frontend and is safe.
