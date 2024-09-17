import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>ChatCord App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
          integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
          crossOrigin="anonymous"
        />
      </Head>

      
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg">
            <header className="bg-blue-600 p-4 text-center text-white rounded-t-lg">
              <h1 className="text-3xl font-bold">
                <i className="fas fa-smile"></i> ChatCord
              </h1>
            </header>

            <main className="p-6">
              <form action="/grp-room" method="GET">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 mb-2 font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username..."
                    className="w-full p-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="room" className="block text-gray-700 mb-2 font-semibold">
                    Room
                  </label>
                  <select
                    id="room"
                    name="room"
                    className="w-full p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="PHP">PHP</option>
                    <option value="C#">C#</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Java">Java</option>
                    <option value="Java">Java</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
                >
                  Join Chat
                </button>
              </form>
            </main>
          </div>
        </div>
     
    </>
  );
}
