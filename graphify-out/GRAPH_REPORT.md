# Graph Report - phongtro  (2026-11-06)

## Corpus Check
- 186 files · ~287,623 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: .mdc 4, (none) 4, .example 1)

## Summary
- 695 nodes · 1199 edges · 43 communities (39 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6ac46d60`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- package.json
- steps
- Engineering Guidelines
- Rental Product Features
- UploadService
- RoomContext.tsx
- TypeScript Settings
- Container Deployment
- HomeLanding.tsx
- common.ps1
- Graphify Instructions
- HTML App Shell
- Hero Visual References
- Brand Identity Assets
- Vite Environment Types
- Tasks: [FEATURE NAME]
- speckit-analyze/SKILL.md
- Execution Steps
- Feature Specification: [FEATURE NAME]
- speckit-plan/SKILL.md
- speckit-specify/SKILL.md
- speckit-tasks/SKILL.md
- Core Principles
- Core Principles
- Project Design Context
- Product
- Implementation Plan: [FEATURE]
- speckit-checklist/SKILL.md
- speckit-clarify/SKILL.md
- speckit-implement/SKILL.md
- speckit-constitution/SKILL.md
- speckit-taskstoissues/SKILL.md
- HUONGMUOI · Trọ Thái Nguyên
- [CHECKLIST TYPE] Checklist: [FEATURE NAME]
- dependencies
- verify_ui.cjs
- motionSystem.ts
- deploy
- scripts
- vite

## God Nodes (most connected - your core abstractions)
1. `useRooms()` - 39 edges
2. `react` - 32 edges
3. `lucide-react` - 27 edges
4. `Room` - 25 edges
5. `formatCurrency()` - 25 edges
6. `Trọ Thái Nguyên project README` - 25 edges
7. `MainApp()` - 23 edges
8. `Frontend architecture, UI and Tailwind rules` - 19 edges
9. `framer-motion` - 18 edges
10. `compilerOptions` - 18 edges

## Surprising Connections (you probably didn't know these)
- `Modern villa with infinity pool at dusk` --semantically_similar_to--> `Sunset villa, sea and swimming pool hero background`  [INFERRED] [semantically similar]
  public/images/hero-sunset-villa.jpg → src/assets/anhmoi.png
- `Trọ Thái Nguyên homepage design reference` --semantically_similar_to--> `Sunset villa, sea and swimming pool hero background`  [INFERRED] [semantically similar]
  public/images/mauthietke.png → src/assets/anhmoi.png
- `MapViewProps` --references--> `Room`  [EXTRACTED]
  src/components/common/MapView.tsx → src/types/index.ts
- `MapView()` --calls--> `formatCurrency()`  [EXTRACTED]
  src/components/common/MapView.tsx → src/utils/formatters.ts
- `Semantic HTML keyboard and screen reader accessibility` --semantically_similar_to--> `Accessible reusable UI component patterns`  [INFERRED] [semantically similar]
  prompts.md → rules.md

## Import Cycles
- None detected.

## Communities (43 total, 4 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.07
Nodes (70): framer-motion, lucide-react, react, AdminPortal, App(), LandlordPortal, MainApp(), RoomDetailView (+62 more)

### Community 1 - "package.json"
Cohesion: 0.12
Nodes (23): devDependencies, autoprefixer@^10.4.20, postcss@^8.4.49, tailwindcss@^3.4.15, tailwindcss-animate@^1.0.7, @types/leaflet@^1.9.14, @types/node@^22.9.0, @types/react@^18.3.12 (+15 more)

### Community 2 - "steps"
Cohesion: 0.06
Nodes (30): args, inputs, integration, spec, default, prompt, type, any (+22 more)

### Community 3 - "Engineering Guidelines"
Cohesion: 0.08
Nodes (32): Atomic commits and Conventional Commits, Authentication form validation and loading states, Automated frontend code review criteria, Colocate UI state and isolate server state, Core business logic test coverage above 80 percent, Frontend AI prompts and engineering guidelines, Explain why in comments and document public APIs, Lazy loading memoization and list virtualization (+24 more)

### Community 4 - "Rental Product Features"
Cohesion: 0.10
Nodes (24): Admin listing review and CSV import, API endpoints for room CRUD and batch import, Compare two to four rooms, Direct landlord room discovery platform, Direct room viewing appointments, Docker and Nginx deployment guidance, Trọ Thái Nguyên project README, Editorial real-estate discovery design (+16 more)

### Community 6 - "RoomContext.tsx"
Cohesion: 0.07
Nodes (35): RoomCardProps, BookingModalProps, ReportModalProps, RoomDetailViewProps, compressRoomImage(), RoomFormModalProps, uploadCompressedImage(), AuthContextType (+27 more)

### Community 7 - "TypeScript Settings"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+11 more)

### Community 8 - "Container Deployment"
Cohesion: 0.12
Nodes (16): context, dockerfile, interval, retries, start_period, test, timeout, services (+8 more)

### Community 9 - "HomeLanding.tsx"
Cohesion: 0.09
Nodes (22): MapView(), MapViewProps, AreaExplorerProps, HomeLanding(), HomeLandingProps, quickCategories, QuickCategory, SearchDropdown() (+14 more)

### Community 10 - "common.ps1"
Cohesion: 0.16
Nodes (19): Find-SpecifyRoot(), Format-SpecKitCommand(), Get-CurrentBranch(), Get-FeaturePathsEnv(), Get-InvokeSeparator(), Get-NormalizedPriority(), Get-Python3Command(), Get-RepoRoot() (+11 more)

### Community 11 - "Graphify Instructions"
Cohesion: 0.29
Nodes (5): Graphify instructions for this project, Persistent project knowledge graph, Read graph report for broad architecture reviews, Refresh graph after source code changes, Use graph path and explain for relationship queries

### Community 12 - "HTML App Shell"
Cohesion: 0.33
Nodes (6): HTML document shell, Google Fonts typography bundle, Leaflet map stylesheet, React application mount point, Vietnamese locale and responsive viewport, Vietnamese room rental landing page metadata

### Community 13 - "Hero Visual References"
Cohesion: 0.33
Nodes (6): Modern villa with infinity pool at dusk, Room search hero layout reference, Trọ Thái Nguyên homepage design reference, Trust indicators and direct-search controls, Sunset pool background visual, Sunset villa, sea and swimming pool hero background

### Community 14 - "Brand Identity Assets"
Cohesion: 0.50
Nodes (4): Huongmuoi luxury hospitality logo over a coastal villa scene, Huongmuoi hospitality brand identity, Huongmuoi serif wordmark with gold crescent detail, Huongmuoi monogram and wordmark on cream background

### Community 18 - "Tasks: [FEATURE NAME]"
Cohesion: 0.07
Nodes (26): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation for User Story 3, Implementation Strategy, Incremental Delivery, MVP First (User Story 1 Only) (+18 more)

### Community 19 - "speckit-analyze/SKILL.md"
Cohesion: 0.08
Nodes (25): 1. Initialize Analysis Context, 2. Load Artifacts (Progressive Disclosure), 3. Build Semantic Models, 4. Detection Passes (Token-Efficient Analysis), 5. Severity Assignment, 6. Produce Compact Analysis Report, 7. Provide Next Actions, 8. Offer Remediation (+17 more)

### Community 20 - "Execution Steps"
Cohesion: 0.12
Nodes (15): 1. Initialize Convergence Context, 2. Load Artifacts (Progressive Disclosure), 3. Build the Intent Inventory, 4. Assess the Codebase and Classify Findings, 5. Assign Severity, 6. Present the In-Session Findings Summary, 7. Append Convergence Tasks (or report converged), 8. Provide Next Actions (Handoff) (+7 more)

### Community 21 - "Feature Specification: [FEATURE NAME]"
Cohesion: 0.15
Nodes (12): Assumptions, Edge Cases, Feature Specification: [FEATURE NAME], Functional Requirements, Key Entities *(include if feature involves data)*, Measurable Outcomes, Requirements *(mandatory)*, Success Criteria *(mandatory)* (+4 more)

### Community 22 - "speckit-plan/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, Key rules, Mandatory Post-Execution Hooks, Outline, Phase 0: Outline & Research, Phase 1: Design & Contracts, Phases (+2 more)

### Community 23 - "speckit-specify/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, For AI Generation, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, Quick Guidelines, Section Requirements (+2 more)

### Community 24 - "speckit-tasks/SKILL.md"
Cohesion: 0.18
Nodes (10): Checklist Format (REQUIRED), Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Phase Structure, Pre-Execution Checks, Task Generation Rules (+2 more)

### Community 25 - "Core Principles"
Cohesion: 0.18
Nodes (10): Core Principles, Governance, [PRINCIPLE_1_NAME], [PRINCIPLE_2_NAME], [PRINCIPLE_3_NAME], [PRINCIPLE_4_NAME], [PRINCIPLE_5_NAME], [PROJECT_NAME] Constitution (+2 more)

### Community 26 - "Core Principles"
Cohesion: 0.18
Nodes (10): Core Principles, Governance, [PRINCIPLE_1_NAME], [PRINCIPLE_2_NAME], [PRINCIPLE_3_NAME], [PRINCIPLE_4_NAME], [PRINCIPLE_5_NAME], [PROJECT_NAME] Constitution (+2 more)

### Community 27 - "Project Design Context"
Cohesion: 0.20
Nodes (9): Avoid, Components, Constraints, Decisions, Must, Project, Project Design Context, Sources (+1 more)

### Community 28 - "Product"
Cohesion: 0.20
Nodes (9): Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles, Product Purpose (+1 more)

### Community 29 - "Implementation Plan: [FEATURE]"
Cohesion: 0.22
Nodes (8): Complexity Tracking, Constitution Check, Documentation (this feature), Implementation Plan: [FEATURE], Project Structure, Source Code (repository root), Summary, Technical Context

### Community 30 - "speckit-checklist/SKILL.md"
Cohesion: 0.25
Nodes (7): Anti-Examples: What NOT To Do, Checklist Purpose: "Unit Tests for English", Example Checklist Types & Sample Items, Execution Steps, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 31 - "speckit-clarify/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 32 - "speckit-implement/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 33 - "speckit-constitution/SKILL.md"
Cohesion: 0.33
Nodes (5): Outline, Post-Execution Checks, Pre-Execution Checks, Scope Guard, User Input

### Community 34 - "speckit-taskstoissues/SKILL.md"
Cohesion: 0.33
Nodes (5): Deprecation Notice, Outline, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 35 - "HUONGMUOI · Trọ Thái Nguyên"
Cohesion: 0.33
Nodes (5): Avoid, Direction, HUONGMUOI · Trọ Thái Nguyên, Layout and content, Tokens

### Community 36 - "[CHECKLIST TYPE] Checklist: [FEATURE NAME]"
Cohesion: 0.40
Nodes (4): [Category 1], [Category 2], [CHECKLIST TYPE] Checklist: [FEATURE NAME], Notes

### Community 37 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, clsx@^2.1.1, framer-motion@^14.6.0, leaflet@^1.9.4, lucide-react@^0.460.0, react@^18.3.1, react-dom@^18.3.1, tailwind-merge@^2.5.4 (+4 more)

### Community 38 - "verify_ui.cjs"
Cohesion: 0.33
Nodes (4): puppeteer-core@^24.43.1, puppeteer-core, path, puppeteer

### Community 39 - "motionSystem.ts"
Cohesion: 0.21
Nodes (9): gsap@^3.15.1, lenis@^1.3.27, gsap, lenis, MOTION_MAP, MotionSequenceConfig, MotionSequenceName, clearRevealStyles() (+1 more)

### Community 40 - "deploy"
Cohesion: 0.06
Nodes (32): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, permissions (+24 more)

### Community 41 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

### Community 42 - "vite"
Cohesion: 0.33
Nodes (4): vite@^5.4.10, @vitejs/plugin-react@^4.3.3, vite, @vitejs/plugin-react

## Knowledge Gaps
- **34 isolated node(s):** `Persistent project knowledge graph`, `Read graph report for broad architecture reviews`, `Refresh graph after source code changes`, `Use graph path and explain for relationship queries`, `Google Fonts typography bundle` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 349 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `package.json`, `dependencies`, `HomeLanding.tsx`, `RoomContext.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `Persistent project knowledge graph`, `Read graph report for broad architecture reviews`, `Refresh graph after source code changes` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07153376814643383 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `App.tsx` to `package.json`, `dependencies`, `HomeLanding.tsx`, `RoomContext.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11594202898550725 - nodes in this community are weakly interconnected._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Engineering Guidelines` be split into smaller, more focused modules?**
  _Cohesion score 0.08067226890756303 - nodes in this community are weakly interconnected._