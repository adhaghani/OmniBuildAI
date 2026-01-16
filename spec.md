Overview
Background
The Dual-Carbon Imperative and the Construction Crisis The global built environment stands at a critical juncture. As the international community accelerates toward the "Double Carbon" goals (China’s commitment to peak carbon by 2030 and achieve carbon neutrality by 2060), the construction industry remains a significant bottleneck. Currently, the sector is responsible for 39% of global energy-related carbon emissions—split between Operational Carbon (energy used to heat, cool, and power buildings) and Embodied Carbon (emissions from material manufacturing and transport).
In the China-ASEAN region—the world's most active construction corridor—rapid urbanization threatens to lock in high-carbon infrastructure for decades. While regulatory frameworks exist, such as China’s Green Building Label (GBL), Malaysia’s Green Building Index (GBI), and international standards like LEED and BREEAM, the implementation gap is severe. Compliance is currently a manual, labor-intensive process governed by expensive consultants and fragmented spreadsheets.
The "AI Plus" Opportunity This project aligns directly with the 2025 "AI Plus" Initiative, which mandates the deep integration of artificial intelligence into traditional industries. OmniBuild AI was conceived to serve as the digital infrastructure for the next generation of carbon-neutral cities. It leverages the DeepSeek V3.2 Large Language Model (LLM) to automate the administrative burden of green certification, effectively democratizing access to sustainability. By treating green building codes not as static PDFs but as a queryable, intelligent knowledge base, OmniBuild AI bridges the gap between complex regulatory requirements and on-site execution.



Objectives & Necessity
The primary objective is to build a low-barrier, high-intelligence web portal that reduces the time required for green building audits by 80%. The necessity is driven by three factors:
Speed: Manual auditing cannot keep pace with the China-ASEAN construction speed.
Accuracy: Human error in carbon calculation leads to "performance gaps" where certified buildings underperform in reality.
Standardization: Cross-border investment requires a "Rosetta Stone" to translate China’s GBL standards into ASEAN equivalents, facilitating green finance flows.
Core Advantages
1. Multimodal Intelligence (DeepSeek V3.2) Unlike traditional construction software that relies on rigid, structured databases, OmniBuild AI utilizes the massive 1-million+ token context window of DeepSeek V3.2. This allows the system to ingest and reason across "messy" unstructured data simultaneously:
Text: 1,000-page regulatory PDF manuals (LEED v4, GBL 2019).
Visuals: 2D scanned site drawings and material invoices.
3D Data: Industry Foundation Classes (IFC) from BIM models. This multimodal capability is a distinct competitive advantage, allowing us to process a project's entire documentation suite in a single "inference pass" without manual data entry.
2. Zero-Hardware Deployment Competitors often rely on expensive IoT sensor networks or proprietary workstations (e.g., Revit/AutoCAD licenses). OmniBuild AI is a browser-based solution. By using IFC.js for 3D rendering and cloud-based AI processing, we eliminate the hardware barrier, making advanced green auditing accessible even to SME developers and local government offices in second-tier ASEAN cities.
3. Cross-Border Standardization Engine We offer a unique "Standard Toggle" feature. A developer can upload a design intended for Nanning (GBL standard) and instantly simulate its compliance score if the same building were constructed in Kuala Lumpur (GBI standard). This capability is unmatched by domestic competitors who focus solely on Chinese standards, or Western software that ignores local ASEAN nuances.
Analysis of current situation and demand
Current Situation
Policy Orientation The regulatory wind is blowing strongly in favor of this solution. China’s Ministry of Housing and Urban-Rural Development (MOHURD) has mandated that all new urban buildings must meet green building standards. Simultaneously, ASEAN nations like Singapore, Malaysia, and Thailand are enforcing stricter Energy Efficiency (EE) codes. However, a significant bottleneck exists: Compliance Capacity. There are simply not enough qualified green building consultants to audit every new project manually.
Technological Status Quo The current industry standard involves "Siloed Intelligence." Architects design in BIM software (Revit/ArchiCAD), but sustainability auditors work in Excel. Data transfer between these two groups is manual and error-prone. Existing software tools are either:
Too Simple: Basic checklists that lack rigorous carbon calculation.
Too Complex: Physics-based simulation engines (like EnergyPlus) that require PhD-level expertise to operate. There is no "middle layer" that uses AI to guide a generalist architect through a specialist audit.
The "Green Premium" Problem Developers perceive green buildings as expensive—the so-called "Green Premium." This cost is largely administrative. The fees for LEED/GBI certification can run into tens of thousands of dollars, primarily due to the hundreds of hours required for document collection and verification.
Demand
Pain Points & Criticality
This problem is universal across the Global South, where urbanization is fastest and technical expertise is scarcest. By solving the administrative bottleneck, OmniBuild AI unlocks the physical implementation of green buildings. The scope of impact extends from the individual architect (saving hours of work) to the city planner (aggregating accurate carbon data for millions of square meters).

Universality & Impact
This problem is universal across the Global South, where urbanization is fastest and technical expertise is scarcest. By solving the administrative bottleneck, OmniBuild AI unlocks the physical implementation of green buildings. The scope of impact extends from the individual architect (saving hours of work) to the city planner (aggregating accurate carbon data for millions of square meters).

