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
        <main className='container mx-auto px-4 py-8'>
          <div className='py-6 flex justify-between items-center'>
            <div className='container mx-auto text-left'>
              <h1 className='text-3xl font-bold'>謝子崴</h1>
              <p className='mt-2'>專注於 Web 開發技術的學習與實踐</p>
            </div>
          </div>

          {/* 自我介紹 */}
          <section className='mb-6'>
            <h2 className='text-xl font-bold'>關於我</h2>
            <section className='mb-6'>
              我在今年 8
              月退伍，已有約三年的自學程式經驗。起初沒有明確方向，曾嘗試
              Angular、Jupyter Notebook、GraphQL、Redis、Docker、Flask、Express
              等多種技術，也透過實作接觸過關聯式與非關聯式資料庫。
            </section>
            <section className='mb-6'>
              退伍後，我開始有規劃地學習，主要使用 Next.js 搭配 TypeScript 和
              Tailwind CSS 進行開發。前端的部分我努力瞭解
              SSR（伺服器端渲染）與快取機制來優化網站性能，而在後端與資料儲存方面，我有使用過
              MongoDB、JWT、Redis 等技術。
            </section>
            <section className='mb-6'>
              目前我正開發一個加密貨幣資訊網站，串接 Coingecko API
              以獲取市場資訊，已完成使用者註冊、登入與收藏功能。未來將逐步加入
              OAuth 登入、倉位計算與投資組合報酬率計算等功能。開發過程中，由於
              Next.js 13 新增 App Route
              機制，導致文件更新速度落後，且我的英文能力尚需加強，因此在查詢與學習上遇到一些挑戰，但我仍積極努力克服。
            </section>
            <section className='mb-6'>
              我熱愛程式語言所帶來的創造力，能將想法具體實現讓我深感成就。未來希望持續深耕前端技術，提升開發效率與使用者體驗，也期待能加入優秀的團隊共同成長，一起打造更優質的產品。
            </section>
          </section>

          {/* 技術經歷 */}
          <section className='mb-6'>
            <h2 className='text-xl font-bold'>技術經歷</h2>
            <ul className='mt-2 list-disc list-inside'>
              <li>
                曾使用 Angular、Jupyter
                Notebook、GraphQL、Redis、Docker、Flask、Express 等技術。
              </li>
              <li>熟悉關聯式與非關聯式資料庫的基本應用。</li>
            </ul>
          </section>

          {/* 目前專注 */}
          <section className='mb-6'>
            <h2 className='text-xl font-bold'>目前專注</h2>
            <ul className='mt-2 list-disc list-inside'>
              <li>加深 Next.js 與 TypeScript 的技術實力。</li>
              <li>通過專案實踐持續迭代個人作品。</li>
            </ul>
          </section>

          {/* 職業願景 */}
          <section className='mb-6'>
            <h2 className='text-xl font-bold'>職業願景</h2>
            <p className='mt-2'>
              成為專注於設計與實現創新解決方案的前端工程師，為團隊與產品創造價值。
            </p>
          </section>

          {/* 聯繫方式 */}
          <section>
            <h2 className='text-xl font-bold'>聯繫方式</h2>
            <div className='mt-2 flex items-center'>
              <button className='flex items-center gap-2 p-2 rounded-md'>
                <IconMail className='w-6 h-6' />
                weston.workmail@gmail.com
              </button>
              <CopyButton command='weston.workmail@gmail.com' />
            </div>
          </section>

          {/* 我的專案 */}
          <section className='mb-6'>
            <h2 className='text-xl font-bold'>連結</h2>
            <div className='mt-2'>
              <a
                href='https://crypto-website-nextjs-delta.vercel.app'
                target='_blank'
              >
                <button className='flex items-center gap-2 p-2 rounded-md'>
                  <IconCoinBitcoinFilled className='w-6 h-6' />
                  我的專案:一個加密貨幣資訊收集網站
                </button>
              </a>
            </div>
            <div className='mt-2'>
              <a href='https://github.com/Weston-2222' target='_blank'>
                <button className='flex items-center gap-2 p-2 rounded-md'>
                  <IconBrandGithubFilled className='w-6 h-6' />
                  @Weston-2222
                </button>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default page;
