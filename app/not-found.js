import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex items-center flex-col text-white">
      <h2 className="p-5 text-2xl"> که رو میخواستی؟</h2>
      <p className="text-cyan-400 text-2xl mb-2">۴۰۴ اینجا از ما گفتن بود</p>
      <Link className="text-purple-600" href={"/"}>صفحه اصلی</Link>
    </div>
  )
}