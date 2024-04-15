# Project Architecture

This is a guide for the layout of the website. It will be used to guide my thinking of how to organize the site, cite resources I used to make the site, and will eventually be transformed into a guide on forking and editing the site for other users.

Some key deliverables for the site are:

- Website should be able to explain to a user what I do and how to contact me as quickly as possible when the user visits a page.
- The website should be easy to navigate for landscape and portrait layouts, as well as both mobile and desktop environments. This is done because I anticipate a high percentage of users of the site will first see the site on their phone.
- The website should be completely static. This is to remove client-side load and eliminate the chance someone leaves the site before it can load.
- This repo should be relatively easy for a user who forks it to add their own info and make the site their own
  - All Homepage components are either rendered from markdown files, or a guide will be added in the README.md to edit the other components like skills/projects.

## Homepage

The Site should display a simple homepage outlining my professional skills and projects. This is broken up into 2 categories:

1. A heading section that gives a quick look at who I am and what I do
2. An in-depth look at my experience and skills

The first section should be what the eye is drawn to first on the page, so recruiters who just glance at the site will see this first and only dig further if they need to. The in-depth section should be more accessible than my current site, and will therefore be added to the homepage as a scrollable element, with additional static pages as the depth of a user's search increases(homepage->scroll list of projects->project page for the individual project->links on that page to github repo/demo on youtube).

### 1. Heading Section

The heading section will include:

- Name
- Education Overview(Major/Minor)
- 1 sentence explaining what I do
- Expected Grad. Date
- Links to contact/connect on linkedin/github
  - Images for links are found here: https://github.com/dBCooper2/social-icons
- Headshot

These will be combined into a single React component, named something like Summary or Introduction

### 2. Resume Section

The Resume section will be individual React components of a resume's section. These are:

- Abstract/Executive Summary
- Education
- Work Experience
- Skills
- Projects
- Research
- Articles

The Abstract, Education and Work Experience Sections will all be loaded from markdown files. This is done so a fork of the project can quickly copy and paste their info from LinkedIn into the markdown files and format the info to reduce the complexity of making the site their own. This is done by statically loading the content of the Abstract, Education and Experience file contents in the page.tsx file and then inserting them into the page

#### 2.a. Abstract

This should be a simple container with a block clearly outlining where someone could paste their linkedin abstract or type their own

[File](link-to-file)

#### 2.b. Education

Education should be similar to the abstract section where a user just drops a string of their info in, but break it up so headings are used and it's not in paragraph format

[File](link-to-file)

#### 2.c. Work Experience

Work experience should be a list of job experiences within the getStaticProps() function that are then loaded programmatically, so there isn't a huge html block in the component.

[File](link-to-file)

#### 2.d. Skills

Skills borrow formatting from the last project, [dBCooper.io](https://github.com/dBCooper2/dBCooper.io). The skills section will have bubbles of each skill that when clicked, takes a visitor to a page with a list of projects/blog posts, filtered to only show the skill that visitor clicked.

[File](link-to-file)

#### 2.e. Projects

Projects should be a series of cards that provide a high-level overview of a project so someone unfamiliar can understand the scope of the project. Relevant links, demos and images(if found to be useful) should be attached.

[File](link-to-file)

#### 2.f. Research

If the user is involved in research, project cards should be copied and edited slightly to link to scholarly articles. However, I am not currently involved in research, so I will not be adding this.

[File](link-to-file)

#### 2.g. Articles

These are cards of 'blog posts' that I am adding to show what I am working on in personal projects, the same way a Medium Article might be on an e-portfolio. This is to reduce complexity so a visitor doesn't need to dig into github repositories, and can instead view my writing within the e-portfolio.

From the last project, a mix of React-Markdown, Remark and Rehype will be used to render the content. This page will be added once the homepage is completed.

[File](link-to-file)

## General Layout:

Within the Site, the following should be present:

- Switch to toggle between light and dark mode(like in the last portfolio, re-make the solarish light and dark themes)
- Footer that states this was built by me to show I'm not just using Wix, and add a link to the repository
