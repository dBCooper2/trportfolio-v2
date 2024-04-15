# nextjs-portfolio-site: Sample Professional Portfolio

A Professional Portfolio built with NextJS and deployed using Vercel.

## Functionality

This website is meant to be taken and deployed by you, the reader, without needing a subscription to any no-code tools like Wix, Weebly, etc., and an easy project to dip your toes into NextJS, Tailwind and Vercel without needing to build something huge.

## Site Customization: Resume Content

To customize this portfolio for yourself, you will need to edit some markdown files, some JSON files, and do a little configuring with the JavaScript Files (not much though). This section covers editing the Markdown and JSON data for your resume.

### You will need:

- A resume (I copied mine from my Linkedin Profile) containing:
  - An Abstract/Summary
  - Education
  - Work Experience
  - Certificates and Licenses
  - Research Experience
  - Skills
  - Projects
- A headshot or profile picture to add to the site
- a PNG file to use as the icon for your website(you can always create one from a generator like [Favicon.io](https://favicon.io/), which is what I did)

If you do not have one or more of these, don't worry, there will be alternate steps for removing or creating this content later.

### Editing the Markdown Files

Using Markdown Files to store your resume information is very convenient, because an update to your resume doesn't require any coding, just an edit to the markdown files and a push to GitHub.

The following files need to be edited to contain your info, and can be found in the directory `/src/content/`:

- Summary (`Summary.md`): This is your name, field and a sentence or two to describe yourself.

- Abstract (`Abstract.md`): This is an intro to your portfolio. Outline your story and what you're all about here so readers get an idea of who you are.

- Education (`Education.md`): This is where you can add any higher education, bootcamps, or other education experience you have.

- Work Experience (`Experience.md`): This is where you can add your previous work experience.

- Certificates (`Certificates.md`): You can include any certificates you have received here. I have added my Linkedin Learning certificates as links to the certificates online. Please follow the formatting to ensure that the links are displayed and open correctly.

- Research (`Research.md`): If you have been involved in research (I have not), this is where you can add any relevant research you have been involved in. To add this to the deployed website, make sure you un-comment the HTML and JavaScript needed to display this category in `src/app/page.tsx`.

- Footer (`Footer.md`): This is just some notes saying I made the site and what it was made with. You can either edit this or remove it, crediting me isn't important. If the file is blank nothing will render and no errors will be thrown, so you can just delete everything in here.

A file is contained in the `/src/content/` directory named `MarkdownGuide.md` that you can look at for a cheat sheet to customize the markdown files if you need to add anything extra.

### Skills and Projects

The Skills and Projects sections are slightly harder to edit, but are dynamic elements that I think look prettier than the static markdown content. The files that you will need to edit are `tags.json` and `projects.json`, also located in the `/src/content/` directory.

#### Skills:

The `tags.json` file is where you'll add your list of skills. The JSON containing the skills is in the form:

```json
{
  {
    "text":"Skill-Name-1",
    "color":"#A9A9A9"
  },
  {
    "text":"Skill-Name-2",
    "color":"#A9A9A9"
  },
  
  .
  .
  .
  
  {
    "text":"Skill-Name-N",
    "color":"#A9A9A9"
  },
}
```
The `"text"` field is where you add the name of your skill. For any skills with spaces in between them, like "Data Visualization," make sure to add a dash where the spaces would be. So for "Data Visualization," the field would be `"Data-Visualization"`.

The `"color"` field is where you can add the hex-code for a color you'd like the tag to be. By default, each tag is white with black text.

#### Projects:

The `projects.json` file is slightly more complex than the skills file, but is similarly simple to edit. The JSON containing each project is in the form:

```json
{
  "1" : {
    "title": "Project 1 Title",
    "description": "Short Description of the Project",
    "skills": ["Skill-1, Skill-2, ..., Skill-N"],
	 "code": "Link-to-Code, if any",
    "demo": "Link-to-Demo, if any"
  },
  "2" : {
    "title": "Project 2 Title",
    "description": "Short Description of the Project",
    "skills": ["Skill-1, Skill-2, ..., Skill-N"],
    "code": "Link-to-Code, if any",
    "demo": "Link-to-Demo, if any"
  },
  
  .
  .
  .
  
  "N" : {
    "title": "Project N Title",
    "description": "Short Description of the Project",
    "skills": ["Skill-1, Skill-2, ..., Skill-N"],
    "code": "Link-to-Code, if any",
    "demo": "Link-to-Demo, if any"
  }
}
```

Each field here is pretty self-explanatory, just fill in the fields, being sure to keep everything in quotes. If you need to use quotation marks, make sure to use `\"` to not escape the quotation marks too early.

The `skills` section should contain a list of skills that align with the skills in the `tags.json` file. Make sure to match the spelling and hyphens with the text in `tags.json`, so that the color of each skill matches in the projects section.

## Site Customization: Images and Metadata

To make the site your own, you should add a headshot or profile picture, and edit the metadata so the site displays your name instead of mine.

### Headshot Image:

To edit the headshot that appears on the site, simply take your headshot and add it to the `/public/images/` directory in the project. Then copy the name of the filename, and locate the file `/src/components/Summary.jsx` and locate the following code:

```jsx
<Image
  src="/images/headshot_filename.png"
  alt="My Headshot"
  width={100}
  height={100}
  className="rounded-full border-4 border-cBlock"
/>
```

Change the line `src="/images/headshot_filename.png"` to include the filename of your headshot. Please keep in mind that it must be a valid filename with _no spaces_ within it.

While you're here, you can change the alt text of the image (`alt="My Headshot"`) to your own name for accessibility, and you can also change the size of the image if you'd like it to be bigger by changing the `width` and `height` fields.

### Metadata and Website Icon:

To edit the icon that appears on a tab with your site, you need to create an icon. To do this, take the icon image you'd like to use and add it to the `/public/images/` folder. Then navigate to the file `/src/app/head.tsx` and find this section:

```tsx
<>
  <title>My NextJS Portfolio</title>
  <meta content="width=device.width, initial-scale=1" name="viewport" /
  <link rel="icon" href="/images/favicon.ico" sizes="any" />
</>
```

Change the field `filename` in the line `<link rel="icon" href="/images/favicon.ico" sizes="any" />` to the name of your icon image file. You can use a `.png`, `.ico`, or `.svg` file for this.

While you're here, edit the `<title>` tag as well to contain your name, and add something to say it's your portfolio too if you'd like.

To finish setting up the icon, you also need to navigate to the `/src/app/layout.tsx` file, and find this section:

```tsx
export const metadata: Metadata = {
  title: "My NextJS Portfolio",
  description: "My Professional Portfolio",
  icons: {
    icon: [
      {
        url: "/images/favicon.ico", // /public path
        href: "/images/favicon.ico", // /public path
      },
    ],
  },
};
```

Edit the Title and Description fields to change the metadata, and then move on to the `icons` section. Change the filenames in the fields `url` and `href` to match the filenames you just added in the `head.tsx` file.

Now your portfolio is ready to go! Here are some extra instructions in case you want to customize the site further, or need to change the other sections because you're missing a resume field. Otherwise, you can skip to the section __Deployment__.

## Site Customization: Resume Customization and Color Extras

### Extra Resume Content:

If you need to add/remove anything from the resume section, look in the `/src/app/page.tsx` file and navigate to this section:

```tsx
export default async function HomePage() {
  const abstractContent = await fetchMarkdownContent('src/content/Abstract.md');
  const educationContent = await fetchMarkdownContent('src/content/Education.md');
  const experienceContent = await fetchMarkdownContent('src/content/Experience.md');
  const certificateContent = await fetchMarkdownContent('src/content/Certificates.md');
  // const researchContent = await fetchMarkdownContent('src/content/Research.md');
  const footerContent = await fetchMarkdownContent('src/content/Footer.md');

  return (
    <div className="tailwind stuff...">
      <div className="tailwind stuff...">
        <Head />
      </div>
      <div className="tailwind stuff...">
        <div id="Abstract">
          <MarkdownContent content={abstractContent} />
        </div>
        <div id="Skills">
          <Skills />
        </div>
        <div id="Education">
          <MarkdownContent content={educationContent} />
        </div>
        <div id="Projects">
          <Projects />
        </div>
        <div id="Experience">
          <MarkdownContent content={experienceContent} />
        </div>
        <div id="Certificates">
          <MarkdownContent content={certificateContent} />
        </div>
        <div id="Footer">
          <MarkdownContent content={footerContent} />
        </div>
      </div>
    </div>
  );
}
```

If you do research, remove the 2 slashes in front of the line `const researchContent = await fetchMarkdownContent('src/content/Research.md');` to uncomment the function to fetch the data from the `Research.md` file. To add the data into the site, copy/paste one of the sections with the `<MarkdownContent />` Component and edit it like so:

```jsx
<div id="Education">
  <MarkdownContent content={educationContent} />
</div>
```

becomes:

```jsx
<div id="Research">
  <MarkdownContent content={researchContent} />
</div>
```

This process can be repeated for any other markdown files you want to add, just making sure to fetch the markdown file with `fetchMarkdownContent('src/content/Filename.md')` and adding an HTML section:

```jsx
<div id="Filename">
  <MarkdownContent content={filenameContent} />
</div>
```

You can also rearrange each of the resume components here to fit your liking too.

Now that you have added all of the extra resume content you might need, you need to add another <ResumeButton /> Item that is linked to the HTML sections you added. Navigate to the `/src/app/head.tsx` file and find the section:

```jsx
<div className="space-y-4 hidden lg:block">
  <div className="flex flex-col space-y-2">
    <ResumeButton sectionId="Abstract" />
    <ResumeButton sectionId="Skills" />
    <ResumeButton sectionId="Education" />
    <ResumeButton sectionId="Projects" />
    <ResumeButton sectionId="Experience" />
    <ResumeButton sectionId="Certificates" />
  </div>
</div>
```

Simply copy/paste one of the `<ResumeButton sectionId="Filename" />` components within the innermost `<div>` component and rename the sectionId field to the name of each extra filename content you added. Then make sure to rearrange the `<ResumeButton />` Components to match the order they appear in `/src/app/page.tsx`, if you rearranged anything.

### Changing the Site's Colors, Fonts and Styles:

To change the colors in the site, other than the tags you edited previously in `tags.json`, navigate to the file `/tailwind.config.ts` and find the section:

```ts
theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cBg: '#000000', // background color
        cBgGradient: '#000000', // background color gradient
        cH1: '#FFFFFF', // heading 1 text color
        cH2: '#FFFFFF', // heading 2 text color
        cH3: '#FFFFFF', // heading 3 text color
        cH4: '#FFFFFF', // heading 4 text color
        cH5: '#FFFFFF', // heading 5 text color
        cH6: '#FFFFFF', // heading 6 text color
        cBody: '#FFFFFF', // body text color
        cBlock: '#808080', // code block color
        cLink: '#FFFFFF', // link color
        cLinkVisited: '#FFFFFF', // visited link color
        cButton: '#808080', // button color
        cButtonHover: '#808080', // button hover color
        cLineBreak: '#808080', // colors for line breaks
      },
      fontFamily: {
        'font': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

In the `colors` section, you can change the hex codes of each color to whatever you want to create a custom theme for the site, without needing to edit all of the Tailwind CSS in each component and page.

You can also change the font in the `fontFamily` section, which can be done by following this [guide](https://www.youtube.com/watch?v=B4v7ZDLxiS4&t=209s).

Lastly, to add any custom styles for the rendered markdown, you can add custom styles to the file `/src/app/globals.css` in the `@layer utilities` section:

```css
@layer utilities {
    .text-balance {
        text-wrap: balance;
    }

    .tag-button {
        @apply rounded-full px-4 py-2 text-cBg font-medium cursor-pointer transition;
    }

    .tag-button-hover {
        @apply hover:bg-[color];
    }

    .markdown-h1 {
      @apply text-4xl font-bold text-cH1 mb-4;
    }
      
    .markdown-h2 {
      @apply text-3xl font-bold text-cH2 mb-3;
    }
      
    .markdown-h3 {
      @apply text-2xl font-bold text-cH3 mb-2;
    }
      
    .markdown-h4 {
      @apply text-xl font-bold text-cH4 mb-1;
    }
      
    .markdown-h5 {
      @apply text-lg font-bold text-cH5 mb-1;
    }
      
    .markdown-h6 {
      @apply text-base font-bold text-cH6 mb-1;
    }

    .markdown-link {
        @apply text-cLink hover:text-cLinkVisited;
    }

    .markdown-hr {
      @apply text-cLineBreak;
    }

    .markdown-paragraph {
        @apply text-cBody text-lg mb-4;
    }
}
```

This should be sufficient to modify the site however you please, anything more specific will require you to dive deeper into the NextJS code. Now let's deploy your site and get it up and running.

## Deployment

To deploy your site, your repository needs to be on GitHub (so push it if you didn't clone this repository you can use this [guide](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)).

First run `npm run build` in the terminal, in the root directory of this project to ensure no errors have been generated by you editing the code. If everything passes, you can move on to deployment.

Next, push your changes with these steps:

```git
git add .

git commit -m "commit message"

git push

```

and make sure to follow any steps that git says you need to do.

Lastly, go to [Vercel's Website](https://vercel.com/) and connect your GitHub account to your Vercel Account. From there, deploy the site following the steps on Vercel. 

If everything went smoothly, you should have a working, custom portfolio site!