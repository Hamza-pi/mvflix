import Input from "@/components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface FormVals {
  name: string;
  email: string;
  password: string;
}

const Auth = () => {
  const [formVals, setFormVals] = useState<FormVals>({
    name: "",
    email: "",
    password: "",
  });

  const [variant, setVariant] = useState<"login" | "register">("login");

  const handleChange = (key: string, value: string) => {
    setFormVals((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email: formVals.email,
        password: formVals.password,
        redirect: true,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [formVals.email, formVals.password]);

  const register = useCallback(async () => {
    try {
      const data = await axios.post("/api/register", {
        email: formVals.email,
        name: formVals.name,
        password: formVals.password,
      });
      if (data.status === 200) {
        login();
      }
    } catch (error) {
      console.log(error);
    }
  }, [formVals, login]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (variant === "register") {
        register();
      } else {
        login();
      }
    },
    [register]
  );

  return (
    <main className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
      <section className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-6 2xl:px-12 py-2 2xl:py-5">
          <Image src={"/images/logo.png"} alt="logo" width={189} height={75} />
        </nav>
        <main className="flex flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-black bg-opacity-70 px-8 2xl:px-16 py-8 2xl:py-16 self-center mt-2 w-full lg:w-2/5 lg:max-w-md rounded-md"
          >
            <h2 className="text-white text-4xl font-semibold mb-8">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="space-y-4">
              {variant === "register" && (
                <Input
                  id="name"
                  label="Username"
                  value={formVals.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange("name", e.target.value)
                  }
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                value={formVals.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange("email", e.target.value)
                }
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={formVals.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange("password", e.target.value)
                }
              />
            </div>
            <div className="space-y-4 2xl:space-y-12 mt-4 2xl:mt-10">
              <button className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition">
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                  className="w-10 h-10 rounded-full bg-white hover:opacity-60 flex items-center justify-center transition"
                >
                  <FcGoogle size={30} />
                </button>
                <button
                  type="button"
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                  className="w-10 h-10 rounded-full bg-white hover:opacity-60 flex items-center justify-center transition"
                >
                  <FaGithub size={30} />
                </button>
              </div>
              <p className="text-neutral-500 text-center">
                {variant === "register"
                  ? "First time using MovFlix?"
                  : "Already have an account?"}{" "}
                <span
                  onClick={toggleVariant}
                  className="text-white cursor-pointer hover:underline"
                >
                  {variant === "login" ? "Creat an account" : "Login"}
                </span>
              </p>
            </div>
          </form>
        </main>
      </section>
    </main>
  );
};

export default Auth;
