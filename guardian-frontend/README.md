# Guardian — Hybrid AI + Human Compliance Platform

**Continuous compliance with AI speed and human assurance.**

Guardian is a modern compliance platform that combines AI automation with human oversight to help organizations in Finance, Law, Education, Accounting, and Healthcare maintain continuous compliance across multiple frameworks.

## 🚀 Features

### Core Platform
- **Hybrid Workflows**: Every process has both AI automation and human review tracks
- **Framework-First**: Support for SOC 2, ISO 27001, PCI DSS, GDPR, CCPA, HIPAA, FERPA, GLBA, SOX, and more
- **Continuous Monitoring**: Always-on website and network monitoring with evidence collection
- **Evidence Vault**: Centralized repository with chain of custody and automated mapping
- **Proactive Alerts**: Real-time notifications with intelligent triage and remediation

### Key Pages & Functionality

#### 🏠 Dashboard
- Overall compliance score and framework coverage
- Framework posture grid with quick actions
- Risk heatmap (likelihood × impact)
- Recent alerts with severity indicators
- Activity timeline showing AI checks, uploads, and approvals
- Active audits with AI vs Human task tracking

#### 🛡️ Frameworks
- Industry-based framework filtering
- Framework selector with enable/disable controls
- Detailed control management with AI confidence indicators
- Bulk actions for control assignment and due dates
- Tabbed views: Controls, Tests, Gaps, Policies, Evidence, Reports

#### 🖥️ Monitors
- Website and network monitoring tabs
- Monitor cards with status, cadence, and findings
- Quick creation wizard for different monitor types
- Real-time status updates and linked controls
- Run on-demand scans and view historical results

#### 📋 Audits
- Audit overview with progress tracking
- New audit wizard with framework and team selection
- Dual-track task board (AI tasks vs Human tasks)
- Stepper interface showing audit phases
- Progress visualization and deadline management

#### 📁 Evidence Vault
- Centralized evidence repository with metadata
- AI-verified vs Human-reviewed origin badges
- Drag-and-drop upload with automatic control mapping
- Bulk actions for approval and reviewer assignment
- Chain of custody tracking and retention policies

#### 🚨 Alerts
- Alert feed with severity and state filtering
- Bulk triage actions (acknowledge, assign, snooze)
- Detailed alert view with impact analysis
- Suggested remediation and control mapping
- Alert policy configuration

#### 📊 Reports
- Pre-built templates (Executive, Auditor Package, Customer Assurance)
- Report builder with customizable sections
- Multiple export formats (PDF, CSV, JSON, sharable links)
- Recent reports management and sharing

#### 🔗 Integrations
- Categorized integration catalog (Cloud, Identity, Security, Monitoring)
- OAuth and API key connection methods
- Real-time sync status and configuration
- Connected integrations management

#### ⚙️ Team & Settings
- Organization profile with industry tags and regions
- User management with role-based permissions
- Framework settings and automation configuration
- Data privacy and retention policies

#### ❓ Help & Compliance Library
- Searchable compliance guides and playbooks
- Framework-specific implementation guidance
- Control-level detailed instructions
- Live chat and support ticket system

## 🎨 Design System

