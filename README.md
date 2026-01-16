# OmniBuild AI

**Cloud-Native, AI-First SaaS Platform for Green Building Compliance**

OmniBuild AI is a next-generation BIM compliance platform built for the China-ASEAN Smart City Competition. It leverages Google DeepSeek V3.2 and IFC.js to automate green building auditing, visualize carbon performance in 3D, and facilitate cross-border construction standards.

## 🏗 Project Technical Architecture

The platform follows a modern **Cloud-Native, AI-First** architecture composed of four distinct layers:

### 1. Presentation Layer (Frontend)
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Rendering:** Server-Side Rendering (SSR) for initial load, Client-Side Rendering (CSR) for interactive 3D tools.

### 2. Visualization Layer (3D Engine)
- **Engine:** Three.js + @thatopen/components (modern IFC toolkit)
- **Function:** Parses heavy .ifc BIM models client-side via WebAssembly to ensure low latency without requiring expensive backend GPUs.
- **Features:** "Green Heatmap" overlays (Energy, Carbon, Daylight), interactive element selection, camera controls.

### 3. Reasoning Layer (The AI Core)
- **Model:** DeepSeek V3.2 via Google Cloud Vertex AI
- **Context Window:** 1M+ tokens to ingest entire regulatory PDF manuals (LEED, GBL) + Project Specs.
- **Pipeline:** RAG (Retrieval-Augmented Generation) for accurate compliance checking against specific standards.

### 4. Data Layer
- **Database:** PostgreSQL (with Prisma ORM) for structured project metadata.
- **Storage:** Object Storage for raw BIM files and Document PDFs.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Cloud Project with Vertex AI API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/omnibuild-ai.git
   cd omnibuild-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file:
   ```env
   # Google Cloud Vertex AI
   GOOGLE_PROJECT_ID=your-project-id
   GOOGLE_LOCATION=us-central1
   
   # Database (if using Prisma)
   DATABASE_URL="postgresql://user:password@localhost:5432/omnibuild"
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Core Function Modules

The project is structured around 4 flagship features located in `features/`:

### 1. Automated Compliance Auditor (`features/compliance-auditor/`)
- **Input:** Bill of Quantities (BoQ) + Material Spec PDFs.
- **Process:** AI cross-references line items with uploaded specs against green standards.
- **Output:** Compliance Scorecard (Achieved/Pending/Failed credits).

### 2. 3D Green Heatmap (`features/green-heatmap/`)
- **Input:** IFC BIM Model.
- **Process:** Parses geometry and overlays performance data.
- **Features:** Visualizes Embodied Carbon, Thermal Efficiency, and Daylight factors directly on the 3D model.

### 3. Cross-Border Standard Translator (`features/cross-border-translator/`)
- **Input:** Project compliant with Standard A (e.g., China GBL).
- **Process:** AI identifies gap analysis against Standard B (e.g., Malaysia GBI).
- **Output:** List of missing requirements or design adjustments needed for cross-border compliance.

### 4. Intelligent Optimization Assistant (`features/optimization-assistant/`)
- **Interface:** Chat-based assistant.
- **Process:** Generative suggestions ("How do I reach Gold tier?").
- **Output:** Specific actionable recommendations (e.g., "Switch to glass with U-value < 1.5").

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, Lucide Icons, Radix UI
- **3D / BIM:** Three.js, web-ifc, web-ifc-viewer
- **AI / LLM:** Google Vertex AI (DeepSeek V3.2)
- **Database:** Prisma ORM

## 📄 License

This project is created for the China-ASEAN Smart City Competition.
