import AboutMe from './text/aboutMe';
import Project from './text/project';
import Self from './text/self';
import Skills from './text/skills';
import Title from './text/title';
export const metadata = {
  title: '我的履歷',
  description: '這是我的個人履歷頁面，包含關於我的資訊、技能和項目。',
};
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
