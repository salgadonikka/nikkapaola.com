/**
 * Drawer panel content for portfolio.astro.
 * Each entry maps to a data-drawer="key" attribute in the HTML.
 * body: raw HTML string injected into .drawer-content via innerHTML.
 */
export const drawerData = {
  wtw: {
    eyebrow: "Experience",
    title: "WTW Manila Global Delivery Center",
    period: "Feb 2019 - Present",
    role: "Associate Software Engineer → Lead Associate Software Engineer (+ People Manager)",
    body: `
      <p class="dr-summary">6+ years at Willis Towers Watson's Manila delivery center, contributing across the full stack of a multi-tier enterprise benefits administration platform serving pension and health clients across 100+ global organisations.</p>
      <div class="dr-section">
        <div class="dr-section-title">Career progression</div>
        <div class="dr-progression">
          <div class="dr-prog-item"><span class="dr-prog-year">Feb 2019</span><span class="dr-prog-role">Associate Software Engineer</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Mar 2022</span><span class="dr-prog-role">+ People Manager (concurrent)</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Apr 2024</span><span class="dr-prog-role">Lead Associate Software Engineer</span></div>
        </div>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">What I worked on</div>
        <ul class="dr-list">
          <li><strong>Pension payment workflow</strong> - contributed across backend, admin, and self-service portal surfaces for multiple phases of a fully redesigned pension payment feature. Received significant praise from client teams at launch.</li>
          <li><strong>Death processing enhancements</strong> - major design enhancement and frontend update to the death processing workflow; received team recognition for this work.</li>
          <li><strong>Audit data export</strong> - diagnosed and redesigned a critically slow export pipeline. Runtime dropped from 45 minutes to 20 seconds (135× improvement), with significant reductions in I/O and CPU usage.</li>
          <li>Sustained contributions across the broader platform: communications, batch processes, case management, document generation, data exports, and reports.</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">As a manager (from Mar 2022)</div>
        <p>Led an APAC shift development team - conducting 1:1s, performance evaluations, goal-setting, and coaching. Also stepped in as acting Scrum Master, SDET, and Technical Writer during transition periods to maintain delivery continuity.</p>
      </div>
      <div class="dr-stack">.NET Framework 4.8 · ASP.NET WebForms · ASP.NET MVC · ASP.NET Web API · React · TypeScript · SQL Server · SSIS · SSRS · Azure · NUnit · Selenium · Azure DevOps</div>
    `,
  },

  deltek: {
    eyebrow: "Experience",
    title: "Deltek Systems (Philippines)",
    period: "Jan 2016 - Jan 2019",
    role: "Software Engineer — R&D & Automation",
    body: `
      <p class="dr-summary">Three years on Deltek's internal R&D team, building automation tooling and developer productivity applications from the ground up. Two of the applications developed here were adopted company-wide.</p>
      <div class="dr-section">
        <div class="dr-section-title">What I built</div>
        <ul class="dr-list">
          <li><strong>Single Sign-On</strong> - lead developer on a company-wide SSO pilot; one of two major R&amp;D initiatives delivered by the team</li>
          <li><strong>Test Results Manager</strong> - a centralized results tracking application for QA engineers across Deltek products</li>
          <li><strong>Test Runner</strong> - contributed enhancements to an in-house automation tool that ran automated tests against the majority of Deltek's product suite</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Support &amp; leadership</div>
        <ul class="dr-list">
          <li>Lead support contact for Test Runner across an average of 5 Software Engineers and multiple QA leads</li>
          <li>Delivered bug fixes for product-specific automation issues; unblocked QA teams on test execution roadblocks</li>
          <li>Conducted code reviews and led onboarding and training for new hires</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">What this taught me</div>
        <p>Building tools for other developers forces a different standard - the API has to be obvious, the errors have to be useful, and the thing has to keep working when you're not in the room. This is where I learned to write for maintainability, not just correctness.</p>
      </div>
      <div class="dr-stack">C# · .NET Framework · Selenium WebDriver · Coded UI · SQL Server · MSTest</div>
    `,
  },

  eastwest: {
    eyebrow: "Experience",
    title: "EastWest Banking Corporation",
    period: "Jul 2012 - Jan 2016",
    role: "IT Management Trainee → Programmer-Analyst → Asst. Manager",
    body: `
      <p class="dr-summary">First professional role, starting as part of EastWest's competitive IT management trainee program and progressing to Assistant Manager. Spent most of this time on the Core Banking Transformation project — one of the largest system migrations in the bank's history.</p>
      <div class="dr-section">
        <div class="dr-section-title">Career progression</div>
        <div class="dr-progression">
          <div class="dr-prog-item"><span class="dr-prog-year">Jul 2012</span><span class="dr-prog-role">IT Management Trainee (ranked 5th overall)</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Aug 2013</span><span class="dr-prog-role">Programmer/Analyst - Junior Officer</span></div>
          <div class="dr-prog-item"><span class="dr-prog-year">Jan 2015</span><span class="dr-prog-role">Programmer/Analyst - Assistant Manager</span></div>
        </div>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Core Banking Transformation (Jul 2013 - Nov 2014)</div>
        <ul class="dr-list">
          <li>Participated in functional and technical testing of Temenos T24 during the bank's migration from its legacy core banking system</li>
          <li>Developed a stored procedure used in the migration of Auto Loans Add-On data</li>
          <li>Performed Unit, System Integration, and Performance Testing on selected interfaces connecting third-party systems to T24</li>
          <li>Coordinated with business users on User Acceptance Testing of T24 and selected interfaces</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Day-to-day work</div>
        <ul class="dr-list">
          <li>Investigated and resolved production issues on the T24 core banking system; reported to the vendor when needed</li>
          <li>Developed, tested, and promoted data fixes to production under change management protocols</li>
          <li>Designed and built internal applications using jBase and C# on the T24 platform</li>
          <li>Developed a streamlined testing process for fix promotion that improved efficiency and reduced production incidents</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">What this gave me</div>
        <p>Banking sets a high bar for correctness - production issues in a core banking system affect real accounts. Working under those constraints shaped how I think about data integrity, change management, and what "done" really means in a regulated environment.</p>
      </div>
      <div class="dr-stack">C# · .NET Framework · SQL Server · Temenos T24 · jBase · SSRS</div>
    `,
  },

  emerson: {
    eyebrow: "Internship",
    title: "Emerson Process Management",
    period: "Apr 2012 - Jun 2012",
    role: "Software Developer Intern",
    body: `
      <p class="dr-summary">Three-month internship at Emerson's Power and Water Solutions division, building two standalone applications as part of the intern program.</p>
      <div class="dr-divider"></div>
      <div class="dr-section">
        <div class="dr-section-title">What I built</div>
        <ul class="dr-list">
          <li><strong>Arduino Interface App</strong> - a Windows desktop application that communicated with an external Arduino device, reading and displaying hardware signals</li>
          <li><strong>Mobile Chat App</strong> - a chat application built for the Android platform</li>
        </ul>
      </div>
      <div class="dr-stack">C# · .NET Framework · Java (Android) · Arduino</div>
    `,
  },

  mapua: {
    eyebrow: "Education",
    title: "Mapua Institute of Technology",
    period: "Jul 2007 - Aug 2012",
    role: "B.S. Computer Engineering",
    body: `
      <p class="dr-summary">Bachelor of Science in Computer Engineering with a specialization in the Microsoft .NET Framework. Now known as Mapua University.</p>
      <div class="dr-divider"></div>
      <div class="dr-section">
        <div class="dr-section-title">Specialization</div>
        <p>Microsoft .NET Framework - coursework focused on enterprise software development patterns and the Windows application stack.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Thesis</div>
        <p><strong>Web-based Blood Pressure and Electrocardiogram Monitoring System</strong></p>
        <p style="margin-top:8px">A hardware-software integration project that read vital signs from sensors and presented real-time data through a web interface. Combined embedded systems, signal processing, and web development.</p>
      </div>
      <div class="dr-stack">C# · ASP.NET · .NET Framework · Embedded Systems</div>
    `,
  },

  "benefits-platform": {
    eyebrow: "Project - Enterprise",
    title: "Benefits Outsourcing Platform",
    subtitle: "WTW Manila Global Delivery Center",
    body: `
      <p class="dr-summary">Enterprise React + ASP.NET Core web platform for pension and health benefits administration. Served 100+ global corporate clients over 6+ years of production. Proprietary - detailed architecture available in interviews.</p>
      <div class="dr-section">
        <div class="dr-section-title">What I contributed</div>
        <ul class="dr-list">
          <li>Full-stack feature development: React UI components, ASP.NET Core API endpoints, SQL Server data layer</li>
          <li>Diagnosed and resolved 135× pipeline bottleneck (N+1 + large-row SSIS query pattern)</li>
          <li>Code review ownership as lead - set standards for the team's React and .NET patterns</li>
          <li>Onboarded and mentored 8 engineers; managed growth plans and performance reviews</li>
          <li>OAuth2 / OIDC integration for client SSO requirements across 100+ enterprise tenants</li>
        </ul>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Architecture (non-proprietary)</div>
        <p>Multi-tenant SPA (React) consuming a .NET Core REST API backed by SQL Server. Azure DevOps CI/CD with NUnit test coverage. SSIS pipelines for scheduled bulk data loads. SSRS for client-facing benefit statements.</p>
      </div>
      <div class="dr-stack">ASP.NET Core · React · TypeScript · SQL Server · Azure DevOps · NUnit · SSIS · SSRS · OAuth2</div>
    `,
  },

  tamelo: {
    eyebrow: "Project — Personal",
    title: "Tamelo App &amp; API",
    github: "https://github.com/salgadonikka/tamelo",
    body: `
      <p class="dr-summary">A weekly task planner built to explore modern .NET + React architecture outside of enterprise constraints. Tasks are assigned to days of the week using a circular state machine with four states.</p>
      <div class="dr-section">
        <div class="dr-section-title">Why I built it</div>
        <p>I wanted a project where I make all architecture decisions myself — no legacy patterns, no inherited constraints. Tamelo is where I explore ASP.NET Core 10 preview features, Supabase, and React 18 concurrent features in a real deployment.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Technical decisions</div>
        <ul class="dr-list">
          <li>ASP.NET Core 10 Web API, built with Clean Architecture, MediatR for CQRS, FluentValidation, and EF Core as the ORM</li>
          <li>Supabase for authentication (email/password + Google OAuth) and PostgreSQL hosting. The API validates Supabase-issued JWTs and handles all data access via EF Core</li>
          <li>React 18 with TypeScript; state managed with Zustand for simplicity over Redux</li>
          <li>Circular task state: Pending → In Progress → Done → Skipped → Pending</li>
        </ul>
      </div>
      <div class="dr-stack">React 18 · TypeScript · ASP.NET Core 10 · Supabase · PostgreSQL · Zustand</div>
      <a href="https://github.com/salgadonikka/tameloapp" target="_blank" rel="noopener" class="dr-github">View on GitHub →</a>
    `,
  },

  mymedstory: {
    eyebrow: "Project — Personal",
    title: "MyMedStory",
    github: "https://github.com/salgadonikka/mymedstory",
    body: `
      <p class="dr-summary">A private cloud-hosted health intelligence platform for personal medical records. Transforms scattered documents and lab results into a unified, searchable timeline with AI-assisted summaries.</p>
      <div class="dr-section">
        <div class="dr-section-title">The problem it solves</div>
        <p>Medical history is fragmented — PDFs from different hospitals, lab results in different formats, no single source of truth. MyMedStory ingests documents, extracts structured data, and presents a chronological health timeline with AI context.</p>
      </div>
      <div class="dr-section">
        <div class="dr-section-title">Architecture</div>
        <ul class="dr-list">
          <li>.NET 8 API with Hangfire for background document processing jobs</li>
          <li>Next.js 14 web app (App Router) + React Native mobile sharing a single API</li>
          <li>Cloudflare R2 for document storage — zero egress cost vs S3</li>
          <li>PostgreSQL via Supabase with full-text search over extracted medical data</li>
          <li>AI summarisation layer for lab result interpretation</li>
        </ul> 
      </div>
      <div class="dr-stack">.NET 8 · Next.js 14 · React Native · PostgreSQL · Cloudflare R2 · Hangfire</div>
      <a href="https://github.com/salgadonikka/mymedstory" target="_blank" rel="noopener" class="dr-github">View on GitHub →</a>
    `,
  },
};
