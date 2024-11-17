import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Profiles = () => {
  const { data: user } = useCurrentUser();
  return (
    <section className="flex items-center justify-center h-full">
      <main className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 pt-10">
          <Link
            className="group flex flex-col items-center justify-center gap-2"
            href={"/"}
          >
            <Image
              width={100}
              height={100}
              src={"/images/profile.jpg"}
              alt="Profile"
              className="border border-transparent rounded-md transition group-hover:border-white"
            />
            <p className="text-gray-400 transition group-hover:text-white">
              {user?.name}
            </p>
          </Link>
        </div>
      </main>
    </section>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Profiles;
