# AI MCP Frontend - Real-time Voice Chat

A React 18 + Vite frontend for real-time voice conversation with Azure OpenAI GPT-4o-mini-realtime-preview, deployed on Azure Web App.

## Features

- 🎤 Real-time voice conversation with AI
- 🔄 Direct audio streaming to Azure OpenAI Realtime API
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast development with Vite
- 🚫 No backend required - direct Azure OpenAI integration
- ☁️ Deployed on Azure Web App
- 🔧 Azure CLI integration for easy configuration

## Quick Start (Azure Web App)

The application is designed to run on Azure Web App. You can deploy it using:

### Option 1: Automated Deployment with Azure CLI

1. **Get Azure OpenAI configuration automatically:**
   ```bash
   # Run the configuration script
   ./get-azure-openai-config.sh
   
   # Or just see the commands
   ./azure-openai-cli.sh
   ```

2. **Deploy everything with one command:**
   ```bash
   ./deploy-azure.sh
   ```

### Option 2: Manual Azure CLI Commands

1. **Get your Azure OpenAI endpoint:**
   ```bash
   az cognitiveservices account show \
     --name YOUR_OPENAI_RESOURCE \
     --resource-group YOUR_RESOURCE_GROUP \
     --query properties.endpoint \
     --output tsv
   ```

2. **Get your Azure OpenAI API key:**
   ```bash
   az cognitiveservices account keys list \
     --name YOUR_OPENAI_RESOURCE \
     --resource-group YOUR_RESOURCE_GROUP \
     --query key1 \
     --output tsv
   ```

3. **List your deployments:**
   ```bash
   az cognitiveservices account deployment list \
     --name YOUR_OPENAI_RESOURCE \
     --resource-group YOUR_RESOURCE_GROUP
   ```

4. **Deploy the Web App:**
   ```bash
   ./deploy-azure.sh
   ```

### Option 3: GitHub Actions (Recommended for CI/CD)

1. Fork this repository
2. Set up GitHub Secrets in your repository:
   - `AZURE_WEBAPP_PUBLISH_PROFILE` - Get this from Azure Portal
   - `AZURE_OPENAI_ENDPOINT` - Your Azure OpenAI endpoint
   - `AZURE_OPENAI_API_KEY` - Your Azure OpenAI API key
   - `AZURE_OPENAI_DEPLOYMENT` - Your deployment name (e.g., gpt-4o-mini-realtime-preview)

3. Push to main/master branch - GitHub Actions will automatically deploy

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Get Azure OpenAI configuration:
```bash
# Automatically fetch and create .env file
./get-azure-openai-config.sh

# Or manually create .env file with:
VITE_AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
VITE_AZURE_OPENAI_API_KEY=your-api-key-here
VITE_AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini-realtime-preview
```

3. Start the development server:
```bash
npm run dev
```

## Usage

- Click the phone button to start a real-time voice conversation
- Speak naturally - the AI will respond in real-time
- Click the phone button again to end the conversation
- No need to record or upload audio files - everything happens in real-time

## Azure OpenAI Realtime API

This application uses Azure OpenAI's GPT-4o-mini-realtime-preview model with the Realtime API for:
- Direct audio input processing
- Real-time AI responses
- Low-latency voice conversation
- Voice activity detection (VAD)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Requirements

- Azure OpenAI resource with GPT-4o-mini-realtime-preview deployment
- Modern browser with WebRTC support
- Microphone access
- Azure Web App (for production deployment)

## Azure Resources

- **Azure OpenAI**: For the GPT-4o-mini-realtime-preview model
- **Azure Web App**: For hosting the frontend application
- **Azure Key Vault** (optional): For secure storage of API keys

## Azure CLI Commands Reference

### Get OpenAI Configuration
```bash
# List all OpenAI resources
az cognitiveservices account list --resource-group YOUR_RESOURCE_GROUP

# Get endpoint
az cognitiveservices account show --name YOUR_RESOURCE --resource-group YOUR_RESOURCE_GROUP --query properties.endpoint

# Get API keys
az cognitiveservices account keys list --name YOUR_RESOURCE --resource-group YOUR_RESOURCE_GROUP

# List deployments
az cognitiveservices account deployment list --name YOUR_RESOURCE --resource-group YOUR_RESOURCE_GROUP
```

### Create Deployment (if needed)
```bash
az cognitiveservices account deployment create \
  --name gpt-4o-mini-realtime-preview \
  --account-name YOUR_RESOURCE \
  --resource-group YOUR_RESOURCE_GROUP \
  --model-name gpt-4o-mini-realtime-preview \
  --model-version 2024-12-01 \
  --model-format OpenAI \
  --scale-settings-scale-type Standard
```

### Set Web App Environment Variables
```bash
az webapp config appsettings set \
  --name YOUR_WEBAPP_NAME \
  --resource-group YOUR_RESOURCE_GROUP \
  --settings \
  VITE_AZURE_OPENAI_ENDPOINT="YOUR_ENDPOINT" \
  VITE_AZURE_OPENAI_API_KEY="YOUR_API_KEY" \
  VITE_AZURE_OPENAI_DEPLOYMENT="YOUR_DEPLOYMENT"
```

## Troubleshooting

### Common Issues

1. **Microphone Access**: Ensure your browser has permission to access the microphone
2. **HTTPS Required**: The application requires HTTPS for microphone access in production
3. **Azure OpenAI Quotas**: Check your Azure OpenAI service quotas and limits
4. **Environment Variables**: Ensure all required environment variables are set in Azure Web App

### Getting Help

- Check the browser console for detailed error messages
- Verify your Azure OpenAI endpoint and API key are correct
- Ensure your Azure OpenAI deployment supports the Realtime API 