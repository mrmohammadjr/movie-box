export default async function premiumUser(argument) {
  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 p-10">
      <div className="border-2 rounded-3xl border-amber-600 flex flex-col items-center text-white">
        <h3>اشتراک برنز</h3>
        <h1 className="text-5xl">۶۰,۰۰۰ ت</h1>
        <ul className="text-white mt-6 mb-6">
          <li>امکان ذخیره آیتم ها در حساب کاربری</li>
          <li>امکان مشاهده تریلر ها</li>
        </ul>
        <button className="bg-amber-600 mb-1 p-0.5 rounded">خرید اشتراک</button>
      </div>
      <div className="border-2 rounded-3xl border-b-gray-400 flex flex-col items-center text-white">
        <h3>اشتراک نقره ای</h3>
        <h1 className="text-5xl">۱۲۰,۰۰۰ ت</h1>
        <ul className="text-white mt-6 mb-6">
          <li>امکان ذخیره آیتم ها در حساب کاربری</li>
          <li>امکان مشاهده تریلر ها</li>
          <li>امکان مشاهده آنلاین</li>
        </ul>
        <button className="bg-gray-400 p-0.5 rounded mb-1">خرید اشتراک</button>
      </div>
      <div className="border-2 rounded-3xl border-amber-400 flex flex-col items-center text-white">
        <h3>اشتراک طلایی</h3>
        <h1 className="text-5xl">۲۰۰,۰۰۰ ت</h1>
        <ul className="text-white mt-6 mb-6">
          <li>دسترسی کامل به برنامه</li>
          <li>امکان ذخیره آیتم ها در حساب کاربری</li>
          <li>امکان مشاهده تریلر ها</li>
          <li>امکان مشاهده آنلاین</li>
          <li>امکان دانلود</li>
        </ul>
        <button className="bg-amber-400 p-0.5 rounded mb-1">خرید اشتراک</button>
      </div>
    </div>
  )
}