Solution
Project Technical Solution
OmniBuild AI is architected as a Cloud-Native, AI-First SaaS Platform.
Architecture Overview:
Presentation Layer (Frontend): Built on Next.js 15+, providing a responsive, server-side rendered dashboard accessible via any standard web browser (Chrome/Edge).
Visualization Layer (3D Engine): We utilize IFC.js and Three.js to render standard BIM (Building Information Modeling) files directly in the browser. This parses the heavy .ifc geometry data client-side to ensure low latency.
Reasoning Layer (The AI Core): The backend connects to DeepSeek V3.2 via Google Cloud Vertex AI. We utilize a RAG (Retrieval-Augmented Generation) pipeline:
Knowledge Base: Vectorized databases of GBL, GBI, LEED, and BREEAM manuals.
Project Context: User-uploaded PDFs (Bills of Quantities, Material Specs) and JSON extracts from the BIM model.
Data Layer: A PostgreSQL database stores project metadata, while unstructured files are stored in secure Object Storage buckets.



Technical Pathway:
Step 1: Ingestion. The user uploads a BIM model (.ifc) and a folder of material PDFs.
Step 2: Parsing. DeepSeek V3.2 extracts key entities (Material Names, Thermal Conductivity, GWP, Recycled Content) from the PDFs. Simultaneously, the 3D engine extracts spatial data (Window-to-Wall Ratio, Room Areas).
Step 3: Synthesis. The AI maps the extracted data against the selected certification criteria (e.g., GBL "3-Star").
Step 4: Output. The system generates a Scorecard, a list of Missing Documents, and a 3D visualization of problem areas.
Core Function
1. Automated Compliance Auditor This is the flagship feature. Users upload a "Bill of Quantities" (BoQ). The AI iterates through every line item, cross-references it with uploaded material specifications (EPDs), and checks it against the green building standard.
Example: The AI reads "Internal Wall Paint - Dulux." It checks the attached safety data sheet PDF for VOC content. If the VOC < 50g/L, it marks the "Indoor Environmental Quality" credit as ACHIEVED. If the document is missing, it flags it as PENDING.

2. 3D "Green Heatmap" Instead of a static report, the user sees their building in 3D. The AI overlays performance data onto the model:
Red Zones: Rooms with insufficient natural light or high thermal gain.
Green Zones: Areas meeting energy efficiency targets.
Material Tagging: Clicking on a wall displays its "Embodied Carbon" value instantly.
3. Intelligent Optimization Assistant Moving beyond simple checking, the AI offers generative suggestions.
Prompt: "How can I increase my score from Silver to Gold?"
AI Response: "Your current design loses 3 points on Water Efficiency. I suggest switching the specified showerheads in the residential block to models with a flow rate < 6L/min. Here are three locally available suppliers in Nanning that meet this spec."
4. Cross-Border Standard Translator A toggle switch allows the user to view their project through different regulatory lenses.
Input: A design compliant with China GBL 2-Star.
Action: User toggles to "Malaysia GBI."
Output: The AI highlights that the "Rainwater Harvesting" capacity is sufficient for China but insufficient for Malaysia’s tropical rainfall requirements, calculating the exact tank volume increase needed.
Application Scenario
Scenario A: Early Design (Architects)
Context: An architect is massing a new high-rise in Shenzhen.
Action: They upload the rough block model. OmniBuild AI analyzes the solar orientation and suggests rotating the tower 15 degrees to maximize passive cooling, citing the specific GBL credit for "Passive Design Optimization."
Benefit: Carbon reduction is "baked in" from day one, preventing costly redesigns later.
Scenario B: Procurement & Construction (Contractors)
Context: A contractor in Kuala Lumpur receives a delivery of insulation panels.
Action: They snap a photo of the product label using a mobile device. DeepSeek V3.2 performs OCR, retrieves the product's environmental data, and verifies it matches the sustainable design spec.
Benefit: Prevents "Greenwashing" or accidental substitution of inferior materials.




Scenario C: Regulatory Review (Government)
Context: The Nanning Urban-Rural Development Bureau receives 50 project applications a week.
Action: Instead of manual review, they run the digital submissions through OmniBuild AI. The system pre-screens them, flagging only the non-compliant sections for human review.
Benefit: Reduces the review cycle from 15 days to 15 minutes, accelerating urban development.
Core Innovations
1. From Calculation to Dialogue: Traditional tools require inputs in specific cells. OmniBuild AI allows natural language queries ("Is this glass spec good enough?"). This lowers the barrier to entry, allowing non-experts to engage with green engineering.

2. Multi-Standard Interoperability: We are the first platform expressly designed to translate between Chinese and ASEAN standards, creating a "Common Data Environment" for the Belt and Road Initiative.

3. Context-Aware Reasoning: By using Gemini’s large context window, the AI understands the relationship between documents. It knows that a change in the window glass spec (Document A) requires an update to the HVAC load calculation (Document B), and alerts the user to this dependency.





