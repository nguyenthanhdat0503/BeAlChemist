export default function Login() {
  return (
    <section className="bg-slate-500 relative">
      <h1 className="absolute top-5 left-8 text-white font-semibold text-4xl">BeAlChemist</h1>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <div className="w-[600px] bg-gray-900 rounded-lg shadow">
          <div className="p-10 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6 text-white" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline text-white"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-gray-300"
              >
                Sign in
              </button>
              <p className="text-sm font-light">
                Don't have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
