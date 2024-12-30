const content = [
  {
    title: '前端開發技能',
    content: [
      <p key='1'>
        熟悉<mark>HTML5、CSS3</mark>，掌握 <mark>Flexbox</mark>
        布局等前端開發技術。
      </p>,
      <p key='2'>
        熟悉使用<mark>ShadCN UI、Framer Motion、Tailwind CSS</mark>
        等前端工具。
      </p>,
      <p key='3'>
        具備使用 <mark>Angular、React</mark> 等框架的實務經驗。
      </p>,
      <p key='4'>
        熟悉 <mark>Next.js</mark> 與 <mark>TypeScript</mark>，能開發
        SSR、SSG、ISR、CSR 等渲染模式。
      </p>,
      <p key='5'>
        了解 <mark>Three.js</mark> 的應用，能在網頁中實現3D效果。
      </p>,
    ],
  },
  {
    title: '後端與資料庫開發技能',
    content: [
      <p key='1'>
        使用過 <mark>Express、Nest.js、Flask</mark> 等後端框架的應用。
      </p>,
      <p key='2'>
        了解 <mark>GraphQL</mark> 與 <mark>RESTful API</mark> 的開發與應用。
      </p>,
      <p key='3'>
        使用過 <mark>Nginx</mark> 進行反向代理。
      </p>,
      <p key='4'>
        了解 <mark>PostgreSQL、MongoDB、Redis</mark> 等資料庫技術。
      </p>,
    ],
  },
  {
    title: '驗證與容器化技術',
    content: [
      <p key='1'>
        具備使用 <mark>Docker</mark> 進行容器化的經驗。
      </p>,
      <p key='2'>
        具備使用 <mark>JWT</mark> 和 <mark>OAuth</mark> 進行身份驗證的經驗。
      </p>,
    ],
  },

  {
    title: '版本控制與雲端部署',
    content: [
      <p key='1'>
        熟悉使用 <mark>Git</mark> 進行版本控制。
      </p>,
      <p key='2'>
        曾使用 <mark>Azure、GCP、Vercel</mark>等雲端服務進行專案部署。
      </p>,
    ],
  },
];

const Skills = () => {
  return (
    <section>
      <h3 className='text-2xl font-bold'>Skills</h3>
      <div className='flex flex-wrap space-y-2'>
        {content.map((item, index) => (
          <section key={index} className='lg:w-1/2 p-2'>
            <h4 className='text-xl font-bold'>{item.title}</h4>
            <ul className='list-disc pl-6'>
              {item.content.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Skills;
