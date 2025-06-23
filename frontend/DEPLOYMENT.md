# Azure Web App Deployment Guide

This guide will help you deploy the AI MCP Frontend to Azure Web App.

## Prerequisites

1. **Azure Account**: You need an active Azure subscription
2. **Azure CLI**: Install from [https://docs.microsoft.com/en-us/cli/azure/install-azure-cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
3. **Azure OpenAI Resource**: You need an Azure OpenAI resource with GPT-4o-mini-realtime-preview deployment

## Step 1: Azure OpenAI Setup

1. Create an Azure OpenAI resource in the Azure Portal
2. Deploy the `gpt-4o-mini-realtime-preview` model
3. Note down your:
   - Endpoint URL (e.g., `https://your-resource.openai.azure.com`)
   - API Key
   - Deployment name

## Step 2: Deploy to Azure Web App

### Option A: Using Azure CLI (Quick)

1. **Login to Azure**:
   ```bash
   az login
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy-azure.sh
   ```

3. **Set environment variables** in Azure Portal:
   - Go to your Web App in Azure Portal
   - Navigate to Settings > Configuration > Application settings
   - Add these environment variables:
     - `VITE_AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint
     - `VITE_AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
     - `VITE_AZURE_OPENAI_DEPLOYMENT`: Your deployment name

4. **Restart the Web App** to apply the environment variables

### Option B: Using GitHub Actions (Recommended)

1. **Fork this repository** to your GitHub account

2. **Get Azure Web App publish profile**:
   - Create a Web App in Azure Portal
   - Go to Overview > Get publish profile
   - Download the file

3. **Set up GitHub Secrets**:
   - Go to your repository Settings > Secrets and variables > Actions
   - Add these secrets:
     - `AZURE_WEBAPP_PUBLISH_PROFILE`: Content of the publish profile file
     - `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint
     - `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
     - `AZURE_OPENAI_DEPLOYMENT`: Your deployment name

4. **Push to main branch** - GitHub Actions will automatically deploy

## Step 3: Verify Deployment

1. **Check the Web App URL** (provided after deployment)
2. **Test microphone access** - the app requires HTTPS for microphone access
3. **Check browser console** for any errors
4. **Test voice conversation** with the AI

## Troubleshooting

### Common Issues

1. **"Failed to access microphone"**
   - Ensure you're using HTTPS
   - Check browser permissions
   - Try refreshing the page

2. **"Failed to connect to Azure OpenAI"**
   - Verify your endpoint URL and API key
   - Check if your deployment supports Realtime API
   - Ensure environment variables are set correctly

3. **"Build failed"**
   - Check that all dependencies are installed
   - Verify Node.js version (18+ required)
   - Check for any syntax errors in the code

### Environment Variables

Make sure these are set in your Azure Web App:

```bash
VITE_AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
VITE_AZURE_OPENAI_API_KEY=your-api-key-here
VITE_AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini-realtime-preview
```

### Azure OpenAI Quotas

- Check your Azure OpenAI service quotas
- Ensure you have sufficient tokens for the Realtime API
- Monitor usage in Azure Portal

## Cost Optimization

1. **Use Basic App Service Plan** for development/testing
2. **Monitor Azure OpenAI usage** to avoid unexpected costs
3. **Set up spending limits** in Azure
4. **Use appropriate model tiers** based on your needs

## Security Best Practices

1. **Store API keys securely** in Azure Key Vault
2. **Use managed identities** when possible
3. **Enable HTTPS only** in Azure Web App
4. **Regularly rotate API keys**
5. **Monitor access logs**

## Support

- **Azure Documentation**: [https://docs.microsoft.com/en-us/azure/](https://docs.microsoft.com/en-us/azure/)
- **Azure OpenAI Documentation**: [https://docs.microsoft.com/en-us/azure/ai-services/openai/](https://docs.microsoft.com/en-us/azure/ai-services/openai/)
- **GitHub Issues**: Report bugs in the repository 