"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { MapPin, Mail, Linkedin, Download, Phone, Terminal, Layers, ShieldCheck, Cpu, ChevronDown, GraduationCap, Briefcase, ExternalLink, Code2 } from "lucide-react";

const DATA = {
  basics: {
    name: "Danush Kanchi",
    title: "SRE/DevOps Engineer",
    summary: "SRE/DevOps Engineer with 2+ years of production experience at Elsevier managing AWS cloud infrastructure for 6-8 regulated healthcare platforms across APAC. Hands-on expertise in Terraform, CI/CD automation, observability, and incident response. Currently pursuing MSCS at UMass Amherst (Distributed Systems, OS). Seeking SRE/DevOps internship or full-time roles.",
    location: "Amherst, MA",
    email: "dkanchi@umass.edu",
    phone: "+1 (413) 430-9092",
    links:["linkedin.com/in/danushkanchi"]
  },
  achievements:[
    { metric: "~40%", context: "Cut CI/CD overhead by eliminating dedicated runner EC2 instances via GitHub Actions and AWS SSM." },
    { metric: "~30%", context: "Reduced MTTD (mean time to detect) incidents by establishing golden signal observability." },
    { metric: "~8 hrs/w", context: "Eliminated manual key management effort by automating credential rotation via Lambda." },
    { metric: "99.9%+", context: "Maintained service uptime through active on-call incident triage and automated recovery." }
  ],
  experience:[
    {
      company: "Elsevier",
      role: "Systems Engineer II - Cloud/DevOps",
      dates: "Aug 2024 - Jan 2026",
      location: "APAC / Remote",
      bullets:[
        "Standardized cloud infrastructure across dev, staging, and prod environments using Terraform, Terragrunt (Fulcrum pattern), Ansible, and Docker; reduced configuration drift across 3 environments and improved deployment reliability.",
        "Architected CI/CD pipelines with GitHub Actions and AWS SSM to automate build, deployment, and rolling instance refresh workflows, eliminating dedicated runner EC2 instances and cutting CI/CD overhead by ~40%.",
        "Integrated Cloudflare WAF and CDN for traffic filtering and content delivery optimization, improving application latency and perimeter security for regulated healthcare platforms.",
        "Established golden signal observability (latency, traffic, errors, saturation) using New Relic APM, centralized logging, and synthetic uptime checks, reducing mean time to detect (MTTD) incidents by ~30%.",
        "Resolved production Solr performance bottlenecks by isolating search workloads on a dedicated Linux instance, improving reliability during peak traffic.",
        "Led third-party risk compliance (DIRP, SRP, PRP) and coordinated secure production Go-live releases; developed reusable IaC modules standardizing provisioning patterns across 6+ applications."
      ]
    },
    {
      company: "Elsevier",
      role: "Systems Engineer I - Cloud/DevOps",
      dates: "Aug 2023 - Aug 2024",
      location: "APAC / Remote",
      bullets:[
        "Managed AWS infrastructure (EC2, RDS, IAM, S3, CloudWatch, Lambda) for 6-8 healthcare platforms in APAC, maintaining high availability and fault tolerance across production workloads.",
        "Automated credential and key rotation using Python-based Lambda with API Gateway, EventBridge, CloudWatch, and SES, eliminating ~8 hrs/week of manual key management effort.",
        "Consolidated CI/CD runners across repositories and implemented rolling EC2 deployments via launch template updates, reducing redundant compute usage by ~25%.",
        "Managed RDS (MS SQL) deployments on Linux and Windows environments; handled schema updates, access control, and SSL certificate lifecycle management.",
        "Participated in on-call rotations and incident triage, contributing to 99.9%+ service uptime; authored deployment runbooks and architecture docs adopted by 3+ teams."
      ]
    }
  ],
  projects:[
    {
      title: "Kubernetes Auto-Scaling & Observability Platform",
      stack: ["GKE", "Prometheus", "Grafana"],
      bullets: "Deployed containerized app with Horizontal Pod Autoscaler, Prometheus metrics, and Grafana dashboards demonstrating production-grade SRE practices. (In Progress)"
    },
    {
      title: "YouTube Transcript Summarizer",
      stack:["Python", "T5", "Chrome Extension"],
      bullets: "Built a Chrome extension using Transformer-based T5 model to generate multilingual video summaries from YouTube transcripts."
    },
    {
      title: "Cook-Curry Recipe Platform",
      stack: ["PostgreSQL", "Angular"],
      bullets: "Full-stack recipe app with ingredient-based recommendation engine and cuisine-based filtering."
    }
  ],
  skills:[
    { group: "Languages", items: ["Python", "SQL", "C/C++", "Java"] },
    { group: "Cloud Platform", items:["AWS (EC2, RDS, IAM, S3, CloudWatch, Lambda, API Gateway, EventBridge, SES, SSM)"] },
    { group: "DevOps & IaC", items:["Terraform", "Terragrunt", "Docker", "Ansible", "GitHub Actions", "CI/CD", "Packer"] },
    { group: "Monitoring & SRE", items:["New Relic APM", "Cloudflare WAF/CDN", "Golden Signal Monitoring", "Observability", "Incident Response"] },
    { group: "Systems & Web", items:["Linux/Unix", "PowerShell", "PostgreSQL", "MongoDB", "MySQL", "React.js", "Node.js", "REST APIs"] }
  ],
  education:[
    {
      institution: "University of Massachusetts, Amherst",
      degree: "M.S. Computer Science",
      dates: "Jan 2026 - Expected Dec 2027",
      extra: "Coursework: Distributed Systems, Operating Systems, System Defense, Machine Learning"
    },
    {
      institution: "Visvesvaraya Technological University, India",
      degree: "B.E. Information Science and Engineering",
      dates: "May 2019 - May 2023",
      extra: "GPA: 9.35/10.0 | Rank: 2nd | Academic Excellence Award"
    }
  ],
  publications:[
    {
      title: "E-Voting System using Blockchain Technology and Homomorphic Encryption",
      venue: "IJRASET 2023",
      desc: "Proposed a secure, transparent voting system using Blockchain, AES with Homomorphic encryption, and cloud storage."
    }
  ],
  certifications:["AWS Machine Learning (2021)", "IBM Data Science Specialization (2021)"]
};

