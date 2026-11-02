# Graph Report - phongtro  (2026-10-30)

## Corpus Check
- Corpus is ~40,216 words - fits in a single context window. You may not need a graph.

## Summary
- 365 nodes · 810 edges · 18 communities (15 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Application Shell
- Frontend Dependencies
- Room Discovery UI
- Engineering Guidelines
- Rental Product Features
- Room API and Uploads
- Room Data Management
- TypeScript Settings
- Container Deployment
- Home Search Experience
- Authentication and Users
- Graphify Instructions
- HTML App Shell
- Hero Visual References
- Brand Identity Assets
- Vite Environment Types

## God Nodes (most connected - your core abstractions)
1. `useRooms()` - 39 edges
2. `react` - 32 edges
3. `lucide-react` - 27 edges
4. `Room` - 25 edges
5. `formatCurrency()` - 25 edges
6. `Trọ Thái Nguyên project README` - 25 edges
7. `MainApp()` - 22 edges
8. `Frontend architecture, UI and Tailwind rules` - 19 edges
9. `compilerOptions` - 18 edges
10. `useAuth()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Modern villa with infinity pool at dusk` --semantically_similar_to--> `Sunset villa, sea and swimming pool hero background`  [INFERRED] [semantically similar]
  public/images/hero-sunset-villa.jpg → src/assets/anhmoi.png
- `Trọ Thái Nguyên homepage design reference` --semantically_similar_to--> `Sunset villa, sea and swimming pool hero background`  [INFERRED] [semantically similar]
  public/images/mauthietke.png → src/assets/anhmoi.png
- `MapViewProps` --references--> `Room`  [EXTRACTED]
  src/components/common/MapView.tsx → src/types/index.ts
- `RoomFormModalProps` --references--> `Room`  [EXTRACTED]
  src/components/landlord/RoomFormModal.tsx → src/types/index.ts
- `Strict TypeScript interfaces` --semantically_similar_to--> `Strict typing prefer interfaces and avoid any`  [INFERRED] [semantically similar]
  prompts.md → rules.md

## Import Cycles
- None detected.

## Communities (18 total, 3 thin omitted)

### Community 0 - "Application Shell"
Cohesion: 0.09
Nodes (45): lucide-react, react, App(), MainApp(), AdminPortal(), AdminPortalProps, CommandPalette(), CommandPaletteProps (+37 more)

### Community 1 - "Frontend Dependencies"
Cohesion: 0.05
Nodes (48): dependencies, clsx@^2.1.1, framer-motion@^14.6.0, leaflet@^1.9.4, lucide-react@^0.460.0, react@^18.3.1, react-dom@^18.3.1, tailwind-merge@^2.5.4 (+40 more)

### Community 2 - "Room Discovery UI"
Cohesion: 0.13
Nodes (29): MapView(), MapViewProps, RoomCard(), ComparisonModal(), ComparisonModalProps, BookingModal(), CostCalculator(), CostCalculatorProps (+21 more)

### Community 3 - "Engineering Guidelines"
Cohesion: 0.08
Nodes (32): Atomic commits and Conventional Commits, Authentication form validation and loading states, Automated frontend code review criteria, Colocate UI state and isolate server state, Core business logic test coverage above 80 percent, Frontend AI prompts and engineering guidelines, Explain why in comments and document public APIs, Lazy loading memoization and list virtualization (+24 more)

### Community 4 - "Rental Product Features"
Cohesion: 0.10
Nodes (24): Admin listing review and CSV import, API endpoints for room CRUD and batch import, Compare two to four rooms, Direct landlord room discovery platform, Direct room viewing appointments, Docker and Nginx deployment guidance, Trọ Thái Nguyên project README, Editorial real-estate discovery design (+16 more)

### Community 5 - "Room API and Uploads"
Cohesion: 0.13
Nodes (8): compressRoomImage(), RoomFormModal(), RoomFormModalProps, uploadCompressedImage(), apiClient, ApiResponse, UploadResult, uploadService

### Community 6 - "Room Data Management"
Cohesion: 0.19
Nodes (11): RoomCardProps, BookingModalProps, ReportModalProps, RoomDetailViewProps, RoomContextType, SEED_ROOMS, roomService, FilterState (+3 more)

### Community 7 - "TypeScript Settings"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+11 more)

### Community 8 - "Container Deployment"
Cohesion: 0.12
Nodes (16): context, dockerfile, interval, retries, start_period, test, timeout, services (+8 more)

### Community 9 - "Home Search Experience"
Cohesion: 0.14
Nodes (13): HomeLanding(), HomeLandingProps, quickCategories, QuickCategory, SearchDropdown(), SearchDropdownId, SearchDropdownOption, SearchDropdownProps (+5 more)

### Community 10 - "Authentication and Users"
Cohesion: 0.26
Nodes (7): AuthContextType, DEMO_USERS, INITIAL_APPOINTMENTS, INITIAL_REPORTS, authService, User, UserRole

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

## Knowledge Gaps
- **34 isolated node(s):** `Vietnamese room rental landing page metadata`, `React application mount point`, `Google Fonts typography bundle`, `Leaflet map stylesheet`, `Vietnamese locale and responsive viewport` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 132 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Application Shell` to `Frontend Dependencies`, `Room Discovery UI`, `Room API and Uploads`, `Home Search Experience`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **What connects `Vietnamese room rental landing page metadata`, `React application mount point`, `Google Fonts typography bundle` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Application Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.08909995477159656 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Application Shell` to `Frontend Dependencies`, `Room Discovery UI`, `Room API and Uploads`, `Home Search Experience`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05152394775036284 - nodes in this community are weakly interconnected._
- **Why does `apiClient` connect `Room API and Uploads` to `Application Shell`, `Authentication and Users`, `Room Data Management`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `Room Discovery UI` be split into smaller, more focused modules?**
  _Cohesion score 0.1346153846153846 - nodes in this community are weakly interconnected._