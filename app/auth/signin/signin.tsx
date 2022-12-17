"use client";
import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";
type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
  //was a good way in order to find the type definition
};

function SignInComponent({ providers }: Props) {
  return (
    <div className="flex justify-center items-center">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
          className="bg-blue-500 rounded-full text-white px-4 py-2"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
                //Specify to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInComponent;
