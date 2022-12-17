import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./signin";
async function SignIn() {
  const providers = await getProviders();
  return (
   
    <div className="flex justify-center flex-col items-center ">
      <div>
        <Image
          className="rounded-full mx-2 object-cover "
          src="https://links.papareact.com/161"
          width={700}
          height={700}
          alt="Picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignIn;
