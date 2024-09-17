import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Group Chat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg">
            <header className="bg-blue-600 p-4 text-center text-white rounded-t-lg">
              <h1 className="text-3xl font-bold">
                <i className="fas fa-smile"></i> Group Chat
              </h1>
            </header>

            <main className="p-6">
              <form action="/grp-room" method="GET">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 mb-2 font-semibold">
                    Name(Entering the Chat)
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
                    <option value="JavaScript">The Loop</option>
                    <option value="Python">Sync Space</option>
                    <option value="PHP">The Buzz Room</option>
                    <option value="C#">Fusion Room</option>
                    <option value="Ruby">Vibe Tribe</option>
                    <option value="Java">Talk Tavern</option>
                    <option value="Java">Mind Meld Hub</option>
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
