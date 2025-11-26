#!/usr/bin/env bun
/**
 * Generate resume.tex and RESUME.md from resume-data.json
 * Run: bun run scripts/generate-resume.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");
const data = JSON.parse(readFileSync(join(ROOT, "resume-data.json"), "utf-8"));

// Helper to escape LaTeX special characters
function escapeLatex(text: string): string {
  return text
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/→/g, "$\\rightarrow$");
}

// Generate LaTeX
function generateLatex(): string {
  const projects = data.projects
    .map((p: any) => {
      const urlPart = p.url
        ? ` $|$ \\href{${p.url}}{\\underline{${p.url.replace("https://", "")}}}`
        : "";
      return `      \\resumeProjectHeading
          {\\textbf{${escapeLatex(p.name)}}${urlPart} $|$ \\emph{${p.tech.join(", ")}}}{}
          \\resumeItemListStart
            \\resumeItem{${escapeLatex(p.description)}}
          \\resumeItemListEnd`;
    })
    .join("\n\n");

  const experience = data.experience
    .map((job: any) => {
      const achievements = job.achievements
        .map((a: string) => `        \\resumeItem{${escapeLatex(a)}}`)
        .join("\n");
      return `    \\resumeSubheading
      {${escapeLatex(job.title)}}{${job.period}}
      {${escapeLatex(job.company)}}{}
      \\resumeItemListStart
${achievements}
      \\resumeItemListEnd`;
    })
    .join("\n\n");

  const awards = data.awards
    .map((award: any) => {
      return `      \\resumeProjectHeading
          {\\textbf{${escapeLatex(award.title)}} $|$ \\emph{${escapeLatex(award.project)}}}{}
          \\resumeItemListStart
            \\resumeItem{${escapeLatex(award.description)}}
          \\resumeItemListEnd`;
    })
    .join("\n\n");

  const education = data.education
    .map((edu: any) => {
      const detail = edu.detail
        ? `
      \\resumeItemListStart
        \\resumeItem{${escapeLatex(edu.detail)}}
      \\resumeItemListEnd`
        : "";
      return `    \\resumeSubheading
      {${escapeLatex(edu.school)}}{${edu.period}}
      {${escapeLatex(edu.degree)}}{${escapeLatex(edu.location)}}${detail}`;
    })
    .join("\n");

  return `%-------------------------
% Resume in LaTeX
% Based on Nicholas Russo's Pages resume layout
%------------------------

\\documentclass[letterpaper,10pt]{article}

\\usepackage{latexsym}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{xcolor}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{fontspec}
\\setmainfont{Inter}

% Page setup
\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Spacing constants for uniformity
\\newcommand{\\sectionSpaceAbove}{-10pt}
\\newcommand{\\sectionSpaceBelow}{-4pt}
\\newcommand{\\afterListSpace}{-2pt}
\\newcommand{\\afterHeadingSpace}{-5pt}
\\newcommand{\\betweenItemsSpace}{-8pt}
\\newcommand{\\nestedListTopSpace}{3pt}

% Section formatting
\\titleformat{\\section}{
  \\vspace{\\sectionSpaceAbove}\\scshape\\raggedright\\large\\color{blue}
}{}{0em}{}[\\color{blue}\\titlerule \\vspace{\\sectionSpaceBelow}]

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item{
    {#1 \\vspace{-1pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{@{}l@{\\extracolsep{\\fill}}r@{}}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{\\afterHeadingSpace}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{\\textwidth}{@{}l@{\\extracolsep{\\fill}}r@{}}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{\\afterHeadingSpace}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}, itemsep=\\betweenItemsSpace]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}\\vspace{\\afterListSpace}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.2in, itemsep=0pt, topsep=\\nestedListTopSpace]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{\\afterListSpace}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\huge \\scshape ${data.name}} \\\\ \\vspace{2pt}
    \\small ${data.email} $|$
    \\href{https://${data.github}}{${data.github}} $|$
    \\href{https://${data.website}}{${data.website}}
\\end{center}
\\vspace{-8pt}

%-----------SKILLS-----------
\\section{Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: ${data.skills.languages.join(", ")}} \\\\[2pt]
     \\textbf{Backend/APIs}{: ${data.skills.backend.join(", ")}} \\\\[2pt]
     \\textbf{Infrastructure}{: ${escapeLatex(data.skills.infrastructure.join(", "))}} \\\\[2pt]
     \\textbf{Databases}{: ${data.skills.databases.join(", ")}} \\\\[2pt]
     \\textbf{Tools}{: ${data.skills.tools.join(", ")}}
    }}
\\end{itemize}

%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart

${projects}

    \\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart

${experience}

  \\resumeSubHeadingListEnd

%-----------AWARDS-----------
\\section{Awards}
    \\resumeSubHeadingListStart
${awards}
    \\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${education}
  \\resumeSubHeadingListEnd

%-------------------------------------------
\\end{document}
`;
}

// Generate Markdown
function generateMarkdown(): string {
  const projects = data.projects
    .map((p: any) => {
      const urlLine = p.url
        ? `[${p.url.replace("https://", "")}](${p.url}) | `
        : "";
      return `### ${p.name}
${urlLine}${p.tech.join(", ")}

${p.description}.`;
    })
    .join("\n\n");

  const experience = data.experience
    .map((job: any) => {
      const achievements = job.achievements.map((a: string) => `- ${a}`).join("\n");
      return `### ${job.title} | ${job.company}
*${job.period}*

${achievements}`;
    })
    .join("\n\n");

  const awards = data.awards
    .map((award: any) => {
      return `### ${award.title}
*${award.project}*

${award.description}.`;
    })
    .join("\n\n");

  const education = data.education
    .map((edu: any) => {
      const detail = edu.detail ? `\n- ${edu.detail}` : "";
      return `### ${edu.school}
${edu.degree} | ${edu.location} | ${edu.period}${detail}`;
    })
    .join("\n\n");

  return `# ${data.name}

${data.email} | [${data.github}](https://${data.github}) | [${data.website}](https://${data.website})

## Skills

**Languages:** ${data.skills.languages.join(", ")}

**Backend/APIs:** ${data.skills.backend.join(", ")}

**Infrastructure:** ${data.skills.infrastructure.join(", ")}

**Databases:** ${data.skills.databases.join(", ")}

**Tools:** ${data.skills.tools.join(", ")}

## Projects

${projects}

## Experience

${experience}

## Awards

${awards}

## Education

${education}
`;
}

// Write files
const latex = generateLatex();
const markdown = generateMarkdown();

writeFileSync(join(ROOT, "resume.tex"), latex);
writeFileSync(join(ROOT, "RESUME.md"), markdown);

console.log("Generated resume.tex and RESUME.md from resume-data.json");
