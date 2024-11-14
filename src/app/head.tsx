import ResumeButton from "@/components/ResumeButton";
import Summary from "@/components/Summary";
import Image from "next/image";

export default function Head() {
  return (
    <>
      <>
        <title>My NextJS Portfolio</title>
        <meta content="width=device.width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </>
      <div className="pt-4">
        <Summary />
        <br />
        <div className="space-y-4 hidden lg:block">
          <div className="flex flex-col space-y-2">
            <ResumeButton sectionId="Abstract" />
            <ResumeButton sectionId="Skills" />
            <ResumeButton sectionId="Projects" />
            <ResumeButton sectionId="Education" />
            <ResumeButton sectionId="Articles" />
            <ResumeButton sectionId="Experience" />
            <ResumeButton sectionId="Certificates" />
          </div>
        </div>
      </div>
    </>
  );
}