Application value and social value
Application Value
Economic Efficiency (Cost Reduction) OmniBuild AI transforms sustainability from a cost center into a value driver.
Certification Costs: By automating document collection and verification, we estimate a 15-20% reduction in total soft costs for green certification.
Rework Savings: By catching non-compliant materials before installation (via the procurement scan scenario), contractors avoid expensive tear-down and replacement costs.
Operational Efficiency (Quality Enhancement)
Data Quality: The system creates a pristine "Digital Twin" of the building's carbon data. This verified data is crucial for developers seeking "Green Finance" or low-interest sustainability loans.
Lifecycle Savings: By optimizing energy performance during the design phase (e.g., optimizing window-wall ratios), we project up to 20% savings in operational utility costs over the building's 50-year lifecycle.
Social Value
Equitable Green Cities Currently, high-performance green buildings are a luxury product. By drastically lowering the cost of certification and expertise, OmniBuild AI enables affordable housing projects to achieve green standards. This directly impacts public health: better air quality, lower electricity bills, and thermally comfortable homes for lower-income residents.
China-ASEAN Technical Cooperation This project serves as a tangible output of the "China-ASEAN Information Harbor." It exports Chinese expertise in digital construction management while respecting and integrating ASEAN local standards. It fosters a shared ecosystem of knowledge, training a new generation of "Digital Green Workers" who are fluent in both AI tools and sustainability principles.
Ecological Civilization By acting as the "Digital Gatekeeper" for carbon emissions, OmniBuild AI ensures that the region's massive construction volume aligns with the 1.5°C climate target. It translates the abstract political will of the "3060 Goals" into concrete, verifiable on-site actions.
Business Model
Market Analysis
Target Market
Primary: Architecture, Engineering, and Construction (AEC) firms in the China-ASEAN region. There are over 5,000 relevant firms in the Greater Bay Area and ASEAN capitals alone.
Secondary: Real Estate Developers and Government Regulatory Bodies.
Trend: The Green Building Materials market in China is projected to reach $38 billion by 2025. The ASEAN green building market is growing at a CAGR of 12%.
Competitive Landscape
Competitors: Specialized simulation software (IESVE, EnergyPlus) – Powerful but expensive and hard to use. Manual consultants – High quality but slow and unscalable.
Our Position: We are the "Canva of Green Building"—accessible, AI-assisted, and specifically tailored for the China-ASEAN regulatory corridor.
Revenue Model
We propose a B2B SaaS "Freemium" Model:
Free Tier: Basic LEED/GBI checklist and 3D viewer.
Professional Tier: AI-driven document parsing and energy simulation ($200/month per project).
Enterprise Tier: Custom integration for large developers and government departments.

Project Investment Plan
Total Budget: 400,000 RMB
Phase 1: R&D and Integration (150,000 RMB)
API Costs (DeepSeek V3.2/Flash): 50,000 RMB.
Development (Next.js/IFC.js Engineers): 80,000 RMB.
Cloud Infrastructure (Google Cloud/AWS): 20,000 RMB.
Phase 2: Pilot Testing (100,000 RMB)
Partnerships with 5 pilot firms (3 in Nanning, 2 in KL) to calibrate the AI against real-world projects.
Data labeling and fine-tuning.
Phase 3: Marketing & Expansion (150,000 RMB)
Exhibition at China-ASEAN Expo (CAEXPO).
Training workshops for local government officials.
Sustainability of the Project
Revenue Model: B2B SaaS "Freemium"
Free Tier: Basic BIM viewer and Checklist access. Used to acquire a user base.
Pro Tier ($200/month/project): Full AI document parsing, automated scoring, and exportable reports.
Enterprise Tier (Custom Pricing): API integration for government portals and large developers.
Growth Levers The model is highly sustainable because it is Standards-Agnostic. As regulations tighten (e.g., China moves to "Zero-Carbon" standards), we simply update the AI's reference documents. We do not need to re-engineer the core software. The high recurring revenue from the SaaS model funds continuous R&D.
Adoption Value
Implementation feasibility
Technological Feasibility The project utilizes mature, open-source web technologies (React, Three.js) combined with available commercial AI APIs. There is no requirement for "breakthrough" physics research; the innovation is in the integration and application.
Regional Feasibility We target the "Digital Silk Road." The shared time zones and increasing economic integration between Guangxi (China) and ASEAN make this the perfect testbed. We have identified local partners (e.g., Green Building Index Sdn Bhd in Malaysia) for potential data-sharing agreements.
Adoption Value
Scalability OmniBuild AI establishes a "replicable AI industry solution." Once the logic of "Document + 3D Model = Compliance Score" is proven in green building, it can be laterally scaled to:
Smart Fire Safety: Auditing building layouts against fire codes.
Smart Parking: Verifying EV charging infrastructure ratios.
Historical Preservation: Analyzing restoration plans against heritage guidelines.
Ecosystem Building This project does not just sell software; it builds an ecosystem. By creating a standardized digital format for green data, we enable third-party developers to build plugins (e.g., a "Green Material Marketplace" that plugs into our compliance engine). It directly supports the capability building of the housing and urban-rural development sector by providing a tool that upskills the workforce.