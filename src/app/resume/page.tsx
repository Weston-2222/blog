import CopyButton from '@/components/copyButton';
import {
  IconBrandGithubFilled,
  IconCoinBitcoinFilled,
  IconMail,
} from '@tabler/icons-react';

const page = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-2xl'>
        <header className='max-w-4xl mx-auto px-4 pt-12 md:pt-16'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='mb-6 md:mb-0'>
              <h1 className='text-4xl font-bold tracking-wide mb-1'>Weston</h1>

              <h2 className='text-xl font-medium text-gray-500 dark:text-gray-400'>
                謝子崴
              </h2>
            </div>

            <div className='space-y-1 text-sm md:text-base flex flex-col items-end'>
              <div className='flex items-center gap-2'>
                <p>weston.workmail@gmail.com</p>
                <CopyButton
                  command='weston.workmail@gmail.com'
                  className='h-6 w-6'
                />
              </div>
              <p>
                <a
                  href='https://westons.blog'
                  className=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <button className='rounded-md p-1'>westons.blog</button>
                </a>
              </p>
              <p className=''>中華科技大學航航空電子系</p>
            </div>
          </div>
        </header>

        <main className='max-w-4xl mx-auto px-4 mt-8 mb-16'>
          <section className='mb-12'>
            <h3 className='text-xl font-semibold mb-4'>ABOUT ME</h3>
            <p className='leading-relaxed mb-2'>
              我在今年 8
              月退伍，已有約三年的自學程式經驗。起初沒有明確方向，曾嘗試
              Angular、Jupyter Notebook、GraphQL、Redis、Docker、Flask、Express
              等多種技術， 也透過實作接觸過關聯式與非關聯式資料庫。
            </p>
            <p className='leading-relaxed mb-2'>
              退伍後，我開始有規劃地學習，主要使用 Next.js 搭配 TypeScript 和
              Tailwind CSS 進行開發。前端的部分我努力瞭解
              SSR（伺服器端渲染）與快取機制來優化網站性能，
              而在後端與資料儲存方面，我有使用過 MongoDB、JWT、Redis 等技術。
            </p>
            <p className='leading-relaxed mb-2'>
              目前我正開發一個加密貨幣資訊網站，串接 Coingecko API
              以獲取市場資訊，已完成使用者註冊、登入與 Mock
              倉位功能。未來將逐步加入 OAuth
              登入、倉位計算與投資組合績效評估等功能。
            </p>
            <p className='leading-relaxed mb-2'>
              開發過程中，由於 Next.js 13 新增 App Route
              機制，導致之前更新速度落後，且我的英文能力尚需加強，因此在查詢與學習上遇到一些挑戰，但我仍積極努力克服。
            </p>
            <p className='leading-relaxed'>
              我熱愛程式語言所帶來的創造力，能將想法具體實現讓我深感成就。未來希望持續深耕前端技術，提供開發效率與使用者體驗，期待能加入優秀的團隊共同成長，一起打造更優質的產品。
            </p>
          </section>

          <section className='mb-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-xl font-semibold mb-4'>技能</h3>
              <p className='leading-relaxed mb-2'>
                曾使用 Angular、Jupyter Notebook、
                GraphQL、Redis、Docker、Flask、 Express 等技術。
              </p>
              <p className='leading-relaxed'>
                熟悉關聯式與非關聯式資料庫的基本應用。
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold mb-4'>目前專注</h3>
              <p className='leading-relaxed mb-2'>
                加深 Next.js 與 TypeScript 的技術實力。
              </p>
              <p className='leading-relaxed'>
                通過專案實踐精進技術並持續迭代作品。
              </p>
            </div>
          </section>

          <section className='mb-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-xl font-semibold mb-4'>職業願景</h3>
              <p className='leading-relaxed'>
                成為專注於設計與實現軟體解決方案的前端工程師，為團隊與產品創造價值。
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold mb-4'>連結</h3>
              <p className='leading-relaxed mb-2'>
                我的專案：
                <a
                  href='#'
                  className='text-blue-600 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  一個加密貨幣資訊收集網站
                </a>
              </p>
              <p className='leading-relaxed'>
                GitHub：
                <a
                  href='https://github.com/Weston-2222'
                  className='text-blue-600 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  @Weston-2222
                </a>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default page;
