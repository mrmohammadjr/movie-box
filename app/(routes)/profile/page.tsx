import { getUser } from "@/app/data/getUser";
import { auth, signOut } from "@/auth";
import User from "@/app/assets/user.png"
import Image from "next/image";
import { DeleteFav } from "@/app/components/FavComponent";
const Profile = async () => {
  const session = await auth();
  let res = null;
  if (session?.user?.email) {
    res = await getUser(session.user.email);
    console.log(res);
  } else {
    console.log('No user email found in session');
  }
  return (
    <div className="flex lg:flex-row sm:flex-col sm:items-center max-sm:flex-col max-sm:items-center">
      <div className="flex lg:flex-row sm:flex-col sm:items-center max-sm:flex-col max-sm:items-center">
        <div className="w-56 h-56 m-5">
          <Image alt="" src={User} height={400} width={400}/>
        </div>
        <div className="m-4 flex flex-col gap-4">
          <h1 className="text-3xl text-amber-500 flex gap-2">
            user name: <p className="text-white">{res?.userName}</p>
          </h1>
          <h1 className="text-3xl text-amber-500 flex gap-2">
            Email: <p className="text-white">{res?.email}</p>
          </h1>
         
          <form
            className="mt-4"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-3xl bg-red-500 p-2 rounded-2xl hover:text-red-500 hover:bg-white duration-150 cursor-pointer"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="m-5 text-3xl">Favorites Items</h1>
        <div className="grid grid-cols-4 gap-4 m-4">
          {res?.favorites.length === 0 ? (
            <div className="w-1/2 h-48 bg-gray-900 border border-gray-500 rounded-lg p-5">
              Your Favorite items will appear here
            </div>
          ) : (
            <>
              {res?.favorites.map((item: string, index: number) => (
                <div key={item}>
                  <Image src={`https://image.tmdb.org/t/p/w500/${item}`} alt="poster" width={300} height={300} />
                  <DeleteFav item={Number(item)} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