const HighlightText = ({ text }: { text: string }) => {
  const parts = text.split(/(~\d+%|~\d+\s?hrs\/week|\d+\.\d+%\+)/g);
  return (
    <p className="text-slate-300 text-sm leading-relaxed mb-3">
      <span className="text-cyan-400 mr-2">&gt;</span>
      {parts.map((part, i) => 
        part.match(/(~\d+%|~\d+\s?hrs\/week|\d+\.\d+%\+)/) ? (
          <span key={i} className="text-cyan-300 font-semibold bg-cyan-900/30 px-1 py-0.5 rounded">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, shouldReduceMotion ? -12 : -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);
  const motionY = shouldReduceMotion ? 10 : 24;
  const motionDuration = shouldReduceMotion ? 0.3 : 0.55;
  const itemMotionDuration = shouldReduceMotion ? 0.25 : 0.45;
  const motionStagger = shouldReduceMotion ? 0.03 : 0.06;
  const interactiveSpring = shouldReduceMotion
    ? { duration: 0.2 }
    : { type: "spring" as const, stiffness: 260, damping: 18 };
  const linkSpring = shouldReduceMotion
    ? { duration: 0.2 }
    : { type: "spring" as const, stiffness: 280, damping: 20 };

  const replayViewport = { once: false, amount: 0.28 };
  const sectionReveal = {
    hidden: { opacity: 0, y: motionY },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: motionDuration, ease: "easeOut" as const },
    },
  };
  const listStagger = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionStagger,
        delayChildren: shouldReduceMotion ? 0.02 : 0.05,
      },
    },
  };
  const itemReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 8 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: itemMotionDuration, ease: "easeOut" as const },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  },[]);

  const downloadResume = () => window.print();

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8"
          >
            DK
          </motion.div>
          <div className="w-48 h-[2px] bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />
          </div>
        </motion.div>
      ) : (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen pb-24"
        >
          <motion.div className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300" style={{ scaleX: progressScaleX }} />

          <motion.section
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center max-w-5xl mx-auto"
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 left-[14%] h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl"
              animate={shouldReduceMotion ? undefined : { y: [0, -12, 0], opacity: [0.45, 0.65, 0.45] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute top-20 right-[12%] h-36 w-36 rounded-full bg-blue-500/10 blur-2xl"
              animate={shouldReduceMotion ? undefined : { y: [0, 14, 0], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold uppercase tracking-wider border rounded-full text-cyan-400 border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
              >
                <MapPin size={14} /> {DATA.basics.location}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.55 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
              >
                {DATA.basics.name}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.55 }}
                className="text-xl md:text-3xl text-slate-300 font-light mb-6 flex items-center justify-center gap-3"
              >
                <Terminal className="text-cyan-500" /> {DATA.basics.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46, duration: 0.6 }}
                className="max-w-3xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed mb-10"
              >
                {DATA.basics.summary}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54, duration: 0.55 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
              >
                <motion.a
                  href="#experience"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={interactiveSpring}
                  className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  View Experience
                </motion.a>
                <motion.button
                  onClick={downloadResume}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={interactiveSpring}
                  className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold border border-slate-700 rounded-lg bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                  Download Resume
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-4 md:gap-8 text-slate-400"
              >
                <motion.a
                  href={`mailto:${DATA.basics.email}`}
                  whileHover={{ y: -2 }}
                  transition={linkSpring}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md"
                >
                  <Mail size={16} /> {DATA.basics.email}
                </motion.a>
                <motion.a
                  href={`tel:${DATA.basics.phone}`}
                  whileHover={{ y: -2 }}
                  transition={linkSpring}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md"
                >
                  <Phone size={16} /> {DATA.basics.phone}
                </motion.a>
                <motion.a
                  href={`https://${DATA.basics.links[0]}`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  transition={linkSpring}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md"
                >
                  <Linkedin size={16} /> LinkedIn
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.section
            className="max-w-6xl mx-auto px-6 mb-24"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
          >
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={listStagger}>
              {DATA.achievements.map((achieve, idx) => (
                <motion.div 
                  variants={itemReveal}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  key={idx} 
                  className="p-5 border border-white/10 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm group hover:border-cyan-500/30 transition-all"
                >
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 drop-shadow-md">
                    {achieve.metric}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{achieve.context}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            id="experience"
            className="max-w-4xl mx-auto px-6 py-12"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
          >
            <motion.div
              className="sticky top-20 z-20 -mx-2 mb-10 flex items-center gap-3 rounded-xl bg-slate-950/70 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/55"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45 }}
            >
              <Briefcase className="text-cyan-400" size={28} />
              <h3 className="text-3xl md:text-4xl font-bold">Experience</h3>
            </motion.div>
            <div className="relative border-l border-slate-800 ml-3 md:ml-4 space-y-8">
              {DATA.experience.map((job, idx) => {
                const isExpanded = expandedJob === idx;
                const jobPanelId = `experience-panel-${idx}`;
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    whileHover={{ y: -3 }}
                    transition={{ delay: idx * 0.08, duration: 0.35, type: "spring", stiffness: 170, damping: 20 }}
                    key={idx} 
                    className="relative pl-8 md:pl-12"
                  >
                    <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={jobPanelId}
                      onClick={() => setExpandedJob(isExpanded ? null : idx)}
                      className="w-full p-1 text-left cursor-pointer group rounded-2xl border border-transparent hover:border-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <div className="p-5 md:p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md relative overflow-hidden">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{job.role}</h4>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-slate-400">
                              <span className="font-semibold text-cyan-400">{job.company}</span>
                              <span className="hidden sm:block text-slate-600">|</span>
                              <span className="bg-slate-800/50 px-2 py-0.5 rounded-md">{job.dates}</span>
                            </div>
                          </div>
                          <ChevronDown className={`text-slate-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              id={jobPanelId}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-6"
                            >
                              <div className="pt-4 border-t border-white/10 flex flex-col gap-1">
                                {job.bullets.map((bullet, i) => (
                                  <HighlightText key={i} text={bullet} />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="max-w-6xl mx-auto px-6 py-20"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
          >
            <motion.div
              className="sticky top-20 z-20 -mx-2 mb-10 flex items-center gap-3 rounded-xl bg-slate-950/70 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/55"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45 }}
            >
              <Code2 className="text-cyan-400" size={28} />
              <h3 className="text-3xl md:text-4xl font-bold">Projects</h3>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {DATA.projects.map((project, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  key={idx}
                  className="flex flex-col p-6 border border-white/10 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] hover:-translate-y-1 transition-all"
                >
                  <h4 className="text-lg font-bold text-white mb-3 flex items-start justify-between">
                    {project.title}
                    <ExternalLink size={16} className="text-slate-500 shrink-0 mt-1" />
                  </h4>
                  <p className="text-sm text-slate-400 flex-grow mb-6 leading-relaxed">
                    {project.bullets}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 text-xs font-medium border border-cyan-500/20 rounded bg-cyan-500/5 text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="max-w-6xl mx-auto px-6 py-12"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
          >
            <motion.div
              className="sticky top-20 z-20 -mx-2 mb-10 flex items-center gap-3 rounded-xl bg-slate-950/70 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/55"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45 }}
            >
              <Cpu className="text-cyan-400" size={28} />
              <h3 className="text-3xl md:text-4xl font-bold">Technical Skills</h3>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DATA.skills.map((skillGroup, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -4, borderColor: "rgba(56, 189, 248, 0.35)" }}
                  className="p-6 border border-white/5 rounded-2xl bg-white/[0.02] transition-colors"
                >
                  <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-semibold">{skillGroup.group}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(skill => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.04 }}
                        className="px-3 py-1.5 text-sm border border-slate-700/50 rounded-lg bg-slate-800/30 text-slate-200 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="max-w-6xl mx-auto px-6 py-20"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={replayViewport}
          >
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <motion.div
                  className="sticky top-20 z-20 -mx-2 mb-8 flex items-center gap-3 rounded-xl bg-slate-950/70 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/55"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45 }}
                >
                  <GraduationCap className="text-cyan-400" size={28} />
                  <h3 className="text-3xl font-bold">Education</h3>
                </motion.div>
                <div className="space-y-6">
                  {DATA.education.map((edu, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 border border-white/5 rounded-2xl bg-white/[0.02]"
                    >
                      <h4 className="text-lg font-bold text-white">{edu.institution}</h4>
                      <p className="text-cyan-400 font-medium text-sm mt-1 mb-3">{edu.degree}</p>
                      <div className="flex flex-col gap-2 text-sm text-slate-400">
                        <span>{edu.dates}</span>
                        <span className="px-3 py-2 bg-black/20 rounded-md border border-white/5">{edu.extra}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <motion.div
                    className="sticky top-20 z-20 -mx-2 mb-8 flex items-center gap-3 rounded-xl bg-slate-950/70 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/55"
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Layers className="text-cyan-400" size={28} />
                    <h3 className="text-2xl font-bold">Publications</h3>
                  </motion.div>
                  {DATA.publications.map((pub, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 border-l-2 border-cyan-500 bg-cyan-500/5 rounded-r-2xl"
                    >
                      <h4 className="font-bold text-white leading-snug mb-2">{pub.title}</h4>
                      <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded mb-3 font-semibold">{pub.venue}</span>
                      <p className="text-sm text-slate-400 leading-relaxed">{pub.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <motion.div
                    className="sticky top-20 z-20 -mx-2 mb-8 flex items-center gap-3 rounded-xl bg-slate-950/70 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/55"
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45 }}
                  >
                    <ShieldCheck className="text-cyan-400" size={28} />
                    <h3 className="text-2xl font-bold">Certifications</h3>
                  </motion.div>
                  <ul className="space-y-3">
                    {DATA.certifications.map((cert, idx) => (
                      <motion.li
                        key={cert}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: idx * 0.08 }}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-3 text-sm text-slate-300 p-4 border border-white/5 rounded-xl bg-white/[0.01]"
                      >
                        <div className="mt-1 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <span>{cert}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </motion.section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}