### Brand Colors
- **Primary**: Deep indigo (#4f46e5) for primary actions and navigation
- **Navy**: Cool grays (#0f172a to #f8fafc) for text and backgrounds
- **Emerald**: Success states and positive indicators
- **Amber**: Warnings and review-required states
- **Red**: Critical alerts and failures

### Components
- **Cards**: Clean white containers with subtle shadows
- **Badges**: Status indicators with consistent color coding
- **Buttons**: Primary and secondary variants with focus states
- **Tables**: Sortable with sticky headers and hover states
- **Modals**: Centered overlays with backdrop blur
- **Progress**: Gradient progress bars and completion indicators

### Responsive Design
- **Desktop**: Full sidebar navigation with detailed layouts
- **Mobile**: Bottom tab bar navigation with optimized views
- **Tablet**: Adaptive layouts that work across screen sizes

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Heroicons for consistent iconography
- **Routing**: React Router for client-side navigation
- **Charts**: Recharts for data visualization
- **Utilities**: date-fns, clsx, tailwind-merge

### Project Structure
```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with navigation
├── pages/              # Route-level page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Frameworks.tsx  # Framework management
│   ├── Monitors.tsx    # Monitoring configuration
│   ├── Audits.tsx      # Audit management
│   ├── Evidence.tsx    # Evidence vault
│   ├── Alerts.tsx      # Alert management
│   ├── Reports.tsx     # Report generation
│   ├── Integrations.tsx # Third-party integrations
│   ├── Settings.tsx    # Organization settings
│   └── Help.tsx        # Help and documentation
├── data/               # Mock data and API interfaces
│   └── mockData.ts     # Realistic sample data
├── types/              # TypeScript type definitions
│   └── index.ts        # All platform types
├── utils/              # Utility functions
│   └── index.ts        # Helpers and formatting
└── App.tsx             # Main application with routing
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation
```bash
cd guardian-frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🔑 Key User Flows

### 1. Onboarding Flow
1. Select industry → recommended frameworks
2. Connect integrations → create monitors
3. Run initial AI checks → see baseline score

### 2. Close a Compliance Gap
1. Alert notification → view impacted control
2. Run AI check → upload evidence
3. Assign reviewer → approve → score updates

### 3. Conduct an Audit
1. New audit wizard → auto-collect artifacts
2. AI assesses controls → analyst completes manual tests
3. Manager signs off → export report

### 4. Evidence Management
1. Upload or auto-ingest → map to controls
2. Reviewer approves → locked with chain-of-custody

### 5. Alert Triage
1. New alert → acknowledge → assign
2. Add remediation task → link evidence → resolve

## 🎯 Hybrid AI + Human Patterns

The platform implements several key patterns that emphasize the hybrid nature:

- **Origin Badges**: Every item shows whether it was AI-Verified, Human-Reviewed, AI-Suggested, or Manual
- **Confidence Indicators**: AI results show confidence levels with visual progress bars
- **Dual-Track Workflows**: Audits and controls clearly separate AI tasks from human tasks
- **Review Queues**: Items below confidence thresholds automatically require human review
- **Approval Workflows**: Critical actions require explicit human sign-off with timestamps

## 🔒 Security & Compliance

- **Role-Based Access**: Granular permissions for different user types
- **Audit Trail**: Complete chain of custody for all evidence
- **Data Retention**: Configurable retention policies by evidence type
- **Privacy Controls**: Data residency and export capabilities
- **External Auditor Access**: Time-boxed, scoped access for third parties

## 📱 Mobile Experience

- **Bottom Tab Navigation**: Primary navigation accessible via bottom tabs
- **Responsive Cards**: Optimized card layouts for mobile screens
- **Touch-Friendly**: Larger touch targets and gesture support
- **Offline Capability**: Core features work without internet (future enhancement)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Mock Data
The platform includes comprehensive mock data representing:
- 5 compliance frameworks (SOC 2, ISO 27001, PCI DSS, GDPR, HIPAA)
- 4 sample controls with different statuses and AI confidence levels
- 3 monitors (TLS, Website Security, Network Ports)
- 3 alerts with varying severities and states
- 3 evidence artifacts with different origins and statuses
- 3 audits in different phases of completion

### Customization
- **Colors**: Modify `tailwind.config.js` to adjust the Guardian color palette
- **Components**: Extend the design system in `src/index.css`
- **Mock Data**: Update `src/data/mockData.ts` for different scenarios
- **Types**: Extend interfaces in `src/types/index.ts` for additional fields

## 🎯 Production Readiness

This frontend is designed to be production-ready with:
- **Performance**: Optimized builds with code splitting
- **Accessibility**: WCAG AA compliance with focus management
- **SEO**: Proper meta tags and semantic HTML
- **Error Handling**: Graceful error states and loading indicators
- **Testing**: Component structure ready for unit and integration tests

## 📋 Next Steps

To make this production-ready:
1. **Backend Integration**: Replace mock data with real API calls
2. **Authentication**: Implement user authentication and session management
3. **Real-time Updates**: Add WebSocket support for live notifications
4. **Testing**: Add comprehensive test suite (Jest, React Testing Library)
5. **Monitoring**: Add error tracking and performance monitoring
6. **Documentation**: Expand component documentation and Storybook

---

**Guardian** — Built for compliance teams who need the speed of AI with the assurance of human oversight.
