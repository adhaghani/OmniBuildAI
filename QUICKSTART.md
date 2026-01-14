# OmniBuild AI - Quick Start Guide

## Prerequisites

1. **Node.js 20+** - [Download here](https://nodejs.org/)
2. **Google Cloud Account** - [Sign up](https://cloud.google.com/)
3. **Google Cloud Project** with Vertex AI enabled

## Google Cloud Setup

### 1. Create a Google Cloud Project

```bash
# Install gcloud CLI if you haven't already
# https://cloud.google.com/sdk/docs/install

# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing)
gcloud projects create omnibuild-ai --name="OmniBuild AI"

# Set the project as active
gcloud config set project omnibuild-ai
```

### 2. Enable Vertex AI API

```bash
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Enable other required APIs
gcloud services enable storage-component.googleapis.com
gcloud services enable compute.googleapis.com
```

### 3. Create Service Account

```bash
# Create service account
gcloud iam service-accounts create omnibuild-sa \
  --display-name="OmniBuild AI Service Account"

# Grant necessary permissions
gcloud projects add-iam-policy-binding omnibuild-ai \
  --member="serviceAccount:omnibuild-sa@omnibuild-ai.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

# Create and download key
gcloud iam service-accounts keys create ./google-credentials.json \
  --iam-account=omnibuild-sa@omnibuild-ai.iam.gserviceaccount.com
```

**⚠️ Important**: Keep `google-credentials.json` secure and never commit it to version control!

## Project Setup

### 1. Clone and Install

```bash
# Navigate to project
cd OmniBuildAI

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your values
```

Update `.env.local`:

```env
GCLOUD_PROJECT=omnibuild-ai
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing the Features

### 1. Test the Landing Page
- Navigate to homepage
- Click "Get Started" to go to dashboard

### 2. Test IFC Viewer
1. Go to "3D Heatmap" tab
2. Click "Select IFC File"
3. Upload a .ifc BIM model (you can download test files from [here](https://github.com/IFCjs/test-ifc-files))
4. Use camera controls to navigate
5. Try different heatmap modes

### 3. Test AI Compliance Auditor
1. Go to "Compliance Auditor" tab
2. Upload project documents (PDFs, spreadsheets)
3. AI will parse and analyze against selected standard
4. View compliance scorecard

### 4. Test AI Assistant
1. Go to "AI Assistant" tab
2. Ask questions like:
   - "How can I improve my LEED score?"
   - "What are the VOC limits for GBI certification?"
   - "Recommend low-carbon concrete suppliers in Nanning"
3. Receive AI-generated suggestions

### 5. Test Standard Translator
1. Go to "Standard Translator" tab
2. Select source standard (e.g., GBL)
3. Select target standard (e.g., GBI)
4. View gap analysis and recommendations

## Test IFC Files

Download sample IFC files for testing:
- [IFC.js Test Files](https://github.com/IFCjs/test-ifc-files)
- [buildingSMART Sample Files](https://www.buildingsmart.org/sample-ifc-files-for-software-testing/)

## Common Issues

### Issue: "Viewer not initialized"
**Solution**: Make sure your browser supports WebGL. Try a different browser (Chrome recommended).

### Issue: "Failed to load IFC model"
**Solution**: Ensure the file is a valid .ifc file (IFC2x3 or IFC4). Try a smaller test file first.

### Issue: Gemini API errors
**Solution**: 
1. Verify `GCLOUD_PROJECT` is set correctly
2. Check service account has `roles/aiplatform.user` permission
3. Ensure Vertex AI API is enabled
4. Check your Google Cloud billing is active

### Issue: "Module not found" errors
**Solution**: Run `npm install` again to ensure all dependencies are installed.

## Project Structure Quick Reference

```
OmniBuildAI/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/page.tsx    # Main dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── features/
│   ├── compliance-auditor/   # Document analysis & scoring
│   ├── green-heatmap/        # 3D IFC viewer
│   ├── optimization-assistant/ # AI chat interface
│   └── cross-border-translator/ # Standard comparison
├── src/
│   ├── config/constants.ts   # App configuration
│   └── lib/ai/gemini.ts      # Gemini AI setup
├── components/ui/            # Reusable UI components
└── .env.local               # Your environment variables
```

## Next Steps

1. **Add Database**: Uncomment Prisma setup for project persistence
2. **Deploy**: Use Vercel, Google Cloud Run, or your preferred platform
3. **Customize**: Modify standards, add new features
4. **Production**: Set up proper authentication and security

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Vertex AI Docs](https://cloud.google.com/vertex-ai/docs)
- [@thatopen/components Docs](https://docs.thatopen.com/)
- [Three.js Documentation](https://threejs.org/docs/)

## Support

For issues or questions:
1. Check [DEVELOPMENT.md](./DEVELOPMENT.md) for implementation details
2. Review [spec.md](./spec.md) for project requirements
3. Open an issue on GitHub

---

**Ready to build sustainable cities with AI!** 🌱🏗️
