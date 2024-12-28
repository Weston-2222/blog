import { IconCoinBitcoinFilled } from '@tabler/icons-react';

const Project = () => {
  return (
    <section>
      <h3 className='text-2xl font-bold pb-2'>Project</h3>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;目前我正開發一個加密貨幣資訊網站，串接 Coingecko
        API
        獲取資訊並將資料視覺化，已完成使用者註冊、登入與收藏功能。未來將逐步加入
        OAuth 登入、倉位計算與投資組合績效評估等功能。
      </p>
      <p className='text-lg font-bold'>專案中使用的技術:</p>
      <ul className='list-disc pl-6'>
        <li>
          使用 <mark>Next.js 15</mark> 配合 App Route 開發 SSR 網站。
        </li>
        <li>
          使用 <mark>ISR</mark> 增量式靜態生成，並搭配 Next.js 擴展的
          <mark>Fetch</mark> 和 <mark>Redis</mark> 進行資料快取，提升網站效能。
        </li>
        <li>
          使用 <mark>Tailwind CSS</mark> 進行網站樣式設計。
        </li>
        <li>
          使用 <mark>Shadcn UI</mark> 進行元件開發。
        </li>
        <li>
          使用 <mark>Coingecko API</mark> 獲取資訊。
        </li>
        <li>
          使用 <mark>JWT</mark> 進行用戶登入驗證。
        </li>
        <li>
          使用 <mark>MongoDB</mark> 儲存用戶資料。
        </li>
      </ul>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;由於 Next.js 13 新增 App
        Route機制，導致網路資訊常有新舊混雜的情況，且我的英文能力尚需加強，因此在查詢與學習上遇到一些挑戰，但我仍積極努力克服。
      </p>

      <a
        href='https://crypto-website-nextjs-delta.vercel.app'
        target='_blank'
        rel='noopener noreferrer'
      >
        <button className='rounded-md p-1 flex items-center gap-1'>
          <IconCoinBitcoinFilled className='h-5 w-5' />
          加密貨幣資訊收集網站
        </button>
      </a>
    </section>
  );
};

export default Project;
