import AboutMe from './text/aboutMe';
import Project from './text/project';
import Self from './text/self';
import Skills from './text/skills';
import Title from './text/title';

const page = () => {
  return (
    <article className='space-y-6 max-w-2xl p-6'>
      <Title />

      <AboutMe />

      <Skills />

      <Project />

      <Self />
    </article>
  );
};

export default page;
